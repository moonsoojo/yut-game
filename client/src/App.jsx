import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' //Routes instead of Switch
import Home from './Home'
import UserForm from './UserForm'
import Experience from './Experience';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import { Text3D, Html } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';
import * as THREE from "three";
import { clientPlayerAtom, socket } from './SocketManager';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom'

export default function App() {
  // on load
  // if local storage has player info
  // go to game
  // else
  // go to sign in page
  let player = localStorage.getItem('clientPlayer')

  if (!player) {
    return <UserForm />
  }

  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<UserForm/>}/> */}
        {/* <Route path="/game/:id" element={     */}
        <Route path="/game" exact element={    
          <Canvas
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              outputEncoding: THREE.sRGBEncoding,
            }}
            // camera={{ fov: 45, near: 0.1, far: 500, position: [6, 6, 6] }}
            // pan: move about a plane
          >
            <Experience/>
          </Canvas>}/>  
      </Routes>
    </Router>
  )
}