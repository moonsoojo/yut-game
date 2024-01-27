import React, { useEffect, useRef, useState } from 'react';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import Yoot from './meshes/Yoot2';
import YootRhino from './meshes/YootRhino2';
import YootButton from './YootButton';
import { useFrame } from '@react-three/fiber';
import { readyToThrowAtom, socket, yootThrowValuesAtom } from './SocketManager';
import { useAtom } from 'jotai';

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
  const yootRhinoMat0 = useRef()
  const yootRhinoMat1 = useRef()

  const [sleepCount, setSleepCount] = useState(0)
  const [wakeCount, setWakeCount] = useState(4) // yoot is always moving on first render
  const [yootsAwake, setYootsAwake] = useState(true)
  const [outOfBounds, setOutOfBounds] = useState(false);
  const [yootThrowValues] = useAtom(yootThrowValuesAtom);

  useEffect(() => {
    console.log("sleep count", sleepCount, "wake count", wakeCount)
    if (sleepCount > 0 && sleepCount == wakeCount) {
      socket.emit("yootsAsleep", {flag: true}, ({response}) => {
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
    if (!yootsAwake) {
      yoot0Mat.current.material.visible = false;
      yoot1Mat.current.material.visible = false;
      yoot2Mat.current.material.visible = false;
      yootRhinoMat0.current.material.visible = false;
      yootRhinoMat1.current.material.visible = false;
    } else {
      yoot0Mat.current.material.visible = true;
      yoot1Mat.current.material.visible = true;
      yoot2Mat.current.material.visible = true;
      yootRhinoMat0.current.material.visible = true;
      yootRhinoMat1.current.material.visible = true;
    }
  }, [yootsAwake])

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
    >
      <Yoot scale={0.3} ref={yoot0Mat}/>
    </RigidBody>
    <RigidBody 
      ref={yoot1} 
      gravityScale={3} 
      position={[-0.5, 3, 0]}
      rotation={[0, Math.PI/2, -Math.PI/2]}
      onWake={handleWake}
      onSleep={handleSleep}
    >
      <Yoot scale={0.3} ref={yoot1Mat}/>
    </RigidBody>
    <RigidBody 
      ref={yoot2} 
      gravityScale={3} 
      position={[0.5, 3, 0]}
      rotation={[0, Math.PI/2, -Math.PI/2]}
      onWake={handleWake}
      onSleep={handleSleep}
    >
      <Yoot scale={0.3} ref={yoot2Mat}/>
    </RigidBody>
    <RigidBody 
      ref={yoot3} 
      gravityScale={3} 
      position={[1.5, 3, 0]}
      rotation={[0, Math.PI/2, -Math.PI/2]}
      onWake={handleWake}
      onSleep={handleSleep}
    >
      <YootRhino scale={0.3} ref={{ yootRhinoMat0, yootRhinoMat1 }}/>
    </RigidBody>
  </Physics>
}