import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";
import React from "react";
import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function Sun2({ position, tile }) {
  const shaderRef = useRef();

  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime;
    shaderRef.current.uniforms.time.value = elapsedTime;
  });

  return (
    <>
      <mesh position={position}>
        <sphereGeometry args={[0.35, 30, 30]} />
        <shaderMaterial
          ref={shaderRef}
          side={THREE.DoubleSide}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={{
            time: { value: 0 },
            resolution: { value: new THREE.Vector4() },
          }}
        />
      </mesh>
    </>
  );
}
