import React from "react";
import { useRef } from "react"
import { useFrame } from "@react-three/fiber";
import layout from "../../../layout";

export default function Pointer({ color, tile, device }) {
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
    position={[0, 1.5, 0]} 
    rotation={[Math.PI, 0, 0]}
    scale={4}>
    <coneGeometry args={[0.1, 0.3, 3]}/>
    <meshBasicMaterial color={color}/>
  </mesh>
}