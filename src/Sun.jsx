/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import Rocket from "./Rocket";
import Ufo from "./Ufo";
import { useSelector, useDispatch } from "react-redux";
import { placePiece } from "./state/gameSlice.js"

export default function Sun({position, tile, scale}) {
  const { nodes, materials } = useGLTF("/models/Sun 03.glb");

  const selection = useSelector((state) => state.game.selection);
  const tiles = useSelector((state) => state.game.tiles);
  const dispatch = useDispatch()

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
        />
      )}</>
    } else {
      return <>{tiles[tile].map((value, index) => 
        <Ufo 
          position={[position[0], position[1]+0.5, position2Start - index * 0.3 + 0.2]}
          keyName={ `count${index}`} 
          tile={tile} 
          team={0} 
        />
      )}</>
    }
  }

  function SunWrap() {
    return (
      <mesh
        castShadow
        // position={position}
        ref={SunWrap}
        visible={true}
        onPointerDown={(event) => handlePointerDown(event)}
      >
        <sphereGeometry args={[0.2, 32, 16]} />
        <meshStandardMaterial transparent opacity={0.1}/>
      </mesh>
    );
  }

  return (
    <>
      <group position={position}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={materials.Yellow}
          rotation={[0, Math.PI/2, 0]}
          scale={scale}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane.geometry}
            material={materials.Orange}
            position={[0, 1, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.717, 0.972, 1.114]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane001.geometry}
            material={materials.Orange}
            position={[0.707, 0.707, 0]}
            rotation={[Math.PI / 2, -Math.PI / 4, 0]}
            scale={[0.717, 0.972, 1.114]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane002.geometry}
            material={materials.Orange}
            position={[1, 0, 0]}
            rotation={[Math.PI / 2, -Math.PI / 2, 0]}
            scale={[0.717, 0.972, 1.114]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane003.geometry}
            material={materials.Orange}
            position={[0.707, -0.707, 0]}
            rotation={[-Math.PI / 2, -Math.PI / 4, -Math.PI]}
            scale={[0.717, 0.972, 1.114]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane004.geometry}
            material={materials.Orange}
            position={[0, -1, 0]}
            rotation={[-Math.PI / 2, 0, Math.PI]}
            scale={[0.717, 0.972, 1.114]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane005.geometry}
            material={materials.Orange}
            position={[-0.707, -0.707, 0]}
            rotation={[-Math.PI / 2, Math.PI / 4, -Math.PI]}
            scale={[0.717, 0.972, 1.114]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane006.geometry}
            material={materials.Orange}
            position={[-1, 0, 0]}
            rotation={[Math.PI / 2, Math.PI / 2, 0]}
            scale={[0.717, 0.972, 1.114]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane007.geometry}
            material={materials.Orange}
            position={[-0.707, 0.707, 0]}
            rotation={[Math.PI / 2, Math.PI / 4, 0]}
            scale={[0.717, 0.972, 1.114]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane011.geometry}
            material={materials.Orange}
            position={[0.383, 0.924, 0]}
            rotation={[Math.PI / 2, -Math.PI / 8, 0]}
            scale={[0.717, 0.972, 1.114]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane017.geometry}
            material={materials.Orange}
            position={[0.924, 0.383, 0]}
            rotation={[Math.PI / 2, -1.178, 0]}
            scale={[0.717, 0.972, 1.114]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane018.geometry}
            material={materials.Orange}
            position={[0.924, -0.383, 0]}
            rotation={[-Math.PI / 2, -1.178, -Math.PI]}
            scale={[0.717, 0.972, 1.114]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane019.geometry}
            material={materials.Orange}
            position={[0.383, -0.924, 0]}
            rotation={[-Math.PI / 2, -Math.PI / 8, -Math.PI]}
            scale={[0.717, 0.972, 1.114]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane020.geometry}
            material={materials.Orange}
            position={[-0.383, -0.924, 0]}
            rotation={[-Math.PI / 2, Math.PI / 8, Math.PI]}
            scale={[0.717, 0.972, 1.114]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane021.geometry}
            material={materials.Orange}
            position={[-0.924, -0.383, 0]}
            rotation={[-Math.PI / 2, 1.178, Math.PI]}
            scale={[0.717, 0.972, 1.114]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane022.geometry}
            material={materials.Orange}
            position={[-0.924, 0.383, 0]}
            rotation={[Math.PI / 2, 1.178, 0]}
            scale={[0.717, 0.972, 1.114]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane024.geometry}
            material={materials.Orange}
            position={[-0.383, 0.924, 0]}
            rotation={[Math.PI / 2, Math.PI / 8, 0]}
            scale={[0.717, 0.972, 1.114]}
          />
        </mesh>
        <SunWrap />
      </group>
      {tiles[tile].length != 0 && <Piece/>}
    </>
  );
}

useGLTF.preload("/Sun 03.glb");