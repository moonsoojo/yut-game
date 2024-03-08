import React, { useEffect } from 'react';
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

import { Float, PresentationControls, Text3D } from '@react-three/drei'
import Earth from './meshes/Earth'
import UfoAnimated from './meshes/UfoAnimated';
import UfoBeamDust from './particles/Dust';

import FragmentShader from './shader/fragmentDust.glsl'
import VertexShader from './shader/vertexDust.glsl'
import Stars from './particles/Stars';

import * as THREE from 'three';
import Dust from './particles/Dust';
import TextButton from './components/TextButton';
import { useAtom } from 'jotai';
import { particleSettingAtom } from './SocketManager';
import fireworksSettings from './particles/Fireworks';

export default function UfosWin({ handleRestart, device }) {

  var map = new THREE.TextureLoader().load("./textures/dot.png");
  var material = new THREE.SpriteMaterial({
    map: map,
    color: new THREE.Color("#FF2727"),
    blending: THREE.AdditiveBlending,
    fog: true,
  });
  let sprite = new THREE.Sprite(material);

  const [particleSetting, setParticleSetting] = useAtom(particleSettingAtom)
  useEffect(() =>{
    setParticleSetting({emitters: fireworksSettings(device)})
  }, [])
  
  const beamShaderRef = useRef();
  const ufo0 = useRef();
  const ufo1 = useRef();
  const ufo2 = useRef();
  const ufo3 = useRef();

  // earth shaking
  // particles dragged upward
  const radius = 1.7
  const offset = 2 * Math.PI / 4
  const floatHeight = 3
  const beamBrightness = 0.2
  useFrame((state, delta) => {   
    const time = state.clock.elapsedTime 
    beamShaderRef.current.uniforms.uOpacity.value = Math.sin(time * 4) * 0.1 + beamBrightness
    ufo0.current.position.x = Math.sin(time + offset * 0) * radius
    ufo0.current.position.z = Math.cos(time + offset * 0) * radius
    ufo0.current.position.y = Math.cos(time + offset * 0) * 0.1 + floatHeight
    ufo1.current.position.x = Math.sin(time + offset * 1) * radius
    ufo1.current.position.z = Math.cos(time + offset * 1) * radius
    ufo1.current.position.y = Math.cos(time + offset * 1) * 0.1 + floatHeight
    ufo2.current.position.x = Math.sin(time + offset * 2) * radius
    ufo2.current.position.z = Math.cos(time + offset * 2) * radius
    ufo2.current.position.y = Math.cos(time + offset * 2) * 0.1 + floatHeight
    ufo3.current.position.x = Math.sin(time + offset * 3) * radius
    ufo3.current.position.z = Math.cos(time + offset * 3) * radius
    ufo3.current.position.y = Math.cos(time + offset * 3) * 0.1 + floatHeight

    const camera = state.camera;
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 20
    camera.quaternion.identity()
  });

  return <>
    <PresentationControls
      global
      polar={[-0.4, 0.2]}
      azimuth={[-1, 0.75]}
      config={{ mass: 2, tension: 400 }}
      snap={{ mass: 4, tension: 400 }}>
    <Text3D 
    font="/fonts/Luckiest Guy_Regular.json" 
    size={1} 
    height={0.01} 
    position={[-3.5, 5.5, 0]}>
      UFOS WIN!
      <meshStandardMaterial color="yellow"/>
    </Text3D>
    {/* <Text3D font="/fonts/Luckiest Guy_Regular.json" size={0.8} height={0.01} position={[2, -5, 0]}>
      Feedback
      <meshStandardMaterial color="yellow"/>
    </Text3D> */}
    <Float floatIntensity={2} speed={5}>
      <Earth position={[0,-2,0]} scale={1.3} rotate={false}/>
    </Float>
    {/* UFO */}
    <group ref={ufo0}>
      <UfoAnimated scale={1.2} rotation={[Math.PI/12, 0, 0]}/>
    </group>
    <group ref={ufo1}>
      <UfoAnimated scale={1.2} rotation={[Math.PI/12, 0, 0]}/>
    </group>
    <group ref={ufo2}>
      <UfoAnimated scale={1.2} rotation={[Math.PI/12, 0, 0]}/>
    </group>
    <group ref={ufo3}>
      <UfoAnimated scale={1.2} rotation={[Math.PI/12, 0, 0]}/>
    </group>
    <Stars/>

    <Dust sprite={sprite} count={300} spawnDelay={0.05}/>

    {/* beam */}
    <mesh position={[0, -1, 0]}>
      <cylinderGeometry args={[1.5, 4, 7, 32]}/>
      <rawShaderMaterial 
        vertexShader={VertexShader}
        fragmentShader={FragmentShader}
        transparent={true}
        uniforms={{
          uOpacity: { value: 0.1 }
        }}
        ref={beamShaderRef}
      />
    </mesh>
    <TextButton
      text="Play again"
      position={[-3, -7, 0]}
      rotation={[0, 0, 0]}
      // can't pass a function received from props
      handlePointerClick={handleRestart}
      boxWidth={6}
      boxHeight={1}
      size={0.8}
    />
    </PresentationControls>
  </>
}