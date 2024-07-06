import { Text3D } from "@react-three/drei";

export default function MoToken(props) {

  return <group {...props}>
    <group name='move-token'>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        rotation={[Math.PI/2, Math.PI, Math.PI/2]}
        position={[-0.2,-0.01,-0.14]}
        size={0.4}
        height={0.1}
      >
        5
        <meshStandardMaterial color="yellow"/>
      </Text3D>
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.1]}/>
        <meshStandardMaterial color='yellow'/>
      </mesh>
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.11]}/>
        <meshStandardMaterial color='black' opacity={1}/>
      </mesh>
    </group>
  </group>
}