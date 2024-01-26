import { useGLTF } from "@react-three/drei";
import React from "react";

export default function Check({
  position, 
  rotation=[0,0,0], 
  scale,
}) {
  const { nodes } = useGLTF("/models/check.glb");
  const scaleArray = [1 * scale, 0.1 * scale, 1 * scale]
  return (
    <group dispose={null} position={position} rotation={rotation} scale={scaleArray}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        position={[0.299, 0, 2.023]}
        rotation={[Math.PI / 2, 0, 2.574]}
        scale={[-0.323, -0.056, -0.633]}
      >
        <meshStandardMaterial color="green"/>
      </mesh>
    </group>
  );
}