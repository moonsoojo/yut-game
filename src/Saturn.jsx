import { useGLTF } from "@react-three/drei";
import { useSelector, useDispatch } from "react-redux";
import { placePiece } from "./state/gameSlice.js";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import React from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useLoader } from "@react-three/fiber";

import Rocket from "./Rocket";
import Ufo from "./Ufo";

export default function Saturn({ position, tile, scale }) {
  const { nodes, materials } = useGLTF("/models/Saturn 3.glb");
  const satelliteTexture1 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-1.jpg"
  );
  const satelliteTexture2 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-2.jpg"
  );
  const satelliteTexture3 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-3.jpg"
  );
  const satelliteTexture4 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-4.jpg"
  );
  const satelliteTexture5 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-5.jpg"
  );
  const satelliteTexture6 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-6.jpg"
  );
  const satelliteTexture7 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-7.jpg"
  );

  // const selection = useSelector((state) => state.game.selection);
  // const tiles = useSelector((state) => state.game.tiles);
  // const dispatch = useDispatch();
  const saturnRef = useRef();
  const satellitesRef = useRef();

  useFrame((state, delta) => {
    saturnRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    satellitesRef.current.rotation.x = state.clock.elapsedTime * 0.5;
  });

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
                position[0],
                position[1] + 0.7,
                position2Start - index * 0.2,
              ]}
              keyName={`count${index}`}
              tile={tile}
              team={1}
              // ref={refs[index]}
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
                position[0],
                position[1] + 0.7,
                position2Start - index * 0.3 + 0.1,
              ]}
              keyName={`count${index}`}
              tile={tile}
              team={0}
              // ref={refs[index]}
            />
          ))}
        </>
      );
    }
  }

  const saturnWrapRef = useRef();

  function SaturnWrap() {
    return (
      <mesh
        castShadow
        ref={saturnWrapRef}
        visible={true}
        onPointerDown={(event) => handlePointerDown(event)}
      >
        <sphereGeometry args={[3, 32, 16]} />
        <meshStandardMaterial transparent opacity={0.1} />
      </mesh>
    );
  }

  return (
    <group scale={0.2} position={position}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={materials["Saturn 2"]}
        ref={saturnRef}
      >
        <group scale={0.625}>
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
        <group ref={satellitesRef} scale={5}>
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.05, 32, 32]} />
            <meshStandardMaterial color={"#A59272"} map={satelliteTexture1} />
          </mesh>
          <mesh
            position={[
              0,
              Math.cos(Math.PI / 4) * 0.5,
              Math.sin(Math.PI / 4) * 0.5,
            ]}
          >
            <sphereGeometry args={[0.04, 32, 32]} />
            <meshStandardMaterial color={"#7A7974"} map={satelliteTexture2} />
          </mesh>
          <mesh
            position={[
              0,
              Math.cos((7 * Math.PI) / 16) * 0.5,
              Math.sin((7 * Math.PI) / 16) * 0.5,
            ]}
          >
            <sphereGeometry args={[0.03, 32, 32]} />
            <meshStandardMaterial color={"#A9ABA8"} map={satelliteTexture3} />
          </mesh>
          <mesh
            position={[
              0,
              Math.cos((16 * Math.PI) / 16) * 0.5,
              Math.sin((16 * Math.PI) / 16) * 0.5,
            ]}
          >
            <sphereGeometry args={[0.03, 32, 32]} />
            <meshStandardMaterial color={"#B0B0B0"} map={satelliteTexture4} />
          </mesh>
          <mesh
            position={[
              0,
              Math.cos((19 * Math.PI) / 16) * 0.5,
              Math.sin((19 * Math.PI) / 16) * 0.5,
            ]}
          >
            <sphereGeometry args={[0.025, 32, 32]} />
            <meshStandardMaterial color={"#9D9E98"} map={satelliteTexture5} />
          </mesh>
          <mesh
            position={[
              0,
              Math.cos((22 * Math.PI) / 16) * 0.5,
              Math.sin((22 * Math.PI) / 16) * 0.5,
            ]}
          >
            <sphereGeometry args={[0.02, 32, 32]} />
            <meshStandardMaterial color={"#8F8F8F"} map={satelliteTexture6} />
          </mesh>
          <mesh
            position={[
              0,
              Math.cos((24 * Math.PI) / 16) * 0.5,
              Math.sin((24 * Math.PI) / 16) * 0.5,
            ]}
          >
            <sphereGeometry args={[0.015, 32, 32]} />
            <meshStandardMaterial color={"#8F8F8F"} map={satelliteTexture7} />
          </mesh>
        </group>
      </mesh>

      <SaturnWrap />
      {/* {tiles[tile].length != 0 && <Piece />} */}
    </group>
  );
}
