import React, { useRef } from "react";
// import { useRocketStore } from "./state/zstore";
import { useRocketStore } from "./state/zstore2";
import { Html } from "@react-three/drei";

export default function ScoreButton({ position }) {
  const finishPiece = useRocketStore((state) => state.finishPiece);
  const setSelection = useRocketStore((state) => state.setSelection);
  const selection = useRocketStore((state) => state.selection);
  const matRef = useRef();

  function handleScoreButtonClick(event) {
    event.stopPropagation();
    if (selection != null) {
      finishPiece();
      setSelection(null);
    }
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
      <Html position={[0, 1, 0]} wrapperClass="label">
        {" "}
        Score here 🏁
      </Html>
    </mesh>
  );
}
