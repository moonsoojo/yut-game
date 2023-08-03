import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import Rocket from "./Rocket";
import Ufo from "./Ufo";
import { useSelector, useDispatch } from "react-redux";
import { placePiece } from "./state/gameSlice.js";
import React from "react";
import { useFrame } from "@react-three/fiber";

export default function Earth({ position, tile, envMapIntensity }) {
  const { nodes, materials } = useGLTF("/models/earth-round.glb");

  // const selection = useSelector((state) => state.game.selection);
  // const tiles = useSelector((state) => state.game.tiles);
  // const dispatch = useDispatch();
  const earth1Ref = useRef();
  const earth2Ref = useRef();
  const earth3Ref = useRef();
  const earth4Ref = useRef();
  const earth5Ref = useRef();
  const earthWrapRef = useRef();
  const earthGroupRef = useRef();

  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime;
    earthGroupRef.current.rotation.y += delta * 0.5;
  });

  function handlePointerEnter(event) {
    event.stopPropagation();
    earth1Ref.current.material.color.r += 0.1;
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    earth1Ref.current.material.color.r -= 0.1;
  }

  function handlePointerDown(event) {
    event.stopPropagation();
    //tile will not be clicked unless a piece is selected already
    dispatch(placePiece({ tile, selection }));
  }

  function Piece() {
    let position2Start = position[2] - 0.2 + tiles[tile].length * 0.05;
    if (tiles[tile][0].team == 1) {
      return (
        <>
          {tiles[tile].map((value, index) => (
            <Rocket
              position={[
                position[0] - 0.2,
                position[1] + 0.8,
                position2Start - index * 0.2,
              ]}
              keyName={`count${index}`}
              tile={tile}
              team={1}
              id={value.id}
            />
          ))}
        </>
      );
    } else {
      return (
        <>
          {tiles[tile].map((value, index) => (
            <Ufo
              position={[
                position[0] - 0.3,
                position[1] + 0.5,
                position2Start - index * 0.3 + 0.2,
              ]}
              keyName={`count${index}`}
              tile={tile}
              team={0}
              id={value.id}
            />
          ))}
        </>
      );
    }
  }

  function EarthWrap() {
    return (
      <mesh
        castShadow
        ref={earthWrapRef}
        visible={true}
        onPointerDown={(event) => handlePointerDown(event)}
        onPointerEnter={(event) => handlePointerEnter(event)}
        onPointerLeave={(event) => handlePointerLeave(event)}
      >
        <sphereGeometry args={[4, 32, 16]} />
        <meshStandardMaterial transparent opacity={0.1} />
      </mesh>
    );
  }

  return (
    <>
      <group
        ref={earthGroupRef}
        scale={0.15}
        position={position}
        rotation={[Math.PI / 16, Math.PI / 4, 0]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.low_poly_earth.geometry}
          material={materials.water}
          position={[0, 0.12, 0]}
          rotation={[-0.4, -0.4, 0.3]}
          ref={earth1Ref}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder.geometry}
            material={materials["Material.001"]}
            position={[1.1, 0.98, 0.38]}
            rotation={[0.49, 0.02, 0.39]}
            ref={earth2Ref}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane.geometry}
              material={materials.Material}
              position={[0.24, 1.29, 0]}
              scale={0.77}
              ref={earth3Ref}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh.geometry}
            material={materials.water}
            ref={earth4Ref}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_1.geometry}
            material={materials.earth}
            ref={earth5Ref}
          />
        </mesh>
        <EarthWrap />
      </group>
      {/* {tiles[tile].length != 0 && <Piece />} */}
    </>
  );
}
