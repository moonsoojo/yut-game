import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function NeptuneUneven({ position, tile }) {
  const { nodes, materials } = useGLTF("/models/neptune-uneven.glb");
  const positionNew = [position[0], position[1] - 0.315, position[2]];
  const neptuneRef = useRef();
  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime;
    neptuneRef.current.rotation.y += delta * 0.5;
  });
  return (
    <group ref={neptuneRef} position={positionNew} scale={0.15}>
      <group position={[0, 2.5, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_1.geometry}
          material={materials.Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_2.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_3.geometry}
          material={materials["Material.003"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle.geometry}
        material={materials["Material.003"]}
        position={[0, 2.5, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle001.geometry}
        material={materials["Material.001"]}
        position={[0, 2.5, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle002.geometry}
        material={materials["Material.003"]}
        position={[0, 2.5, 0]}
      />
    </group>
  );
}
