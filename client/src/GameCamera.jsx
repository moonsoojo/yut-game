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
    setZoom(calcZoom())
  }

  // Assign camera to renderer in different components
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  return <>
    <OrbitControls/>
    <OrthographicCamera
      makeDefault
      zoom={zoom}
      position={layout[device].camera.position}
    />
    </>
}