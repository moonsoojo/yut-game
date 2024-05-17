import { useMemo, useRef } from "react";
import { useAtom } from "jotai";
import { socket } from "../SocketManager";
import React from "react";
import { useFrame } from "@react-three/fiber";
import { hasTurnAtom, legalTilesAtom, selectionAtom } from "../GlobalState";
import Pointer from "../meshes/Pointer";
import { useParams } from "wouter";
import Piece from "./Piece";
import HtmlElement from "../HtmlElement";

export default function Tile({ 
  position=[0,0,0], 
  rotation=[0,0,0], 
  scale=1, 
  tile,
  mesh,
  legalTileInfo, // If key is not in the object, it's undefined
  pathNum,
  interactive=false
}) {

  const [selection] = useAtom(selectionAtom);
  const [_legalTiles] = useAtom(legalTilesAtom);
  const [hasTurn] = useAtom(hasTurnAtom)
  const params = useParams()

  const group = useRef()
  const wrapperMat = useRef();

  function handlePointerEnter(event) {
    event.stopPropagation();
    document.body.style.cursor = "pointer";
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    document.body.style.cursor = "default";
  }

  function handlePointerDown(event) {
    event.stopPropagation();
    if (selection && hasTurn) {
      if (selection.tile != tile && legalTileInfo) {
        // Server clears legalTiles and selection
        // When they're called separately, the order of operation is not kept
        socket.emit("move", { roomId: params.id, tile });
      } else {

        socket.emit("legalTiles", { roomId: params.id, legalTiles: {} })
  
        socket.emit("select", { roomId: params.id, payload: null });
      }
    }
  }

  useFrame((state) => {
    if (selection != null && legalTileInfo) {
      group.current.scale.x = scale + Math.cos(state.clock.elapsedTime * 3) * 0.4 + 0.5
      group.current.scale.y = scale + Math.cos(state.clock.elapsedTime * 3) * 0.4 + 0.5
      group.current.scale.z = scale + Math.cos(state.clock.elapsedTime * 3) * 0.4 + 0.5
      wrapperMat.current.opacity = 0.2;
    } else {
      group.current.scale.x = scale
      group.current.scale.y = scale
      group.current.scale.z = scale
      wrapperMat.current.opacity = 0;
    }
  })

  return <group position={position} rotation={rotation} scale={scale}>
    {/* { selection != null && legalTileInfo && <Pointer 
      scale={2}
      position={[0, 2, 0]}
      tile={tile} 
      color={selection.pieces[0].team === 0 ? "red" : "turquoise"}
    />} */}
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
      {/* path num */}
      <HtmlElement
        text={pathNum}
        position={[-0.5, 0, -1]}
        rotation={[-Math.PI/2, 0, 0]}
        fontSize={15}
      />
    </group>
  </group>
}