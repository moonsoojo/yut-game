import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { animated } from "@react-spring/three";

export default function Mars({ position=[0,0,0], rotation=[0,0,0], scale=1 }) {
  const { nodes, materials } = useGLTF("models/Mars 4.glb");

  const mars = useRef();

  useFrame((state) => {
    mars.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <animated.group position={position} rotation={rotation} scale={scale}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mars.geometry}
        material={materials.Mars}
        scale={1.5}
        ref={mars}
      />
    </animated.group>
  );
}

useGLTF.preload("models/Mars 4.glb");