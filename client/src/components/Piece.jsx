
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
import { animated } from "@react-spring/three";

export default function Piece ({
  position=[0,0,0],
  rotation=[0,0,0],
  tile,
  team,
  id,
  scale=1,
  animation=null,
  selected=false
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

  useFrame((state, delta) => {
    if (selected) {
      group.current.scale.x = scale + Math.cos(state.clock.elapsedTime * 1.5) * 0.2 + 0.8
      group.current.scale.y = scale + Math.cos(state.clock.elapsedTime * 1.5) * 0.2 + 0.8
      group.current.scale.z = scale + Math.cos(state.clock.elapsedTime * 1.5) * 0.2 + 0.8
    } else if (animation === 'selectable') {
      // Bulging
      group.current.scale.x = scale + Math.cos(state.clock.elapsedTime * 1.5) * 0.1
      group.current.scale.y = scale + Math.cos(state.clock.elapsedTime * 1.5) * 0.1
      group.current.scale.z = scale + Math.cos(state.clock.elapsedTime * 1.5) * 0.1
      // Up and down movement
      group.current.position.z = position[2] + Math.cos(state.clock.elapsedTime * 2) * 0.1
    } else if (animation === 'onBoard') { // 'selectable' overrides 'onBoard'
      // Up and down movement
      // moved to meshes because there's already animation applied on it in PiecesOnBoard
      // group.current.position.z = position[2] + Math.cos(state.clock.elapsedTime * 2) * 0.1
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

  // Piece selected: bulge
  // rocket shaking on selected
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

  return (
    <animated.group
      position={position}
      rotation={rotation}
      ref={group}
      scale={scale}
    >
      <mesh
        castShadow
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
          depthWrite={false}
        />
      </mesh>
      { team === 0 ? <Rocket animation={animation}/> : <Ufo animation={animation}/>}
    </animated.group>
  )      
};