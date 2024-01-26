import React from "react";
import { useRef } from "react"
import { useFrame } from "@react-three/fiber";

export default function Pointer({ color }) {
  const ref = useRef(null);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime
  })
  return <mesh 
    ref={ref} 
    receiveShadow 
    position={[0, 1.5, 0]} 
    rotation={[Math.PI, 0, 0]}
    scale={4}>
    <coneGeometry args={[0.1, 0.3, 3]}/>
    <meshBasicMaterial color={color}/>
  </mesh>
}