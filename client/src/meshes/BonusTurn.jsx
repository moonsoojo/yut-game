
import { useSpring, animated } from '@react-spring/three';
import { Float, Text3D, useGLTF } from '@react-three/drei';
import React, { useEffect, useState } from 'react';

export default function BonusTurn(props) {
  const { nodes, materials } = useGLTF("models/boom-wrap.glb");

  return <Float>
    <animated.group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle002.geometry}
        material={nodes.Circle002.material}
        scale={[1, 1, 1]}
      >
        <meshStandardMaterial color='yellow'/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle002.geometry}
        material={nodes.Circle002.material}
        scale={[0.9, 1.1, 0.9]}
        position={[0, 0.02, 0]}
      >
      <meshStandardMaterial color='green'/>
      </mesh>
      <group name="text" position={[0, -0.15, -0.36]} scale={1.2}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[Math.PI/2, Math.PI, Math.PI/2]}
          position={[0, 0, 0]}
          size={0.15}
        >
          BONUS
          <meshStandardMaterial color="yellow"/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[Math.PI/2, Math.PI, Math.PI/2]}
          position={[-0.2, 0,0]}
          size={0.15}
        >
          TURN!
          <meshStandardMaterial color="yellow"/>
        </Text3D>
      </group>
    </animated.group>
  </Float>
}