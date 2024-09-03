
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function RhinoConstellation(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('models/rhino-constellation-dhazele-2.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="rhino"
          castShadow
          receiveShadow
          geometry={nodes.rhino.geometry}
          material={materials.Material}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.713}
        />
      </group>
    </group>
  )
}

useGLTF.preload('models/rhino-constellation-dhazele-2.glb')
