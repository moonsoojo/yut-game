import { useEffect, useRef, useState } from "react";
import { RigidBody, Physics, vec3, useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useKeyboardControls, Text3D } from "@react-three/drei";
import * as THREE from "three";
import React from "react";
import {
  yutThrowValuesAtom,
  throwVisibleFlagAtom,
  socket,
} from "./SocketManager";
import { useAtom } from "jotai";
import layout from "./layout";
import TextButton from "./components/TextButton";

THREE.ColorManagement.legacyMode = false;

const positionsInitial = [
  [2, 1, 0],
  [2, 2, 0],
  [2, 3, 0],
  [2, 4, 0],
];

export default function YutsNew3({ device = "mobile", ...props }) {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const nodes = useGLTF("/models/yut-regular.glb").nodes;
  const materials = useGLTF("/models/yut-regular.glb").materials;
  const nodesRhino = useGLTF("/models/yut-rhino.glb").nodes;
  const materialsRhino = useGLTF("/models/yut-rhino.glb").materials;
  const [yutThrowValues] = useAtom(yutThrowValuesAtom);
  const [sleepCount, setSleepCount] = useState(0);
  const [throwVisible] = useAtom(throwVisibleFlagAtom);
  const [_throwVisibleLocal, setThrowVisibleLocal] = useState(false); // debug
  const [_hoverThrowText, setHoverThrowText] = useState(false);

  useEffect(() => {
    subscribeKeys(
      (state) => state.throw,
      (value) => {
        if (value) {
          socket.emit("throwVisibleFlag", false);
          socket.emit("throwYuts");
        }
      }
    );
  }, []);

  useEffect(() => {
    for (let i = 0; i < 4; i++) {
      console.log("yut throw values", i);
      yuts[i].current.setTranslation(yutThrowValues[i].positionInHand);
      yuts[i].current.setRotation(yutThrowValues[i].rotation, true);
      yuts[i].current.applyImpulse({
        x: 0,
        y: yutThrowValues[i].yImpulse,
        z: 0,
      });
      yuts[i].current.applyTorqueImpulse({
        x: yutThrowValues[i].torqueImpulse.x,
        y: yutThrowValues[i].torqueImpulse.y,
        z: yutThrowValues[i].torqueImpulse.z,
      });
    }
  }, [yutThrowValues]);

  useEffect(() => {
    if (sleepCount % 4 == 0 && sleepCount > 0) {
      socket.emit("throwVisibleFlag", true);
    }
  }, [sleepCount]);

  useEffect(() => {
    setThrowVisibleLocal(throwVisible);
    setHoverThrowText(false);
  }, [throwVisible]);

  const yut = useRef();
  const yut2 = useRef();
  const yut3 = useRef();
  const yut4 = useRef();
  const yuts = [yut, yut2, yut3, yut4];

  function onSleepHandler() {
    setSleepCount((count) => count + 1);
  }

  return (
    <group {...props} dispose={null}>
      {throwVisible && (
        <TextButton
          text="Throw"
          rotation={layout[device].throwButton.rotation}
          position={layout[device].throwButton.position}
          handlePointerClick={() => {
            socket.emit("throwVisibleFlag", false);
            socket.emit("throwYuts");
          }}
          boxWidth={1.4}
          boxHeight={0.3}
        />
      )}

      {yuts.map((ref, index) => {
        return (
          <RigidBody
            ref={ref}
            // position={positionsInitial[index]}
            position={[0, 0, 0]}
            colliders="hull"
            restitution={0.3}
            friction={0.6}
            name={`yut${index}`}
            linearDamping={0.3}
            angularDamping={0.1} // when this value is high, yuts spinned more
            scale={0.15}
            gravityScale={1.5}
            key={index}
            onSleep={onSleepHandler}
          >
            {index != 0 ? (
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube001.geometry}
                material={materials["Material.002"]}
                position={[0, 0, -4.19]}
              />
            ) : (
              <mesh
                castShadow
                receiveShadow
                geometry={nodesRhino.Cube002.geometry}
                material={materialsRhino["Material.001"]}
              />
            )}
          </RigidBody>
        );
      })}
    </group>
  );
}

// useGLTF.preload("/models/yut-regular.glb");
// useGLTF.preload("/models/yut-backdo.glb");
