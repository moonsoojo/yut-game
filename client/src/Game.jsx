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
  winnerAtom,
  clientAtom
} from "./GlobalState.jsx";
import Rocket from "./meshes/Rocket.jsx";
import Ufo from "./meshes/Ufo.jsx";
import MoveList from "./MoveList.jsx";
import PiecesOnBoard from "./PiecesOnBoard.jsx";
import ScoreButtons from "./ScoreButtons.jsx";
import RocketsWin from "./RocketsWin.jsx";
import UfosWin from "./UfosWin.jsx";
import { Text3D } from "@react-three/drei";
import { Color, MeshStandardMaterial } from "three";

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

  function LetsPlayButton({ position, rotation, fontSize }) {
    const [readyToStart] = useAtom(readyToStartAtom)
    const [client] = useAtom(clientAtom)
    const [hostName] = useAtom(hostNameAtom)

    function handleLetsPlay() {
      if (readyToStart) {
        socket.emit("startGame", { roomId: params.id })
      }
    }

    return <>
      { hostName === 'you' && gamePhase === 'lobby' && <HtmlElement 
        text={'lets play!'}
        position={position}
        rotation={rotation}
        fontSize={fontSize}
        handleClick={handleLetsPlay}
        disabled={!readyToStart}
        color={readyToStart ? 'yellow' : 'grey'}
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
  const { boardScale, boardPosition, gameScale, winScreenScale } = useSpring({
    boardScale: layout[device].board[gamePhase].scale,
    boardPosition: layout[device].board[gamePhase].position,
    gameScale: gamePhase !== 'finished' ? 1 : 1,
    winScreenScale: gamePhase === 'finished' ? 1 : 0
  })

  function InviteButton({ position }) {
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
      console.log('invite button click')
    }

    return <group position={position}>
      <mesh
        material={yellowMaterial}
      >
        <boxGeometry args={[1.5, 0.03, 0.55]}/>
      </mesh>
      <mesh>
        <boxGeometry args={[1.45, 0.04, 0.5]}/>
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
        position={[-0.61, 0.025, 0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.3}
        height={0.01}
        material={yellowMaterial}
      >
        Invite
      </Text3D>
    </group>
  }

  function DiscordButton({ position }) {
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
      console.log('discord button click')
    }

    return <group position={position}>
      <mesh
        material={yellowMaterial}
      >
        <boxGeometry args={[1.83, 0.03, 0.55]}/>
      </mesh>
      <mesh>
        <boxGeometry args={[1.77, 0.04, 0.5]}/>
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
        position={[-0.77, 0.025, 0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.3}
        height={0.01}
        material={yellowMaterial}
      >
        DISCORD
      </Text3D>
    </group>
  }

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
      { gamePhase !== 'finished' && <animated.group scale={gameScale}>
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
        <InviteButton
          position={layout[device].invite.position} 
        />
        <DiscordButton
          position={layout[device].discord.position}
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
          <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].whoGoesFirst.title.position}
          rotation={layout[device].whoGoesFirst.title.rotation}
          size={layout[device].whoGoesFirst.title.size}
          height={layout[device].whoGoesFirst.title.height}
          >
            {`Who goes first?`}
            <meshStandardMaterial color="green"/>
          </Text3D>
          <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].whoGoesFirst.description.position}
          rotation={layout[device].whoGoesFirst.description.rotation}
          size={layout[device].whoGoesFirst.description.size}
          height={layout[device].whoGoesFirst.title.height}
          lineHeight={0.8}
          >
            {`One player from each team throws\nthe yoot. The team with a higher\nnumber goes first.`}
            <meshStandardMaterial color="green"/>
          </Text3D>
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
        {/* { lastMove && <MoveAnimation 
          move={lastMove}
          initialScale={layout[device].moveAnimation.initialScale}
          initialPosition={layout[device].moveAnimation.initialPosition}
          endingPosition={layout[device].moveAnimation.endingPosition}
          fontSize={layout[device].moveAnimation.fontSize}
        /> } */}
        { gamePhase === 'game' && <MoveList
          position={layout[device].moveList.position}
          rotation={layout[device].moveList.rotation}
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
        </animated.group>
      }
      { gamePhase === 'finished' && <animated.group scale={winScreenScale}>
        { (gamePhase === 'finished' && winner === 0) && <RocketsWin/>}
        { (gamePhase === 'finished' && winner === 1) && <UfosWin/>}
      </animated.group> }
    </>
  );
}