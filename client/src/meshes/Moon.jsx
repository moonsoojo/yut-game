import { selectionAtom, tilesAtom, socket } from "../SocketManager";
import { useTexture } from "@react-three/drei";
import React from "react";
import Rocket from "./Rocket";
import Ufo from "./Ufo";
import Tile from '../components/Tile';
import { useRef } from "react";
import { useAtom } from "jotai";

export default function Moon({ position, tile, scale = 1 }) {
  const props = useTexture({
    map: "textures/moon/moon-color.jpg",
  });

  const wrap = useRef();
  const moon = useRef();

  const [selection] = useAtom(selectionAtom);
  const [tiles] = useAtom(tilesAtom);

  function handlePointerEnter(event) {
    event.stopPropagation();
    document.body.style.cursor = "pointer";
    // starMatRef.current.color.r -= 1;
    // starMatRef.current.color.g -= 0.5;
    wrap.current.opacity += 0.5;
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    document.body.style.cursor = "default";
    // starMatRef.current.color.r += 1;
    // starMatRef.current.color.g += 0.5;
    wrap.current.opacity -= 0.5;
  }

  function handlePointerDown(event) {
    event.stopPropagation();
    if (selection == null) {
      // setSelection({ type: "tile", tile });
      socket.emit("select", { type: "tile", tile });
    } else {
      if (selection.tile != tile) {
        // setPiece({ destination: tile });
        socket.emit("placePiece", tile);
      }
      // setSelection(null);
      socket.emit("select", null);
    }
  }

  const rocketPositions = [
    [-0.1, 1.3, 0.1],
    [-0.1, 1.3, -0.2],
    [-0.4, 1.3, 0.1],
    [-0.4, 1.3, -0.2],
  ];

  const ufoPositions = [
    [0.1, 1, 0.1],
    [0.1, 1, -0.3],
    [-0.3, 1, 0.1],
    [-0.3, 1, -0.3],
  ];

  function Piece() {
    if (tiles[tile][0].team == 1) {
      return (
        <>
          {tiles[tile].map((value, index) => (
            <Rocket
              position={rocketPositions[index]}
              keyName={`count${index}`}
              tile={tile}
              team={1}
              id={value.id}
              key={index}
              scale={0.6}
            />
          ))}
        </>
      );
    } else {
      return (
        <>
          {tiles[tile].map((value, index) => (
            <Ufo
              position={ufoPositions[index]}
              keyName={`count${index}`}
              tile={tile}
              team={0}
              id={value.id}
              key={index}
              scale={0.4}
            />
          ))}
        </>
      );
    }
  }

  return (
    <group
      ref={moon}
      position={position}
      scale={
        selection != null && selection.type === "tile" && selection.tile == tile
          ? scale * 1.3
          : scale * 1
      }
    >
      <mesh
        onPointerDown={(e) => handlePointerDown(e)}
        onPointerEnter={(e) => handlePointerEnter(e)}
        onPointerLeave={(e) => handlePointerLeave(e)}
      >
        <sphereGeometry args={[1]} />
        <meshStandardMaterial transparent opacity={0} ref={wrap} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial map={props.map} />
      </mesh>
      {tile && tiles[tile].length != 0 && <Piece />}
      <Tile tile={tile} wrapperRadius={0.6} />
    </group>
  );
}
