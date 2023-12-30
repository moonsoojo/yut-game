import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import HelperArrow from "./HelperArrow";
import React from "react";
import NeptuneParticles from "./NeptuneParticles";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import Tile from "../components/Tile";

export default function Neptune2({ position, tile, device }) {
  const { nodes, materials } = useGLTF("models/neptune-sphere.glb");
  const neptune = useRef();

  useFrame((state, delta) => {
    neptune.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  /*const {
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
  });*/

  return (
    <group position={position} scale={0.4}>
      <group ref={neptune} scale={0.9}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere002.geometry}
          material={materials["Blue Planet"]}
          scale={1.3}
          // ref={neptune1Ref}
        />
        {/* remove rings */}
        <NeptuneParticles
          countNeptune1={261}
          countNeptune2={327}
          sizeNeptune={0.07}
          radius1MinNeptune={1.74}
          radius1MaxNeptune={2.72}
          radius2MinNeptune={3.09}
          radius2MaxNeptune={4.27}
          colorOne={"#3289FF"}
          colorTwo={"#6EF2FE"}
          countSparkles1={7}
          countSparkles2={6}
        />
      </group>
      <HelperArrow
        position={[0, 0, 0.8]}
        rotation={[Math.PI/2,0,0]}
        scale={0.9}
      />
      <Tile tile={tile} wrapperRadius={0.4} device={device}/>
    </group>
  );
}

useGLTF.preload("/models/neptune-sphere.glb");
