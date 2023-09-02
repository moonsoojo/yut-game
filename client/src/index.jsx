import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
// import Experience from "./ExperienceBackup";
import Experience from "./Experience";
import MouseGame from "./minigames/MouseGame";
import * as THREE from "three";
import {
  CameraControls,
  KeyboardControls,
  useProgress,
  OrbitControls,
  OrthographicCamera,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import store from "./state/store";
import { Provider } from "react-redux";
import React from "react";
import { useLoader } from "@react-three/fiber";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import Star from "./Star";
import Controls from "./Controls";
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
      {/* <MouseGame /> */}

      {/* <Perf /> */}
    </Canvas>
    {/* <Controls /> */}
  </KeyboardControls>
);
