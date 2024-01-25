import React from 'react';
import Home from './xxxxxxxxxxxxxxxxxxHome'
import Experience from './Experience';
import { Canvas } from '@react-three/fiber';
import { SocketManager } from './SocketManager';
import { Route } from "wouter"

export default function App () {
  return (<>
    <Canvas>
      <Route path="/">
        <Home/>
      </Route>
      <Route path="/:id">
        <SocketManager/>
        <Experience/>
      </Route>
    </Canvas>
  </>)
}