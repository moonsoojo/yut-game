import { Text3D, useGLTF } from '@react-three/drei';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import React, { useEffect, useRef, useState } from 'react';
import YootButtonModel from './meshes/YootButtonModel';
import HtmlElement from './HtmlElement';
import { useFrame } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import Cursor from './meshes/Cursor';
import Star from './meshes/Star';
import Earth from './meshes/Earth';
import layout from './layout';
import Rocket from './meshes/Rocket';
import Pointer from './meshes/Pointer';
import { Vector3 } from 'three';

export default function HowToPlay({ device }) {
  const [page, setPage] = useState(1)
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
    const textRef = useRef()
    const yootMats = [yoot0Mat, yoot1Mat, yoot2Mat, yoot3Mat]
    const loopTime = 10
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
    const textTime = 6.7
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
            textRef.current.scale.x = Math.cos(state.clock.elapsedTime * 3) * 0.3 + 1.5
            textRef.current.scale.y = Math.cos(state.clock.elapsedTime * 3) * 0.3 + 1.5
            textRef.current.scale.z = Math.cos(state.clock.elapsedTime * 3) * 0.3 + 1.5
          }
        } else {
          setStartTime(0);
          setThrown(false);
          for (let i = 0; i < 4; i++) {
            yoots[i].current.setTranslation({ x: -2 + 0.8*i, y: 1, z: -2});
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
        { text && <Text3D
          position={[-5, 0.2, 1]}
          rotation={[-Math.PI/2,0,0]}
          font="/fonts/Luckiest Guy_Regular.json" 
          size={0.5} 
          height={0.01}
          ref={textRef}
        >
          MOVE: 3
          <meshStandardMaterial color={ "green" }/>
        </Text3D>}
      </Physics>
      <YootButtonModel
        position={[3, 0, 3]}
        rotation={[Math.PI/16, Math.PI/2, Math.PI/32, "ZXY"]}
        turnedOn={yootButtonTurnedOn}
      />
      <Cursor
        position={[4, 0.3, 4.4]}
        rotation={[0, 0, 0]}
        scale={[3, 3, 0.1]}
        effect={effect}
      />
    </group>
  }
  function Page1() {
    // display first corner of the board
    // display home pieces and move in the empty space to the left (towards center)
    // piece is highlighted
    // click it with mouse
    // legal tile is highlighted
    // mouse moves there, and clicks with 'blink'
      // use Math.lerp(position)
    // piece spawns on top of Earth
    // it hops onto tile 1, 2, and 3
    // move disappears with 'blink'
    const [cursorHover, setCursorHover] = useState(false)
    const [selectPiece, setSelectPiece] = useState(false)
    const cursorInitialPos = [1, 0.3, 2]
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
        ];
        if (i == 0) {
          tiles.push(<Earth position={position} tile={i} key={i} device={device}/>);
        } else {
          tiles.push(
            <Star
              position={position}
              tile={i}
              key={i}
              scale={(i === 3 && cursorHover) ? layout[device].star.scale * 1.5 : layout[device].star.scale}
              device={device}
            />
          );
        }
      }
  
      return <group position={position}>
        { tiles }
        { selectPiece && <Pointer color='red' position={[4, 1.2, 3]} scale={2.5} />}
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
          <Rocket position={[-0.2,0,-0.5]}/>
        </group>
        <group name='rocket-1' ref={rocket1}>
          <Rocket position={[0.8,0,-0.5]}/>
        </group>
        <group name='rocket-2' ref={rocket2}>
          <Rocket position={[-0.2,0,0.5]}/>
        </group>
        <group name='rocket-3' ref={rocket3}>
          <Rocket position={[0.8,0,0.5]} scale={selectPiece ? 2 : 1}/>
        </group>
      </group>
    }
    function MoveDisplay({ position }) {
      return <Text3D
        position={position}
        rotation={[-Math.PI/2,0,0]}
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.5} 
        height={0.01}
      >
      MOVE: 3
      <meshStandardMaterial color={ "green" }/>
    </Text3D>
    }

    const loopTime = 9
    const [startTime, setStartTime] = useState(0)
    const selectPieceTime = 3
    // useState above HomePieces
    const cursorPos1 = new Vector3(-1.3, 0.3, -0.6)
    const cursorPos2 = new Vector3(1.2, 0.3, 1.1)
    const cursorEffectTime = 3.2
    const [cursorEffect, setCursorEffect] = useState(false)
    const cursorMoveDelay = 5
    const tileHighlight = 5.8
    const cursorMoveStop = 7
    const selectTileTime = 8
    const [selectTile, setSelectTile] = useState(false)
    const cursorEffect2Time = 8.2
    const [cursorEffect2, setCursorEffect2] = useState(false)
    // spawn rocket
    // hop on tiles
    // why does screen refresh on 'how to play'?
    useFrame((state, delta) => {
      if (startTime === 0) {
        setStartTime(state.clock.elapsedTime)
      } else {
        if (startTime + loopTime > state.clock.elapsedTime) {
          if (startTime + selectPieceTime > state.clock.elapsedTime) {
            rocket0.current.scale.x = Math.sin((state.clock.elapsedTime - startTime) * 3) * 0.3 + 1.5
            rocket0.current.scale.y = Math.sin((state.clock.elapsedTime - startTime) * 3) * 0.3 + 1.5
            rocket0.current.scale.z = Math.sin((state.clock.elapsedTime - startTime) * 3) * 0.3 + 1.5
            rocket1.current.scale.x = Math.sin((state.clock.elapsedTime - startTime) * 3) * 0.3 + 1.5
            rocket1.current.scale.y = Math.sin((state.clock.elapsedTime - startTime) * 3) * 0.3 + 1.5
            rocket1.current.scale.z = Math.sin((state.clock.elapsedTime - startTime) * 3) * 0.3 + 1.5
            rocket2.current.scale.x = Math.sin((state.clock.elapsedTime - startTime) * 3) * 0.3 + 1.5
            rocket2.current.scale.y = Math.sin((state.clock.elapsedTime - startTime) * 3) * 0.3 + 1.5
            rocket2.current.scale.z = Math.sin((state.clock.elapsedTime - startTime) * 3) * 0.3 + 1.5
            rocket3.current.scale.x = Math.sin((state.clock.elapsedTime - startTime) * 3) * 0.3 + 1.5
            rocket3.current.scale.y = Math.sin((state.clock.elapsedTime - startTime) * 3) * 0.3 + 1.5
            rocket3.current.scale.z = Math.sin((state.clock.elapsedTime - startTime) * 3) * 0.3 + 1.5
            cursorRef.current.position.lerp(cursorPos1, 0.03)
          } else if ((startTime + selectPieceTime < state.clock.elapsedTime) && !selectPiece) {
            console.log('select piece')
            setSelectPiece(true)
            setCursorEffect(true)
          } else if ((startTime + cursorEffectTime < state.clock.elapsedTime) && cursorEffect) {
            console.log('cursor effect 1')
            setCursorEffect(false)
          } else if (startTime + cursorMoveDelay > state.clock.elapsedTime) {
            // pause
            console.log('pause')
          } else if (startTime + cursorMoveStop > state.clock.elapsedTime) {
            if (startTime + tileHighlight < state.clock.elapsedTime) {
              setCursorHover(true)
            }
            cursorRef.current.position.lerp(cursorPos2, 0.03)
          } else if ((startTime + selectTileTime < state.clock.elapsedTime) && !selectTile) {
            console.log("cursor effect 2 started")
            setSelectTile(true)
            setCursorEffect2(true)
          } else if ((startTime + cursorEffect2Time < state.clock.elapsedTime) && cursorEffect2) {
            console.log("cursor effect 2 ended")
            setCursorEffect2(false)
          } 
        } else {
          console.log(`loop finished`)
          setStartTime(0);
          setSelectPiece(false)
          cursorRef.current.position.x = cursorInitialPos[0]
          cursorRef.current.position.y = cursorInitialPos[1]
          cursorRef.current.position.z = cursorInitialPos[2]
          setCursorHover(false)
          setSelectTile(false)
        }
      }
    })
    // use state to highlight pieces and tile
    return <group name='how-to-play-page-1'>
      <HtmlElement
        text='2. Advance your piece.'
        position={[-3.5,0,-4]}
        rotation={[-Math.PI/8, 0, 0]}
        fontSize={26}
      />
      <FirstCornerTiles position={[-2, 0, -0.5]}/>
      <HomePieces position={[-2, 0, -1]}/>
      <MoveDisplay position={[-2.8, 0, 2.7]}/>
      <group ref={cursorRef}>
        <Cursor
          position={cursorInitialPos}
          rotation={[0,0,0]}
          scale={[3, 3, 0.1]}
          effect={(cursorEffect || cursorEffect2)}
        />
      </group>
    </group>
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
    {page === 0 && <Page0/>}
    {page === 1 && <Page1/>}
    {page === 2 && <Page2/>}
  </>
}