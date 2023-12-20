import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import HelperArrow from "./HelperArrow";
import React from "react";
import { useFrame } from "@react-three/fiber";
import Tile from "../components/Tile";

export default function Earth({ position, tile, device }) {
  const { nodes, materials } = useGLTF("/models/earth-round.glb");

  const earth = useRef();

  useFrame((state, delta) => {
    earth.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <group position={position} scale={0.4}>
      <group ref={earth} scale={1} rotation={[Math.PI / 16, Math.PI / 4, 0]}>
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
      <Tile tile={tile} wrapperRadius={0.5} device={device}/>
      <HelperArrow
        position={[1, 0, 0]}
        rotation={[0, 0, 0]}
        scale={0.9}
      />
    </group>
  );
}
