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
  const meshRef = useRef();
  const yut = useGLTF("/models/yut-physics.glb");
  const nodes = yut.nodes;
  const materials = yut.materials;
  const animations = useAnimations(yut.animations, yut.scene);
  useEffect(() => {
    // action.play();
    console.log(animations.actions.Animation);
  }, []);

  useEffect(() => {
    subscribeKeys(
      (state) => state.throw,
      (value) => {
        if (value) {
          let action = animations.actions.Animation.setLoop(
            THREE.LoopOnce
          ).reset(); //must reset after setLoop to trigger animation again
          action.play();
        }
      }
    );
  }, []);

  return (
    // <group ref={group} {...props} dispose={null}>
    //   <group name="Scene">
    //     <mesh
    //       name="Cube003"
    //       castShadow
    //       receiveShadow
    //       geometry={nodes.Cube003.geometry}
    //       material={materials["Material.002"]}
    //       position={[0, 0, -4.194]}
    //       ref={meshRef}
    //     />
    //   </group>
    // </group>
    <primitive object={yut.scene} />
  );
}
