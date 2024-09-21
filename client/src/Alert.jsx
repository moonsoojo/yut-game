import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useGLTF, Text3D } from "@react-three/drei";
import Rocket from "./meshes/Rocket";
import Ufo from "./meshes/Ufo";
import { animated, useSpring } from "@react-spring/three";
import Star from "./meshes/Star";
import { useAtom, useAtomValue } from "jotai";
import * as THREE from 'three';
import { alertsAtom, animationPlayingAtom, catchOutcomeAtom, currentPlayerNameAtom, gamePhaseAtom, mainAlertAtom, pieceAnimationPlayingAtom, teamsAtom, turnAtom, yootOutcomeAtom } from "./GlobalState";
import { formatName } from "./helpers/helpers";
import DoAlert from "./alerts/DoAlert";
import GeAlert from "./alerts/GeAlert";
import GulAlert from "./alerts/GulAlert";
import YootAlert from "./alerts/YootAlert";
import MoAlert from "./alerts/MoAlert";
import OutAlert from "./alerts/OutAlert";
import BackdoAlert from "./alerts/BackdoAlert";
import Catch1RocketAlert from "./alerts/Catch1RocketAlert";
import Catch1UfoAlert from "./alerts/Catch1UfoAlert";
import Catch2RocketAlert from "./alerts/Catch2RocketAlert";
import Catch2UfoAlert from "./alerts/Catch2UfoAlert";
import Catch3RocketAlert from "./alerts/Catch3RocketAlert";
import Catch3UfoAlert from "./alerts/Catch3UfoAlert";
import Catch4RocketAlert from "./alerts/Catch4RocketAlert";
import Catch4UfoAlert from "./alerts/Catch4UfoAlert";
import YootAlertPregame from "./alerts/YootAlertPregame";
import MoAlertPregame from "./alerts/MoAlertPregame";
import { useFireworksShader } from "./shader/fireworks/FireworksShader";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import tilePositions from './tilePositions';

