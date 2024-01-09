import React from "react";
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";

export default function Yoot({ 
  position, 
  rotation=[0, 0, -Math.PI / 2], 
  scale=1
}) {
  const { scene, materials } = useGLTF(
    "/models/yoot.glb"
  );
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
  const scaleArray=[1 * scale, 6.161 * scale, 1 * scale]

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Cylinder007.geometry}
      position={position}
      material={materials["Texture wrap.005"]}
      rotation={rotation}
      scale={scaleArray}
    />
  );
}
