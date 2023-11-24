import { useEffect, useRef, useState } from "react";
import { RigidBody } from "@react-three/rapier";
import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import React, {ref} from "react";
import { yutThrowValuesAtom, clientPlayerAtom, gamePhaseAtom, turnAtom, teamsAtom, socket, throwInProgressAtom } from "./SocketManager.jsx";
import { useAtom } from "jotai";
import { getCurrentPlayerSocketId, isMyTurn } from "../../server/src/helpers.js";

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
  const [throwInProgress] = useAtom(throwInProgressAtom);
  const [clientPlayer] = useAtom(clientPlayerAtom)
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
    socket.emit("yutsAwake", { playerSocketId: clientPlayer.socketId })
    for (let i = 0; i < yutMeshes.length; i++) {
      yutMeshes[i].current.material.roughness = 0
      yutMeshes[i].current.material.metalness = 0
    }
  }, []);

  useEffect(() => {
    socket.emit("yutsAwake", { playerSocketId: clientPlayer.socketId })
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
      let throwResult = observeThrow(yuts);
      socket.emit("yutsAsleep", {playerSocketId: clientPlayer.socketId, throwResult});
    }
  }, [sleepCount])

  useEffect(() => {
    setHoverThrowText(false);
  }, [throwInProgress]);

  useFrame((state, delta) => {
    if (isMyTurn(turn, teams, clientPlayer.socketId) && teams[turn.team].throws > 0) {
      for (let i = 0; i < yutMeshes.length; i++) {
        yutMeshes[i].current.material.emissive = new THREE.Color( 'white' );
        yutMeshes[i].current.material.emissiveIntensity = Math.sin(state.clock.elapsedTime * 3) * 0.3 + 0.3
      }
    } else {
      for (let i = 0; i < yutMeshes.length; i++) {
        yutMeshes[i].current.material.emissive = null;
        yutMeshes[i].current.material.emissiveIntensity = 0

      }
    }
  })

  const NUM_YUTS = 4;
  let yuts = [];
  let yutMeshes = [];
  for (let i = 0; i < NUM_YUTS; i++) {
    yuts.push(useRef());
    yutMeshes.push(useRef());
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

    // if (gamePhase === "pregame" || gamePhase === "game") {
    //   socket.emit("recordThrow", result)
    //   if (gamePhase === "game" && (result == 4 || result == 5) ) {
    //     socket.emit("bonusThrow");
    //   }
    // }
    
    return result
  }

  function onSleepHandler() {
    setSleepCount((count) => count+1);
  }

  function onWakeHandler() {
    // console.log("onWakeHandler")
    // socket.emit("yutsAsleep", { flag: false, playerSocketId: clientPlayer.socketId })
  }

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
            // onWake={onWakeHandler}
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
                ref={yutMeshes[index]}
              >
              </mesh>
            ) : (
              <group rotation={[0, 0, -Math.PI / 2]} scale={[1, 6.161, 1]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodesRhino.Cylinder002_1.geometry}
                  material={materialsRhino["Texture wrap.005"]}
                  ref={yutMeshes[index]}
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
