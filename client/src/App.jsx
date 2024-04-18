import React, { useEffect, useState } from 'react';
import Experience from './Experience';
import { Canvas, useThree } from '@react-three/fiber';
import { SocketManager } from './SocketManager';
import { Route } from "wouter"
import Home2 from './Home2';
import RocketsWin from './RocketsWin';
import UfosWin from './UfosWin';
import Stars from './particles/Stars';
import Showroom from './Showroom';
import Meteors from './particles/MeteorsBackup';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import Celebration from './Celebration';
import Interface from './Interface';
import { Perf } from 'r3f-perf';
import MilkyWay from './shader/MilkyWay';
import * as THREE from 'three';
import layout from './layout';
import ParticleSystem from './particles/ParticleSystem';
import mediaValues from './mediaValues';
import { atom, useAtom } from 'jotai';

function initializeDevice(windowWidth, landscapeCutoff) {
  if (windowWidth < landscapeCutoff) {
    return "portrait"
  } else {
    return "landscapeDesktop"
  }
}
export const deviceAtom = atom(initializeDevice(window.innerWidth, mediaValues.landscapeCutoff))
export const pageAtom = atom('landingPage')

export default function App () {
  const [_device, setDevice] = useAtom(deviceAtom)
  const [page, setPage] = useAtom(pageAtom);

  const created = ({ gl }) =>
  {
      gl.setClearColor('#000b18', 1)
  }

  const handleResize = () => {
    if (window.innerWidth < mediaValues.landscapeCutoff) {
      setDevice("portrait")
    } else {
      setDevice("landscapeDesktop")
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, [window.innerWidth]);

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

  // on click 'let's play'
  // socket.emit('createRoom')
  // socket.emit('joinRoom')
  // return room id
  // 
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
      {/* <Perf/> */}
      
      {/* when the device switches, the app rerenders and the game rerenders too */}
      <directionalLight position={ [ 1, 3, 3 ] } intensity={ 4 } />
      <ambientLight intensity={ 1 } />
      <ParticleSystem/>
      <SocketManager/>
      <Route path="/">
        <Home2/>
      </Route>
      <Route path="/:id">
        <Experience/>
      </Route>
    </Canvas>
  </>)
}