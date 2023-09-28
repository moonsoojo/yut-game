import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import HelperArrow from "./HelperArrow";
import React from "react";
import { useFrame } from "@react-three/fiber";
import Tile from "./components/Tile";

export default function Earth({ position, tile }) {
  const { nodes, materials } = useGLTF("/models/earth-round.glb");

  const earth = useRef();

  useFrame((state, delta) => {
    earth.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <group position={position}>
      <group ref={earth} scale={0.25} rotation={[Math.PI / 16, Math.PI / 4, 0]}>
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
      <Tile tileIndex={tile} wrapperRadius={0.5} />
      <HelperArrow
        position={[-0.5, 0, -0.5]}
        rotation={[Math.PI / 2, 0, (Math.PI * 5) / 8]}
        scale={0.9}
      />
    </group>
  );
}
useGLTF.preload("./models/earth-round.glb");
