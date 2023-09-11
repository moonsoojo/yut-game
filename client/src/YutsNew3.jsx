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
  const nodesRhino = useGLTF("/models/yut-backdo.glb").nodes;
  const materialsRhino = useGLTF("/models/yut-backdo.glb").materials;
  const [yutThrowValues] = useAtom(yutThrowValuesAtom);
  const [sleepCount, setSleepCount] = useState(0);
  // const [throwVisible, setThrowVisible] = useState(false);
  const [throwVisible] = useAtom(throwVisibleFlagAtom);
  const [throwVisibleLocal, setThrowVisibleLocal] = useState(false);

  function handleThrowClick() {
    socket.emit("throwVisibleFlag", false);
    socket.emit("throwYuts");
  }

  useEffect(() => {
    subscribeKeys(
      (state) => state.throw,
      (value) => {
        if (value) {
          console.log("throw");
          socket.emit("throwVisibleFlag", false);
          socket.emit("throwYuts");
        }
      }
    );
  }, []);

  useEffect(() => {
    console.log("yut throw values use effect");
    for (let i = 0; i < 4; i++) {
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
    console.log(sleepCount);
    if (sleepCount % 4 == 0 && sleepCount > 0) {
      socket.emit("throwVisibleFlag", true);
    }
  }, [sleepCount]);

  useEffect(() => {
    setThrowVisibleLocal(throwVisible)
  }, [throwVisible])

  const yut = useRef();
  const yut2 = useRef();
  const yut3 = useRef();
  const yut4 = useRef();
  const yuts = [yut, yut2, yut3, yut4];

  function throwYuts(values) {
    for (let i = 0; i < 4; i++) {
      yuts[i].current.setTranslation(values[i].positionInHand);
      // yuts[i].current.rotation.x = values[i].rotation.x;
      // yuts[i].current.rotation.y = values[i].rotation.y;
      // yuts[i].current.rotation.z = values[i].rotation.z;
      // yuts[i].current.applyImpulse({
      //   x: 0,
      //   y: values[i].yImpulse,
      //   z: 0,
      // });
      // yuts[i].current.applyTorqueImpulse({
      //   x: values[i].torqueImpulse.x,
      //   y: values[i].torqueImpulse.y,
      //   z: values[i].torqueImpulse.z,
      // });
    }
  }
  function onSleepHandler() {
    setSleepCount((count) => count + 1);
  }

  return (
    <group {...props} dispose={null}>
      {throwVisible && (
        <Text3D
          font="./fonts/Luckiest Guy_Regular.json"
          height={0.01}
          size={0.3}
          rotation={layout[device].throwButton.rotation}
          position={layout[device].throwButton.position}
          onPointerDown={handleThrowClick}
        >
          Throw
        </Text3D>
      )}

      {yuts.map((ref, index) => {
        return (
          <RigidBody
            ref={ref}
            position={positionsInitial[index]}
            colliders="hull"
            restitution={0.3}
            friction={0.6}
            name={`yut${index}`}
            linearDamping={0.3}
            angularDamping={0.1} // when this value is high, yuts spinned more
            scale={0.1}
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
                geometry={nodesRhino.Cube003.geometry}
                material={materialsRhino["Material.002"]}
              />
            )}
          </RigidBody>
        );
      })}
    </group>
  );
}

useGLTF.preload("/models/yut-regular.glb");
useGLTF.preload("/models/yut-backdo.glb");
