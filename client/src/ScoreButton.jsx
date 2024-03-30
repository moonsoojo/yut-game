import React, { useRef, useState } from "react";
// import { useRocketStore } from "./state/zstore";
// import { useRocketStore } from "./state/zstore2";
import { Text3D, useGLTF } from "@react-three/drei";
import { selectionAtom, legalTilesAtom, displayScoreOptionsAtom, socket } from "./SocketManager";
import { useAtom } from "jotai";
import Pointer from "./meshes/Pointer";
import TextButton from "./components/TextButton";
import layout from "./layout";
import HtmlElement from "./HtmlElement";

const SCORE_TILE = 29
export default function ScoreButton({ position, scale }) {
  const { nodes, materials } = useGLTF('models/tooltip.glb')
  const [selection] = useAtom(selectionAtom);
  const [hoverScoreText, setHoverScoreText] = useState(false);
  const [legalTiles, setLegalTiles] = useAtom(legalTilesAtom)
  const [displayScoreOptions, setDisplayScoreOptions] = useAtom(displayScoreOptionsAtom)

  function scorePointerEnter() {
    document.body.style.cursor = "pointer";
  }

  function scorePointerOut() {
    document.body.style.cursor = "default";
  }

  function clickScore() {
    // event.stopPropagation();
    console.log('score clicked')
    if (selection != null && !displayScoreOptions) {
      // precondition: legalTiles is already populated
      if (29 in legalTiles) {
        if (legalTiles[29].length == 1) {
          socket.emit("score", { selectedMove: legalTiles[29][0] })
          socket.emit("select", null);
          socket.emit("legalTiles", { legalTiles: {} })
        } else {
          setDisplayScoreOptions(true);
        }
      }
    }
  }

  function Move({moveInfo, position}) {
    return <group position={position} rotation={[-Math.PI/2, 0, 0]}>
      <Text3D font="/fonts/Luckiest Guy_Regular.json" height={0.01} size={0.4}>
        {`score with ${moveInfo.move}`}
        <meshStandardMaterial color='limegreen'/>
      </Text3D>
      <mesh 
        name='wrapper' 
        position={[1.7, 0.2, 0]} 
        onPointerEnter={scorePointerEnter}
        onPointerLeave={scorePointerOut}
        onPointerDown={() => {
          socket.emit("score", {selectedMove: moveInfo});
          socket.emit("select", null)
          socket.emit("legalTiles", { legalTiles: {} });
          setDisplayScoreOptions(false);
        }}
      >
        <boxGeometry args={[3.7, 0.5, 0.1]}/>
        <meshStandardMaterial transparent opacity={0.5}/>
      </mesh>
      <mesh name='background-inner' position={[1.7, 0.2, -0.2]}>
        <boxGeometry args={[3.7, 0.5, 0.1]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh name='background-outer' position={[1.7, 0.2, -0.2]}>
        <boxGeometry args={[3.8, 0.6, 0.09]}/>
        <meshStandardMaterial color='limegreen'/>
      </mesh>
    </group> 
    
  }

  return (
    <group position={position} scale={scale} rotation={[0, -Math.PI/2, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
      >
        <meshStandardMaterial color="black"/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={nodes.Cube001.material}
        position={[0.023, 0.024, 0]}
        scale={[1.048, 0.527, 1.028]}
      >
        <meshStandardMaterial color="limegreen"/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        rotation={[Math.PI/2, Math.PI, -Math.PI/2]}
        position={[-0.35, 0, 0.8]}
        size={0.4}
        height={0.1}
        // scale bigger on desktop
      >
        SCORE
        <meshStandardMaterial color="limegreen"/>
      </Text3D>
      <mesh
        position={[-0.6, 0, 0]}
        onPointerEnter={scorePointerEnter}
        onPointerOut={scorePointerOut}
        onPointerUp={clickScore}
      >
        <boxGeometry args={[1, 0.3, 2.2]}/>
        <meshStandardMaterial transparent opacity={0.6}/>
      </mesh>      
      { displayScoreOptions && <group position={[-1.3, 0, 1]} rotation={[0, Math.PI/2, 0]}>
        {legalTiles[29].map( (value, index) => ( // must use parentheses instead of brackets
          <Move moveInfo={value} position={[0, 0, -0.7 * index]} key={index}/>
        ))}</group>
      }
    </group>
  );
}

useGLTF.preload('/tooltip.glb')