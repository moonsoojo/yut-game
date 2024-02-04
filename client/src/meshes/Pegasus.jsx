import { useGLTF } from '@react-three/drei';
import React from 'react';

export default function Pegasus({position, scale, rotation}) {
  const { nodes, materials } = useGLTF("models/pegasus.glb");
  for (const material of Object.keys(materials)) {
    materials[material].transparent = true;
    materials[material].opacity = 0.1;
  }

  return <group position={position} scale={scale} rotation={rotation}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star18017.geometry}
        material={materials["Material.001"]}
        position={[-7.065, -0.488, -6.999]}
        rotation={[-Math.PI, 0.464, -Math.PI]}
        scale={0.547}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star18015.geometry}
        material={materials["Material.001"]}
        position={[9.077, -0.488, -7.485]}
        rotation={[Math.PI, -0.075, Math.PI]}
        scale={0.547}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star18014.geometry}
        material={materials["Material.001"]}
        position={[6.891, -0.488, 4.574]}
        rotation={[-Math.PI, 0.083, -Math.PI]}
        scale={0.547}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star18011.geometry}
        material={materials["Material.001"]}
        position={[0.676, -0.488, 6.089]}
        rotation={[-Math.PI, 0.464, -Math.PI]}
        scale={0.547}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star18006.geometry}
        material={materials["Material.001"]}
        position={[-3.793, -0.488, 5.828]}
        rotation={[-Math.PI, 0.14, -Math.PI]}
        scale={0.547}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star18004.geometry}
        material={materials["Material.001"]}
        position={[-0.271, -0.488, -1.159]}
        rotation={[-Math.PI, 0.302, -Math.PI]}
        scale={0.547}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star18001.geometry}
        material={materials["Material.001"]}
        position={[2.611, -0.488, 1.995]}
        rotation={[-Math.PI, 0.332, -Math.PI]}
        scale={0.547}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath029.geometry}
        material={materials["Material.002"]}
        position={[6.661, -0.815, -5.55]}
        rotation={[0, 0.478, 0]}
        scale={[0.404, 0.281, 0.427]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath028.geometry}
        material={materials["Material.002"]}
        position={[-4.794, -0.64, -6.167]}
        scale={0.136}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath027.geometry}
        material={materials["Material.002"]}
        position={[6.037, -0.694, 3.389]}
        scale={0.298}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath026.geometry}
        material={materials["Material.002"]}
        position={[-7.148, -0.7, -6.347]}
        rotation={[0, -0.995, 0]}
        scale={0.381}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath025.geometry}
        material={materials["Material.002"]}
        position={[-6.791, -0.698, -1.17]}
        rotation={[0, -1.162, 0]}
        scale={0.136}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube017.geometry}
        material={materials["Material.001"]}
        position={[6.558, -0.464, 4.743]}
        rotation={[0, 0.651, 0]}
        scale={[0.072, 0.072, 3.107]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube016.geometry}
        material={materials["Material.001"]}
        position={[2.924, -0.464, 5.485]}
        rotation={[0, 0.197, 0]}
        scale={[0.072, 0.072, 3.409]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube012.geometry}
        material={materials["Material.001"]}
        position={[1.269, -0.464, 4.965]}
        rotation={[0, -0.481, 0]}
        scale={[0.072, 0.072, 1.309]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube007.geometry}
        material={materials["Material.001"]}
        position={[1.648, -0.44, -2.667]}
        rotation={[0, -0.939, 0]}
        scale={[0.072, 0.072, 2.46]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube006.geometry}
        material={materials["Material.001"]}
        position={[-2.028, -0.44, 2.487]}
        rotation={[0, -0.479, 0]}
        scale={[0.072, 0.072, 4.058]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={materials["Material.001"]}
        position={[1.204, -0.44, 0.485]}
        rotation={[0, 0.758, 0]}
        scale={[0.072, 0.072, 2.199]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials["Material.001"]}
        position={[-4.381, -0.44, -4.682]}
        rotation={[Math.PI, -0.858, Math.PI]}
        scale={[0.072, 0.072, 2.489]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star18012.geometry}
        material={materials["Material.001"]}
        position={[3.52, -0.488, 8.737]}
        rotation={[-Math.PI, 0.464, -Math.PI]}
        scale={0.547}
      />
    </group>
}