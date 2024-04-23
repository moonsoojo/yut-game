import React from 'react';
import { useAtom } from 'jotai';
import { useSpring, animated } from '@react-spring/three';
import { lastMoveAtom } from './GlobalState';
import { Text3D } from '@react-three/drei';

export default function MoveAnimation({ move, initialPosition, endingPosition, initialScale }) {
  // MoveDisplay contains moves
  // Move is merely for animation
  // pass it last move from list of moves of the current team
  // animate it on start and set the scale to 0 on finish
  console.log(`[MoveAnimation] move`, move)
  const [_lastMove, setLastMove] = useAtom(lastMoveAtom)

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
      size={0.4}
      height={0.01}
    >
      Move: {move}
      <meshStandardMaterial color="limegreen"/>
    </Text3D>
  </animated.group>
}