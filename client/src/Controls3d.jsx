import React, { useState, useRef, useEffect } from "react";
import { Text, Text3D, useHelper, useCamera, useGLTF } from "@react-three/drei";
import "./style.css";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

// Components
import DiceDetails from "./DiceDetails";
import GoalDetails from "./GoalDetails";
import MoveDetails from "./MoveDetails";
import Yut from "./Yut";

// State
import { bannerAtom } from "./Experience";
import { useAtom } from "jotai";

export default function Controls3d({ tileRadius, numStars }) {
  const [showControls, setShowControls] = useState(false);
  const [hoverControls, setHoverControls] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [hoverRules, setHoverRules] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const [hoverGoalsText, setHoverGoalsText] = useState(false);
  const [showDice, setShowDice] = useState(false);
  const [hoverDiceText, setHoverDiceText] = useState(false);
  const [showMoves, setShowMoves] = useState(true);
  const [hoverMovesText, setHoverMovesText] = useState(false);
  const [_banner, setBanner] = useAtom(bannerAtom);

  let camera = useThree((state) => state.camera);

  const controlsTextRef = useRef();

  function controlsPointerEnter() {
    // setShowControls(true);
    setHoverControls(true);
    document.body.style.cursor = "pointer";
  }

  function controlsPointerOut() {
    // setShowControls(false);
    setHoverControls(false);
    document.body.style.cursor = "default";
  }

  function clickControls() {
    if (showControls == false) {
      setShowControls(true);
    } else {
      setShowControls(false);
    }
  }

  function rulesPointerEnter() {
    // setShowControls(true);
    setHoverRules(true);
    document.body.style.cursor = "pointer";
  }

  function rulesPointerOut() {
    // setShowControls(false);
    setHoverRules(false);
    document.body.style.cursor = "default";
  }

  function clickRules() {
    if (showRules == false) {
      setShowRules(true);
    } else {
      setShowRules(false);
    }
  }

  function goalsPointerEnter() {
    // setShowControls(true);
    setHoverGoalsText(true);
    document.body.style.cursor = "pointer";
  }

  function goalsPointerOut() {
    // setShowControls(false);
    setHoverGoalsText(false);
    document.body.style.cursor = "default";
  }

  function clickGoals() {
    if (showGoals == false) {
      setShowGoals(true);
      setShowDice(false);
      setShowMoves(false);
      // setBanner("Make a circle from Earth to Earth around the solar system.");
    } else {
      setShowGoals(false);
      // setBanner("");
    }
  }

  function dicePointerEnter() {
    setHoverDiceText(true);
    document.body.style.cursor = "pointer";
  }

  function dicePointerOut() {
    setHoverDiceText(false);
    document.body.style.cursor = "default";
  }

  function clickDice() {
    if (showDice == false) {
      setShowDice(true);
      setShowGoals(false);
      setShowMoves(false);
      // setBanner("Press the spacebar!");
    } else {
      setShowDice(false);
      // setBanner("");
    }
  }

  function movesPointerEnter() {
    // setShowControls(true);
    setHoverMovesText(true);
    document.body.style.cursor = "pointer";
  }

  function movesPointerOut() {
    // setShowControls(false);
    setHoverMovesText(false);
    document.body.style.cursor = "default";
  }

  function clickMoves() {
    if (showMoves == false) {
      setShowMoves(true);
      setShowGoals(false);
      setShowDice(false);
      setBanner("You can move by throwing the dice. Press the spacebar!");
    } else {
      setShowMoves(false);
      setBanner("");
    }
  }

  return (
    <group>
      <group position={[-3, 0, -5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh
          position={[1, 0.15, 0]}
          onPointerEnter={controlsPointerEnter}
          onPointerOut={controlsPointerOut}
          onPointerDown={clickControls}
        >
          <boxGeometry args={[2, 0.3, 0.1]} />
          <meshStandardMaterial transparent opacity={0.3} />
        </mesh>
        <Text3D
          font="./fonts/Luckiest Guy_Regular.json"
          castShadow={false}
          size={0.3}
          height={0.01}
          receiveShadow
        >
          CONTROLS
          <meshStandardMaterial color={hoverControls ? "white" : "yellow"} />
        </Text3D>
        {showControls && (
          <Text3D
            position={[-1, 1.5, 0]}
            font="./fonts/Luckiest Guy_Regular.json"
            castShadow={false}
            size={0.2}
            height={0.01}
            receiveShadow
          >
            left click and drag to look &#10; spacebar to throw the dice &#10;
            click to select a piece &#10; and place it on a star
          </Text3D>
        )}
      </group>
      <group position={[-3, -0.5, -5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh
          position={[0.6, 0.2, 0]}
          onPointerEnter={rulesPointerEnter}
          onPointerOut={rulesPointerOut}
          onPointerDown={clickRules}
        >
          <boxGeometry args={[1.2, 0.4, 0.1]} />
          <meshStandardMaterial transparent opacity={0.3} />
        </mesh>
        <Text3D
          font="./fonts/Luckiest Guy_Regular.json"
          castShadow={false}
          size={0.3}
          height={0.01}
          receiveShadow
        >
          RULES
          <meshStandardMaterial color={hoverRules ? "white" : "yellow"} />
        </Text3D>
        {showRules && (
          <>
            {" "}
            <group position={[0, -0.5, 0]}>
              <mesh
                position={[0.425, 0.125, 0]}
                onPointerEnter={goalsPointerEnter}
                onPointerOut={goalsPointerOut}
                onPointerDown={clickGoals}
              >
                <boxGeometry args={[0.85, 0.25, 0.1]} />
                <meshStandardMaterial transparent opacity={0.3} />
              </mesh>
              <Text3D
                font="./fonts/Luckiest Guy_Regular.json"
                castShadow={false}
                size={0.25}
                height={0.01}
                receiveShadow
              >
                Goal
                <meshStandardMaterial
                  color={hoverGoalsText ? "white" : "yellow"}
                />
              </Text3D>
            </group>
            <group position={[0, -1, 0]}>
              <mesh
                position={[0.95, 0.125, 0]}
                onPointerEnter={dicePointerEnter}
                onPointerOut={dicePointerOut}
                onPointerDown={clickDice}
              >
                <boxGeometry args={[1.9, 0.25, 0.1]} />
                <meshStandardMaterial transparent opacity={0.3} />
              </mesh>
              <Text3D
                position={[0, 0, 0]}
                font="./fonts/Luckiest Guy_Regular.json"
                castShadow={false}
                size={0.25}
                height={0.01}
                receiveShadow
              >
                Dice (yuts)
                <meshStandardMaterial
                  color={hoverDiceText ? "white" : "yellow"}
                />
              </Text3D>
            </group>
            <group position={[0, -1.5, 0]}>
              <mesh
                position={[0.6, 0.125, 0]}
                onPointerEnter={movesPointerEnter}
                onPointerOut={movesPointerOut}
                onPointerDown={clickMoves}
              >
                <boxGeometry args={[1.2, 0.25, 0.1]} />
                <meshStandardMaterial transparent opacity={0.3} />
              </mesh>
              <Text3D
                position={[0, 0, 0]}
                font="./fonts/Luckiest Guy_Regular.json"
                castShadow={false}
                size={0.25}
                height={0.01}
                receiveShadow
              >
                Moves
                <meshStandardMaterial
                  color={hoverMovesText ? "white" : "yellow"}
                />
              </Text3D>
            </group>
            <Text3D
              position={[0, -2, 0]}
              font="./fonts/Luckiest Guy_Regular.json"
              castShadow={false}
              size={0.25}
              height={0.01}
              receiveShadow
            >
              Score
            </Text3D>
          </>
        )}
      </group>
      {showGoals && <GoalDetails tileRadius={tileRadius} numStars={numStars} />}
      {showDice && <DiceDetails />}
      {showMoves && <MoveDetails />}
    </group>
  );
}
