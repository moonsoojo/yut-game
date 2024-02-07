import { Text3D } from '@react-three/drei';
import React, { useState } from 'react';
import { socket } from './SocketManager';

export default function LetsPlayButton({
  position,
  scale,
  rotation,
  size
}) {
  const buttonDimensions = [2, 0.2, 1.3]
  const borderDimensions = [
    buttonDimensions[0] * 1.1,
    buttonDimensions[1] * 0.9,
    buttonDimensions[2] * 1.1,
  ]

  const [hover, setHover] = useState(false)

  function handleLetsPlayEnter() {
    setHover(true)
  }
  function handleLetsPlayLeave() {
    setHover(false)
  }

  function handleLetsPlay() {
    console.log(`[LetsPlayButton] clicked`)
    socket.emit("startGame", ({ response }) => {
      // console.log("[startGame] response", response)
    })
  }
  return <group position={position} scale={scale}>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json" 
      size={0.4} 
      height={0.01} 
      position={[0,0,0]}
      rotation={[-Math.PI/2,0,0]}
    >
      Let's
      <meshStandardMaterial color={ hover ? 'white' : 'yellow' }/>
    </Text3D>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json" 
      size={0.4} 
      height={0.01} 
      color='yellow'
      position={[0,0,0.5]}
      rotation={[-Math.PI/2,0,0]}
    >
      Play!
      <meshStandardMaterial color={ hover ? 'white' : 'yellow' }/>
    </Text3D>
    <group 
      name='button-wrapper' 
      position={[0.7, 0, 0.05]}
    >
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={buttonDimensions}/>
        <meshStandardMaterial color="black"/>
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={borderDimensions}/>
        <meshStandardMaterial color={ hover ? 'white' : 'yellow' }/>
      </mesh>
      <mesh 
        onPointerDown={handleLetsPlay}
        onPointerEnter={handleLetsPlayEnter}
        onPointerLeave={handleLetsPlayLeave}
      >
        <boxGeometry args={buttonDimensions}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
    </group>
  </group>
}