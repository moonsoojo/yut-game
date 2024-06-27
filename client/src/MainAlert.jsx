
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
import TurnAlert from './alerts/TurnAlert';

export default function MainAlert({ position=[0,0,0], rotation, initialScale }) {
  const [mainAlert, setMainAlert] = useAtom(mainAlertAtom)
  // const [gamePhase] = useAtom(gamePhaseAtom)
  // const [turnAlertActive] = useAtom(turnAlertActiveAtom)
  console.log(`[MainAlert]`, mainAlert)
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
  // const springs = useSpring({
  //   from: {
  //     scale: 0
  //   },
  //   to: [
  //     {
  //       scale: initialScale,
  //       // Specify config here for animation to not trigger again before delay ends
  //       config: {
  //         tension: 120,
  //         friction: 26
  //       },
  //     },
  //     {
  //       scale: 0,
  //       config: {
  //         tension: 100,
  //         friction: 26
  //       },
  //       delay: 3000
  //     }
  //   ],
  //   loop: false,
  //   reset: true, // turn it on to reset animation
  //   onStart: () => {
  //     console.log(`[MainAlert] start`, mainAlert)
  //   },
  //   onRest: () => {
  //     console.log(`[MainAlert] rest`, mainAlert)
  //     setMainAlert(null)
  //   }
  //   // don't trigger alert again after it plays
  //   // alert plays, and on piece move, it briefly plays again
  //   // when it finishes moving, it plays fully again

  //   // onRest: () => setMainAlert((prevAlert) => {
  //   //   console.log('main alert rest')
  //   //   return { type: '' }
  //   // })
  // })

  

  return <group
  position={position}
  rotation={rotation}>
    { mainAlert && mainAlert.type === 'turn' && !animationPlaying && <TurnAlert
      position={[5,3,0]}
      rotation={[0,0,0]}
    /> }
    { mainAlert && mainAlert.type === 'catch' && mainAlert.amount === 1 && !animationPlaying && <CatchAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
    /> }
    { mainAlert && mainAlert.type === 'catch' && mainAlert.amount === 2 && !animationPlaying && <DoubleCatchAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
    /> }
    { mainAlert && mainAlert.type === 'catch' && mainAlert.amount === 3 && !animationPlaying && <TripleCatchAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
    /> }
    { mainAlert && mainAlert.type === 'catch' && mainAlert.amount === 4 && !animationPlaying && <AllClearAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
    /> }
    { mainAlert && mainAlert.type === 'throw' && mainAlert.num === 4 && !animationPlaying && <YootAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
    /> }
    { mainAlert && mainAlert.type === 'throw' && mainAlert.num === 5 && !animationPlaying && <MoAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
    /> }
    {/* </Float> */}
  </group>
}