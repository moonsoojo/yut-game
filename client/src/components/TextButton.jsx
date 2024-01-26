import React, { useState } from "react";
import { Text3D } from "@react-three/drei";

export default function TextButton({
  position=[0,0,0],
  rotation=[-Math.PI / 2, 0, 0, "XZY"],
  handlePointerClick,
  text,
  boxWidth,
  boxHeight,
  boxPosition = [boxWidth / 2, boxHeight / 2, 0],
  color="yellow",
  size=0.3
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

  return (
    <group name='text-button' position={position} rotation={rotation}>
      {handlePointerClick === undefined ? (
        <></>
      ) : (
        <mesh
          position={boxPosition}
          onPointerEnter={handlePointerEnter}
          onPointerOut={handlePointerOut}
          onPointerDown={handlePointerClick}
        >
          <boxGeometry args={[boxWidth, boxHeight, 0.1]} />
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
      )}
      {/* must use absolute path - string starts with a slash */}
      <Text3D font="/fonts/Luckiest Guy_Regular.json" size={size} height={0.01}> 
        {text} <meshStandardMaterial color={hover ? "white" : color} />
      </Text3D>
    </group>
  );
}
