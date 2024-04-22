// js
import React, { useRef, useEffect, useState } from "react";
import { useAtom, atom } from "jotai";
import layout from "./layout.js";

// meshes
import Yoots from "./Yoot.jsx";
import Star from "./meshes/Star.jsx";
import Neptune from "./meshes/Neptune.jsx";
import Earth from "./meshes/Earth.jsx";
import Mars from "./meshes/Mars.jsx";
import Saturn from "./meshes/Saturn.jsx";
import Moon from "./meshes/Moon.jsx";

// custom components
import Chatbox from "./Chatbox.jsx";
import Rulebook2 from "./Rulebook2.jsx";
import TextButton from "./components/TextButton";
import ScoreButton from "./ScoreButton.jsx";
import Piece from "./components/Piece.jsx";

// three js
import { Physics } from "@react-three/rapier";
import { Leva, useControls } from "leva";
import {
  Environment,
  Sky,
  ContactShadows,
  RandomizedLight,
  AccumulativeShadows,
  SoftShadows,
  Html,
  Text3D,
  OrthographicCamera,
  OrbitControls,
  Text,
  PresentationControls
} from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Stars from './particles/Stars'
// import { Perf } from 'r3f-perf'

// server
import { socket } from "./SocketManager";
import JoinTeamModal from "./JoinTeamModal.jsx";
import { getCurrentPlayerSocketId } from "./helpers/helpers.js";
import UfosWin from "./UfosWin.jsx";
import RocketsWin from "./RocketsWin.jsx";
import Celebration from "./particles/MeteorsBackup.jsx";
import { Perf } from "r3f-perf";
import CurvedArrow from "./meshes/CurvedArrow.jsx";
import Meteors from "./particles/MeteorsBackup.jsx";
import HtmlElement from "./HtmlElement.jsx";
import MilkyWay from "./shader/MilkyWay.jsx";
// import BoomText from "./BoomText.jsx";
import { deviceAtom, joinTeamAtom, lastMoveAtom } from "./GlobalState.jsx";
import DecideOrderTooltip from "./DecideOrderTooltip.jsx";
import { useParams } from "wouter";
import Team from "./Team.jsx";
import GameCamera from "./GameCamera.jsx";
import { disconnectAtom, gamePhaseAtom } from "./GlobalState.jsx";
import mediaValues from "./mediaValues.js";
import DisconnectModal from "./DisconnectModal.jsx";
import { readyToStartAtom, turnAtom, hostNameAtom, clientAtom } from "./GlobalState.jsx";
import Yoot from "./Yoot.jsx";
import Board from "./Board.jsx";
import MoveDisplay from "./MoveDisplay.jsx";
import MoveAnimation from "./MoveAnimation.jsx";

// There should be no state
// All components should have the state that it needs
// Tile components should be the parent of all types of tiles (such as Earth or Mars)
// Piece component should be the parent of all types of pieces
// Receive device state individually in components

export default function Game() {
  
  const [device] = useAtom(deviceAtom)
  const [disconnect] = useAtom(disconnectAtom)
  // To render the animation
  const [lastMove] = useAtom(lastMoveAtom)
  const params = useParams();

  useEffect(() => {
    console.log('[Game][useEffect]')
    socket.emit('joinRoom', { roomId: params.id }, () => {
      console.log(`[Game][joinRoom] joined room`)
    })
  }, [])

  function LetsPlayButton({ device }) {
    const [readyToStart] = useAtom(readyToStartAtom)
    const [gamePhase] = useAtom(gamePhaseAtom)

    function handleLetsPlay() {
      socket.emit("startGame", { roomId: params.id })
    }

    return <>
      { readyToStart && gamePhase === 'lobby' && <HtmlElement 
        text={'lets play!'}
        position={layout[device].letsPlayButton.position}
        rotation={layout[device].letsPlayButton.rotation}
        fontSize={layout[device].letsPlayButton.fontSize}
        handleClick={handleLetsPlay}
      /> }
    </>
  }

  function Host({ device }) {
    const [hostName] = useAtom(hostNameAtom)
    return <HtmlElement
      text={`HOST: ${hostName}`}
      position={layout[device].hostName.position}
      rotation={layout[device].hostName.rotation}
      fontSize={layout[device].hostName.fontSize}
    />
  }

  console.log(`[Game]`)
  return (<>
      {/* <Perf/> */}
      {/* <Leva hidden /> */}
      <GameCamera device={device}/>
      <Team team={0} device={device}/>
      <Team team={1} device={device}/>
      <JoinTeamModal device={device}/>
      { !disconnect && <Chatbox device={device}/> }
      { disconnect && <DisconnectModal
        position={layout[device].disconnectModal.position}
        rotation={layout[device].disconnectModal.rotation}
      /> }
      <LetsPlayButton device={device}/>
      <Host device={device}/>
      <Yoot device={device}/>
      {/* move display */}
      { lastMove && <MoveAnimation 
        move={lastMove}
        initialScale={1}
        initialPosition={[2.5, 0, -3]}
        endingPosition={[6, 0, -1]}
      /> }
      <MoveDisplay/>
      <Board scale={0.6}/>
    </>
  );
}