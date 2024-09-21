import { Text3D, useGLTF } from '@react-three/drei';
import { useFrame, useGraph } from '@react-three/fiber';
import { useAtom, useAtomValue } from 'jotai';
import React, { useMemo, useRef } from 'react';
import { SkeletonUtils } from 'three-stdlib';
import { animationPlayingAtom, hasTurnAtom, pieceAnimationPlayingAtom } from './GlobalState';
import { socket } from './SocketManager';
import { useParams } from "wouter";

export default function YootButtonNew({ position, rotation, scale, hasThrow }) {
  const { nodes, materials } = useGLTF("/models/rounded-rectangle.glb");
  const { scene } = useGLTF("/models/yoot-for-button.glb");
  const yootMaterials = useGLTF("/models/yoot-for-button.glb").materials
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const yootNodes = useGraph(clone).nodes
  let buttonRef = useRef();
  const params = useParams();

  const [animationPlaying, setAnimationPlaying] = useAtom(animationPlayingAtom)
  const pieceAnimationPlaying = useAtomValue(pieceAnimationPlayingAtom)
  const [hasTurn] = useAtom(hasTurnAtom)
  const enabled = !animationPlaying && !pieceAnimationPlaying && hasTurn && hasThrow // add "hasThrow"

  const scaleOuter = [1.4, -0.079, 1]
  const scaleInner = [scaleOuter[0] - 0.1, scaleOuter[1]+0.2, scaleOuter[2]-0.1]
  const scaleYoot = 0.15
  const scaleYootArray=[1 * scaleYoot, 6.161 * scaleYoot, 1 * scaleYoot]

  useFrame((state, delta) => {
    if (enabled) {
      buttonRef.current.scale.x = Math.sin(state.clock.elapsedTime * 3) * 0.07 + scale
      buttonRef.current.scale.y = Math.sin(state.clock.elapsedTime * 3) * 0.07 + scale
      buttonRef.current.scale.z = Math.sin(state.clock.elapsedTime * 3) * 0.07 + scale
    } else {
      buttonRef.current.scale.x = scale
      buttonRef.current.scale.y = scale
      buttonRef.current.scale.z = scale
    }
  })

  function handlePointerEnter() {
    document.body.style.cursor = "pointer";
  }
  function handlePointerLeave() {
    document.body.style.cursor = "default";
  }
  function handleClick(e) {
    e.stopPropagation();

    if (enabled) {
      setAnimationPlaying(true)
      socket.emit('throwYoot', { roomId: params.id })
    }
  }

  return <group 
    position={position} 
    rotation={rotation} 
    ref={buttonRef}
  >
    <group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={scaleOuter}
      >
        <meshStandardMaterial color={ enabled ? "yellow" : "grey" }/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={scaleInner}
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
        >
          { !enabled && <meshStandardMaterial color="grey"/>}
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={yootNodes.Cylinder007.geometry}
          position={[0,0,-0.15]}
          material={yootMaterials["Texture wrap.005"]}
          rotation={[0,0,-Math.PI/2]}
          scale={scaleYootArray}
          >
          { !enabled && <meshStandardMaterial color="grey"/>}
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={yootNodes.Cylinder007.geometry}
          position={[0,0,0.15]}
          material={yootMaterials["Texture wrap.005"]}
          rotation={[0,0,-Math.PI/2]}
          scale={scaleYootArray}
          >
          { !enabled && <meshStandardMaterial color="grey"/>}
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={yootNodes.Cylinder007.geometry}
          position={[0,0,0.45]}
          material={yootMaterials["Texture wrap.005"]}
          rotation={[0,0,-Math.PI/2]}
          scale={scaleYootArray}
          >
          { !enabled && <meshStandardMaterial color="grey"/>}
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
        <meshStandardMaterial color={ !!enabled ? "#963600" : "grey" }/>
      </Text3D>
      <mesh name='wrapper'
        position={[0, 0.1, 0]} 
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <boxGeometry args={[3, 0.3, 2]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh> 
    </group>
  </group>
}