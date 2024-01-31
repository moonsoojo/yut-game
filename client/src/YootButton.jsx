import { Text3D, useGLTF } from '@react-three/drei';
import { useFrame, useGraph } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import { SkeletonUtils } from 'three-stdlib';
import * as THREE from 'three'

export default function YootButton({ 
  position, 
  rotation, 
  readyToThrow,
  handlePointerDown,
  throws
}) {
  // yoots with material
  // get texture of yoot
  // set color to grey/yellow
  const { nodes, materials } = useGLTF("/models/rounded-rectangle.glb");
  const { scene } = useGLTF("/models/yoot-for-button.glb");
  const yootMaterials = useGLTF("/models/yoot-for-button.glb").materials
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const yootNodes = useGraph(clone).nodes

  const buttonEdges = useRef();
  const yoot0 = useRef();
  const yoot1 = useRef();
  const yoot2 = useRef();
  const yoot3 = useRef();
  const throwTextMat = useRef();
  const boxInner = useRef();

  const scale = [1.4, -0.079, 1]
  const scaleInner = [scale[0] - 0.1, scale[1]+0.2, scale[2]-0.1]
  const scaleYoot = 0.15
  const scaleYootArray=[1 * scaleYoot, 6.161 * scaleYoot, 1 * scaleYoot]

  function handlePointerEnter() {
    document.body.style.cursor = "pointer";
  }
  function handlePointerLeave() {
    document.body.style.cursor = "default";
  }

  return (
    <group position={position} rotation={rotation}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={scale}
      >
        <meshStandardMaterial color={ (readyToThrow && throws > 0) ? "yellow" : "grey" }/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={scaleInner}
        ref={boxInner}
      >
        <meshStandardMaterial color="#000B18"/>
      </mesh>
      <group position={[0.3, 0.1, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={yootNodes.Cylinder007.geometry}
          position={[0,0,-0.45]}
          material={yootMaterials["Texture wrap.005"]}
          rotation={[0,0,-Math.PI/2]}
          scale={scaleYootArray}
          ref={yoot0}
        >
          { !(readyToThrow && throws > 0) && <meshStandardMaterial color="grey"/>}
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={yootNodes.Cylinder007.geometry}
          position={[0,0,-0.15]}
          material={yootMaterials["Texture wrap.005"]}
          rotation={[0,0,-Math.PI/2]}
          scale={scaleYootArray}
          ref={yoot1}
          >
          { !(readyToThrow && throws > 0) && <meshStandardMaterial color="grey"/>}
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={yootNodes.Cylinder007.geometry}
          position={[0,0,0.15]}
          material={yootMaterials["Texture wrap.005"]}
          rotation={[0,0,-Math.PI/2]}
          scale={scaleYootArray}
          ref={yoot2}
          >
          { !(readyToThrow && throws > 0) && <meshStandardMaterial color="grey"/>}
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={yootNodes.Cylinder007.geometry}
          position={[0,0,0.45]}
          material={yootMaterials["Texture wrap.005"]}
          rotation={[0,0,-Math.PI/2]}
          scale={scaleYootArray}
          ref={yoot3}
          >
          { !(readyToThrow && throws > 0) && <meshStandardMaterial color="grey"/>}
        </mesh>
      </group>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3} 
        height={0.01} 
        position={[-1.1, 0.2, -0.7]}
        rotation={[-Math.PI/2,-Math.PI/2,0, "YXZ"]}
      >
        THROW
        <meshStandardMaterial color={ (readyToThrow && throws > 0) ? "#963600" : "grey" }/>
      </Text3D>
      <mesh 
        position={[0, 0.1, 0]} 
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
      >
        <boxGeometry args={[3, 0.3, 2]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
    </group>
  );
}