import { useGLTF } from "@react-three/drei";
import React from "react";

export default function Cursor({
  position, 
  rotation=[Math.PI/2, 0, 5 * Math.PI/8], 
  scale
}) {
  const { nodes } = useGLTF("/models/cursor.glb");
  const scaleArray = [1 * scale, 1 * scale, 1 * scale]
  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve.geometry}
        position={position}
        rotation={rotation}
        scale={scaleArray}
      >
        <meshStandardMaterial color="white"/>
      </mesh>
    </group>
  );
}