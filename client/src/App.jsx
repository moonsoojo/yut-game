import React from 'react';
import Home from './Home'
import Experience from './Experience';
import { SocketManager } from './SocketManager';
import { Route } from "wouter"
import { OrbitControls } from '@react-three/drei';
import Stars from './particles/Stars';
import Experience2 from './Experience2';

export default function App () {
  return (<>
    <directionalLight position={ [ 1, 3, 3 ] } intensity={ 4 } />
    <ambientLight intensity={ 1 } />
    {/* <OrbitControls makeDefault /> */}
    <Route path="/">
      <Home/>
    </Route>
    <Route path="/:id">
      {/* <SocketManager/> */}
      <Experience2/>
      {/* <Experience/> */}
    </Route>
  </>)
}