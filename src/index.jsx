import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import * as THREE from "three";
import { KeyboardControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <KeyboardControls map={[{ name: "throw", keys: ["Space"] }]}>
    <Canvas
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputEncoding: THREE.sRGBEncoding,
      }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [20, 40, 20] }}
    >
      <Experience />
      <Perf />
    </Canvas>
  </KeyboardControls>
);
