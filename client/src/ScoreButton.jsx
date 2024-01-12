import React, { useRef, useState } from "react";
// import { useRocketStore } from "./state/zstore";
// import { useRocketStore } from "./state/zstore2";
import { Text3D } from "@react-three/drei";
import { selectionAtom, legalTilesAtom, displayScoreOptionsAtom, socket } from "./SocketManager";
import { useAtom } from "jotai";
import Pointer from "./meshes/Pointer";
import TextButton from "./components/TextButton";
import layout from "./layout";

const SCORE_TILE = 29
export default function ScoreButton({ position, device='portrait' }) {
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
    // event.stopPropagation();
    if (selection != null && !displayScoreOptions) {
      // precondition: legalTiles is already populated
      if (29 in legalTiles) {
        if (legalTiles[29].length == 1) {
          socket.emit("score", { selectedMove: legalTiles[29][0] })
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
        socket.emit("score", {selectedMove: moveInfo});
        socket.emit("select", null)
        socket.emit("legalTiles", { legalTiles: {} });
        setDisplayScoreOptions(false);
      }}
      size={0.4}
      boxWidth={0.2}
      boxHeight={0.3}
    />
  }

  return (
    // <group position={position}>
    <group position={[0, 0, 0]}>
      {/* { selection != null && 29 in legalTiles && <Pointer color={selection.pieces[0].team == 0 ? "red" : "turquoise"}/>} */}
      <mesh
        position={[1, 0, 1.5]} // because box geometry scales outward
        onPointerEnter={scorePointerEnter}
        onPointerOut={scorePointerOut}
        onPointerDown={(e) => clickScore(e)}
      >
        <boxGeometry args={[3, 0.25, 5]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
      <Text3D font="/fonts/Luckiest Guy_Regular.json" size={0.5} height={0.01} rotation={layout[device].textRotation}>
        Score
        <meshStandardMaterial color={hoverScoreText ? "white" : "yellow"} />
      </Text3D>
      { displayScoreOptions && <group position={[0, 0, 0.5]}>
        <Text3D font="/fonts/Luckiest Guy_Regular.json" size={0.3} height={0.01} rotation={layout[device].textRotation}>
          Finish with
          <meshStandardMaterial color={hoverScoreText ? "white" : "yellow"} />
        </Text3D>
        {legalTiles[29].map( (value, index) => ( // must use parentheses instead of brackets
          <Move moveInfo={value} position={[index * 0.7, 0, 0.5]} key={index}/>
        ))}</group>
      }
      
    </group>
  );
}
