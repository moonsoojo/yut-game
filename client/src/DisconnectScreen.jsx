import React from "react";
import {Text3D} from '@react-three/drei'

export default function DisconnectScreen() {
  function handleDisconnectPointerDown(e) {
    e.stopPropagation()
    location.reload();
  }
  function handleDisconnectPointerUp(e) {
    e.stopPropagation()
  }

  return <group name='disconnect-screen'>
    <mesh position={[0,2,0]} onPointerDown={e => handleDisconnectPointerDown(e)} onPointerUp={e => handleDisconnectPointerUp(e)}>
      <boxGeometry args={[200, 0.1, 200]}/>
      <meshStandardMaterial color="black" transparent opacity={0.5}/>
    </mesh>
    <Text3D 
      font="/fonts/Luckiest Guy_Regular.json" 
      size={0.4} 
      height={0.01} 
      position={[-6,5,-5]}
      rotation={[-Math.PI/2,0,0, "YXZ"]}
    >
      Disconnected. Please refresh
    </Text3D>
  </group>
}