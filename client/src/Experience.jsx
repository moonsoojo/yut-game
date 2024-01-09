// js
import React, { useRef, useEffect, useState } from "react";
import { useAtom, atom } from "jotai";
import { allYutsAsleep, isMyTurn } from "./helpers/helpers.js";
import layout from "./layout.js";

// meshes
import Yuts from "./Yuts.jsx";
import Star from "./meshes/Star.jsx";
import Neptune2 from "./meshes/Neptune2.jsx";
import Earth from "./meshes/Earth.jsx";
import Mars from "./meshes/Mars.jsx";
import Saturn from "./meshes/Saturn.jsx";
import Moon from "./meshes/Moon.jsx";
import SunBagus from "./meshes/SunBagus.jsx";

// custom components
import Chatbox from "./Chatbox.jsx";
import Rulebook from "./Rulebook.jsx";
import Rulebook2 from "./Rulebook2.jsx";
import TextButton from "./components/TextButton";
import ScoreButton from "./ScoreButton.jsx";
import Piece from "./components/Piece.jsx";

// three js
import { CuboidCollider, RigidBody, Physics } from "@react-three/rapier";
import { Leva, useControls } from "leva";
import {
  Environment,
  Sky,
  ContactShadows,
  RandomizedLight,
  AccumulativeShadows,
  SoftShadows,
  Stars,
  Html,
  Text3D,
  OrthographicCamera,
  OrbitControls,
  Text
} from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
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
  clientsAtom,
} from "./SocketManager";
import JoinTeamModal from "./JoinTeamModal.jsx";

let mediaMax = 2560;
let landscapeMobileCutoff = 550;
let landscapeDesktopCutoff = 1000;

