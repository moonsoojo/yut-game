import { useGLTF } from "@react-three/drei";
import Rocket from "./Rocket";
import Ufo from "./Ufo";
import { useSelector, useDispatch } from "react-redux";
import { placePiece } from "./state/gameSlice.js"

export default function Star({ position, tile }) {
  const { nodes, materials } = useGLTF("/models/star-yellow.glb");

  const selection = useSelector((state) => state.game.selection);
  const tiles = useSelector((state) => state.game.tiles);
  const dispatch = useDispatch()

  function handlePointerDown(event) {
    event.stopPropagation();
    //tile will not be clicked unless a piece is selected already
    dispatch(placePiece({tile, selection}))
  }

  /*function Rockets(count) {
    if (count == 1) {
      return <Rocket
          position={[position[0], position[1]+0.6, position[2]-0.2]}
          keyName={ `count${0}`}
          tile={tile}
          team={1}
      />
    } else if (count == 2) {
      return <>
        <Rocket
          position={[position[0]-0.1, position[1]+0.6, position[2]-0.2]}
          keyName={ `count${0}`}
          tile={tile}
          team={1}
        />
        <Rocket
          position={[position[0]-0.1, position[1]+0.6, position[2]-0.4]}
          keyName={ `count${1}`}
          tile={tile}
          team={1}
        />
      </>
    } else if (count == 3) {
      return <>
        <Rocket
          position={[position[0]-0.1, position[1]+0.6, position[2]-0.2]}
          keyName={ `count${0}`}
          tile={tile}
          team={1}
        />
        <Rocket
          position={[position[0]-0.1, position[1]+0.6, position[2]-0.4]}
          keyName={ `count${1}`}
          tile={tile}
          team={1}
        />
        <Rocket
          position={[position[0] - 0.3, position[1]+0.6, position[2]-0.4]}
          keyName={ `count${2}`}
          tile={tile}
          team={1}
        />
      </>
    } else if (count == 4) {
      return <>
      <Rocket
        position={[position[0]-0.1, position[1]+0.6, position[2]-0.2]}
        keyName={ `count${0}`}
        tile={tile}
        team={1}
      />
      <Rocket
        position={[position[0]-0.1, position[1]+0.6, position[2]-0.4]}
        keyName={ `count${1}`}
        tile={tile}
        team={1}
      />
      <Rocket
        position={[position[0] - 0.3, position[1]+0.6, position[2]-0.4]}
        keyName={ `count${2}`}
        tile={tile}
        team={1}
      />
      <Rocket
        position={[position[0] - 0.3, position[1]+0.6, position[2]-0.2]}
        keyName={ `count${3}`}
        tile={tile}
        team={1}
      />
    </>
    }
  } */

  function Piece() {
    let position2Start = position[2]-0.2 + tiles[tile].length * 0.05
    if (tiles[tile][0].team == 1) {
      return <>{tiles[tile].map((value, index) => 
        <Rocket
          position={[position[0]-0.1, position[1]+0.6, position2Start - index * 0.3]}
          keyName={ `count${index}` }
          tile={tile}
          team={1}
        />
      )}</>
    } else {
      return <>{tiles[tile].map((value, index) => 
        <Ufo 
          position={[position[0]-0.1, position[1]+0.4, position2Start +0.2- index * 0.3]}
          keyName={ `count${index}`} 
          tile={tile} 
          team={0} 
        />
      )}</>
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