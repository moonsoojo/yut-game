import { animated } from "@react-spring/three";
import { MeshDistortMaterial, useGLTF } from "@react-three/drei";
import React from "react";

export default function Check({
  position, 
  rotation=[0,0,0], 
  scale=1,
  color="green"
}) {
  const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)
  const { nodes } = useGLTF("/models/check.glb");
  return (
    <animated.group position={position} rotation={rotation} scale={scale}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 2.574]}
        scale={[-0.323, -0.056, -0.633]}
      >
        <AnimatedMeshDistortMaterial distort={0} color={color}/>
      </mesh>
    </animated.group>
  );
}

useGLTF.preload("/models/check.glb");