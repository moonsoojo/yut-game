import React, { useEffect, useRef, useState } from 'react';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import Yoot from './meshes/Yoot2';
import YootRhino from './meshes/YootRhino2';
import YootButton from './YootButton';
import { useFrame } from '@react-three/fiber';
import { gamePhaseAtom, readyToThrowAtom, socket, yootThrowValuesAtom } from './SocketManager';
import { useAtom } from 'jotai';
import * as THREE from 'three';

const NUM_YOOTS = 4
export default function Yoots2() {

  // rigidbodies
  const yoot0 = useRef()
  const yoot1 = useRef()
  const yoot2 = useRef()
  const yoot3 = useRef()
  const yoots = [yoot0, yoot1, yoot2, yoot3]
  // materials
  const yoot0Mat = useRef()
  const yoot1Mat = useRef()
  const yoot2Mat = useRef()
  const yoot3Mat = useRef()

  const [sleepCount, setSleepCount] = useState(0)
  const [wakeCount, setWakeCount] = useState(NUM_YOOTS) // yoot is always moving on first render
  const [yootsAwake, setYootsAwake] = useState(true)
  const [outOfBounds, setOutOfBounds] = useState(false);
  const [yootThrowValues] = useAtom(yootThrowValuesAtom);
  const [gamePhase, setGamePhase] = useAtom(gamePhaseAtom)

  useEffect(() => {
    console.log("[Yoots2] sleepCount", sleepCount, "wakeCount", wakeCount)
    if (sleepCount > 0 && sleepCount == wakeCount) {
      setYootsAwake(false)
      console.log("[Yoots2][sleepCount, wakeCount useEffect] yootsAsleep")
      socket.emit("yootsAsleep", { flag: true }, ({response}) => {
        if (response === "record") {
          let move = observeThrow();
          socket.emit("recordThrow", {move})
        } else if (response === "noRecord") {
          // don't record throw
        }
      })
    } else if (wakeCount > sleepCount) {
      setYootsAwake(true)
    }
  }, [sleepCount, wakeCount])

  useEffect(() => {
    // client lags if you emit here
    if (yootThrowValues !== null) {
      console.log("[Yoots2] yootThrowValues", yootThrowValues)
      for (let i = 0; i < NUM_YOOTS; i++) {
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
    console.log("[Yoots2][yootsAwake useEffect] yootsAwake", yootsAwake)
    if (!yootsAwake || gamePhase === "lobby") {
      console.log("[Yoots2] yoot0Mat.current.material", yoot0Mat.current.material)
      yoot0Mat.current.material.transparent = true;
      yoot0Mat.current.material.opacity = 0;
      // yoot0Mat.current.material.visible = false;
      // yoot1Mat.current.material.visible = false;
      yoot1Mat.current.material.transparent = true;
      yoot1Mat.current.material.opacity = 0;
      // yoot2Mat.current.material.visible = false;
      yoot2Mat.current.material.transparent = true;
      yoot2Mat.current.material.opacity = 0;
      // yoot3Mat.current.material.visible = false;
      yoot3Mat.current.material.transparent = true;
      yoot3Mat.current.material.opacity = 0;
    } else {
      yoot0Mat.current.material.transparent = true;
      yoot0Mat.current.material.opacity = 1;
      // yoot0Mat.current.material.visible = true;
      yoot1Mat.current.material.transparent = true;
      yoot1Mat.current.material.opacity = 1;
      // yoot1Mat.current.material.visible = true;
      yoot2Mat.current.material.transparent = true;
      yoot2Mat.current.material.opacity = 1;
      // yoot2Mat.current.material.visible = true;
      yoot3Mat.current.material.transparent = true;
      yoot3Mat.current.material.opacity = 1;
      // yoot3Mat.current.material.visible = true;
    }
  }, [yootsAwake])

  useEffect(() => {
    console.log("[Yoots2][empty useEffect] yootsAwake", yootsAwake)
    if (!yootsAwake || gamePhase === "lobby") {
      console.log("[Yoots2] yoot0Mat.current.material", yoot0Mat.current.material)
      yoot0Mat.current.material.transparent = true;
      yoot0Mat.current.material.opacity = 0;
      // yoot0Mat.current.material.visible = false;
      // yoot1Mat.current.material.visible = false;
      yoot1Mat.current.material.transparent = true;
      yoot1Mat.current.material.opacity = 0;
      // yoot2Mat.current.material.visible = false;
      yoot2Mat.current.material.transparent = true;
      yoot2Mat.current.material.opacity = 0;
      // yoot3Mat.current.material.visible = false;
      yoot3Mat.current.material.transparent = true;
      yoot3Mat.current.material.opacity = 0;
    } else {
      yoot0Mat.current.material.transparent = true;
      yoot0Mat.current.material.opacity = 1;
      // yoot0Mat.current.material.visible = true;
      yoot1Mat.current.material.transparent = true;
      yoot1Mat.current.material.opacity = 1;
      // yoot1Mat.current.material.visible = true;
      yoot2Mat.current.material.transparent = true;
      yoot2Mat.current.material.opacity = 1;
      // yoot2Mat.current.material.visible = true;
      yoot3Mat.current.material.transparent = true;
      yoot3Mat.current.material.opacity = 1;
      // yoot3Mat.current.material.visible = true;
    }
  }, [])

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

  function handleSleep() {
    setSleepCount(count => count+1)
  }

  function handleWake() {
    setWakeCount(count => count+1)
  }

  return <Physics>
    {/* board */}
    <RigidBody
      type="fixed"
      restitution={0.01}
      position={[0,1,0]}
      friction={0.9}
    >
      <CuboidCollider args={[4, 0.2, 4]} restitution={0.2} friction={1} />
      <mesh>
        <boxGeometry args={[8, 0.4, 8]} />
        <meshStandardMaterial 
          transparent 
          color='yellow'
          opacity={0.05}
        />
      </mesh>
    </RigidBody>
    {/* yoots */}
    <RigidBody 
      ref={yoot0} 
      gravityScale={3} 
      position={[-1.5, 3, 0]}
      rotation={[0, Math.PI/2, -Math.PI/2]}
      onWake={handleWake}
      onSleep={handleSleep}
      colliders='hull'
    >
      <Yoot scale={0.2} ref={yoot0Mat}/>
    </RigidBody>
    <RigidBody 
      ref={yoot1} 
      gravityScale={3} 
      position={[-0.5, 3, 0]}
      rotation={[0, Math.PI/2, -Math.PI/2]}
      onWake={handleWake}
      onSleep={handleSleep}
      colliders='hull'
    >
      <Yoot scale={0.2} ref={yoot1Mat}/>
    </RigidBody>
    <RigidBody 
      ref={yoot2} 
      gravityScale={3} 
      position={[0.5, 3, 0]}
      rotation={[0, Math.PI/2, -Math.PI/2]}
      onWake={handleWake}
      onSleep={handleSleep}
      colliders='hull'
    >
      <Yoot scale={0.2} ref={yoot2Mat}/>
    </RigidBody>
    <RigidBody 
      ref={yoot3} 
      gravityScale={3} 
      position={[1.5, 3, 0]}
      rotation={[0, Math.PI/2, -Math.PI/2]}
      onWake={handleWake}
      onSleep={handleSleep}
      colliders='hull'
    >
      <YootRhino scale={0.2} ref={yoot3Mat}/>
    </RigidBody>
  </Physics>
}