import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function EarthModified({ 
  position=[0,0,0], 
  rotation=[-Math.PI/9+Math.PI/20*3*1,-Math.PI/2+Math.PI/20*1*-1,-Math.PI/20+Math.PI/20*1], 
  scale=0.4,
  rotate=true
}) {
  const { nodes, materials } = useGLTF("models/earth-modified.glb");

  const earth = useRef();

  useFrame((state, delta) => {
    const time = -state.clock.elapsedTime -1.5
    // earth.current.rotation.y = state.clock.elapsedTime * 0.5;

    if (rotate) {
      const q = new THREE.Quaternion();
      const axis = new THREE.Vector3( 0.3, -1, 0 );
      axis.normalize()
      const angle = -time/2
      q.setFromAxisAngle(axis, angle);
      const euler = new THREE.Euler();
      euler.setFromQuaternion(q)
      earth.current.rotation.x = euler.x
      earth.current.rotation.y = euler.y
      earth.current.rotation.z = euler.z
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale} ref={earth}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.flagpole.geometry}
        material={materials["Material.001"]}
        position={[-0.007, 0, -0.058]}
        rotation={[0.155, 0.183, 0.021]}
        scale={0.538}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.low_poly_earth018.geometry}
        material={materials.earth}
        position={[-0.793, -1.949, 0.09]}
        rotation={[0, 0.146, -0.299]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.flagpole001.geometry}
        material={materials.water}
        position={[-0.007, 0, -0.058]}
        rotation={[0.155, 0.183, 0.021]}
        scale={0.538}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.flagpole010.geometry}
        position={[-0.007, 0, -0.058]}
        rotation={[0.155, 0.183, 0.021]}
        scale={0.538}
      >
        <meshBasicMaterial color="red"/>
        </mesh>
      <group
        position={[-0.007, 0, -0.058]}
        rotation={[0.155, 0.183, 0.021]}
        scale={0.538}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere036.geometry}
          material={materials.water}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere036_1.geometry}
          material={materials.earth}
        />
      </group>
      <group
        position={[-0.007, 0, -0.058]}
        rotation={[0.155, 0.183, 0.021]}
        scale={0.538}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere037.geometry}
          material={materials.water}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere037_1.geometry}
          material={materials.earth}
        />
      </group>
      <group
        position={[-0.007, 0, -0.058]}
        rotation={[0.155, 0.183, 0.021]}
        scale={0.538}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere038.geometry}
          material={materials.water}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere038_1.geometry}
          material={materials.earth}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.flagpole014.geometry}
        material={materials.earth}
        position={[-0.007, 0, -0.058]}
        rotation={[0.155, 0.183, 0.021]}
        scale={0.538}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.flagpole015.geometry}
        material={materials.earth}
        position={[-0.007, 0, -0.058]}
        rotation={[0.155, 0.183, 0.021]}
        scale={0.538}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.flagpole016.geometry}
        material={materials.earth}
        position={[-0.007, 0, -0.058]}
        rotation={[0.155, 0.183, 0.021]}
        scale={0.538}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.flagpole017.geometry}
        material={materials.earth}
        position={[-0.007, 0, -0.058]}
        rotation={[0.155, 0.183, 0.021]}
        scale={0.538}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.flagpole018.geometry}
        material={materials.earth}
        position={[-0.007, 0, -0.058]}
        rotation={[0.155, 0.183, 0.021]}
        scale={0.538}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.flagpole019.geometry}
        material={materials.earth}
        position={[-0.007, 0, -0.058]}
        rotation={[0.155, 0.183, 0.021]}
        scale={0.538}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.flagpole020.geometry}
        material={materials.earth}
        position={[-0.007, 0, -0.058]}
        rotation={[0.155, 0.183, 0.021]}
        scale={0.538}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.flagpole021.geometry}
        material={materials.earth}
        position={[-0.007, 0, -0.058]}
        rotation={[0.155, 0.183, 0.021]}
        scale={0.538}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.flagpole022.geometry}
        material={materials.earth}
        position={[-0.007, 0, -0.058]}
        rotation={[0.155, 0.183, 0.021]}
        scale={0.538}
      />
    </group>
  );
}