import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' //Routes instead of Switch
import Home from './Home'
import Experience from './Experience';
import { Text3D, Html } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';
import * as THREE from "three";
import { clientPlayerAtom, socket } from './SocketManager';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom'

export default function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/game/:id" element={<Experience/>}/>
      </Routes>
    </Router>
  )
}