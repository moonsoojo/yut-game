import { useRef } from "react";
import { useAtom } from "jotai";
import { socket } from "../SocketManager";
import React from "react";
import { useFrame } from "@react-three/fiber";
import { hasTurnAtom, legalTilesAtom, selectionAtom } from "../GlobalState";
import * as THREE from 'three';
import Pointer from "../meshes/Pointer";
import { useParams } from "wouter";

// Pass pieces as children of mesh (like Earth)
// Score button, Legal tiles and Piece selection are server events
// Set client has turn in Socket Manager
// Use this to prevent click in the components

// wrapperScale: meshes are different sizes. One wrapper size doesn't fit all
export default function Tile({ 
  position=[0,0,0], 
  rotation=[0,0,0], 
  scale=1, 
  tile,
  pieces, 
  mesh,
  legalTileInfo // If key is not in the object, it's undefined
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
        // remove callback
        socket.emit("move", { roomId: params.id, moveInfo: legalTileInfo });
      }

      socket.emit("legalTiles", { roomId: params.id, legalTiles: {} })
      // Set within client for faster response
      setLegalTiles({})

      socket.emit("select", { roomId: params.id, payload: null });
      // Set within client for faster response
      setSelection(null)
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
        onPointerEnter={(e) => handlePointerEnter(e)}
        onPointerLeave={(e) => handlePointerLeave(e)}
        onPointerDown={(e) => handlePointerDown(e)}
      >
        <sphereGeometry args={[0.8, 32, 16]} />
        <meshStandardMaterial
          transparent
          opacity={0}
          ref={wrapperMat}
        />
      </mesh>
      {mesh}
      {/* (gamePhase === "game" && 29 in legalTiles && selection !== null && selection.tile == tile) && <ScoreButton
        position={[-0.3,6,-1.2]}
        scale={2}
      />*/} 
    </group>
  </group>
}