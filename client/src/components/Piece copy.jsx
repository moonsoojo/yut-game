
import { socket } from "../SocketManager";
import { useAtom } from "jotai";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { getLegalTiles } from "../helpers/legalTiles";
import Rocket from "../meshes/Rocket.jsx";
import Ufo from "../meshes/Ufo.jsx";
import { hasValidMove, isMyTurn } from '../helpers/helpers.js'
import { turnAtom, teamsAtom, gamePhaseAtom, clientAtom, yootThrownAtom, selectionAtom } from "../GlobalState.jsx";
import * as THREE from 'three';

export default function Piece ({
  position,
  rotation,
  tile,
  team,
  id,
  scale,
  animate=false
}) {
  // console.log(`[Piece] animate`, animate) // true

  const [selection] = useAtom(selectionAtom);
  const [teams] = useAtom(teamsAtom);
  // const [tiles] = useAtom(tilesAtom)
  const [turn] = useAtom(turnAtom);
  const [gamePhase] = useAtom(gamePhaseAtom)
  // const [legalTiles] = useAtom(legalTilesAtom);
  const [client] = useAtom(clientAtom)
  const [thrown] = useAtom(yootThrownAtom)

  const group = useRef();
  const wrapperMat = useRef();

  // if tile == -1, scale = 1
  // else, scale = 0.5
  if (selection != null) {
    if (selection.tile == -1) {
      if (selection.pieces[0].id == id && selection.pieces[0].team == team) {
        scale *= 1.3
      }
    } else {
      if (selection.tile == tile) {
        scale *= 1.3
      }
    }
  }

  useFrame((state, delta) => {
    if (animate) {
      group.current.scale.x = scale + Math.cos(state.clock.elapsedTime * 2.5) * 0.2 + (0.1 / 2)
      group.current.scale.y = scale + Math.cos(state.clock.elapsedTime * 2.5) * 0.2 + (0.1 / 2)
      group.current.scale.z = scale + Math.cos(state.clock.elapsedTime * 2.5) * 0.2 + (0.1 / 2)
    } else {
      group.current.scale.x = scale
      group.current.scale.y = scale
      group.current.scale.z = scale
    }
  });

  function handlePointerEnter(event) {
    event.stopPropagation();
    if (isMyTurn(turn, teams, client.id)) {
      wrapperMat.current.opacity += 0.2;
      document.body.style.cursor = "pointer";
    }
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    if (isMyTurn(turn, teams, client.id)) {
      wrapperMat.current.opacity -= 0.2;
      document.body.style.cursor = "default";
    }
  }

  function handlePointerDown(event) {
    // use piece.status instead of tile == -1
    // fixed in server room.teams.$.pieces schema
    if (gamePhase === "game" && 
    client.team == team && 
    hasValidMove(teams[team].moves) && 
    isMyTurn(turn, teams, client.id) &&
    !thrown) {
      event.stopPropagation();
      if (selection == null) {
        let starting = tile == -1 ? true : false;
        let pieces;
        if (starting) {
          pieces = [{tile, team, id, history: []}]
        } else {
          pieces = tiles[tile];
        }
        let history = tile == -1 ? [] : tiles[tile][0].history
        let legalTiles = getLegalTiles(tile, teams[team].moves, teams[team].pieces, history)
        if (!(Object.keys(legalTiles).length == 0)) {
          socket.emit("legalTiles", { legalTiles })
          socket.emit("select", { tile, pieces })
        }
      } else {
        if (selection.tile != tile && tile in legalTiles) {
          socket.emit("move", ({ destination: tile }))
        }
        socket.emit("legalTiles", {legalTiles: {}})
        socket.emit("select", null);
      }
    }
  }

  let wrapPosition = team == 0 ? [0, -0.4, 0.4] : [0, 0, 0]
  position = team == 0 ? [position[0], position[1] + 0.2, position[2]-0.5] : position;

  return (
    <group
      position={position}
      rotation={rotation}
      ref={group}
      dispose={null}
      scale={scale}
    >
      <mesh
        castShadow
        position={wrapPosition}
        visible={true}
        rotation={[-Math.PI / 4, 0, 0]}
        onPointerDown={(event) => handlePointerDown(event)}
        onPointerOver={(event) => handlePointerEnter(event)}
        onPointerLeave={(event) => handlePointerLeave(event)}
      >
        <sphereGeometry args={[0.55, 32, 16]} />
        <meshStandardMaterial
          transparent
          opacity={0}
          ref={wrapperMat}
        />
      </mesh>
      { team == 0 ? <Rocket animate={animate}/> : <Ufo/>}
    </group>
  )      
};