import React, { useEffect } from 'react';
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import { Float, PresentationControls, Text3D } from '@react-three/drei'
import Earth from './meshes/Earth'
import UfoAnimated from './meshes/UfoAnimated';

import FragmentShader from './shader/fragmentDust.glsl'
import VertexShader from './shader/vertexDust.glsl'
import Stars from './particles/Stars';

import * as THREE from 'three';
import TextButton from './components/TextButton';
import { useAtom } from 'jotai';
import UfosWinParticles from './particles/UfosWinParticles';
import { deviceAtom, particleSettingAtom } from './GlobalState';
import { useParams } from 'wouter';
import { socket } from './SocketManager';

export default function UfosWin({}) {

  const [device] = useAtom(deviceAtom)
  const params = useParams()

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
    setParticleSetting({ emitters: UfosWinParticles(device) })
  }, [device])
  
  const beamShaderRef = useRef();
  const textMaterialRef = useRef();
  const ufo0 = useRef();
  const ufo1 = useRef();
  const ufo2 = useRef();
  const ufo3 = useRef();

  // Replaced <ShaderMaterial/> because it didn't flash
  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: VertexShader,
    fragmentShader: FragmentShader,
    transparent: true,
    uniforms:
    {
      uOpacity: { value: 0 }
    }
  })

  // earth shaking
  // particles dragged upward
  const radius = 1.7
  const offset = 2 * Math.PI / 4
  const floatHeight = 3
  const beamBrightness = 0.2
  useFrame((state, delta) => {   
    const time = state.clock.elapsedTime 
    shaderMaterial.uniforms.uOpacity.value = Math.sin(time * 3) * 0.05 + beamBrightness
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
    // respawn yoots
    // set camera upright - move scene
  }

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
      position={[-3.5, 4.5, 0]}>
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

    {/* beam */}
    <mesh position={[0, -1, 0.5]} rotation={[Math.PI/32, 0, 0]} material={shaderMaterial}>
      <cylinderGeometry args={[1.5, 4, 7, 32]}/>
      {/* <shaderMaterial 
        vertexShader={VertexShader}
        fragmentShader={FragmentShader}
        transparent={true}
        uniforms={{
          uOpacity: { value: 1 }
        }}
        ref={beamShaderRef}
      /> */}
    </mesh>
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
      position={[-3, -6, 0]}
      rotation={[0, 0, 0]}
      // can't pass a function received from props
      handlePointerClick={handleRestart}
      boxWidth={5.9}
      boxHeight={0.8}
      size={0.8}
    /> */}
    </PresentationControls>
  </>
}