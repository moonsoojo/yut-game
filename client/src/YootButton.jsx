import { Text3D, useGLTF } from '@react-three/drei';
import { useFrame, useGraph } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import { SkeletonUtils } from 'three-stdlib';
import { socket, readyToThrowAtom } from './SocketManager';
import { useAtom } from "jotai";

export default function YootButton({ 
  position, 
  rotation, 
}) {
  // yoots with material
  // get texture of yoot
  // set color to grey/yellow
  const { nodes, materials } = useGLTF("/models/rounded-rectangle.glb");
  const { scene } = useGLTF("/models/yoot2.glb");
  const yootMaterials = useGLTF("/models/yoot2.glb").materials
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const yootNodes = useGraph(clone).nodes

  const [readyToThrow, setReadyToThrow] = useAtom(readyToThrowAtom);

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
  function handlePointerDown() {
    console.log('pointer down')
    socket.emit("throwYoots");
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
        <meshStandardMaterial color={ readyToThrow ? "yellow" : "grey" }/>
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
          { !readyToThrow && <meshStandardMaterial color="grey"/>}
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
          { !readyToThrow && <meshStandardMaterial color="grey"/>}
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
          { !readyToThrow && <meshStandardMaterial color="grey"/>}
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
          { !readyToThrow && <meshStandardMaterial color="grey"/>}
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
        <meshStandardMaterial color={ readyToThrow ? "#963600" : "grey" }/>
      </Text3D>
      <mesh 
        name='wrap'
        position={[0, 0.1, 0]} 
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
      >
        <boxGeometry args={[3, 0.3, 2]}/>
        <meshStandardMaterial transparent opacity={0.3}/>
      </mesh>
    </group>
  );
}