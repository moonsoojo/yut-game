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
import TextButton from "./components/TextButton";
import layout from "./layout";

// State
import { useAtom } from "jotai";

export default function Controls3d({
  tileRadius,
  numStars,
  device = "portrait",
}) {
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
      setShowDice(false);
      setShowMoves(false);
      setShowGoals(false);
      setShowScore(false);
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
      <TextButton
        text="Controls"
        position={layout[device].controlsButton.position}
        rotation={layout[device].controlsButton.rotation}
        handlePointerClick={clickControls}
        boxWidth={1.93}
        boxHeight={0.3}
      />
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
      <group
        position={layout[device].rulesButton.position}
        rotation={layout[device].rulesButton.rotation}
      >
        <TextButton
          text="Rules"
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          handlePointerClick={clickRules}
          boxWidth={1.2}
          boxHeight={0.3}
        />
        {showRules && (
          <>
            {" "}
            <TextButton
              text="Goal"
              position={layout[device].goalButton.position}
              rotation={[0, 0, 0]}
              handlePointerClick={clickGoals}
              boxWidth={1}
              boxHeight={0.3}
            />
            <TextButton
              text="Dice (yuts)"
              position={layout[device].diceButton.position}
              rotation={[0, 0, 0]}
              handlePointerClick={clickDice}
              boxWidth={2.2}
              boxHeight={0.3}
            />
            <TextButton
              text="Moves"
              position={layout[device].movesButton.position}
              rotation={[0, 0, 0]}
              handlePointerClick={clickMoves}
              boxWidth={1.35}
              boxHeight={0.3}
            />
            <TextButton
              text="Score"
              position={layout[device].scoreDetailsButton.position}
              rotation={[0, 0, 0]}
              handlePointerClick={clickScore}
              boxWidth={1.2}
              boxHeight={0.3}
            />
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
