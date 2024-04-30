
import { useSpring, animated } from '@react-spring/three';
import { Float, Text3D, useGLTF } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { boomTextAtom } from './GlobalState';

// show yoots for bonus turn
// show team for "your turn"
// do not play again on re-render
// local storage or useMemo
// on player action, reset this count
  // click piece
  // throw the yoot
  // button click - start game
export default function BoomText(props) {
  const { nodes, materials } = useGLTF("models/boom-wrap.glb");
  const [text] = useAtom(boomTextAtom)
  const [plays, setPlays] = useState(0) // use 'reset' in springs

  useEffect(() => {
    setPlays(plays => plays+1)
  }, [text])

  function BonusTurn({props}) {
    const { scale } = useSpring({
      from: {
        scale: [0,0,0]
      },
      to: [
        {
          scale: props.scale,
        },
        {
          scale: [0,0,0],
          delay: 3000
        },
      ],
      loop: false
    })
    return <Float>
    <animated.group {...props} scale={scale} dispose={null}>
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

  function OutOfBounds() {
    const { scale } = useSpring({
      from: {
        scale: 0
      },
      to: [
        {
          scale: 5
        },
        {
          scale: 0,
          delay: 2000
        }
      ],
      loop: false
    })
    return <Float>
      <animated.group {...props} scale={scale} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle002.geometry}
          material={nodes.Circle002.material}
          scale={[1.2, 1.2, 1.2]}
        >
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle002.geometry}
          material={nodes.Circle002.material}
          scale={[1.1, 1.3, 1.1]}
          position={[0, 0.02, 0]}
        >
        <meshStandardMaterial color='green'/>
        </mesh>
        <group name="text" position={[0.01, -0.2, -0.48]} scale={1.2}>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[Math.PI/2, Math.PI, Math.PI/2]}
            position={[0, 0, 0]}
            size={0.15}
          >
            Out of
            <meshStandardMaterial color="yellow"/>
          </Text3D>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[Math.PI/2, Math.PI, Math.PI/2]}
            position={[-0.2, 0,0]}
            size={0.15}
          >
            bounds!
            <meshStandardMaterial color="yellow"/>
          </Text3D>
        </group>
      </animated.group>
    </Float>
  }
  function GameStart({scale}) {
    console.log(`[BoomText][GameStart]`)
    const springs = useSpring({
      from: {
        scale: 0
      },
      to: [
        {
          scale: scale
        },
        {
          scale: 0,
          delay: 2000
        }
      ],
      loop: false
    })
    return <Float>
      <animated.group {...props} scale={springs.scale} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle002.geometry}
          material={nodes.Circle002.material}
          scale={[1.2, 1.2, 1.2]}
        >
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle002.geometry}
          material={nodes.Circle002.material}
          scale={[1.1, 1.3, 1.1]}
          position={[0, 0.02, 0]}
        >
        <meshStandardMaterial color='green'/>
        </mesh>
        <group name="text" position={[0.01, -0.2, -0.48]} scale={1.2}>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[Math.PI/2, Math.PI, Math.PI/2]}
            position={[0, 0, 0]}
            size={0.15}
          >
            GAME START!
            <meshStandardMaterial color="yellow"/>
          </Text3D>
        </group>
      </animated.group>
    </Float>
  }

  return (
    <group>
      { text === 'bonus turn' && <BonusTurn props={props}/> }
      { text === 'out of bounds' && <OutOfBounds props={props}/> }
      { text === 'game start' && <GameStart props={props}/> }
    </group>
  );
}