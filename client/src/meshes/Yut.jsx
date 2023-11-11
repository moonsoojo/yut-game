import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import React from "react";

export default function Yut({ type, position, rotation, scale }) {
  const { scene, materials } = useGLTF(
    `/models/yut-${type === "regular" ? "regular" : "backdo"}.glb`
  );

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={
        type === "regular" ? nodes.Cube001.geometry : nodes.Cube003.geometry
      }
      material={materials["Material.002"]}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}
