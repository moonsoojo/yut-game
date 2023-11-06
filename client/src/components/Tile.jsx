import { useRef } from "react";
import { useAtom } from "jotai";
import { selectionAtom, tilesAtom, socket, legalTilesAtom } from "../SocketManager";
import Rocket from "../Rocket";
import Ufo from "../Ufo";
import Pointer from "../meshes/Pointer"
import React from "react";

export default function Tile({ tileIndex, wrapperRadius }) {
  const wrapper = useRef();
  const [selection] = useAtom(selectionAtom);
  const selected =
    selection != null &&
    selection.type === "tile" &&
    selection.tile == tileIndex;
  const [tiles] = useAtom(tilesAtom);
  const [legalTiles, setLegalTiles] = useAtom(legalTilesAtom)


  function handlePointerEnter(event) {
    event.stopPropagation();
    document.body.style.cursor = "pointer";
    if (!selected) {
      wrapper.current.opacity += 0.2;
    }
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    document.body.style.cursor = "default";
    if (!selected) {
      wrapper.current.opacity -= 0.2;
    }
  }

  function handlePointerDown(event) {
    event.stopPropagation();
    if (selection == null) {
      socket.emit("select", { type: "tile", tile: tileIndex });
    } else {
      if (selection.tile != tileIndex) {
        socket.emit("placePiece", tileIndex);
      }
      socket.emit("select", null);
    }
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
    if (tiles[tileIndex].length > 0) {
      if (tiles[tileIndex][0].team == 0) {
        return (
          <>
            {tiles[tileIndex].map((value, index) => (
              <Rocket
                position={rocketPositions[index]}
                keyName={`count${index}`}
                tile={tileIndex}
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
            {tiles[tileIndex].map((value, index) => (
              <Ufo
                position={ufoPositions[index]}
                keyName={`count${index}`}
                tile={tileIndex}
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
          opacity={selected ? 0.5 : 0}
          color={selected ? "yellow" : ""}
          ref={wrapper}
        />
      </mesh>
      <Piece />
      { selection != null && tileIndex in legalTiles && <Pointer color={selection.team == 0 ? "red" : "turquoise"}/>}
    </group>
  );
}
