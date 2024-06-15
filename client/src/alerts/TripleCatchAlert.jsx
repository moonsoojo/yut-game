import { useGLTF, Text3D, Float } from "@react-three/drei"
import { useRef } from "react";
import Star from "../meshes/Star"
import Ufo from "../meshes/Ufo"
import Rocket from "../meshes/Rocket"
import { useFrame } from "@react-three/fiber";
import Yoot from "../meshes/Yoot";
import { animated } from "@react-spring/three";
import { mainAlertAtom } from "../GlobalState";
import { useAtom } from "jotai";

export default function TripleCatchAlert({ position, rotation, scale, team }) {
  console.log(`[TripleCatchAlert]`)
  
  const { nodes, materials } = useGLTF('models/alert-background.glb')
  const [_mainAlert, setMainAlert] = useAtom(mainAlertAtom)

  const borderMesh0Ref = useRef();
  const borderMesh1Ref = useRef();
  const borderMesh2Ref = useRef();
  const borderMesh3Ref = useRef();
  const borderMesh4Ref = useRef();
  const borderMesh5Ref = useRef();
  const borderMesh6Ref = useRef();
  const borderMeshRefs = [
    borderMesh0Ref,
    borderMesh1Ref,
    borderMesh2Ref,
    borderMesh3Ref,
    borderMesh4Ref,
    borderMesh5Ref,
    borderMesh6Ref
  ]

  const height = 2.2
  const width = 2.9
  useFrame((state, delta) => {
    for (let i = 0; i < borderMeshRefs.length; i++) {      
      borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
      borderMeshRefs[i].current.position.y = 0.1
      borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
    }
  })

  function YootEmoji() {
    return <group name='yoot-emoji'>
      <Yoot position={[0, 0, -0.15]} rotation={[0, Math.PI, -Math.PI/2]} scale={0.05}/>
      <Yoot position={[0, 0, -0.05]} rotation={[0, Math.PI, -Math.PI/2]} scale={0.05}/>
      <Yoot position={[0, 0, 0.05]} rotation={[0, Math.PI, -Math.PI/2]} scale={0.05}/>
      <Yoot position={[0, 0, 0.15]} rotation={[0, Math.PI, -Math.PI/2]} scale={0.05}/>
    </group>
  }

  function BamImage({position, rotation, scale, color}) {
    const { nodes, materials } = useGLTF('models/bam-emoji.glb')
    return (
      <group position={position} rotation={rotation} scale={scale} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={nodes.Plane.material}
          position={[0, 0., 0]}
          scale={0.168}
        >
          <meshStandardMaterial color={color}/>
        </mesh>
      </group>
    )
  }

  function UfoCatchRocket() {
    const rocketGroupRef0 = useRef()
    const rocketGroupRef1 = useRef()
    const rocketGroupRef2 = useRef()
    const rocketGroupRefs = [rocketGroupRef0, rocketGroupRef1, rocketGroupRef2]
    useFrame((state, delta) => {
      for (let i = 0; i < rocketGroupRefs.length; i++) {
        rocketGroupRefs[i].current.rotation.x = state.clock.elapsedTime + i * 0.5
        rocketGroupRefs[i].current.rotation.y = state.clock.elapsedTime + i * 0.3
        rocketGroupRefs[i].current.rotation.z = state.clock.elapsedTime + i * 0.6
      }
    })
    return <group name='catch-picture'>
      <Ufo
        position={[0.9, 0.4, -0.9]} 
        rotation={[Math.PI/2, -Math.PI/8 * 4, Math.PI/2]} 
        scale={1}
        glassOpacity={0.3}
      />
      <mesh position={[0.9, 0.4, -0.2]}>
        <sphereGeometry args={[0.05, 32, 16]}/>
        <meshStandardMaterial color='turquoise'/>
      </mesh>
      <mesh position={[0.9, 0.4, 0.1]}>
        <sphereGeometry args={[0.05, 32, 16]}/>
        <meshStandardMaterial color='turquoise'/>
      </mesh>
      <group ref={rocketGroupRef0} position={[0.8, 0.4, 0.6]} >
        <Rocket 
          rotation={[Math.PI/2, -Math.PI/8 * 7, Math.PI/2]} 
          scale={0.5}
        />
      </group>
      <group ref={rocketGroupRef1} position={[0.8, 0.4, 1]} >
        <Rocket 
          rotation={[Math.PI/2, -Math.PI/8 * 7, Math.PI/2]} 
          scale={0.5}
        />
      </group>
      <group ref={rocketGroupRef2} position={[1.2, 0.4, 0.8]} >
        <Rocket 
          rotation={[Math.PI/2, -Math.PI/8 * 7, Math.PI/2]} 
          scale={0.5}
        />
      </group>
      <group position={[0.9, 0.3, 0.8]} scale={1.5}>
        <BamImage position={[0, 0, 0]} rotation={[0, -Math.PI, 0]} scale={[1, 2, 1]} color='#E73D3D'/>
        <BamImage position={[0, 0, 0]} rotation={[0, -Math.PI, 0]} scale={[0.8, 3, 0.8]} color='orange'/>
        <BamImage position={[0, 0, 0]} rotation={[0, -Math.PI, 0]} scale={[0.6, 4, 0.6]} color='yellow'/>
      </group>
    </group>
  }
  


  function RocketCatchUfo() {
    const ufoGroupRef0 = useRef()
    const ufoGroupRef1 = useRef()
    const ufoGroupRef2 = useRef()
    const ufoGroupRefs = [ufoGroupRef0, ufoGroupRef1, ufoGroupRef2]
    useFrame((state, delta) => {
      for (let i = 0; i < ufoGroupRefs.length; i++) {
        ufoGroupRefs[i].current.rotation.x = state.clock.elapsedTime + i * 0.7
        ufoGroupRefs[i].current.rotation.y = state.clock.elapsedTime + i * 1.4
        ufoGroupRefs[i].current.rotation.z = state.clock.elapsedTime + i * 2.1
      }
    })
    return <group name='catch-picture'>
      <Rocket
        position={[1, 0.4, -1.1]} 
        rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
        scale={1}
      />
      <mesh position={[0.9, 0.4, -0.4]}>
        <sphereGeometry args={[0.05, 32, 16]}/>
        <meshStandardMaterial color='red'/>
      </mesh>
      <mesh position={[0.9, 0.4, -0.1]}>
        <sphereGeometry args={[0.05, 32, 16]}/>
        <meshStandardMaterial color='red'/>
      </mesh>
      <group ref={ufoGroupRef0} position={[0.7, 0.5, 0.5]}>
        <Ufo 
          rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
          scale={0.6}
          glassOpacity={0.1}
        />
      </group>
      <group ref={ufoGroupRef1} position={[1.2, 0.5, 0.8]}>
        <Ufo 
          rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
          scale={0.6}
          glassOpacity={0.1}
        />
      </group>
      <group ref={ufoGroupRef2} position={[0.7, 0.5, 1.05]}>
        <Ufo 
          rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
          scale={0.6}
          glassOpacity={0.1}
        />
      </group>
      <group position={[0.9, 0.3, 0.8]} scale={1.7}>
        <BamImage position={[0, 0, 0]} rotation={[0, -Math.PI, 0]} scale={[1, 2, 1]} color='#E73D3D'/>
        <BamImage position={[0, 0, 0]} rotation={[0, -Math.PI, 0]} scale={[0.8, 3, 0.8]} color='orange'/>
        <BamImage position={[0, 0, 0]} rotation={[0, -Math.PI, 0]} scale={[0.6, 4, 0.6]} color='yellow'/>
      </group>
    </group>
  }
  
  function handleAlertClick(e) {
    e.stopPropagation();
    setMainAlert({ type: '' })
  }

  return <animated.group position={position} rotation={rotation} scale={scale} onPointerDown={handleAlertClick}>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Cylinder.geometry}
      material={nodes.Cylinder.material}
      scale={[2.2, 0.055, 2.9]}
    >
      <meshStandardMaterial color='black' opacity={0.7} transparent/>
    </mesh>
    { team === 0 ? <RocketCatchUfo/> : <UfoCatchRocket/> }
    <Text3D
      font="fonts/Luckiest Guy_Regular.json"
      rotation={[Math.PI/2, Math.PI, Math.PI/2]}
      position={[-0.5, 0, -2.1]}
      size={0.7}
      height={0.1}
    >
      3x CATCH!
      <meshStandardMaterial color={ team === 0 ? 'red': 'turquoise' }/>
    </Text3D>
    <Text3D
      font="fonts/Luckiest Guy_Regular.json"
      rotation={[Math.PI/2, Math.PI, Math.PI/2]}
      position={[-1.2, 0, -1.6]}
      size={0.35}
      height={0.1}
    >
      BONUS THROW
      <meshStandardMaterial color={ team === 0 ? 'red': 'turquoise' }/>
    </Text3D>
    <group ref={borderMesh0Ref}>
      <YootEmoji/>
    </group>
    <group ref={borderMesh1Ref}>
      <Star scale={0.1} color={ team === 0 ? 'red': 'turquoise' }/>
    </group>
    <group ref={borderMesh2Ref}>
      <Star scale={0.1} color={ team === 0 ? 'red': 'turquoise' }/>
    </group>
    <group ref={borderMesh3Ref}>
      <Star scale={0.1} color={ team === 0 ? 'red': 'turquoise' }/>
    </group>
    <group ref={borderMesh4Ref}>
      <Star scale={0.1} color={ team === 0 ? 'red': 'turquoise' }/>
    </group>
    <group ref={borderMesh5Ref}>
      <Star scale={0.1} color={ team === 0 ? 'red': 'turquoise' }/>
    </group>
    <group ref={borderMesh6Ref}>
      <Star scale={0.1} color={ team === 0 ? 'red': 'turquoise' }/>
    </group>
  </animated.group>
}