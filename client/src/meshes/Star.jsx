import Tile from "../components/Tile";
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import React from "react";
import { animated } from "@react-spring/three";

export default function Star({ position=[0,0,0], rotation=[0,0,0], scale=1, color='yellow' }) {
  const { scene } = useGLTF(
    "models/star.glb"
  );

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  return (
    <animated.group position={position} rotation={rotation} scale={scale}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star.geometry}
        rotation={[0, Math.PI, 0]} // Upside down by default
      >
        <meshStandardMaterial color={color} />
      </mesh>
    </animated.group>
  );
}

useGLTF.preload("/models/star.glb");