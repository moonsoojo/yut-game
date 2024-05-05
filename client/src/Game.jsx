// js
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import layout from "./layout.js";
import { useSpring, animated } from '@react-spring/three';

// custom components
import HtmlElement from "./HtmlElement.jsx";
import Chatbox from "./Chatbox.jsx";
import Yoot from "./Yoot.jsx";
import Board from "./Board.jsx";
import MoveDisplay from "./MoveDisplay.jsx";
import MoveAnimation from "./MoveAnimation.jsx";
import PiecesSection from "./PiecesSection.jsx";
import Team from "./Team.jsx";
import GameCamera from "./GameCamera.jsx";
import DisconnectModal from "./DisconnectModal.jsx";
import JoinTeamModal from "./JoinTeamModal.jsx";

// three js
import { Leva, useControls } from "leva"
// import { Perf } from 'r3f-perf'

// server
import { socket } from "./SocketManager";
import { useParams } from "wouter";
import { 
  deviceAtom, 
  lastMoveAtom, 
  readyToStartAtom, 
  hostNameAtom, 
  disconnectAtom, 
  gamePhaseAtom, 
  turnAtom,
  teamsAtom,
  boomTextAtom,
  initialYootThrowAtom
} from "./GlobalState.jsx";
import FloorDotted from "./meshes/FloorDotted.jsx";
import Rocket from "./meshes/Rocket.jsx";
import Ufo from "./meshes/Ufo.jsx";
import BoomText from "./BoomText.jsx";
import MoveList from "./MoveList.jsx";

