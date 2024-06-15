
import { useSpring, animated } from '@react-spring/three';
import { Float, Text3D, useGLTF } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { boomTextAtom, mainAlertAtom } from './GlobalState';
import { useFrame } from '@react-three/fiber';
import Rocket from './meshes/Rocket';
import Star from './meshes/Star';
import Ufo from './meshes/Ufo';
import CatchAlert from './alerts/CatchAlert';
import TripleCatchAlert from './alerts/TripleCatchAlert';
import DoubleCatchAlert from './alerts/DoubleCatchAlert';
import AllClearAlert from './alerts/AllClearAlert';

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
        delay: 3000
      }
    ],
    loop: false,
    // reset: true,
    // onRest: () => setMainAlert(null) // must be set to null, or component will re-render
  })

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
    const nameRef = useRef();
    const nameContainerRef = useRef();

    useFrame((state, delta) => {
      for (let i = 0; i < borderMeshRefs.length; i++) {      
        borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2
        borderMeshRefs[i].current.position.y = 0.3
        borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2.7
      }
      
      if (nameRef.current.geometry.boundingSphere) {
        const centerX = nameRef.current.geometry.boundingSphere.center.x
        nameContainerRef.current.position.z = -centerX
      }
    })

    return <animated.group position={position} rotation={rotation} scale={scale}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={nodes.Cylinder.material}
        scale={[2, 0.055, 2.6]}
      >
        <meshStandardMaterial color='black' opacity={0.8} transparent/>
      </mesh>
      <group ref={nameContainerRef}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[Math.PI/2, Math.PI, Math.PI/2]}
          position={[0,0,0]}
          size={0.6}
          height={0.1}
          ref={nameRef}
        >
          {formatName(name)}
          <meshStandardMaterial color={ team === 0 ? 'red': 'turquoise' }/>
        </Text3D>
      </group>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        rotation={[Math.PI/2, Math.PI, Math.PI/2]}
        position={[-0.7, 0, -1.5]}
        size={0.4}
        height={0.1}
      >
        your turn!
        <meshStandardMaterial color={ team === 0 ? 'red': 'turquoise' }/>
      </Text3D>
      <group ref={borderMesh0Ref}>
        <Star position={[0, 0, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={0.3} color={ team === 0 ? 'red': 'turquoise' }/>
      </group>
      <group ref={borderMesh1Ref}>
        { team === 0 ? <Rocket 
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
        scale={0.4}
        /> : <Ufo
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 4, Math.PI/2]} 
        scale={0.5}
        />}
      </group>
      <group ref={borderMesh2Ref}>
        { team === 0 ? <Rocket 
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
        scale={0.4}
        /> : <Ufo
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 4, Math.PI/2]} 
        scale={0.5}
        />}
      </group>
      <group ref={borderMesh3Ref}>
        { team === 0 ? <Rocket 
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
        scale={0.4}
        /> : <Ufo
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 4, Math.PI/2]} 
        scale={0.5}
        />}
      </group>
      <group ref={borderMesh4Ref}>
        { team === 0 ? <Rocket 
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
        scale={0.4}
        /> : <Ufo
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 4, Math.PI/2]} 
        scale={0.5}
        />}
      </group>
      <group ref={borderMesh5Ref}>
        { team === 0 ? <Rocket 
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
        scale={0.4}
        /> : <Ufo
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 4, Math.PI/2]} 
        scale={0.5}
        />}
      </group>
      <group ref={borderMesh6Ref}>
        { team === 0 ? <Rocket 
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
        scale={0.4}
        /> : <Ufo
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 4, Math.PI/2]} 
        scale={0.5}
        />}
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
    { mainAlert && mainAlert.type === 'catch' && mainAlert.amount === 1 && <CatchAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
      scale={springs.scale}
      team={mainAlert.team}/> }
    { mainAlert && mainAlert.type === 'catch' && mainAlert.amount === 2 && <DoubleCatchAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
      scale={springs.scale}
      team={mainAlert.team}/> }
    { mainAlert && mainAlert.type === 'catch' && mainAlert.amount === 3 && <TripleCatchAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
      scale={springs.scale}
      team={mainAlert.team}/> }
    { mainAlert && mainAlert.type === 'catch' && mainAlert.amount === 4 && <AllClearAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
      scale={springs.scale}
      team={mainAlert.team}/> }
    {/* </Float> */}
  </group>
}