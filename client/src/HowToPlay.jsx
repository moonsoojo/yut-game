import { Float, MeshDistortMaterial, Text3D, useGLTF } from '@react-three/drei';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import React, { useEffect, useRef, useState } from 'react';
import YootButtonModel from './meshes/YootButtonModel';
import { useFrame, useThree } from '@react-three/fiber';
import Cursor from './meshes/Cursor';
import Earth from './meshes/Earth';
import Mars from './meshes/Mars';
import Saturn from './meshes/Saturn';
import Neptune from './meshes/Neptune';
import Moon from './meshes/Moon';
import Star from './meshes/Star';
import layout from './layout';
import Rocket from './meshes/Rocket';
import Pointer from './meshes/Pointer';
import { useSpring, animated } from '@react-spring/three';
import Cursor2 from './meshes/Cursor2';
import Check from './meshes/Check';
import System, {
  Emitter,
  Rate,
  Span,
  Position,
  Mass,
  Radius,
  Life,
  PointZone,
  Vector3D,
  Alpha,
  Scale,
  Color,
  Body,
  RadialVelocity,
  SpriteRenderer,
  ColorSpan,
} from "three-nebula";
import * as THREE from 'three';
import Ufo from './meshes/Ufo';
import BonusTurn from './meshes/BonusTurn';
import ArrowBlender from './meshes/ArrowBlender';
import YootSet from './meshes/YootSet';
import { particleSettingAtom } from './GlobalState';
import { useAtom } from 'jotai';

