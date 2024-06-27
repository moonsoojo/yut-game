import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useGLTF, Text3D } from "@react-three/drei";
import Rocket from "../meshes/Rocket";
import Ufo from "../meshes/Ufo";
import { animated, useSpring } from "@react-spring/three";
import Star from "../meshes/Star";
import { useAtom } from "jotai";
import { mainAlertAtom, teamsAtom, turnAtom } from "../GlobalState";

export default function TurnAlert({position, rotation}) {
    const { nodes, materials } = useGLTF('models/alert-background.glb')
    
    const [turn] = useAtom(turnAtom)
    const [teams] = useAtom(teamsAtom)

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

    function formatName(name) {
        if (name.length > 10) {
            return name.substring(0, 10) + '...'
        } else {
            return name
        }
    }

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
    const nameRef = useRef();
    const nameContainerRef = useRef();

    useFrame((state, delta) => {
      for (let i = 0; i < borderMeshRefs.length; i++) {      
        borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2
        borderMeshRefs[i].current.position.y = 0.3
        borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2.7
      }
      
      if (nameRef.current.geometry.boundingSphere) {
        const centerX = nameRef.current.geometry.boundingSphere.center.x
        nameContainerRef.current.position.z = -centerX
      }
    })

    return <animated.group position={position} rotation={rotation} scale={springs.scale}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={nodes.Cylinder.material}
        scale={[2, 0.055, 2.6]}
      >
        <meshStandardMaterial color='black' opacity={0.8} transparent/>
      </mesh>
      <group ref={nameContainerRef}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[Math.PI/2, Math.PI, Math.PI/2]}
          position={[0,0,0]}
          size={0.6}
          height={0.1}
          ref={nameRef}
        >
          {formatName(teams[turn.team].players[turn.players[turn.team]].name)}
          <meshStandardMaterial color={ turn.team === 0 ? 'red': 'turquoise' }/>
        </Text3D>
      </group>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        rotation={[Math.PI/2, Math.PI, Math.PI/2]}
        position={[-0.7, 0, -1.5]}
        size={0.4}
        height={0.1}
      >
        your turn!
        <meshStandardMaterial color={ turn.team === 0 ? 'red': 'turquoise' }/>
      </Text3D>
      <group ref={borderMesh0Ref}>
        <Star position={[0, 0, 0]} rotation={[Math.PI/2, -Math.PI/2, Math.PI/2]} scale={0.3} color={ turn.team === 0 ? 'red': 'turquoise' }/>
      </group>
      <group ref={borderMesh1Ref}>
        { turn.team === 0 ? <Rocket 
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
        scale={0.4}
        /> : <Ufo
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 4, Math.PI/2]} 
        scale={0.5}
        />}
      </group>
      <group ref={borderMesh2Ref}>
        { turn.team === 0 ? <Rocket 
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
        scale={0.4}
        /> : <Ufo
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 4, Math.PI/2]} 
        scale={0.5}
        />}
      </group>
      <group ref={borderMesh3Ref}>
        { turn.team === 0 ? <Rocket 
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
        scale={0.4}
        /> : <Ufo
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 4, Math.PI/2]} 
        scale={0.5}
        />}
      </group>
      <group ref={borderMesh4Ref}>
        { turn.team === 0 ? <Rocket 
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
        scale={0.4}
        /> : <Ufo
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 4, Math.PI/2]} 
        scale={0.5}
        />}
      </group>
      <group ref={borderMesh5Ref}>
        { turn.team === 0 ? <Rocket 
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
        scale={0.4}
        /> : <Ufo
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 4, Math.PI/2]} 
        scale={0.5}
        />}
      </group>
      <group ref={borderMesh6Ref}>
        { turn.team === 0 ? <Rocket 
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 5, Math.PI/2]} 
        scale={0.4}
        /> : <Ufo
        position={[0, 0, 0]} 
        rotation={[Math.PI/2, -Math.PI/8 * 4, Math.PI/2]} 
        scale={0.5}
        />}
      </group>
    </animated.group>
  }