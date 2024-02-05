import React from 'react';
import { useGLTF } from "@react-three/drei";

export default function CurvedArrow({position, scale, rotation, color}) {
  const { nodes, materials } = useGLTF("/models/curved-arrow.glb");
  let scaleArray;
  if (scale.length === 3) {
    scaleArray = scale
  } else {
    scaleArray=[1 * scale, 1 * scale, 0.8 * scale]
  }

  return (
    <group dispose={null} position={position} rotation={rotation} scale={scaleArray}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        position={[-0.159, 0, 1.224]}
        rotation={[0, 0.671, 0]}
        scale={[0.071, 0.053, 0.243]}
      >
        <meshStandardMaterial color={color}/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        position={[-0.513, 0, 0.619]}
        rotation={[-0.029, 0.42, -0.002]}
        scale={[0.071, 0.053, 0.243]}
        >
        <meshStandardMaterial color={color}/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        position={[-0.638, 0, -0.028]}
        rotation={[-0.026, -0.006, -0.014]}
        scale={[0.071, 0.053, 0.243]}
        >
        <meshStandardMaterial color={color}/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        position={[-0.502, 0, -0.665]}
        rotation={[-0.029, -0.474, -0.027]}
        scale={[0.071, 0.053, 0.243]}
        >
        <meshStandardMaterial color={color}/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        position={[-0.107, 0, -1.207]}
        rotation={[-3.106, 0.738, 3.104]}
        scale={[0.071, 0.053, 0.243]}
        >
        <meshStandardMaterial color={color}/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube006.geometry}
        position={[0.222, 0, 1.59]}
        rotation={[0.15, 0.924, -0.084]}
        scale={[0.071, 0.053, 0.149]}
        >
        <meshStandardMaterial color={color}/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cone.geometry}
        position={[0.438, 0, -1.7]}
        rotation={[Math.PI/2, 0, -2.4]}
        scale={[0.3, 0.33, 0.4]}
      >
        <meshStandardMaterial color={color}/>
      </mesh>
    </group>
  )
}