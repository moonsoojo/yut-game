import React, { useRef, useState } from "react";
// import { useRocketStore } from "./state/zstore";
import { useRocketStore } from "./state/zstore2";
import { Html } from "@react-three/drei";
// import { selectionAtom, socket } from "./SocketManager";
import { useAtom } from "jotai";

export default function ScoreButton({ position }) {
  const finishPiece = useRocketStore((state) => state.finishPiece);
  const setSelection = useRocketStore((state) => state.setSelection);
  const selection = useRocketStore((state) => state.selection);
  // const [selection] = useAtom(selectionAtom);
  const [hover, setHover] = useState(false);
  const matRef = useRef();

  function handleScoreButtonClick(event) {
    event.stopPropagation();
    if (selection != null) {
      finishPiece();
      setSelection(null);
      // socket.emit("finishPiece");
    }
    // socket.emit("select", null);
  }

  function handlePointerEnter(event) {
    event.stopPropagation();
    matRef.current.color.r += 1;
    setHover(true);
    document.body.style.cursor = "pointer";
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    matRef.current.color.r -= 1;
    setHover(false);
    document.body.style.cursor = "default";
  }

  return (
    <mesh
      position={position}
      onPointerDown={(event) => handleScoreButtonClick(event)}
      onPointerEnter={(e) => handlePointerEnter(e)}
      onPointerLeave={(e) => handlePointerLeave(e)}
    >
      <sphereGeometry args={[0.2, 32, 16]} />
      <meshStandardMaterial color={"green"} ref={matRef} />
      {hover && (
        <Html position={[0, 1, -0.3]} wrapperClass="label">
          {" "}
          Select a piece to score 🏁
        </Html>
      )}
    </mesh>
  );
}
