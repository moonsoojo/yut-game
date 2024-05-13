import React from 'react';
import { useAtom } from 'jotai';
import { useSpring, animated } from '@react-spring/three';
import { lastMoveAtom } from './GlobalState';
import { Text3D } from '@react-three/drei';

export default function MoveAnimation({ 
  move, 
  initialPosition, 
  endingPosition, 
  initialScale,
  fontSize
}) {
  
  const [_lastMove, setLastMove] = useAtom(lastMoveAtom)

  // const displayTime = 100000
  const displayTime = 3000
  const springs = useSpring({
    from: {
      position: initialPosition,
      scale: initialScale
    },
    to: [
      {
        position: endingPosition,
        scale: 0,
        config: {
          tension: 170,
          friction: 26
        }
      }
    ],
    loop: false,
    delay: displayTime,
    reset: true,
    onRest: () => setLastMove(null)
  })

  return <animated.group
    position={springs.position}
    scale={springs.scale}
  >
    <Text3D
      rotation={[-Math.PI/2,0,0]}
      font="/fonts/Luckiest Guy_Regular.json"
      size={fontSize}
      height={0.01}
    >
      Move: {move}
      <meshStandardMaterial color="limegreen"/>
    </Text3D>
  </animated.group>
}