import { useGLTF } from "@react-three/drei";
import Rocket from "./Rocket";
import Ufo from "./Ufo";
import { useSelector, useDispatch } from "react-redux";
import { placePiece } from "./state/gameSlice.js";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import React from "react";

export default function Mars({ position, tile }) {
  const { nodes, materials } = useGLTF("/models/Mars 4.glb");

  const selection = useSelector((state) => state.game.selection);
  const tiles = useSelector((state) => state.game.tiles);
  const dispatch = useDispatch();
  const marsRef = useRef();

  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime;
    marsRef.current.rotation.y += delta * 0.5;
  });

  function handlePointerDown(event) {
    event.stopPropagation();
    //tile will not be clicked unless a piece is selected already
    dispatch(placePiece({ tile, selection }));
  }

  function Piece() {
    let position2Start = position[2] - 0.2 + tiles[tile].length * 0.1;
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
                position2Start - index * 0.3 + 0.3,
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

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mars.geometry}
        material={materials.Mars}
        position={position}
        scale={0.25}
        onPointerDown={(event) => handlePointerDown(event)}
        ref={marsRef}
      />
      {tiles[tile].length != 0 && <Piece />}
    </group>
  );
}
