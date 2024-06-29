import React from "react";
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";

export default function YootMesh({ 
  position, 
  rotation=[0, 0, 0], 
  scale=1,
  active=true
}) {
  const { scene, materials } = useGLTF(
    "models/yoot.glb"
  );
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      { active ? <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder007.geometry}
          material={materials["Texture wrap.005"]}
          scale={[1, 6.161, 1]}
        /> :
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder007.geometry}
          scale={[1, 6.161, 1]}
        >
          <meshStandardMaterial color='grey'/>
        </mesh>
      }
    </group>
  );
}
