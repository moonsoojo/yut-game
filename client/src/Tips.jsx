import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { clientAtom, gamePhaseAtom, legalTilesAtom, selectionAtom, showTipsAtom, teamsAtom, tipsFinishedAtom, turnAtom } from './SocketManager';
import { Text3D } from '@react-three/drei';
import { getCurrentPlayerSocketId, movesIsEmpty } from './helpers/helpers';
import HelperArrow from './meshes/HelperArrow';
import TextButton from './components/TextButton';
import layout from './layout';

export default function Tips({device}) {
  const [gamePhase] = useAtom(gamePhaseAtom)
  const [turn] = useAtom(turnAtom)
  const [client] = useAtom(clientAtom)
  const [teams] = useAtom(teamsAtom)
  const [selection] = useAtom(selectionAtom)
  const [tipsFinished] = useAtom(tipsFinishedAtom)
  const [_showTips, setShowTips] = useAtom(showTipsAtom)
  const [legalTiles] = useAtom(legalTilesAtom)
  // display tooltips on tiles within Tiles && check legalTiles 
  // to place it above it

  useEffect(() => {
    console.log(`[Tips] ${tipsFinished}`)
  }, [tipsFinished])

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
  const scaleOuterSelectAUnit = [2, 0.1, 1.4]
  const scaleInnerSelectAUnit = [
    scaleOuterSelectAUnit[0]*0.93, 
    scaleOuterSelectAUnit[1]*1.1, 
    scaleOuterSelectAUnit[2]*0.9
  ]
  const scaleOuterThatsIt = [5.5, 0.1, 4]
  const scaleInnerThatsIt = [
    scaleOuterThatsIt[0]*0.96, 
    scaleOuterThatsIt[1]*1.1, 
    scaleOuterThatsIt[2]*0.95
  ]
  const scaleOuterPlaceItHere = [1.8, 0.1, 1]
  const scaleInnerPlaceItHere = [
    scaleOuterPlaceItHere[0]*0.93, 
    scaleOuterPlaceItHere[1]*1.1, 
    scaleOuterPlaceItHere[2]*0.9
  ]

  function WhosFirst() {
    return <group position={layout[device].tips.whosFirst.position}>
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
  function SelectAUnit() {
    return <group position={layout[device].tips.selectAUnit.position}>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3}
        height={0.01}
        position={[-0.7,0.05,-0.1]}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        select
        <meshStandardMaterial color='green' />
      </Text3D>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3} 
        height={0.01}
        position={[-0.7,0.05, 0.4]}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        a unit
        <meshStandardMaterial color='green' />
      </Text3D>
      <mesh
        position={[0,0,0]}
        scale={scaleInnerSelectAUnit}
      >
        <boxGeometry args={[1,1,1]} />
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh
        position={[0,0,0]}
        scale={scaleOuterSelectAUnit}
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
    return <group position={layout[device].tips.thatsIt.position}>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3}
        height={0.01}
        position={[-2.4,0.05,-1.3]}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        Great job! The goal of
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
  function PlaceHere() {
    return <group position={layout[device].tips.placeHere.position} scale={2}>
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json" 
        size={layout[device].tips.placeHere.size}
        height={0.01}
        position={layout[device].tips.placeHere.line0Position}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        Click on
        <meshStandardMaterial color='green' />
      </Text3D>
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json" 
        size={layout[device].tips.placeHere.size}
        height={0.01}
        position={layout[device].tips.placeHere.line1Position}
        rotation={[-Math.PI/2, 0, 0]}
      > 
        the lit tile
        <meshStandardMaterial color='green' />
      </Text3D>
      <mesh
        position={[0,0,0]}
        scale={scaleInnerPlaceItHere}
      >
        <boxGeometry args={[1,1,1]} />
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh
        position={[0,0,0]}
        scale={scaleOuterPlaceItHere}
      >
        <boxGeometry args={[1,1,1]} />
        <meshStandardMaterial color='yellow'/>
      </mesh>
      {/* <HelperArrow
        position={[0.8, 0, 0.5]}
        rotation={[0, -Math.PI/2, -Math.PI/2]}
        color="green"
        scale={[1, 0.8, 0.8]}
      /> */}
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
  && <SelectAUnit/>}
  {/* { gamePhase === 'game' 
  && client.id !== getCurrentPlayerSocketId(turn, teams) 
  && <ButtonWillAppear/>} */}
  { tipsFinished
  && <ThatsIt/>}
  { Object.keys(legalTiles) > 0 && <PlaceHere/>}
  </>
}