export default function Experience() {

  function initializeDevice(windowWidth, landscapeMobileCutoff, landscapeDesktopCutoff) {
    if (windowWidth < landscapeMobileCutoff) {
      return "portrait"
    } else if (windowWidth < landscapeDesktopCutoff) {
      return "landscapeMobile"
    } else {
      return "landscapeDesktop"
    }
  }

  let [device, setDevice] = useState(initializeDevice(window.innerWidth, landscapeMobileCutoff, landscapeDesktopCutoff))

  const handleResize = () => {
    if (window.innerWidth < landscapeMobileCutoff) {
      setDevice("portrait")
    } else if (window.innerWidth < landscapeDesktopCutoff) {
      setDevice("landscapeMobile")
    } else {
      setDevice("landscapeDesktop")
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  const [zoom, setZoom] = useState(50);
  const [chatFontSize, setChatFontSize] = useState(0);
  const [chatboxPadding, setChatboxPadding] = useState(0);
  const [chatboxHeight, setChatboxHeight] = useState(0);
  const [chatboxWidth, setChatboxWidth] = useState(0);
  function calcScale(minVal, maxVal, mediaMin, mediaMax, width) {
    return minVal + (maxVal - minVal) * (width - mediaMin) / (mediaMax - mediaMin)
  }
  
  const [readyToStart] = useAtom(readyToStartAtom);
  const [teams] = useAtom(teamsAtom);
  const [turn] = useAtom(turnAtom);
  const [gamePhase] = useAtom(gamePhaseAtom)
  const [legalTiles] = useAtom(legalTilesAtom);
  const [client] = useAtom(clientAtom);
  const [clients] = useAtom(clientsAtom);

  // this happens before the client connects to the server
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      socket.emit("visibilityChange", {flag: false})
    } else {
      socket.emit("visibilityChange", {flag: true})
    }
  });

  const numTiles = 29;

  const tileRefs = [...Array(numTiles)];
  for (let i = 0; i < numTiles; i++) {
    tileRefs[i] = useRef();
  }
  const camera = useRef();
  // const orbitControls = useRef();

  useEffect(() => {
    camera.current.lookAt(
      layout[device].center[0] + layout[device].camera.lookAtOffset[0], 
      layout[device].center[1] + layout[device].camera.lookAtOffset[1],  
      layout[device].center[2] + layout[device].camera.lookAtOffset[2], 
    )
    // camera.current.lookAt(-3,0,-7)
    if (device !== "portrait") {
      setZoom(calcScale(
        layout[device].camera.zoomMin,
        layout[device].camera.zoomMax,
        landscapeMobileCutoff,
        mediaMax,
        window.innerWidth
      ))
      setChatFontSize(calcScale(
        layout[device].chat.fontSizeMin,
        layout[device].chat.fontSizeMax,
        landscapeMobileCutoff,
        mediaMax,
        window.innerWidth
      ))
      setChatboxPadding(calcScale(
        layout[device].chat.paddingMin,
        layout[device].chat.paddingMax,
        landscapeMobileCutoff,
        mediaMax,
        window.innerWidth
      ))
      setChatboxHeight(calcScale(
        layout[device].chat.heightMin,
        layout[device].chat.heightMax,
        landscapeMobileCutoff,
        mediaMax,
        window.innerWidth
      ))
      setChatboxWidth(calcScale(
        layout[device].chat.widthMin,
        layout[device].chat.widthMax,
        landscapeMobileCutoff,
        mediaMax,
        window.innerWidth
      ))
    } else {
      setZoom(calcScale(
        layout[device].camera.zoomMin,
        layout[device].camera.zoomMax,
        0,
        landscapeMobileCutoff,
        window.innerWidth
      ))
      setChatFontSize(calcScale(
        layout[device].chat.fontSizeMin,
        layout[device].chat.fontSizeMax,
        0,
        landscapeMobileCutoff,
        window.innerWidth
      ))
      setChatboxPadding(calcScale(
        layout[device].chat.paddingMin,
        layout[device].chat.paddingMax,
        0,
        landscapeMobileCutoff,
        window.innerWidth
      ))
      setChatboxHeight(calcScale(
        layout[device].chat.heightMin,
        layout[device].chat.heightMax,
        0,
        landscapeMobileCutoff,
        window.innerWidth
      ))
      setChatboxWidth(calcScale(
        layout[device].chat.widthMin,
        layout[device].chat.widthMax,
        0,
        landscapeMobileCutoff,
        window.innerWidth
      ))
    }
  }, [window.innerWidth, window.innerHeight, device])

  const TILE_RADIUS = layout[device].tileRadius.ring;
  const NUM_STARS = 20;

  function Tiles() {
    let tiles = [];

    //circle
    for (let i = 0; i < NUM_STARS; i++) {
      let position = [
        -Math.cos(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
        0,
        Math.sin(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
      ];
      if (i == 0) {
        tiles.push(<Earth position={position} tile={i} key={i} device={device}/>);
      } else if (i == 5) {
        tiles.push(
          <Mars
            position={position}
            tile={i}
            key={i}
            device={device}
          />
        );
      } else if (i == 10) {
        tiles.push(<Saturn position={position} tile={i} key={i} device={device}/>);
      } else if (i == 15) {
        tiles.push(<Neptune2 position={position} tile={i} key={i} device={device}/>);
      } else {
        tiles.push(
          <Star
            position={position}
            tile={i}
            key={i}
            scale={layout[device].star.scale}
            device={device}
          />
        );
      }
    }

    //shortcuts
    const radiusShortcut1 = layout[device].tileRadius.shortcut1;
    const radiusShortcut2 = layout[device].tileRadius.shortcut2;
    for (let i = 0; i < NUM_STARS; i++) {
      let indexShortcut1;
      let indexShortcut2;
      if (i == 0) {
        indexShortcut1 = 24;
        indexShortcut2 = 23;
      } else if (i == 5) {
        indexShortcut1 = 28;
        indexShortcut2 = 27;
      } else if (i == 10) {
        indexShortcut1 = 20;
        indexShortcut2 = 21;
      } else if (i == 15) {
        indexShortcut1 = 25;
        indexShortcut2 = 26;
      }
      if (i == 0 || i == 5 || i == 10 || i == 15) {
        let position1 = [
          Math.sin(((i -5) * (Math.PI * 2)) / NUM_STARS) *
            radiusShortcut1,
          0,
          Math.cos(((i -5) * (Math.PI * 2)) / NUM_STARS) *
            radiusShortcut1,
        ]
        tiles.push(
          <Star
            position={position1}
            tile={indexShortcut1}
            key={i + 30}
            scale={layout[device].star.scale}
            device={device}
          />
        );
        let position2 = [
          Math.sin(((i -5) * (Math.PI * 2)) / NUM_STARS) *
            radiusShortcut2,
          0,
          Math.cos(((i -5) * (Math.PI * 2)) / NUM_STARS) *
            radiusShortcut2,
        ]
        tiles.push(
          <Star
            position={position2}
            tile={indexShortcut2}
            key={i + 41}
            scale={layout[device].star.scale}
            device={device}
          />
        );
      }
    }
    // center piece
    tiles.push(
      <Moon
        position={[0,0,0]}
        intensity={3}
        // scale={0.4}
        key={100}
        tile={22}
        device={device}
      />
    );
    return tiles;
  }

  // team group
  // pieces
  // moves
  // throws
  // names
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

  function prettifyMoves(moves) {
    let prettifiedMoves = ""
    for (let move in moves) {
      for (let i = 0; i < moves[move]; i++) {
        if (prettifiedMoves === "") {
          prettifiedMoves = move
        } else {
          prettifiedMoves += `, ${move}`
        }
      }
    }
    return prettifiedMoves
  }

  const newHomePiecePositions = [
    [0.5, 0, 0],
    [1.5, 0, 0],
    [0.5, 0, 1],
    [1.5, 0, 1]
  ]

  const [joinTeam, setJoinTeam] = useState(null);
  const [showJoinTeam0Button, setShowJoinTeam0Button] = useState(true)
  const [joinTeam0SubmitHover, setJoinTeam0SubmitHover] = useState(false)
  const [joinTeam0CancelHover, setJoinTeam0CancelHover] = useState(false)
  // show both buttons
  // set the team you're joining
  function handleJoinTeam0 () {
    setJoinTeam(0);
  }
  function handleJoinTeam0SubmitMouseEnter () {
    setJoinTeam0SubmitHover(true)
  }
  function handleJoinTeam0SubmitMouseLeave () {
    setJoinTeam0SubmitHover(false)
  }
  function handleJoinTeam0CancelMouseEnter () {
    setJoinTeam0CancelHover(true)
  }
  function handleJoinTeam0CancelMouseLeave () {
    setJoinTeam0CancelHover(false)
  }
  const [showJoinTeam1Button, setShowJoinTeam1Button] = useState(true)
  const [joinTeam1SubmitHover, setJoinTeam1SubmitHover] = useState(false)
  const [joinTeam1CancelHover, setJoinTeam1CancelHover] = useState(false)
  function handleJoinTeam1 () {
    setJoinTeam(1)
  }
  function handleJoinTeam1SubmitMouseEnter () {
    setJoinTeam1SubmitHover(true)
  }
  function handleJoinTeam1SubmitMouseLeave () {
    setJoinTeam1SubmitHover(false)
  }
  function handleJoinTeam1CancelMouseEnter () {
    setJoinTeam1CancelHover(true)
  }
  function handleJoinTeam1CancelMouseLeave () {
    setJoinTeam1CancelHover(false)
  }

  // pre-condition: 'client' from 'clientAtom'
  function PiecesSection() {
    if (client.team != undefined) {
      return (
        <group position={layout[device].piecesSection.position} scale={layout[device].piecesSection.scale}>
          { (gamePhase === "game" && 29 in legalTiles) ?
            <ScoreButton
              position={[0,0,0]}
              device={device}
            /> :
            teams[client.team].pieces.map((value, index) =>
              value == null ? (
                <mesh
                  position={newHomePiecePositions[index]}
                  key={index}
                >
                  <sphereGeometry args={[0.2]} />
                </mesh>
              ) : value === "scored" ? (
                <mesh
                  position={newHomePiecePositions[index]}
                  key={index}
                >
                  <sphereGeometry args={[0.2]} />
                  <meshStandardMaterial color={client.team == 0 ? "red" : "green"} />
                </mesh>
              ) : (
                <Piece
                  position={newHomePiecePositions[index]}
                  rotation={layout[device].homePieces[client.team].rotation}
                  keyName={`count${index}`}
                  tile={-1}
                  team={client.team}
                  id={value.id}
                  key={index}
                  scale={1}
                />
              )
            )
          }
          {/* moves */}
          {gamePhase === "pregame" && <>
            <TextButton
              text={`Moves:`}
              position={layout[device].moves.text}
              // size={layout[device].moves.size}
            />
            <TextButton
              text={`${prettifyMoves(teams[0].moves)}`}
              position={layout[device].moves.list}
              color="red"
              // size={layout[device].moves.size}
            />
            <TextButton
              text={`${prettifyMoves(teams[1].moves)}`}
              position={[
                layout[device].moves.list[0] + 0.5,
                layout[device].moves.list[1],
                layout[device].moves.list[2],
              ]}
              color="green"
              // size={layout[device].moves.size}
            />
          </>}
          {gamePhase !== "lobby" && 
            <>
              <TextButton
                text={`Moves:`}
                position={layout[device].moves.text}
                // size={layout[device].moves.size}
              />
              <TextButton
                text={`${prettifyMoves(teams[turn.team].moves)}`}
                position={layout[device].moves.list}
                // size={layout[device].moves.size}
              />
            </>
          }
        </group>
      )
    } else {
      return (      
        <group position={layout[device].piecesSection.position} scale={layout[device].piecesSection.scale}>
          {teams[0].pieces.map((value, index) =>
            (<mesh
              position={newHomePiecePositions[index]}
              key={index}
            >
              <boxGeometry args={[0.4, 0.4, 0.4]} />
              <meshStandardMaterial color="#505050"/>
            </mesh>))}
        </group>
      )
    }
  }

  const [showRulebook, setShowRulebook] = useState(false);
  function handleShowRulebook() {
    if (showRulebook) {
      setShowRulebook(false)
    } else {
      setShowRulebook(true)
    }
  }

  return (
    <>
      {/* <Perf/> */}
      {/* <OrbitControls/> */}
      <color args={ ['#030202']} attach="background" />
      <OrthographicCamera
        makeDefault
        zoom={zoom}
        top={200}
        bottom={-200}
        left={200}
        right={-200}
        near={0.1}
        far={2000}
        position={layout[device].camera.position}
        ref={camera}
        // lookAt={center.current.position}
      />
      {/* <Leva hidden /> */}
      <directionalLight
        position={[0, 1, 0.5]}
        intensity={3}
        // castShadow
      />
      <ambientLight intensity={ 1 } />
      <group scale={layout[device].scale}>
      { <group>
          {/* team 0 */}
          <group
            position={layout[device].team0.position}
            scale={layout[device].team0.scale}
          >
            {/* team name */}
            <TextButton
              text="Rockets"
              boxWidth={1.2}
              boxHeight={0.3}
              color="red"
            />
            {/* join button */}
            { client.team !== 0 && showJoinTeam0Button && <TextButton
              text="JOIN"
              boxWidth={0.9}
              boxHeight={0.3}
              color="yellow"
              position={layout[device].team0.join.position}
              handlePointerClick={handleJoinTeam0}
            /> }
            {/* pieces */}
            <group position={layout[device].team0.pieces.position}>
              <HomePieces team={0} scale={0.5}/>
            </group>
            {/* player ids */}
            {teams[0].players.map((value, index) => (
              <TextButton
                text={`${value.name}, ${device === "landscapeDesktop" ? 
                  `visible: ${clients[value.socketId].visibility}, 
                  yutsAsleep: ${clients[value.socketId].yutsAsleep},
                  thrown: ${clients[value.socketId].thrown}`: ''}`}
                position={[
                  layout[device].team0.names.position[0],
                  layout[device].team0.names.position[1], 
                  layout[device].team0.names.position[2] + 0.5 * (index)]}
                color={
                  turn.team == 0 && turn.players[turn.team] == index && gamePhase !== "lobby"
                    ? "white"
                    : "yellow"
                }
                key={index}
              />
            ))}
          </group>
          {/* team 1 */}
          <group
          position={layout[device].team1.position}
          scale={layout[device].team1.scale}>
            {/* team name */}
            <TextButton
              text="UFOs"
              boxWidth={1.2}
              boxHeight={0.3}
              color="turquoise"
            />
            {/* join button */}
            { client.team !== 1 && showJoinTeam1Button && <TextButton
              text="JOIN"
              boxWidth={0.9}
              boxHeight={0.3}
              color="yellow"
              position={layout[device].team1.join.position}
              handlePointerClick={handleJoinTeam1}
            />}
            {/* pieces */}
            <group position={layout[device].team1.pieces.position}>
              <HomePieces team={1} scale={0.5}/>
            </group>
            {/* player ids */}
            {teams[1].players.map((value, index) => (
              <TextButton
                text={`${value.name}, ${device === "landscapeDesktop" ? 
                  `visible: ${clients[value.socketId].visibility}, 
                  yutsAsleep: ${clients[value.socketId].yutsAsleep},
                  thrown: ${clients[value.socketId].thrown}`: ''}`}
                position={[
                  layout[device].team1.names.position[0],
                  layout[device].team1.names.position[1], 
                  layout[device].team1.names.position[2] + 0.5 * (index)]}
                color={
                  turn.team == 1 && turn.players[turn.team] == index && gamePhase !== "lobby"
                    ? "white"
                    : "yellow"
                }
                key={index}
              />
            ))}
          </group>
          {/* join modal */}
          { (joinTeam !== null) && <JoinTeamModal
            // must pass string to access key in object
            position={layout[device].joinTeamModal[joinTeam.toString()].position}
            team={joinTeam}
            setJoinTeam={setJoinTeam}
            /> }
          {/* board */}
          <group position={layout[device].center} scale={layout[device].tiles.scale}>
            <Tiles />
          </group>
          {/* yut section */}
          <group>
            {/* START GAME text */}
            {readyToStart && gamePhase === "lobby" && (
              <TextButton
                text="Start"
                position={layout[device].startBanner.position}
                size={layout[device].startBanner.fontSize}
                boxWidth={layout[device].startBanner.boxWidth}
                boxHeight={layout[device].startBanner.boxHeight}
                handlePointerClick={() => {socket.emit("startGame")}}
              />
            )}
            <TextButton
              text={`Phase: ${gamePhase}`}
              position={layout[device].gamePhase.position}
              handlePointerClick={() => socket.emit("startGame")}
              size={layout[device].gamePhase.size}
            />
            <Physics>
              <Yuts device={device}/>
            </Physics>
            {/* throw count */}
            {/* {client && isMyTurn(turn, teams, client.socketId) && teams[turn.team].throws > 0 && allYutsAsleep(clients) && ( */}
             {( <>            
                <TextButton
                  text={`Throw: ${
                    teams[turn.team].throws
                  }`}
                  position={layout[device].throwCount.position}
                  size={layout[device].throwCount.size}
                />
              </>
            )}
            {/* turn */}
            {(gamePhase === "pregame" || gamePhase === "game") && (
              <>            
                <TextButton
                  text={`TURN: ${
                    teams[turn.team].players[turn.players[turn.team]]?.name
                  }`}
                  position={layout[device].turn.position}
                  size={layout[device].turn.size}
                  color={turn.team == 0 ? "red" : "turquoise"}
                />
              </>
            )}
          </group>
          {/* pieces section */}
          <PiecesSection/>
          {/* chat section */}
          <group position={layout[device].chat.position}>
            <Chatbox
              height={`${chatboxHeight.toString()}px`}
              width={`${chatboxWidth.toString()}px`}
              padding={`${chatboxPadding.toString()}px`}
              fontSize={`${chatFontSize.toString()}px`}
              device={device}
            />
          </group>
          {/* menu */}
          <TextButton
            text={`Menu`}
            position={layout[device].menu.position}
          />
          {/* RULEBOOK */}
          { device === "portrait" && <group>
            <TextButton
              text={`Rulebook`}
              position={layout[device].rulebook.button.position}
              boxWidth={2}
              boxHeight={0.4}
              handlePointerClick={handleShowRulebook}
            />
            {/* { showRulebook && <Rulebook 
              position={layout[device].rulebook.position}
              width={rulebookWidth}
              height={rulebookHeight}
              padding={layout[device].rulebook.padding}
            />} */}
            { showRulebook  && <Rulebook2
              position={layout[device].rulebook.position}
              handleShow={handleShowRulebook}
            />}
          </group>}
        </group>}
      </group>
    </>
  );
}

