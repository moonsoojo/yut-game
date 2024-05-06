import React from "react";
import { useRef } from "react"
import { useFrame } from "@react-three/fiber";
import { animated } from "@react-spring/three";
import { MeshDistortMaterial } from "@react-three/drei";

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

export default function Pointer({ 
  position=[0,0,0], 
  rotation=[0,0,0], 
  scale=1, 
  color, 
  opacity=1,
  animate=true
}) {
  const ref = useRef(null);

  useFrame((state, delta) => {
    if (animate) {
      ref.current.rotation.y = state.clock.elapsedTime
    }
  })

  return <mesh 
    ref={ref} 
    receiveShadow 
    position={position} 
    rotation={[Math.PI, 0, 0]}
    scale={scale}>
    <coneGeometry args={[0.1, 0.3, 3]}/>
    <meshBasicMaterial color={color} transparent opacity={opacity}/>
  </mesh>
}