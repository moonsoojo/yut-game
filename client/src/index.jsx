import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
// import Experience from "./ExperienceBackup";
import Experience from "./Experience";
import MouseGame from "./minigames/MouseGame";
import Sandbox from "./Sandbox";
import * as THREE from "three";
import {
  CameraControls,
  KeyboardControls,
  useProgress,
  OrbitControls,
  OrthographicCamera,
} from "@react-three/drei";
import React from "react";
import { SocketManager } from "./SocketManager";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <KeyboardControls map={[{ name: "throw", keys: ["Space"] }]}>
    <SocketManager />
    <Canvas
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputEncoding: THREE.sRGBEncoding,
      }}
      // camera={{ fov: 45, near: 0.1, far: 500, position: [6, 6, 6] }}
      // pan: move about a plane
    >
      {/* <CameraControls /> */}
      <OrbitControls />

      <Experience />
      {/* <Sandbox /> */}
      {/* <MouseGame /> */}

      {/* <Perf /> */}
    </Canvas>
    {/* <Controls /> */}
  </KeyboardControls>
);
