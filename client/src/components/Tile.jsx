import { useRef } from "react";
import { useAtom } from "jotai";
import { socket } from "../SocketManager";
import React from "react";
import { useFrame } from "@react-three/fiber";
import { hasTurnAtom, legalTilesAtom, selectionAtom } from "../GlobalState";
import * as THREE from 'three';
import Pointer from "../meshes/Pointer";
import { useParams } from "wouter";
import Rocket from "../meshes/Rocket";
import Ufo from "../meshes/Ufo";
import Piece from "./Piece";

// Pass pieces as children of mesh (like Earth)
// Score button, Legal tiles and Piece selection are server events
// Set client has turn in Socket Manager
// Use this to prevent click in the components
export default function Tile({ 
  position=[0,0,0], 
  rotation=[0,0,0], 
  scale=1, 
  tile,
  pieces=undefined, 
  mesh,
  legalTileInfo, // If key is not in the object, it's undefined
  interactive=false
}) {

  const [selection, setSelection] = useAtom(selectionAtom);
  const [_legalTiles, setLegalTiles] = useAtom(legalTilesAtom);
  const [hasTurn] = useAtom(hasTurnAtom)
  const params = useParams()

  const group = useRef()
  const wrapperMat = useRef();

  function handlePointerEnter(event) {
    event.stopPropagation();
    if (wrapperMat.current) {
      wrapperMat.current.opacity += 0.2;
    }
    document.body.style.cursor = "pointer";
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    if (wrapperMat.current) {
      wrapperMat.current.opacity -= 0.2;
    }
    document.body.style.cursor = "default";
  }

  function handlePointerDown(event) {
    console.log(`[Tile] click`)
    console.log(`[Tile] selection`, selection, `hasTurn`, hasTurn)
    event.stopPropagation();
    if (selection && hasTurn) {
      if (selection.tile != tile && legalTileInfo) {
        // Server clears legalTiles and selection
        // When they're called separately, the order of operation is not kept
        socket.emit("move", { roomId: params.id, tile });
      } else {

        socket.emit("legalTiles", { roomId: params.id, legalTiles: {} })
        // Set within client for faster response
        // setLegalTiles({})
  
        socket.emit("select", { roomId: params.id, payload: null });
        // Set within client for faster response
        // setSelection(null)
      }
    }
  }

  function ArrangedPieces({ position, pieces }) {
    if (pieces.length === 1) {
      return <group position={position}>
        <Piece position={[0,0,0]} tile={tile} team={pieces[0].team} id={pieces[0].id} scale={1.2} animation={'onBoard'}/>
      </group>
    } else if (pieces.length === 2) {
      return <group position={position}>
        <Piece position={[-0.3,0,0]} tile={tile} team={pieces[0].team} id={pieces[0].id} scale={1.2} animation={'onBoard'}/>
        <Piece position={[0.3,0,0]} tile={tile} team={pieces[1].team} id={pieces[1].id} scale={1.2} animation={'onBoard'}/>
      </group>
    } else if (pieces.length === 3) {
      return <group position={position}>
        <Piece position={[0,0,-0.3]} tile={tile} team={pieces[0].team} id={pieces[0].id} scale={1.2} animation={'onBoard'}/>
        <Piece position={[-0.3,0,0.3]} tile={tile} team={pieces[1].team} id={pieces[1].id} scale={1.2} animation={'onBoard'}/>
        <Piece position={[0.3,0,0.3]} tile={tile} team={pieces[2].team} id={pieces[2].id} scale={1.2} animation={'onBoard'}/>
      </group>
    } else if (pieces.length === 4) {
      return <group position={position}>
        <Piece position={[-0.3,0,-0.3]} tile={tile} team={pieces[0].team} id={pieces[0].id} scale={1.2} animation={'onBoard'}/>
        <Piece position={[0.3,0,-0.3]} tile={tile} team={pieces[1].team} id={pieces[1].id} scale={1.2} animation={'onBoard'}/>
        <Piece position={[-0.3,0,0.3]} tile={tile} team={pieces[2].team} id={pieces[2].id} scale={1.2} animation={'onBoard'}/>
        <Piece position={[0.3,0,0.3]} tile={tile} team={pieces[3].team} id={pieces[3].id} scale={1.2} animation={'onBoard'}/>
      </group>
    }
  }

  useFrame((state) => {
    if (selection != null && legalTileInfo) {
      group.current.scale.x = scale + Math.cos(state.clock.elapsedTime * 3) * 0.4 + 0.5
      group.current.scale.y = scale + Math.cos(state.clock.elapsedTime * 3) * 0.4 + 0.5
      group.current.scale.z = scale + Math.cos(state.clock.elapsedTime * 3) * 0.4 + 0.5
    } else {
      group.current.scale.x = scale
      group.current.scale.y = scale
      group.current.scale.z = scale
    }
  })

  return <group position={position} rotation={rotation} scale={scale}>
    { selection != null && legalTileInfo && <Pointer 
      scale={2}
      position={[0, 2, 0]}
      tile={tile} 
      color={selection.pieces[0].team === 0 ? "red" : "turquoise"}
    />}
    <group ref={group}>
      <mesh
        onPointerEnter={(e) => { interactive && handlePointerEnter(e) }}
        onPointerLeave={(e) => { interactive && handlePointerLeave(e) }}
        onPointerDown={(e) => { interactive && handlePointerDown(e) }}
      >
        <sphereGeometry args={[0.8, 32, 16]} />
        <meshStandardMaterial
          transparent
          opacity={0}
          ref={wrapperMat}
          depthWrite={false}
        />
      </mesh>
      {mesh}
      { pieces && <ArrangedPieces position={[0, 1, 0]} pieces={pieces}/> }
      {/* (gamePhase === "game" && 29 in legalTiles && selection !== null && selection.tile == tile) && <ScoreButton
        position={[-0.3,6,-1.2]}
        scale={2}
      />*/} 
    </group>
  </group>
}