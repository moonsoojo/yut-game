import React from "react";

export default function Arrow ({position, rotation}) {
  return (
    <mesh 
    position={position}
    rotation={rotation}>
      <coneGeometry args={[0.3, 0.7, 20]}/>
      <meshStandardMaterial color={'yellow'}/>
    </mesh>
  )
}