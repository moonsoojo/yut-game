import React, { useEffect } from 'react';
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

export default function App () {
  const created = ({ gl }) =>
  {
      gl.setClearColor('#000b18', 1)
  }

  return (<>
    <Canvas
      className='r3f'
      camera={ {
        fov: 45,
        near: 0.1,
        far: 200,
        position: [
          -3.431723242390655,
          12.798027537168215,
          6.469516796871723 
        ],
      } }
      onCreated={ created }
      >
      {/* <Perf/> */}
      
      <directionalLight position={ [ 1, 3, 3 ] } intensity={ 4 } />
      <ambientLight intensity={ 1 } />
      <Route path="/">
        <Home2/>
        {/* <Meteors/> */}
        {/* <Celebration/> */}
      </Route>
      <Route path="/:id">
        <SocketManager/>
        <Experience/>
        <group rotation={[-Math.PI/2 + Math.PI/32, 0, 0]} position={[0, -3, 0]} scale={0.5}>
          <MilkyWay scale={15}
              brightness={0.9}
              colorTint1={new THREE.Vector4(0.5, 0.5, 1.0, 1.0)}
              colorTint2={new THREE.Vector4(1.3, 0.4, 3.0, 1.0)}
              colorTint3={new THREE.Vector4(1.3, 1.0, 3.3, 1.0)}
          />
        </group>
        {/* <RocketsWin/> */}
        {/* <UfosWin/> */}
      </Route>
    </Canvas>
    {/* <Interface/> */}
  </>)
}