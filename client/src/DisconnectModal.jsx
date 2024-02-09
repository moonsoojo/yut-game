import React from 'react';
import { Html } from '@react-three/drei';

export default function DisconnectModal({ position, rotation, scale }) {

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
  function handleRefreshLeave() {
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
    >
      <div style={{
        width: '180px',
        height: '100px',
        border: '1px solid yellow',
        background: 'black',
        fontFamily: 'Luckiest Guy',
        fontSize: '15px',
        padding: '10px',
        color: 'yellow',
        zIndex: '10',
        position: 'absolute'
      }}>
        Disconnected from server. Please refresh the page to reconnect.
        <div 
          style={{
            border: '1px solid yellow',
            width: 'fit-content',
            padding: '5px',
            position: 'absolute',
            left: '67px',
            top: '75px',
            color: 'yellow'
          }}
          onClick={handleRefreshClick}
          onPointerEnter={handleRefreshEnter}
          onPointerLeave={handleRefreshLeave}
        >
          Refresh
        </div>
      </div>
    </Html>
  </group>
}