import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import HelperArrow from "./HelperArrow";
import React from "react";
import NeptuneParticles from "./NeptuneParticles";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import Tile from "../components/Tile";

export default function Neptune({ position, tile, device }) {
  const { nodes, materials } = useGLTF("models/neptune.glb");
  const neptune = useRef();

  useFrame((state, delta) => {
    neptune.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

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