/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Polaris({position, tile, scale}) {
  const { nodes, materials } = useGLTF("/models/polaris-2.glb"); // lights
  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere001.geometry}
        material={materials["Light Blue"]}
        position={position}
        rotation={[0, Math.PI/4, 0]}
        scale={scale}
      >
        <group
          position={[0, 1.111, 0]}
          rotation={[0, Math.PI / 4, 0]}
          scale={0.381}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane011.geometry}
            material={materials["Dark Blue"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane011_1.geometry}
            material={materials["Light Blue"]}
          />
        </group>
        <group
          position={[1.111, 0, 0]}
          rotation={[Math.PI / 4, 0, -Math.PI / 2]}
          scale={0.381}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane011_2.geometry}
            material={materials["Dark Blue"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane011_3.geometry}
            material={materials["Light Blue"]}
          />
        </group>
        <group
          position={[0, 0, -1.111]}
          rotation={[Math.PI / 2, Math.PI / 4, -Math.PI]}
          scale={0.381}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane011_4.geometry}
            material={materials["Dark Blue"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane011_5.geometry}
            material={materials["Light Blue"]}
          />
        </group>
        <group
          position={[0.636, 0.63, 0.636]}
          rotation={[Math.PI, Math.PI / 4, -2.182]}
          scale={0.288}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane011_6.geometry}
            material={materials["Dark Blue"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane011_7.geometry}
            material={materials["Light Blue"]}
          />
        </group>
      </mesh>
    </group>
  );
}
