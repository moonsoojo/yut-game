import { useGLTF } from "@react-three/drei";
import React from "react";
import { animated } from "@react-spring/three";

export default function Cursor({
  position, 
  rotation=[0,0,0], 
  scale, 
  effect
}) {
  const { nodes } = useGLTF("models/cursor.glb");
  let scaleArray;
  let scaleArrayOuter;
  if (scale.length === 1) {
    scaleArray = [1 * scale, 1 * scale, 1 * scale]
    scaleArrayOuter = [
      1.1 * scaleArray[0], 
      1.1 * scaleArray[1], 
      0.01 * scaleArray[2]
    ]
  } else {
    scaleArray = scale
    scaleArrayOuter = [
      1.1 * scaleArray[0], 
      1.1 * scaleArray[1], 
      0.01 * scaleArray[2]
    ]
  }

  return (
    <animated.group
      position={position}
      rotation={rotation}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve.geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={scaleArray}
      >
        <meshStandardMaterial color="white"/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve.geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={scaleArrayOuter}
      >
        <meshStandardMaterial color="black"/>
      </mesh>
      { effect && <group name="cursor-effect">
        <mesh position={[-0.8, 0, -0.3]} rotation={[Math.PI/2, 0, Math.PI/2]}>
          <capsuleGeometry args={[0.03, 0.3, 10, 20]}/>
          <meshStandardMaterial color="green"/>
        </mesh>
        <mesh position={[-0.6, 0, -0.7]} rotation={[Math.PI/2, 0, -Math.PI/4]}>
          <capsuleGeometry args={[0.03, 0.3, 10, 20]}/>
          <meshStandardMaterial color="green"/>
        </mesh>
        <mesh position={[-0.3, 0, -0.9]} rotation={[Math.PI/2, 0, 0]}>
          <capsuleGeometry args={[0.03, 0.3, 10, 20]}/>
          <meshStandardMaterial color="green"/>
        </mesh>
      </group> }
    </animated.group>
  );
}

useGLTF.preload("models/cursor.glb");