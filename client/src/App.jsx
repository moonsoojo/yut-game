import React, { useEffect, useMemo } from 'react';
import Experience from './Experience';
import { Canvas } from '@react-three/fiber';
import { SocketManager } from './SocketManager';
import { Route } from "wouter"
import Home2 from './Home2';
import Celebration from './Celebration';
import * as THREE from 'three';

export default function App () {

  const map = useMemo(() => new THREE.TextureLoader().load("textures/dot.png"), [])
  const material = useMemo(() => new THREE.SpriteMaterial({
    map: map,
    color: new THREE.Color("#FF2727"),
    blending: THREE.AdditiveBlending,
    fog: true,
  }), [map])
  const sprite = useMemo(() => new THREE.Sprite(material), [material])

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
        <Experience sprite={sprite}/>
      </Route>
    </Canvas>
  </>)
}