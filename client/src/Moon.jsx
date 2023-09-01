import React from "react";
import { useTexture } from "@react-three/drei";

export default function Moon() {
  const props = useTexture({
    map: "textures/moon/moon-color.jpg",
  });
  return (
    <>
      <mesh position={[-10, 1, 3]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial map={props.map} />
      </mesh>
    </>
  );
}
