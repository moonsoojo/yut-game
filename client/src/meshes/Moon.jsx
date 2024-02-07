import { selectionAtom, tilesAtom, socket } from "../SocketManager";
import { useTexture } from "@react-three/drei";
import React from "react";
import Tile from '../components/Tile';
import HelperArrow from "./HelperArrow";
import { useRef, useEffect } from "react";
import { useAtom } from "jotai";
import layout from "../layout";

export default function Moon({ position, tile, scale = 1, device }) {
  const props = useTexture({
    map: "textures/moon/moon-color.jpg", // must use absolute path - string starts with a slash
  });

  const moon = useRef();

  return (
    <group
      ref={moon}
      position={position}
      scale={0.4}
    >
      <group scale={3.4}>
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial map={props.map} />
        </mesh>
      </group>
      <Tile tile={tile} wrapperRadius={0.7} device={device}/>
      <HelperArrow
        position={[0, 0, 1]}
        rotation={[Math.PI/2, 0, 0]}
        scale={0.9}
      />
      <HelperArrow
        position={[-1, 0, 0]}
        rotation={[0, 0, Math.PI/2]}
        scale={0.9}
      />
    </group>
  );
}
