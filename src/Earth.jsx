import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import Rocket from "./Rocket";
import Ufo from "./Ufo";
import { useSelector, useDispatch } from "react-redux";
import { placePiece } from "./state/gameSlice.js"

export default function Earth({ position, tile }) {
  const { nodes, materials } = useGLTF("/models/earth-round.glb");

  const selection = useSelector((state) => state.game.selection);
  const tiles = useSelector((state) => state.game.tiles);
  const dispatch = useDispatch()

  const [earth1Color, setEarth1Color] = useState({});
  const [earth2Color, setEarth2Color] = useState({});
  const [earth3Color, setEarth3Color] = useState({});
  const [earth4Color, setEarth4Color] = useState({});
  const [earth5Color, setEarth5Color] = useState({});
  const earth1Ref = useRef();
  const earth2Ref = useRef();
  const earth3Ref = useRef();
  const earth4Ref = useRef();
  const earth5Ref = useRef();
  const earthWrapRef = useRef();

  function handlePointerDown(event) {
    console.log("click")
    event.stopPropagation();
    //tile will not be clicked unless a piece is selected already
    dispatch(placePiece({tile, selection}))
  }

  function Piece() {
    let position2Start = position[2]-0.2 + tiles[tile].length * 0.05
    if (tiles[tile][0].team == 1) {
      return <>{tiles[tile].map((value, index) => 
        <Rocket
          position={[position[0]-0.2, position[1]+0.8, position2Start - index * 0.2]}
          keyName={ `count${index}`}
          tile={tile}
          team={1}
          // ref={refs[index]}
        />
      )}</>
    } else {
      return <>{tiles[tile].map((value, index) => 
        <Ufo 
          position={[position[0]-0.3, position[1]+0.5, position2Start - index * 0.3 + 0.2]}
          keyName={ `count${index}`} 
          tile={tile} 
          team={0} 
          // ref={refs[index]}
        />
      )}</>
    }
  }

  useEffect(() => {
    //can only set state variables
    setEarth1Color({
      r: earth1Ref.current.material.color.toArray()[0],
      g: earth1Ref.current.material.color.toArray()[1],
      b: earth1Ref.current.material.color.toArray()[2],
    });
    setEarth2Color({
      r: earth2Ref.current.material.color.toArray()[0],
      g: earth2Ref.current.material.color.toArray()[1],
      b: earth2Ref.current.material.color.toArray()[2],
    });
    setEarth3Color({
      r: earth3Ref.current.material.color.toArray()[0],
      g: earth3Ref.current.material.color.toArray()[1],
      b: earth3Ref.current.material.color.toArray()[2],
    });
    setEarth4Color({
      r: earth4Ref.current.material.color.toArray()[0],
      g: earth4Ref.current.material.color.toArray()[1],
      b: earth4Ref.current.material.color.toArray()[2],
    });
    setEarth5Color({
      r: earth5Ref.current.material.color.toArray()[0],
      g: earth5Ref.current.material.color.toArray()[1],
      b: earth5Ref.current.material.color.toArray()[2],
    });
  }, []);

  function EarthWrap({ position }) {
    return (
      <mesh
        castShadow
        position={position}
        ref={earthWrapRef}
        visible={true}
        onPointerDown={(event) => handlePointerDown(event)}
      >
        <sphereGeometry args={[1.9, 32, 16]} />
        <meshStandardMaterial transparent opacity={0.1}/>
      </mesh>
    );
  }

  return (
    <>
      <group scale={0.15} position={position} rotation={[Math.PI/16, Math.PI/4, 0]}>
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
        <EarthWrap position={[position[0]-2.9, position[1]-0.4, position[2]-0.4]} />
      </group>
      {tiles[tile].length != 0 && <Piece/>}
    </>
  );
}

