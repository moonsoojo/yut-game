import { useGLTF } from '@react-three/drei';
import React from 'react';

export default function Wolf({position, scale, rotation}) {
  const { nodes, materials } = useGLTF("models/wolf.glb");
  for (const material of Object.keys(materials)) {
    materials[material].transparent = true;
    materials[material].opacity = 0.05;
  }

  return <group position={position} scale={scale} rotation={rotation}>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Retopo_NurbsPath009.geometry}
      material={materials["Material.020"]}
      rotation={[-2.845, 0, Math.PI / 2]}
      scale={0.048}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Retopo_03_woolf.geometry}
      material={materials.созвездие}
      position={[0, -2.739, -0.435]}
      rotation={[2.306, 0, Math.PI / 2]}
      scale={0.063}
    />
  </group>
}