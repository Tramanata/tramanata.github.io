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
          y: section === 0 ? 0 : -1,
        }}
      >
        <Office section={section} />

        <group rotation-y={Math.PI / 2} scale={[1,1,1]} position={[1.5,1.7,12.5]}>
          <Avatar animation={section === 0 ? "Typing" : "Standing"} />
        </group>
      </motion.group>


      {/* SKILLS */}
      <motion.group
        position={[0, -1.5, -10]}
        animate={{
          z: section === 1 ? 0 : -10,
          y: section === 1 ? -viewport.height : -1.5,
        }}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float>
          <mesh position={[1, -3, -15]} scale={[2, 2, 2]}>
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
        <Float>
          <mesh scale={[3, 3, 3]} position={[3, 1, -18]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color="white"
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[1.4, 1.4, 1.4]} position={[10, -1, -11]}>
            <boxGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={8}
              speed={2}
              color={"white"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[1.4, 1.4, 1.4]} position={[-5, -1, -11]}>
            <ringGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={2}
              speed={5}
              color={"white"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[1.4, 1.4, 1.4]} position={[6, -2, -11]}>
            <coneGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={6}
              speed={9}
              color={"white"}
            />
          </mesh>
        </Float>
        <group
          rotation-y={section === 0 ? [Math.PI / 2] : [0]}
          //scale={[1,1,1]}
          scale={section === 0 ? [1, 1, 1] : [3.2, 3.2, 3.2]}
          //position={[1.5,1.7,12.5]}
          position={section === 0 ? [1.5, 1.7, 12.5] : [2, -3.5, 0]}
        >
          <Avatar animation={section === 0 ? "Typing" : "Standing"} />
        </group>

      </motion.group>
    </>
  );
};