
import { useSpring, animated } from '@react-spring/three';
import { Text3D, useGLTF } from '@react-three/drei';
import React, { useRef } from 'react';
import { useAtom } from 'jotai';
import { animationPlayingAtom, gamePhaseAtom, mainAlertAtom, turnAlertActiveAtom } from './GlobalState';
import { useFrame } from '@react-three/fiber';
import Rocket from './meshes/Rocket';
import Star from './meshes/Star';
import Ufo from './meshes/Ufo';
import CatchAlert from './alerts/CatchAlert';
import TripleCatchAlert from './alerts/TripleCatchAlert';
import DoubleCatchAlert from './alerts/DoubleCatchAlert';
import AllClearAlert from './alerts/AllClearAlert';
import YootAlert from './alerts/YootAlert';
import MoAlert from './alerts/MoAlert';

export default function MainAlert({ position=[0,0,0], rotation, initialScale }) {
  const [mainAlert, setMainAlert] = useAtom(mainAlertAtom)
  // const [gamePhase] = useAtom(gamePhaseAtom)
  // const [turnAlertActive] = useAtom(turnAlertActiveAtom)
  console.log(`[MainAlert]`)
  const [animationPlaying] = useAtom(animationPlayingAtom)
  // what happens when you click the next player's yoot button before the pieces stop moving?
  // when you have a yoot and another move, and you place a piece before the other one ends
  // sequence: make move -> highlight pieces (move available) -> make move -> score -> pass turn

  // precheck: assign state to each piece. all pieces must be still before 'pass check' event is emitted
  // instead of passing turn in the 'move' or 'score' ('recordThrow' is OK because pieces are not moving),
  // write a new event handler that triggers at the end of the move or score animation
  // make 'turnAlertActive' part of the game state and change from server

  // i want the piece to be highlighted instead of the tile because it's confusing when the tile is highlighted before the piece gets there

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
          tension: 120,
          friction: 26
        },
      },
      {
        scale: 0,
        config: {
          tension: 100,
          friction: 26
        },
        delay: 3000
      }
    ],
    loop: false,
    reset: true, // turn it on to reset animation
    onStart: () => {
      console.log(`[MainAlert] start`, mainAlert)
    },
    onRest: () => {
      console.log(`[MainAlert] rest`, mainAlert)
    }
    // don't trigger alert again after it plays
    // alert plays, and on piece move, it briefly plays again
    // when it finishes moving, it plays fully again

    // onRest: () => setMainAlert((prevAlert) => {
    //   console.log('main alert rest')
    //   return { type: '' }
    // })
  })

  function formatName(name) {
    if (name.length > 10) {
      return name.substring(0, 10) + '...'
    } else {
      return name
    }
  }

  function Turn({position, rotation, scale, team, name}) {
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
    { mainAlert && mainAlert.type === 'turn' && (!animationPlaying) && <Turn 
      position={[5,3,0]}
      rotation={[0,0,0]}
      scale={springs.scale}
      team={mainAlert.team} 
      name={mainAlert.name}/> }
    { mainAlert && mainAlert.type === 'catch' && mainAlert.amount === 1 && !animationPlaying && <CatchAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
      scale={springs.scale}
      team={mainAlert.team}/> }
    { mainAlert && mainAlert.type === 'catch' && mainAlert.amount === 2 && !animationPlaying && <DoubleCatchAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
      scale={springs.scale}
      team={mainAlert.team}/> }
      {/* catch animation */}
      {/* laser beam vs. psy-power (turquoise jello / mewtwo hypnotize / meshDistortMaterial) */}
    { mainAlert && mainAlert.type === 'catch' && mainAlert.amount === 3 && !animationPlaying && <TripleCatchAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
      scale={springs.scale}
      team={mainAlert.team}/> }
    { mainAlert && mainAlert.type === 'catch' && mainAlert.amount === 4 && !animationPlaying && <AllClearAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
      scale={springs.scale}
      team={mainAlert.team}/> }
    { mainAlert && mainAlert.type === 'throw' && mainAlert.num === 4 && !animationPlaying && <YootAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
      scale={springs.scale}/> }
    { mainAlert && mainAlert.type === 'throw' && mainAlert.num === 5 && !animationPlaying && <MoAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
      scale={springs.scale}/> }
    {/* </Float> */}
  </group>
}