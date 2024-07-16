import React from 'react';
import { Text3D } from '@react-three/drei';
import { Color, MeshStandardMaterial } from 'three';

export default function DisconnectModal({ position=[0,0,0], rotation=[0,0,0] }) {

  const buttonMaterial = new MeshStandardMaterial({ color: new Color('yellow')});

  function handleDisconnectPointerEnter(e) {
    console.log('pointer enter')
    e.stopPropagation()
  }
  function handleDisconnectPointerLeave(e) {
    console.log('pointer leave')
    e.stopPropagation()
  }
  function handleDisconnectPointerDown(e) {
    e.stopPropagation()
  }
  function handleRefreshClick(e) {
    location.reload()
  }
  function handleRefreshEnter(e) {
    document.body.style.cursor = "pointer";
    buttonMaterial.color = new Color('green')
  }
  function handleRefreshLeave(e) {
    document.body.style.cursor = "default";
    buttonMaterial.color = new Color('yellow')
  }

  return <group position={position} rotation={rotation}>
    <mesh>
      <boxGeometry args={[5.5, 0.01, 3]}/>
      <meshStandardMaterial color='yellow'/>
    </mesh>
    <mesh>
      <boxGeometry args={[5.4, 0.02, 2.9]}/>
      <meshStandardMaterial color='black'/>
    </mesh>
    <mesh name='modal-wrapper'>
      <boxGeometry args={[5.5, 0.02, 2.9]}/>
      <meshStandardMaterial color='grey' opacity={0} transparent/>
    </mesh>
    <Text3D
      font="fonts/Luckiest Guy_Regular.json"
      rotation={[Math.PI/2, Math.PI, Math.PI]}
      position={[-2.5,0.02,-0.9]}
      size={0.3}
      height={0.01}
    >
      {`disconnected from\nserver. Please Refresh\nthe page to reconnect.`}
      <meshStandardMaterial color='yellow'/>
    </Text3D>
    <group name='button' position={[0, 0.02, 0.9]}>
      <mesh material={buttonMaterial}>
        <boxGeometry args={[2, 0.01, 0.8]}/>
      </mesh>
      <mesh>
        <boxGeometry args={[1.9, 0.02, 0.7]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh name='wrapper' onPointerDown={e => handleRefreshClick(e)} onPointerEnter={e => handleRefreshEnter(e)} onPointerOut={e => handleRefreshLeave(e)}>
        <boxGeometry args={[2, 0.1, 0.8]}/>
        <meshStandardMaterial color='grey' opacity={0} transparent/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        rotation={[Math.PI/2, Math.PI, Math.PI]}
        position={[-0.85,0.02,0.13]}
        size={0.3}
        height={0.01}
        material={buttonMaterial}
      >
        refresh
      </Text3D>
    </group>
    <mesh position={[0, -0.1, 0]} 
    onPointerEnter={e => handleDisconnectPointerEnter(e)} 
    onPointerLeave={e => handleDisconnectPointerLeave(e)}
    onPointerDown={e => handleDisconnectPointerDown(e)}
    >
      <boxGeometry args={[40, 0.1, 40]}/>
      <meshStandardMaterial color='black' transparent opacity={0.5}/>
    </mesh>
  </group>
}