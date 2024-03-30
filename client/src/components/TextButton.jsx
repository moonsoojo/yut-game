import React, { useState } from "react";
import { Text3D, useGLTF } from "@react-three/drei";

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
  const { nodes, materials } = useGLTF("models/square.glb");
  const scaleOuter = [0.6 * boxWidth, 0.2, 0.7 * boxHeight]
  const scaleInner = [scaleOuter[0]*0.99, scaleOuter[1]*0.9, scaleOuter[2]*0.97]

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
    <group position={position} rotation={rotation}>
      {handlePointerClick == undefined ? (
        <></>
      ) : (
        <group name='text-button-wrapper'>
          <mesh
            position={boxPosition}
            onPointerEnter={handlePointerEnter}
            onPointerOut={handlePointerOut}
            onPointerDown={handlePointerClick}
          >
            <boxGeometry args={[boxWidth, boxHeight, 0.1]} />
            <meshStandardMaterial transparent opacity={0.5} />
          </mesh>
          <group 
            name="text-button-wrapper-border"
            rotation={[Math.PI/2, 0, 0]}
            position={[
              boxPosition[0],
              boxPosition[1],
              boxPosition[2]-0.05
            ]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube001.geometry}
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={scaleOuter}
            >
              <meshStandardMaterial color={hover ? "white" : color}  />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube001.geometry}
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={scaleInner}
            >
              <meshStandardMaterial color="#000B18"/>
            </mesh>
          </group>
        </group>
      )}
      {/* must use absolute path - string starts with a slash */}
      <Text3D font="/fonts/Luckiest Guy_Regular.json" size={size} height={0.01}> 
        {text} <meshStandardMaterial color={hover ? "white" : color} />
      </Text3D>
    </group>
  );
}