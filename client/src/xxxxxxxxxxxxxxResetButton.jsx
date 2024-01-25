import React, { useRef, useState } from "react";
// import { useRocketStore } from "./state/zstore";
// import { useRocketStore } from "./state/zstore2";
import { Text3D } from "@react-three/drei";
import { selectionAtom, socket } from "./SocketManager";
import { useAtom } from "jotai";

export default function ResetButton({ position, rotation }) {
  const [hover, setHover] = useState(false);
  const matRef = useRef();

  function pointerEnter() {
    event.stopPropagation();
    setHover(true);
    document.body.style.cursor = "pointer";
  }

  function pointerOut() {
    event.stopPropagation();
    setHover(false);
    document.body.style.cursor = "default";
  }

  function pointerClick(event) {
    socket.emit("reset");
  }

  return (
    <group position={position} rotation={rotation}>
      <mesh
        position={[0.6, 0.15, 0]}
        onPointerEnter={(e) => pointerEnter(e)}
        onPointerOut={(e) => pointerOut(e)}
        onPointerDown={(e) => pointerClick(e)}
      >
        <boxGeometry args={[1.2, 0.3, 0.1]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
      <Text3D font="./fonts/Luckiest Guy_Regular.json" size={0.3} height={0.01}>
        Reset
        <meshStandardMaterial color={hover ? "white" : "yellow"} />
      </Text3D>
    </group>
  );
}
