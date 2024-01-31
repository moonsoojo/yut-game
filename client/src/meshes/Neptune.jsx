import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import React from "react";
import NeptuneParticles from "./NeptuneParticles";
import { useFrame } from "@react-three/fiber";
import Tile from "../components/Tile";

export default function Neptune({ position, tile, device, scale=0.36 }) {
  const { nodes, materials } = useGLTF("models/neptune.glb");
  const neptune = useRef();

  useFrame((state, delta) => {
    neptune.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <group position={position} scale={scale}>
      <group ref={neptune}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere002.geometry}
        material={materials["Blue Planet"]}
        scale={1.3}
      />
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
      { tile != undefined && <Tile tile={tile} wrapperRadius={0.8} device={device}/> }
      {/* <HelperArrow  */}
    </group>
  );
}