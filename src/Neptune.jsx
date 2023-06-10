/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

export default function Neptune(props) {
  const { nodes, materials } = useGLTF("/models/neptune-2.glb");


  return (
    <group
      {...props}
      dispose={null}
      onPointerOver={hoverHandler}
      onPointerOut={hoverHandler}
      ref={ref}
    >
      <group position={props.position}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle002_1.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle002_2.geometry}
          material={materials.Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle002_3.geometry}
          material={materials["Material.001"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/neptune-2.glb");
