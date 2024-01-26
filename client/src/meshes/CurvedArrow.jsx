import React from 'react';
import { useGLTF } from "@react-three/drei";

export default function CurvedArrow({
  position, 
  scale, 
  rotation
}) {
  const { nodes, materials } = useGLTF("/models/curved-arrow.glb");
  const scaleArray=[1 * scale, 1 * scale, 0.8 * scale]

  return (
    <group dispose={null} position={position} rotation={rotation} scale={scaleArray}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials["Material.001"]}
        position={[-0.159, 0, 1.224]}
        rotation={[0, 0.671, 0]}
        scale={[0.071, 0.053, 0.243]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials["Material.001"]}
        position={[-0.513, 0, 0.619]}
        rotation={[-0.029, 0.42, -0.002]}
        scale={[0.071, 0.053, 0.243]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials["Material.001"]}
        position={[-0.638, 0, -0.028]}
        rotation={[-0.026, -0.006, -0.014]}
        scale={[0.071, 0.053, 0.243]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={materials["Material.001"]}
        position={[-0.502, 0, -0.665]}
        rotation={[-0.029, -0.474, -0.027]}
        scale={[0.071, 0.053, 0.243]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={materials["Material.001"]}
        position={[-0.107, 0, -1.207]}
        rotation={[-3.106, 0.738, 3.104]}
        scale={[0.071, 0.053, 0.243]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube006.geometry}
        material={materials["Material.001"]}
        position={[0.222, 0, 1.59]}
        rotation={[0.15, 0.924, -0.084]}
        scale={[0.071, 0.053, 0.149]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cone.geometry}
        material={materials["Material.001"]}
        position={[0.438, 0, -1.588]}
        rotation={[Math.PI / 2, 0, -2.165]}
        scale={[0.494, 0.637, 0.383]}
      />
    </group>
  )
}