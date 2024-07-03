import { Text3D, useGLTF } from '@react-three/drei';
import { useFrame, useGraph } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import { SkeletonUtils } from 'three-stdlib';
import HtmlElement from '../HtmlElement';

export default function YootButtonModel({
  position,
  rotation,
  scale,
  turnedOn
}) {
  const { nodes, materials } = useGLTF("models/rounded-rectangle.glb");
  const { scene } = useGLTF("models/yoot-for-button.glb");
  const yootMaterials = useGLTF("models/yoot-for-button.glb").materials
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const yootNodes = useGraph(clone).nodes
  let buttonRef = useRef();

  const scaleOuter = [1.4, -0.079, 1]
  const scaleInner = [scaleOuter[0] - 0.1, scaleOuter[1]+0.2, scaleOuter[2]-0.1]
  const scaleYoot = 0.15
  const scaleYootArray=[1 * scaleYoot, 6.161 * scaleYoot, 1 * scaleYoot]

  useFrame((state, delta) => {
    if (turnedOn) {
      // expand with time
    }
  })
  return <group 
    position={position} 
    rotation={rotation} 
    scale={scale} 
    ref={buttonRef}
  >
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Cube.geometry}
      rotation={[-Math.PI, 0, -Math.PI]}
      scale={scaleOuter}
    >
      <meshStandardMaterial color={ turnedOn ? "yellow" : "grey" }/>
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
        { !turnedOn && <meshStandardMaterial color="grey"/>}
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
        { !turnedOn && <meshStandardMaterial color="grey"/>}
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
        { !turnedOn && <meshStandardMaterial color="grey"/>}
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
        { !turnedOn && <meshStandardMaterial color="grey"/>}
      </mesh>
    </group>
    <Text3D
      position={[-1, 0.2, -0.7]}
      rotation={[-Math.PI/2,0,-Math.PI/2]}
      font="fonts/Luckiest Guy_Regular.json" 
      size={0.3} 
      height={0.01}
    >
      THROW
      <meshStandardMaterial color={ turnedOn ? "yellow" : "grey" }/>
    </Text3D>
  </group>
}


useGLTF.preload('models/rounded-rectangle.glb')
useGLTF.preload('models/yoot-for-button.glb')