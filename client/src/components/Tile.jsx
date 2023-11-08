import { useRef } from "react";
import { useAtom } from "jotai";
import { selectionAtom, tilesAtom, socket, legalTilesAtom } from "../SocketManager";
import Rocket from "../Rocket";
import Ufo from "../Ufo";
import Pointer from "../meshes/Pointer"
import React from "react";

export default function Tile({ tile, wrapperRadius }) {
  const wrapper = useRef();
  const [selection] = useAtom(selectionAtom);
  const selected =
    selection != null &&
    selection.type === "tile" &&
    selection.tile == tile;
  const [tiles] = useAtom(tilesAtom);
  const [legalTiles] = useAtom(legalTilesAtom)

  function handlePointerEnter(event) {
    if (!hasPiece(tiles, tile)) {
      event.stopPropagation();
      document.body.style.cursor = "pointer";
      if (!selected) {
        wrapper.current.opacity += 0.2;
      }
    }
  }

  function handlePointerLeave(event) {
    if (!hasPiece(tiles, tile)) {
      event.stopPropagation();
      document.body.style.cursor = "default";
      if (!selected) {
        wrapper.current.opacity -= 0.2;
      }
    }
  }

  function handlePointerDown(event) {
    if (selection != null) {
      event.stopPropagation();
      if (selection.tile != tile) {
        console.log("[Rocket][handlePointerDown] selection", selection)
        socket.emit("move", { from: selection.tile, to: tile, moveUsed: legalTiles[tile].move, path: legalTiles[tile].path, pieces: selection.pieces });
      }
      socket.emit("select", null);
    }
  }

  function hasPiece(tiles, tile) {
    return tiles[tile].length > 0
  }

  const rocketPositions = [
    [-0.1, -0.2 + wrapperRadius, 0.4],
    [-0.1, -0.2 + wrapperRadius, 0.1],
    [-0.3, -0.2 + wrapperRadius, 0.4],
    [-0.3, -0.2 + wrapperRadius, 0.1],
  ];

  const ufoPositions = [
    [0.1, 0.1 + wrapperRadius, 0.1],
    [0.1, 0.1 + wrapperRadius, -0.2],
    [-0.2, 0.1 + wrapperRadius, 0.1],
    [-0.2, 0.1 + wrapperRadius, -0.2],
  ];

  function Piece() {
    if (tiles[tile].length > 0) {
      if (tiles[tile][0].team == 0) {
        return (
          <>
            {tiles[tile].map((value, index) => (
              <Rocket
                position={rocketPositions[index]}
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
      } else {
        return (
          <>
            {tiles[tile].map((value, index) => (
              <Ufo
                position={ufoPositions[index]}
                keyName={`count${index}`}
                tile={tile}
                team={1}
                id={value.id}
                key={index}
              />
            ))}
          </>
        );
      }
    }
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
      <Piece />
      { selection != null && tile in legalTiles && <Pointer color={selection.pieces[0].team == 0 ? "red" : "turquoise"}/>}
    </group>
  );
}
