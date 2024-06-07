import React, { useRef, useState } from "react";
import { Text3D, useGLTF } from "@react-three/drei";
import { socket } from "./SocketManager";
import { useAtom } from "jotai";
import { displayScoreOptionsAtom } from "./GlobalState";
import { useParams } from "wouter";
import * as THREE from 'three';

const SCORE_TILE = 29
export default function ScoreButtons({ position=[0,0,0], legalTiles }) {
  
  const params = useParams()

  function MoveToken({moveInfo, position}) {

    const buttonMatInner = useRef();

    function scorePointerEnter(event) {
      event.stopPropagation();
      document.body.style.cursor = "pointer";
      buttonMatInner.current.color = new THREE.Color('#006400')
    }
  
    function scorePointerOut(event) {
      event.stopPropagation();
      document.body.style.cursor = "default";
      buttonMatInner.current.color = new THREE.Color('green')
    }

    return <group position={position}>
      <mesh rotation={[-Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1]}/>
        <meshStandardMaterial color='yellow'/>
      </mesh>
      <mesh rotation={[-Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.11]}/>
        <meshStandardMaterial color='green' ref={buttonMatInner} />
      </mesh>
      <Text3D font="/fonts/Luckiest Guy_Regular.json" height={0.01} size={0.5} position={[-0.17, -0.22, 0.05]}>
        {`${moveInfo.move}`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <mesh 
        name='wrapper' 
        position={[0,0,0]} 
        rotation={[-Math.PI/2, 0, 0]}
        onPointerEnter={scorePointerEnter}
        onPointerLeave={scorePointerOut}
        onPointerDown={() => {
          socket.emit("score", { roomId: params.id, selectedMove: moveInfo });
        }}
      >
        <cylinderGeometry args={[0.5, 0.5, 0.15]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
    </group> 
  }

  function tokenPositionShift(axis, index) {
    if (axis === 'x') {
      if (index === 0) {
        return 0
      } else if (index === 1) {
        return 1.1
      } else if (index === 2) {
        return 2.2
      } else if (index === 3) {
        return 0
      } else if (index === 4) {
        return 1.1
      } else if (index === 5) {
        return 2.2
      }
    } else if (axis === 'y') {
      if (index < 3) {
        return 0
      } else if (index < 6) {
        return 1.1
      }
    }
  }

  return <group 
    position={position} 
    rotation={[-Math.PI/2, 0, 0]}
  >
    <Text3D 
      font="/fonts/Luckiest Guy_Regular.json" 
      height={0.01} 
      size={0.4}
    >
      {`score with`}
      <meshStandardMaterial color='limegreen'/>
    </Text3D>
    <group position={[0,0,0]}>
      {legalTiles[29].map( (value, index) => ( // must use parentheses instead of brackets
        <MoveToken 
          moveInfo={value} 
          position={[
            0.4 + tokenPositionShift('x', index), 
            -0.7 - tokenPositionShift('y', index), 
            0
          ]} 
          key={index}
        />
      ))}
    </group>
  </group>
}