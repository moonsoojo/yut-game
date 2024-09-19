import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function AriesConstellation(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('models/aries-constellation-dhazele.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="BezierCurve001"
          castShadow
          receiveShadow
          geometry={nodes.BezierCurve001.geometry}
          material={materials['Material.003']}
          position={[0,0,0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.977}
        />
      </group>
    </group>
  )
}