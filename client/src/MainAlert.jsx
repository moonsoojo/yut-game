
import { useSpring, animated } from '@react-spring/three';
import { Float, Text3D, useGLTF } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { boomTextAtom, mainAlertAtom } from './GlobalState';
import { useFrame } from '@react-three/fiber';
import Rocket from './meshes/Rocket';
import Star from './meshes/Star';

// show yoots for bonus turn
// show team for "your turn"
// do not play again on re-render
// local storage or useMemo
// on player action, reset this count
  // click piece
  // throw the yoot
  // button click - start game
export default function MainAlert({ position=[0,0,0], rotation, initialScale }) {
  const { nodes, materials } = useGLTF("models/boom-wrap.glb");
  const [mainAlert, setMainAlert] = useAtom(mainAlertAtom)
  console.log(`[MainAlert]`, mainAlert)

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
        delay: 100000
      }
    ],
    loop: false,
    // reset: true,
    // onRest: () => setMainAlert(null) // must be set to null, or component will re-render
  })

  function GameStart({ position, rotation, scale }) {
    console.log(`[BoomText][GameStart]`)

    return <animated.group position={position} rotation={rotation} scale={scale}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle002.geometry}
        material={nodes.Circle002.material}
        scale={[1.2, 0.2, 1.2]}
      >
        <meshStandardMaterial color='yellow'/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle002.geometry}
        material={nodes.Circle002.material}
        scale={[1.1, 0.3, 1.1]}
        position={[0, 0.02, 0]}
      >
        <meshStandardMaterial color='green'/>
      </mesh>
      <group name="text" position={[0.01, -0.2, -0.48]} scale={1.2}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[0, 0, 0]}
          rotation={[Math.PI/2, Math.PI, Math.PI/2]}
          size={0.2}
        >
          GAME
          <meshStandardMaterial color="yellow"/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-0.25, 0, 0]}
          rotation={[Math.PI/2, Math.PI, Math.PI/2]}
          size={0.2}
        >
          START!
          <meshStandardMaterial color="yellow"/>
        </Text3D>
      </group>
    </animated.group>
  }
  function PregameTie({ position, rotation, scale }) {

    return <animated.group position={position} rotation={rotation} scale={scale}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle002.geometry}
        material={nodes.Circle002.material}
        scale={[1.2, 0.2, 1.2]}
      >
        <meshStandardMaterial color='yellow'/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle002.geometry}
        material={nodes.Circle002.material}
        scale={[1.1, 0.3, 1.1]}
        position={[0, 0.02, 0]}
      >
        <meshStandardMaterial color='green'/>
      </mesh>
      <group name="text" position={[-0.15, -0.2, -0.35]} scale={1.2}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[Math.PI/2, Math.PI, Math.PI/2]}
          position={[0, 0, 0]}
          size={0.3}
        >
          TIE!
          <meshStandardMaterial color="yellow"/>
        </Text3D>
      </group>
    </animated.group>
  }

  function formatName(name) {
    if (name.length > 10) {
      return name.substring(0, 10) + '...'
    } else {
      return name
    }
  }

  function Turn({position, rotation, scale, team, name}) {
    console.log(`[Turn] name`, name)
    const { nodes, materials } = useGLTF('models/alert-background.glb')

    const rocket0Ref = useRef();
    const rocket1Ref = useRef();
    const rocket2Ref = useRef();
    const rocket3Ref = useRef();
    const rocket4Ref = useRef();
    const rocket5Ref = useRef();
    const rocket6Ref = useRef();

    useFrame((state, delta) => {
      rocket0Ref.current.position.x = Math.cos(state.clock.elapsedTime / 2) * 2
      rocket0Ref.current.position.y = 0.3
      rocket0Ref.current.position.z = Math.sin(state.clock.elapsedTime / 2) * 2.7
      rocket1Ref.current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI / 7) * 2
      rocket1Ref.current.position.y = 0.3
      rocket1Ref.current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI / 7) * 2.7
      rocket2Ref.current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI / 7 * 2) * 2
      rocket2Ref.current.position.y = 0.3
      rocket2Ref.current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI / 7 * 2) * 2.7
      rocket3Ref.current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI / 7 * 3) * 2
      rocket3Ref.current.position.y = 0.3
      rocket3Ref.current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI / 7 * 3) * 2.7
      rocket4Ref.current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI / 7 * 4) * 2
      rocket4Ref.current.position.y = 0.3
      rocket4Ref.current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI / 7 * 4) * 2.7
      rocket5Ref.current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI / 7 * 5) * 2
      rocket5Ref.current.position.y = 0.3
      rocket5Ref.current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI / 7 * 5) * 2.7
      rocket6Ref.current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI / 7 * 6) * 2
      rocket6Ref.current.position.y = 0.3
      rocket6Ref.current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI / 7 * 6) * 2.7
    })

    return <animated.group position={position} rotation={rotation} scale={scale}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={nodes.Cylinder.material}
        scale={[2, 0.055, 2.6]}
      >
        <meshStandardMaterial color='black' opacity={0.7} transparent/>
      </mesh>
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={nodes.Cylinder.material}
        scale={[1.9, 0.065, 2.5]}
      >
        <meshStandardMaterial color='black'/>
      </mesh> */}
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        rotation={[Math.PI/2, Math.PI, Math.PI/2]}
        position={[-0.7, 0, -1.5]}
        size={0.4}
        height={0.1}
      >
        your turn!
        <meshStandardMaterial color={ team === 0 ? 'red': 'green' }/>
      </Text3D>
      <group>
      {/* <group ref={nameContainerRef}> */}
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[Math.PI/2, Math.PI, Math.PI/2]}
          position={[0,0,0]}
          size={0.5}
          height={0.1}
          // ref={nameRef}
        >
          {formatName(name)}
          {/* {`.`} */}
          <meshStandardMaterial color={ team === 0 ? 'red': 'green' }/>
        </Text3D>
      </group>
      <group ref={rocket0Ref}>
        <Star position={[0, 0, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={0.3} color='red'/>
        {/* <Rocket position={[0, 0, 0]} rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} scale={0.4}/> */}
      </group>
      <group ref={rocket1Ref}>
        <Rocket position={[0, 0, 0]} rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} scale={0.4}/>
      </group>
      <group ref={rocket2Ref}>
        <Rocket position={[0, 0, 0]} rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} scale={0.4}/>
      </group>
      <group ref={rocket3Ref}>
        <Rocket position={[0, 0, 0]} rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} scale={0.4}/>
      </group>
      <group ref={rocket4Ref}>
        <Rocket position={[0, 0, 0]} rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} scale={0.4}/>
      </group>
      <group ref={rocket5Ref}>
        <Rocket position={[0, 0, 0]} rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} scale={0.4}/>
      </group>
      <group ref={rocket6Ref}>
        <Rocket position={[0, 0, 0]} rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} scale={0.4}/>
      </group>
    </animated.group>
  }
  return <group
  position={position}
  rotation={rotation}>
    {/* <Float 
      floatIntensity={0.5} 
      rotationIntensity={0.5}
      position={position}
      rotation={rotation}
      > */}
      {/* { text === 'gameStart' && <GameStart position={[-0.3, 1, 0]} rotation={rotation} scale={springs.scale}/> }
      { text === 'pregameTie' && <PregameTie position={[-0.3, 1, 0]} rotation={rotation} scale={springs.scale}/> } */}
      { mainAlert && mainAlert.type === 'turn' && <Turn 
      position={[5,3,0]}
      rotation={[0,0,0]}
      scale={springs.scale}
      team={mainAlert.team} 
      name={mainAlert.name}/> }
    {/* </Float> */}
  </group>
}