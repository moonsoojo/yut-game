import { useEffect, useRef, useState } from "react";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useGLTF, /*useKeyboardControls*/ } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import React, {ref} from "react";
import { yootThrowValuesAtom, clientAtom, gamePhaseAtom, turnAtom, teamsAtom, socket, readyToThrowAtom } from "./SocketManager.jsx";
import { useAtom } from "jotai";
import { bothTeamsHavePlayers, getCurrentPlayerSocketId, isMyTurn } from "./helpers/helpers.js";
import layout from "./layout.js";
import TextButton from "./components/TextButton.jsx";

THREE.ColorManagement.legacyMode = false;

export default function Yoots({ device = "portrait" }) {
  // const [subscribeKeys, getKeys] = useKeyboardControls();
  const nodes = useGLTF("/models/yoot.glb").nodes;
  const materials = useGLTF("/models/yoot.glb").materials;
  const nodesRhino = useGLTF("/models/yoot-rhino.glb").nodes;
  const materialsRhino = useGLTF("/models/yoot-rhino.glb").materials;
  const [yootThrowValues] = useAtom(yootThrowValuesAtom);
  const [sleepCount, setSleepCount] = useState(0);
  const [wakeCount, setWakeCount] = useState(4);
  const [gamePhase] = useAtom(gamePhaseAtom)
  const [teams] = useAtom(teamsAtom)
  const [turn] = useAtom(turnAtom);
  const [client] = useAtom(clientAtom)
  const [outOfBounds, setOutOfBounds] = useState(false);
  const [showResetYoots, setShowResetYoots] = useState(false)
  const [readyToThrow, setReadyToThrow] = useAtom(readyToThrowAtom)

  const NUM_YOOTS = 4;
  let yoots = [];
  let yootMeshes = [];
  for (let i = 0; i < NUM_YOOTS; i++) {
    yoots.push(useRef());
    yootMeshes.push(useRef());
  }
  let yootFloorMaterial = useRef();

  useEffect(() => {
    for (let i = 0; i < yootMeshes.length; i++) {
      yootMeshes[i].current.material.roughness = 0.5
      yootMeshes[i].current.material.metalness = 0
    }
  }, []);

  let RESET_TIME = 10000
  useEffect(() => {
    // client lags if you emit here
    if (yootThrowValues !== null) {
      for (let i = 0; i < 4; i++) {
        yoots[i].current.setTranslation(yootThrowValues[i].positionInHand);
        yoots[i].current.setRotation(yootThrowValues[i].rotation, true);
        yoots[i].current.applyImpulse({
          x: 0,
          y: yootThrowValues[i].yImpulse,
          z: 0,
        });
        yoots[i].current.applyTorqueImpulse({
          x: yootThrowValues[i].torqueImpulse.x,
          y: yootThrowValues[i].torqueImpulse.y,
          z: yootThrowValues[i].torqueImpulse.z,
        });
      }
      setSleepCount(0);
      setWakeCount(0);
    }
  }, [yootThrowValues]);

  useEffect(() => {
    console.log("[Yoots] sleepCount", sleepCount, "wakeCount", wakeCount)
    if (sleepCount > 0 && sleepCount == wakeCount) {
      console.log("[sleepCount useEffect] sleepCount === wakeCount")
      // doesn't fire if client is not visible
      socket.emit("yootsAsleep", {flag: true}, ({response}) => {
        console.log("[yootsAsleep] response", response)
        if (response === "record") {
          let move = observeThrow();
          socket.emit("recordThrow", {move})
        } else if (response === "noRecord") {
          // don't record throw
        }
      })
    }
  }, [sleepCount, wakeCount])

  useFrame((state, delta) => {
    // console.log("[Yoots] client", client, "isMyTurn", isMyTurn(turn, teams, client.id),
    // "readyToThrow", readyToThrow)
    if (client && 
      isMyTurn(turn, teams, client.id) && 
      teams[turn.team].throws > 0 && 
      readyToThrow) { // refactor this so server sends this info to client
        for (let i = 0; i < yootMeshes.length; i++) {
          yootMeshes[i].current.material.emissive = new THREE.Color( 'white' );
          yootMeshes[i].current.material.emissiveIntensity = Math.sin(state.clock.elapsedTime * 3) * 0.3 + 0.3
        }
        yootFloorMaterial.current.opacity = Math.sin(state.clock.elapsedTime * 3) * 0.2
    } else {
      for (let i = 0; i < yootMeshes.length; i++) {
        yootMeshes[i].current.material.emissiveIntensity = 0
      }
      yootFloorMaterial.current.opacity = 0.1
    }
    let allYootsOnFloor = true;
    for (let i = 0; i < yoots.length; i++) {
      if (yoots[i].current.translation().y < 0) {
        setOutOfBounds(true);
        allYootsOnFloor = false
      }
    }
    if (allYootsOnFloor) {
      setOutOfBounds(false);
    }
  })

  function observeThrow() {
    let result = 0

    // nak
    let nak = false;
    for (let i = 0; i < yoots.length; i++) {
      if (yoots[i].current.translation().y < 0) {
        nak = true;
      }
    }
    if (!nak) {
      let countUps = 0
      let backdoUp = false

      yoots.forEach(yoot => {
        let vector = new THREE.Vector3( 0, 1, 0 );
        vector.applyQuaternion( yoot.current.rotation() );
        if (vector.y < 0) {
          countUps++
          if (yoot.current.userData === "backdo") {
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
      //   result = 3
      // }
    }
      
    return result
  }

  function onSleepHandler() {
    console.log("onSleepHandler")
    setSleepCount((count) => count+1);
  }

  function onWakeHandler() {
    console.log("onWakeHandler") // not triggered on client load
    // interesting find: yoots drop in lobby / throw again in game&pregame when client rerenders
    setWakeCount((count) => count+1);
  }

  function handleYootThrow() {
    socket.emit("throwYoots", ({}), ({ error }) => {
      console.log(error)
    });
  }

  function handleYootReset() {
    setShowResetYoots(false);
    socket.emit("resetYoots", { socketIdEmitter: clientPlayer.socketId })
  }

  return (
    <group dispose={null}>
      { /* showResetYoots && <TextButton
        text='Reset yoots'
        position={[-1,0,-5]}
        boxWidth={1.2}
        boxHeight={0.3}
        handlePointerClick={handleYootReset}
      /> */}
      <RigidBody
        type="fixed"
        restitution={0.01}
        position={layout.yoot.floor}
        friction={0.9}
      >
        <CuboidCollider args={[2, 0.2, 2]} restitution={0.2} friction={1} />
        <mesh onPointerDown={handleYootThrow}>
          <boxGeometry args={[4, 0.4, 4]} />
          <meshStandardMaterial 
            transparent 
            color='yellow'
            opacity={0.3}
            ref={yootFloorMaterial}
          />
        </mesh>
      </RigidBody>
      {/* nak catcher */}
      <RigidBody
        type="fixed"
        restitution={0.01}
        position={[0, -10, 0]}
        friction={0.9}
      >
        <CuboidCollider args={[100, 0.2, 100]} restitution={0.2} friction={1} />
        <mesh>
          <boxGeometry args={[200, 0.4, 200]} />
          <meshStandardMaterial 
            transparent 
            opacity={0}
          />
        </mesh>
      </RigidBody>
      {yoots.map((ref, index) => {
        return (
          <RigidBody
            ref={ref}            
            position={[-1 + 0.5*index, 1, 0]} // if not set by socketManager
            rotation={[0, Math.PI/2, 0]}
            colliders="hull"
            restitution={0.3}
            friction={0.6}
            name={`yoot${index}`}
            linearDamping={0.3}
            angularDamping={0.1} // when this value is high, yoots spin more
            scale={0.15}
            gravityScale={2.5}
            key={index}
            onSleep={onSleepHandler}
            onWake={onWakeHandler}
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
                // 1, 6.161, 1
                // [1.4, 8.6254, 1.4]
                ref={yootMeshes[index]}
              >
              </mesh>
            ) : (
              <group rotation={[0, 0, -Math.PI / 2]} scale={[1, 6.161, 1]}>
                {/* [1.4, 8.6254, 1.4] */}
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodesRhino.Cylinder002_1.geometry}
                  material={materialsRhino["Texture wrap.005"]}
                  ref={yootMeshes[index]}
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
      {/* out of bounds message */}
      { outOfBounds && <>
        <TextButton
          text='out of bounds'
          position={layout.yoot.outOfBounds}
        />
      </>}
    </group>
  );
}
