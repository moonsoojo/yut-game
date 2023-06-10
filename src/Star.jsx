import { useGLTF } from "@react-three/drei";
import React, { useRef, useState } from "react";

export default function Star({ position, scale, hover, setHover }) {
  const { nodes, materials } = useGLTF("/models/star.glb");

  const handleHover = () => {
    if (!hover) {
      setHover(true);
    } else {
      setHover(false);
    }
  };

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.star.geometry}
      material={materials.GlowingStar}
      position={position}
      scale={scale}
      onPointerEnter={handleHover}
      onPointerOut={handleHover}
    />
  );
}
