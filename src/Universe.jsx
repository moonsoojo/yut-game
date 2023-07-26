import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import React from "react";

export default function Universe({
  countStars,
  sizeStars,
  distanceMin,
  distanceMax,
  firstColorStars,
  secondColorStars,
}) {
  const points = useRef();

  const positions = new Float32Array(countStars * 3);
  const colors = new Float32Array(countStars * 3);
  const colorOne = new THREE.Color(firstColorStars);
  const colorTwo = new THREE.Color(secondColorStars);

  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime;
  });

  useEffect(() => {
    points.current.geometry.dispose();
    points.current.material.dispose();
  }, [
    countStars,
    sizeStars,
    distanceMin,
    distanceMax,
    firstColorStars,
    secondColorStars,
  ]);

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  for (let i = 0; i < countStars; i++) {
    const i3 = i * 3;

    const randomX = randomIntFromInterval(distanceMin, distanceMax);
    const randomY = randomIntFromInterval(distanceMin, distanceMax);
    const randomZ = randomIntFromInterval(distanceMin, distanceMax);

    positions[i3] = randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = randomZ;

    const mixedColor = colorOne.clone();
    mixedColor.lerp(colorTwo, Math.random());

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          normalized
        />
      </bufferGeometry>
      {/* <sphereGeometry args={[1, 48, 48]} /> */}
      <pointsMaterial
        color="white"
        size={sizeStars}
        sizeAttenuation
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        vertexColors={true}
        opacity={0.5}
      />
    </points>
  );
}
