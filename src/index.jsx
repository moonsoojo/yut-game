import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
// import Experience from "./ExperienceBackup";
import Experience from "./Experience";
import * as THREE from "three";
import { CameraControls, KeyboardControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Galaxy from "./Galaxy";
import store from "./state/store";
import { Provider } from "react-redux";
import React from 'react';

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Provider store={store}>
    <KeyboardControls map={[{ name: "throw", keys: ["Space"] }]}>
      <Canvas
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputEncoding: THREE.sRGBEncoding,
        }}
        camera={{ fov: 45, near: 0.1, far: 200, position: [6, 7.5, -2.5] }}
        // pan: move about a plane
      >
        
        <Experience />
        {/* <Perf /> */}
      </Canvas>
    </KeyboardControls>
  </Provider>
);