// There should be no state
export default function Game() {
  
  const [device] = useAtom(deviceAtom)
  const [disconnect] = useAtom(disconnectAtom)
  // To render the animation
  const [lastMove] = useAtom(lastMoveAtom)
  const [boomText] = useAtom(boomTextAtom)
  // To adjust board size
  const [gamePhase] = useAtom(gamePhaseAtom)
  const [turn] = useAtom(turnAtom)
  const params = useParams();

  useEffect(() => {
    socket.emit('joinRoom', { roomId: params.id })
  }, [])

  function LetsPlayButton({ position, rotation, device }) {
    const [readyToStart] = useAtom(readyToStartAtom)
    const [gamePhase] = useAtom(gamePhaseAtom)

    function handleLetsPlay() {
      socket.emit("startGame", { roomId: params.id })
    }

    return <>
      { readyToStart && gamePhase === 'lobby' && <HtmlElement 
        text={'lets play!'}
        position={position}
        rotation={rotation}
        fontSize={layout[device].letsPlayButton.fontSize}
        handleClick={handleLetsPlay}
      /> }
    </>
  }

  function Host({ position, rotation }) {
    const [hostName] = useAtom(hostNameAtom)
    return <HtmlElement
      text={`HOST: ${hostName}`}
      position={position}
      rotation={rotation}
      fontSize={layout[device].hostName.fontSize}
    />
  }

  function CurrentPlayer({ position, rotation }) {
    const [teams] = useAtom(teamsAtom)
    const name = teams[turn.team].players[turn.players[turn.team]].name
    return <group position={position} rotation={rotation}>
      { turn.team === 0 && <Rocket
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={0.7}
      />}
      { turn.team === 1 && <Ufo
        position={[0, 0, 0.2]}
        rotation={[0, 0, 0]}
        scale={0.7}
      />}
      <HtmlElement
        text={`${name}`}
        position={[0.5, 0, 0]}
        rotation={[-Math.PI/2,0,0]}
        fontSize={15}
        width={120}
        whiteSpace="nowrap"
        color='yellow'
        textOverflow='ellipsis'
        overflow='hidden'
      />
    </group>
  }

  function handleInvite() {

  }

  function handleDiscord() {

  }

  function handleRules() {

  }

  function handleSettings() {

  }

  // Animations
  const { boardScale, boardPosition } = useSpring({
    boardScale: gamePhase === "pregame" ? 0.2 : 1,
    boardPosition: gamePhase === "pregame" ? [4, 0, -2.9] : [0, 0, 0]
  })

  // UI prop guideline
  // Pass position, rotation and scale
  // pass device if component has another responsive attribute
    // such as HtmlElement fontsize or team display
    // children positions
  // If state is contained globally, don't pass it as a prop
    // example: <Host/> is in this component. 'device' is
    // declared at the top. don't pass it in as a prop
  return (<>
      {/* <Perf/> */}
      {/* <Leva hidden /> */}
      <GameCamera position={layout[device].camera.position}/>
      <Team 
        position={layout[device].team0.position}
        scale={layout[device].team0.scale}
        device={device}
        team={0} 
      />
      <Team 
        position={layout[device].team1.position}
        scale={layout[device].team1.scale}
        device={device}
        team={1} 
      />
      <JoinTeamModal 
        position={layout[device].joinTeamModal.position}
        rotation={layout[device].joinTeamModal.rotation}
        scale={layout[device].joinTeamModal.scale}
      />
      { !disconnect && <Chatbox 
        position={layout[device].chat.position}
        rotation={layout[device].chat.rotation}
        scale={layout[device].chat.scale}
        device={device}
      /> }
      <HtmlElement
        text={`Invite`}
        position={layout[device].invite.position} 
        rotation={layout[device].invite.rotation}
        fontSize={layout[device].invite.fontSize}
        handleClick={handleInvite}
      />
      <HtmlElement
        text={`Discord`}
        position={layout[device].discord.position} 
        rotation={layout[device].discord.rotation}
        fontSize={layout[device].discord.fontSize}
        handleClick={handleDiscord}
      />
      { disconnect && <DisconnectModal
        position={layout[device].disconnectModal.position}
        rotation={layout[device].disconnectModal.rotation}
      /> }
      <LetsPlayButton
        position={layout[device].letsPlayButton.position}
        rotation={layout[device].letsPlayButton.rotation}
        device={device}
      />
      <Host
        position={layout[device].hostName.position}
        rotation={layout[device].hostName.rotation}
      />
      { gamePhase === 'game' && <MoveList
        position={[2, 0, 3.3]}
        rotation={[-Math.PI/2, 0, 0]}
      /> }
      <animated.group position={boardPosition} scale={boardScale}>
        <Board 
          position={[0,0,0]}
          rotation={[0,0,0]}
          scale={0.6}
        />
      </animated.group>
      {/* Who Goes First components */}
      { gamePhase === "pregame" && <group>
        <HtmlElement
          text={`Who goes first?`}
          position={[-2.5, 0, -3.5]}
          rotation={[-Math.PI/2,0,0]}
          fontSize={25}
        />
        <HtmlElement
          text={`One player from each team throws the yoot.
          The team with a higher number goes first.`}
          position={[-2.5, 0, -2.5]}
          rotation={[-Math.PI/2,0,0]}
          fontSize={15}
          width={240}
          whiteSpace="normal"
          color='limegreen'
        />
      </group>}
      <Yoot device={device}/>
      <HtmlElement
        text='Settings'
        position={layout[device].settings.position}
        rotation={layout[device].settings.rotation}
        fontSize={layout[device].settings.fontSize}
        handleClick={handleSettings}
      />
      <HtmlElement
        text='Rules'
        position={layout[device].rulebookButton.position}
        rotation={layout[device].rulebookButton.rotation}
        fontSize={layout[device].rulebookButton.fontSize}
        handleClick={handleRules}
      />
      <PiecesSection 
        position={layout[device].piecesSection.position}
        device={device}
      />
      {/* Conditionally render to activate animation on state change */}
      { lastMove && <MoveAnimation 
        move={lastMove}
        initialScale={0.3}
        initialPosition={[2, 0, 3.2]}
        endingPosition={[3, 0, 3.7]}
      /> }
      { gamePhase === "game" && <MoveDisplay/> }
      { (gamePhase === "pregame" || gamePhase === "game") && <CurrentPlayer 
        position={[1.5, 0, 3.7]} 
        rotation={[0,0,0]}
      /> }
    </>
  );
}