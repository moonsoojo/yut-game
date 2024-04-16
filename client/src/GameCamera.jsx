import React, { useEffect, useState } from 'react';
import layout from './layout';
import mediaValues from './mediaValues';
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { useAtom } from 'jotai';
import { deviceAtom } from './App';

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
  
  const [zoom, setZoom] = useState(calcZoom());
  const [device] = useAtom(deviceAtom)
  
  function handleResize() {
    console.log('handle resize');
    setZoom(calcZoom())
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  return <>
    <OrbitControls/>
    <OrthographicCamera
      makeDefault
      zoom={zoom}
      top={400}
      bottom={-400}
      left={400}
      right={-400}
      near={0.01}
      far={2000}
      position={layout[device].camera.position}
    />
    </>
}