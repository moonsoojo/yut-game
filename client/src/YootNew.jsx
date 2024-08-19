// add this and YootButton into Game
// YootButton sends event to server
// server returns result and animation to Yoot
// Yoot plays the animation
// on finish, play the throw alert
// what about the move list?

import React, { useEffect, useRef, useState } from 'react'
import { LoopOnce } from 'three'
import { useAnimations, useGLTF } from '@react-three/drei';

export default function YootNew({ setAnimation, animation, scale, position }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('models/yoot-animated.glb')
  const { actions, mixer } = useAnimations(animations, group)

  useEffect(() => {
    const fn = () => { 
      setAnimation(null)
    }
    mixer.addEventListener('finished', fn);
    return () => {
      mixer.removeEventListener('finished', fn)
    }
  }, [])

  useEffect(() => {
    if (animation !== null) {
      for (let i = 0; i < 4; i++) {
        actions[`yoot${i}Throw${animation}`].clampWhenFinished = true
        actions[`yoot${i}Throw${animation}`].play().setLoop(LoopOnce);
      }
    }
  }, [animation])

  return <group ref={group} scale={scale} position={position} dispose={null}>
    <group name="Scene" position={[0, 0, 0]}>
      <mesh
        name="yoot1"
        castShadow
        receiveShadow
        geometry={nodes.yoot1.geometry}
        material={materials['Material.005']}
        position={[19.534, 15.094, 21.846]}
        rotation={[0.116, -0.574, -1.317]}
      />
      <mesh
        name="yoot0"
        castShadow
        receiveShadow
        geometry={nodes.yoot0.geometry}
        material={materials['Material.006']}
        position={[16.01, 14.715, 19.09]}
        rotation={[0.074, -1.309, -1.29]}
      />
      <mesh
        name="yoot2"
        castShadow
        receiveShadow
        geometry={nodes.yoot2.geometry}
        material={materials['Material.002']}
        position={[19.534, 15.094, 14.766]}
        rotation={[0.068, -0.334, -1.363]}
      />
      <mesh
        name="yoot3"
        castShadow
        receiveShadow
        geometry={nodes.yoot3.geometry}
        material={materials['Material.008']}
        position={[23.029, 15.094, 18.171]}
        rotation={[0.116, -0.753, -1.391]}
      />
    </group>
  </group>
}

useGLTF.preload('models/yoot-animated.glb')