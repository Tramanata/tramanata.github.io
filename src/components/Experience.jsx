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

export const Experience = (props) => {
  const { section, menuOpened } = props;
  const { viewport } = useThree();

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

  useFrame((state) => {
    state.camera.position.x = cameraPositionX.get();
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

        <group rotation-y={Math.PI / 2} scale={[1,1,1]} position={[1.5,1.7,12.5]}>
          <Avatar animation="Typing" />
        </group>
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