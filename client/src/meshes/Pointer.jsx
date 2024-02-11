import React from "react";
import { useRef } from "react"
import { useFrame } from "@react-three/fiber";
import layout from "../layout";

export default function Pointer({ color, device, scale=4, position=[0, 1.5, 0] }) {
  const ref = useRef(null);

  useFrame((state, delta) => {
    ref.current.rotation.y = state.clock.elapsedTime
  })
  let earthPosition = (device === "landscapeDesktop" || device === "landscapeMobile") ? [
    0,
    2,
    2.5
  ] : [
    0,
    2,
    3.5
  ]
  return <mesh 
    ref={ref} 
    receiveShadow 
    // position={ tile == 0 ? earthPosition : [0, 1.5, 0]} 
    position={position} 
    rotation={[Math.PI, 0, 0]}
    scale={scale}>
    <coneGeometry args={[0.1, 0.3, 3]}/>
    <meshBasicMaterial color={color}/>
  </mesh>
}