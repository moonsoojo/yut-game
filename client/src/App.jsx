import React, { useEffect, useState } from 'react';
import Experience from './Experience';
import { Canvas } from '@react-three/fiber';
import { SocketManager } from './SocketManager';
import { Route } from "wouter"
import Home2 from './Home2';
import RocketsWin from './RocketsWin';
import UfosWin from './UfosWin';
import Stars from './particles/Stars';
import Showroom from './Showroom';
import Meteors from './particles/Meteors';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import Celebration from './Celebration';
import Interface from './Interface';
import { Perf } from 'r3f-perf';
import MilkyWay from './shader/MilkyWay';
import * as THREE from 'three';
import layout from './layout';
import ParticleSystem from './particles/ParticleSystem';
import ParticleSystemMeteors from './particles/ParticleSystemMeteors';

let mediaMax = 2560;
let landscapeMobileCutoff = 550;
let landscapeDesktopCutoff = 1000;

export default function App () {
  const created = ({ gl }) =>
  {
      gl.setClearColor('#000b18', 1)
  }

  // asus monitor screen ratio: w / h 2560 / 1279
  // first fov: 45
  // let fovNormal = 35;
  // let widthNormal = 2560
  // let heightNormal = 1279
  // let screenRatio = widthNormal / heightNormal
  const handleResize = () => {
    // let widthRatio = window.innerWidth / widthNormal
    // let heightRatio = window.innerHeight / heightNormal
    // if (widthRatio > heightRatio) {
    //   setFov(fovNormal / heightRatio)
    // } else {
    //   setFov(fovNormal / widthRatio)
    // }
    if (window.innerWidth < landscapeMobileCutoff) {
      setDevice("portrait")
    } else {
      setDevice("landscapeDesktop")
    }
  }

  function initializeDevice(windowWidth, landscapeMobileCutoff) {
    if (windowWidth < landscapeMobileCutoff) {
      return "portrait"
    } else {
      return "landscapeDesktop"
    }
  }
  
  let [device, setDevice] = useState(initializeDevice(window.innerWidth, landscapeMobileCutoff, landscapeDesktopCutoff))
  // let [fov, setFov] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  /*
    values for galaxy
    <MilkyWay scale={9}
      brightness={0.5}
      colorTint1={new THREE.Vector4(0, 1, 1, 1.0)}
      colorTint2={new THREE.Vector4(0, 1, 1, 1.0)}
      colorTint3={new THREE.Vector4(0, 1, 1, 1.0)}
      zOffset={-5.0}
    />
  */
  return (<>
    <Canvas
      className='r3f'
      camera={ {
        fov: 45,
        near: 0.1,
        far: 200,
      } }
      onCreated={ created }
      >
      <Perf/>
      
      <directionalLight position={ [ 1, 3, 3 ] } intensity={ 4 } />
      <ambientLight intensity={ 1 } />
      <ParticleSystemMeteors/>
      {/* <ParticleSystem/> */}
      <Route path="/">
        <Home2 device={device}/>
        {/* <Meteors/> */}
        {/* <Celebration/> */}
      </Route>
      <Route path="/:id">
        <SocketManager/>
        <Experience/>
        <group rotation={[-Math.PI/2, 0, 0]} position={[0, -3, 0]} scale={0.5}>
          <MilkyWay scale={9}
            brightness={0.5}
            colorTint1={new THREE.Vector4(0, 1, 1, 1.0)}
            colorTint2={new THREE.Vector4(0, 1, 1, 1.0)}
            colorTint3={new THREE.Vector4(0, 1, 1, 1.0)}
            zOffset={-5.0}
          />
        </group>
        {/* <RocketsWin/> */}
        {/* <UfosWin/> */}
      </Route>
    </Canvas>
    {/* <Interface/> */}
  </>)
}