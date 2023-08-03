import React from "react";
import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useSelector, useDispatch } from "react-redux";
import { placePiece } from "./state/gameSlice.js";

import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";
import Rocket from "./Rocket";
import Ufo from "./Ufo";

export default function Sun2({ position, tile }) {
  const selection = useSelector((state) => state.game.selection);
  const tiles = useSelector((state) => state.game.tiles);
  const dispatch = useDispatch();

  const shaderRef = useRef();
  const wrapRef = useRef();

  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime;
    shaderRef.current.uniforms.time.value = elapsedTime;
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
              position={[position[0], position[1], position[2] - index * 0.2]}
              keyName={`count${index}`}
              tile={tile}
              team={1}
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
            />
          ))}
        </>
      );
    }
  }

  return (
    <>
      <mesh position={position}>
        <mesh
          castShadow
          ref={wrapRef}
          visible={true}
          onPointerDown={(event) => handlePointerDown(event)}
        >
          <sphereGeometry args={[0.8, 32, 16]} />
          <meshStandardMaterial transparent opacity={0.1} />
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