import React, { useState } from "react";
import { Text3D } from "@react-three/drei";

export default function TextButton({
  position=[0,0,0],
  rotation=[0,0,0],
  handlePointerClick,
  text,
  boxWidth,
  boxHeight,
  color="yellow"
}) {
  const [hover, setHover] = useState(false);

  function handlePointerEnter() {
    setHover(true);
    document.body.style.cursor = "pointer";
  }

  function handlePointerOut() {
    setHover(false);
    document.body.style.cursor = "default";
  }

  const boxAdjustedPosition = [boxWidth / 2, boxHeight / 2, 0];

  return (
    <group position={position} rotation={rotation}>
      {handlePointerClick == undefined ? (
        <></>
      ) : (
        <mesh
          position={boxAdjustedPosition}
          onPointerEnter={handlePointerEnter}
          onPointerOut={handlePointerOut}
          onPointerDown={handlePointerClick}
        >
          <boxGeometry args={[boxWidth, boxHeight, 0.1]} />
          <meshStandardMaterial transparent opacity={0.5} />
        </mesh>
      )}
      <Text3D font="./fonts/Luckiest Guy_Regular.json" size={0.3} height={0.01}>
        {text} <meshStandardMaterial color={hover ? "white" : color} />
      </Text3D>
    </group>
  );
}
