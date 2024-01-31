import React from 'react';
import Experience from './Experience';
import { Canvas } from '@react-three/fiber';
import { SocketManager } from './SocketManager';
import { Route } from "wouter"
import Home2 from './Home2';
import RocketsWin from './RocketsWin';
import UfosWin from './UfosWin';

export default function App () {
  return (<>
    <Canvas
      camera={ {
        fov: 45,
        near: 0.1,
        far: 200,
        position: [
          -3.431723242390655,
          12.798027537168215,
          6.469516796871723 
        ],
      } }>
      <directionalLight position={ [ 1, 3, 3 ] } intensity={ 4 } />
      <ambientLight intensity={ 1 } />
      <Route path="/">
        <Home2/>
      </Route>
      <Route path="/:id">
        <SocketManager/>
        <Experience/>
        {/* <RocketsWin/> */}
        {/* <UfosWin/> */}
      </Route>
    </Canvas>
  </>)
}