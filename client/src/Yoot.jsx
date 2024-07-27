import { useEffect, useRef, useState } from "react";
import { RigidBody, CuboidCollider, Physics, CylinderCollider } from "@react-three/rapier";
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
import { particleSettingAtom, gamePhaseAtom, yootThrowValuesAtom, initialYootThrowAtom, lastMoveAtom, yootThrownAtom, mainAlertAtom, pregameAlertAtom, throwAlertAtom, turnAlertActiveAtom, animationPlayingAtom, yootActiveAtom, throwCountAtom, hasTurnAtom, clientAtom, turnAtom } from "./GlobalState.jsx";
import { useParams } from "wouter";
import HtmlElement from "./HtmlElement.jsx";
import PracticeYootButton from "./PracticeYootButton.jsx";
import { roundNum } from "./helpers/helpers.js";
import Decimal from 'decimal.js';
import YootMesh from "./meshes/YootMesh.jsx";

THREE.ColorManagement.legacyMode = false;

export default function Yoot({ device }) {
  const nodes = useGLTF("/models/yoot.glb").nodes;
  const materials = useGLTF("/models/yoot.glb").materials;
  const nodesRhino = useGLTF("/models/yoot-rhino.glb").nodes;
  const materialsRhino = useGLTF("/models/yoot-rhino.glb").materials;
  
  const [yootThrowValues] = useAtom(yootThrowValuesAtom);
  const [initialYootThrow] = useAtom(initialYootThrowAtom);
  // const [yootThrown] = useAtom(yootThrownAtom)
  const [gamePhase] = useAtom(gamePhaseAtom);
  const [_sleepCount, setSleepCount] = useState(0);
  const [_lastMove, setLastMove] = useAtom(lastMoveAtom)
  const [_timer, setTimer] = useState(null)
  // hide alert
  const [_mainAlert, setMainAlert] = useAtom(mainAlertAtom)
  const [_animationPlaying, setAnimationPlaying] = useAtom(animationPlayingAtom)
  const [throwAlert, setThrowAlert] = useAtom(throwAlertAtom)
  const [animationPlaying] = useAtom(animationPlayingAtom)
  const [yootActive] = useAtom(yootActiveAtom)
  // throw count
  const [client] = useAtom(clientAtom)
  const [turn] = useAtom(turnAtom)
  const params = useParams()

  const NUM_YOOTS = 4;
  let yoots = [];
  let yootMeshes = [];
  for (let i = 0; i < NUM_YOOTS; i++) {
    yoots.push(useRef());
    yootMeshes.push(useRef());
  }

  useEffect(() => {
    // set timer
    // clear on yoot rest
    // clear on throw
    // on timer expire, record throw
    setTimer((prevTimer) => {
      clearTimeout(prevTimer);
      return setTimeout(() => {
        recordThrow();
        setAnimationPlaying(false)
      }, 3500)
    })

    // Show yoot
    for (let i = 0; i < yootMeshes.length; i++) {
      yootMeshes[i].current.material.visible = true
    }

    setMainAlert({ type: '' })
    setAnimationPlaying(true)
    setThrowAlert({ type: '' })

    // client lags if you emit here
    if (yootThrowValues !== null && document.visibilityState === "visible") {
      for (let i = 0; i < 4; i++) {
        yoots[i].current.setLinvel({ 
          x: Decimal(0), 
          y: Decimal(0), 
          z: Decimal(0)
        })
        yoots[i].current.setAngvel({ 
          x: Decimal(0), 
          y: Decimal(0), 
          z: Decimal(0)
        })
        yoots[i].current.setTranslation(yootThrowValues[i].positionInHand);
        yoots[i].current.setRotation(yootThrowValues[i].rotation, true);
        yoots[i].current.applyImpulse({
          x: Decimal(0),
          y: Decimal(yootThrowValues[i].yImpulse),
          z: Decimal(0),
        });
        yoots[i].current.applyTorqueImpulse({
          x: Decimal(yootThrowValues[i].torqueImpulse.x),
          y: Decimal(yootThrowValues[i].torqueImpulse.y),
          z: Decimal(yootThrowValues[i].torqueImpulse.z),
        });
      }
      setSleepCount(0);
    }

  }, [yootThrowValues]);

  useEffect(() => {
    if (gamePhase === 'lobby' || gamePhase === 'pregame') {
      for (let i = 0; i < yootMeshes.length; i++) {
        yootMeshes[i].current.material.visible = true
      } 
    } else {
      for (let i = 0; i < yootMeshes.length; i++) {
        yootMeshes[i].current.material.visible = false
      } 
    }
  }, [gamePhase])

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
  
  function recordThrow() {

    let move = observeThrow();
    // Uncomment to test what happens on Yoot or Mo
    // move = Math.random() > 0.5 ? 4 : 5

    // Show or hide yoot
    if (gamePhase === 'lobby' || gamePhase === 'pregame') {
      for (let i = 0; i < yootMeshes.length; i++) {
        yootMeshes[i].current.material.visible = true
      } 
    } else {
      for (let i = 0; i < yootMeshes.length; i++) {
        yootMeshes[i].current.material.visible = false
      } 
    }
     
    if (gamePhase === 'lobby') {
      setLastMove(getMoveText(move))
    } else if (gamePhase === 'pregame' || gamePhase === 'game') {  
      if (!initialYootThrow) {
        if (gamePhase === 'game' && (move === 4 || move === 5)) {
          setParticleSetting({emitters: meteorSettings(device)})
        }

        setLastMove(getMoveText(move))
        
        socket.emit("recordThrow", { move, roomId: params.id })
      } else {
        setLastMove(null)
      }
    }
  }

  const yootOutShineSec = 6;
  let outShineStartTime = null;
  let outShinePlayed = false;
  const outIndicator = useRef();
  const yootMatFloorRef = useRef();
  useFrame((state, delta) => {
    // console.log('[Yoot] throwAlert', throwAlert, 'outShineStartTime', outShineStartTime)
    if (throwAlert.num === 0 && !outShinePlayed) {
      if (outShineStartTime === null) {
        outShineStartTime = state.clock.elapsedTime;
      } else if ((outShineStartTime + yootOutShineSec) > state.clock.elapsedTime) {
        yootMatFloorRef.current.opacity = Math.floor(state.clock.elapsedTime - outShineStartTime) % 2 === 1 ? 0.3 : 0.1;
        // outIndicator.current.position.x = Math.sin(Math.floor(state.clock.elapsedTime*20)/10) * 6
        // outIndicator.current.position.z = Math.cos(Math.floor(state.clock.elapsedTime*20)/10) * 6
      } else {
        outShineStartTime = null;
        outShinePlayed = true;
        yootMatFloorRef.current.opacity = 0;
      }
    } else {
      yootMatFloorRef.current.opacity = 0;
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
    }
      
    return result
  }

  function onSleepHandler() {
    setSleepCount((count) => count+1);
  }

  function ThrowCount({position, orientation}) {
    const [throwCount] = useAtom(throwCountAtom)

    function YootIcon({ position }) {
      // kept this code in case i wanna try the other approach (display when it's not your team's turn)
      // const active = client.team === turn.team
      return <group position={position}>
        {/* <YootMesh active={active} position={[0,0,0]} rotation={[-Math.PI/4, Math.PI/2 + Math.PI/32*2, -Math.PI/2, 'YXZ']} scale={0.06}/>
        <YootMesh active={active} position={[0.07,0.05,-0.1]} rotation={[0, Math.PI/2 + Math.PI/32*1, -Math.PI/2, 'YXZ']} scale={0.06}/>
        <YootMesh active={active} position={[0.16,0.03,-0.06]} rotation={[Math.PI/4, Math.PI/2, -Math.PI/2, 'YXZ']} scale={0.06}/>
        <YootMesh active={active} position={[0.25,0,0]} rotation={[Math.PI/4*3, Math.PI/2 - Math.PI/32*1, -Math.PI/2, 'YXZ']} scale={0.06}/> */}
        <mesh>
          <sphereGeometry args={[0.1, 32, 16]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh>
      </group>
    }

    function positionByOrientation(index, orientation) {
      if (orientation === 'downUp') {
        return [0, 0, -index*0.5]
      } else if (orientation === 'leftRight') {
        return [0, 0, index*0.4]
      }
    }

    const tempArray = [...Array(throwCount)]
    return <group position={position}>
      {tempArray.map((value, index) => {
        return <YootIcon key={index} position={positionByOrientation(index, orientation)}/>
      })}
    </group>
  }

  return (
    <Physics>
      {/* out indicator */}
      {/* { outShineStartTime && <mesh ref={outIndicator}>
        <sphereGeometry args={[0.05, 32, 16]}/>
        <meshStandardMaterial color='white'/>
      </mesh> } */}
      {/* Floor */}
      <RigidBody
        type="fixed"
        restitution={0.01}
        position={[0, 1.5, 0]}
        friction={0.9}
      >
        {/* Height has to be thick enough for Yoot to not fall through the collider */}
        <CylinderCollider args={[0.5, 6]} restitution={0.2} friction={1} />
        <mesh>
          <cylinderGeometry args={[6, 6, 1, 20]} />
          <meshStandardMaterial 
            transparent 
            opacity={0}
            depthWrite={false}
            color='yellow'
            ref={yootMatFloorRef}
          />
        </mesh>
      </RigidBody>
      {/* Nak catcher */}
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
            depthWrite={false}
          />
        </mesh>
      </RigidBody>
      {yoots.map((ref, index) => {
        return (
          <RigidBody
            ref={ref}            
            position={[-1.5 + 1*index, 30, 2]}
            rotation={[0, Math.PI/2, 0]}
            colliders="hull"
            restitution={0.2}
            friction={0.6}
            name={`yoot${index}`}
            linearDamping={0.3}
            angularDamping={0.1} // when this value is high, yoots spin more
            scale={0.15}
            gravityScale={7}
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
                scale={[2.5, 14, 2.5]}
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
                scale={[2.5, 14, 2.5]}
              />
            )}
          </RigidBody>
        );
      })}
      {/* { gamePhase === 'lobby' && <PracticeYootButton
        position={layout[device].game.practiceYootButton.position}
        scale={layout[device].game.practiceYootButton.scale}
      />} */}
      { (gamePhase === "pregame" || gamePhase === "game") && <YootButton 
        position={layout[device].game.yootButton.position}
        rotation={layout[device].game.yootButton.rotation}
        scale={layout[device].game.yootButton.scale}
        active={yootActive && !animationPlaying}
      />}
      { client.team === turn.team && <ThrowCount 
        position={layout[device].game.throwCount.position}
        orientation={layout[device].game.throwCount.orientation}
      /> }
    </Physics>
  );
}