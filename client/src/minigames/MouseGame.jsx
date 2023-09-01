import React from "react";
import Fox from "../meshes/Fox.jsx";
// import { OrbitControls } from "@react-three/drei";

export default function MouseGame() {
  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[10, 0.1, 10]} />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <Fox />
    </>
  );
}
