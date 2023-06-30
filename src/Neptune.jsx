import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import Rocket from "./Rocket";
import Ufo from "./Ufo";
import { useSelector, useDispatch } from "react-redux";
import { placePiece } from "./state/gameSlice.js"
// import { useFrame } from "@react-three/fiber"

export default function Neptune({ position, tile }) {
  const { nodes, materials } = useGLTF("/models/neptune.glb");

  const selection = useSelector((state) => state.game.selection);
  const tiles = useSelector((state) => state.game.tiles);
  const dispatch = useDispatch()

  const [neptune1Color, setNeptune1Color] = useState({});
  const [neptune2Color, setNeptune2Color] = useState({});
  const [neptune3Color, setNeptune3Color] = useState({});
  const neptune1Ref = useRef();
  const neptune2Ref = useRef();
  const neptune3Ref = useRef();
  const neptuneWrapRef = useRef();

  useEffect(() => {
    setNeptune1Color({
      r: neptune1Ref.current.material.color.toArray()[0],
      g: neptune1Ref.current.material.color.toArray()[1],
      b: neptune1Ref.current.material.color.toArray()[2],
    });
    setNeptune2Color({
      r: neptune2Ref.current.material.color.toArray()[0],
      g: neptune2Ref.current.material.color.toArray()[1],
      b: neptune2Ref.current.material.color.toArray()[2],
    });
    setNeptune3Color({
      r: neptune3Ref.current.material.color.toArray()[0],
      g: neptune3Ref.current.material.color.toArray()[1],
      b: neptune3Ref.current.material.color.toArray()[2],
    });
  }, []);

  function handlePointerDown(event) {
    console.log("click neptune")
    event.stopPropagation();
    //tile will not be clicked unless a piece is selected already
    dispatch(placePiece({tile, selection}))
  }

  function Piece() {
    let position2Start = position[2]-0.2 + tiles[tile].length * 0.05
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
        position={[position[0], position[1]+0.5, position2Start - index * 0.3 + 0.1]}
          keyName={ `count${index}`} 
          tile={tile} 
          team={0} 
          // ref={refs[index]}
        />
      )}</>
    }
  }

  function NeptuneWrap({ position }) {
    return (
      <mesh
        castShadow
        position={position}
        ref={neptuneWrapRef}
        visible={false}
        onPointerDown={(event) => handlePointerDown(event)}
      >
        <sphereGeometry args={[0.23, 32, 16]} />
      </mesh>
    );
  }

  return (
    <group dispose={null}>
      <group position={position} scale={0.15}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_1.geometry}
          material={materials.Material}
          ref={neptune1Ref}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_2.geometry}
          material={materials["Material.001"]}
          ref={neptune2Ref}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_3.geometry}
          material={materials["Material.003"]}
          ref={neptune3Ref}
        />
      </group>
      <NeptuneWrap position={position}/>
      {tiles[tile].length != 0 && <Piece/>}
    </group>
  );
}

