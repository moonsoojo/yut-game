import { useGLTF } from '@react-three/drei';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import React, { useRef, useState } from 'react';
import YootButtonModel from './meshes/YootButtonModel';
import HtmlElement from './HtmlElement';
import { useFrame } from '@react-three/fiber';
import { Perf } from 'r3f-perf';

export default function HowToPlay() {
  const [page, setPage] = useState(0)
  // scrollable
  // page navigation at the bottom
  // loop
  function Page0() {
    // yoots
    // apply impulse
    // land
    // highlight open sides (1, 2, 3)
    // display move
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
    const textMat = useRef();
    const yootMats = [yoot0Mat, yoot1Mat, yoot2Mat, yoot3Mat]
    const loopTime = 6
    const throwTime = 0.01
    const [thrown, setThrown] = useState(false)
    const record0Time = 3
    const [record0, setRecord0] = useState(false)
    const record1Time = 3.5
    const [record1, setRecord1] = useState(false)
    const record2Time = 4
    const [record2, setRecord2] = useState(false)
    const record3Time = 4.5
    const [record3, setRecord3] = useState(false)
    const textTime = 5
    const [text, setText] = useState(true)
    const recordMoveTime = 13

    // performance is slow whenever yoots are thrown 
    // delay when text shows up
    useFrame((state, delta) => {
      if (startTime === 0) {
        setStartTime(state.clock.elapsedTime)
      } else {
        if (startTime + loopTime > state.clock.elapsedTime) {
          if (startTime + throwTime < state.clock.elapsedTime && !thrown) {
            for (let i = 0; i < 4; i++) {
              yoots[i].current.setLinvel({ x: 0, y: 0, z: 0 })
              yoots[i].current.setAngvel({ x: 0, y: 0, z: 0 })
              yoots[i].current.setTranslation({ x: -2 + 0.8*i, y: 1, z: -2});
              yoots[i].current.setRotation({ x: 0, y: 1, z: 0, w: 1 }, true);
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
            }
            setThrown(true)
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
          } else if ((startTime + textTime < state.clock.elapsedTime) && !text) {
            setText(true)
          }
        } else {
          setStartTime(0);
          setThrown(false);
          setRecord0(false)
          yootMats[0].current.opacity = 0
          setRecord1(false)
          yootMats[1].current.opacity = 0
          setRecord2(false)
          yootMats[2].current.opacity = 0
          setRecord3(false)
          yootMats[3].current.opacity = 0
          setText(false)
        }
      }
    })

    return <group>
      <group rotation={[Math.PI/8, 0, 0]}>
        <HtmlElement
          text='1. Throw the yoot (dice).'
          position={[-4,0,-3]}
          rotation={[-Math.PI/2, 0, 0]}
          fontSize={26}
        />
        <HtmlElement
          text='They way they lie determines'
          position={[-3.5,0,-2.4]}
          rotation={[-Math.PI/2, 0, 0]}
          fontSize={26}
        />
        <HtmlElement
          text='how many steps to advance.'
          position={[-3.5,0,-1.8]}
          rotation={[-Math.PI/2, 0, 0]}
          fontSize={26}
        />
      </group>
      <Physics>
        <RigidBody type="fixed">
          <CuboidCollider args={[20, 0.3, 20]} restitution={0.2} friction={1}/>
          <mesh>
            <boxGeometry args={[40, 0.6, 40]} />
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
              position={[-2 + 0.8*index, 1, 3]}
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
        { text && <HtmlElement
          text='Move: 3'
          position={[-4,0,0]}
          rotation={[-Math.PI/4, 0, 0]}
          scale={1}
        />}
      </Physics>
      <YootButtonModel
        position={[3, 0, 3]}
        rotation={[Math.PI/16, Math.PI/2, Math.PI/32, "ZXY"]}
      />
    </group>
  }
  function Page1() {
    // display first corner of the board
    // display home pieces and move in the empty space to the left (towards center)
    // piece is highlighted
    // click it with mouse
    // legal tile is highlighted
    // click it
    // piece moves there
    // move is spent
  }
  function Page2() {
    // display helper text above Earth
    // show home pieces below Earth
    // there's a piece one tile away from Earth. other pieces are finished
    // click piece
    // 'score' button shows
    // click button
    // tile fills in empty home slot, "congrats!" message displays
    // fireworks go off in the background
  }
  return <>
    <Perf/>
    {page === 0 && <Page0/>}
    {page === 1 && <Page1/>}
    {page === 2 && <Page2/>}
  </>
}