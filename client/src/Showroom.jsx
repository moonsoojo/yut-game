import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import React from 'react';
import Meteors from './particles/MeteorsBackup';
import { Perf } from 'r3f-perf';

export default function Showroom() {
  return <>
    <Perf/>
    <OrbitControls/>
    <OrthographicCamera
      makeDefault
      zoom={50}
      top={400}
      bottom={-400}
      left={400}
      right={-400}
      near={0.01}
      far={2000}
      position={[0,20,3]}
    />
    <Meteors/>
  </>
}