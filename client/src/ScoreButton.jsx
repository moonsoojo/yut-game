import React, { useRef, useState } from "react";
// import { useRocketStore } from "./state/zstore";
import { useRocketStore } from "./state/zstore2";
import { Text3D } from "@react-three/drei";
// import { selectionAtom, socket } from "./SocketManager";
import { useAtom } from "jotai";

export default function ScoreButton() {
  const finishPiece = useRocketStore((state) => state.finishPiece);
  const setSelection = useRocketStore((state) => state.setSelection);
  const selection = useRocketStore((state) => state.selection);
  // const [selection] = useAtom(selectionAtom);
  const [hover, setHover] = useState(false);
  const matRef = useRef();
  const [hoverScoreText, setHoverScoreText] = useState(false);

  function scorePointerEnter() {
    setHoverScoreText(true);
    document.body.style.cursor = "pointer";
  }

  function scorePointerOut() {
    setHoverScoreText(false);
    document.body.style.cursor = "default";
  }

  function clickScore(event) {
    //if no piece is selected, display a warning
    event.stopPropagation();
    if (selection != null) {
      finishPiece();
      setSelection(null);
      // socket.emit("finishPiece");
    }
    // socket.emit("select", null);
  }

  function handleScoreButtonClick(event) {}

  return (
    <group position={[0, -1.3, 0.5]}>
      <Text3D
        font="./fonts/Luckiest Guy_Regular.json"
        size={0.3}
        height={0.01}
        rotation={[0, Math.PI / 2, 0]}
      >
        Finish
        <meshStandardMaterial color={hoverScoreText ? "white" : "yellow"} />
      </Text3D>
      <mesh
        position={[0, 0.125, -0.6]}
        rotation={[0, Math.PI / 2, 0]}
        onPointerEnter={scorePointerEnter}
        onPointerOut={scorePointerOut}
        onPointerDown={(e) => clickScore(e)}
      >
        <boxGeometry args={[1.3, 0.25, 0.1]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}
