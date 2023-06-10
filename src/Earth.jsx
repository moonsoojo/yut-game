import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

export default function Earth(props) {
  const { nodes, materials } = useGLTF("/models/earth-round.glb");

  return (
    <group
      {...props}
      dispose={null}
      onPointerOver={hoverHandler}
      onPointerOut={hoverHandler}
      ref={ref}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.low_poly_earth.geometry}
        material={materials.water}
        position={[0, 0.12, 0]}
        rotation={[-0.4, -0.4, 0.3]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={materials["Material.001"]}
          position={[1.1, 0.98, 0.38]}
          rotation={[0.49, 0.02, 0.39]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane.geometry}
            material={materials.Material}
            position={[0.24, 1.29, 0]}
            scale={0.77}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh.geometry}
          material={materials.water}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_1.geometry}
          material={materials.earth}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/earth-2.glb");
