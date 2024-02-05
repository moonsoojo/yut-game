import { Text3D } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useAtom } from 'jotai';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { celebrateTextAtom, gamePhaseAtom } from './SocketManager';
import * as THREE from 'three';
import { generateRandomNumberInRange } from './helpers/helpers';
import System, {
  Emitter,
  Rate,
  Span,
  Position,
  Mass,
  Radius,
  Life,
  PointZone,
  Vector3D,
  Alpha,
  Scale,
  Color,
  Body,
  RadialVelocity,
  SpriteRenderer,
  ColorSpan,
} from "three-nebula";

export default function Celebration() {

  const text0Mat = useRef();
  const text1Mat = useRef();
  const text2Mat = useRef();
  const text3Mat = useRef();
  const [celebrateText] = useAtom(celebrateTextAtom)

  useFrame((state, delta) => {
    if (celebrateText && text0Mat.current !== undefined) {
      text0Mat.current.opacity = Math.sin(state.clock.elapsedTime * 5)
      text1Mat.current.opacity = Math.sin(state.clock.elapsedTime * 5)
      text2Mat.current.opacity = Math.sin(state.clock.elapsedTime * 5)
      text3Mat.current.opacity = Math.sin(state.clock.elapsedTime * 5)
    } else {
      text0Mat.current.opacity = 0
      text1Mat.current.opacity = 0
      text2Mat.current.opacity = 0
      text3Mat.current.opacity = 0
    }
  })

  return <group>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json" 
      size={0.3} 
      height={0.01} 
      position={[-2,0,-1]}
      rotation={[-Math.PI/2,0,0, "YXZ"]}
    >
      <meshStandardMaterial transparent ref={text0Mat} color="green"/>
      {celebrateText && "bonus"}
    </Text3D>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json" 
      size={0.3} 
      height={0.01} 
      position={[0.8,0,-1]}
      rotation={[-Math.PI/2,0,0, "YXZ"]}
    >
      <meshStandardMaterial transparent ref={text1Mat} color="green"/>
      {celebrateText && "bonus"}
    </Text3D>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json" 
      size={0.3} 
      height={0.01} 
      position={[0.8,0,1.5]}
      rotation={[-Math.PI/2,0,0, "YXZ"]}
    >
      <meshStandardMaterial transparent ref={text2Mat} color="green"/>
      {celebrateText && "bonus"}
    </Text3D>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json" 
      size={0.3} 
      height={0.01} 
      position={[-2,0,1.5]}
      rotation={[-Math.PI/2,0,0, "YXZ"]}
    >
      <meshStandardMaterial transparent ref={text3Mat} color="green"/>
      {celebrateText && "bonus"}
    </Text3D>
  </group>
}