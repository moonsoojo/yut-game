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
  readyToStartAtom,
  teamsAtom,
  turnAtom,
  gamePhaseAtom,
  socket,
  legalTilesAtom,
  clientAtom,
  disconnectAtom,
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
import DisconnectModal from "./DisconnectModal.jsx";
import TipsModal from "./TipsModal.jsx";
import HtmlElement from "./HtmlElement.jsx";
import MilkyWay from "./shader/MilkyWay.jsx";
import BoomText from "./BoomText.jsx";
import Game from "./Game.jsx";
import Guide from "./Guide.jsx";
import mediaValues from "./mediaValues";
import { askTipsAtom, tipsAtom } from "./GlobalState.jsx";

function calcZoom() {
  if (window.innerWidth < mediaValues.landscapeCutoff) {
    const zoomMax = 50;
    const newZoom = zoomMax * (window.innerWidth / mediaValues.landscapeCutoff)
    return newZoom
  } else {
    const zoomMin = 30;
    const newZoom = window.innerWidth * (zoomMin / mediaValues.landscapeCutoff)
    return newZoom
  }
}

export default function Experience({ device }) {

  // const [zoom, setZoom] = useState(11); // doesn't change 
  const [zoom, setZoom] = useState(calcZoom());

  function handleResize() {
    console.log('handle resize');
    setZoom(calcZoom())
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);
  
  const [askTips] = useAtom(askTipsAtom)
  const [tips] = useAtom(tipsAtom)

  const [disconnect] = useAtom(disconnectAtom);
  const previousDisconnect = useRef();
  const [displayDisconnect, setDisplayDisconnect] = useAtom(displayDisconnectAtom);

  const camera = useRef();
  useEffect(() => {
    console.log("[Experience] disconnect", disconnect)

    if (disconnect) {
      setDisplayDisconnect(true);
      previousDisconnect.current = disconnect;
    } else if (previousDisconnect.current == true) {
      setDisplayDisconnect(true);
    }
  }, [disconnect])

  return <group>
    <OrbitControls/>
    <OrthographicCamera
      makeDefault
      zoom={zoom}
      top={400}
      bottom={-400}
      left={400}
      right={-400}
      near={0.01}
      far={2000}
      position={layout[device].camera.position}
      ref={camera}
    />
    {/* add game */}
    { !tips && <Game device={device}/>}
    { displayDisconnect && <DisconnectModal
      position={layout[device].disconnectModal.position}
      rotation={layout[device].disconnectModal.rotation}
    />}
  </group>
}