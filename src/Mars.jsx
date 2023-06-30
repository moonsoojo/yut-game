import { useGLTF } from "@react-three/drei";
import Rocket from "./Rocket";
import Ufo from "./Ufo";
import { useSelector, useDispatch } from "react-redux";
import { placePiece } from "./state/gameSlice.js"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react";

export default function Mars({ position, tile }) {
    const { nodes, materials } = useGLTF("/models/Mars 4.glb");

    const selection = useSelector((state) => state.game.selection);
    const tiles = useSelector((state) => state.game.tiles);
    const dispatch = useDispatch()
    // let refs = [];
    // let numPieces = tiles[tile].length

    // causes `Uncaught Error: Rendered more hooks than during the previous render.`
    // for (let i = 0; i < numPieces; i++) {
    //   refs.push(useRef())
    // }
  
    function handlePointerDown(event) {
      event.stopPropagation();
      //tile will not be clicked unless a piece is selected already
      dispatch(placePiece({tile, selection}))
    }

    function Piece() {
      let position2Start = position[2]-0.2 + tiles[tile].length * 0.1
      if (tiles[tile][0].team == 1) {
        return <>{tiles[tile].map((value, index) => 
          <Rocket
            position={[position[0], position[1]+0.7, position2Start - index * 0.2]}
            keyName={ `count${index}`}
            tile={tile}
            team={1}
            // ref={refs[index]}
          />
        )}</>
      } else {
        return <>{tiles[tile].map((value, index) => 
          <Ufo 
          position={[position[0], position[1]+0.7, position2Start - index * 0.3 + 0.3]}
            keyName={ `count${index}`} 
            tile={tile} 
            team={0} 
            // ref={refs[index]}
          />
        )}</>
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
        />
        {tiles[tile].length != 0 && <Piece/>}
      </group>
    );
  }