export default function HowToPlay({ device, position, rotation, scale }) {
  
  const PAGE_2_PLAY_TIME = 14400 // scene loops, but it ends more quickly 
  const [page, setPage] = useState(0)

  const [pageTimeout, setPageTimeout] = useState(null)
  useEffect(() => {
    clearTimeout(pageTimeout)
    if (page === 0) {
      const page1Timeout = setTimeout(() => {
        setPage(1)
      }, 11000)
      setPageTimeout(page1Timeout)
    } else if (page === 1) {
      const page2Timeout = setTimeout(() => {
        setPage(2)
      }, 12000)
      setPageTimeout(page2Timeout)
    } else if (page === 2) {
      const page3Timeout = setTimeout(() => {
        setPage(3)
      }, PAGE_2_PLAY_TIME)
      setPageTimeout(page3Timeout)
    } else if (page === 3) {
      const page4Timeout = setTimeout(() => {
        setPage(4)
      }, 14500)
      setPageTimeout(page4Timeout)
    } else if (page === 4) {
      const page5Timeout = setTimeout(() => {
        setPage(5)
      }, 17500)
      setPageTimeout(page5Timeout)
    } else if (page === 5) {
      const page6Timeout = setTimeout(() => {
        setPage(6)
      }, 23500)
      setPageTimeout(page6Timeout)
    } else if (page === 6) {
      const page0Timeout = setTimeout(() => {
        setPage(0)
      }, 14500)
      setPageTimeout(page0Timeout)
    }
  }, [page])
  
  function Page0() {
    
    const nodes = useGLTF("models/yoot-highlight.glb").nodes;
    const materials = useGLTF("models/yoot-highlight.glb").materials;
    const nodesRhino = useGLTF("models/yoot-rhino-highlight.glb").nodes;
    const materialsRhino = useGLTF("models/yoot-rhino-highlight.glb").materials;

    const NUM_YOOTS = 4;
    let yoots = [];
    for (let i = 0; i < NUM_YOOTS; i++) {
      yoots.push(useRef());
    }

    const [startTime, setStartTime] = useState(0)
    const yoot0Mat = useRef()
    const yoot1Mat = useRef()
    const yoot2Mat = useRef()
    const yoot3Mat = useRef()
    const textRef = useRef()
    const yootMats = [yoot0Mat, yoot1Mat, yoot2Mat, yoot3Mat]
    const loopTime = 12
    const [yootButtonTurnedOn, setYootButtonTurnedOn] = useState(true)
    const throwTime = 2
    const [thrown, setThrown] = useState(false)
    const effectTime = 2.2
    const [effect, setEffect] = useState(false)
    const record0Time = 5
    const [record0, setRecord0] = useState(false)
    const record1Time = 5.5
    const [record1, setRecord1] = useState(false)
    const record2Time = 6
    const [record2, setRecord2] = useState(false)
    const record3Time = 6.5
    const [record3, setRecord3] = useState(false)
    const textTime = 7.1
    const [text, setText] = useState(false)

    useFrame((state, delta) => {
      if (startTime === 0) {
        setStartTime(state.clock.elapsedTime)
      } else {
        if (startTime + loopTime > state.clock.elapsedTime) {
          if (startTime + throwTime < state.clock.elapsedTime && !thrown) {
            for (let i = 0; i < 4; i++) {
              yoots[i].current.setLinvel({ x: 0, y: 0, z: 0 })
              yoots[i].current.setAngvel({ x: 0, y: 0, z: 0 })
              yoots[i].current.setTranslation(layout[device].howToPlay.page0.yoot.initialThrowPos[i]);
              yoots[i].current.setRotation({ x: 0, y: 1, z: 0, w: 1 }, true);
              if (device === "landscapeDesktop") {
                yoots[i].current.applyImpulse({
                  x: 0,
                  y: 5,
                  z: 0,
                });
                yoots[i].current.applyTorqueImpulse({
                  x: 3,
                  y: 0.003,
                  z: 0.16 + i * 0.01,
                });
              } else {
                yoots[i].current.applyImpulse({
                  x: 0,
                  y: 0.25,
                  z: 0,
                });
                yoots[i].current.applyTorqueImpulse({
                  x: 0.002,
                  y: 0.001,
                  z: 0.003 + i * 0.00005,
                });
              }
            }
            setYootButtonTurnedOn(false)
            setThrown(true)
            setEffect(true)
          } else if ((startTime + effectTime < state.clock.elapsedTime) && effect) {
            setEffect(false)
          } else if ((startTime + record0Time < state.clock.elapsedTime) && !record0) {
            yootMats[0].current.opacity = 1
            setRecord0(true)
          } else if ((startTime + record1Time < state.clock.elapsedTime) && !record1) {
            yootMats[1].current.opacity = 1
            setRecord1(true)
          } else if ((startTime + record2Time < state.clock.elapsedTime) && !record2) {
            yootMats[2].current.opacity = 1
            setRecord2(true)
          } else if ((startTime + record3Time < state.clock.elapsedTime) && !record3) {
            yootMats[3].current.opacity = 1
            setRecord3(true)
          } else if (startTime + textTime < state.clock.elapsedTime && !text) {
            setText(true)
          } else if (startTime + textTime < state.clock.elapsedTime) {
            textRef.current.scale.x = Math.cos(state.clock.elapsedTime * 3) * 0.1 + 1.2
            textRef.current.scale.y = Math.cos(state.clock.elapsedTime * 3) * 0.1 + 1.2
            textRef.current.scale.z = Math.cos(state.clock.elapsedTime * 3) * 0.1 + 1.2
          }
        } else {
          setStartTime(0);
          setThrown(false);
          for (let i = 0; i < 4; i++) {
            yoots[i].current.setTranslation(layout[device].howToPlay.page0.yoot.initialThrowPos[i]);
            yoots[i].current.setRotation({ x: 0, y: 1, z: 0, w: 1 }, true);
          }
          setRecord0(false)
          yootMats[0].current.opacity = 0
          setRecord1(false)
          yootMats[1].current.opacity = 0
          setRecord2(false)
          yootMats[2].current.opacity = 0
          setRecord3(false)
          yootMats[3].current.opacity = 0
          setText(false)
          setYootButtonTurnedOn(true)
        }
      }
    })

    return <group name='how-to-play-page-0'>
      <group
        position={layout[device].howToPlay.page0.text.position}
        rotation={[Math.PI/8, 0, 0]}
      >
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-3.5,0,-2.5]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.5}
          height={0.01}
        >
          {`1. Throw the yoot (dice).`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-3.5,0,-1.8]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.5}
          height={0.01}
        >
          {`The way they lie determines`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-3.5,0,-1.1]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.5}
          height={0.01}
        >
          {'how many steps to advance.'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group>
      {/* <Physics> */}
      <>
        <RigidBody type="fixed">
          <CuboidCollider args={[5, 0.3, 5]} restitution={0.2} friction={1}/>
          <mesh>
            <boxGeometry args={[10, 0.6, 10]} />
            <meshStandardMaterial 
              transparent 
              color='yellow'
              opacity={0}
            />
          </mesh>
        </RigidBody>
        {yoots.map((ref, index) => {
          return (
            <RigidBody
              ref={ref}            
              position={layout[device].howToPlay.page0.yoot.initialPos[index]}
              rotation={[0, Math.PI/2, 0]}
              colliders="hull"
              restitution={0.3}
              friction={0.6}
              name={`yoot${index}`}
              linearDamping={0.3}
              angularDamping={0.1} // when this value is high, yoots spin more
              scale={0.35}
              gravityScale={2}
              key={index}
            >
              {index != 0 ? (
                <group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder011.geometry}
                    material={materials["Texture wrap.008"]}
                    position={[0, 0.021, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[1, 6.161, 1]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane.geometry}
                    material={nodes.Plane.material}
                    rotation={[-Math.PI, 0, 0]}
                    scale={[4.905, 1, 0.455]}
                  >
                    <meshStandardMaterial 
                      color="white" 
                      transparent 
                      opacity={0}
                      ref={yootMats[index]}
                    />
                  </mesh>
                </group>
              ) : (
                <group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodesRhino.Cylinder007.geometry}
                    material={materialsRhino["Texture wrap.005"]}
                    position={[0, 0.022, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[1, 6.161, 1]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodesRhino.Plane001.geometry}
                    material={nodesRhino.Plane001.material}
                    rotation={[-Math.PI, 0, 0]}
                    scale={[4.892, 1, 0.443]}
                  >
                    <meshStandardMaterial 
                      color="white" 
                      transparent 
                      opacity={0}
                      ref={yootMats[index]}
                    />
                  </mesh>
                </group>
              )}
            </RigidBody>
          );
        })}
        { text && <Text3D
          position={layout[device].howToPlay.page0.moveText.position}
          rotation={[-Math.PI/2,0,0]}
          font="fonts/Luckiest Guy_Regular.json" 
          size={0.5} 
          height={0.01}
          ref={textRef}
        >
          {layout[device].howToPlay.page0.moveText.text}
          <meshStandardMaterial color={ "limegreen" }/>
        </Text3D>}
      </>
      {/* </Physics> */}
      <YootButtonModel
        position={layout[device].howToPlay.page0.yootButtonModel.position}
        rotation={layout[device].howToPlay.page0.yootButtonModel.rotation}
        turnedOn={yootButtonTurnedOn}
      />
      <Cursor
        position={layout[device].howToPlay.page0.cursor.position}
        rotation={layout[device].howToPlay.page0.cursor.rotation}
        scale={layout[device].howToPlay.page0.cursor.scale}
        effect={effect}
      />
    </group>
  }

  function Page1() {
    const springs = useSpring({
      from: {
        cursorPos: layout[device].howToPlay.page1.cursorPos0,
        rocket3Scale: 1.5,
        cursorEffectOpacity: 0,
        legalTileScale: 0.4,
        pointerOpacity: 0,
        rocket3Pos: layout[device].howToPlay.page1.rocket3Pos0
      },
      to: [
        {
          cursorPos: layout[device].howToPlay.page1.cursorPos1,
          delay: 1000
        },
        {
          rocket3Scale: 2.5,
          cursorEffectOpacity: 1,
          legalTileScale: 0.8,
          pointerOpacity: 1,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: 0,
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          cursorPos: layout[device].howToPlay.page1.cursorPos2,
          delay: 800,
        },
        {
          cursorEffectOpacity: 1,
          rocket3Pos: layout[device].howToPlay.page1.rocket3Pos1,
          rocket3Scale: 1.5,
          legalTileScale: 0.4,
          pointerOpacity: 0,
          delay: 1000,
          config: {
            tension: 0,
            friction: 1
          }
        },
        {
          cursorEffectOpacity: 0,
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          rocket3Pos: layout[device].howToPlay.page1.rocket3Pos2,
          delay: 100,
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket3Pos: layout[device].howToPlay.page1.rocket3Pos3,
          delay: 100,
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket3Pos: layout[device].howToPlay.page1.rocket3Pos4,
          delay: 100,
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          delay: 5000,
        },
      ],
      loop: true,
      delay: 500
    })
    
    function FirstCornerTiles({ position }) {
      let tiles = [];

      //circle
      const NUM_STARS = 20
      const TILE_RADIUS = 5;
      for (let i = 0; i < 6; i++) {
        let position = [
          -Math.cos(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
          0,
          Math.sin(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
        ];``
        if (i == 0) {
          tiles.push(<Earth position={position} key={i} scale={0.4}/>);
        } else {
          if (i === 3) {
            tiles.push(
              <group 
                position={position}
                key={i}
              >
                <Star
                  tile={i}
                  scale={springs.legalTileScale}
                  device={device}
                />
                <Pointer color='red' position={[0,1.7,0]} scale={2.5} opacity={springs.pointerOpacity}/>
              </group>
            )
          } else {            
            tiles.push(
              <Star
                position={position}
                tile={i}
                key={i}
                scale={layout[device].howToPlay.star.scale}
                device={device}
              />
            )
          }
        }
      }
  
      return <group position={position}>
        { tiles }
      </group>;
    }
    
    const rocket0 = useRef()
    const rocket1 = useRef()
    const rocket2 = useRef()
    const rocket3 = useRef()
    const cursorRef = useRef()
    function HomePieces({ position }) {
      return <group position={position}>
        <group name='rocket-0' ref={rocket0}>
          <Rocket position={[-0.4,-0.5,-0.5]} scale={1.5}/>
        </group>
        <group name='rocket-1' ref={rocket1}>
          <Rocket position={[0.8,-0.5,-0.5]} scale={1.5}/>
        </group>
        <group name='rocket-2' ref={rocket2}>
          <Rocket position={[-0.4,-0.5,0.7]} scale={1.5}/>
        </group>
        <animated.group name='rocket-3' ref={rocket3} position={springs.rocket3Pos} scale={springs.rocket3Scale}>
          <Rocket />
        </animated.group>
      </group>
    }

    function MoveDisplay({ position }) {
      return <Text3D
        position={position}
        rotation={[-Math.PI/2,0,0]}
        font="fonts/Luckiest Guy_Regular.json" 
        size={0.5} 
        height={0.01}
      >
        MOVE: 3-STEPS
        <meshStandardMaterial color={ "limegreen" }/>
      </Text3D>
    }

    return <group name='how-to-play-page-1'>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].howToPlay.page1.text.position}
        rotation={layout[device].howToPlay.page1.text.rotation}
        size={layout[device].howToPlay.page1.text.size}
        height={0.01}
      >
        {'2. Advance your piece.'}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <FirstCornerTiles position={layout[device].howToPlay.page1.firstCornerTiles.position}/>
      <HomePieces position={layout[device].howToPlay.page1.homePieces.position}/>
      <MoveDisplay position={layout[device].howToPlay.page1.moveDisplay.position}/>
      <group ref={cursorRef}>
        <Cursor
          position={springs.cursorPos}
          scale={[3, 3, 0.1]}
          effectOpacity={springs.cursorEffectOpacity}
          effect={true}
        />
      </group>
    </group>
  }

  function createSprite(texturePath) {
    var map = new THREE.TextureLoader().load(texturePath);
    var material = new THREE.SpriteMaterial({
      map: map,
      color: 0xfffff,
      blending: THREE.AdditiveBlending,
      fog: true,
    });
    return new THREE.Sprite(material);
  }

  function Page2() {
    const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

    const letsGoMatRef = useRef();
    const letsGoRef = useRef();
    const freqR = 0.4
    const freqG = 0.6
    const freqB = 0.8
    useFrame((state, delta) => {
      // letsGoMatRef.current.color.r = Math.cos(state.clock.elapsedTime*freqR * 4) + 0.3
      // letsGoMatRef.current.color.g = Math.cos(state.clock.elapsedTime*freqG * 4) + 0.4
      // letsGoMatRef.current.color.b = Math.cos(state.clock.elapsedTime*freqB * 4) + 0.5
      letsGoRef.current.scale.x = Math.cos(state.clock.elapsedTime * 4) * 0.1 + 1.1
      letsGoRef.current.scale.y = Math.cos(state.clock.elapsedTime * 4) * 0.1 + 1.1
      letsGoRef.current.scale.z = Math.cos(state.clock.elapsedTime * 4) * 0.1 + 1.1
    })

    function Fireworks() {

      const [_particleSetting, setParticleSetting] = useAtom(particleSettingAtom)
  
      const zone = new PointZone(0, 0);
      useEffect(() => {
        const fireTimeoutId = setTimeout(() => {
          setParticleSetting({
            emitters: [
              {
                initialPosition: {
                  x: layout[device].howToPlay.page2.fireworks.initialPosition.x,
                  y: layout[device].howToPlay.page2.fireworks.initialPosition.y,
                  z: layout[device].howToPlay.page2.fireworks.initialPosition.z,
                },
                positionRange: {
                  x: layout[device].howToPlay.page2.fireworks.positionRange.x,
                  y: layout[device].howToPlay.page2.fireworks.positionRange.y,
                  z: layout[device].howToPlay.page2.fireworks.positionRange.z,
                },
                randomizePosition: true,
                rate: new Rate(20, 1),
                initializers: [
                  new Position(zone),
                  new Mass(0.1),
                  new Radius(1.5, 1.7),
                  new Life(1.5, 2),
                  new Body(createSprite('./textures/dot.png')),
                  new RadialVelocity(3, new Vector3D(0, 5, 0), 180)
                ],
                behaviours: [
                  new Alpha(0.7, 0),
                  new Scale(0.5, 0.2),
                  new Color(new THREE.Color("#00ff00"), new THREE.Color("#ff0000"))
                ],
                numEmit: 'infinite'
              }
            ]
          })
        }, 9000)
        console.log(fireTimeoutId)
        return () => {
          console.log('page 2 unmount') // triggers on page switch
          setParticleSetting(null)
          console.log(`fireTimeoutId ${fireTimeoutId}`) // triggers on page switch
          clearTimeout(fireTimeoutId)
        }
      }, [device])
    }

    // place on top of tiles with .map
    // adjust neptune particle size
    function Tiles({ device, rotation }) {
      const TILE_RADIUS = layout[device].howToPlay.tileRadius.ring
      const NUM_STARS = 20;
      let tiles = [];
      let rocket3AnimationsArray = []
      //circle
      for (let i = 0; i < NUM_STARS; i++) {
        if (i == 0 || i >= 5) {
          let position = [
            -Math.cos(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
            0,
            Math.sin(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
          ];
          if (i == 0) {
            tiles.push(<Earth position={position} scale={0.4} key={i}/>);
          } else if (i == 5) {
            tiles.push(
              <Mars
                position={position}
                scale={0.4}
                key={i}
              />
            );
          } else if (i == 10) {
            tiles.push(<Saturn position={position} scale={0.4} key={i}/>);
          } else if (i == 15) {
            tiles.push(<Neptune position={position} scale={0.4} key={i}/>);
          } else {
            tiles.push(
              <Star
                position={position}
                key={i}
                scale={layout[device].howToPlay.star.scale}
                device={device}
              />
            );
          }
          rocket3AnimationsArray.push(
            {
              rocket3Pos: [
                position[0]-0.2,
                position[1]+1,
                position[2]
              ],
              delay: 100,
              config: {
                tension: 300,
                clamp: true
              },
            },
          )
        }
      }

      // doesn't trigger re-render
      const springs = useSpring({
        from: {
          rocket3Pos: rocket3AnimationsArray[1].rocket3Pos,
          rocket3Scale: 1,
          tilesScale: layout[device].howToPlay.page2.tilesScale0,
          tilesPos: layout[device].howToPlay.page2.tilesPos0,
          rocketHomeScale: 0,
          shortcutStarScale: layout[device].howToPlay.star.scale,
          moveScale: 0,
          scoreScale: 0,
          scoreColor: '#ffff00',
          cursorScale: 0,
          cursorPos: layout[device].howToPlay.page2.cursorPos[0],
          cursorEffectOpacity: 0,
          checkmarkColor: '#808080',
          checkmarkScale: 0,
          letsGoScale: 0,
        },
        to: [
          ...rocket3AnimationsArray.slice(2), 
          rocket3AnimationsArray[0],
          {
            tilesScale: layout[device].howToPlay.page2.tilesScale1,
            tilesPos: layout[device].howToPlay.page2.tilesPos1,
            rocketHomeScale: layout[device].howToPlay.page2.rocketHomeScale1,
            checkmarkScale: 0.3,
            shortcutStarScale: 0,
            moveScale: 1,
            cursorScale: 2,
            delay: 500
          },
          {
            cursorPos: layout[device].howToPlay.page2.cursorPos[1],
            delay: 500
          },
          {
            cursorEffectOpacity: 1,
            rocket3Scale: 1.5,
            scoreScale: 1,
            delay: 500,
            config: {
              tension: 0,
              clamp: true
            },
          },
          {
            cursorEffectOpacity: 0,
            delay: 200,
            config: {
              tension: 0,
              clamp: true
            },
          },
          {
            cursorPos: layout[device].howToPlay.page2.cursorPos[2],
            scoreColor: '#ffffff',
            delay: 500
          },
          {
            cursorEffectOpacity: 1,
            cursorPos: layout[device].howToPlay.page2.cursorPos[3],
            scoreScale: 0,
            moveScale: 0,
            rocket3Scale: 0,
            checkmarkColor: '#ff0000',
            letsGoScale: 1,
            delay: 500,
            config: {
              tension: 0,
              clamp: true
            },
          },
          {
            cursorEffectOpacity: 0,
            delay: 100,
            config: {
              tension: 0,
              clamp: true
            },
          },
          {
            delay: 20000,
          },
        ],
        loop: true
      })

      function HomePieces({ position }) {
        return <group position={position}>
          <animated.group name='rocket-0' position={layout[device].howToPlay.page2.rocket0Pos} scale={springs.rocketHomeScale}>
            <Rocket/>
          </animated.group>
          <animated.group name='rocket-1' position={layout[device].howToPlay.page2.rocket1Pos} scale={springs.rocketHomeScale}>
            <Rocket/>
          </animated.group>
          <animated.group name='rocket-2' position={layout[device].howToPlay.page2.rocket2Pos} scale={springs.rocketHomeScale}>
            <Rocket/>
          </animated.group>
          <Check 
            position={layout[device].howToPlay.page2.checkPos} 
            rotation={[Math.PI/8, 0, 0]}
            scale={springs.checkmarkScale} 
            color={springs.checkmarkColor}
          />
        </group>
      }
      // add components that use springs
  
      //shortcuts
      const radiusShortcut1 = layout[device].howToPlay.tileRadius.shortcut1;
      const radiusShortcut2 = layout[device].howToPlay.tileRadius.shortcut2;
      for (let i = 0; i < NUM_STARS; i++) {
        let indexShortcut1;
        let indexShortcut2;
        if (i == 0) {
          indexShortcut1 = 24;
          indexShortcut2 = 23;
        } else if (i == 5) {
          indexShortcut1 = 28;
          indexShortcut2 = 27;
        } else if (i == 10) {
          indexShortcut1 = 20;
          indexShortcut2 = 21;
        } else if (i == 15) {
          indexShortcut1 = 25;
          indexShortcut2 = 26;
        }
        if (i == 0 || i == 5 || i == 10 || i == 15) {
          let position1 = [
            Math.sin(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut1,
            0,
            Math.cos(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut1,
          ]
          tiles.push(
            <Star
              position={position1}
              tile={indexShortcut1}
              key={i + 30}
              scale={i == 5 ? springs.shortcutStarScale : layout[device].howToPlay.star.scale}
              device={device}
            />
          );
          let position2 = [
            Math.sin(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut2,
            0,
            Math.cos(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut2,
          ]
          tiles.push(
            <Star
              position={position2}
              tile={indexShortcut2}
              key={i + 41}
              scale={i == 5 ? springs.shortcutStarScale : layout[device].howToPlay.star.scale}
              device={device}
            />
          );
        }
      }
      // center piece
      tiles.push(
        <Moon
          position={[0,0,0]}
          scale={0.4}
          key={100}
        />
      );
      // shoot fireworks
      // change color on 'lets go' text into rainbow
      return <animated.group position={springs.tilesPos} rotation={rotation} scale={springs.tilesScale}>
        {tiles}
        <animated.group name='rocket-3' position={springs.rocket3Pos} scale={springs.rocket3Scale}>
          <Rocket/>
        </animated.group>
        <group name='rocket-home'>
          <HomePieces position={[-2, 0, 2]}/>
        </group>
        <animated.group scale={springs.moveScale}>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={layout[device].howToPlay.page2.moveText.position}
            rotation={layout[device].howToPlay.page2.moveText.rotation}
            size={0.4}
            height={0.01}
          >
            {'MOVE: 1-STEP'}
            <meshStandardMaterial color='limegreen'/>
          </Text3D>
        </animated.group>
        <animated.group scale={springs.letsGoScale}>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={layout[device].howToPlay.page2.letsGoText.position}
            rotation={layout[device].howToPlay.page2.letsGoText.rotation}
            size={0.4}
            height={0.01}
            ref={letsGoRef}
          >
            {`let's\ngo!`}
            <meshStandardMaterial color='yellow' ref={letsGoMatRef}/>
          </Text3D>
        </animated.group>
        <animated.group scale={springs.scoreScale}>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json" 
            position={layout[device].howToPlay.page2.scoreText.position}
            rotation={layout[device].howToPlay.page2.scoreText.rotation}
            size={layout[device].howToPlay.page2.scoreText.size} 
            height={0.01}
          >
            SCORE
            <AnimatedMeshDistortMaterial color={springs.scoreColor} distort={0}/>
          </Text3D>
        </animated.group>
        <group>
          <Cursor2
            position={springs.cursorPos}
            rotation={[0,0,0]}
            scale={springs.cursorScale}
            effectOpacity={springs.cursorEffectOpacity}
            effect={true}
          />
        </group>
      </animated.group>;
    }

    return <group>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].howToPlay.page2.text.position}
        rotation={layout[device].howToPlay.page2.text.rotation}
        size={layout[device].howToPlay.page2.text.size}
        height={layout[device].howToPlay.page2.text.height}
        lineHeight={layout[device].howToPlay.page2.text.lineHeight}
      >
        {`3. First team to\nmove four pieces\naround the board\nto earth wins!`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <Tiles device={device}/>
      <Fireworks/>
    </group>
  }

  // capture
  function Page3() {
    const springs = useSpring({
      from: {
        cursorPos: layout[device].howToPlay.page3.cursorPos[0],
        rocketScale: 1.5,
        cursorEffectOpacity: 0,
        legalTileScale: 0.4,
        pointerOpacity: 0,
        rocketPos: layout[device].howToPlay.page3.rocketPos[0],
        ufoPos: layout[device].howToPlay.page3.ufoPos[0],
        ufoScale: 1.5,
        moveTextScale: 1,
        bonusTurnScale: 0,
        yootButtonScale: 0,
        firstCornerTilesPos: layout[device].howToPlay.page3.firstCornerTilesPos[0]
      },
      to: [
        {
          cursorPos: layout[device].howToPlay.page3.cursorPos[1],
          delay: 1000
        },
        {
          cursorEffectOpacity: 1,
          rocketScale: 2.1,
          legalTileScale: 0.8,
          pointerOpacity: 1,
          ufoScale: 2,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: 0,
          delay: 200,
        },
        {
          cursorPos: layout[device].howToPlay.page3.cursorPos[2],
          delay: 1000,
        },
        {
          cursorEffectOpacity: 1,
          rocketScale: 1.5,
          legalTileScale: 0.4,
          pointerOpacity: 0,
          ufoScale: 1.5,
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: 0,
          cursorPos: layout[device].howToPlay.page3.cursorPos[3],
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          rocketPos: layout[device].howToPlay.page3.rocketPos[1],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocketPos: layout[device].howToPlay.page3.rocketPos[2],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocketPos: layout[device].howToPlay.page3.rocketPos[3],
          ufoPos: layout[device].howToPlay.page3.ufoPos[1],
          ufoScale: 0,
          config: {
            tension: 60,
            friction: 26
          }
        },
        {
          moveTextScale: 0,
          bonusTurnScale: 2,
          yootButtonScale: 1,
          firstCornerTilesPos: layout[device].howToPlay.page3.firstCornerTilesPos[1],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          delay: 5000,
        },
      ],
      loop: true,
      delay: 500
    })

    function FirstCornerTiles({ position }) {
      let tiles = [];

      //circle
      const NUM_STARS = 20
      const TILE_RADIUS = 5;
      for (let i = 0; i < 4; i++) {
        let position = [
          -Math.cos(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
          0,
          Math.sin(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
        ];
        if (i === 3) {
          tiles.push(
            <group 
              position={position}
              key={i}
            >
              <Star
                tile={i}
                scale={springs.legalTileScale}
                device={device}
              />
              <Pointer color='red' position={layout[device].howToPlay.page3.pointer.position} scale={2} opacity={springs.pointerOpacity}/>
            </group>
          )
        } else {            
          tiles.push(
            <Star
              position={position}
              tile={i}
              key={i}
              scale={layout[device].howToPlay.star.scale}
              device={device}
            />
          )
        }
      }
  
      return <animated.group position={position}>
        { tiles }
        <animated.group name='rocket' position={springs.rocketPos} scale={springs.rocketScale} >
          <Rocket/>
        </animated.group>
        <animated.group name='ufo' position={springs.ufoPos} scale={springs.ufoScale} >
          <Ufo/>
        </animated.group>
      </animated.group>;
    }

    // ufo is flipped over, moved to a corner and scaled to 0. show sparkle
    return <group>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.page3.text.position}
          rotation={layout[device].howToPlay.page3.text.rotation}
          size={layout[device].howToPlay.page3.text.size}
          height={layout[device].howToPlay.page3.text.height}
          lineHeight={layout[device].howToPlay.page3.text.lineHeight}
        >
          {`4. If you move into a tile with\nan enemy, you will capture it.\nYou will also get another turn.`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      <FirstCornerTiles position={springs.firstCornerTilesPos}/>
      <animated.group scale={springs.moveTextScale}>
        <Text3D
          position={layout[device].howToPlay.page3.moveText.position}
          rotation={[-Math.PI/2,0,0]}
          font="fonts/Luckiest Guy_Regular.json" 
          size={0.5} 
          height={0.01}
        >
          MOVE: 3-STEPS
          <meshStandardMaterial color={ "limegreen" }/>
        </Text3D>
      </animated.group>
      <group>
        <Cursor
          position={springs.cursorPos}
          rotation={[0,0,0]}
          scale={[3, 3, 0.1]}
          effectOpacity={springs.cursorEffectOpacity}
          effect={true}
        />
      </group>
      <BonusTurn rotation={[Math.PI/4 - Math.PI/16, Math.PI/2, 0]} position={layout[device].howToPlay.page3.bonusTurn.position} scale={springs.bonusTurnScale}/>
      <Float>
        <animated.group scale={springs.yootButtonScale}>
          <YootButtonModel rotation={[Math.PI/4 - Math.PI/16, Math.PI/2, 0]} position={layout[device].howToPlay.page3.yootButtonModel.position} turnedOn={true}/>
        </animated.group>
      </Float>
    </group>
  }

  // combine
  function Page4() {    
    const springs = useSpring({
      from: {
        cursorPos: layout[device].howToPlay.page4.cursorPos[0],
        rocket0Scale: 1.2,
        rocket1Scale: 1.2,
        cursorEffectOpacity: 0,
        legalTile0Scale: 0.4,
        legalTile1Scale: 0.4,
        pointer0Opacity: 0,
        pointer1Opacity: 0,
        rocket0Pos: layout[device].howToPlay.page4.rocket0Pos[0],
        rocket1Pos: layout[device].howToPlay.page4.rocket1Pos[0],
        moveText0Scale: 1,
        moveText1Scale: 0,
        bonusTurnScale: 0,
        yootButtonScale: 0,
      },
      to: [
        {
          cursorPos: layout[device].howToPlay.page4.cursorPos[1],
          delay: 1000
        },
        {
          cursorEffectOpacity: 1,
          rocket0Scale: 1.6,
          rocket1Scale: 1.6,
          legalTile0Scale: 0.6,
          pointer0Opacity: 1,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: 0,
          delay: 200,
        },
        {
          cursorPos: layout[device].howToPlay.page4.cursorPos[2],
          delay: 1000,
        },
        {
          cursorEffectOpacity: 1,
          rocket0Scale: 1.2,
          rocket1Scale: 1.2,
          legalTile0Scale: 0.4,
          pointer0Opacity: 0,
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: 0,
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page4.rocket0Pos[1],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page4.rocket0Pos[2],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page4.rocket0Pos[3],
          rocket1Pos: layout[device].howToPlay.page4.rocket1Pos[1],
          cursorPos: layout[device].howToPlay.page4.cursorPos[3],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          moveText0Scale: 0,          
          moveText1Scale: 1,
        },
        {
          cursorPos: layout[device].howToPlay.page4.cursorPos[4],
          delay: 1000
        },
        {
          cursorEffectOpacity: 1,
          rocket0Scale: 1.6,
          rocket1Scale: 1.6,
          legalTile1Scale: 0.6,
          pointer1Opacity: 1,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: 0,
          delay: 200,
        },
        {
          cursorPos: layout[device].howToPlay.page4.cursorPos[5],
          delay: 1000
        },
        {
          cursorEffectOpacity: 1,
          rocket0Scale: 1.2,
          rocket1Scale: 1.2,
          legalTile1Scale: 0.4,
          pointer1Opacity: 0,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: 0,
          cursorPos: layout[device].howToPlay.page4.cursorPos[6],
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page4.rocket0Pos[4],
          rocket1Pos: layout[device].howToPlay.page4.rocket1Pos[2],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page4.rocket0Pos[5],
          rocket1Pos: layout[device].howToPlay.page4.rocket1Pos[3],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          delay: 5000,
        },
      ],
      loop: true,
      delay: 500
    })

    function FirstCornerTiles({ position }) {
      let tiles = [];

      //circle
      const NUM_STARS = 20
      const TILE_RADIUS = 5;
      for (let i = -1; i < 5; i++) {
        let position = [
          -Math.cos(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
          0,
          Math.sin(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
        ];
        if (i === 2) {
          tiles.push(
            <group 
              position={position}
              key={i}
            >
              <Star scale={springs.legalTile0Scale}/>
              <Pointer color='red' position={layout[device].howToPlay.page4.pointer0.position} scale={2} opacity={springs.pointer0Opacity}/>
            </group>
          )
        } else if (i === 4) {
          tiles.push(
            <group
              position={position}
              key={i}
            >
              <Mars
                scale={springs.legalTile1Scale}
              />
              <Pointer color='red' position={layout[device].howToPlay.page4.pointer1.position} scale={2.3} opacity={springs.pointer1Opacity}/>
            </group>
          )
        } else {            
          tiles.push(
            <Star
              position={position}
              scale={layout[device].howToPlay.star.scale}
              key={i}
            />
          )
        }
      }
  
      return <group position={position}>
        { tiles }
        <animated.group name='rocket-0' position={springs.rocket0Pos} scale={springs.rocket0Scale} >
          <Rocket />
        </animated.group>
        <animated.group name='rocket-1' position={springs.rocket1Pos} scale={springs.rocket1Scale} >
          <Rocket/>
        </animated.group>
        <Cursor
          position={springs.cursorPos}
          rotation={[0,0,0]}
          scale={[3, 3, 0.1]}
          effectOpacity={springs.cursorEffectOpacity}
          effect={true}
        />
      </group>;
    }

    // ufo is flipped over, moved to a corner and scaled to 0. show sparkle
    return <group>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].howToPlay.page4.text.position}
        rotation={layout[device].howToPlay.page4.text.rotation}
        size={layout[device].howToPlay.page4.text.size}
        height={layout[device].howToPlay.page4.text.height}
        lineHeight={layout[device].howToPlay.page4.text.lineHeight}
      >
        {'5. If you move a piece into a tile\nwith your own piece, they will\nmove together on your next turn.'}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <FirstCornerTiles position={layout[device].howToPlay.page4.firstCornerTiles.position}/>
      <animated.group scale={springs.moveText0Scale}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json" 
          position={layout[device].howToPlay.page4.moveText0.position}
          rotation={layout[device].howToPlay.page4.moveText0.rotation}
          size={layout[device].howToPlay.page4.moveText0.size} 
          height={layout[device].howToPlay.page4.moveText0.height}
          lineHeight={layout[device].howToPlay.page4.moveText0.lineHeight}
        >
          {`MOVES: 3-STEPS,\n                  2-STEPS`}
          <meshStandardMaterial color={ "limegreen" }/>
        </Text3D>
      </animated.group>
      <animated.group scale={springs.moveText1Scale}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json" 
          position={layout[device].howToPlay.page4.moveText1.position}
          rotation={layout[device].howToPlay.page4.moveText1.rotation}
          size={layout[device].howToPlay.page4.moveText1.size} 
          height={layout[device].howToPlay.page4.moveText1.height}
          lineHeight={layout[device].howToPlay.page4.moveText1.lineHeight}
        >
          MOVES: 2-STEPS
          <meshStandardMaterial color={ "limegreen" }/>
        </Text3D>
      </animated.group>
    </group>
  }
  
  function Page5() {
    const springs = useSpring({
      from: {
        cursorPos: layout[device].howToPlay.page5.cursor.position[0],
        cursorScale: layout[device].howToPlay.page5.cursor.scale[0],
        cursorEffectOpacity: layout[device].howToPlay.page5.cursor.effectOpacity[0],
        rocket0Scale: layout[device].howToPlay.page5.rocket0Scale[0],
        legalTile0Scale: 0.4,
        legalTile1Scale: 0.4,
        legalTile2Scale: 0.4,
        legalTile3Scale: 0.4,
        pointer0Scale: 0,
        pointer1Scale: 0,
        pointer2Scale: 0,
        pointer3Scale: 0,
        pointer4Scale: 0,
        rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[0],
        scoreScale: 0,
        tilesScale: layout[device].howToPlay.page5.tilesScale[0],
        tilesPos: layout[device].howToPlay.page5.tilesPos[0],
        tilesRotation: [0,0,0],
        ruleTextScale: layout[device].howToPlay.page5.text.scales[0],
        noteTextScale: 0,
        moveTextScale: layout[device].howToPlay.page5.moveText.scale[0],
      },
      to: [
        {
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[1],
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[2],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[3],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[4],
          rocket0Scale: layout[device].howToPlay.page5.rocket0Scale[1],
          legalTile0Scale: 0.6,
          pointer0Scale: 1.5,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[5],
          rocket0Scale: layout[device].howToPlay.page5.rocket0Scale[2],
          legalTile0Scale: 0.4,
          pointer0Scale: 0,
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[6],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[7],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Scale: layout[device].howToPlay.page5.rocket0Scale[3],
          delay: 500,
          scoreScale: 1,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[8],
          rocket0Scale: layout[device].howToPlay.page5.rocket0Scale[4],
          scoreScale: 0,
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[9],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[10],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[11],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Scale: layout[device].howToPlay.page5.rocket0Scale[5],
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[12],
          legalTile1Scale: 0.6,
          pointer1Scale: 1,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Scale: layout[device].howToPlay.page5.rocket0Scale[6],
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[13],
          legalTile1Scale: 0.4,
          pointer1Scale: 0,
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[14],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[15],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[16],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[17],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[18],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          scoreScale: 1,
          rocket0Scale: layout[device].howToPlay.page5.rocket0Scale[7],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          scoreScale: 0,
          rocket0Scale: layout[device].howToPlay.page5.rocket0Scale[8],
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[19],
          tilesScale: layout[device].howToPlay.page5.tilesScale[1],
          tilesPos: layout[device].howToPlay.page5.tilesPos[1],
          tilesRotation: [Math.PI/8, -Math.PI/4, 0],
          ruleTextScale: layout[device].howToPlay.page5.text.scales[1],
          noteTextScale: 1,
          cursorPos: layout[device].howToPlay.page5.cursor.position[1],
          cursorScale: layout[device].howToPlay.page5.cursor.scale[1],
          moveTextScale: layout[device].howToPlay.page5.moveText.scale[1],
          delay: 1000
        },
        {
          cursorPos: layout[device].howToPlay.page5.cursor.position[2],
          delay: 1000
        },
        {
          cursorEffectOpacity: layout[device].howToPlay.page5.cursor.effectOpacity[1],
          rocket0Scale: layout[device].howToPlay.page5.rocket0Scale[9],
          legalTile2Scale: 0.4,
          legalTile3Scale: 0.8,
          pointer2Scale: 1,
          pointer3Scale: 1,
          pointer4Scale: 2.5,
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: layout[device].howToPlay.page5.cursor.effectOpacity[2],
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Scale: layout[device].howToPlay.page5.rocket0Scale[10],
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[20],
          delay: 2000,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[21],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[22],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.page5.rocket0Pos[23],
          pointer4Scale: 0,
          legalTile3Scale: 0.4,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          delay: 5000
        }
      ],
      loop: true
    })

    function Tiles(props) {
      const TILE_RADIUS = layout[device].howToPlay.tileRadius.ring
      const NUM_STARS = 20;
      let tiles = [];
  
      //circle
      for (let i = 0; i < NUM_STARS; i++) {
        let position = [
          -Math.cos(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
          0,
          Math.sin(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
        ];
        if (i == 0) {
          tiles.push(<Earth position={position} scale={0.4} key={i}/>);
        } else if (i == 3) {
          tiles.push(
            <Star
              position={position}
              tile={i}
              key={i}
              scale={springs.legalTile2Scale}
              device={device}
            />
          );
        } else if (i == 7) {
          tiles.push(
            <group 
            key={i}>
              <Star
                position={position}
                scale={springs.legalTile3Scale}
              />
              <Pointer color='red' position={[position[0], position[1] + 2, position[2]]} scale={springs.pointer4Scale}/>
            </group>
          );
        } else if (i == 5) {
          tiles.push(
            <Mars
              position={position}
              scale={0.4}
              key={i}
            />
          );
        } else if (i == 10) {
          tiles.push(
            <Saturn position={position} scale={springs.legalTile1Scale} key={i}/>
          );
        } else if (i == 15) {
          tiles.push(<Neptune position={position} scale={0.4} key={i}/>);
        } else {
          tiles.push(
            <Star
              position={position}
              tile={i}
              key={i}
              scale={layout[device].howToPlay.star.scale}
              device={device}
            />
          );
        }
      }
  
      //shortcuts
      const radiusShortcut1 = layout[device].howToPlay.tileRadius.shortcut1;
      const radiusShortcut2 = layout[device].howToPlay.tileRadius.shortcut2;
      for (let i = 0; i < NUM_STARS; i++) {
        let indexShortcut1;
        let indexShortcut2;
        if (i == 0) {
          indexShortcut1 = 24;
          indexShortcut2 = 23;
        } else if (i == 5) {
          indexShortcut1 = 28;
          indexShortcut2 = 27;
        } else if (i == 10) {
          indexShortcut1 = 20;
          indexShortcut2 = 21;
        } else if (i == 15) {
          indexShortcut1 = 25;
          indexShortcut2 = 26;
        }
        if (i == 0 || i == 5 || i == 10 || i == 15) {
          let position1 = [
            Math.sin(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut1,
            0,
            Math.cos(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut1,
          ]
          tiles.push(
            <Star
              position={position1}
              tile={indexShortcut1}
              key={i + 30}
              scale={layout[device].howToPlay.star.scale}
              device={device}
            />
          );
          let position2 = [
            Math.sin(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut2,
            0,
            Math.cos(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut2,
          ]
          tiles.push(
            <Star
              position={position2}
              tile={indexShortcut2}
              key={i + 41}
              scale={layout[device].howToPlay.star.scale}
              device={device}
            />
          );
        }
      }
      // center piece
      tiles.push(
        <Moon
          position={[0,0,0]}
          intensity={3}
          key={100}
          tile={22}
          device={device}
          scale={springs.legalTile0Scale}
        />
      );
      return <animated.group {...props}>
        {tiles}
        <animated.group name='rocket-0' scale={springs.rocket0Scale} position={springs.rocket0Pos}>
          <Rocket />
        </animated.group>
        <animated.group name='moon-arrow' scale={springs.pointer0Scale}>
          <ArrowBlender
            position={[0, 0.5, 1.5]}
            rotation={[0, -Math.PI/2, 0]}
            scale={0.5}
            color='red'
          />
        </animated.group>
        <animated.group name='saturn-arrow' scale={springs.pointer1Scale}>
          <ArrowBlender
            position={[0, 0.5, -3.5]}
            rotation={[0, -Math.PI/2, 0]}
            scale={0.5}
            color='red'
          />
        </animated.group>
        <animated.group name='mars-arrow-wrong' scale={springs.pointer2Scale}>
          <ArrowBlender
            position={[3.5, 0.5, 0]}
            rotation={[0, -Math.PI, 0]}
            scale={0.5}
            color='grey'
          />
        </animated.group>
        <animated.group name='mars-arrow-correct' scale={springs.pointer3Scale}>
          <ArrowBlender
            position={[4.6, 0.5, -1.5]}
            rotation={[0, -Math.PI/8 * 11, 0]}
            scale={0.5}
            color='red'
          />
        </animated.group>
        <animated.group scale={springs.scoreScale}>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json" 
            size={0.5} 
            height={0.01}
            position={layout[device].howToPlay.page5.scoreText.position}
            rotation={layout[device].howToPlay.page5.scoreText.rotation}
          >
            SCORE!
            <meshStandardMaterial color='limegreen'/>
          </Text3D>
        </animated.group>
      </animated.group>;
    }

    return <group>
      <animated.group name='text' 
        scale={springs.ruleTextScale}
      >
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.page5.text.position} 
          rotation={layout[device].howToPlay.page5.text.rotation}
          size={layout[device].howToPlay.page5.text.size}
          height={layout[device].howToPlay.page5.text.height}
          lineHeight={layout[device].howToPlay.page5.text.lineHeight}
        >
          {`6. When you start a move\nfrom a planet or the Moon,\nyou can take a shortcut.`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </animated.group>
      <animated.group 
      name='note-text' 
      position={layout[device].howToPlay.page5.noteText.position} 
      rotation={layout[device].howToPlay.page5.noteText.rotation} 
      scale={springs.noteTextScale}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[0,0,0]}
          rotation={[0, 0, 0]}
          size={0.4}
          height={0.01}
        >
          {'NOTE:'}
          <meshStandardMaterial color='yellow'/>
        </Text3D> 
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[0,-0.5,0]}
          rotation={[0, 0, 0]}
          size={0.4}
          height={0.01}
        >
          {'You cannot bend'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[0,-1,0]}
          rotation={[0, 0, 0]}
          size={0.4}
          height={0.01}
        >
          {'in the middle of'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[0,-1.5,0]}
          rotation={[0, 0, 0]}
          size={0.4}
          height={0.01}
        >
          {'a move.'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </animated.group>
      <animated.group 
        name='move-text' 
        position={[-3,0,2.5]} 
        rotation={[-Math.PI/4, 0, 0]} 
        scale={springs.moveTextScale}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json" 
          size={0.5} 
          height={0.01}
          position={layout[device].howToPlay.page5.moveText.position}
          rotation={layout[device].howToPlay.page5.moveText.rotation}
        >
          {'move: 4-steps'}
          <meshStandardMaterial color='limegreen'/>
        </Text3D>
      </animated.group>
      <Cursor2
        position={springs.cursorPos}
        rotation={[0,0,0]}
        scale={springs.cursorScale}
        effectOpacity={springs.cursorEffectOpacity}
        effect={true}
      />
      <Tiles 
        position={springs.tilesPos} 
        rotation={springs.tilesRotation} 
        scale={springs.tilesScale}
      />
    </group>
  }

  function Page6() {
    return <group scale={0.9}>
      <animated.group name='text'>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.page6.text.position}
          rotation={layout[device].howToPlay.page6.text.rotation}
          size={layout[device].howToPlay.page6.text.size}
          height={layout[device].howToPlay.page6.text.height}
        >
          {'7. How to read the yoot outcome'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </animated.group>
      <group 
      position={layout[device].howToPlay.page6.do.position} 
      scale={layout[device].howToPlay.page6.do.scale}>     
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.page6.do.text.line0.position}
          rotation={layout[device].howToPlay.page6.do.text.line0.rotation}
          size={layout[device].howToPlay.page6.do.text.line0.size}
          height={layout[device].howToPlay.page6.do.text.line0.height}
        >
          {'DO'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>       
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.page6.do.text.line1.position}
          rotation={layout[device].howToPlay.page6.do.text.line1.rotation}
          size={layout[device].howToPlay.page6.do.text.line1.size}
          height={layout[device].howToPlay.page6.do.text.line1.height}
        >
          {'1 Step'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>   
        <Float rotationIntensity={0.1}>
          <YootSet 
          points="do" 
          scale={layout[device].howToPlay.page6.do.yootSet.scale} 
          position={layout[device].howToPlay.page6.do.yootSet.position}/>
        </Float>
      </group>
      <group 
      position={layout[device].howToPlay.page6.ge.position} 
      scale={layout[device].howToPlay.page6.ge.scale}>        
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.page6.ge.text.line0.position}
          rotation={layout[device].howToPlay.page6.ge.text.line0.rotation}
          size={layout[device].howToPlay.page6.ge.text.line0.size}
          height={layout[device].howToPlay.page6.ge.text.line0.height}
        >
          {'GE'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>       
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.page6.ge.text.line1.position}
          rotation={layout[device].howToPlay.page6.ge.text.line1.rotation}
          size={layout[device].howToPlay.page6.ge.text.line1.size}
          height={layout[device].howToPlay.page6.ge.text.line1.height}
        >
          {'2 Steps'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>   
        <Float rotationIntensity={0.1}>
          <YootSet 
          points="ge" 
          scale={layout[device].howToPlay.page6.ge.yootSet.scale} 
          position={layout[device].howToPlay.page6.ge.yootSet.position}/>
        </Float>
      </group>
      <group 
      position={layout[device].howToPlay.page6.gul.position} 
      scale={layout[device].howToPlay.page6.gul.scale}>        
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.page6.gul.text.line0.position}
          rotation={layout[device].howToPlay.page6.gul.text.line0.rotation}
          size={layout[device].howToPlay.page6.gul.text.line0.size}
          height={layout[device].howToPlay.page6.gul.text.line0.height}
        >
          {'GUL'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>       
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.page6.gul.text.line1.position}
          rotation={layout[device].howToPlay.page6.gul.text.line1.rotation}
          size={layout[device].howToPlay.page6.gul.text.line1.size}
          height={layout[device].howToPlay.page6.gul.text.line1.height}
        >
          {'3 Steps'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>   
        <Float rotationIntensity={0.1}>
        <YootSet 
        points="gul" 
        scale={layout[device].howToPlay.page6.gul.yootSet.scale} 
        position={layout[device].howToPlay.page6.gul.yootSet.position}/>
        </Float>
      </group>
      <group
      position={layout[device].howToPlay.page6.yoot.position} 
      scale={layout[device].howToPlay.page6.yoot.scale}>            
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.page6.yoot.text.line0.position}
          rotation={layout[device].howToPlay.page6.yoot.text.line0.rotation}
          size={layout[device].howToPlay.page6.yoot.text.line0.size}
          height={layout[device].howToPlay.page6.yoot.text.line0.height}
        >
          {'YOOT'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>       
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.page6.yoot.text.line1.position}
          rotation={layout[device].howToPlay.page6.yoot.text.line1.rotation}
          size={layout[device].howToPlay.page6.yoot.text.line1.size}
          height={layout[device].howToPlay.page6.yoot.text.line1.height}
        >
          {'4 Steps'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>   
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.page6.yoot.text.line2.position}
          rotation={layout[device].howToPlay.page6.yoot.text.line2.rotation}
          size={layout[device].howToPlay.page6.yoot.text.line2.size}
          height={layout[device].howToPlay.page6.yoot.text.line2.height}
        >
          {'bonus turn'}
          <meshStandardMaterial color='limegreen'/>
        </Text3D>   
        <Float rotationIntensity={0.1}>
          <YootSet 
          points="yoot" 
          scale={layout[device].howToPlay.page6.yoot.yootSet.scale} 
          position={layout[device].howToPlay.page6.yoot.yootSet.position}/>
        </Float>
      </group>
      <group       
      position={layout[device].howToPlay.page6.mo.position} 
      scale={layout[device].howToPlay.page6.mo.scale}>   
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.page6.mo.text.line0.position}
          rotation={layout[device].howToPlay.page6.mo.text.line0.rotation}
          size={layout[device].howToPlay.page6.mo.text.line0.size}
          height={layout[device].howToPlay.page6.mo.text.line0.height}
        >
          {'MO'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>      
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.page6.mo.text.line1.position}
          rotation={layout[device].howToPlay.page6.mo.text.line1.rotation}
          size={layout[device].howToPlay.page6.mo.text.line1.size}
          height={layout[device].howToPlay.page6.mo.text.line1.height}
        >
          {'5 steps'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>      
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.page6.mo.text.line2.position}
          rotation={layout[device].howToPlay.page6.mo.text.line2.rotation}
          size={layout[device].howToPlay.page6.mo.text.line2.size}
          height={layout[device].howToPlay.page6.mo.text.line2.height}
        >
          {'bonus turn'}
          <meshStandardMaterial color='limegreen'/>
        </Text3D>      
        <Float rotationIntensity={0.1}>
        <YootSet 
        points="mo" 
        scale={layout[device].howToPlay.page6.mo.yootSet.scale} 
        position={layout[device].howToPlay.page6.mo.yootSet.position}/>
        </Float>
      </group>
      <group 
      position={layout[device].howToPlay.page6.backdo.position} 
      scale={layout[device].howToPlay.page6.backdo.scale}>       
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.page6.backdo.text.line0.position}
          rotation={layout[device].howToPlay.page6.backdo.text.line0.rotation}
          size={layout[device].howToPlay.page6.backdo.text.line0.size}
          height={layout[device].howToPlay.page6.backdo.text.line0.height}
        >
          {'backdo'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>         
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.page6.backdo.text.line1.position}
          rotation={layout[device].howToPlay.page6.backdo.text.line1.rotation}
          size={layout[device].howToPlay.page6.backdo.text.line1.size}
          height={layout[device].howToPlay.page6.backdo.text.line1.height}
        >
          {'-1 step'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>      
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.page6.backdo.text.line2.position}
          rotation={layout[device].howToPlay.page6.backdo.text.line2.rotation}
          size={layout[device].howToPlay.page6.backdo.text.line2.size}
          height={layout[device].howToPlay.page6.backdo.text.line2.height}
        >
          {'backward'}
          <meshStandardMaterial color='red'/>
        </Text3D>
        <Float rotationIntensity={0.1}>
          <YootSet 
          points="backdo" 
          scale={layout[device].howToPlay.page6.backdo.yootSet.scale} 
          position={layout[device].howToPlay.page6.backdo.yootSet.position}/>
        </Float>
      </group>
    </group>
  }

  function Pagination({ position, scale }) {
    function handlePageLeft() {
      setPage(page => {
        if (page === 0) {
          return 6
        } else {
          return page-1
        }
      })
    }
    
    function handlePageRight() {
      setPage(page => {
        if (page === 6) {
          return 0
        } else {
          return page+1
        }
      })
    }

    function handlePage0() {
      setPage(0)
    }
    function handlePage1() {
      setPage(1)
    }
    function handlePage2() {
      setPage(2)
    }
    function handlePage3() {
      setPage(3)
    }
    function handlePage4() {
      setPage(4)
    }
    function handlePage5() {
      setPage(5)
    }
    function handlePage6() {
      setPage(6)
    }

    return <group name='pagination' position={position} scale={scale}>
      <mesh position={[-4, 0, 6]} rotation={[0, 0, Math.PI/2]} onPointerUp={handlePageLeft}>
        <coneGeometry args={[layout[device].howToPlay.pagination.arrowRadius, 0.6, 3]}/>
        <meshStandardMaterial color="yellow"/>
      </mesh>
      <mesh position={[-3, 0, 6]} onPointerUp={handlePage0}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 0 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[-2, 0, 6]} onPointerUp={handlePage1}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 1 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[-1, 0, 6]} onPointerUp={handlePage2}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 2 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[-0, 0, 6]} onPointerUp={handlePage3}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 3 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[1, 0, 6]} onPointerUp={handlePage4}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 4 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[2, 0, 6]} onPointerUp={handlePage5}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 5 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[3, 0, 6]} onPointerUp={handlePage6}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 6 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[4, 0, 6]} rotation={[0, 0, -Math.PI/2]} onPointerUp={handlePageRight}>
      <coneGeometry args={[layout[device].howToPlay.pagination.arrowRadius, 0.6, 3]}/>
        <meshStandardMaterial color="yellow"/>
      </mesh>
    </group>
  }

  const pages = [<Page0/>, <Page1/>, <Page2/>, <Page3/>, <Page4/>, <Page5/>, <Page6/>]

  console.log(layout[device].howToPlay.pagination.position)
  return <group position={position} rotation={rotation} scale={scale}>
    {pages[page]}
    <Pagination 
    position={layout[device].howToPlay.pagination.position}
    scale={layout[device].howToPlay.pagination.scale}/>
  </group>
}

useGLTF.preload('models/yoot-highlight.glb')
useGLTF.preload('models/yoot-rhino-highlight.glb')