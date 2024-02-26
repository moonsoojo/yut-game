import { MeshDistortMaterial, useGLTF } from "@react-three/drei";
import React from "react";
import { animated } from "@react-spring/three";

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

export default function Cursor2({
  position, 
  rotation=[0,0,0], 
  scale=1, 
  effectOpacity=0,
  effect=false
}) {
  const { nodes } = useGLTF("models/cursor.glb");

  return (
    <animated.group
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <animated.mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve.geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1,1,1]}
      >
        <meshStandardMaterial color="white"/>
      </animated.mesh>
      <animated.mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve.geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1.1, 1.1, 0.9]}
      >
        <meshStandardMaterial color="black"/>
      </animated.mesh>
      { effect && <group name="cursor-effect">
        <mesh position={[-0.4,0,-0.103]} rotation={[Math.PI/2, 0, Math.PI/2]}>
          <capsuleGeometry args={[0.04, 0.25, 10, 20]}/>
          <AnimatedMeshDistortMaterial color="green" transparent opacity={effectOpacity}/>
        </mesh>
        <mesh position={[-0.32,0,-0.3]} rotation={[Math.PI/2, 0, -Math.PI/4]}>
          <capsuleGeometry args={[0.04, 0.25, 10, 20]}/>
          <AnimatedMeshDistortMaterial color="green" transparent opacity={effectOpacity}/>
        </mesh>
        <mesh position={[-0.13,0,-0.36]} rotation={[Math.PI/2, 0, 0]}>
          <capsuleGeometry args={[0.04, 0.25, 10, 20]}/>
          <AnimatedMeshDistortMaterial color="green" transparent opacity={effectOpacity}/>
        </mesh>
      </group> }
    </animated.group>
  );
}

useGLTF.preload("models/cursor.glb");