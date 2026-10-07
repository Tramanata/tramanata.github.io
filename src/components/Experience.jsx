import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useEffect } from "react";
import { framerMotionConfig } from "../config";
import { Avatar } from "./Avatar";
import { Office } from "./Office";

// Must match the phone breakpoint for .hero-card in styles.css.
const NARROW_BREAKPOINT = 640;
// Approximate height the docked hero card takes up on narrow screens.
const CARD_SPACE = 260;
// The room sits right of the scene origin; on narrow screens shift the view to center it.
const NARROW_SHIFT_X = 0.12;
// At the default camera distance (z = 10), the room's on-screen width as a
// fraction of the viewport height. The camera pulls back when it won't fit.
const ROOM_WIDTH_RATIO = 0.9;

export const Experience = (props) => {
  const { section, menuOpened } = props;
  const { size, camera } = useThree();

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);

  // On narrow screens the hero card docks to the bottom (see styles.css), so
  // fit the room into the space above it: shift the view up by half the
  // card's height and pull the camera back to match that area's shape.
  const narrow = size.width <= NARROW_BREAKPOINT;
  const sceneHeight = narrow ? Math.max(size.height - CARD_SPACE, 1) : size.height;
  const cameraZ =
    10 *
    Math.max(
      1,
      size.height / sceneHeight,
      (size.height * ROOM_WIDTH_RATIO) / size.width
    );

  useEffect(() => {
    if (narrow) {
      camera.setViewOffset(
        size.width,
        size.height,
        size.width * NARROW_SHIFT_X,
        CARD_SPACE / 2,
        size.width,
        size.height
      );
    } else {
      camera.clearViewOffset();
    }
    camera.updateProjectionMatrix();
  }, [narrow, size.width, size.height, camera]);

  useFrame((state) => {
    state.camera.position.x = cameraPositionX.get();
    state.camera.position.z = cameraZ;
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);
  });

  return (
    <>
      <ambientLight intensity={1} />
      <motion.group
        position={[1.5, 2, 3]}
        scale={[0.9, 0.9, 0.9]}
        rotation-y={-Math.PI / 4}
        animate={{
          y: 0,
        }}
      >
        <Office section={section} />
      </motion.group>


      <motion.group
        position={[0, -1.5, -10]}
        animate={{
          z: -10,
          y: -1.5,
        }}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float>
          <mesh position={[1, 5, -15]} scale={[2, 2, 2]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"white"}
            />
          </mesh>
        </Float>
        <group
          //rotation-y={section === 0 ? [Math.PI / 2] : [Math.PI / 2]}
          rotation-y={[Math.PI / 2]}
          scale={[1,1,1]}
          //scale={section === 0 ? [1, 1, 1] : [1, 1, 1]}
          position={[1.5,1.7,12.5]}
          //position={section === 0 ? [1.5, 1.7, 12.5] : [1.5, 1.7, 12.5]}
        >
          <Avatar animation="Typing" />
        </group>

      </motion.group>
    </>
  );
};