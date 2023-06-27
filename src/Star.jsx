import { useGLTF } from "@react-three/drei";
// import { useRef, useState, useEffect } from "react";
import RocketUpright from "./RocketUpright";
import Rocket from "./Rocket";
import { useSelector, useDispatch } from "react-redux";
import { placePiece } from "./state/gameSlice.js"

export default function Star({ position, index }) {
  const { nodes, materials } = useGLTF("/models/star-yellow.glb");

  const selection = useSelector((state) => state.game.selection);
  const tiles = useSelector((state) => state.game.tiles);
  // console.log(tiles) // displays up-to-date state
  const dispatch = useDispatch()

  function handlePointerDown(event) {
    event.stopPropagation();
    //tile will not be clicked unless a piece is selected already
    console.log('[Star] selection', selection) // works
    dispatch(placePiece({index, selection}))
  }

  const hoveringPosition = [position[0], position[1]+0.7, position[2]-0.2]

  return (
    <group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star.geometry}
        position={position}
        scale={0.1}
        onPointerDown={(event) => handlePointerDown(event)}
      >
        <meshStandardMaterial color={"yellow"} />
      </mesh>
      {tiles[index] != null  && <Rocket position={hoveringPosition} tile={index} team={tiles[index].team} />}
    </group>
  );
}