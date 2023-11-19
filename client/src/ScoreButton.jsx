import React, { useRef, useState } from "react";
// import { useRocketStore } from "./state/zstore";
// import { useRocketStore } from "./state/zstore2";
import { Text3D } from "@react-three/drei";
import { selectionAtom, legalTilesAtom, displayScoreOptionsAtom, socket } from "./SocketManager";
import { useAtom } from "jotai";
import Pointer from "./meshes/Pointer";
import TextButton from "./components/TextButton";

const SCORE_TILE = 29
export default function ScoreButton({ position, rotation }) {
  const [selection] = useAtom(selectionAtom);
  const [hoverScoreText, setHoverScoreText] = useState(false);
  const [legalTiles, setLegalTiles] = useAtom(legalTilesAtom)
  const [displayScoreOptions, setDisplayScoreOptions] = useAtom(displayScoreOptionsAtom)

  function scorePointerEnter() {
    setHoverScoreText(true);
    document.body.style.cursor = "pointer";
  }

  function scorePointerOut() {
    setHoverScoreText(false);
    document.body.style.cursor = "default";
  }

  function clickScore(event) {
    event.stopPropagation();
    if (selection != null) {
      // precondition: legalTiles is already populated
      if (29 in legalTiles) {
        if (legalTiles[29].length == 1) {
          socket.emit("score", { selection, moveInfo: legalTiles[29][0] })
          socket.emit("select", null);
          socket.emit("legalTiles", { legalTiles: {} })
        } else {
          setDisplayScoreOptions(true);
        }
      }
    }
  }

  function Move({moveInfo, position}) {
    return <TextButton
      text={moveInfo.move}
      position={position}
      handlePointerClick={() => {
        socket.emit("score", {selection, moveInfo});
        socket.emit("select", null)
        socket.emit("legalTiles", { legalTiles: {} });
        setDisplayScoreOptions(false);
      }}
      boxWidth={0.2}
      boxHeight={0.3}
    />
  }

  return (
    <group position={position} rotation={rotation}>
      { selection != null && 29 in legalTiles && <Pointer color={selection.pieces[0].team == 0 ? "red" : "turquoise"}/>}
      <mesh
        position={[0.5, 0.125, 0]}
        onPointerEnter={scorePointerEnter}
        onPointerOut={scorePointerOut}
        onPointerDown={(e) => clickScore(e)}
      >
        <boxGeometry args={[1, 0.25, 0.1]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
      <Text3D font="./fonts/Luckiest Guy_Regular.json" size={0.3} height={0.01}>
        Score
        <meshStandardMaterial color={hoverScoreText ? "white" : "yellow"} />
      </Text3D>
      { displayScoreOptions && legalTiles[29].map( (value, index) => ( // must use parentheses instead of brackets
        <Move moveInfo={value} position={[index * 0.5,-0.5,0]} key={index}/>
      ))}
    </group>
  );
}
