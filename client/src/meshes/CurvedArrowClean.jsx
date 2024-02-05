import React from 'react';
import { useGLTF } from "@react-three/drei";

export default function CurvedArrowClean({position, scale, rotation}) {
  const { nodes, materials } = useGLTF("/models/curved-arrow-clean.glb");
  let scaleArray;
  if (scale.length === 3) {
    scaleArray = scale
  } else {
    scaleArray=[1 * scale, 1 * scale, 0.8 * scale]
  }

  return (
    <group position={position} rotation={rotation} scale={scaleArray}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BezierCurve.geometry}
        material={nodes.BezierCurve.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cone.geometry}
        material={nodes.Cone.material}
        position={[1.107, -0.031, 0.066]}
        rotation={[0, -0.514, -1.658]}
        scale={[0.192, 0.282, 0.224]}
      />
    </group>
  )
}