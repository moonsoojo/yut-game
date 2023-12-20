import "./style.css";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  KeyboardControls,
} from "@react-three/drei";
import React from "react";
import { SocketManager } from "./SocketManager";
import App from './App';
import { createRoot } from "react-dom/client"

createRoot(document.querySelector("#root")).render(<App/>);