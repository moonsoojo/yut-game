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
import EarthModified from './meshes/EarthModified';

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
  const radius = 1.5
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

  const textSize = 0.8
  return <group>
    <Text3D 
      font="/fonts/Luckiest Guy_Regular.json" 
      size={textSize} 
      height={0.03} 
      position={[-2.7, 0, -5]}
      rotation={[-Math.PI/2, 0, 0]}
      >
      UFOS WIN!
      <meshStandardMaterial color="yellow"/>
    </Text3D>
    {/* UFO */}
    <group position={[-0.15, 0, 0]} rotation={[-Math.PI/2 + Math.PI/16, 0, 0]}>
      <group ref={ufo0}>
        <UfoAnimated scale={1} rotation={[Math.PI/12, 0, 0]}/>
      </group>
      <group ref={ufo1}>
        <UfoAnimated scale={1} rotation={[Math.PI/12, 0, 0]}/>
      </group>
      <group ref={ufo2}>
        <UfoAnimated scale={1} rotation={[Math.PI/12, 0, 0]}/>
      </group>
      <group ref={ufo3}>
        <UfoAnimated scale={1} rotation={[Math.PI/12, 0, 0]}/>
      </group>
    </group>

    {/* beam */}
    <mesh position={[0, 0, 0.2]} rotation={[-Math.PI/2 + Math.PI/32, 0, 0]} material={shaderMaterial}>
      <cylinderGeometry args={[1.4, 3.8, 6, 32]}/>
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
    {/* <Text3D font="/fonts/Luckiest Guy_Regular.json" size={0.8} height={0.01} position={[2, -5, 0]}>
      Feedback
      <meshStandardMaterial color="yellow"/>
    </Text3D> */}
    <Float floatIntensity={2} speed={5} rotation={[-Math.PI/2,Math.PI/2,0]}>
      <EarthModified 
      position={[0,-1,0]} 
      scale={1} 
      />
    </Float>

    <Stars/>
    
    <group 
    name='play-again-button' 
    position={[-3, 0, 6]}
    rotation={[-Math.PI/2, 0, 0]}
    >
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        rotation={[0, 0, 0]}
        size={textSize} 
        height={0.03} 
      >
        Play Again
        <meshStandardMaterial color="yellow"/>
      </Text3D>
      <mesh name="play-again-button-background-outer" position={[3, 0.4, 0]}>
        <boxGeometry args={[6.7, 1.4, 0.02]}/>
        <meshStandardMaterial color="yellow"/>
      </mesh>
      <mesh 
        name="play-again-button-background-inner" 
        position={[3, 0.4, 0]}
      >
        <boxGeometry args={[6.6, 1.3, 0.03]}/>
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
  </group>
}