import React, { forwardRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";

export const Yoot2 = forwardRef(function Yoot({ 
  position, 
  rotation, 
  scale=1
}, ref) {
  const { scene, materials } = useGLTF(
    "models/yoot.glb"
  );
  // must clone to not affect other meshes using the same material
  const newMaterials = materials["Texture wrap.005"].clone()
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
  const scaleArray=[1 * scale, 6.161 * scale, 1 * scale]

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Cylinder007.geometry}
      position={position}
      material={newMaterials}
      rotation={rotation}
      scale={scaleArray}
      ref={ref}
    />
  );
});

export default Yoot2;