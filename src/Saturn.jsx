import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";

export default function Saturn({ position }) {
    const { nodes, materials } = useGLTF("/models/Saturn 3.glb");

    const saturnWrapRef = useRef();

    function SaturnWrap({ position }) {
        return (
          <mesh
            castShadow
            position={position}
            ref={saturnWrapRef}
            visible={false}
          >
            <sphereGeometry args={[0.23, 32, 16]} />
          </mesh>
        );
      }

    return (
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={materials["Saturn 2"]}
          position={position}
          scale={0.2}
        >
          <group scale={0.63}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_1.geometry}
              material={materials["Material.003"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_2.geometry}
              material={materials["Material.004"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_3.geometry}
              material={materials["Material.005"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_4.geometry}
              material={materials["Material.006"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_5.geometry}
              material={materials["Material.007"]}
            />
          </group>
        </mesh>
        <SaturnWrap position={position}/>
      </group>
    );
  }

