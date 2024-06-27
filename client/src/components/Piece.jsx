
import { socket } from "../SocketManager";
import { useAtom } from "jotai";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { getLegalTiles } from "../helpers/legalTiles";
import Rocket from "../meshes/Rocket.jsx";
import Ufo from "../meshes/Ufo.jsx";
import { teamsAtom, gamePhaseAtom, yootThrownAtom, selectionAtom, tilesAtom, legalTilesAtom, hasTurnAtom, clientAtom, mainAlertAtom, animationPlayingAtom } from "../GlobalState.jsx";
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

  const [selection] = useAtom(selectionAtom);
  const [legalTiles] = useAtom(legalTilesAtom)
  const [client] = useAtom(clientAtom)
  const [teams] = useAtom(teamsAtom);
  const [gamePhase] = useAtom(gamePhaseAtom)
  const [yootThrown] = useAtom(yootThrownAtom)
  const [tiles] = useAtom(tilesAtom)
  const [hasTurn] = useAtom(hasTurnAtom)
  const [animationPlaying] = useAtom(animationPlayingAtom)
  const [_mainAlert, setMainAlert] = useAtom(mainAlertAtom)
  const params = useParams()

  const group = useRef();
  const wrapperMat = useRef();
  const wrapper = useRef();

  useFrame((state, delta) => {
    // wrapperMat.current.opacity = 0.2
    if (!animationPlaying) {
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
        // wrapperMat.current.opacity = 0.2
      } else if (animation === 'onBoard') { // 'selectable' overrides 'onBoard'
        // Up and down movement
        // wrapper.current.position.z = position[2] + Math.cos(state.clock.elapsedTime * 2) * 0.1
      } else {
        group.current.scale.x = scale
        group.current.scale.y = scale
        group.current.scale.z = scale
      }
    }
  });

  function handlePointerEnter(event) {
    event.stopPropagation();
    // wrapperMat.current.opacity += 0.2;
    document.body.style.cursor = "pointer";
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    // wrapperMat.current.opacity -= 0.2;
    document.body.style.cursor = "default";
  }

  // Piece selected: bulge
  // rocket shaking on selected
  function handlePointerDown(event) {
    console.log(`[Piece] click`)
    
    if (gamePhase === "game" && hasTurn && client.team === team && !yootThrown.flag && !animationPlaying) {
      event.stopPropagation();
      setMainAlert({ type: '' })
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

          socket.emit("select", { roomId: params.id, payload: { tile, pieces } })
        }
      } else {
        console.log(`[Piece] selection is not null`)
        if (selection.tile != tile && tile in legalTiles) {
          console.log(`[Piece] moving piece`)
          socket.emit("move", { roomId: params.id, tile });
        } else {

          socket.emit("legalTiles", { roomId: params.id, legalTiles: {} })
  
          socket.emit("select", { roomId: params.id, payload: null });
        }
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
        rotation={[-Math.PI / 4, 0, 0]}
        onPointerDown={(event) => handlePointerDown(event)}
        onPointerOver={(event) => handlePointerEnter(event)}
        onPointerLeave={(event) => handlePointerLeave(event)}
        ref={wrapper}
      >
        <sphereGeometry args={[0.55, 32, 16]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          ref={wrapperMat}
          depthWrite={false}
        />
      </mesh>
      { team === 0 ? <Rocket animation={!animationPlaying ? animation : null}/> : <Ufo animation={!animationPlaying ? animation : null}/>}
    </animated.group>
  )      
};