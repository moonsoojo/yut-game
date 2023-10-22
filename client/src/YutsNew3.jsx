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
  const [yut1Asleep, setYut1Asleep] = useState(false);
  const [yut2Asleep, setYut2Asleep] = useState(false);
  const [yut3Asleep, setYut3Asleep] = useState(false);
  const [yut4Asleep, setYut4Asleep] = useState(false);

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
    setYut1Asleep(false);
    setYut2Asleep(false);
    setYut3Asleep(false);
    setYut4Asleep(false);
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
    if (yut1Asleep && yut2Asleep && yut3Asleep && yut4Asleep) {
      socket.emit("clientYutsResting");
      observeThrow(yuts)
    }
  }, [yut1Asleep, yut2Asleep, yut3Asleep, yut4Asleep]);

  useEffect(() => {
    setThrowVisibleLocal(throwVisible); // subscribing to change
    setHoverThrowText(false);
  }, [throwVisible]);

  const NUM_YUTS = 4;
  let yuts = [];
  for (let i = 0; i < NUM_YUTS; i++) {
    yuts.push(useRef());
  }

  function observeThrow(yuts) {
    let result = 0
    let countUps = 0
    let backdoUp = false
    yuts.forEach(yut => {
      var vector = new THREE.Vector3( 0, 1, 0 );
      vector.applyQuaternion( yut.current.rotation() );
      console.log("[YutsNew3] yut rotation", yut.current.rotation())
      console.log("[YutsNew3] vector", vector)
      
      if (vector.y < 0) {
        countUps++
        if (yut.current.userData.type === "backdo") {
          backdoUp = true;
        }
      }
    });
    if (countUps == 0) {
      result = 5
    } else if (countUps == 1) {
      if (backdoUp == true) {
        result = -1
      } else {
        result = countUps
      }
    } else {
      result = countUps
    }
    console.log("[observeThrow] result", result)
    return result
}

  function onSleepHandler(index) {
    // setSleepCount((count) => count + 1);
    console.log("[onSleepHandler] index", index, "asleep");
    if (index == 0) {
      setYut1Asleep(true)
    } else if (index == 1) {
      setYut2Asleep(true)
    } else    if (index == 2) {
      setYut3Asleep(true)
    }   else  if (index == 3) {
      setYut4Asleep(true)
    }
  }

  function onWakeHandler(index) {
    console.log("[onWakeHandler] index", index, "awake");
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
            position={[0, 1, index]}
            colliders="hull"
            restitution={0.3}
            friction={0.6}
            name={`yut${index}`}
            linearDamping={0.3}
            angularDamping={0.1} // when this value is high, yuts spin more
            scale={0.15}
            gravityScale={1.5}
            key={index}
            onSleep={() => onSleepHandler(index)} // add parentheses for event to stop multiple calls
            onWake={() => onWakeHandler(index)}
            userData={{type: index != 0 ? "regular" : "backdo"}}
          >
            {index != 0 ? (
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder007.geometry}
                material={materials["Texture wrap.005"]}
                rotation={[0, 0, -Math.PI / 2]}
                scale={[1, 6.161, 1]}
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
