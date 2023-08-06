import React, { useRef } from "react";
import { useRocketStore } from "./state/zstore";

export default function ScoreButton({ position }) {
  const finishPiece = useRocketStore((state) => state.finishPiece);
  const setSelection = useRocketStore((state) => state.setSelection);
  const matRef = useRef();

  function handleScoreButtonClick(event) {
    event.stopPropagation();
    finishPiece();
    setSelection(null);
  }

  function handlePointerEnter(event) {
    event.stopPropagation();
    matRef.current.color.r += 1;
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    matRef.current.color.r -= 1;
  }

  return (
    <mesh
      position={position}
      onPointerDown={(event) => handleScoreButtonClick(event)}
      onPointerEnter={(e) => handlePointerEnter(e)}
      onPointerLeave={(e) => handlePointerLeave(e)}
    >
      <sphereGeometry args={[0.4, 32, 16]} />
      <meshStandardMaterial color={"green"} ref={matRef} />
    </mesh>
  );
}
