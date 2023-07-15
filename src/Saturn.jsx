import { useGLTF } from "@react-three/drei";
import Rocket from "./Rocket";
import Ufo from "./Ufo";
import { useSelector, useDispatch } from "react-redux";
import { placePiece } from "./state/gameSlice.js"
// import { useFrame } from "@react-three/fiber"
import { useRef } from "react";
import React from 'react';

export default function Saturn({ position, tile }) {
    const { nodes, materials } = useGLTF("/models/Saturn 3.glb");

    const selection = useSelector((state) => state.game.selection);
    const tiles = useSelector((state) => state.game.tiles);
    const dispatch = useDispatch()

    function handlePointerDown(event) {
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
          position={[position[0], position[1]+0.7, position2Start - index * 0.3 + 0.1]}
            keyName={ `count${index}`} 
            tile={tile} 
            team={0} 
            // ref={refs[index]}
          />
        )}</>
      }
    }

    const saturnWrapRef = useRef();

    function SaturnWrap({ position }) {
        return (
          <mesh
            castShadow
            position={position}
            ref={saturnWrapRef}
            visible={true}
            onPointerDown={(event) => handlePointerDown(event)}
          >
            <sphereGeometry args={[0.23, 32, 16]} />
            <meshStandardMaterial transparent opacity={0.1}/>
          </mesh>
        );
      }

    return (
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={materials["Saturn 2"]}
          position={position}
          scale={0.2}
        >
          <group scale={0.63}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_1.geometry}
              material={materials["Material.003"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_2.geometry}
              material={materials["Material.004"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_3.geometry}
              material={materials["Material.005"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_4.geometry}
              material={materials["Material.006"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_5.geometry}
              material={materials["Material.007"]}
            />
          </group>
        </mesh>
        <SaturnWrap position={position}/>
        {tiles[tile].length != 0 && <Piece/>}
      </group>
    );
  }

