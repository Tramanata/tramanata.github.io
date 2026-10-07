"""Recolor the baked room texture: warm stone + terracotta accents, dark
walnut floor, dark taupe walls, mint chair.

Usage: python scripts/recolor_baked.py <original.jpg> <output.jpg>

Always run it on the original texture (git history), not an already
recolored one. Region shapes come from scripts/uv_regions.json, written by
scripts/dump_uv_regions.cjs.

1. Palette pass: only the blue-violet-magenta hue band is touched; greens,
   oranges and neutral grays (plants, palm, desk, avatar props) keep their
   original colors.
2. Region pass: the floor, walls and chair seat/back get new colors. Each
   pixel keeps its brightness relative to the region's typical brightness,
   so baked shadows, plank lines and texture survive.
"""
import json
import os
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

STONE_HUE = 32 / 360       # warm gray concrete / wood
TERRACOTTA_HUE = 12 / 360  # rug and former purple accents

FLOOR_COLOR = (0.38, 0.25, 0.16)  # dark walnut
WALL_COLOR = (0.50, 0.43, 0.36)   # muted dark taupe, a step lighter than the floor
MINT_COLOR = (0.62, 0.86, 0.74)   # chair seat/back

REGIONS_PATH = os.path.join(os.path.dirname(__file__), "uv_regions.json")


def rgb_to_hsv(rgb):
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    v = rgb.max(-1)
    c = v - rgb.min(-1)
    s = np.where(v > 0, c / np.maximum(v, 1e-6), 0)
    cz = np.maximum(c, 1e-6)
    h = np.where(v == r, ((g - b) / cz) % 6,
        np.where(v == g, (b - r) / cz + 2, (r - g) / cz + 4)) / 6
    return np.stack([np.where(c > 0, h, 0), s, v], -1)


def hsv_to_rgb(hsv):
    h, s, v = hsv[..., 0] * 6, hsv[..., 1], hsv[..., 2]
    i = np.floor(h).astype(int) % 6
    f = h - np.floor(h)
    p, q, t = v * (1 - s), v * (1 - s * f), v * (1 - s * (1 - f))
    choices = [np.stack(x, -1) for x in
               [(v, t, p), (q, v, p), (p, v, t), (p, q, v), (t, p, v), (v, p, q)]]
    out = np.zeros_like(hsv)
    for k in range(6):
        out = np.where((i == k)[..., None], choices[k], out)
    return out


def band(x, lo, hi, feather):
    """1 inside [lo, hi], fading to 0 over `feather` on each side."""
    return np.clip(np.minimum(x - lo + feather, hi - x + feather) / feather, 0, 1)


def recolor(rgb):
    hsv = rgb_to_hsv(rgb)
    h, s, v = hsv[..., 0] * 360, hsv[..., 1], hsv[..., 2]

    in_band = band(h, 225, 340, 15)
    vivid = np.clip((s - 0.38) / 0.12, 0, 1)  # soft split between tint and vivid color

    # Violet tint on concrete/wood/light -> warm, nearly neutral stone.
    tint = hsv.copy()
    tint[..., 0] = STONE_HUE
    tint[..., 1] = np.minimum(s * 0.55, 0.14)

    # Vivid blue-violet (rug, purple props) -> terracotta, a touch deeper.
    terra = hsv.copy()
    terra[..., 0] = TERRACOTTA_HUE
    terra[..., 1] = np.clip(s * 0.78, 0, 0.68)
    terra[..., 2] = v * 0.88

    target = hsv_to_rgb(tint) * (1 - vivid[..., None]) + hsv_to_rgb(terra) * vivid[..., None]
    w = in_band[..., None] * (s > 0.015)[..., None]  # leave true grays/black alone
    return rgb * (1 - w) + target * w


def region_mask(regions, key, size, grow=6):
    """Rasterize a part's UV triangles into a 0..1 mask, grown slightly to cover seams."""
    img = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(img)
    part = regions[key]
    for face in part["faces"]:
        draw.polygon([(part["uv"][i][0] * size, part["uv"][i][1] * size) for i in face], fill=255)
    if grow:
        img = img.filter(ImageFilter.MaxFilter(grow * 2 + 1))
    return np.asarray(img).astype(np.float32) / 255


def luminance(rgb):
    return rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)


def tint_region(rgb, mask, color, weight=None):
    """Recolor masked pixels to `color`, keeping their relative brightness."""
    lum = luminance(rgb)
    sel = (mask > 0.5) & (lum > 0.03)
    if weight is not None:
        sel &= weight > 0.5
    ref = np.median(lum[sel])
    shade = np.clip(lum / ref, 0, 1.6)[..., None]
    target = np.clip(np.array(color, dtype=np.float32) * shade, 0, 1)
    w = mask if weight is None else mask * weight
    return rgb * (1 - w[..., None]) + target * w[..., None]


def recolor_regions(rgb):
    with open(REGIONS_PATH) as f:
        regions = json.load(f)
    size = rgb.shape[0]

    rgb = tint_region(rgb, region_mask(regions, "shell:Wall", size), WALL_COLOR)
    rgb = tint_region(rgb, region_mask(regions, "shell:Floor", size), FLOOR_COLOR)

    # Only the green upholstery turns mint; the black base and metal stay as-is.
    chair = np.maximum(region_mask(regions, "chair:Office_Cha", size),
                       region_mask(regions, "chair:Office_Cha_1", size))
    hsv = rgb_to_hsv(rgb)
    green = band(hsv[..., 0] * 360, 80, 170, 15) * np.clip((hsv[..., 1] - 0.12) / 0.1, 0, 1)
    return tint_region(rgb, chair, MINT_COLOR, weight=green)


if __name__ == "__main__":
    src, dst = sys.argv[1], sys.argv[2]
    rgb = np.asarray(Image.open(src).convert("RGB")).astype(np.float32) / 255
    out = recolor_regions(recolor(rgb))
    Image.fromarray((np.clip(out, 0, 1) * 255 + 0.5).astype(np.uint8)).save(dst, quality=92)
