import { useGLTF } from "@react-three/drei";
import Rocket from "./Rocket";

export default function Mars({ position }) {
    const { nodes, materials } = useGLTF("/models/Mars 4.glb");
    return (
      <group dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mars.geometry}
          material={materials.Mars}
          position={position}
          scale={0.25}
        />
      </group>
    );
  }