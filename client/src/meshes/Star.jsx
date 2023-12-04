import Tile from "../components/Tile";
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import React from "react";

export default function Star({ position, tile, device, scale }) {
  const { scene, materials, animations } = useGLTF(
    "/models/stars/star-yellow copy 1.glb"
  );

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  return (
    <group position={position}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star.geometry}
        scale={0.255 * scale}
      >
        <meshStandardMaterial color={"yellow"} />
      </mesh>
      <Tile tile={tile} wrapperRadius={0.4} device={device}/>
    </group>
  );
}
