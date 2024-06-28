import React from 'react';
import HtmlElement from './HtmlElement';
import { useAtom } from 'jotai';
import { displayMovesAtom } from './GlobalState';
import { Text3D } from '@react-three/drei';
import BackdoToken from './moveTokens/BackdoToken';
import DoToken from './moveTokens/DoToken';
import GeToken from './moveTokens/GeToken';
import YootToken from './moveTokens/YootToken';
import MoToken from './moveTokens/MoToken';
import GulToken from './moveTokens/GulToken';
// import moveToText from './moveToText';

export default function MoveList({ position, rotation }) {
    const [moves] = useAtom(displayMovesAtom)
    const moveList = movesToArray()

    // don't display if it's 'out'
    function movesToArray() {
      const moveList = []
      for (const move in moves) {
        if (move !== 0) {
          for (let i = 0; i < moves[move]; i++) {
            moveList.push(move)
          }
        }
      }
      return moveList
    }
    
    return <group position={position} rotation={rotation}>
      <Text3D
      font="fonts/Luckiest Guy_Regular.json"
      size={0.35}
      height={0.03}>
        MOVES:
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      {
        moveList.map((value, index) => 
          <group key={index}>
            {value === '-1' && <BackdoToken position={[index*0.8-0.2,0,-1.5]} rotation={[Math.PI/2, Math.PI/2, 0]} scale={1}/>}
            {value === '1' && <DoToken position={[index*0.8-0.2,0,-1.5]} rotation={[Math.PI/2, Math.PI/2, 0]} scale={1}/>}
            {value === '2' && <GeToken position={[index*0.8-0.2,0,-1.5]} rotation={[Math.PI/2, Math.PI/2, 0]} scale={1}/>}
            {value === '3' && <GulToken position={[index*0.8-0.2,0,-1.5]} rotation={[Math.PI/2, Math.PI/2, 0]} scale={1}/>}
            {value === '4' && <YootToken position={[index*0.8-0.2,0,-1.5]} rotation={[Math.PI/2, Math.PI/2, 0]} scale={1}/>}
            {value === '5' && <MoToken position={[index*0.8-0.2,0,-1.5]} rotation={[Math.PI/2, Math.PI/2, 0]} scale={1}/>}
          </group>
        )
      }
    </group>
}