import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function WolfConstellation(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('models/wolf-constellation-dhazele-2-new-mat.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="wolf"
          castShadow
          receiveShadow
          geometry={nodes.wolf.geometry}
          material={materials.Material}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.713}
        />
      </group>
    </group>
  )
}

useGLTF.preload('models/wolf-constellation-dhazele-2-new-mat.glb')
