import { useGLTF } from "@react-three/drei";
import React from "react";

export default function Cursor({position, rotation=[Math.PI/2, 0, 5 * Math.PI/8], scale, grabEffect}) {
  console.log(`[Cursor] ${grabEffect}`)
  const { nodes } = useGLTF("/models/cursor.glb");
  let scaleArray;
  if (scale.length === 1) {
    scaleArray = [1 * scale, 1 * scale, 1 * scale]
  } else {
    scaleArray = scale
  }

  return (
    <group
      position={position}
      rotation={rotation}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve.geometry}
        scale={scaleArray}
      >
        <meshStandardMaterial color="white"/>
      </mesh>
      { grabEffect && <group name="cursor-effect">
        <mesh position={[0.2, 1, 0]} rotation={[0, 0, 0]}>
          <capsuleGeometry args={[0.03, 0.3, 10, 20]}/>
          <meshStandardMaterial color="green"/>
        </mesh>
        <mesh position={[-0.2, 0.9, 0]} rotation={[0, 0, Math.PI/4]}>
          <capsuleGeometry args={[0.03, 0.3, 10, 20]}/>
          <meshStandardMaterial color="green"/>
        </mesh>
        <mesh position={[-0.4, 0.65, 0]} rotation={[0, 0, Math.PI/16 * 7]}>
          <capsuleGeometry args={[0.03, 0.3, 10, 20]}/>
          <meshStandardMaterial color="green"/>
        </mesh>
      </group> }
    </group>
  );
}

useGLTF.preload("/models/cursor.glb");