import { OrbitControls, Text3D } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';

export default function Celebration() {
  const mat0 = useRef(null)
  const mat1 = useRef(null)
  const mat2 = useRef(null)
  const mat3 = useRef(null)
  useFrame((state, delta) => {
    mat0.current.opacity = Math.sin(state.clock.elapsedTime * 5) + 0.8
    mat1.current.opacity = Math.sin(state.clock.elapsedTime * 5) + 0.8
    mat2.current.opacity = Math.sin(state.clock.elapsedTime * 5) + 0.8
    mat3.current.opacity = Math.sin(state.clock.elapsedTime * 5) + 0.8
    // state.camera.lookAt([0,0,0])
    state.camera.position.x = 0
    state.camera.position.y = 0
    state.camera.position.z = 13
  })

  return <group>
    <OrbitControls/>
    <Text3D
      position={[-5, 1.5, 0]}
      rotation={[-Math.PI/32, Math.PI/32, Math.PI/32]}
      font="./fonts/Luckiest Guy_Regular.json"
      castShadow={false}
      size={0.7}
      height={0.01}
      receiveShadow
    >
      BONUS!
      <meshStandardMaterial color="yellow" transparent ref={mat0}/>
    </Text3D>
    <Text3D
      position={[2, 1.5, 0]}
      rotation={[-Math.PI/32, Math.PI/32, Math.PI/32]}
      font="./fonts/Luckiest Guy_Regular.json"
      castShadow={false}
      size={0.7}
      height={0.01}
      receiveShadow
    >
      BONUS!
      <meshStandardMaterial color="yellow" transparent ref={mat1}/>
    </Text3D>
    <Text3D
      position={[2, -1.5, 0]}
      rotation={[-Math.PI/32, Math.PI/32, Math.PI/32]}
      font="./fonts/Luckiest Guy_Regular.json"
      castShadow={false}
      size={0.7}
      height={0.01}
      receiveShadow
    >
      BONUS!
      <meshStandardMaterial color="yellow" transparent ref={mat2}/>
    </Text3D>
    <Text3D
      position={[-5, -1.5, 0]}
      rotation={[-Math.PI/32, Math.PI/32, Math.PI/32]}
      font="./fonts/Luckiest Guy_Regular.json"
      castShadow={false}
      size={0.7}
      height={0.01}
      receiveShadow
    >
      BONUS!
      <meshStandardMaterial color="yellow" transparent ref={mat3}/>
    </Text3D>
  </group>
}