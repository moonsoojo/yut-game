
import { useSpring, animated } from '@react-spring/three';
import { Float, Text3D, useGLTF } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { pregameAlertAtom } from './GlobalState';
import { useFrame } from '@react-three/fiber';
import Star from './meshes/Star';
import RocketsGoFirst from './RocketsGoFirst';
import UfosGoFirst from './UfosGoFirst';

export default function PregameAlert({ position, rotation, initialScale }) {

  // Prevent text from re-appearing on re-render
  const springs = useSpring({
    from: {
      scale: 0
    },
    to: [
      {
        scale: initialScale,
        // Specify config here for animation to not trigger again before delay ends
        config: {
          tension: 170,
          friction: 26
        }
      },
      {
        scale: 0,
        config: {
          tension: 170,
          friction: 26
        },
        delay: 3000
      }
    ],
    loop: false,
    reset: true,
  })

  function PregameTie({ position, rotation, scale }) {

    const { nodes, materials } = useGLTF('models/alert-background.glb')
    
    const borderMesh0Ref = useRef();
    const borderMesh1Ref = useRef();
    const borderMesh2Ref = useRef();
    const borderMesh3Ref = useRef();
    const borderMesh4Ref = useRef();
    const borderMesh5Ref = useRef();
    const borderMesh6Ref = useRef();
    const borderMeshRefs = [
      borderMesh0Ref,
      borderMesh1Ref,
      borderMesh2Ref,
      borderMesh3Ref,
      borderMesh4Ref,
      borderMesh5Ref,
      borderMesh6Ref
    ]

    const height = 0.75
    const width = 1.7
    useFrame((state, delta) => {
      for (let i = 0; i < borderMeshRefs.length; i++) {      
        borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
        borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
      }
    })
    
    const starScale = 0.09
    return (
      <animated.group position={position} rotation={rotation} scale={scale}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={nodes.Cylinder.material}
          scale={[0.75, 0.02, 1.671]}
        >
          <meshStandardMaterial color='black' opacity={0.9} transparent/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[Math.PI/2, Math.PI, Math.PI/2]}
          position={[-0.1, 0.1, -0.64]}
          size={0.5}
          height={0.01}
        >
          TIE!
          <meshStandardMaterial color="yellow"/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[Math.PI/2, Math.PI, Math.PI/2]}
          position={[-0.45, 0.1, -0.64]}
          size={0.2}
          height={0.01}
        >
          GO AGAIN
          <meshStandardMaterial color="yellow"/>
        </Text3D>
        <group name='border'>
          <group ref={borderMesh0Ref}>
            <Star position={[0, 0.05, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={starScale} color='yellow'/>
          </group>
          <group ref={borderMesh1Ref}>
            <Star position={[0, 0.05, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={starScale} color='yellow'/>
          </group>
          <group ref={borderMesh2Ref}>
            <Star position={[0, 0.05, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={starScale} color='yellow'/>
          </group>
          <group ref={borderMesh3Ref}>
            <Star position={[0, 0.05, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={starScale} color='yellow'/>
          </group>
          <group ref={borderMesh4Ref}>
            <Star position={[0, 0.05, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={starScale} color='yellow'/>
          </group>
          <group ref={borderMesh5Ref}>
            <Star position={[0, 0.05, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={starScale} color='yellow'/>
          </group>
          <group ref={borderMesh6Ref}>
            <Star position={[0, 0.05, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={starScale} color='yellow'/>
          </group>
        </group>
      </animated.group>
    )
  }

  // remove conditional render in 'Game' component
  // use conditional springs with pregameAlert.type for each alert
  // possible states: x goes first, y goes first, pregameTie
  const [pregameAlert] = useAtom(pregameAlertAtom)
  return <Float position={position} floatIntensity={0.5} rotationIntensity={0.5}>
    { pregameAlert 
    && pregameAlert.type === 'gameStart' &&
    pregameAlert.team === 0 && 
    <RocketsGoFirst
    position={[0.5, 2, 1]} 
    rotation={rotation} 
    scale={springs.scale}/> 
    }
    { pregameAlert 
    && pregameAlert.type === 'gameStart' &&
    pregameAlert.team === 1 && 
    <UfosGoFirst
    position={[0.5, 2, 1]} 
    rotation={rotation} 
    scale={springs.scale}/> 
    }
    { pregameAlert 
    && pregameAlert.type === 'pregameTie' && <PregameTie 
    position={[0.5, 3, 1]} 
    rotation={rotation} 
    scale={springs.scale}/> }
  </Float>
}