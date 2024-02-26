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

export default function App () {
  const created = ({ gl }) =>
  {
      gl.setClearColor('#120d25', 1)
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
      <Perf/>
      
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
        {/* <RocketsWin/> */}
        {/* <UfosWin/> */}
      </Route>
    </Canvas>
    {/* <Interface/> */}
  </>)
}