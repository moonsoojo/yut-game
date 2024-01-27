import { useGLTF } from "@react-three/drei";
import { useMemo, forwardRef } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import React from "react";

export const YootRhino2 = forwardRef(function Yoot({ 
  position, 
  rotation, 
  scale=1
}, ref) {
  const { scene, materials } = useGLTF("models/yoot-rhino-round.glb");
  // must clone to not affect other meshes using the same material
  const newMaterialsTexture = materials["Material.001"].clone()
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
  const scaleArray=[1 * scale, 6.161 * scale, 1 * scale]

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Cylinder019.geometry}
      material={newMaterialsTexture}
      position={position} 
      rotation={rotation}
      scale={scaleArray}
      ref={ref}
    />
  );
});

export default YootRhino2;