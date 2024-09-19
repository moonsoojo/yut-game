import { Text3D, useGLTF } from "@react-three/drei";
import YootMesh from "../meshes/YootMesh";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Star from "../meshes/Star";
import { animated, useSpring } from "@react-spring/three";
import { useAtom } from "jotai";
import { mainAlertAtom } from "../GlobalState";

export default function MoAlert({ position, rotation }) {
  const { nodes, materials } = useGLTF('models/alert-background.glb')
  const [_mainAlert, setMainAlert] = useAtom(mainAlertAtom)

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
      onRest: () => {}
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

  const height = 2.3
  const width = 3
  useFrame((state, delta) => {
    for (let i = 0; i < borderMeshRefs.length; i++) {      
      borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
      borderMeshRefs[i].current.position.y = 0.05
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

  function handleAlertClick(e) {
    e.stopPropagation();
    setMainAlert({ type: '' })
  }

  return <animated.group position={position} rotation={rotation} scale={springs.scale} onPointerDown={(e) => handleAlertClick(e)}>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Cylinder.geometry}
      material={nodes.Cylinder.material}
      scale={[2.3, 0.055, 3]}
    >
      <meshStandardMaterial color='black' opacity={0.8} transparent/>
    </mesh>
    <group name="text" position={[0, -0.15, -0.36]} scale={1.2}>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        rotation={[Math.PI/2, Math.PI, Math.PI/2]}
        position={[-0.4, 0, -0.85]}
        size={0.95}
      >
        MO!
        <meshStandardMaterial color="yellow"/>
      </Text3D>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        rotation={[Math.PI/2, Math.PI, Math.PI/2]}
        position={[-1.1, 0, -1.1]}
        size={0.3}
      >
        BONUS THROW
        <meshStandardMaterial color="yellow"/>
      </Text3D>
    </group>
    {/* <group name='move-token' position={[1.4, 0.09, 0]}>
      <mesh scale={0.4}>
        <cylinderGeometry args={[1, 1, 0.1, 5, ]}/>
      </mesh>
      <Star scale={0.2} color='yellow' position={[0.22,-0.01,-0.31]}/>
      <Star scale={0.2} color='yellow' position={[-0.22,-0.01,-0.32]}/>
      <Star scale={0.2} color='yellow' position={[-0.35,-0.01,0.13]}/>
      <Star scale={0.2} color='yellow' position={[0, -0.01, 0.37]}/>
      <Star scale={0.2} color='yellow' position={[0.36, -0.01, 0.13]}/>
    </group> */}
    <group name='move-token' position={[1.4, 0.09, 0]}>
      {/* <mesh scale={0.4}>
        <cylinderGeometry args={[1, 1, 0.1, 5, ]}/>
      </mesh> */}
      <Star scale={0.25} color='yellow' position={[-0.1,-0.01,-1]}/>
      <Star scale={0.25} color='yellow' position={[-0.1,-0.01,-0.5]}/>
      <Star scale={0.25} color='yellow' position={[-0.1,-0.01,0]}/>
      <Star scale={0.25} color='yellow' position={[-0.1,-0.01,0.5]}/>
      <Star scale={0.25} color='yellow' position={[-0.1,-0.01,1]}/>
    </group>
    <group ref={borderMesh0Ref}>
      <YootEmoji/>
    </group>
    <group ref={borderMesh1Ref}>
      <Star scale={0.1} color='yellow'/>
    </group>
    <group ref={borderMesh2Ref}>
      <Star scale={0.1} color='yellow'/>
    </group>
    <group ref={borderMesh3Ref}>
      <Star scale={0.1} color='yellow'/>
    </group>
    <group ref={borderMesh4Ref}>
      <Star scale={0.1} color='yellow'/>
    </group>
    <group ref={borderMesh5Ref}>
      <Star scale={0.1} color='yellow'/>
    </group>
    <group ref={borderMesh6Ref}>
      <Star scale={0.1} color='yellow'/>
    </group>
  </animated.group>
}