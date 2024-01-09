import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import React from "react";

export default function YootRhino({ 
  position, 
  rotation=[0, 0, -Math.PI / 2], 
  scale=1
}) {
  const { scene, materials } = useGLTF(
    "/models/yoot-rhino.glb"
  );
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
        material={materials["Texture wrap.005"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002_2.geometry}
        material={materials.Rihno}
      />
      <mesh position={[0,0.5,0]}>
        <boxGeometry args={[0.01, 0.2, 0.8]}/>
        <meshStandardMaterial color="grey"/>
      </mesh>
    </group>
  );
}
