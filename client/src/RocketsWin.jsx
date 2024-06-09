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
  return <PresentationControls
    global
    polar={[-0.4, 0.2]}
    azimuth={[-1, 0.75]}
    config={{ mass: 2, tension: 400 }}
    snap={{ mass: 4, tension: 400 }}>
    <Text3D font="/fonts/Luckiest Guy_Regular.json" size={1} height={0.01} position={[-4.3, 5, 0]}>
      ROCKETS WIN!
      <meshStandardMaterial color="yellow"/>
    </Text3D>
    <group name='play-again-button' position={[-3.5, -6.5, 0]}>
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        rotation={[0, 0, 0]}
      >
        Play Again
        <meshStandardMaterial color="yellow"/>
      </Text3D>
      <mesh name="play-again-button-background-outer" position={[3.7, 0.5, 0]}>
        <boxGeometry args={[8.1, 1.6, 0.1]}/>
        <meshStandardMaterial color="yellow"/>
      </mesh>
      <mesh 
        name="play-again-button-background-inner" 
        position={[3.7, 0.5, 0]}
      >
        <boxGeometry args={[8, 1.5, 0.11]}/>
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
    {/* <TextButton
      text="Play again"
      position={[-3, -5, 0]}
      rotation={[0, 0, 0]}
      // can't pass a function received from props
      handlePointerClick={handleRestart}
      boxWidth={5.85}
      boxHeight={0.8}
      size={0.8}
    /> */}
    {/* <Text3D font="/fonts/Luckiest Guy_Regular.json" size={0.8} height={0.01} position={[2, -5, 0]}>
      Feedback
      <meshStandardMaterial color="yellow"/>
    </Text3D> */}
    <EarthModified position={[0,0,0]} scale={2}/>
    <group ref={rockets}>
      <RocketWinMesh position={[-1.5,0.3,3.5]}/>
      <RocketWinMesh position={[-1,-1.4,3.5]}/>
      <RocketWinMesh position={[1.3,1,3.5]}/>
      <RocketWinMesh position={[1.6,-0.7,3.5]}/>
    </group>
    <Stars/>
  </PresentationControls>
}