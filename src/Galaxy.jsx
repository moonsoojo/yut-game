import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import React from "react";

export default function Galaxy({
  count,
  size,
  radius,
  branches,
  spin,
  randomness,
  randomnessPower,
  insideColor,
  outsideColor,
  position,
}) {
  const points = useRef();
  const galaxyRef = useRef();

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const colorInside = new THREE.Color(insideColor);
  const colorOutside = new THREE.Color(outsideColor);

  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime;
    points.current.rotation.y += delta * 0.1;
  });

  useEffect(() => {
    points.current.geometry.dispose();
    points.current.material.dispose();
  }, [
    count,
    size,
    radius,
    branches,
    spin,
    randomness,
    randomnessPower,
    colorInside,
    colorOutside,
  ]);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    let radiusNew = Math.random() * radius;
    const spinAngle = radiusNew * spin;
    const branchAngle = ((i % branches) / branches) * Math.PI * 2;

    const randomY =
      Math.pow(Math.random(), randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      randomness *
      radiusNew;
    const randomZ =
      Math.pow(Math.random(), randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      randomness *
      radiusNew;
    const randomX =
      Math.pow(Math.random(), randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      randomness *
      radiusNew;

    positions[i3] =
      Math.cos(branchAngle + spinAngle) * Math.pow(radiusNew, 3) + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] =
      Math.sin(branchAngle + spinAngle) * Math.pow(radiusNew, 3) + randomZ;

    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radiusNew / radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  return (
    <points ref={points} position={position}>
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
        size={size}
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
