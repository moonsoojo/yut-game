import { useEffect, useRef, useState } from "react";
import { RigidBody, Physics, vec3, useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useKeyboardControls, Text3D } from "@react-three/drei";
import * as THREE from "three";
import React from "react";
import { yutThrowValuesAtom, throwVisibleAtom, socket } from "./SocketManager";
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
  const nodes = useGLTF("/models/yut.glb").nodes;
  const materials = useGLTF("/models/yut.glb").materials;
  const nodesRhino = useGLTF("/models/yut-rhino.glb").nodes;
  const materialsRhino = useGLTF("/models/yut-rhino.glb").materials;
  const [yutThrowValues] = useAtom(yutThrowValuesAtom);
  const [sleepCount, setSleepCount] = useState(0);
  const [throwVisible] = useAtom(throwVisibleAtom);
  const [_throwVisibleLocal, setThrowVisibleLocal] = useState(false); // debug
  const [_hoverThrowText, setHoverThrowText] = useState(false);

  useEffect(() => {
    subscribeKeys(
      (state) => state.throw,
      (value) => {
        if (value) {
          socket.emit("throwVisible", false);
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
    console.log("[useEffect] sleepCount", sleepCount);
    if (sleepCount % 4 == 0 && sleepCount > 0) {
      socket.emit("clientYutsResting");
    }
  }, [sleepCount]);

  useEffect(() => {
    setThrowVisibleLocal(throwVisible); // subscribing to change
    setHoverThrowText(false);
  }, [throwVisible]);

  const NUM_YUTS = 4;
  let yuts = [];
  for (let i = 0; i < NUM_YUTS; i++) {
    yuts.push(useRef());
  }

  function onSleepHandler() {
    setSleepCount((count) => count + 1);
    console.log("[onSleepHandler]", sleepCount);
  }

  return (
    <group {...props} dispose={null}>
      {throwVisible && (
        <TextButton
          text="Throw"
          rotation={layout[device].throwButton.rotation}
          position={layout[device].throwButton.position}
          handlePointerClick={() => {
            socket.emit("throwVisible", false);
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
                geometry={nodes.Cylinder007.geometry}
                material={materials["Texture wrap.005"]}
                rotation={[0, 0, -Math.PI / 2]}
                scale={[1, 3, 1]}
              />
            ) : (
              <group rotation={[0, 0, -Math.PI / 2]} scale={[1, 6.161, 1]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodesRhino.Cylinder002_1.geometry}
                  material={materialsRhino["Texture wrap.005"]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodesRhino.Cylinder002_2.geometry}
                  material={materialsRhino.Rihno}
                />
              </group>
            )}
          </RigidBody>
        );
      })}
    </group>
  );
}
