import { useGLTF } from "@react-three/drei";

export default function star({ position, scale }) {
  const { nodes, materials } = useGLTF("/models/star.glb");

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.star.geometry}
      material={materials.GlowingStar}
      position={position}
      scale={scale}
    />
  );
}
