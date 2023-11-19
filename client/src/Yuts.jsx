import { useEffect, useRef, useState } from "react";
import { RigidBody } from "@react-three/rapier";
import { useGLTF, useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import React from "react";
import { yutThrowValuesAtom, gamePhaseAtom, turnAtom, teamsAtom, socket, socketIdAtom, throwInProgressAtom } from "./SocketManager.jsx";
import { useAtom } from "jotai";
import layout from "../../layout.js";
import TextButton from "./components/TextButton.jsx";

THREE.ColorManagement.legacyMode = false;

export default function YutsNew3({ device = "mobile", ...props }) {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const nodes = useGLTF("/models/yut.glb").nodes;
  const materials = useGLTF("/models/yut.glb").materials;
  const nodesRhino = useGLTF("/models/yut-rhino.glb").nodes;
  const materialsRhino = useGLTF("/models/yut-rhino.glb").materials;
  const [yutThrowValues] = useAtom(yutThrowValuesAtom);
  const [sleepCount, setSleepCount] = useState(0);
  const [gamePhase] = useAtom(gamePhaseAtom)
  const [teams] = useAtom(teamsAtom)
  const [turn] = useAtom(turnAtom);
  const [socketId] = useAtom(socketIdAtom);
  const [throwInProgress] = useAtom(throwInProgressAtom);
  const [_hoverThrowText, setHoverThrowText] = useState(false);

  useEffect(() => {
    subscribeKeys(
      (state) => state.throw,
      (value) => {
        if (value) {
          socket.emit("throwInProgress", true);
          socket.emit("throwYuts");
        }
      }
    );
  }, []);

  useEffect(() => {
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
    if (sleepCount % 4 == 0 && sleepCount > 0) {
      socket.emit("clientYutsResting");
      observeThrow(yuts)
    }
  }, [sleepCount])

  useEffect(() => {
    setHoverThrowText(false);
  }, [throwInProgress]);

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
      let vector = new THREE.Vector3( 0, 1, 0 );
      vector.applyQuaternion( yut.current.rotation() );
      if (vector.y < 0) {
        countUps++
        if (yut.current.userData === "backdo") {
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
    // test: set all result to the same value
    // if (gamePhase === "game") {
    //   result = 4
    // }

    if (gamePhase === "pregame" || gamePhase === "game") {
      socket.emit("recordThrow", result)
      if (gamePhase === "game" && (result == 4 || result == 5) ) {
        socket.emit("bonusThrow");
      }
    }
  }

  function onSleepHandler() {
    setSleepCount((count) => count+1);
  }

  // let positionThrowButton = layout[device].throwButton.position
  // let positionThrowButtonShifted = [
  //   positionThrowButton[0] + layout[device].actionButtonShift[0],
  //   positionThrowButton[1] + layout[device].actionButtonShift[1],
  //   positionThrowButton[2] + layout[device].actionButtonShift[2],
  // ]
  // let positionThrowButtonOrder = layout[device].throwButtonOrder.position
  // let positionThrowButtonOrderShifted = [
  //   positionThrowButtonOrder[0] + layout[device].actionButtonShift[0],
  //   positionThrowButtonOrder[1] + layout[device].actionButtonShift[1],
  //   positionThrowButtonOrder[2] + layout[device].actionButtonShift[2],
  // ]

  return (
    <group {...props} dispose={null}>


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
            gravityScale={2.5}
            key={index}
            onSleep={onSleepHandler}
            userData={index != 0 ? "regular" : "backdo"} // tried setting this as an object. it woke up the object when it fell asleep
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
