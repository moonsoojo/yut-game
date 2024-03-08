import { Text3D, useGLTF } from '@react-three/drei';
import { useFrame, useGraph } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import { SkeletonUtils } from 'three-stdlib';
import { clientAtom, teamsAtom, thrownAtom, turnAtom } from './SocketManager';
import { useAtom } from 'jotai';
import { getCurrentPlayerSocketId } from './helpers/helpers';

export default function YootButton({ 
  position, 
  rotation, 
  handlePointerDown,
  throws,
  scale
}) {
  // yoots with material
  // get texture of yoot
  // set color to grey/yellow
  const { nodes, materials } = useGLTF("/models/rounded-rectangle.glb");
  const { scene } = useGLTF("/models/yoot-for-button.glb");
  const yootMaterials = useGLTF("/models/yoot-for-button.glb").materials
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const yootNodes = useGraph(clone).nodes
  let buttonRef = useRef();

  const [client] = useAtom(clientAtom)
  const [turn] = useAtom(turnAtom)
  const [teams] = useAtom(teamsAtom)
  const [thrown] = useAtom(thrownAtom)

  const scaleOuter = [1.4, -0.079, 1]
  const scaleInner = [scaleOuter[0] - 0.1, scaleOuter[1]+0.2, scaleOuter[2]-0.1]
  const scaleYoot = 0.15
  const scaleYootArray=[1 * scaleYoot, 6.161 * scaleYoot, 1 * scaleYoot]

  useFrame((state, delta) => {
    if (client.id === getCurrentPlayerSocketId(turn, teams) && throws > 0 && !thrown) {
      buttonRef.current.scale.x = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 0.8
      buttonRef.current.scale.y = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 0.8
      buttonRef.current.scale.z = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 0.8
    } else {
      buttonRef.current.scale.x = 0.8
      buttonRef.current.scale.y = 0.8
      buttonRef.current.scale.z = 0.8
    }
  })

  function handlePointerEnter() {
    document.body.style.cursor = "pointer";
  }
  function handlePointerLeave() {
    document.body.style.cursor = "default";
  }

  return (
    <group position={position} rotation={rotation} scale={scale} ref={buttonRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={scaleOuter}
      >
        <meshStandardMaterial color={ (throws > 0 && getCurrentPlayerSocketId(turn, teams) === client.id) ? "yellow" : "grey" }/>
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
          { !(throws > 0 && getCurrentPlayerSocketId(turn, teams) === client.id) && <meshStandardMaterial color="grey"/>}
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
          { !(throws > 0 && getCurrentPlayerSocketId(turn, teams) === client.id) && <meshStandardMaterial color="grey"/>}
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
          { !(throws > 0 && getCurrentPlayerSocketId(turn, teams) === client.id) && <meshStandardMaterial color="grey"/>}
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
          { !(throws > 0 && getCurrentPlayerSocketId(turn, teams) === client.id) && <meshStandardMaterial color="grey"/>}
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
        <meshStandardMaterial color={ (throws > 0 && getCurrentPlayerSocketId(turn, teams) === client.id) ? "#963600" : "grey" }/>
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