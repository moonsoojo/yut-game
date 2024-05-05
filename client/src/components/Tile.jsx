import { useRef } from "react";
import { useAtom } from "jotai";
import { socket } from "../SocketManager";
import React from "react";
import { useFrame } from "@react-three/fiber";
import { hasTurnAtom, selectionAtom } from "../GlobalState";
import * as THREE from 'three';
import Pointer from "../meshes/Pointer";

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

  const [selection] = useAtom(selectionAtom);
  const [hasTurn] = useAtom(hasTurnAtom)

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
    event.stopPropagation();
    if (selection && hasTurn) {
      if (selection.tile != tile && legalTileInfo) {
        socket.emit("move", { destination: tile, moveInfo: legalTileInfo }, ({ error }) => {
          if (error) {
            console.log("move error", error)
          }
        });
      }
      socket.emit("legalTiles", {legalTiles: {}})
      socket.emit("select", null);
    }
  }

  useFrame((state) => {
    if (selection != null && legalTileInfo) {
      group.current.scale.x = scale + Math.cos(state.clock.elapsedTime * 3) * 0.4 + 0.5
      group.current.scale.y = scale + Math.cos(state.clock.elapsedTime * 3) * 0.4 + 0.5
      group.current.scale.z = scale + Math.cos(state.clock.elapsedTime * 3) * 0.4 + 0.5
      // wrapperMat.current.opacity = 0.2
    } else {
      group.current.scale.x = scale
      group.current.scale.y = scale
      group.current.scale.z = scale
      // wrapperMat.current.opacity = 0
    }
  })

  return (
    <group position={position} rotation={rotation} scale={scale} ref={group}>
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
      { selection != null && legalTileInfo && <Pointer 
        scale={1.8}
        position={[0, 1.2, 0]}
        tile={tile} 
        color={selection.pieces[0].team === 0 ? "red" : "turquoise"}
      />}
      {/* 
      {(gamePhase === "game" && 29 in legalTiles && selection !== null && selection.tile == tile) && <ScoreButton
        position={[-0.3,6,-1.2]}
        scale={2}
      />} */}
    </group>
  );
}