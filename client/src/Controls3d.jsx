import React, { useState, useRef } from "react";
import { Text, useHelper } from "@react-three/drei";
import "./style.css";
import * as THREE from "three";

export default function Controls3d() {
  const [showControlsHelper, setShowControlsHelper] = useState(false);

  const [showGoalHelper, setShowGoalHelper] = useState(false);

  const rectAreaLight = useRef();
  const controlsTextRef = useRef();
  console.log(controlsTextRef.current?.position);
  useHelper(rectAreaLight, THREE.RectAreaLightHelper, 1);

  function displayControlsHelper(e) {
    e.preventDefault();
    console.log("displayControlsHelper");
    setShowControlsHelper(true);
  }
  function hideControlsHelper(e) {
    e.preventDefault();
    console.log("hideControlsHelper");
    setShowControlsHelper(false);
  }
  return (
    <group>
      <Text
        font="./fonts/bangers-v20-latin-regular.woff"
        position={[-8, 0, -4]}
        rotation-y={Math.PI / 2}
        fontSize={1.2}
        maxWidth={2}
        ref={controlsTextRef}
      >
        Controls
      </Text>
      <rectAreaLight ref={rectAreaLight} position={[0, 0, 5]} />
    </group>
  );
}
