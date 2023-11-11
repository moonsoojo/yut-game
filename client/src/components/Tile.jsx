import { useRef } from "react";
import { useAtom } from "jotai";
import { selectionAtom, tilesAtom, socket, legalTilesAtom } from "../SocketManager";
import Pointer from "../meshes/Pointer"
import React from "react";
import Piece from "./Piece";

export default function Tile({ tile, wrapperRadius }) {
  const wrapper = useRef();
  const [selection] = useAtom(selectionAtom);
  const [tiles] = useAtom(tilesAtom);
  const [legalTiles] = useAtom(legalTilesAtom)

  function handlePointerEnter(event) {
    if (selection != null) {
      event.stopPropagation();
      document.body.style.cursor = "pointer";
      wrapper.current.opacity += 0.2;
    }
  }

  function handlePointerLeave(event) {
    if (selection != null) {
      event.stopPropagation();
      document.body.style.cursor = "default";
      wrapper.current.opacity -= 0.2;
    }
  }

  function handlePointerDown(event) {
    if (selection != null) {
      event.stopPropagation();
      if (selection.tile != tile && tile in legalTiles) {
        socket.emit("move", { selection, tile, moveInfo: legalTiles[tile] });
      }
      socket.emit("legalTiles", {legalTiles: {}})
      socket.emit("select", null);
    }
  }

  let rocketAdjustY = (tile == 0 || tile == 5 || tile == 10 || tile == 15 || tile == 22) ? 0.1 : -0.1 

  const rocketPositions = [
    [-0.1, rocketAdjustY + wrapperRadius, 0.4],
    [-0.1, rocketAdjustY + wrapperRadius, 0.1],
    [-0.3, rocketAdjustY + wrapperRadius, 0.4],
    [-0.3, rocketAdjustY + wrapperRadius, 0.1],
  ];

  const ufoPositions = [
    [0.1, 0.1 + wrapperRadius, 0.1],
    [0.1, 0.1 + wrapperRadius, -0.2],
    [-0.2, 0.1 + wrapperRadius, 0.1],
    [-0.2, 0.1 + wrapperRadius, -0.2],
  ];

  function Pieces() { // app crashes when you click on a legalTile
    if (tiles[tile].length > 0) {
      return (
        <>
          {tiles[tile].map((value, index) => (
            <Piece
              position={tiles[tile][0].team == 0 ? rocketPositions[index] : ufoPositions[index]}
              keyName={`count${index}`}
              tile={tile}
              team={tiles[tile][0].team}
              id={value.id}
              key={index}
              scale={0.7}
            />
          ))}
        </>
      );
    }
    return <></>
  }

  return (
    <group>
      <mesh
        onPointerEnter={(e) => handlePointerEnter(e)}
        onPointerLeave={(e) => handlePointerLeave(e)}
        onPointerDown={(e) => handlePointerDown(e)}
      >
        <sphereGeometry args={[wrapperRadius]} />
        <meshStandardMaterial
          transparent
          opacity={selection != null && tile in legalTiles ? 0.5 : 0}
          color={selection != null && tile in legalTiles ? (selection.pieces[0].team == 0 ? "pink" : "turquoise") : ""}
          ref={wrapper}
        />
      </mesh>
      <Pieces />
      { selection != null && tile in legalTiles && <Pointer color={selection.pieces[0].team == 0 ? "red" : "turquoise"}/>}
    </group>
  );
}
