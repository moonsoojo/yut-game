import { useGLTF } from '@react-three/drei';
import React from 'react';

export default function ArrowBlender({position, rotation, scale, color}) {
    const { nodes } = useGLTF("models/arrow.glb");
    return (
      <group position={position} rotation={rotation} scale={scale} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          scale={[1, 0.039, 0.363]}
        >
            <meshStandardMaterial color={color}/>
        </mesh>
      </group>
    );
}
useGLTF.preload('models/arrow.glb')