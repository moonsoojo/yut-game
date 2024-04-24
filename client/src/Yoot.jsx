import { useEffect, useRef, useState } from "react";
import { RigidBody, CuboidCollider, Physics } from "@react-three/rapier";
import { useGLTF, /*useKeyboardControls*/ } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import React from "react";
import { socket } from "./SocketManager.jsx";
import { useAtom } from "jotai";
import layout from "./layout.js";
import TextButton from "./components/TextButton.jsx";
import YootButton from "./YootButton.jsx";
import meteorSettings from "./particles/Meteors.js";
import { particleSettingAtom, gamePhaseAtom, yootThrowValuesAtom, initialYootThrowAtom, lastMoveAtom, yootThrownAtom } from "./GlobalState.jsx";
import { useParams } from "wouter";
import HtmlElement from "./HtmlElement.jsx";
import PracticeYootButton from "./PracticeYootButton.jsx";

THREE.ColorManagement.legacyMode = false;

export default function Yoot({ device }) {
  const nodes = useGLTF("/models/yoot.glb").nodes;
  const materials = useGLTF("/models/yoot.glb").materials;
  const nodesRhino = useGLTF("/models/yoot-rhino.glb").nodes;
  const materialsRhino = useGLTF("/models/yoot-rhino.glb").materials;
  
  const [yootThrowValues] = useAtom(yootThrowValuesAtom);
  const [initialYootThrow] = useAtom(initialYootThrowAtom);
  const [yootThrown] = useAtom(yootThrownAtom)
  const [gamePhase] = useAtom(gamePhaseAtom);
  const [sleepCount, setSleepCount] = useState(0);
  const [outOfBounds, setOutOfBounds] = useState(false);
  const [_lastMove, setLastMove] = useAtom(lastMoveAtom)
  const params = useParams()

  const NUM_YOOTS = 4;
  let yoots = [];
  let yootMeshes = [];
  for (let i = 0; i < NUM_YOOTS; i++) {
    yoots.push(useRef());
    yootMeshes.push(useRef());
  }

  useEffect(() => {
    // for (let i = 0; i < yootMeshes.length; i++) {
    //   yootMeshes[i].current.material.visible = true
    // }

    // client lags if you emit here
    if (yootThrowValues !== null && document.visibilityState === "visible") {
      for (let i = 0; i < 4; i++) {
        yoots[i].current.setLinvel({ x: 0, y: 0, z: 0 })
        yoots[i].current.setAngvel({ x: 0, y: 0, z: 0 })
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
    }
  }, [yootThrowValues]);

  function getMoveText(move) {
    const moveToText = {
      "0": "OUT",
      "1": "1-STEP",
      "2": "2-STEPS",
      "3": "3-STEPS",
      "4": "4-STEPS",
      "5": "5-STEPS",
      "-1": "BACK-1"
    }
    return moveToText[move]
  }

  const [_particleSetting, setParticleSetting] = useAtom(particleSettingAtom)
  // const [boomText, setBoomText] = useAtom(boomTextAtom)
  useEffect(() => {
    // console.log("[Yoots] sleepCount", sleepCount)
    if (sleepCount == 4) {
      // Do this by 'thrown'
      // Easier to reveal by gamePhase in useFrame
      // for (let i = 0; i < yootMeshes.length; i++) {
      //   yootMeshes[i].current.material.visible = false
      // }
      
      let move = observeThrow();
      // Uncomment to test what happens on Yoot or Mo
      // move = 4
      setLastMove(getMoveText(move))
      
      if (gamePhase === 'pregame' || gamePhase === 'game') {  

        // Don't emit meteors when client renders for the first time
        if (!initialYootThrow) {
          if (move === 4 || move === 5) {
            // setBoomText('bonus turn')
            setParticleSetting({emitters: meteorSettings(device)})
          }

          socket.emit("recordThrow", { move, roomId: params.id })
        }
      }
    }
  }, [sleepCount])

  useFrame((state, delta) => {
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

    // Show or hide yoot
    for (let i = 0; i < yootMeshes.length; i++) {
      yootMeshes[i].current.material.visible = (gamePhase === "lobby" || gamePhase === "pregame" || yootThrown)
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
      //   result = 5
      // }
    }
      
    return result
  }

  function onSleepHandler() {
    setSleepCount((count) => count+1);
  }

  return (
    <Physics>
      <RigidBody
        type="fixed"
        restitution={0.01}
        position={[0, 1.5, 0]}
        friction={0.9}
      >
        <CuboidCollider args={[6, 0.5, 6]} restitution={0.2} friction={1} />
        <mesh>
          <boxGeometry args={[12, 1, 12]} />
          <meshStandardMaterial 
            transparent 
            opacity={0}
          />
        </mesh>
      </RigidBody>
      {/* nak catcher */}
      <RigidBody
        type="fixed"
        restitution={0.01}
        position={[0, -5, 0]}
        friction={0.9}
      >
        <CuboidCollider args={[50, 1, 50]} restitution={0.2} friction={1} />
        <mesh>
          <boxGeometry args={[100, 2, 100]} />
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
            position={[-1.5 + 1*index, 10, 2]} // if not set by socketManager
            rotation={[0, Math.PI/2, 0]}
            colliders="hull"
            restitution={0.3}
            friction={0.6}
            name={`yoot${index}`}
            linearDamping={0.3}
            angularDamping={0.1} // when this value is high, yoots spin more
            scale={0.15}
            gravityScale={3.5}
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
                scale={[1.5, 9, 1.51]}
                ref={yootMeshes[index]}
              />
            ) : (
              <mesh
                castShadow
                receiveShadow
                geometry={nodesRhino.Cylinder007.geometry}
                material={materialsRhino["Texture wrap.005"]}
                ref={yootMeshes[index]}
                rotation={[0, 0, -Math.PI / 2]} 
                scale={[1.5, 9, 1.51]}
              />
            )}
          </RigidBody>
        );
      })}
      {/* out of bounds message */}
      { outOfBounds && <>
        <TextButton
          text='out of bounds'
          position={[-1, 1.5, 0]}
        />
      </> }
      { gamePhase === 'lobby' && <PracticeYootButton
        position={layout[device].practiceThrowButton.position}
        rotation={layout[device].practiceThrowButton.rotation}
        scale={0.8}
      />}
      { (gamePhase === "pregame" || gamePhase === "game") && <YootButton 
        position={layout[device].throwButton.position}
        rotation={[0, Math.PI/2, 0]}
        scale={0.8}
      />}
    </Physics>
  );
}