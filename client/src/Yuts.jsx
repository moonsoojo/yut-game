import { useEffect, useRef, useState } from "react";
import { RigidBody, Physics, vec3 } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useKeyboardControls, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import React from "react";
import { forwardRef } from "react";

THREE.ColorManagement.legacyMode = false;

const positionsInitial = [
  [0, 1, 0],
  [0, 3, 0],
  [0, 5, 0],
  [0, 7, 0],
];

function getRandomNumberInRange(num, plusMinus) {
  return num + Math.random() * plusMinus * (Math.random() > 0.5 ? 1 : -1);
}

const rotationsInitial = [
  [
    getRandomNumberInRange(Math.PI, Math.PI),
    getRandomNumberInRange(Math.PI, Math.PI),
    getRandomNumberInRange(Math.PI, Math.PI),
  ],
  [
    getRandomNumberInRange(Math.PI, Math.PI),
    getRandomNumberInRange(Math.PI, Math.PI),
    getRandomNumberInRange(Math.PI, Math.PI),
  ],
  [
    getRandomNumberInRange(Math.PI, Math.PI),
    getRandomNumberInRange(Math.PI, Math.PI),
    getRandomNumberInRange(Math.PI, Math.PI),
  ],
  [
    getRandomNumberInRange(Math.PI, Math.PI),
    getRandomNumberInRange(Math.PI, Math.PI),
    getRandomNumberInRange(Math.PI, Math.PI),
  ],
];

export default function Yuts(props) {
  const [hover, setHover] = useState(false);
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/yut-physics-2.glb");
  const { actions } = useAnimations(animations, group);
  const [animation, setAnimation] = useState("");
  useEffect(() => {
    actions[animation].reset();
  });
  console.log("[Yuts]", actions);
  const nodesRhino = useGLTF("/models/yut-working (1).glb").nodes;
  const materialsRhino = useGLTF("/models/yut-working (1).glb").materials;

  useEffect(() => {
    subscribeKeys(
      (state) => state.throw,
      (value) => {
        if (value) {
          yutThrow();
        }
      }
    );
  }, []);

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <mesh
          name="Cube003"
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials["Material.002"]}
          position={[0, 0, -4.194]}
        />
      </group>
    </group>
  );
}
