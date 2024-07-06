import React from 'react';
import initialState from '../initialState';
import { useAtom } from 'jotai';
import { yootThrowValuesAtom } from './GlobalState';
import HtmlElement from './HtmlElement';
import { roundNum } from './helpers/helpers';
import Decimal from 'decimal.js';
import { Text3D } from '@react-three/drei';
import { Color, MeshStandardMaterial } from 'three';

export default function PracticeYootButton({ 
  position=[0,0,0],
  scale=1 
}) {

  const [_yootThrowValues, setYootThrowValues] = useAtom(yootThrowValuesAtom)

  // need to have this function in both client and server
  // because their codes are uploaded in different places
  function generateForveVectors() {
    let initialYootPositions = JSON.parse(JSON.stringify(initialState.initialYootPositions))
    let initialYootRotations = JSON.parse(JSON.stringify(initialState.initialYootRotations))

    function generateRandomNumberInRange(num, plusMinus) {
      let result = num + Math.random() * plusMinus * (Math.random() > 0.5 ? 1 : -1);
      return result.toFixed(5)
    };

    const yootForceVectors = [];
    for (let i = 0; i < 4; i++) {
      yootForceVectors.push({
        _id: i,
        positionInHand: initialYootPositions[i],
        rotation: initialYootRotations[i],
        yImpulse: Decimal(generateRandomNumberInRange(20, 3)),
        torqueImpulse: {
          x: Decimal(generateRandomNumberInRange(1, 0.5)),
          y: Decimal(generateRandomNumberInRange(1.3, 0.7)), // Spins vertically through the center
          z: Decimal(generateRandomNumberInRange(0.3, 0.2)) // Spins through the middle axis
        },
      });
    }
    
    return yootForceVectors
  }

  const yellowMaterial = new MeshStandardMaterial({ color: new Color('yellow')});

  function handlePointerEnter(e) {
    e.stopPropagation();
    yellowMaterial.color = new Color('green')
  }

  function handlePointerLeave(e) {
    e.stopPropagation();
    yellowMaterial.color = new Color('yellow')
  }

  function handlePointerDown(e) {
    e.stopPropagation();
    // only throws for the client
    setYootThrowValues(generateForveVectors())
  }

  return <group position={position} scale={scale}>
    <mesh
      material={yellowMaterial}
    >
      <boxGeometry args={[2.05, 0.03, 1.2]}/>
    </mesh>
    <mesh>
      <boxGeometry args={[2, 0.04, 1.15]}/>
      <meshStandardMaterial color='black'/>
    </mesh>
    <mesh 
      name='wrapper' 
      onPointerEnter={e => handlePointerEnter(e)}
      onPointerLeave={e => handlePointerLeave(e)}
      onPointerDown={e => handlePointerDown(e)}
    >
      <boxGeometry args={[1.2, 0.1, 0.6]}/>
      <meshStandardMaterial transparent opacity={0}/>
    </mesh>
    <Text3D
      font="fonts/Luckiest Guy_Regular.json"
      position={[-0.9, 0.025, -0.12]}
      rotation={[-Math.PI/2, 0, 0]}
      size={0.3}
      height={0.01}
      lineHeight={0.9}
      material={yellowMaterial}
    >
      {`practice\nthrow`}
      <meshStandardMaterial color='yellow'/>
    </Text3D>
  </group>
}