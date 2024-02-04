import { useGLTF } from '@react-three/drei';
import React from 'react';

export default function Taurus({position, scale, rotation}) {
  const { nodes, materials } = useGLTF("models/taurus.glb");
  for (const material of Object.keys(materials)) {
    materials[material].transparent = true;
    materials[material].opacity = 0.05;
  }

  return <group position={position} scale={scale} rotation={rotation}>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Retopo_NurbsPath020.geometry}
      material={materials["Material.020"]}
      position={[0.655, 0.078, 1.459]}
      rotation={[-3.073, 0.369, 2.954]}
      scale={0.067}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Retopo_Sphere007.geometry}
      material={materials.созвездие}
      position={[0.655, 0.078, 1.459]}
      rotation={[-1.518, 1.396, 1.519]}
      scale={0.058}
    />
  </group>
}