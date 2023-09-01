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
  const { nodes, materials, animations } = useGLTF(
    "/models/yut-physics-combined.glb"
  );
  const { actions } = useAnimations(animations, group);
  const [animation, setAnimation] = useState("");
  // useEffect(() => {
  //   actions[animation].reset();
  // });
  console.log("[YutsNew]", actions);
  // const nodesRhino = useGLTF("/models/yut-working (1).glb").nodes;
  // const materialsRhino = useGLTF("/models/yut-working (1).glb").materials;

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
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Cube009"
          castShadow
          receiveShadow
          geometry={nodes.Cube009.geometry}
          material={materials["Material.012"]}
          position={[0, 0, -115.393]}
          rotation={[2.884, 0, 0]}
        />
        <mesh
          name="Cube010"
          castShadow
          receiveShadow
          geometry={nodes.Cube010.geometry}
          material={materials["Material.013"]}
          position={[0, 1.033, -118.012]}
          rotation={[-0.653, 0.085, -0.099]}
        />
        <mesh
          name="Cube011"
          castShadow
          receiveShadow
          geometry={nodes.Cube011.geometry}
          material={materials["Material.014"]}
          position={[0, 2.453, -120.689]}
          rotation={[1.981, 0.085, -0.099]}
        />
        <mesh
          name="Cube012"
          castShadow
          receiveShadow
          geometry={nodes.Cube012.geometry}
          material={materials["Material.015"]}
          position={[0, 2.453, -122.839]}
          rotation={[-0.282, 0.01, 0.088]}
        />
      </group>
    </group>
  );
}
