import { useGLTF } from "@react-three/drei";
import React from "react";

export default function Fox() {
  const fox = useGLTF("/models/fox/Fox.gltf");

  return (
    <primitive
      object={fox.scene}
      scale={0.02}
      position={[-2.5, 0, 2.5]}
      rotation-y={0.3}
    />
  );
}
