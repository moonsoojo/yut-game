import { useGLTF } from "@react-three/drei";
import HelperArrow from "./HelperArrow";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import React from "react";
import Tile from "../components/Tile";

export default function Mars({ position, tile }) {
  const { nodes, materials } = useGLTF("/models/Mars 4.glb");
  const mars = useRef();

  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime;
    mars.current.rotation.y = elapsedTime * 0.5;
  });

  return (
    <group position={position}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mars.geometry}
        material={materials.Mars}
        scale={0.5}
        ref={mars}
      />
      <Tile tile={tile} wrapperRadius={0.6} />
      <HelperArrow
        position={[-0.1, 0, -1]}
        rotation={[-Math.PI/2, 0, Math.PI/16, "XYZ"]}
        scale={0.9}
      />
      <HelperArrow
        position={[-0.7, 0, 0]}
        rotation={[0, 0, Math.PI/2]}
        scale={0.9}
      />
    </group>
  );
}
