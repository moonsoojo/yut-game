import React, { useEffect, useState } from "react";
import Stars from "./particles/Stars";
import Tiles from "./Tiles";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import TeamDisplay from "./TeamDisplay";
import layout from "./layout";
import { OrthographicCamera, PresentationControls } from "@react-three/drei";
import Chatbox from "./Chatbox";

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

export default function Experience2() {
  const [chatFontSize, setChatFontSize] = useState(0);
  const [chatboxPadding, setChatboxPadding] = useState(0);
  const [chatboxHeight, setChatboxHeight] = useState(0);
  const [chatboxWidth, setChatboxWidth] = useState(0);
  let [device, setDevice] = useState(getDevice(
    window.innerWidth,
    landscapeMobileCutoff,
    landscapeDesktopCutoff
  ))

  const handleResize = () => {
    setDevice(getDevice(
      window.innerWidth, 
      landscapeMobileCutoff, 
      landscapeDesktopCutoff
    ))
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);
  useEffect(() => {
    if (device !== "portrait") {
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

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      socket.emit("visibilityChange", false)
    } else {
      socket.emit("visibilityChange", true)
    }
  });

  const finalPosition = new THREE.Vector3(
    0, 
    20, 
    0
  )
  const quaternion = new THREE.Quaternion(
    -0.7068038591361381,
    -0.0022189460485305397,
    -0.002217067887269042,
    0.7074026191629978, 
  );
  useFrame((state) => {
    const camera = state.camera
    camera.position.lerp(finalPosition, 0.007)
    // must disable 'orbitControls'
    camera.quaternion.slerp(quaternion, 0.007)
  })

  const [joinTeam, setJoinTeam] = useState(null);
  function handleJoinTeam0 () {
    setJoinTeam(0);
  }
  function handleJoinTeam1 () {
    setJoinTeam(1)
  }

  return <PresentationControls
      global
      polar={[-0.4, 0.2]}
      azimuth={[-1, 0.75]}
      config={{ mass: 2, tension: 400 }}
      snap={{ mass: 4, tension: 400 }}
    >
    <TeamDisplay
      position={layout[device].team0.position}
      scale={1.7}
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
      scale={1.7}
      joinPosition={layout[device].team1.join.position}
      handleJoinTeam={handleJoinTeam1}
      team={1}
      pieceRotation={layout[device].homePieces[1].rotation}
      piecePosition={layout[device].team1.pieces.position}
      pieceSpace={layout[device].homePieces[1].space}
      namesPosition={layout[device].team1.names.position}
    />
    <Tiles device={device} position={[0, 0, 0]} scale={1}/>
    <Stars/>
    <Chatbox
      position={layout[device].chat.position}
      height={`${chatboxHeight.toString()}px`}
      width={`${chatboxWidth.toString()}px`}
      padding={`${chatboxPadding.toString()}px`}
      fontSize={`${chatFontSize.toString()}px`}
      device={device}
    />
  </PresentationControls>
}