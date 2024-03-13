import React, { useEffect } from 'react';
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import { PresentationControls, Text3D } from '@react-three/drei'
import Rocket from './meshes/Rocket'
// import Fireworks from './particles/FireworksBackup'
import fireworksSettings from './particles/RocketsWinFireworks';
import Earth from './meshes/Earth'
import Stars from './particles/Stars'
import * as THREE from 'three'
import EarthModified from './meshes/EarthModified';
import RocketWinMesh from './meshes/RocketWinMesh';
import TextButton from './components/TextButton';
import { useAtom } from 'jotai';
import { particleSettingAtom } from './SocketManager';

export default function RocketsWin({handleRestart, device}) {

  const rockets = useRef();
  
  const [particleSetting, setParticleSetting] = useAtom(particleSettingAtom)
  useEffect(() =>{
    setParticleSetting({emitters: fireworksSettings(device)})
  }, [])

  useFrame((state, delta) => {   
    const time = state.clock.elapsedTime 
    rockets.current.position.y = Math.sin(time) * 0.1 + 0.4
    const camera = state.camera;
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 20
    camera.quaternion.identity()
  });

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
    <TextButton
      text="Play again"
      position={[-3, -5, 0]}
      rotation={[0, 0, 0]}
      // can't pass a function received from props
      handlePointerClick={handleRestart}
      boxWidth={5.85}
      boxHeight={0.8}
      size={0.8}
    />
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