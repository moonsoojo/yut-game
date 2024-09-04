import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useGLTF, Text3D } from "@react-three/drei";
import Rocket from "./meshes/Rocket";
import Ufo from "./meshes/Ufo";
import { animated, useSpring } from "@react-spring/three";
import Star from "./meshes/Star";
import { useAtom } from "jotai";
import { alertsAtom, currentPlayerNameAtom, gamePhaseAtom, mainAlertAtom, teamsAtom, turnAtom } from "./GlobalState";
import { formatName } from "./helpers/helpers";

export default function Alert({ position, rotation }) {
    console.log(`[Alert]`);
    const { nodes, materials } = useGLTF('models/alert-background.glb')
    
    const [alerts] = useAtom(alertsAtom)
    const [gamePhase] = useAtom(gamePhaseAtom)

    const [springs, api] = useSpring(() => ({
      from: {
        turnAlertScale: 0,
        gameStartScale: 0
      },
    }))

    function transformAlertsToAnimations(alerts) {
      let animations = []
      for (let i = 0; i < alerts.length; i++) {
        if (alerts[i] === 'gameStart') {
          animations.push({
            gameStartScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            gameStartScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'turn') {
          animations.push({
            turnAlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            turnAlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        }
      }
      return animations
    }

    useEffect(() => {
      console.log(`[Alert][useEffect] alerts`, alerts)
      const toAnimations = transformAlertsToAnimations(alerts)
      console.log(`[Alert][useEffect] toAnimations`, toAnimations)
      api.start({
        from: {
          turnAlertScale: 0
        },
        to: toAnimations,
        loop: false,
        // onStart: () => setAnimationPlaying(true),
        // onRest: () => setAnimationPlaying(false),
      })
    }, [alerts])

    // make 'game start!' component and 'turn' component
    // useSpring to animate via scale

    function TurnAlert() {
      console.log(`[TurnAlert]`);
      const [currentPlayerName] = useAtom(currentPlayerNameAtom)
      const [turn] = useAtom(turnAtom)
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
          if (borderMeshRefs[i].current) {
            borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2
            borderMeshRefs[i].current.position.y = 0.3
            borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2.7
          }
        }
        
        if (nameRef.current && nameRef.current.geometry.boundingSphere) {
          const centerX = nameRef.current.geometry.boundingSphere.center.x
          nameContainerRef.current.position.z = -centerX
        }
      })

      return <animated.group scale={springs.turnAlertScale}>
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
            {formatName(currentPlayerName, 9)}
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

    function GameStartAlert() {
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
      useFrame((state, delta) => {
        for (let i = 0; i < borderMeshRefs.length; i++) {      
          if (borderMeshRefs[i].current) {
            borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2
            borderMeshRefs[i].current.position.y = 0.1
            borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2.7
          }
        }
      })

      return <animated.group scale={springs.gameStartScale}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={nodes.Cylinder.material}
          scale={[2, 0.055, 2.6]}
        >
          <meshStandardMaterial color='black' opacity={0.8} transparent/>
        </mesh>
        <group>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[Math.PI/2, Math.PI, Math.PI/2]}
            position={[0.2,0,-1.5]}
            size={0.7}
            height={0.1}
            lineHeight={0.8}
          >
            {`GAME\nSTART!`}
            <meshStandardMaterial color='limegreen'/>
          </Text3D>
        </group>
        <group ref={borderMesh0Ref}>
          <Star 
            scale={0.2}
          />
        </group>
        <group ref={borderMesh1Ref}>
          <Star 
            scale={0.2}
          />
        </group>
        <group ref={borderMesh2Ref}>
          <Star 
            scale={0.2}
          />
        </group>
        <group ref={borderMesh3Ref}>
          <Star 
            scale={0.2}
          />
        </group>
        <group ref={borderMesh4Ref}>
          <Star 
            scale={0.2}
          />
        </group>
        <group ref={borderMesh5Ref}>
          <Star 
            scale={0.2}
          />
        </group>
        <group ref={borderMesh6Ref}>
          <Star 
            scale={0.2}
          />
        </group>
      </animated.group>
    }

    return (gamePhase === 'pregame' || gamePhase === 'game') && <group position={position} rotation={rotation}>
      <TurnAlert/>
      <GameStartAlert/>
    </group>
  }