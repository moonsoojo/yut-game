import React, { useState, useRef, useEffect } from "react";
import { Text, Text3D, useHelper, useCamera, useGLTF } from "@react-three/drei";
import "./style.css";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

// Components
import DiceDetails from "./DiceDetails";
import GoalDetails from "./GoalDetails";
import MoveDetails from "./MoveDetails";
import ScoreDetails from "./ScoreDetails";
import Yut from "./Yut";

// State
import { useAtom } from "jotai";

export default function Controls3d({ tileRadius, numStars }) {
  const [showControls, setShowControls] = useState(false);
  const [hoverControls, setHoverControls] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [hoverRules, setHoverRules] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const [hoverGoalsText, setHoverGoalsText] = useState(false);
  const [showDice, setShowDice] = useState(false);
  const [hoverDiceText, setHoverDiceText] = useState(false);
  const [showMoves, setShowMoves] = useState(false);
  const [hoverMovesText, setHoverMovesText] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [hoverScoreText, setHoverScoreText] = useState(false);

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
      setShowRules(false);
      setShowDice(false);
      setShowMoves(false);
      setShowGoals(false);
      setShowScore(false);
    } else {
      setShowControls(false);
    }
  }

  function rulesPointerEnter() {
    setHoverRules(true);
    document.body.style.cursor = "pointer";
  }

  function rulesPointerOut() {
    setHoverRules(false);
    document.body.style.cursor = "default";
  }

  function clickRules() {
    if (showRules == false) {
      setShowControls(false);
      setShowRules(true);
    } else {
      setShowRules(false);
    }
  }

  function goalsPointerEnter() {
    setHoverGoalsText(true);
    document.body.style.cursor = "pointer";
  }

  function goalsPointerOut() {
    setHoverGoalsText(false);
    document.body.style.cursor = "default";
  }

  function clickGoals() {
    if (showGoals == false) {
      setShowGoals(true);
      setShowDice(false);
      setShowMoves(false);
      setShowScore(false);
    } else {
      setShowGoals(false);
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
      setShowScore(false);
    } else {
      setShowDice(false);
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
      setShowScore(false);
    } else {
      setShowMoves(false);
    }
  }

  function scorePointerEnter() {
    setHoverScoreText(true);
    document.body.style.cursor = "pointer";
  }

  function scorePointerOut() {
    setHoverScoreText(false);
    document.body.style.cursor = "default";
  }

  function clickScore() {
    if (showScore == false) {
      setShowMoves(false);
      setShowGoals(false);
      setShowDice(false);
      setShowScore(true);
    } else {
      setShowScore(false);
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
          <meshStandardMaterial transparent opacity={0} />
        </mesh>
        <Text3D
          font="./fonts/Luckiest Guy_Regular.json"
          castShadow={false}
          size={0.3}
          height={0.01}
          receiveShadow
        >
          CONTROLS
          <meshStandardMaterial
            color={hoverControls || showControls ? "white" : "yellow"}
          />
        </Text3D>
        {showControls && (
          <Text3D
            position={[-1.75, 1.75, 0]}
            font="./fonts/Luckiest Guy_Regular.json"
            castShadow={false}
            size={0.2}
            height={0.01}
            receiveShadow
          >
            left click and drag to look &#10; spacebar to throw the dice &#10;
            click to select a piece &#10; and place it on a star
            <meshStandardMaterial color="grey" />
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
          <meshStandardMaterial transparent opacity={0} />
        </mesh>
        <Text3D
          font="./fonts/Luckiest Guy_Regular.json"
          castShadow={false}
          size={0.3}
          height={0.01}
          receiveShadow
        >
          RULES
          <meshStandardMaterial
            color={hoverRules || showRules ? "white" : "yellow"}
          />
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
                <meshStandardMaterial transparent opacity={0} />
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
                  color={hoverGoalsText || showGoals ? "white" : "yellow"}
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
                <meshStandardMaterial transparent opacity={0} />
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
                  color={hoverDiceText || showDice ? "white" : "yellow"}
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
                <meshStandardMaterial transparent opacity={0} />
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
                  color={hoverMovesText || showMoves ? "white" : "yellow"}
                />
              </Text3D>
            </group>
            <group position={[0, -2, 0]}>
              <mesh
                position={[0.5, 0.125, 0]}
                onPointerEnter={scorePointerEnter}
                onPointerOut={scorePointerOut}
                onPointerDown={clickScore}
              >
                <boxGeometry args={[1, 0.25, 0.1]} />
                <meshStandardMaterial transparent opacity={0} />
              </mesh>
              <Text3D
                position={[0, 0, 0]}
                font="./fonts/Luckiest Guy_Regular.json"
                castShadow={false}
                size={0.25}
                height={0.01}
                receiveShadow
              >
                Score
                <meshStandardMaterial
                  color={hoverScoreText || showScore ? "white" : "yellow"}
                />
              </Text3D>
            </group>
          </>
        )}
      </group>
      {showGoals && <GoalDetails tileRadius={tileRadius} numStars={numStars} />}
      {showDice && <DiceDetails />}
      {showMoves && <MoveDetails />}
      {showScore && <ScoreDetails />}
    </group>
  );
}
