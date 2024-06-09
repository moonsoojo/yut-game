import React, { useEffect } from 'react';
import Experience from './Experience';
import { Canvas } from '@react-three/fiber';
import { SocketManager } from './SocketManager';
import { Route } from "wouter"
import Home2 from './Home2';
import ParticleSystem from './particles/ParticleSystem';
import mediaValues from './mediaValues';
import { useSetAtom } from 'jotai';
import { deviceAtom } from './GlobalState';
import { Perf } from 'r3f-perf';

export default function App () {

  const created = ({ gl }) =>
  {
      gl.setClearColor('#000b18', 1)
  }

  // Responsive UI
  const setDevice = useSetAtom(deviceAtom)
  const handleResize = () => {
    if (window.innerWidth < mediaValues.landscapeCutoff) {
      setDevice("portrait")
    } else {
      setDevice("landscapeDesktop")
    }
  }

  useEffect(() => {
    console.log(`[App] window innerWidth change`)
    window.addEventListener("resize", handleResize, false);
  }, [window.innerWidth]);

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
      <Perf/>
      <directionalLight position={ [ 0, 10, 0 ] } intensity={ 4 } />
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