import React from 'react';
import { Float, PresentationControls, Text3D } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { useLocation } from "wouter";

import RocketAnimated from './meshes/RocketAnimated';
import UfoAnimated from './meshes/UfoAnimated';
import { useFrame, useThree } from '@react-three/fiber';
import { Euler, Vector3 } from 'three';
import Yoot from './meshes/Yoot';
import Stars from './particles/Stars';
import Tiles from './Tiles';
import { Yoot2 } from './meshes/Yoot2';
import TextButton from './components/TextButton';

// text colors to green like earth
export default function Home() {

  const [location, setLocation] = useLocation();

  const device = "landscapeDesktop"

  const { ufoRotation, ufoPosition } = useSpring({
    from: {
      ufoRotation: [-Math.PI/8,0,Math.PI * 1/4],
      ufoPosition: [5, 2, -3]
    },
    to: [
      {
        ufoRotation: [-Math.PI/8,0,Math.PI * -1/4],
        ufoPosition: [3, 2, -3],
      },
      {
        ufoRotation: [-Math.PI/8,0,Math.PI * 1/4],
        ufoPosition: [5, 2, -3],
      }
    ],
    config: {
      friction: 36
    },
    loop: true
  })

  function Pieces() {
    return <group>
      <RocketAnimated position={[4,2,-5]} scale={0.5}/>
      <RocketAnimated position={[0,2,-5]} scale={0.5}/>
      <Float speed={5} floatIntensity={2}>
        <group rotation={[-Math.PI/12,0,0]}>
          <UfoAnimated position={[-1.8, 2, -4]} scale={0.5}/>
          <UfoAnimated position={[-3.4, 2, -4]} scale={0.5}/>
          <UfoAnimated position={[-2.4, 2, -5.5]} scale={0.5}/>
        </group>
      </Float>
      <UfoAnimated position={ufoPosition} scale={0.5} rotation={ufoRotation}/>
    </group>
  }

  useFrame((state) => {
    const camera = state.camera
    // console.log(camera.rotation) 
    // rotate camera to look at what you want
    // const camera = state.camera    
    const euler = new Euler(
      -0.9678104558564694, 
      0.07841126014215415,
      0.11327856815709492, 
      "XYZ"
    )
    camera.setRotationFromEuler(euler)
    
    // set position in index.jsx
    // console.log(camera.position)
    
    /* how to make camera.lookAt() with default camera */
    // camera.lookAt(new Vector3(-0.311, -0.661, -0.683))
  })

  function Yoots() {
    return <animated.group 
      scale={0.6} 
      rotation={[-Math.PI/4,Math.PI/2,0]}
      position={[-7, 1, -5.5]}
    >
      <Float>
        <Yoot2 scale={0.5} position={[0,0,0]}/>
        <Yoot2 scale={0.5} position={[0,0,-1]}/>
        <Yoot2 scale={0.5} position={[0,0,-2]}/>
        <Yoot2 scale={0.5} position={[0,0,-3]}/>
      </Float>
    </animated.group>
  }

  function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  function handleLetsPlay() {
    setLocation(`/${makeId(7)}`)
  }

  return <>
    <PresentationControls
      global
      polar={[-0.4, 0.2]}
      azimuth={[-1, 0.75]}
      config={{ mass: 2, tension: 400 }}
      snap={{ mass: 4, tension: 400 }}
    >
    <group position={[-14,2,-2]} rotation={[-Math.PI/4,Math.PI/8,Math.PI/32]}>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={1.3} 
        height={0.01} 
        position={[0, 1.5, 0]}
      >
        YOOT
        <meshStandardMaterial color="yellow"/>
      </Text3D>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={1.3} 
        height={0.01} 
        position={[0, -0.5, 0]}
      >
        GAME!
        <meshStandardMaterial color="yellow"/>
      </Text3D>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.7} 
        height={0.01} 
        position={[0, -3.5, 0]}
      >
        ABOUT
        <meshStandardMaterial color="yellow"/>
      </Text3D>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.7} 
        height={0.01} 
        position={[0, -6.5, 0]}
      >
        HOW TO PLAY
        <meshStandardMaterial color="yellow"/>
      </Text3D>
    </group>
    <group>
      <TextButton
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.6} 
        height={0.01} 
        position={[-2.2, 0, 2]}
        rotation={[-Math.PI/2,0,0]}
        text={`LET'S PLAY!`}
        color="yellow"
        boxWidth={4.2}
        boxHeight={0.7}
        handlePointerClick={handleLetsPlay} // must pass a custom function, not console.log()
      >
      </TextButton>
      <Tiles device={device} position={[0, 0, -5]} scale={1}/>
      <Pieces/>
      <Yoots/>
    </group>
    
    <Stars/>
    </PresentationControls>
  </>
}