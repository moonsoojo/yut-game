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
import TipsModal from "./TipsModal.jsx";
import HtmlElement from "./HtmlElement.jsx";
import MilkyWay from "./shader/MilkyWay.jsx";
import BoomText from "./BoomText.jsx";
import { askTipsAtom, joinTeamAtom } from "./GlobalState.jsx";
import DecideOrderTooltip from "./DecideOrderTooltip.jsx";
import Team0 from "./Team0.jsx";
import Team1 from "./Team1.jsx";
import { useParams } from "wouter";
import { deviceAtom } from "./App.jsx";

// There should be no state
// All components should have the state that it needs
// Galaxy should not stop spinning when other components update
// Team0 and Team1 components should use the same code
// Tile components should be the parent of all types of tiles (such as Earth or Mars)
// Piece component should be the parent of all types of pieces
// Receive device state individually in components

// Step 1: Refactor teams, render them with galaxy, join and leave rooms, and see if the galaxy stops spinning

export default function Game() {
  // separate everything into components
  // should not put state here unless it's being used
  // one change makes everything re-render
  const [device] = useAtom(deviceAtom)
  const [teams] = useAtom(teamsAtom);
  console.log(`[Game] teams`, teams)
  const [gamePhase] = useAtom(gamePhaseAtom)
  const params = useParams();

  useEffect(() => {
    console.log('[Game][useEffect]')
    socket.emit('joinRoom', { roomId: params.id }, () => {
      console.log(`[Game][joinRoom] joined room`)
    })
  }, [])

  function HomePieces({team, scale=1}) {
    let space = layout[device].homePieces[team].space;
    let positionStartX = 0
    let positionStartY = 0
    let positionStartZ = 0.5

    return (
      <group scale={scale}>
        {teams[team].pieces.map((value, index) =>
          value == null ? (
            <mesh
              position={[
                positionStartX + index * space,
                positionStartY,
                positionStartZ,
              ]}
              key={index}
            >
              <sphereGeometry args={[0.2]} />
            </mesh>
          ) : value === "scored" ? (
            <mesh
              position={[
                positionStartX + index * space,
                positionStartY,
                positionStartZ,
              ]}
              key={index}
            >
              <sphereGeometry args={[0.2]} />
              <meshStandardMaterial color={team == 0 ? "red" : "green"} />
            </mesh>
          ) : (
              <Piece
                position={[
                positionStartX + index * space,
                positionStartY,
                positionStartZ,
              ]}
              rotation={layout[device].homePieces[team].rotation}
              keyName={`count${index}`}
              tile={-1}
              team={team}
              id={value.id}
              key={index}
              scale={1}
            />
          )
        )}
      </group>
    );
  }

  function JoinTeam0() {
    const [client] = useAtom(clientAtom);
    const [joinTeam, setJoinTeam] = useAtom(joinTeamAtom);
    function handleJoinTeam0 () {
        setJoinTeam(0);
    }
    return client.team !== 0 && joinTeam !== 0 && <HtmlElement
        text="JOIN"
        position={layout[device].team0.join.position}
        rotation={layout[device].team0.join.rotation}
        fontSize={layout[device].team0.join.fontSize}
        handleClick={handleJoinTeam0}
    /> 
  }

  function JoinTeam1() {
    const [client] = useAtom(clientAtom);
    const [joinTeam, setJoinTeam] = useAtom(joinTeamAtom);
    function handleJoinTeam1 () {
        setJoinTeam(1);
    }
    return client.team !== 1 && joinTeam !== 1 && <HtmlElement
        text="JOIN"
        position={layout[device].team1.join.position}
        rotation={layout[device].team1.join.rotation}
        fontSize={layout[device].team1.join.fontSize}
        handleClick={handleJoinTeam1}
    /> 
  }


  console.log(`[Game]`)
  return (<>
    <group>
      {/* <Perf/> */}
      {/* <Leva hidden /> */}
      <group scale={layout[device].scale}>
      {<group>
          {/* team 0 */}
          <group
            position={layout[device].team0.position}
            scale={layout[device].team0.scale}
          >
            {/* team name */}
            <HtmlElement
              text="Rockets"
              position={layout[device].team0.title.position}
              rotation={layout[device].team0.title.rotation}
              color="red"
            />
            {/* join button */}
            <JoinTeam0/>
            {/* pieces */}
            <group position={layout[device].team0.pieces.position}>
              <HomePieces team={0} scale={0.5}/>
            </group>
            {/* player ids */}
            <Html
              position={layout[device].team0.names.position}
              rotation={layout[device].team0.names.rotation}
              transform
            >
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                position: 'absolute',
                width: `${layout[device].team0.names.divWidth}px`
              }}>
                <Team0 device={device}/>
              </div>
            </Html>
          </group>
          {/* team 1 */}
          <group
          position={layout[device].team1.position}
          scale={layout[device].team1.scale}>
            {/* team name */}
            <HtmlElement
              text="UFOs"
              position={layout[device].team1.title.position}
              rotation={layout[device].team1.title.rotation}
              color="turquoise"
            />
            {/* join button */}
            <JoinTeam1/>
            {/* pieces */}
            <group position={layout[device].team1.pieces.position}>
              <HomePieces team={1} scale={0.5}/>
            </group>
            {/* player ids */}
            <Html
              position={layout[device].team1.names.position}
              rotation={layout[device].team1.names.rotation}
              transform
            >
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                width: '200px',
                position: 'absolute',
                width: `${layout[device].team0.names.divWidth}px`,
              }}>
                <Team1 device={device}/>
              </div>
            </Html>
          </group>
          {/* join modal */}
          <JoinTeamModal
            position={layout[device].joinTeamModal.position}
            rotation={layout[device].joinTeamModal.rotation}
            scale={layout[device].joinTeamModal.scale}
          />
        </group>}
        { gamePhase === "pregame" && <DecideOrderTooltip
          position={layout[device].tooltip.whoFirst.position}
          rotation={[-Math.PI/2, 0, 0]}
        />}
      </group>
      <Stars count={7000} size={5}/>
    </group>
    <MilkyWay 
      rotation={[-Math.PI/2, 0, -35.0]} 
      position={[0, -3, 0]} 
      scale={5}
      brightness={0.5}
      colorTint1={new THREE.Vector4(0, 1, 1, 1.0)}
      colorTint2={new THREE.Vector4(0, 1, 1, 1.0)}
      colorTint3={new THREE.Vector4(0, 1, 1, 1.0)}
    />
    </>
  );
}