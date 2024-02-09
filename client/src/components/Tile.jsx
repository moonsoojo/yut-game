import { useRef } from "react";
import { useAtom } from "jotai";
import { teamsAtom, selectionAtom, tilesAtom, socket, legalTilesAtom, turnAtom, clientAtom } from "../SocketManager";
import Pointer from "../meshes/Pointer"
import React from "react";
import Piece from "./Piece";
import { isMyTurn } from "../helpers/helpers";
import layout from "../layout";

export default function Tile({ tile, wrapperRadius, device }) {
  const wrapper = useRef();
  const [selection] = useAtom(selectionAtom);
  const [tiles] = useAtom(tilesAtom);
  const [legalTiles] = useAtom(legalTilesAtom)
  const [turn] = useAtom(turnAtom)
  const [teams] = useAtom(teamsAtom)
  const [client] = useAtom(clientAtom)

  function handlePointerEnter(event) {
    event.stopPropagation();
    if (selection != null && isMyTurn(turn, teams, client.id)) {
      document.body.style.cursor = "pointer";
      wrapper.current.opacity += 0.2;
    }
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    if (selection != null && isMyTurn(turn, teams, client.id)) {
      document.body.style.cursor = "default";
      wrapper.current.opacity -= 0.2;
    }
  }

  function handlePointerDown(event) {
    event.stopPropagation();
    if (selection != null) {
      if (isMyTurn(turn, teams, client.id)) {
        if (selection.tile != tile && tile in legalTiles) {
          socket.emit("move", { destination: tile, moveInfo: legalTiles[tile] }, ({ error }) => {
            if (error) {
              console.log("move error", error)
            }
          });
        }
        socket.emit("legalTiles", {legalTiles: {}})
        socket.emit("select", null);
      }
    }
  }

  const rocketPositions = [
    [-0.15, 1, 0.2],
    [0.15, 1, 0.2],
    [-0.15, 1, 0.5],
    [0.15, 1, 0.5],
  ];

  const ufoPositions = [
    [-0.15, 1, 0.1],
    [0.15, 1, 0.1],
    [-0.15, 1, 0.4],
    [0.15, 1, 0.4],
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
              scale={0.9}
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
        scale={4}
      >
        {/* wrapper */}
        <sphereGeometry args={[wrapperRadius]} />
        <meshStandardMaterial
          transparent
          opacity={selection != null && tile in legalTiles ? 0.5 : 0}
          color={selection != null && tile in legalTiles ? (selection.pieces[0].team == 0 ? "pink" : "turquoise") : ""}
          ref={wrapper}
        />
      </mesh>
      {/* scale necessary because it's different from pieces at home or under team name */}
      <group scale={layout[device].tilePieceScale}>
        <Pieces/>
      </group>
      { selection != null && tile in legalTiles && <Pointer tile={tile} color={selection.pieces[0].team == 0 ? "red" : "turquoise"}/>}
      {/* { <Pointer tile={tile} color={"turquoise" } device={device} />} */}
    </group>
  );
}
