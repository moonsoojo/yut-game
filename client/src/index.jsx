import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  KeyboardControls,
} from "@react-three/drei";
import React from "react";
import { SocketManager } from "./SocketManager";
import App from './App'

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <KeyboardControls map={[{ name: "throw", keys: ["Space"] }]}>
    <SocketManager />
    <Canvas
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputEncoding: THREE.sRGBEncoding,
      }}>
      <App/>
    </Canvas>
  </KeyboardControls>
);
