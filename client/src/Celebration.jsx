import { Text3D } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useAtom } from 'jotai';
import React, { useEffect, useRef } from 'react';
import { celebrateTextAtom } from './SocketManager';
import Meteors from './particles/Meteors';
import * as THREE from 'three';
import { generateRandomNumberInRange } from './helpers/helpers';

export default function Celebration() {

  const text0Mat = useRef();
  const text1Mat = useRef();
  const text2Mat = useRef();
  const text3Mat = useRef();
  const [celebrateText, setCelebrateText] = useAtom(celebrateTextAtom)

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

  var map = new THREE.TextureLoader().load("textures/dot.png");
  var material = new THREE.SpriteMaterial({
    map: map,
    color: new THREE.Color("#FF2727"),
    blending: THREE.AdditiveBlending,
    fog: true,
  });
  let sprite = new THREE.Sprite(material);

  return <group>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json" 
      size={0.3} 
      height={0.01} 
      position={[-2,0,-1]}
      rotation={[-Math.PI/2,0,0, "YXZ"]}
    >
      <meshStandardMaterial transparent ref={text0Mat} color="limegreen"/>
      {celebrateText}
    </Text3D>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json" 
      size={0.3} 
      height={0.01} 
      position={[0.8,0,-1]}
      rotation={[-Math.PI/2,0,0, "YXZ"]}
    >
      <meshStandardMaterial transparent ref={text1Mat} color="limegreen"/>
      {celebrateText}
    </Text3D>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json" 
      size={0.3} 
      height={0.01} 
      position={[0.8,0,1.5]}
      rotation={[-Math.PI/2,0,0, "YXZ"]}
    >
      <meshStandardMaterial transparent ref={text2Mat} color="limegreen"/>
      {celebrateText}
    </Text3D>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json" 
      size={0.3} 
      height={0.01} 
      position={[-2,0,1.5]}
      rotation={[-Math.PI/2,0,0, "YXZ"]}
    >
      <meshStandardMaterial transparent ref={text3Mat} color="limegreen"/>
      {celebrateText}
    </Text3D>
    <Meteors 
      sprite={sprite} 
      delay={0} 
      alpha ={Math.random()+1} 
      spawnPos={[
        // -5 + generateRandomNumberInRange(3, 3),
        // 5,
        // 5 + generateRandomNumberInRange(3, 3),
        10, -5, -3
      ]}
    />
    <Meteors       
      sprite={sprite} 
      delay={0.3} 
      alpha ={Math.random()+1} 
      spawnPos={[
        // -5 + generateRandomNumberInRange(3, 3),
        // 5,
        // 5 + generateRandomNumberInRange(3, 3),
        9, -5, -5
      ]}
    />
    <Meteors
      sprite={sprite} 
      delay={0.6} 
      alpha ={Math.random()+1} 
      spawnPos={[
        // -5 + generateRandomNumberInRange(3, 3),
        // 5,
        // 5 + generateRandomNumberInRange(3, 3),
        8, -5, -7
      ]}
    />
  </group>
}