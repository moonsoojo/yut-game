import { Text3D } from "@react-three/drei";

export default function BackdoToken(props) {

  return <group {...props}>
    <group name='move-token'>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        rotation={[Math.PI/2, Math.PI, Math.PI/2]}
        position={[-0.17,-0.01,-0.2]}
        size={0.35}
        height={0.1}
      >
        -1
        <meshStandardMaterial color="yellow"/>
      </Text3D>
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.1]}/>
        <meshStandardMaterial color='yellow'/>
      </mesh>
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.11]}/>
        <meshStandardMaterial color='#8A3115'/>
      </mesh>
    </group>
  </group>
}