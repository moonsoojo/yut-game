
import { socket } from "../SocketManager";
import { useAtom } from "jotai";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { getLegalTiles } from "../helpers/legalTiles";
import Rocket from "../meshes/Rocket.jsx";
import Ufo from "../meshes/Ufo.jsx";
import { teamsAtom, gamePhaseAtom, yootThrownAtom, selectionAtom, tilesAtom, legalTilesAtom, hasTurnAtom, clientAtom } from "../GlobalState.jsx";
import { useParams } from "wouter";
import { pieceStatus } from "../helpers/helpers.js";

export default function Piece ({
  position=[0,0,0],
  rotation=[0,0,0],
  tile,
  team,
  id,
  scale=1,
  animate=false
}) {

  const [selection, setSelection] = useAtom(selectionAtom);
  const [legalTiles, setLegalTiles] = useAtom(legalTilesAtom)
  const [client] = useAtom(clientAtom)
  const [teams] = useAtom(teamsAtom);
  const [gamePhase] = useAtom(gamePhaseAtom)
  const [yootThrown] = useAtom(yootThrownAtom)
  const [tiles] = useAtom(tilesAtom)
  const [hasTurn] = useAtom(hasTurnAtom)
  const params = useParams()

  const group = useRef();
  const wrapperMat = useRef();

  // if tile == -1, scale = 1
  // else, scale = 0.5
  if (selection != null) {
    if (selection.tile == -1) {
      if (selection.pieces[0].id == id && selection.pieces[0].team == team) {
        scale *= 1.5
      }
    } else {
      if (selection.tile == tile) {
        scale *= 1.5
      }
    }
  }

  useFrame((state, delta) => {
    if (animate) {
      // Bulging
      group.current.scale.x = scale + Math.cos(state.clock.elapsedTime * 1.5) * 0.05
      group.current.scale.y = scale + Math.cos(state.clock.elapsedTime * 1.5) * 0.05
      group.current.scale.z = scale + Math.cos(state.clock.elapsedTime * 1.5) * 0.05
      // Up and down movement
      group.current.position.z = position[2] + Math.cos(state.clock.elapsedTime * 2) * 0.1
    } else {
      group.current.scale.x = scale
      group.current.scale.y = scale
      group.current.scale.z = scale
    }
  });

  function handlePointerEnter(event) {
    event.stopPropagation();
    wrapperMat.current.opacity += 0.2;
    document.body.style.cursor = "pointer";
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    wrapperMat.current.opacity -= 0.2;
    document.body.style.cursor = "default";
  }

  function handlePointerDown(event) {
    if (gamePhase === "game" && client.team == team && hasTurn && !yootThrown.flag) {
      console.log(`[Piece] click`)
      event.stopPropagation();
      if (selection === null) {
        console.log(`[Piece] selection is null`)
        let pieces;
        let history;
        if (pieceStatus(tile) === 'home') {
          history = []
          pieces = [{tile, team, id, history}]
        } else {
          history = tiles[tile][0].history
          pieces = tiles[tile];
        }
        let legalTiles = getLegalTiles(tile, teams[team].moves, teams[team].pieces, history)
        if (!(Object.keys(legalTiles).length == 0)) {
          socket.emit("legalTiles", { roomId: client.roomId, legalTiles })
          // Set within client for faster response
          setLegalTiles(legalTiles)

          socket.emit("select", { 
            roomId: params.id, 
            payload: { tile, pieces } 
          })
          // Set within client for faster response
          setSelection({ tile, pieces })
        }
      } else {
        if (selection.tile != tile && tile in legalTiles) {
          socket.emit("move", ({ destination: tile }))
        }

        socket.emit("legalTiles", { legalTiles: {} })
        // Set within client for faster response
        setLegalTiles({})

        socket.emit("select", { 
          roomId: params.id, 
          payload: null
        });
        // Set within client for faster response
        setSelection(null)
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
      { team == 0 ? <Rocket animate={animate}/> : <Ufo animate={animate}/>}
    </group>
  )      
};