import { useGLTF } from '@react-three/drei';
import React from 'react';

export default function Rhino({position, scale, rotation}) {
  const { nodes, materials } = useGLTF("models/rhino.glb");
  for (const material of Object.keys(materials)) {
    materials[material].transparent = true;
    materials[material].opacity = 0.05;
  }

  return <group position={position} scale={scale} rotation={rotation}>
     <mesh
        castShadow
        receiveShadow
        geometry={nodes.star18010.geometry}
        material={materials["Material.018"]}
        position={[-4.809, -0.441, 1.761]}
        rotation={[-Math.PI, -0.459, 0]}
        scale={0.624}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star18009.geometry}
        material={materials["Material.018"]}
        position={[-6.878, -0.441, -0.664]}
        rotation={[-Math.PI, -0.459, 0]}
        scale={0.624}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star18008.geometry}
        material={materials["Material.018"]}
        position={[-0.187, -0.441, 2.848]}
        rotation={[-Math.PI, -0.459, 0]}
        scale={0.478}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star18007.geometry}
        material={materials["Material.018"]}
        position={[7.787, -0.441, -0.824]}
        rotation={[-Math.PI, -0.459, 0]}
        scale={0.44}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star18005.geometry}
        material={materials["Material.018"]}
        position={[6.214, -0.441, 0.913]}
        rotation={[Math.PI, -1.038, 0]}
        scale={0.467}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star18003.geometry}
        material={materials["Material.018"]}
        position={[3.038, -0.441, -0.714]}
        rotation={[-Math.PI, -0.459, 0]}
        scale={0.624}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star18002.geometry}
        material={materials["Material.018"]}
        position={[-2.945, -0.441, -2.738]}
        rotation={[-Math.PI, -0.459, 0]}
        scale={0.624}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath030.geometry}
        material={materials["Material.018"]}
        position={[4.804, -0.343, -4.154]}
        rotation={[0, -0.485, -Math.PI]}
        scale={1.239}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube011.geometry}
        material={materials["Material.018"]}
        position={[-2.45, -0.445, 2.383]}
        rotation={[-0.056, 1.29, -3.083]}
        scale={[0.07, 0.07, 2.394]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube010.geometry}
        material={materials["Material.018"]}
        position={[7.051, -0.503, -0.096]}
        rotation={[-0.048, -0.819, 3.071]}
        scale={[0.066, 0.066, 2.247]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube009.geometry}
        material={materials["Material.018"]}
        position={[4.905, -0.445, 0.303]}
        rotation={[0, 1.047, Math.PI]}
        scale={[0.067, 0.067, 2.261]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube008.geometry}
        material={materials["Material.018"]}
        position={[1.12, -0.445, 1.502]}
        rotation={[0, -0.758, -Math.PI]}
        scale={[0.104, 0.104, 3.542]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={materials["Material.018"]}
        position={[-5.606, -0.445, 0.916]}
        rotation={[0, 0.631, Math.PI]}
        scale={[0.063, 0.063, 2.134]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials["Material.018"]}
        position={[-4.911, -0.445, -1.795]}
        rotation={[Math.PI, 1.1, 0]}
        scale={[0.062, 0.062, 2.111]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials["Material.018"]}
        position={[9.543, -0.445, 1.284]}
        rotation={[0, 1.201, -Math.PI]}
        scale={[0.104, 0.104, 3.542]}
      />
    </group>
}