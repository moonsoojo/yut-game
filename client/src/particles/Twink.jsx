import React from "react";
import * as THREE from "three";
import { animated } from "@react-spring/three";

export default function Twink({ position, size }) {
  console.log(`[Twink] size`, size)
  const textureLoader = new THREE.TextureLoader();
  const pointsMap = textureLoader.load("textures/particles/8.png");
  const positionArray = new Float32Array(3);
  const colorArray = new Float32Array(3);
  positionArray[0] = 0
  positionArray[1] = 0
  positionArray[2] = 0
  colorArray[0] = 1
  colorArray[1] = 1
  colorArray[2] = 1
  return <animated.group position={position} scale={100}>
    <animated.points scale={50}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1}
          array={positionArray}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={1}
          array={colorArray}
          itemSize={3}
          normalized
        />
      </bufferGeometry>
      <pointsMaterial
        color="white"
        size={100}
        sizeAttenuation
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={pointsMap}
        vertexColors={true}
      />
    </animated.points>
  </animated.group>
}