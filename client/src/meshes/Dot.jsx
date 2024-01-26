import React from "react"

export default function Dot ({
  position, 
  rotation
}) {
  return (
    <mesh 
      position={position}
      rotation={rotation}
    >
      <boxGeometry args={[0.3, 0.1, 0.1]}/>
      <meshStandardMaterial color={'yellow'}/>
    </mesh>
  )
}