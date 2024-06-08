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
  legalTilesAtom,
  tilesAtom,
  helperTilesAtom,
  winnerAtom
} from "./GlobalState.jsx";
import Rocket from "./meshes/Rocket.jsx";
import Ufo from "./meshes/Ufo.jsx";
import BoomText from "./BoomText.jsx";
import MoveList from "./MoveList.jsx";
import PiecesOnBoard from "./PiecesOnBoard.jsx";
import ScoreButtons from "./ScoreButtons.jsx";
import RocketsWin from "./RocketsWin.jsx";
import UfosWin from "./UfosWin.jsx";

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
  // To pass to Board
  const [legalTiles] = useAtom(legalTilesAtom)
  const [helperTiles] = useAtom(helperTilesAtom)
  const [tiles] = useAtom(tilesAtom)
  const [winner] = useAtom(winnerAtom)
  const params = useParams();

  useEffect(() => {
    socket.emit('joinRoom', { roomId: params.id })
  }, [])

  function LetsPlayButton({ position, rotation, fontSize, device }) {
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
        fontSize={fontSize}
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

  function CurrentPlayer({ position, rotation, fontSize, width, pieceScale }) {
    const [teams] = useAtom(teamsAtom)

    // If player disconnects, and there's no player remaining in the team,
    // don't display a name
    const player = teams[turn.team].players[turn.players[turn.team]]
    const name = player ? player.name : ''

    return <group position={position} rotation={rotation}>
      { turn.team === 0 && <Rocket
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={pieceScale}
        animation={null}
      />}
      { turn.team === 1 && <Ufo
        position={[0, 0, 0.2]}
        rotation={[0, 0, 0]}
        scale={pieceScale}
        animation={null}
      />}
      <HtmlElement
        text={`${name}`}
        position={[0.6, 0, -0.2]}
        rotation={[-Math.PI/2,0,0]}
        fontSize={fontSize}
        color='yellow'
        width={width}
        whiteSpace="nowrap"
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
    boardScale: layout[device].board[gamePhase].scale,
    boardPosition: layout[device].board[gamePhase].position
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
      { (gamePhase === 'lobby' || gamePhase === 'pregame' || gamePhase === 'game') && <group>
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
          fontSize={layout[device].letsPlayButton.fontSize}
          device={device}
        />
        <Host
          position={layout[device].hostName.position}
          rotation={layout[device].hostName.rotation}
        />
        <animated.group position={boardPosition} scale={boardScale}>
          <Board 
            position={[0,0,0]}
            rotation={[0,0,0]}
            scale={1}
            // scale={0.6}
            tiles={tiles}
            legalTiles={legalTiles}
            helperTiles={helperTiles}
            interactive={true}
            showStart={true}
            device={device}
          />
        </animated.group>
        {/* Who Goes First components */}
        { gamePhase === "pregame" && <group>
          <HtmlElement
            text={`Who goes first?`}
            position={layout[device].whoGoesFirst.title.position}
            rotation={layout[device].whoGoesFirst.title.rotation}
            fontSize={layout[device].whoGoesFirst.title.fontSize}
          />
          <HtmlElement
            text={`One player from each team throws the yoot.
            The team with a higher number goes first.`}
            position={layout[device].whoGoesFirst.description.position}
            rotation={layout[device].whoGoesFirst.description.rotation}
            fontSize={layout[device].whoGoesFirst.description.fontSize}
            width={layout[device].whoGoesFirst.description.width}
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
        <PiecesOnBoard/>
        {/* Conditionally render to activate animation on state change */}
        { lastMove && <MoveAnimation 
          move={lastMove}
          initialScale={layout[device].moveAnimation.initialScale}
          initialPosition={layout[device].moveAnimation.initialPosition}
          endingPosition={layout[device].moveAnimation.endingPosition}
          fontSize={layout[device].moveAnimation.fontSize}
        /> }
        { gamePhase === 'game' && <MoveList
          position={layout[device].moveList.position}
          rotation={layout[device].moveList.rotation}
          fontSize={layout[device].moveList.fontSize}
          width={layout[device].moveList.width}
        /> }
        { (gamePhase === "pregame" || gamePhase === "game") && <CurrentPlayer 
          position={layout[device].currentPlayer.position} 
          rotation={layout[device].currentPlayer.rotation}
          fontSize={layout[device].currentPlayer.fontSize}
        /> }
        { (29 in legalTiles) && <ScoreButtons
          position={[4.5, 0, 3.5]}
          legalTiles={legalTiles}
        /> }
        </group>
      }
      { (gamePhase === 'finished' && winner === 0) && <RocketsWin/>}
      { (gamePhase === 'finished' && winner === 1) && <UfosWin/>}
    </>
  );
}