export default function Alert({ position, rotation }) {
    const { nodes, materials } = useGLTF('models/alert-background.glb')
    
    const [alerts] = useAtom(alertsAtom)
    const [yootOutcome] = useAtom(yootOutcomeAtom)
    const [gamePhase] = useAtom(gamePhaseAtom)
    const [_animationPlaying, setAnimationPlaying] = useAtom(animationPlayingAtom)
    const pieceAnimationPlaying = useAtomValue(pieceAnimationPlayingAtom)
    const [CreateFirework] = useFireworksShader();
    // adding it in useEffect throws uncaught Promise
    const fireworkTextures = [
      // useLoader(TextureLoader, 'textures/particles/1.png'),
      // useLoader(TextureLoader, 'textures/particles/2.png'),
      useLoader(TextureLoader, 'textures/particles/3.png'),
      // useLoader(TextureLoader, 'textures/particles/4.png'),
      useLoader(TextureLoader, 'textures/particles/5.png'),
      useLoader(TextureLoader, 'textures/particles/6.png'),
      // useLoader(TextureLoader, 'textures/particles/7.png'),
      useLoader(TextureLoader, 'textures/particles/8.png'),
    ]

    const [springs, api] = useSpring(() => ({
      from: {
        turnAlertScale: 0,
        gameStartAlertScale: 0,
        yootOutcome1AlertScale: 0,
        yootOutcome2AlertScale: 0,
        yootOutcome3AlertScale: 0,
        yootOutcome4PregameAlertScale: 0,
        yootOutcome5PregameAlertScale: 0,
        yootOutcome4AlertScale: 0,
        yootOutcome5AlertScale: 0,
        pregameTieAlertScale: 0,
        pregameRocketsWinAlertScale: 0,
        pregameUfosWinAlertScale: 0,
        catchAlertScale: 0,
        scoreAlertScale: 0,
        joinAlertScale: 0
      },
    }))

    function transformAlertsToAnimations(alerts) {
      let animations = []
      for (let i = 0; i < alerts.length; i++) {
        if (alerts[i] === 'gameStart') {
          animations.push({
            gameStartAlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            gameStartAlertScale: 0,
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
        } else if (alerts[i] === 'yootOutcome1') {
          animations.push({
            yootOutcome1AlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            yootOutcome1AlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'yootOutcome2') {
          animations.push({
            yootOutcome2AlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            yootOutcome2AlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'yootOutcome3') {
          animations.push({
            yootOutcome3AlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            yootOutcome3AlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'yootOutcome4Pregame') {
          animations.push({
            yootOutcome4PregameAlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            yootOutcome4PregameAlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'yootOutcome5Pregame') {
          animations.push({
            yootOutcome5PregameAlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            yootOutcome5PregameAlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'yootOutcome4') {
          animations.push({
            yootOutcome4AlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            yootOutcome4AlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'yootOutcome5') {
          animations.push({
            yootOutcome5AlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            yootOutcome5AlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'pregameTie') {
          animations.push({
            pregameTieAlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            pregameTieAlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'pregameUfosWin') {
          animations.push({
            pregameUfosWinAlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            pregameUfosWinAlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i] === 'pregameRocketsWin') {
          animations.push({
            pregameRocketsWinAlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            pregameRocketsWinAlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1000
          })
        } else if (alerts[i].includes('catch')) {
          const numCaught = parseInt(alerts[0][6]);
          const delay = 1800 + (numCaught > 2 ? 500 : 0)
          animations.push({
            catchAlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            catchAlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: delay
          })
        } else if (alerts[i].includes('score')) {
          const numScored = parseInt(alerts[0][6]);
          animations.push({
            scoreAlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            scoreAlertScale: 0,
            config: {
                tension: 170,
                friction: 26
            },
            delay: 1200 + 350 * numScored
          })
        } else if (alerts[i].includes('join')) {
          animations.push({
            joinAlertScale: 1,
            config: {
                tension: 170,
                friction: 26
            },
          })
          animations.push({
            joinAlertScale: 0,
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

    function launchScoreFireworks(team, numScored) {
      console.log(`[launchScoreFireworks] ${team} ${numScored}`)
      const hue = team === 0 ? 0.01 : 0.5

      if (numScored === 4) {
        // will go to 'win screen'
      } else if (numScored === 3) {
        // firework 1 - left
        const count = Math.round(700 + Math.random() * 400);
        const position = new THREE.Vector3(
            -1.8 + Math.random()*0.1, 
            0,
            -0.9 + Math.random()*0.2, 
        )

        const size = 0.15 + Math.random() * 0.04
        const texture = fireworkTextures[Math.floor(Math.random() * fireworkTextures.length)]
        const radius = 1.0 + Math.random() * 0.2
        const color = new THREE.Color();
        color.setHSL(hue, 1, 0.6)

        CreateFirework({ count, position, size, texture, radius, color });

        // firework 2 - right
        setTimeout(() => {
          // setting 2
          const count = Math.round(700 + Math.random() * 300);
          const position = new THREE.Vector3(
              1.8 + Math.random()*0.1, 
              0,
              -0.9 + Math.random()*0.2, 
          )
          const size = 0.15 + Math.random() * 0.04
          const texture = fireworkTextures[Math.floor(Math.random() * fireworkTextures.length)]
          const radius = 1.0 + Math.random() * 0.2
          const color = new THREE.Color();
          color.setHSL(hue, 1, 0.6)
          CreateFirework({ count, position, size, texture, radius, color });
        }, 300)

        // firework 3 - middle
        setTimeout(() => {
          const count = Math.round(600 + Math.random() * 400);
          const position = new THREE.Vector3(
              0, 
              0,
              -1.9 + Math.random() * 0.1, 
          )
          const size = 0.15 + Math.random() * 0.04
          const texture = fireworkTextures[Math.floor(Math.random() * fireworkTextures.length)]
          const radius = 1.0 + Math.random() * 0.2
          const color = new THREE.Color();
          color.setHSL(hue, 1, 0.6)
          CreateFirework({ count, position, size, texture, radius, color });
        }, 600)

        // firework 4 - upper left
        setTimeout(() => {
          const count = Math.round(600 + Math.random() * 400);
          const position = new THREE.Vector3(
              -1.3 + Math.random() * 0.1, 
              0,
              -1.9 + Math.random() * 0.1, 
          )
          const size = 0.15 + Math.random() * 0.04
          const texture = fireworkTextures[Math.floor(Math.random() * fireworkTextures.length)]
          const radius = 1.0 + Math.random() * 0.2
          const color = new THREE.Color();
          color.setHSL(hue, 1, 0.6)
          CreateFirework({ count, position, size, texture, radius, color });
        }, 900)

        // firework 5 - upper right
        setTimeout(() => {
          const count = Math.round(600 + Math.random() * 400);
          const position = new THREE.Vector3(
              1.5 + Math.random() * 0.1, 
              0,
              -2.5 + Math.random() * 0.1, 
          )
          const size = 0.15 + Math.random() * 0.04
          const texture = fireworkTextures[Math.floor(Math.random() * fireworkTextures.length)]
          const radius = 1.0 + Math.random() * 0.2
          const color = new THREE.Color();
          color.setHSL(hue, 1, 0.6)
          CreateFirework({ count, position, size, texture, radius, color });
        }, 1200)

        // firework 6 - upper upper left
        setTimeout(() => {
          const count = Math.round(600 + Math.random() * 400);
          const position = new THREE.Vector3(
              -1.0 + Math.random() * 0.1, 
              0,
              -2.7 + Math.random() * 0.1, 
          )
          const size = 0.15 + Math.random() * 0.04
          const texture = fireworkTextures[Math.floor(Math.random() * fireworkTextures.length)]
          const radius = 1.0 + Math.random() * 0.2
          const color = new THREE.Color();
          color.setHSL(hue, 1, 0.6)
          CreateFirework({ count, position, size, texture, radius, color });
        }, 1500)
      } else if (numScored === 2) {
        // firework 1 - left
        const count = Math.round(700 + Math.random() * 400);
        const position = new THREE.Vector3(
            -1.8 + Math.random()*0.1, 
            0,
            -0.9 + Math.random()*0.2, 
        )

        const size = 0.15 + Math.random() * 0.04
        const texture = fireworkTextures[Math.floor(Math.random() * fireworkTextures.length)]
        const radius = 1.0 + Math.random() * 0.2
        const color = new THREE.Color();
        color.setHSL(hue, 1, 0.6)

        CreateFirework({ count, position, size, texture, radius, color });

        // firework 2 - right
        setTimeout(() => {
          // setting 2
          const count = Math.round(700 + Math.random() * 300);
          const position = new THREE.Vector3(
              1.8 + Math.random()*0.1, 
              0,
              -0.9 + Math.random()*0.2, 
          )
          const size = 0.15 + Math.random() * 0.04
          const texture = fireworkTextures[Math.floor(Math.random() * fireworkTextures.length)]
          const radius = 1.0 + Math.random() * 0.2
          const color = new THREE.Color();
          color.setHSL(hue, 1, 0.6)
          CreateFirework({ count, position, size, texture, radius, color });
        }, 400)

        // firework 3 - middle
        setTimeout(() => {
          const count = Math.round(600 + Math.random() * 400);
          const position = new THREE.Vector3(
              0, 
              0,
              -1.9 + Math.random() * 0.1, 
          )
          const size = 0.15 + Math.random() * 0.04
          const texture = fireworkTextures[Math.floor(Math.random() * fireworkTextures.length)]
          const radius = 1.0 + Math.random() * 0.2
          const color = new THREE.Color();
          color.setHSL(hue, 1, 0.6)
          CreateFirework({ count, position, size, texture, radius, color });
        }, 800)

        // firework 4 - upper left
        setTimeout(() => {
          const count = Math.round(600 + Math.random() * 400);
          const position = new THREE.Vector3(
              -1.3 + Math.random() * 0.1, 
              0,
              -2.3 + Math.random() * 0.1, 
          )
          const size = 0.15 + Math.random() * 0.04
          const texture = fireworkTextures[Math.floor(Math.random() * fireworkTextures.length)]
          const radius = 1.0 + Math.random() * 0.2
          const color = new THREE.Color();
          color.setHSL(hue, 1, 0.6)
          CreateFirework({ count, position, size, texture, radius, color });
        }, 1200)
      } else if (numScored === 1) {
        // firework 1 - left
        const count = Math.round(700 + Math.random() * 400);
        const position = new THREE.Vector3(
            -2.0 + Math.random()*0.1, 
            0,
            -1.2 + Math.random()*0.2, 
        )

        const size = 0.15 + Math.random() * 0.04
        const texture = fireworkTextures[Math.floor(Math.random() * fireworkTextures.length)]
        const radius = 1.0 + Math.random() * 0.2
        const color = new THREE.Color();
        color.setHSL(hue, 1, 0.6)

        CreateFirework({ count, position, size, texture, radius, color });

        // firework 2 - right
        setTimeout(() => {
          // setting 2
          const count = Math.round(700 + Math.random() * 300);
          const position = new THREE.Vector3(
              1.8 + Math.random()*0.1, 
              0,
              -0.9 + Math.random()*0.2, 
          )
          const size = 0.15 + Math.random() * 0.04
          const texture = fireworkTextures[Math.floor(Math.random() * fireworkTextures.length)]
          const radius = 1.0 + Math.random() * 0.2
          const color = new THREE.Color();
          color.setHSL(hue, 1, 0.6)
          CreateFirework({ count, position, size, texture, radius, color });
        }, 500)

        // firework 3 - middle
        setTimeout(() => {
          const count = Math.round(600 + Math.random() * 400);
          const position = new THREE.Vector3(
              0, 
              0,
              -1.9 + Math.random() * 0.1, 
          )
          const size = 0.15 + Math.random() * 0.04
          const texture = fireworkTextures[Math.floor(Math.random() * fireworkTextures.length)]
          const radius = 1.0 + Math.random() * 0.2
          const color = new THREE.Color();
          color.setHSL(hue, 1, 0.6)
          CreateFirework({ count, position, size, texture, radius, color });
        }, 1000)
      }
    }
    
    const cameraOffset = 0.4
    // by quadrant
    const joinAlertPositions = {
      0: [
          -Math.cos(((1 + 5) * (Math.PI * 2)) / 20) * 5 + 0.7,
          0.1,
          Math.sin(((1 + 5) * (Math.PI * 2)) / 20) * 5 + cameraOffset - 2.8,
      ],
      1: [
        -Math.cos(((1 + 5) * (Math.PI * 2)) / 20) * 5 + 0.6,
        0.5,
        Math.sin(((1 + 5) * (Math.PI * 2)) / 20) * 5 + cameraOffset - 6.7,
      ],
      2: [
        -Math.cos(((1 + 5) * (Math.PI * 2)) / 20) * 5 - 3.6,
        0.5,
        Math.sin(((1 + 5) * (Math.PI * 2)) / 20) * 5 + cameraOffset - 6.7,
      ],
      3: [
        -Math.cos(((1 + 5) * (Math.PI * 2)) / 20) * 5 - 3.6,
        0.5,
        Math.sin(((1 + 5) * (Math.PI * 2)) / 20) * 5 + cameraOffset - 2.8,
      ],
    }
    // test this function
    // input: tile
    // output: position
    // expect quadrant output
    function tileToQuadrant(tile) {
      let positionQuadrant = 0;
      if (tile >= 1 && tile <= 4) {
        positionQuadrant = 0
      } else if (tile >= 5 && tile <= 9) {
        positionQuadrant = 1
      } else if (tile >= 10 && tile <= 14) {
        positionQuadrant = 2
      } else if (tile >= 15 && tile <= 19) {
        positionQuadrant = 3
      } else if (tile >= 20 && tile <= 21) {
        positionQuadrant = 1
      } else if (tile >= 22 && tile <= 24) {
        positionQuadrant = 2
      } else if (tile >= 25 && tile <= 26) {
        positionQuadrant = 2
      } else if (tile >= 27 && tile <= 28) {
        positionQuadrant = 3
      }
      return positionQuadrant
    }
    function addSpark(position) {
      console.log('addSpark')
    }

    useEffect(() => {
      const toAnimations = transformAlertsToAnimations(alerts)
      if (!pieceAnimationPlaying) {
        api.start({
          from: {
            turnAlertScale: 0,
            gameStartAlertScale: 0,
            yootOutcome1AlertScale: 0,
            yootOutcome2AlertScale: 0,
            yootOutcome3AlertScale: 0,
            yootOutcome4PregameAlertScale: 0,
            yootOutcome5PregameAlertScale: 0,
            yootOutcome4AlertScale: 0,
            yootOutcome5AlertScale: 0,
            pregameTieAlertScale: 0,
            pregameUfosWinAlertScale: 0,
            catchAlertScale: 0,
            scoreAlertScale: 0,
            joinAlertScale: 0,
          },
          to: toAnimations,
          loop: false,
          onStart: () => setAnimationPlaying(true),
          onRest: () => setAnimationPlaying(false),
        })
        
        // if I add it in 'onStart' it will trigger on every element of the 'to' array
        if (alerts[0] && alerts[0].includes('score')) {
          const team = parseInt(alerts[0][5]);
          const numScored = parseInt(alerts[0][6]);
          launchScoreFireworks(team, numScored)
        } else if (alerts[0] && alerts[0].includes('join')) {
          const alertString = alerts[0]
          const tile = parseInt(alertString.substring(4, alertString.length));
          const position = joinAlertPositions[tileToQuadrant(tile)]
          addSpark(position)
        }
      }
    }, [alerts, pieceAnimationPlaying])

    // make 'game start!' component and 'turn' component
    // useSpring to animate via scale

    function TurnAlert() {
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

      return <animated.group scale={springs.turnAlertScale} rotation={[0, Math.PI/2, 0]}>
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

      return <animated.group scale={springs.gameStartAlertScale} rotation={[0, Math.PI/2, 0]}>
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

    function PregameTieAlert() {
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

      return <animated.group scale={springs.pregameTieAlertScale} rotation={[0, Math.PI/2, 0]}>
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
            position={[-0.1,0,-1.35]}
            size={1.2}
            height={0.1}
            lineHeight={0.8}
          >
            {`TIE!`}
            <meshStandardMaterial color='limegreen'/>
          </Text3D>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[Math.PI/2, Math.PI, Math.PI/2]}
            position={[-1,0,-1.5]}
            size={0.5}
            height={0.1}
            lineHeight={0.8}
          >
            {`go again`}
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

    function PregameRocketsWinAlert() {
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

      return <animated.group scale={springs.pregameRocketsWinAlertScale} rotation={[0, Math.PI/2, 0]}>
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
            position={[0.1,0,-1.6]}
            size={0.55}
            height={0.1}
            lineHeight={0.8}
          >
            {`ROCKETS\nGO FIRST!`}
            <meshStandardMaterial color='red'/>
          </Text3D>
        </group>
        <group ref={borderMesh0Ref}>
          <Star 
            scale={0.2}
            color='red'
          />
        </group>
        <group ref={borderMesh1Ref}>
          <Star 
            scale={0.2}
            color='red'
          />
        </group>
        <group ref={borderMesh2Ref}>
          <Star 
            scale={0.2}
            color='red'
          />
        </group>
        <group ref={borderMesh3Ref}>
          <Star 
            scale={0.2}
            color='red'
          />
        </group>
        <group ref={borderMesh4Ref}>
          <Star 
            scale={0.2}
            color='red'
          />
        </group>
        <group ref={borderMesh5Ref}>
          <Star 
            scale={0.2}
            color='red'
          />
        </group>
        <group ref={borderMesh6Ref}>
          <Star 
            scale={0.2}
            color='red'
          />
        </group>
      </animated.group>
    }

    function PregameUfosWinAlert() {  
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

      return <animated.group scale={springs.pregameUfosWinAlertScale} rotation={[0, Math.PI/2, 0]}> 
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
            position={[0.2,0,-1.7]}
            size={0.6}
            height={0.1}
            lineHeight={0.8}
          >
            {`    UFOS\nGO FIRST!`}
            <meshStandardMaterial color='turquoise'/>
          </Text3D>
        </group>
        <group ref={borderMesh0Ref}>
          <Star 
            scale={0.2}
            color='turquoise'
          />
        </group>
        <group ref={borderMesh1Ref}>
          <Star 
            scale={0.2}
            color='turquoise'
          />
        </group>
        <group ref={borderMesh2Ref}>
          <Star 
            scale={0.2}
            color='turquoise'
          />
        </group>
        <group ref={borderMesh3Ref}>
          <Star 
            scale={0.2}
            color='turquoise'
          />
        </group>
        <group ref={borderMesh4Ref}>
          <Star 
            scale={0.2}
            color='turquoise'
          />
        </group>
        <group ref={borderMesh5Ref}>
          <Star 
            scale={0.2}
            color='turquoise'
          />
        </group>
        <group ref={borderMesh6Ref}>
          <Star 
            scale={0.2}
            color='turquoise'
          />
        </group>
      </animated.group>
    }

    function YootOutcome1Alert() {
      return <animated.group scale={springs.yootOutcome1AlertScale} rotation={[0, Math.PI/2, 0]}>
        <DoAlert/>
      </animated.group>
    }
    function YootOutcome2Alert() {
      return <animated.group scale={springs.yootOutcome2AlertScale} rotation={[0, Math.PI/2, 0]}>
        <GeAlert/>
      </animated.group>
    }
    function YootOutcome3Alert() {
      return <animated.group scale={springs.yootOutcome3AlertScale} rotation={[0, Math.PI/2, 0]}>
        <GulAlert/>
      </animated.group>
    }
    function YootOutcome4PregameAlert() {
      return <animated.group scale={springs.yootOutcome4PregameAlertScale} rotation={[0, Math.PI/2, 0]}>
        <YootAlertPregame/>
      </animated.group>
    }
    function YootOutcome5PregameAlert() {
      return <animated.group scale={springs.yootOutcome5PregameAlertScale} rotation={[0, Math.PI/2, 0]}>
        <MoAlertPregame/>
      </animated.group>
    }
    function YootOutcome4Alert() {
      return <animated.group scale={springs.yootOutcome4AlertScale} rotation={[0, Math.PI/2, 0]}>
        <YootAlert/>
      </animated.group>
    }
    function YootOutcome5Alert() {
      return <animated.group scale={springs.yootOutcome5AlertScale} rotation={[0, Math.PI/2, 0]}> 
        <MoAlert/>
      </animated.group>
    }

    function CatchAlert() { // refactor like score alert with substring matching
      const teamCaught = alerts[0] && parseInt(alerts[0][5]);
      const numCaught = alerts[0] && parseInt(alerts[0][6]);
      return <animated.group scale={springs.catchAlertScale}>
        { numCaught === 1 && teamCaught === 0 && <Catch1RocketAlert/> }
        { numCaught === 2 && teamCaught === 0 && <Catch2RocketAlert/> }
        { numCaught === 3 && teamCaught === 0 && <Catch3RocketAlert/> }
        { numCaught === 4 && teamCaught === 0 && <Catch4RocketAlert/> }
        { numCaught === 1 && teamCaught === 1 && <Catch1UfoAlert/> }
        { numCaught === 2 && teamCaught === 1 && <Catch2UfoAlert/> }
        { numCaught === 3 && teamCaught === 1 && <Catch3UfoAlert/> }
        { numCaught === 4 && teamCaught === 1 && <Catch4UfoAlert/> }
      </animated.group>
    }

    function ScoreAlert() {
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

      const height = 1.7
      const width = 2.5
      useFrame((state, delta) => {
        for (let i = 0; i < borderMeshRefs.length; i++) {      
          borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
          borderMeshRefs[i].current.position.y = 0.05
          borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
        }
      })

      return <animated.group scale={springs.scoreAlertScale} rotation={[0,-Math.PI/2,0]}>
          <mesh scale={[width, 1,height]}>
              <cylinderGeometry args={[1, 1, 0.01, 32]}/>
              <meshStandardMaterial color='black' transparent opacity={0.9}/>
          </mesh>
          <Text3D
              font="fonts/Luckiest Guy_Regular.json" 
              position={[-1.4, 0.1, -0.1]}
              rotation={[-Math.PI/2, 0, 0]}
              height={0.01}
              lineHeight={0.9} 
              size={0.46}
          >
              {`Welcome\n     Back!`}
              <meshStandardMaterial color='yellow'/>
          </Text3D>
          <group ref={borderMesh0Ref}>
              <Star scale={0.15} color='yellow' />
          </group>
          <group ref={borderMesh1Ref}>
              <Star scale={0.15} color='yellow' />
          </group>
          <group ref={borderMesh2Ref}>
              <Star scale={0.15} color='yellow'/>
          </group>
          <group ref={borderMesh3Ref}>
              <Star scale={0.15} color='yellow' />
          </group>
          <group ref={borderMesh4Ref}>
              <Star scale={0.15} color='yellow' />
          </group>
          <group ref={borderMesh5Ref}>
              <Star scale={0.15} color='yellow' />
          </group>
          <group ref={borderMesh6Ref}>
              <Star scale={0.15} color='yellow' />
          </group>
      </animated.group>
    }

    function JoinAlert() {      
      const alertString = alerts[0]
      let tile = alertString && parseInt(alertString.substring(4, alertString.length));;
      // specific location for each tile
      const position = joinAlertPositions[tileToQuadrant(tile)]

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

      const height = 0.8
      const width = 1.5
      const starScale = 0.12
      useFrame((state, delta) => {
        for (let i = 0; i < borderMeshRefs.length; i++) {      
          borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
          borderMeshRefs[i].current.position.y = 0.05
          borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
        }
      })

      return <animated.group position={position} scale={springs.joinAlertScale} rotation={[0,0,0]}>
          <mesh scale={[width, 1,height]}>
            <cylinderGeometry args={[1, 1, 0.01, 32]}/>
            <meshStandardMaterial color='black' transparent opacity={0.9}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json" 
            position={[-1.0, 0.1, 0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            height={0.01}
            lineHeight={0.9} 
            size={0.4}
          >
            {`joined!`}
            <meshStandardMaterial color='green'/>
          </Text3D>
          <group ref={borderMesh0Ref}>
            <Star scale={starScale} color='green' />
          </group>
          <group ref={borderMesh1Ref}>
            <Star scale={starScale} color='green' />
          </group>
          <group ref={borderMesh2Ref}>
            <Star scale={starScale} color='green'/>
          </group>
          <group ref={borderMesh3Ref}>
            <Star scale={starScale} color='green' />
          </group>
          <group ref={borderMesh4Ref}>
            <Star scale={starScale} color='green' />
          </group>
          <group ref={borderMesh5Ref}>
            <Star scale={starScale} color='green' />
          </group>
          <group ref={borderMesh6Ref}>
            <Star scale={starScale} color='green' />
          </group>
      </animated.group>
    }

    return (gamePhase === 'pregame' || gamePhase === 'game') && <group position={position} rotation={rotation}>
      <TurnAlert/>
      <GameStartAlert/>
      <PregameTieAlert/>
      <PregameRocketsWinAlert/>
      <PregameUfosWinAlert/>
      <YootOutcome1Alert/>
      <YootOutcome2Alert/>
      <YootOutcome3Alert/>
      <YootOutcome4PregameAlert/>
      <YootOutcome5PregameAlert/>
      <YootOutcome4Alert/>
      <YootOutcome5Alert/>
      <CatchAlert/>
      <ScoreAlert/>
      <JoinAlert/>
    </group>
  }