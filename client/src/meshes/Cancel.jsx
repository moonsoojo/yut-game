import { useGLTF } from "@react-three/drei";
import React from "react";

export default function Cancel({
  position, 
  rotation=[0,0,0], 
  scale,
  color="red"
}) {
  const { nodes } = useGLTF("/models/cancel.glb");
  const scaleArray = [1 * scale, 0.1 * scale, 1 * scale]
  return (
    <group dispose={null} position={position} rotation={rotation} scale={scaleArray}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        rotation={[0, 0.664, 0]}
        scale={[0.511, 1.67, 1.67]}
      >
        <meshStandardMaterial color="red"/>
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/cancel.glb");