import { useGLTF, Text3D, Float } from "@react-three/drei"
import { useRef } from "react";
import Star from "../meshes/Star"
import Ufo from "../meshes/Ufo"
import Rocket from "../meshes/Rocket"
import { useFrame } from "@react-three/fiber";
import YootMesh from "../meshes/YootMesh";
import { animated, useSpring } from "@react-spring/three";
import { turnAtom } from "../GlobalState";
import { useAtom } from "jotai";

export default function Catch4UfoAlert({ position, rotation }) {
  const { nodes, materials } = useGLTF('models/alert-background.glb')
  const [turn] = useAtom(turnAtom)

  const initialScale = 1
  const springs = useSpring({
      from: {
        scale: 0
      },
      to: [
        {
          scale: initialScale,
          // Specify config here for animation to not trigger again before delay ends
          config: {
            tension: 120,
            friction: 26
          },
        },
        {
          scale: 0,
          config: {
            tension: 100,
            friction: 26
          },
          delay: 3000
        }
      ],
      loop: false,
      reset: true, // turn it on to replay the animation
      onStart: () => {},
      onRest: () => {},
      delay: 500
  })

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
      <YootMesh position={[0, 0, -0.15]} rotation={[0, Math.PI, -Math.PI/2]} scale={0.05}/>
      <YootMesh position={[0, 0, -0.05]} rotation={[0, Math.PI, -Math.PI/2]} scale={0.05}/>
      <YootMesh position={[0, 0, 0.05]} rotation={[0, Math.PI, -Math.PI/2]} scale={0.05}/>
      <YootMesh position={[0, 0, 0.15]} rotation={[0, Math.PI, -Math.PI/2]} scale={0.05}/>
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
          position={[0, 0, 0]}
          scale={0.168}
        >
          <meshStandardMaterial color={color}/>
        </mesh>
      </group>
    )
  }

  function handleAlertClick(e) {
    e.stopPropagation();
  }

  function RocketCatchAllUfo() {
    const ufoGroupRef0 = useRef()
    const ufoGroupRef1 = useRef()
    const ufoGroupRef2 = useRef()
    const ufoGroupRef3 = useRef()
    const ufoGroupRefs = [ufoGroupRef0, ufoGroupRef1, ufoGroupRef2, ufoGroupRef3]
    useFrame((state, delta) => {
      for (let i = 0; i < ufoGroupRefs.length; i++) {
        ufoGroupRefs[i].current.rotation.x = state.clock.elapsedTime + i * 0.5
        ufoGroupRefs[i].current.rotation.y = state.clock.elapsedTime + i * 0.3
        ufoGroupRefs[i].current.rotation.z = state.clock.elapsedTime + i * 0.6
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
      <animated.group ref={ufoGroupRef0} position={[0.6, 0.7, 0.4]} >
        <Ufo 
          rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
          scale={0.7}
          glassOpacity={0.1}
        />
      </animated.group>
      <animated.group ref={ufoGroupRef1} position={[1.3, 0.7, 0.5]} >
        <Ufo 
          rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
          scale={0.7}
          glassOpacity={0.1}
        />
      </animated.group>
      <animated.group ref={ufoGroupRef2} position={[0.6, 0.7, 1.1]} >
        <Ufo 
          rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
          scale={0.7}
          glassOpacity={0.1}
        />
      </animated.group>
      <animated.group ref={ufoGroupRef3} position={[1.3, 0.7, 1.2]} >
        <Ufo 
          rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
          scale={0.7}
          glassOpacity={0.1}
        />
      </animated.group>
      <group position={[1, 0.3, 0.8]} scale={1.7}>
        <BamImage position={[0, 0, 0]} rotation={[0, -Math.PI, 0]} scale={[1, 2, 1]} color='#E73D3D'/>
        <BamImage position={[0, 0, 0]} rotation={[0, -Math.PI, 0]} scale={[0.8, 3, 0.8]} color='orange'/>
      </group>
    </group>
  }

  return <animated.group position={position} rotation={rotation} scale={springs.scale} onPointerDown={(e) => handleAlertClick(e)}>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Cylinder.geometry}
      material={nodes.Cylinder.material}
      scale={[2.2, 0.055, 2.9]}
    >
      <meshStandardMaterial color='black' opacity={0.7} transparent/>
    </mesh>
    <RocketCatchAllUfo/>
    <Text3D
      font="fonts/Luckiest Guy_Regular.json"
      rotation={[Math.PI/2, Math.PI, Math.PI/2]}
      position={[-0.5, 0, -1.5]}
      size={0.7}
      height={0.1}
    >
      CATCH!
      <meshStandardMaterial color='turquoise'/>
    </Text3D>
    <Text3D
      font="fonts/Luckiest Guy_Regular.json"
      rotation={[Math.PI/2, Math.PI, Math.PI/2]}
      position={[-1.2, 0, -1.6]}
      size={0.35}
      height={0.1}
    >
      BONUS THROW
      <meshStandardMaterial color='turquoise'/>
    </Text3D>
    <group ref={borderMesh0Ref}>
      <YootEmoji/>
    </group>
    <group ref={borderMesh1Ref}>
      <Star scale={0.2} color='turquoise'/>
    </group>
    <group ref={borderMesh2Ref}>
      <Star scale={0.2} color='turquoise'/>
    </group>
    <group ref={borderMesh3Ref}>
      <Star scale={0.2} color='turquoise'/>
    </group>
    <group ref={borderMesh4Ref}>
      <Star scale={0.2} color='turquoise'/>
    </group>
    <group ref={borderMesh5Ref}>
      <Star scale={0.2} color='turquoise'/>
    </group>
    <group ref={borderMesh6Ref}>
      <Star scale={0.2} color='turquoise'/>
    </group>
  </animated.group>
}

useGLTF.preload('models/alert-background.glb')
useGLTF.preload('models/bam-emoji.glb')