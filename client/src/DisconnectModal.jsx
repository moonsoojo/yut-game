import React from 'react';
import { Html, Text3D } from '@react-three/drei';

export default function DisconnectModal({ position, rotation, scale }) {
  console.log(`DisconnectModal`)
  function handleDisconnectPointerDown(e) {
    e.stopPropagation()
  }

  function handleDisconnectPointerUp(e) {
    e.stopPropagation()
  }
  function handleRefreshClick() {
    location.reload()
  }
  function handleRefreshEnter() {
    document.body.style.cursor = "pointer";
  }
  function handleRefreshExit() {
    document.body.style.cursor = "default";
  }

  return <group>
    <mesh 
      position={[0, 4, 0]} 
      onPointerDown={e => handleDisconnectPointerDown(e)} 
      onPointerUp={e => handleDisconnectPointerUp(e)}
    >
      <boxGeometry args={[200, 0.1, 200]}/>
      <meshStandardMaterial color="black" transparent opacity={0.5}/>
    </mesh>
    <Html
      transform
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <div style={{
        width: '400px',
        height: '200px',
        border: '3px solid yellow',
        background: 'black',
        fontFamily: 'Luckiest Guy',
        fontSize: '30px',
        padding: '20px',
        color: 'yellow',
      }}>
        Disconnected from server. Please refresh the page to reconnect.
        <div 
          style={{
            border: '3px solid yellow',
            width: 'fit-content',
            padding: '5px',
            margin: '30px 130px',
            color: 'yellow'
          }}
          onClick={handleRefreshClick}
          onPointerEnter={handleRefreshEnter}
          onPointerLeave={handleRefreshExit}
        >
          Refresh
        </div>
      </div>
    </Html>
  </group>
}