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
  const { yootRhinoMat0, yootRhinoMat1 } = ref
  const { scene, materials } = useGLTF(
    "models/yoot-rhino2.glb"
  );
  // must clone to not affect other meshes using the same material
  const newMaterialsTexture = materials["Texture wrap.005"].clone()
  const newMaterialsRhino = materials["Rihno"].clone()
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
  const scaleArray=[1 * scale, 6.161 * scale, 1 * scale]

  return (
    <group position={position} rotation={rotation} scale={scaleArray}>
      <mesh position={[0,-0.5,0]}>
        <boxGeometry args={[0.01, 0.2, 0.8]}/>
        <meshStandardMaterial color="grey"/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002_1.geometry}
        material={newMaterialsTexture}
        ref={yootRhinoMat0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002_2.geometry}
        material={newMaterialsRhino}
        ref={yootRhinoMat1}
      />
      <mesh position={[0,0.5,0]}>
        <boxGeometry args={[0.01, 0.2, 0.8]}/>
        <meshStandardMaterial color="grey"/>
      </mesh>
    </group>
  );
});

export default YootRhino2;