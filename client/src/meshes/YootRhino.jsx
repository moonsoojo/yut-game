import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import React from "react";

export default function YootRhino({ 
  position, 
  rotation=[0, 0, 0], 
  scale=1
}) {
  const { scene, materials } = useGLTF(
    "models/yoot-rhino.glb"
  );
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  return (
    <group position={position} rotation={rotation} scale={scale}>      
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007.geometry}
        material={materials["Texture wrap.005"]}
        scale={[1, 6.161, 1]}
      />
    </group>
  );
}

useGLTF.preload("models/yoot-rhino.glb")