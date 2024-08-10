import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function PegasusConstellation(props) {
  const { nodes, materials } = useGLTF('models/pegasus-constellation.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath029.geometry}
        material={materials['Material.002']}
        position={[5.345, 0.222, -5.28]}
        rotation={[0, 0.478, 0]}
        scale={[0.404, 0.281, 0.427]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath028.geometry}
        material={materials['Material.002']}
        position={[-6.11, 0.397, -5.897]}
        scale={0.136}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath027.geometry}
        material={materials['Material.002']}
        position={[4.72, 0.344, 3.658]}
        scale={0.298}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath026.geometry}
        material={materials['Material.002']}
        position={[-8.465, 0.338, -6.077]}
        rotation={[0, -0.995, 0]}
        scale={0.381}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath025.geometry}
        material={materials['Material.002']}
        position={[-8.108, 0.339, -0.9]}
        rotation={[0, -1.162, 0]}
        scale={0.136}
      />
    </group>
  )
}

useGLTF.preload('models/pegasus-constellation.glb')
