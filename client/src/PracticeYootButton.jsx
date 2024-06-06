import React from 'react';
import initialState from '../initialState';
import { useAtom } from 'jotai';
import { yootThrowValuesAtom } from './GlobalState';
import HtmlElement from './HtmlElement';
import { roundNum } from './helpers/helpers';

export default function PracticeYootButton({ 
  position=[0,0,0], 
  rotation=[0,0,0], 
  fontSize=20,
  scale=1
}) {

  const [_yootThrowValues, setYootThrowValues] = useAtom(yootThrowValuesAtom)

  // need to have this function in both client and server
  // because their codes are uploaded in different places
  function generateForveVectors() {
    let initialYootPositions = JSON.parse(JSON.stringify(initialState.initialYootPositions))
    let initialYootRotations = JSON.parse(JSON.stringify(initialState.initialYootRotations))

    function generateRandomNumberInRange(num, plusMinus) {
      return num + Math.random() * plusMinus * (Math.random() > 0.5 ? 1 : -1);
    };

    const yootForceVectors = [];
    for (let i = 0; i < 4; i++) {
      yootForceVectors.push({
        _id: i,
        positionInHand: initialYootPositions[i],
        rotation: initialYootRotations[i],
        yImpulse: roundNum(generateRandomNumberInRange(20, 3), 5),
        torqueImpulse: {
          x: roundNum(generateRandomNumberInRange(1, 0.5), 5),
          y: roundNum(generateRandomNumberInRange(1.3, 0.7), 5), // Spins vertically through the center
          z: roundNum(generateRandomNumberInRange(0.3, 0.2), 5)// Spins through the middle axis
        },
      });
    }
    
    return yootForceVectors
  }

  function handlePracticeThrow() {
    // Only throws for the client
    setYootThrowValues(generateForveVectors())
  }

  return <HtmlElement
    text={`Practice Throw`}
    position={position}
    rotation={rotation}
    scale={scale}
    fontSize={fontSize}
    whiteSpace='normal'
    handleClick={handlePracticeThrow}
  />
}