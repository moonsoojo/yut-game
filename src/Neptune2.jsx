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

export default function Neptune2({ position, tile }) {
  const { nodes, materials } = useGLTF("/models/neptune-sphere.glb");

  const setSelection = useRocketStore((state) => state.setSelection);
  const selection = useRocketStore((state) => state.selection);
  const setPiece = useRocketStore((state) => state.setPiece);
  const tiles = useRocketStore((state) => state.tiles);

  const wrapperMatRef = useRef();
  const neptuneGroupRef = useRef();

  useFrame((state, delta) => {
    neptuneGroupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  function handlePointerEnter(event) {
    event.stopPropagation();
    document.body.style.cursor = "pointer";
    // earth1Ref.current.material.color.r += 0.1;
    // waterMatRef.current.color.r += 1;
    wrapperMatRef.current.opacity += 0.5;
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    document.body.style.cursor = "default";
    // earth1Ref.current.material.color.r -= 0.1;
    // waterMatRef.current.color.r -= 1;
    wrapperMatRef.current.opacity -= 0.5;
  }

  function handlePointerDown(event) {
    event.stopPropagation();
    if (selection == null) {
      setSelection({ type: "tile", tile });
    } else {
      setPiece({ destination: tile });
      setSelection(null);
    }
  }

  const rocketPositions = [
    [0, 0.5, 0 * 0.3],
    [0, 0.5, -1 * 0.3],
    [-0.3, 0.5, 0 * 0.3],
    [-0.3, 0.5, -1 * 0.3],
  ];

  const ufoPositions = [
    [0, 0.3, 1 * 0.3],
    [0, 0.3, -1 * 0.3],
    [-0.3, 0.3, 1 * 0.3],
    [-0.3, 0.3, -1 * 0.3],
  ];

  function Piece() {
    if (tiles[tile][0].team == 1) {
      return (
        <>
          {tiles[tile].map((value, index) => (
            <Rocket
              position={rocketPositions[index]}
              keyName={`count${index}`}
              tile={tile}
              team={1}
              id={value.id}
              key={index}
            />
          ))}
        </>
      );
    } else {
      return (
        <>
          {tiles[tile].map((value, index) => (
            <Ufo
              position={ufoPositions[index]}
              keyName={`count${index}`}
              tile={tile}
              team={0}
              id={value.id}
              key={index}
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
        visible={true}
        onPointerDown={(event) => handlePointerDown(event)}
        onPointerEnter={(event) => handlePointerEnter(event)}
        onPointerLeave={(event) => handlePointerLeave(event)}
      >
        <sphereGeometry args={[5, 32, 16]} />
        <meshStandardMaterial transparent opacity={0} ref={wrapperMatRef} />
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
    <group
      position={position}
      scale={
        selection != null && selection.type === "tile" && selection.tile == tile
          ? 1.5
          : 1
      }
    >
      {tiles[tile].length != 0 && <Piece />}
      <group ref={neptuneGroupRef} scale={0.15}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere002.geometry}
          material={materials["Blue Planet"]}
          scale={1.1}
          // ref={neptune1Ref}
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
