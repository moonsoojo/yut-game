import { useGLTF } from "@react-three/drei";
import HelperArrow from "./HelperArrow";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import React from "react";
import Tile from "../components/Tile";
import { animated } from "@react-spring/three";

export default function Mars({ position, tile, scale=0.4, device }) {
  const { nodes, materials } = useGLTF("models/Mars 4.glb");
  const mars = useRef();

  useFrame((state, delta) => {
    mars.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <animated.group position={position} scale={scale}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mars.geometry}
        material={materials.Mars}
        scale={1.5}
        ref={mars}
      />
      { tile != undefined && <Tile tile={tile} wrapperRadius={0.6} device={device}/> }
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
    </animated.group>
  );
}
