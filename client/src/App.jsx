import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' //Routes instead of Switch
import Home from './Home'
import Experience from './Experience';
import { Text3D, Html } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';
import * as THREE from "three";
import { SocketManager, clientPlayerAtom, socket } from './SocketManager';
import { useAtom } from 'jotai';
import { Route, Link, useLocation, Router } from "wouter"

export default function App () {
  console.log("[App]")
  return (<>
    <SocketManager/>
    <Canvas>
      <Route path="/">
        <Home/>
      </Route>
      <Route path="/game/:id">
        <Experience/>
      </Route>
    </Canvas>
  </>)
}