import React, { useEffect } from 'react';
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three';

import { PresentationControls, Text3D } from '@react-three/drei'
import fireworksSettings from './particles/RocketsWinFireworks';
import Stars from './particles/Stars'
import EarthModified from './meshes/EarthModified';
import RocketWinMesh from './meshes/RocketWinMesh';
import TextButton from './components/TextButton';
import { useAtom } from 'jotai';
import { deviceAtom, particleSettingAtom } from './GlobalState';
import { socket } from './SocketManager';
import { useParams } from 'wouter';

export default function RocketsWin() {

  const [device] = useAtom(deviceAtom)
  const params = useParams()

  const rockets = useRef();
  const textMaterialRef = useRef();
  
  const [particleSetting, setParticleSetting] = useAtom(particleSettingAtom)
  useEffect(() =>{
    setParticleSetting({ emitters: fireworksSettings(device) })
  }, [device])

  useFrame((state, delta) => {   
    const time = state.clock.elapsedTime 
    rockets.current.position.y = Math.sin(time) * 0.1 + 0.4
  });

  function handlePointerEnter() {
    textMaterialRef.current.color = new THREE.Color('green')
    document.body.style.cursor = "pointer";
  }

  function handlePointerLeave() {
    textMaterialRef.current.color = new THREE.Color('black')
    document.body.style.cursor = "default";
  }

  function handlePointerDown() {
    socket.emit('reset', { roomId: params.id })
  }

  return <group>
    <Text3D 
      font="/fonts/Luckiest Guy_Regular.json" 
      size={1} 
      height={0.03} 
      position={[-4.3, 0, -5]}
      rotation={[-Math.PI/2, 0, 0]}
    >
      ROCKETS WIN!
      <meshStandardMaterial color="yellow"/>
    </Text3D>

    <group name='earth-rotation-group' rotation={[-Math.PI/2 + Math.PI/28, 0, 0]}>
      <EarthModified position={[0,0,0]} scale={2}/>
    </group>
    <group ref={rockets}>
      <RocketWinMesh position={[-0.6, 4, 0]} rotation={[-Math.PI/2 + Math.PI/8, 0, 0]}/>
      <RocketWinMesh position={[1.3, 4, 0.7]} rotation={[-Math.PI/2 + Math.PI/8, 0, 0]}/>
      <RocketWinMesh position={[-1.5, 4, 2.2]} rotation={[-Math.PI/2 + Math.PI/8, 0, 0]}/>
      <RocketWinMesh position={[0.6, 4, 2.8]} rotation={[-Math.PI/2 + Math.PI/8, 0, 0]}/>
    </group>

    <group 
      name='play-again-button' 
      position={[-3.8, 0, 5.4]} 
      rotation={[-Math.PI/2, 0, 0]}
    >
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        rotation={[0, 0, 0]}
        size={1} 
        height={0.03} 
      >
        Play Again
        <meshStandardMaterial color="yellow"/>
      </Text3D>
      <mesh name="play-again-button-background-outer" position={[3.7, 0.5, 0]}>
        <boxGeometry args={[8.1, 1.6, 0.02]}/>
        <meshStandardMaterial color="yellow"/>
      </mesh>
      <mesh 
        name="play-again-button-background-inner" 
        position={[3.7, 0.5, 0]}
      >
        <boxGeometry args={[8, 1.5, 0.03]}/>
        <meshStandardMaterial color="black" ref={textMaterialRef}/>
      </mesh>
      <mesh 
        name='play-again-button-wrapper' 
        position={[3.7, 0.5, 0]}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
      >
        <boxGeometry args={[8.1, 1.6, 0.5]}/>
        <meshStandardMaterial color="grey" transparent opacity={0}/>
      </mesh>
    </group>
    <Stars/>
  </group>
}