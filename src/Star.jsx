import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import RocketUpright from "./RocketUpright";
import Rocket from "./Rocket";

export default function Star({ position, index }) {
  const { nodes, materials } = useGLTF("/models/star-yellow.glb");

  return (
    <group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star.geometry}
        position={position}
        scale={0.1}
      >
        <meshStandardMaterial color={"yellow"} />
      </mesh>
      {/* {(index == 9 || index == 1 || index == 24) && <Rocket position={[position[0]-0.1, position[1] + 0.2, position[2]-0.15]}/>} */}
    </group>
  );
}