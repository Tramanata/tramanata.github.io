// Decodes the Draco-compressed room model and writes the UV triangles of the
// parts we recolor (floor, walls, chair, rug) for scripts/recolor_baked.py.
//
// Usage: node scripts/dump_uv_regions.cjs [output.json]
const fs = require("fs");
const draco3d = require(process.cwd() + "/node_modules/draco3d");
const g = JSON.parse(fs.readFileSync("public/models/scene.gltf", "utf8"));
const buf = Buffer.from(g.buffers[0].uri.split(",")[1], "base64");
const want = { 12: "shell", 11: "chair", 3: "rug" };
draco3d.createDecoderModule({}).then((D) => {
  const out = {};
  for (const [mi, label] of Object.entries(want)) {
    g.meshes[mi].primitives.forEach((p) => {
      const ext = p.extensions.KHR_draco_mesh_compression;
      const bv = g.bufferViews[ext.bufferView];
      const data = new Int8Array(buf.subarray(bv.byteOffset || 0, (bv.byteOffset || 0) + bv.byteLength));
      const dec = new D.Decoder();
      const db = new D.DecoderBuffer(); db.Init(data, data.length);
      const mesh = new D.Mesh(); dec.DecodeBufferToMesh(db, mesh);
      const getAttr = (id, n) => {
        const a = dec.GetAttributeByUniqueId(mesh, id); const arr = new D.DracoFloat32Array();
        dec.GetAttributeFloatForAllPoints(mesh, a, arr);
        const r = []; for (let i = 0; i < arr.size(); i += n) r.push(Array.from({ length: n }, (_, k) => arr.GetValue(i + k)));
        D.destroy(arr); return r;
      };
      const pos = getAttr(ext.attributes.POSITION, 3), uv = getAttr(ext.attributes.TEXCOORD_0, 2);
      const faces = []; const ia = new D.DracoInt32Array();
      for (let f = 0; f < mesh.num_faces(); f++) { dec.GetFaceFromMesh(mesh, f, ia); faces.push([ia.GetValue(0), ia.GetValue(1), ia.GetValue(2)]); }
      const mat = g.materials[p.material].name;
      out[`${label}:${mat}`] = { pos, uv, faces };
      D.destroy(ia); D.destroy(mesh); D.destroy(db); D.destroy(dec);
    });
  }
  fs.writeFileSync(process.argv[2] || "scripts/uv_regions.json", JSON.stringify(out));
  for (const [k, v] of Object.entries(out)) console.log(k, "faces", v.faces.length);
});
