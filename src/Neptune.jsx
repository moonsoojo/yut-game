import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect, useMemo } from "react";
import Rocket from "./Rocket";
import Ufo from "./Ufo";
import { useSelector, useDispatch } from "react-redux";
import { placePiece } from "./state/gameSlice.js";
import React from "react";
import NeptuneParticles from "./NeptuneParticles";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRocketStore } from "./state/zstore2";

export default function Neptune({ position, tile }) {
  const { nodes, materials } = useGLTF("/models/neptune-sphere.glb");

  const setSelection = useRocketStore((state) => state.setSelection);
  const selection = useRocketStore((state) => state.selection);
  const setPiece = useRocketStore((state) => state.setPiece);
  const tiles = useRocketStore((state) => state.tiles);

  const [neptune1Color, setNeptune1Color] = useState({});
  const [neptune2Color, setNeptune2Color] = useState({});
  const [neptune3Color, setNeptune3Color] = useState({});
  const neptune1Ref = useRef();
  const neptune2Ref = useRef();
  const neptune3Ref = useRef();
  const neptuneWrapRef = useRef();
  const neptuneGroupRef = useRef();

  useFrame((state, delta) => {
    neptuneGroupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  useEffect(() => {
    setNeptune1Color({
      r: neptune1Ref.current.material.color.toArray()[0],
      g: neptune1Ref.current.material.color.toArray()[1],
      b: neptune1Ref.current.material.color.toArray()[2],
    });
    // setNeptune2Color({
    //   r: neptune2Ref.current.material.color.toArray()[0],
    //   g: neptune2Ref.current.material.color.toArray()[1],
    //   b: neptune2Ref.current.material.color.toArray()[2],
    // });
    // setNeptune3Color({
    //   r: neptune3Ref.current.material.color.toArray()[0],
    //   g: neptune3Ref.current.material.color.toArray()[1],
    //   b: neptune3Ref.current.material.color.toArray()[2],
    // });
  }, []);

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
                position[1] + 0.5,
                position2Start - index * 0.3 + 0.1,
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

  function NeptuneWrap() {
    return (
      <mesh
        castShadow
        ref={neptuneWrapRef}
        visible={true}
        onPointerDown={(event) => handlePointerDown(event)}
      >
        <sphereGeometry args={[5, 32, 16]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
    );
  }

  const {
    countNeptune1,
    countNeptune2,
    sizeNeptune,
    radius1MinNeptune,
    radius1MaxNeptune,
    countSparkles1,
    colorOne,
    colorTwo,
    radius2MinNeptune,
    radius2MaxNeptune,
    countSparkles2,
  } = useControls("neptune", {
    countNeptune1: {
      value: 261,
      min: 0,
      max: 1000,
      step: 1,
    },
    countNeptune2: {
      value: 327,
      min: 0,
      max: 1000,
      step: 1,
    },
    sizeNeptune: {
      value: 0.07,
      min: 0.01,
      max: 0.4,
      step: 0.01,
    },
    radius1MinNeptune: {
      value: 1.74,
      min: 0.1,
      max: 10,
      step: 0.01,
    },
    radius1MaxNeptune: {
      value: 2.72,
      min: 0.5,
      max: 10,
      step: 0.01,
    },
    countSparkles1: {
      value: 7,
      min: 1,
      max: 20,
      step: 1,
    },
    radius2MinNeptune: {
      value: 3.09,
      min: 0.1,
      max: 10,
      step: 0.01,
    },
    radius2MaxNeptune: {
      value: 4.27,
      min: 0.5,
      max: 10,
      step: 0.01,
    },
    countSparkles2: {
      value: 6,
      min: 1,
      max: 20,
      step: 1,
    },
    colorOne: {
      value: "#3289FF",
    },
    colorTwo: {
      value: "#6EF2FE",
    },
  });

  return (
    <group dispose={null}>
      <group ref={neptuneGroupRef} position={position} scale={0.15}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere002.geometry}
          material={materials["Blue Planet"]}
          scale={1.1}
          ref={neptune1Ref}
        ></mesh>
        {/* remove rings */}
        <NeptuneParticles
          countNeptune1={countNeptune1}
          countNeptune2={countNeptune2}
          sizeNeptune={sizeNeptune}
          radius1MinNeptune={radius1MinNeptune}
          radius1MaxNeptune={radius1MaxNeptune}
          radius2MinNeptune={radius2MinNeptune}
          radius2MaxNeptune={radius2MaxNeptune}
          colorOne={colorOne}
          colorTwo={colorTwo}
          countSparkles1={countSparkles1}
          countSparkles2={countSparkles2}
        />
        <NeptuneWrap />
      </group>
    </group>
  );
}
