// js
import React, { useRef, useEffect, useState } from "react";
import { useAtom, atom } from "jotai";
import layout from "./layout.js";

// meshes
import Yoots from "./Yoots.jsx";
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
import {
  teamsAtom,
  turnAtom,
  socket,
  legalTilesAtom,
  clientAtom,
  displayDisconnectAtom,
  winnerAtom,
  hostNameAtom,
  roomIdAtom,
  particleSettingAtom,
} from "./SocketManager";
import JoinTeamModal from "./JoinTeamModal.jsx";
import { getCurrentPlayerSocketId } from "./helpers/helpers.js";
import UfosWin from "./UfosWin.jsx";
import RocketsWin from "./RocketsWin.jsx";
import Celebration from "./particles/MeteorsBackup.jsx";
import { Perf } from "r3f-perf";
import CurvedArrow from "./meshes/CurvedArrow.jsx";
import LetsPlayButton from "./LetsPlayButton.jsx";
import Meteors from "./particles/MeteorsBackup.jsx";
import HtmlElement from "./HtmlElement.jsx";
import MilkyWay from "./shader/MilkyWay.jsx";
import BoomText from "./BoomText.jsx";
import { joinTeamAtom } from "./GlobalState.jsx";
import DecideOrderTooltip from "./DecideOrderTooltip.jsx";
import Team0 from "./Team0.jsx";
import Team1 from "./Team1.jsx";
import { useParams } from "wouter";
import Team from "./Team.jsx";
import GameCamera from "./GameCamera.jsx";
import { disconnectAtom, gamePhaseAtom } from "./GlobalState.jsx";
import mediaValues from "./mediaValues.js";
import DisconnectModal from "./DisconnectModal.jsx";
import { readyToStartAtom } from "./GlobalState.jsx";


// There should be no state
// All components should have the state that it needs
// Tile components should be the parent of all types of tiles (such as Earth or Mars)
// Piece component should be the parent of all types of pieces
// Receive device state individually in components

export default function Game() {
  const params = useParams();
  const [disconnect] = useAtom(disconnectAtom)
  const [gamePhase] = useAtom(gamePhaseAtom);

  // Responsive UI
  const [device, setDevice] = useState(initializeDevice(window.innerWidth, mediaValues.landscapeCutoff))
  const handleResize = () => {
    if (window.innerWidth < mediaValues.landscapeCutoff) {
      setDevice("portrait")
    } else {
      setDevice("landscapeDesktop")
    }
  }
  function initializeDevice(windowWidth, landscapeCutoff) {
    if (windowWidth < landscapeCutoff) {
      return "portrait"
    } else {
      return "landscapeDesktop"
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, [window.innerWidth]);

  useEffect(() => {
    console.log('[Game][useEffect]')
    socket.emit('joinRoom', { roomId: params.id }, () => {
      console.log(`[Game][joinRoom] joined room`)
    })
  }, [])

  function LetsPlayButton() {
    const [readyToStart] = useAtom(readyToStartAtom)
    const [gamePhase] = useAtom(gamePhaseAtom)

    function handleLetsPlay() {
      socket.emit("startGame")
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

  function Host() {
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
      {/* join modal */}
      <JoinTeamModal device={device}/>
      {/* { gamePhase === "pregame" && <DecideOrderTooltip
        position={layout[device].tooltip.whoFirst.position}
        rotation={[-Math.PI/2, 0, 0]}
      />} */}
      {/* chat section */}
      { !disconnect && <Chatbox device={device}/> }
      { disconnect && <DisconnectModal
        position={layout[device].disconnectModal.position}
        rotation={layout[device].disconnectModal.rotation}
      /> }
      <LetsPlayButton/>
      <Host/>
    </>
  );
}