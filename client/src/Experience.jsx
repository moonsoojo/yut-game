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
import Rulebook from "./Rulebook.jsx";
import TextButton from "./components/TextButton";
import ScoreButton from "./ScoreButton.jsx";
import Piece from "./components/Piece.jsx";

// three js
import { Physics } from "@react-three/rapier";
import {
  Text3D,
  OrthographicCamera
} from "@react-three/drei";

// socket manager
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
} from "./SocketManager";
import JoinTeamModal from "./JoinTeamModal.jsx";
import Tiles from "./Tiles.jsx";
import HomePieces from "./HomePieces.jsx";
import { getCurrentPlayer, prettifyMoves } from "./helpers/helpers.js";
import PiecesSection from "./PiecesSection.jsx";
import TeamDisplay from "./TeamDisplay.jsx";
import DisconnectScreen from "./DisconnectScreen.jsx";

let mediaMax = 2560;
let landscapeMobileCutoff = 550;
let landscapeDesktopCutoff = 1000;

function getDevice(windowWidth, landscapeMobileCutoff, landscapeDesktopCutoff) {
  if (windowWidth < landscapeMobileCutoff) {
    return "portrait"
  } else if (windowWidth < landscapeDesktopCutoff) {
    return "landscapeMobile"
  } else {
    return "landscapeDesktop"
  }
}
function calcScale(minVal, maxVal, mediaMin, mediaMax, width) {
  return minVal + (maxVal - minVal) * (width - mediaMin) / (mediaMax - mediaMin)
}

export default function Experience() {
  let [device, setDevice] = useState(
    getDevice(
      window.innerWidth, 
      landscapeMobileCutoff, 
      landscapeDesktopCutoff
    )
  )

  const handleResize = () => {
    console.log("[Experience] window.innerWidth", window.innerWidth)
    setDevice(
      getDevice(
        window.innerWidth, 
        landscapeMobileCutoff, 
        landscapeDesktopCutoff
      )
    )
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  // this happens before the client connects to the server
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      socket.emit("visibilityChange", {flag: false})
    } else {
      socket.emit("visibilityChange", {flag: true})
    }
  });

  
  
  const [readyToStart] = useAtom(readyToStartAtom);
  const [teams] = useAtom(teamsAtom);
  const [turn] = useAtom(turnAtom);
  const [gamePhase] = useAtom(gamePhaseAtom)
  const [client] = useAtom(clientAtom);

  const [displayDisconnect] = useAtom(displayDisconnectAtom);
  function handleDisconnectPointerDown(e) {
    e.stopPropagation()
    location.reload();
  }
  function handleDisconnectPointerUp(e) {
    e.stopPropagation()
  }

  const [zoom, setZoom] = useState(50);
  const [chatFontSize, setChatFontSize] = useState(0);
  const [chatboxPadding, setChatboxPadding] = useState(0);
  const [chatboxHeight, setChatboxHeight] = useState(0);
  const [chatboxWidth, setChatboxWidth] = useState(0);

  const camera = useRef();

  useEffect(() => {
    camera.current.lookAt(
      layout[device].center[0] + layout[device].camera.lookAtOffset[0], 
      layout[device].center[1] + layout[device].camera.lookAtOffset[1],  
      layout[device].center[2] + layout[device].camera.lookAtOffset[2], 
    )
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
    console.log('zoom', zoom)
  }, [window.innerWidth, window.innerHeight, device, zoom])

  const [joinTeam, setJoinTeam] = useState(null);
  function handleJoinTeam0 () {
    setJoinTeam(0);
  }
  function handleJoinTeam1 () {
    setJoinTeam(1)
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
      />
      <directionalLight
        position={[0, 1, 0.5]}
        intensity={3}
      />
      <ambientLight intensity={ 1 } />
      <color args={ ['#001124']} attach="background" />
      <TeamDisplay
        position={layout[device].team0.position}
        scale={layout[device].team0.scale}
        joinPosition={layout[device].team0.join.position}
        handleJoinTeam={handleJoinTeam0}
        team={0}
        pieceRotation={layout[device].homePieces[0].rotation}
        piecePosition={layout[device].team0.pieces.position}
        pieceSpace={layout[device].homePieces[0].space}
        namesPosition={layout[device].team0.names.position}
      />
      <TeamDisplay
        position={layout[device].team1.position}
        scale={layout[device].team1.scale}
        joinPosition={layout[device].team1.join.position}
        handleJoinTeam={handleJoinTeam1}
        team={1}
        pieceRotation={layout[device].homePieces[1].rotation}
        piecePosition={layout[device].team0.pieces.position}
        pieceSpace={layout[device].homePieces[1].space}
        namesPosition={layout[device].team0.names.position}
      />
      <group>
        {/* join modal */}
        { joinTeam !== null && <JoinTeamModal
          // must pass string to access key in object
          position={layout[device].joinTeamModal[joinTeam].position}
          team={joinTeam}
          setJoinTeam={setJoinTeam}
        /> }
        {/* board */}
        <Tiles 
          device={device} 
          position={layout[device].center} 
          scale={layout[device].tiles.scale}
        />
        <group name='yoot-section'>
          {/* START GAME text */}
          {readyToStart && gamePhase === "lobby" && (
            <TextButton
              text="Start"
              position={layout[device].startBanner.position}
              size={layout[device].startBanner.fontSize}
              boxWidth={layout[device].startBanner.boxWidth}
              boxHeight={layout[device].startBanner.boxHeight}
              handlePointerClick={() => { socket.emit("startGame") }}
            />
          )}
          {/* PHASE text */}
          <TextButton
            text={`Phase: ${gamePhase}`}
            position={layout[device].gamePhase.position}
            size={layout[device].gamePhase.size}
          />
          <Yoots device={device}/>
          {/* throw count */}
          <TextButton
            text={`Throw: ${teams[turn.team].throws}`}
            position={layout[device].throwCount.position}
            size={layout[device].throwCount.size}
          />
          {/* turn */}
          {gamePhase !== "lobby" && <TextButton
            text={`TURN: ${getCurrentPlayer(turn, teams).name}`}
            position={layout[device].turn.position}
            size={layout[device].turn.size}
            color={turn.team == 0 ? "red" : "turquoise"}
          />}
        </group>
        {/* pieces section */}
        <PiecesSection
          sectionPosition={layout[device].piecesSection.position}
          sectionScale={layout[device].piecesSection.scale}
          moveTextPosition={layout[device].moves.text}
          moveTextListPosition={layout[device].moves.list}
        />
        {/* chat section */}
        { !displayDisconnect && <Chatbox
          position={layout[device].chat.position}
          height={`${chatboxHeight.toString()}px`}
          width={`${chatboxWidth.toString()}px`}
          padding={`${chatboxPadding.toString()}px`}
          fontSize={`${chatFontSize.toString()}px`}
          device={device}
        /> }
        {/* menu */}
        <TextButton
          text={`Menu`}
          position={layout[device].menu.position}
        />
        {/* RULEBOOK */}
        { device === "portrait" && <group name='rulebook'>
          <TextButton
            text={`Rulebook`}
            position={layout[device].rulebook.button.position}
            boxWidth={2}
            boxHeight={0.4}
            handlePointerClick={handleShowRulebook}
          />
          { showRulebook  && <Rulebook
            position={layout[device].rulebook.position}
            handleShow={handleShowRulebook}
          /> }
        </group> }
      </group>
      { displayDisconnect && <DisconnectScreen/> }
    </>
  );
}

