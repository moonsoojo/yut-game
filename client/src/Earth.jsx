import { useGLTF, Text3D } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import Rocket from "./Rocket";
import Ufo from "./Ufo";
import HelperArrow from "./HelperArrow";
import ScoreButton from "./ScoreButton";
import React from "react";
import { useFrame } from "@react-three/fiber";
// import { useRocketStore } from "./state/zstore";
import { useRocketStore } from "./state/zstore2";
// import { selectionAtom, socket } from "./SocketManager";
import { useAtom } from "jotai";

export default function Earth({ position, tile }) {
  const { nodes, materials } = useGLTF("/models/earth-round.glb");

  // const [selection] = useAtom(selectionAtom);

  const setSelection = useRocketStore((state) => state.setSelection);
  const selection = useRocketStore((state) => state.selection);
  const setPiece = useRocketStore((state) => state.setPiece);
  const tiles = useRocketStore((state) => state.tiles);

  const earth1Ref = useRef();
  const earth2Ref = useRef();
  const earth3Ref = useRef();
  const earth4Ref = useRef();
  const earth5Ref = useRef();
  const earthWrapRef = useRef();
  const earthGroupRef = useRef();
  const wrapperMatRef = useRef();

  useFrame((state, delta) => {
    earthGroupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  function handlePointerEnter(event) {
    event.stopPropagation();
    document.body.style.cursor = "pointer";
    // earth1Ref.current.material.color.r += 0.1;
    // waterMatRef.current.color.r += 1;
    wrapperMatRef.current.opacity += 0.5;
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    document.body.style.cursor = "default";
    // earth1Ref.current.material.color.r -= 0.1;
    // waterMatRef.current.color.r -= 1;
    wrapperMatRef.current.opacity -= 0.5;
  }

  function handlePointerDown(event) {
    event.stopPropagation();
    if (selection == null) {
      setSelection({ type: "tile", tile });
      // socket.emit("select", { type: "tile", tile });
    } else {
      if (selection.tile != tile) {
        setPiece({ destination: tile });
      }
      setSelection(null);
      // socket.emit("select", null);
    }
  }

  const rocketPositions = [
    [0, 1, 0.25],
    [0, 1, 0],
    [-0.25, 1, 0.25],
    [-0.25, 1, 0],
  ];

  const ufoPositions = [
    [0, 0.6, 0],
    [0, 0.6, -0.25],
    [-0.3, 0.6, 0],
    [-0.3, 0.6, -0.25],
  ];

  function Piece() {
    if (tiles[tile][0].team == 1) {
      return (
        <>
          {tiles[tile].map((value, index) => (
            <Rocket
              position={rocketPositions[index]}
              keyName={`count${index}`}
              tile={tile}
              team={1}
              id={value.id}
              key={index}
              scale={0.7}
            />
          ))}
        </>
      );
    } else {
      return (
        <>
          {tiles[tile].map((value, index) => (
            <Ufo
              position={ufoPositions[index]}
              keyName={`count${index}`}
              tile={tile}
              team={0}
              id={value.id}
              key={index}
              scale={0.32}
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
        <sphereGeometry args={[2.5, 32, 16]} />
        <meshStandardMaterial transparent opacity={0} ref={wrapperMatRef} />
      </mesh>
    );
  }

  return (
    <group position={position}>
      <group
        scale={
          selection != null &&
          selection.type === "tile" &&
          selection.tile == tile
            ? 1.3
            : 1
        }
      >
        <group
          ref={earthGroupRef}
          scale={0.25}
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
        {tiles[tile].length != 0 && <Piece />}
        <HelperArrow
          position={[-0.5, 0, -0.5]}
          rotation={[Math.PI / 2, 0, (Math.PI * 5) / 8]}
          scale={0.9}
        />
      </group>
      <Text3D
        font="./fonts/Luckiest Guy_Regular.json"
        size={0.3}
        height={0.01}
        position={[-0.3, 0.8, 0.6]}
        rotation={[0, Math.PI / 2, 0]}
      >
        Start
        <meshStandardMaterial color="yellow" />
      </Text3D>
      <ScoreButton />
    </group>
  );
}
useGLTF.preload("./models/earth-round.glb");
