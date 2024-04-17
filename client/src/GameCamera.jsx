import React, { useEffect, useRef, useState } from 'react';
import layout from './layout';
import mediaValues from './mediaValues';
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { useAtom } from 'jotai';
import { deviceAtom } from './App';
import { useThree } from '@react-three/fiber';

function calcZoom() {
  if (window.innerWidth < mediaValues.landscapeCutoff) {
    const zoomMax = 50;
    const newZoom = zoomMax * (window.innerWidth / mediaValues.landscapeCutoff)
    return newZoom
  } else {
    const zoomMin = 30;
    const newZoom = window.innerWidth * (zoomMin / mediaValues.landscapeCutoff)
    return newZoom
  }
}

export default function GameCamera() {
  console.log(`[GameCamera]`)
  
  const [zoom, setZoom] = useState(calcZoom());
  const [device] = useAtom(deviceAtom)
  const camera = useRef();
  const controls = useRef();
  const state = useThree()
  
  function handleResize() {
    console.log('handle resize');
    setZoom(calcZoom())
  }

  // Assign camera to renderer in different components
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    // console.log(`[GameCamera]`, camera.current.makeDefault())
    console.log('use three state', state)
    state.camera = camera.current
    state.controls = controls.current
  }, []);

  return <>
    <OrbitControls ref={controls}/>
    <OrthographicCamera
      zoom={zoom}
      top={400}
      bottom={-400}
      left={400}
      right={-400}
      near={0.01}
      far={2000}
      position={layout[device].camera.position}
      ref={camera}
    />
    </>
}