import React from "react";
import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";
import Rocket from "./Rocket";
import Ufo from "./Ufo";

import { useRocketStore } from "./state/zstore2";

export default function Sun2({ position, tile }) {
  const setSelection = useRocketStore((state) => state.setSelection);
  const selection = useRocketStore((state) => state.selection);
  const setPiece = useRocketStore((state) => state.setPiece);
  const tiles = useRocketStore((state) => state.tiles);

  const shaderRef = useRef();
  const wrapperMatRef = useRef();

  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime;
    shaderRef.current.uniforms.time.value = elapsedTime;
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
    } else {
      setPiece({ destination: tile });
      setSelection(null);
    }
  }

  const rocketPositions = [
    [0, 0.7, 0 * 0.3],
    [0, 0.7, -1 * 0.3],
    [-0.3, 0.7, 0 * 0.3],
    [-0.3, 0.7, -1 * 0.3],
  ];

  const ufoPositions = [
    [0, 0.3, 1 * 0.3],
    [0, 0.3, -1 * 0.3],
    [-0.3, 0.3, 1 * 0.3],
    [-0.3, 0.3, -1 * 0.3],
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
            />
          ))}
        </>
      );
    }
  }

  return (
    <>
      <mesh
        position={position}
        scale={
          selection != null &&
          selection.type === "tile" &&
          selection.tile == tile
            ? 1.5
            : 1
        }
      >
        <mesh
          castShadow
          visible={true}
          onPointerDown={(event) => handlePointerDown(event)}
          onPointerEnter={(event) => handlePointerEnter(event)}
          onPointerLeave={(event) => handlePointerLeave(event)}
        >
          <sphereGeometry args={[0.8, 32, 16]} />
          <meshStandardMaterial transparent opacity={0} ref={wrapperMatRef} />
        </mesh>
        <sphereGeometry args={[0.35, 30, 30]} />
        <shaderMaterial
          ref={shaderRef}
          side={THREE.DoubleSide}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={{
            time: { value: 0 },
            resolution: { value: new THREE.Vector4() },
          }}
        />
        {tiles[tile].length != 0 && <Piece />}
      </mesh>
    </>
  );
}
