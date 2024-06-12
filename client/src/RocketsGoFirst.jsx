import { Text3D, useGLTF } from "@react-three/drei";
import { animated } from "@react-spring/three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Star from "./meshes/Star";

export default function RocketsGoFirst({ position, rotation, scale }) {
  console.log(`[RocketsGoFirst]`)
  const { nodes, materials } = useGLTF('models/alert-background.glb')

  const borderMesh0Ref = useRef();
  const borderMesh1Ref = useRef();
  const borderMesh2Ref = useRef();
  const borderMesh3Ref = useRef();
  const borderMesh4Ref = useRef();
  const borderMesh5Ref = useRef();
  const borderMesh6Ref = useRef();
  const borderMeshRefs = [
    borderMesh0Ref,
    borderMesh1Ref,
    borderMesh2Ref,
    borderMesh3Ref,
    borderMesh4Ref,
    borderMesh5Ref,
    borderMesh6Ref
  ]

  let height = 0.8
  let width = 1.5
  useFrame((state, delta) => {
    for (let i = 0; i < borderMeshRefs.length; i++) {      
      borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
      borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
    }
  })

  return (
    <animated.group position={position} rotation={rotation} scale={scale}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={nodes.Cylinder.material}
        scale={[0.8, 0.03, 1.5]}
      >
        <meshStandardMaterial color='black' opacity={0.9} transparent/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        rotation={[Math.PI/2, Math.PI, Math.PI/2]}
        position={[0.1, 0, -0.9]}
        size={0.22}
        height={0.05}
      >
        {`TEAM ROCKET\nGOES FIRST!`}
        <meshStandardMaterial color="red"/>
      </Text3D>
      <group name='border'>
        <group ref={borderMesh0Ref}>
          <Star position={[0, 0, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={0.08} color='red'/>
        </group>
        <group ref={borderMesh1Ref}>
          <Star position={[0, 0, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={0.08} color='red'/>
        </group>
        <group ref={borderMesh2Ref}>
          <Star position={[0, 0, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={0.08} color='red'/>
        </group>
        <group ref={borderMesh3Ref}>
          <Star position={[0, 0, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={0.08} color='red'/>
        </group>
        <group ref={borderMesh4Ref}>
          <Star position={[0, 0, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={0.08} color='red'/>
        </group>
        <group ref={borderMesh5Ref}>
          <Star position={[0, 0, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={0.08} color='red'/>
        </group>
        <group ref={borderMesh6Ref}>
          <Star position={[0, 0, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={0.08} color='red'/>
        </group>
      </group>
    </animated.group>
  )
}