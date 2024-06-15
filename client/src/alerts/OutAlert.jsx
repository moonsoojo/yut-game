import { Text3D, useGLTF } from "@react-three/drei";
import { animated } from "@react-spring/three";

export default function OutAlert({ position, rotation, scale }) {
  const { nodes, materials } = useGLTF('models/alert-background.glb')
  return (
    <animated.group position={position} rotation={rotation} scale={scale}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={nodes.Cylinder.material}
        scale={[0.82, 0.055, 1.771]}
      >
        <meshStandardMaterial color='black' opacity={0.9} transparent/>
      </mesh>
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={nodes.Cylinder.material}
        scale={[0.75, 0.065, 1.671]}
      >
        <meshStandardMaterial color='#8A3115'/>
      </mesh> */}
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        rotation={[Math.PI/2, Math.PI, Math.PI/2]}
        position={[-0.28, 0, -0.9]}
        size={0.6}
        height={0.1}
      >
        OUT!
        <meshStandardMaterial color="yellow"/>
      </Text3D>
    </animated.group>
  )
}