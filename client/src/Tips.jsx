import { useAtom } from 'jotai';
import React from 'react';
import { clientAtom, gamePhaseAtom, selectionAtom, showTipsAtom, teamsAtom, tipsFinishedAtom, turnAtom } from './SocketManager';
import { Text3D } from '@react-three/drei';
import { getCurrentPlayerSocketId, movesIsEmpty } from './helpers/helpers';
import HelperArrow from './meshes/HelperArrow';
import TextButton from './components/TextButton';

export default function Tips() {
  const [gamePhase] = useAtom(gamePhaseAtom)
  const [turn] = useAtom(turnAtom)
  const [client] = useAtom(clientAtom)
  const [teams] = useAtom(teamsAtom)
  const [selection] = useAtom(selectionAtom)
  const [tipsFinished] = useAtom(tipsFinishedAtom)
  const [_showTips, setShowTips] = useAtom(showTipsAtom)
  // display tooltips on tiles within Tiles && check legalTiles 
  // to place it above it

  const scaleOuterWhosFirst = [3.8, 0.1, 2]
  const scaleInnerWhosFirst = [
    scaleOuterWhosFirst[0]*0.95, 
    scaleOuterWhosFirst[1]*1.1, 
    scaleOuterWhosFirst[2]*0.9
  ]
  const scaleOuterThrowButton = [2.5, 0.1, 2]
  const scaleInnerThrowButton = [
    scaleOuterThrowButton[0]*0.91, 
    scaleOuterThrowButton[1]*1.1, 
    scaleOuterThrowButton[2]*0.9
  ]
  const scaleOuterButtonWillAppear = [3.3, 0.1, 2]
  const scaleInnerButtonWillAppear = [
    scaleOuterButtonWillAppear[0]*0.93, 
    scaleOuterButtonWillAppear[1]*1.1, 
    scaleOuterButtonWillAppear[2]*0.9
  ]
  const scaleOuterSelectAPiece = [2.2, 0.1, 2]
  const scaleInnerSelectAPiece = [
    scaleOuterSelectAPiece[0]*0.93, 
    scaleOuterSelectAPiece[1]*1.1, 
    scaleOuterSelectAPiece[2]*0.9
  ]
  const scaleOuterThatsIt = [5.5, 0.1, 4]
  const scaleInnerThatsIt = [
    scaleOuterThatsIt[0]*0.96, 
    scaleOuterThatsIt[1]*1.1, 
    scaleOuterThatsIt[2]*0.95
  ]

  function WhosFirst() {
    return <group position={[-0.5,0.65,3.2]}>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3} 
        height={0.01}
        position={[-1.7,0.05,-0.4]}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        Throw the yoot
        <meshStandardMaterial color='green' />
      </Text3D>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3} 
        height={0.01}
        position={[-1.7,0.05,0.1]}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        to decide who
        <meshStandardMaterial color='green' />
      </Text3D>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3} 
        height={0.01}
        position={[-1.7,0.05,0.6]}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        goes first.
        <meshStandardMaterial color='green' />
      </Text3D>
      <mesh
        position={[0,0,0]}
        scale={scaleInnerWhosFirst}
      >
        <boxGeometry args={[1,1,1]} />
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh
        position={[0,0,0]}
        scale={scaleOuterWhosFirst}
      >
        <boxGeometry args={[1,1,1]} />
        <meshStandardMaterial color='yellow'/>
      </mesh>
    </group>
  }
  function ThrowButton() {
    return <group position={[3.2,0.65,3.2]}>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3}
        height={0.01}
        position={[-1.05,0.05,-0.4]}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        Click here
        <meshStandardMaterial color='green' />
      </Text3D>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3} 
        height={0.01}
        position={[-1.05,0.05,0.1]}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        to throw
        <meshStandardMaterial color='green' />
      </Text3D>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3} 
        height={0.01}
        position={[-1.05,0.05,0.6]}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        the dice
        <meshStandardMaterial color='green' />
      </Text3D>
      <mesh
        position={[0,0,0]}
        scale={scaleInnerThrowButton}
      >
        <boxGeometry args={[1,1,1]} />
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh
        position={[0,0,0]}
        scale={scaleOuterThrowButton}
      >
        <boxGeometry args={[1,1,1]} />
        <meshStandardMaterial color='yellow'/>
      </mesh>
      <HelperArrow
        position={[1.7, 0, 0]}
        rotation={[0, 0, -Math.PI/2]}
        color="green"
        scale={2}
      />
    </group>
  }
  function ButtonWillAppear() {
    return <group position={[6.2,0,3.2]}>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3}
        height={0.01}
        position={[-1.35,0.05,-0.4]}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        the yoot
        <meshStandardMaterial color='green' />
      </Text3D>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3} 
        height={0.01}
        position={[-1.35,0.05,0.1]}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        will appear
        <meshStandardMaterial color='green' />
      </Text3D>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3} 
        height={0.01}
        position={[-1.35,0.05,0.6]}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        on your turn
        <meshStandardMaterial color='green' />
      </Text3D>
      <mesh
        position={[0,0,0]}
        scale={scaleInnerButtonWillAppear}
      >
        <boxGeometry args={[1,1,1]} />
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh
        position={[0,0,0]}
        scale={scaleOuterButtonWillAppear}
      >
        <boxGeometry args={[1,1,1]} />
        <meshStandardMaterial color='yellow'/>
      </mesh>
    </group>
  }
  function SelectAPiece() {
    return <group position={[3.5,0.5,0.3]}>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3}
        height={0.01}
        position={[-0.9,0.05,-0.4]}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        select a
        <meshStandardMaterial color='green' />
      </Text3D>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3} 
        height={0.01}
        position={[-0.9,0.05,0.1]}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        unit to
        <meshStandardMaterial color='green' />
      </Text3D>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3} 
        height={0.01}
        position={[-0.9,0.05,0.6]}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        move
        <meshStandardMaterial color='green' />
      </Text3D>
      <mesh
        position={[0,0,0]}
        scale={scaleInnerSelectAPiece}
      >
        <boxGeometry args={[1,1,1]} />
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh
        position={[0,0,0]}
        scale={scaleOuterSelectAPiece}
      >
        <boxGeometry args={[1,1,1]} />
        <meshStandardMaterial color='yellow'/>
      </mesh>
    </group>
  }
  function handleGotIt() {
    setShowTips(false)
  }
  function handleRules() {
    // open rulebook
  }
  function ThatsIt() {
    return <group position={[0,0.6,-0.5]}>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3}
        height={0.01}
        position={[-2.4,0.05,-1.3]}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        That's it! The goal of
        <meshStandardMaterial color='green' />
      </Text3D>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3} 
        height={0.01}
        position={[-2.4,0.05,-0.8]}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        this game is to bring
        <meshStandardMaterial color='green' />
      </Text3D>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3} 
        height={0.01}
        position={[-2.4,0.05,-0.3]}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        the units around to
        <meshStandardMaterial color='green' />
      </Text3D>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3} 
        height={0.01}
        position={[-2.4,0.05,0.2]}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        Earth before the other
        <meshStandardMaterial color='green' />
      </Text3D>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3} 
        height={0.01}
        position={[-2.4,0.05,0.7]}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        team.
        <meshStandardMaterial color='green' />
      </Text3D>
      <mesh
        position={[0,0,0]}
        scale={scaleInnerThatsIt}
      >
        <boxGeometry args={[1,1,1]} />
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh
        position={[0,0,0]}
        scale={scaleOuterThatsIt}
      >
        <boxGeometry args={[1,1,1]} />
        <meshStandardMaterial color='yellow'/>
      </mesh>
      <TextButton
        text='got it!'
        position={[-1.7, 0.2, 1.5]}
        boxWidth={1.3}
        boxHeight={0.4}
        handlePointerClick={handleGotIt}
      />
      <TextButton
        text='rules'
        position={[0.4, 0.2, 1.5]}
        boxWidth={1.2}
        boxHeight={0.4}
        handlePointerClick={handleRules}
      />
    </group>
  }

  return <>
  {/* pregame */}
  { gamePhase === 'pregame' && <WhosFirst/>}
  {/* { gamePhase === 'pregame' 
  && client.id === getCurrentPlayerSocketId(turn, teams) 
  && teams[turn.team].throws > 0 
  && <ThrowButton/>} */}
  {/* { gamePhase === 'pregame' 
  && client.id !== getCurrentPlayerSocketId(turn, teams) 
  && <ButtonWillAppear/>} */}
  {/* game */}
  {/* { gamePhase === 'game' 
  && client.id === getCurrentPlayerSocketId(turn, teams) 
  && teams[turn.team].throws > 0 
  && <ThrowButton/>} */}
  { gamePhase === 'game' 
  && client.id === getCurrentPlayerSocketId(turn, teams) 
  && !movesIsEmpty(teams[turn.team].moves) 
  && selection === null 
  && <SelectAPiece/>}
  {/* { gamePhase === 'game' 
  && client.id !== getCurrentPlayerSocketId(turn, teams) 
  && <ButtonWillAppear/>} */}
  { tipsFinished
  && <ThatsIt/>}
  </>
}