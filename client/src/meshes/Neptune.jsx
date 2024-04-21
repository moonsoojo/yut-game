import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import NeptuneParticles from "./NeptuneParticles";

export default function Neptune({ position=[0,0,0], rotation=[0,0,0], scale=1 }) {
  const { nodes, materials } = useGLTF("models/neptune.glb");
  const neptune = useRef();

  useFrame((state, delta) => {
    neptune.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
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
          sizeNeptune={0.07 * scale}
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
      {/* <HelperArrow  */}
    </group>
  );
}

useGLTF.preload("models/neptune.glb");