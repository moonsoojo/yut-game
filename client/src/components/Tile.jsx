import { useRef } from "react";
import { useAtom } from "jotai";
import { socket } from "../SocketManager";
import React from "react";
import { useFrame } from "@react-three/fiber";
import { clientAtom, gamePhaseAtom, hasTurnAtom, selectionAtom, teamsAtom, tilesAtom, yootThrownAtom } from "../GlobalState";
import Pointer from "../meshes/Pointer";
import { useParams } from "wouter";
import { Text3D } from "@react-three/drei";
import { getLegalTiles } from "../helpers/legalTiles";

export default function Tile({ 
  position=[0,0,0], 
  rotation=[0,0,0], 
  scale=1, 
  tile=null,
  mesh,
  legalTileInfo, // If key is not in the object, it's undefined
  pathNum,
  interactive=false
}) {

  const [selection] = useAtom(selectionAtom);
  const [hasTurn] = useAtom(hasTurnAtom)
  const [yootThrown] = useAtom(yootThrownAtom)
  const [tiles] = useAtom(tilesAtom)
  const [teams] = useAtom(teamsAtom)
  const [client] = useAtom(clientAtom)
  const [gamePhase] = useAtom(gamePhaseAtom)
  const params = useParams()

  const group = useRef()
  const wrapperMat = useRef();
  const wrapper = useRef();

  function handlePointerEnter(event) {
    event.stopPropagation();
    // Doesn't change in Chrome
    // Browser runs on compatibility mode in prod
    document.body.style.cursor = "pointer";
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    document.body.style.cursor = "default";
  }

  function handlePointerDown(event) {
    console.log(`[Tile] click`)
    event.stopPropagation();
    const team = client.team
    if (gamePhase === "game" && hasTurn && !yootThrown.flag) {
      if (selection === null) {
        let pieces = tiles[tile]
        let history = tiles[tile][0].history
        let legalTiles = getLegalTiles(tile, teams[team].moves, teams[team].pieces, history)
        if (!(Object.keys(legalTiles).length == 0)) {
          socket.emit("legalTiles", { roomId: client.roomId, legalTiles })

          socket.emit("select", { roomId: params.id, payload: { tile, pieces } })
        }
      } else {
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
  }

  useFrame((state) => {
    if (selection != null && legalTileInfo) {
      // group.current.scale.x = scale + Math.cos(state.clock.elapsedTime * 3) * 0.4 + 0.5
      // group.current.scale.y = scale + Math.cos(state.clock.elapsedTime * 3) * 0.4 + 0.5
      // group.current.scale.z = scale + Math.cos(state.clock.elapsedTime * 3) * 0.4 + 0.5
      // wrapper.current.scale.x = scale + Math.cos(state.clock.elapsedTime * 3) * 0.4
      // wrapper.current.scale.y = scale + Math.cos(state.clock.elapsedTime * 3) * 0.4
      // wrapper.current.scale.z = scale + Math.cos(state.clock.elapsedTime * 3) * 0.4
      wrapperMat.current.opacity = 0.2;
    } else {
      // group.current.scale.x = scale
      // group.current.scale.y = scale
      // group.current.scale.z = scale
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
        ref={wrapper}
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
      <group name='pathNum'>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[0.3, 1, -0.3]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.2}
          height={0.01}
        >
          {pathNum}
          <meshStandardMaterial color="#b3b10f"/>
        </Text3D>
      </group>
      {/* <HtmlElement
        text={pathNum}
        fontSize={15}
      /> */}
    </group>
  </group>
}