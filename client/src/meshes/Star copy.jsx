import Tile from "../components/Tile";
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import React from "react";
import { animated } from "@react-spring/three";

export default function Star({ position, tile, device, scale }) {
  const { scene, materials } = useGLTF(
    "models/star.glb"
  );

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  return (
    <animated.group position={position} scale={scale} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star.geometry}
      >
        <meshStandardMaterial color={"yellow"} />
      </mesh>
      { tile != undefined && <Tile tile={tile} wrapperRadius={0.4} device={device}/> }
    </animated.group>
  );
}

useGLTF.preload("/models/star.glb");