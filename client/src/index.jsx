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
import React from "react";
import { SocketManager } from "./SocketManager";
import App from './App'

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <KeyboardControls map={[{ name: "throw", keys: ["Space"] }]}>
    <SocketManager />
    <App/>

  </KeyboardControls>
);
