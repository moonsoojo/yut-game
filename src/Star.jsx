import { useGLTF } from "@react-three/drei";
// import { useRef, useState, useEffect } from "react";
import RocketUpright from "./RocketUpright";
import Rocket from "./Rocket";
import Ufo from "./Ufo";
import { useSelector, useDispatch } from "react-redux";
import { placePiece } from "./state/gameSlice.js"

export default function Star({ position, tile }) {
  const { nodes, materials } = useGLTF("/models/star-yellow.glb");

  const selection = useSelector((state) => state.game.selection);
  const tiles = useSelector((state) => state.game.tiles);
  // console.log(tiles) // displays up-to-date state
  const dispatch = useDispatch()

  function handlePointerDown(event) {
    event.stopPropagation();
    //tile will not be clicked unless a piece is selected already
    // console.log('[Star] selection', selection) // works
    dispatch(placePiece({tile, selection}))
  }

  function Piece() {
    if (tiles[tile][0].team == 1) {
      const hoveringPositionRocket = [position[0], position[1]+0.6, position[2]-0.2]
      return <Rocket position={hoveringPositionRocket} tile={tile} team={tiles[tile][0].team} />
    } else {
      const hoveringPositionUfo = [position[0], position[1]+0.4, position[2]]
      return <Ufo position={hoveringPositionUfo} tile={tile} team={tiles[tile][0].team} />
    }
  }

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
      {tiles[tile].length != 0 && <Piece/>}
    </group>
  );
}