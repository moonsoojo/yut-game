import React from 'react';
import HtmlElement from './HtmlElement';
import { useAtom } from 'jotai';
import { displayMovesAtom, turnAtom } from './GlobalState';
import { Text3D } from '@react-three/drei';
import BackdoToken from './moveTokens/BackdoToken';
import DoToken from './moveTokens/DoToken';
import GeToken from './moveTokens/GeToken';
import YootToken from './moveTokens/YootToken';
import MoToken from './moveTokens/MoToken';
import GulToken from './moveTokens/GulToken';
import Rocket from './meshes/Rocket';
import Ufo from './meshes/Ufo';
// import moveToText from './moveToText';

export default function MoveList({ position, rotation, tokenScale, tokenPosition }) {
    const [moves] = useAtom(displayMovesAtom)
    const [turn] = useAtom(turnAtom)
    const moveList = movesToArray()

    function movesToArray() {
      const moveList = []
      for (const move in moves) {
        if (move !== '0') {
          for (let i = 0; i < moves[move]; i++) {
            moveList.push(move)
          }
        }
      }
      return moveList
    }
    
    return <group position={position}>
      <Text3D
      font="fonts/Luckiest Guy_Regular.json"
      rotation={rotation} 
      size={0.35}
      height={0.03}>
        MOVES:
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      { turn.team === 0 && <Rocket position={[2, 0, -0.2]} scale={0.6}/>}
      { turn.team === 1 && <Ufo position={[2, 0, -0.2]} scale={0.6}/>}
      {
        moveList.map((value, index) => 
          <group key={index}>
            {value === '-1' && <BackdoToken position={[index*0.8-0.2 + tokenPosition[0], tokenPosition[1], tokenPosition[2]]} rotation={[0, Math.PI/2, 0]} scale={tokenScale}/>}
            {value === '1' && <DoToken position={[index*0.8-0.2 + tokenPosition[0], tokenPosition[1], tokenPosition[2]]} rotation={[0, Math.PI/2, 0]} scale={tokenScale}/>}
            {value === '2' && <GeToken position={[index*0.8-0.2 + tokenPosition[0], tokenPosition[1], tokenPosition[2]]} rotation={[0, Math.PI/2, 0]} scale={tokenScale}/>}
            {value === '3' && <GulToken position={[index*0.8-0.2 + tokenPosition[0], tokenPosition[1], tokenPosition[2]]} rotation={[0, Math.PI/2, 0]} scale={tokenScale}/>}
            {value === '4' && <YootToken position={[index*0.8-0.2 + tokenPosition[0], tokenPosition[1], tokenPosition[2]]} rotation={[0, Math.PI/2, 0]} scale={tokenScale}/>}
            {value === '5' && <MoToken position={[index*0.8-0.2 + tokenPosition[0], tokenPosition[1], tokenPosition[2]]} rotation={[0, Math.PI/2, 0]} scale={tokenScale}/>}
          </group>
        )
      }
    </group>
}