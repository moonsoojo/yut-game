
import { useSpring, animated } from '@react-spring/three';
import { Float, Text3D, useGLTF } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { boomTextAtom, pregameAlertAtom, yootThrownAtom } from './GlobalState';
import { useFrame } from '@react-three/fiber';
import Star from './meshes/Star';
import RocketsGoFirst from './RocketsGoFirst';
import UfosGoFirst from './UfosGoFirst';

export default function PregameAlert({ position, rotation, initialScale }) {
  const { nodes, materials } = useGLTF("models/boom-wrap.glb");

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
    // onRest: () => setText(null)
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

    useFrame((state, delta) => {
      for (let i = 0; i < borderMeshRefs.length; i++) {      
        borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 0.7
        borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 1.7
      }
    })
    
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
          position={[-0.28, 0, -0.64]}
          size={0.6}
          height={0.1}
        >
          TIE!
          <meshStandardMaterial color="yellow"/>
        </Text3D>
        <group name='border'>
          <group ref={borderMesh0Ref}>
            <Star position={[0, 0.1, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={0.12} color='yellow'/>
          </group>
          <group ref={borderMesh1Ref}>
            <Star position={[0, 0.1, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={0.12} color='yellow'/>
          </group>
          <group ref={borderMesh2Ref}>
            <Star position={[0, 0.1, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={0.12} color='yellow'/>
          </group>
          <group ref={borderMesh3Ref}>
            <Star position={[0, 0.1, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={0.12} color='yellow'/>
          </group>
          <group ref={borderMesh4Ref}>
            <Star position={[0, 0.1, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={0.12} color='yellow'/>
          </group>
          <group ref={borderMesh5Ref}>
            <Star position={[0, 0.1, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={0.12} color='yellow'/>
          </group>
          <group ref={borderMesh6Ref}>
            <Star position={[0, 0.1, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={0.12} color='yellow'/>
          </group>
        </group>
      </animated.group>
    )
  }

  function Rules() {
    return <group>
      <Text3D
      font="fonts/Luckiest Guy_Regular.json"
      position={layout[device].whoGoesFirst.title.position}
      rotation={layout[device].whoGoesFirst.title.rotation}
      size={layout[device].whoGoesFirst.title.size}
      height={layout[device].whoGoesFirst.title.height}
      >
        {`Who goes first?`}
        <meshStandardMaterial color="yellow"/>
      </Text3D>
      <Text3D
      font="fonts/Luckiest Guy_Regular.json"
      position={layout[device].whoGoesFirst.description.position}
      rotation={layout[device].whoGoesFirst.description.rotation}
      size={layout[device].whoGoesFirst.description.size}
      height={layout[device].whoGoesFirst.title.height}
      lineHeight={0.8}
      >
        {`One player from each team throws\nthe yoot. The team with a higher\nnumber goes first.`}
        <meshStandardMaterial color="green"/>
      </Text3D>
    </group>
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
    position={[-0.3, 2, 0]} 
    rotation={rotation} 
    scale={springs.scale}/> }
  </Float>
}