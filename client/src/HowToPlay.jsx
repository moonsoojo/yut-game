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
import GulToken from './moveTokens/GulToken';
import GeToken from './moveTokens/GeToken';
import YootToken from './moveTokens/YootToken';

export default function HowToPlay({ device, position, rotation, scale }) {
  
  const [page, setPage] = useState(0)

  const [pageTimeout, setPageTimeout] = useState(null)
  useEffect(() => {
    clearTimeout(pageTimeout)
    if (page === 0) { // picking teams
      const page1Timeout = setTimeout(() => {
        setPage(1)
      }, 9000)
      setPageTimeout(page1Timeout)
    } else if (page === 1) { // throwing the dice
      const page2Timeout = setTimeout(() => {
        setPage(2)
      }, 11000)
      setPageTimeout(page2Timeout)
    } else if (page === 2) { // reading the dice
      const page3Timeout = setTimeout(() => {
        setPage(3)
      }, 9000)
      setPageTimeout(page3Timeout)
    } else if (page === 3) { // moving pieces
      const page4Timeout = setTimeout(() => {
        setPage(4)
      }, 10400)
      setPageTimeout(page4Timeout)
    } else if (page === 4) { // scoring pieces
      const page5Timeout = setTimeout(() => {
        setPage(5)
      }, 13900)
      setPageTimeout(page5Timeout)
    } else if (page === 5) { // catching pieces
      const page6Timeout = setTimeout(() => {
        setPage(6)
      }, 11500)
      setPageTimeout(page6Timeout)
    } else if (page === 6) { // combining pieces
      const page7Timeout = setTimeout(() => {
        setPage(7)
      }, 15500)
      setPageTimeout(page7Timeout)
    } else if (page === 7) { // shortcuts
      const page0Timeout = setTimeout(() => {
        setPage(0)
      }, 23500)
      setPageTimeout(page0Timeout)
    }
  }, [page])

  function PickingTheTeamsPage() {
    const springs = useSpring({
      from: {
        cursorPos: layout[device].howToPlay.pickingTheTeamsPage.cursorPos[0],
        cursorEffectOpacity: 0,
        inputModalScale: 0,
        placeholderScale: 1,
        letterRScale: 0,
        letterHScale: 0,
        letterIScale: 0,
        letterNScale: 0,
        letterOScale: 0,
        rhinoTextScale: 0,
      },
      to: [
        {
          cursorPos: layout[device].howToPlay.pickingTheTeamsPage.cursorPos[1],
          delay: 100
        },
        {
          cursorEffectOpacity: 1,
          inputModalScale: 1,
          inputCursorScale: 1,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: 0,
          delay: 100,
          config: {
            tension: 0,
          }
        },
        {
          inputCursorScale: 0,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          placeholderScale: 0,
          letterRScale: 1,
          config: {
            tension: 0
          },
          delay: 1000
        },
        {
          placeholderScale: 0,
          letterHScale: 1,
          config: {
            tension: 0
          },
          delay: 200
        },
        {
          placeholderScale: 0,
          letterIScale: 1,
          config: {
            tension: 0
          },
          delay: 200
        },
        {
          placeholderScale: 0,
          letterNScale: 1,
          config: {
            tension: 0
          },
          delay: 200
        },
        {
          placeholderScale: 0,
          letterOScale: 1,
          config: {
            tension: 0
          },
          delay: 200
        },
        {
          cursorPos: layout[device].howToPlay.pickingTheTeamsPage.cursorPos[2],
          delay: 300,
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          cursorEffectOpacity: 1,
          inputModalScale: 0,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: 0,
          delay: 100,
          config: {
            tension: 0,
          }
        },
        {
          rhinoTextScale: 1,
          config: {
            tension: 170,
            friction: 26
          }
        }
      ],
      delay: 1000,
      config: {
        tension: 170,
        friction: 26
      }
    })
    return <group scale={layout[device].howToPlay.pickingTheTeamsPage.scale}>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].howToPlay.pickingTheTeamsPage.text.position}
        rotation={layout[device].howToPlay.pickingTheTeamsPage.text.rotation}
        size={layout[device].howToPlay.pickingTheTeamsPage.text.size}
        height={layout[device].howToPlay.pickingTheTeamsPage.text.height}
      >
        {'1. Press join to Pick a team.'}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <group name='rockets' position={layout[device].howToPlay.pickingTheTeamsPage.rockets.position}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.pickingTheTeamsPage.rockets.text.position}
          rotation={layout[device].howToPlay.pickingTheTeamsPage.rockets.text.rotation}
          size={layout[device].howToPlay.pickingTheTeamsPage.rockets.text.size}
          height={layout[device].howToPlay.pickingTheTeamsPage.rockets.text.height}
        >
          {'Rockets'}
          <meshStandardMaterial color='red'/>
        </Text3D>
        <Rocket position={layout[device].howToPlay.pickingTheTeamsPage.rockets.piece0.position}/>
        <Rocket position={layout[device].howToPlay.pickingTheTeamsPage.rockets.piece1.position}/>
        <Rocket position={layout[device].howToPlay.pickingTheTeamsPage.rockets.piece2.position}/>
        <Rocket position={layout[device].howToPlay.pickingTheTeamsPage.rockets.piece3.position}/>
        <group name='rockets-join-button' position={layout[device].howToPlay.pickingTheTeamsPage.rockets.joinButton.position}>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={layout[device].howToPlay.pickingTheTeamsPage.rockets.joinButton.text.position}
            rotation={layout[device].howToPlay.pickingTheTeamsPage.rockets.joinButton.text.rotation}
            size={layout[device].howToPlay.pickingTheTeamsPage.rockets.joinButton.text.size}
            height={layout[device].howToPlay.pickingTheTeamsPage.rockets.joinButton.text.height}
          >
            {'join'}
            <meshStandardMaterial color='yellow'/>
          </Text3D>
          <mesh position={[1.3, -0.01, -0.15]}>
            <boxGeometry args={[1.5, 0.01, 0.8]}/>
            <meshStandardMaterial color='yellow'/>
          </mesh>
          <mesh position={[1.3, -0.01, -0.15]}>
            <boxGeometry args={[1.4, 0.02, 0.7]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
        </group>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.pickingTheTeamsPage.rockets.names[0].position}
          rotation={layout[device].howToPlay.pickingTheTeamsPage.rockets.names[0].rotation}
          size={layout[device].howToPlay.pickingTheTeamsPage.rockets.names[0].size}
          height={layout[device].howToPlay.pickingTheTeamsPage.rockets.names[0].height}
        >
          ros&#233;
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.pickingTheTeamsPage.rockets.names[1].position}
          rotation={layout[device].howToPlay.pickingTheTeamsPage.rockets.names[1].rotation}
          size={layout[device].howToPlay.pickingTheTeamsPage.rockets.names[1].size}
          height={layout[device].howToPlay.pickingTheTeamsPage.rockets.names[1].height}
        >
          {'lisa'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.pickingTheTeamsPage.rockets.names[2].position}
          rotation={layout[device].howToPlay.pickingTheTeamsPage.rockets.names[2].rotation}
          size={layout[device].howToPlay.pickingTheTeamsPage.rockets.names[2].size}
          height={layout[device].howToPlay.pickingTheTeamsPage.rockets.names[2].height}
        >
          {'jisoo'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.pickingTheTeamsPage.rockets.names[3].position}
          rotation={layout[device].howToPlay.pickingTheTeamsPage.rockets.names[3].rotation}
          size={layout[device].howToPlay.pickingTheTeamsPage.rockets.names[3].size}
          height={layout[device].howToPlay.pickingTheTeamsPage.rockets.names[3].height}
        >
          {'jennie'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <animated.group scale={springs.rhinoTextScale}>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={layout[device].howToPlay.pickingTheTeamsPage.rockets.names[4].position}
            rotation={layout[device].howToPlay.pickingTheTeamsPage.rockets.names[4].rotation}
            size={layout[device].howToPlay.pickingTheTeamsPage.rockets.names[4].size}
            height={layout[device].howToPlay.pickingTheTeamsPage.rockets.names[4].height}
          >
            {'Rhino'}
            <meshStandardMaterial color='yellow'/>
          </Text3D>
        </animated.group>
      </group>
      <group name='ufos' position={layout[device].howToPlay.pickingTheTeamsPage.ufos.position}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.pickingTheTeamsPage.ufos.text.position}
          rotation={layout[device].howToPlay.pickingTheTeamsPage.ufos.text.rotation}
          size={layout[device].howToPlay.pickingTheTeamsPage.ufos.text.size}
          height={layout[device].howToPlay.pickingTheTeamsPage.ufos.text.height}
        >
          {'ufos'}
          <meshStandardMaterial color='turquoise'/>
        </Text3D>
        <Ufo position={layout[device].howToPlay.pickingTheTeamsPage.ufos.piece0.position}/>
        <Ufo position={layout[device].howToPlay.pickingTheTeamsPage.ufos.piece1.position}/>
        <Ufo position={layout[device].howToPlay.pickingTheTeamsPage.ufos.piece2.position}/>
        <Ufo position={layout[device].howToPlay.pickingTheTeamsPage.ufos.piece3.position}/>
        <group name='ufos-join-button' position={layout[device].howToPlay.pickingTheTeamsPage.ufos.joinButton.position}>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={layout[device].howToPlay.pickingTheTeamsPage.ufos.joinButton.text.position}
            rotation={layout[device].howToPlay.pickingTheTeamsPage.ufos.joinButton.text.rotation}
            size={layout[device].howToPlay.pickingTheTeamsPage.ufos.joinButton.text.size}
            height={layout[device].howToPlay.pickingTheTeamsPage.ufos.joinButton.text.height}
          >
            {'join'}
            <meshStandardMaterial color='yellow'/>
          </Text3D>
          <mesh position={[1.3, -0.01, -0.15]}>
            <boxGeometry args={[1.5, 0.01, 0.8]}/>
            <meshStandardMaterial color='yellow'/>
          </mesh>
          <mesh position={[1.3, -0.01, -0.15]}>
            <boxGeometry args={[1.4, 0.02, 0.7]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
        </group>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[0].position}
          rotation={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[0].rotation}
          size={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[0].size}
          height={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[0].height}
        >
          {'j-hope'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[1].position}
          rotation={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[1].rotation}
          size={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[1].size}
          height={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[1].height}
        >
          {'jimin'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[2].position}
          rotation={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[2].rotation}
          size={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[2].size}
          height={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[2].height}
        >
          {'jin'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[3].position}
          rotation={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[3].rotation}
          size={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[3].size}
          height={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[3].height}
        >
          {'rm'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[4].position}
          rotation={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[4].rotation}
          size={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[4].size}
          height={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[4].height}
        >
          {'jungkook'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[5].position}
          rotation={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[5].rotation}
          size={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[5].size}
          height={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[5].height}
        >
          {'suga'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[6].position}
          rotation={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[6].rotation}
          size={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[6].size}
          height={layout[device].howToPlay.pickingTheTeamsPage.ufos.names[6].height}
        >
          {'v'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group>
      <animated.group position={springs.cursorPos}>
        <Cursor 
        scale={1.5}
        effect={true}
        effectOpacity={springs.cursorEffectOpacity}
        />
      </animated.group>
      <animated.group name='input-modal' scale={springs.inputModalScale}  position={layout[device].howToPlay.pickingTheTeamsPage.inputModal.position}>
        <mesh>
          <boxGeometry args={[5.7, 0.01, 3.4]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh>
          <boxGeometry args={[5.6, 0.02, 3.3]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-2.4, 0.02, -0.9]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.35}
          height={0.01}
        >
          {'joining'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-0.45, 0.02, -0.9]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.35}
          height={0.01}
        >
          rockets
          <meshStandardMaterial color='red'/>
        </Text3D>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[1.65, 0.02, -0.9]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.35}
          height={0.01}
        >
          as
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <group position={[0, 0.01, -0.1]}>
          <mesh>
            <boxGeometry args={[4.2, 0.01, 0.8]}/>
            <meshStandardMaterial color='yellow'/>
          </mesh>
          <mesh>
            <boxGeometry args={[4.1, 0.02, 0.7]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <animated.group scale={springs.placeholderScale}>
            <Text3D
              font="fonts/Luckiest Guy_Regular.json"
              position={[-1.95, 0.02, 0.15]}
              rotation={[-Math.PI/2, 0, 0]}
              size={0.3}
              height={0.01}
            >
              {'here...'}
              <meshStandardMaterial color='grey' transparent opacity={0.7}/>
            </Text3D>
          </animated.group>
          <animated.group scale={springs.letterRScale}>
            <Text3D
              font="fonts/Luckiest Guy_Regular.json"
              position={[-1.95, 0.02, 0.15]}
              rotation={[-Math.PI/2, 0, 0]}
              size={0.3}
              height={0.01}
            >
              {'R'}
              <meshStandardMaterial color='yellow'/>
            </Text3D>
          </animated.group>
          <animated.group scale={springs.letterHScale}>
            <Text3D
              font="fonts/Luckiest Guy_Regular.json"
              position={[-1.68, 0.02, 0.15]}
              rotation={[-Math.PI/2, 0, 0]}
              size={0.3}
              height={0.01}
            >
              {'H'}
              <meshStandardMaterial color='yellow'/>
            </Text3D>
          </animated.group>
          <animated.group scale={springs.letterIScale}>
            <Text3D
              font="fonts/Luckiest Guy_Regular.json"
              position={[-1.39, 0.02, 0.15]}
              rotation={[-Math.PI/2, 0, 0]}
              size={0.3}
              height={0.01}
            >
              {'I'}
              <meshStandardMaterial color='yellow'/>
            </Text3D>
          </animated.group>
          <animated.group scale={springs.letterNScale}>
            <Text3D
              font="fonts/Luckiest Guy_Regular.json"
              position={[-1.25, 0.02, 0.15]}
              rotation={[-Math.PI/2, 0, 0]}
              size={0.3}
              height={0.01}
            >
              {'N'}
              <meshStandardMaterial color='yellow'/>
            </Text3D>
          </animated.group>
          <animated.group scale={springs.letterOScale}>
            <Text3D
              font="fonts/Luckiest Guy_Regular.json"
              position={[-0.94, 0.02, 0.15]}
              rotation={[-Math.PI/2, 0, 0]}
              size={0.3}
              height={0.01}
            >
              {'O'}
              <meshStandardMaterial color='yellow'/>
            </Text3D>
          </animated.group>
        </group>
        <group name='leggo-button' position={[-0.7, 0.01, 1]}>
          <mesh>
            <boxGeometry args={[1.7, 0.01, 0.75]}/>
            <meshStandardMaterial color='yellow'/>
          </mesh>
          <mesh>
            <boxGeometry args={[1.6, 0.02, 0.65]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-0.7, 0.02, 0.15]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.3}
            height={0.01}
          >
            {'leggo!'}
            <meshStandardMaterial color='yellow'/>
          </Text3D>
        </group>
        <group name='nah-button' position={[1, 0.01, 1]}>
          <mesh>
            <boxGeometry args={[1.1, 0.01, 0.75]}/>
            <meshStandardMaterial color='red'/>
          </mesh>
          <mesh>
            <boxGeometry args={[1, 0.02, 0.65]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-0.4, 0.02, 0.15]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.3}
            height={0.01}
          >
            {'nah'}
            <meshStandardMaterial color='red'/>
          </Text3D>
        </group>
      </animated.group>
    </group>
  }
  
  function ThrowingTheDicePage() {
    
    const nodes = useGLTF("models/yoot-highlight.glb").nodes;
    const materials = useGLTF("models/yoot-highlight.glb").materials;
    const nodesRhino = useGLTF("models/yoot-rhino-highlight.glb").nodes;
    const materialsRhino = useGLTF("models/yoot-rhino-highlight.glb").materials;

    const [startTime, setStartTime] = useState(0)
    const yoot0 = useRef();
    const yoot0Wrapper = useRef();
    const yoot0Mat = useRef();
    const yoot1 = useRef();
    const yoot1Wrapper = useRef();
    const yoot1Mat = useRef();
    const yoot2 = useRef();
    const yoot2Wrapper = useRef();
    const yoot2Mat = useRef();
    const yoot3 = useRef();
    const yoot3Wrapper = useRef();
    const yoot3Mat = useRef();
    const textRef = useRef()
    const [textVisible, setTextVisible] = useState(false)
    const [yootButtonTurnedOn, setYootButtonTurnedOn] = useState(true)
    const restTime = 2 // time: 0 - 2
    const throwTime = restTime + 3 // time: 2 - 5
    const lieTime = throwTime + 1 // time: 5 - 7
    const highlightYoot0Time = lieTime + 0.5 // time: 7 - 7.5
    const highlightYoot1Time = highlightYoot0Time + 0.5 // time: 7.5 - 8
    const highlightYoot2Time = highlightYoot1Time + 0.5 // time: 8 - 8.5
    const recordTime = highlightYoot2Time + 0.5
    const loopTime = recordTime + 2 // time: 0 - 12
    // const effectTime = 2.2
    // const record0Time = 5
    // const record1Time = 5.5
    // const record2Time = 6
    // const record3Time = 6.5
    // const textTime = 7.1
    // scale 0: yoots still
    // scale 1: yoots spinning
    // scale 2: yoots still - lie
    // scale 3: yoots highlight 1
    // scale 4: yoots highlight 2
    // scale 5: yoots highlight 3
    // scale 6: move text
    // use useFrame because scale can't be 0 with rigidbody
    useFrame((state) => {
      const time = state.clock.getElapsedTime();
      if (yoot0.current) {
        if (startTime === 0) {
          setStartTime(time)
        } else {
          if (startTime + loopTime > time) {
  
            if (startTime + restTime > time) { // held in a hand
  
              // set up
              setYootButtonTurnedOn(true)
              yoot0Mat.current.opacity = 0
              yoot1Mat.current.opacity = 0
              yoot2Mat.current.opacity = 0
              setTextVisible(false)

              // yoot 0
              yoot0Wrapper.current.rotation.y = Math.PI/4 + Math.PI/4 + Math.PI/16
              yoot0Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.restPos.x
              yoot0Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.restPos.y
              yoot0Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.restPos.z
              const eulerRotation0 = new THREE.Euler(-Math.PI/8*6, 0, 0);
              const quaternionRotation0 = new THREE.Quaternion();
              quaternionRotation0.setFromEuler(eulerRotation0);
              yoot0.current.rotation.x = eulerRotation0.x;
              yoot0.current.rotation.y = eulerRotation0.y;
              yoot0.current.rotation.z = eulerRotation0.z;
              yoot0.current.rotation.w = eulerRotation0.w;

              // yoot 1
              yoot1Wrapper.current.rotation.y = Math.PI/4 + Math.PI/4 + Math.PI/32
              yoot1Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.restPos.x
              yoot1Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.restPos.y
              yoot1Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.restPos.z
              const eulerRotation1 = new THREE.Euler(-Math.PI/2 + Math.PI/4, 0, 0);
              const quaternionRotation1 = new THREE.Quaternion();
              quaternionRotation1.setFromEuler(eulerRotation1);
              yoot1.current.rotation.x = eulerRotation1.x;
              yoot1.current.rotation.y = eulerRotation1.y;
              yoot1.current.rotation.z = eulerRotation1.z;
              yoot1.current.rotation.w = eulerRotation1.w;

              // yoot 2
              yoot2Wrapper.current.rotation.y = Math.PI/2
              yoot2Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.restPos.x
              yoot2Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.restPos.y
              yoot2Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.restPos.z
              const eulerRotation2 = new THREE.Euler(Math.PI/2 + Math.PI/4, 0, 0);
              const quaternionRotation2 = new THREE.Quaternion();
              quaternionRotation2.setFromEuler(eulerRotation2);
              yoot2.current.rotation.x = eulerRotation2.x;
              yoot2.current.rotation.y = eulerRotation2.y;
              yoot2.current.rotation.z = eulerRotation2.z;
              yoot2.current.rotation.w = eulerRotation2.w;

              // yoot 3
              yoot3Wrapper.current.rotation.y = Math.PI/2 - Math.PI/32
              yoot3Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.restPos.x
              yoot3Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.restPos.y
              yoot3Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.restPos.z
              const eulerRotation3 = new THREE.Euler(Math.PI/2 - Math.PI/4, 0, 0);
              const quaternionRotation3 = new THREE.Quaternion();
              quaternionRotation3.setFromEuler(eulerRotation3);
              yoot3.current.rotation.x = eulerRotation3.x;
              yoot3.current.rotation.y = eulerRotation3.y;
              yoot3.current.rotation.z = eulerRotation3.z;
              yoot3.current.rotation.w = eulerRotation3.w;
  
            } else if (startTime + throwTime > time) { // spinning
              setYootButtonTurnedOn(false)

              // yoot 0
              yoot0Wrapper.current.rotation.y = Math.PI/4 + Math.PI/4 + Math.PI/16
              yoot0Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.throwPos.x
              yoot0Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.throwPos.y
              yoot0Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.throwPos.z
              const eulerRotation0 = new THREE.Euler(time*5, 0, 0);
              const quaternionRotation0 = new THREE.Quaternion();
              quaternionRotation0.setFromEuler(eulerRotation0);
              yoot0.current.rotation.x = eulerRotation0.x;
              yoot0.current.rotation.y = eulerRotation0.y;
              yoot0.current.rotation.z = eulerRotation0.z;
              yoot0.current.rotation.w = eulerRotation0.w;
              yoot0.current.position.y = Math.sin((startTime + throwTime - time - Math.PI + Math.PI/2 + Math.PI/2 + Math.PI/8) * 1) * 4
              
              // yoot 1
              yoot1Wrapper.current.rotation.y = Math.PI/4 + Math.PI/4 + Math.PI/32
              yoot1Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.throwPos.x
              yoot1Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.throwPos.y
              yoot1Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.throwPos.z
              const eulerRotation1 = new THREE.Euler(time*6.9 + Math.PI/4 + Math.PI/32, 0, 0);
              const quaternionRotation1 = new THREE.Quaternion();
              quaternionRotation1.setFromEuler(eulerRotation1);
              yoot1.current.rotation.x = eulerRotation1.x;
              yoot1.current.rotation.y = eulerRotation1.y;
              yoot1.current.rotation.z = eulerRotation1.z;
              yoot1.current.rotation.w = eulerRotation1.w;
              yoot1.current.position.y = Math.sin((startTime + throwTime - time - Math.PI + Math.PI/2 + Math.PI/2 + Math.PI/8) * 1) * 4.5 + 0.8
              
              // yoot 2
              yoot2Wrapper.current.rotation.y = Math.PI/2
              yoot2Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.throwPos.x
              yoot2Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.throwPos.y
              yoot2Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.throwPos.z
              const eulerRotation2 = new THREE.Euler(time*5.7 + Math.PI/4 + Math.PI/16, 0, 0);
              const quaternionRotation2 = new THREE.Quaternion();
              quaternionRotation2.setFromEuler(eulerRotation2);
              yoot2.current.rotation.x = eulerRotation2.x;
              yoot2.current.rotation.y = eulerRotation2.y;
              yoot2.current.rotation.z = eulerRotation2.z;
              yoot2.current.rotation.w = eulerRotation2.w;
              yoot2.current.position.y = Math.sin((startTime + throwTime - time - Math.PI + Math.PI/2 + Math.PI/2 + Math.PI/8) * 1) * 4.5 + 0.8
              
              // yoot 3
              yoot3Wrapper.current.rotation.y = Math.PI/2 - Math.PI/32
              yoot3Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.throwPos.x
              yoot3Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.throwPos.y
              yoot3Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.throwPos.z
              const eulerRotation3 = new THREE.Euler(time*7.4 + Math.PI/4 + Math.PI/8, 0, 0);
              const quaternionRotation3 = new THREE.Quaternion();
              quaternionRotation3.setFromEuler(eulerRotation3);
              yoot3.current.rotation.x = eulerRotation3.x;
              yoot3.current.rotation.y = eulerRotation3.y;
              yoot3.current.rotation.z = eulerRotation3.z;
              yoot3.current.rotation.w = eulerRotation3.w;
              yoot3.current.position.y = Math.sin((startTime + throwTime - time - Math.PI + Math.PI/2 + Math.PI/2 + Math.PI/8) * 1) * 4.5 + 0.8
              
            } else if (startTime + lieTime > time) {
  
              // yoot0
              yoot0Wrapper.current.rotation.y = Math.PI/4 + Math.PI/4 + Math.PI/16
              yoot0Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.liePos.x
              yoot0Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.liePos.y
              yoot0Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.liePos.z
              const eulerRotation0 = new THREE.Euler(Math.PI, 0, 0);
              const quaternionRotation0 = new THREE.Quaternion();
              quaternionRotation0.setFromEuler(eulerRotation0);
              yoot0.current.rotation.x = eulerRotation0.x;
              yoot0.current.rotation.y = eulerRotation0.y;
              yoot0.current.rotation.z = eulerRotation0.z;
              yoot0.current.rotation.w = eulerRotation0.w;
              yoot0.current.position.y = 0
              
              // yoot1
              yoot1Wrapper.current.rotation.y = Math.PI/4 + Math.PI/4 + Math.PI/32
              yoot1Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.liePos.x
              yoot1Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.liePos.y
              yoot1Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.liePos.z
              const eulerRotation1 = new THREE.Euler(Math.PI, 0, 0);
              const quaternionRotation1 = new THREE.Quaternion();
              quaternionRotation1.setFromEuler(eulerRotation1);
              yoot1.current.rotation.x = eulerRotation1.x;
              yoot1.current.rotation.y = eulerRotation1.y;
              yoot1.current.rotation.z = eulerRotation1.z;
              yoot1.current.rotation.w = eulerRotation1.w;
              yoot1.current.position.y = 0
              
              // yoot2
              yoot2Wrapper.current.rotation.y = Math.PI/2
              yoot2Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.liePos.x
              yoot2Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.liePos.y
              yoot2Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.liePos.z
              const eulerRotation2 = new THREE.Euler(Math.PI, 0, 0);
              const quaternionRotation2 = new THREE.Quaternion();
              quaternionRotation2.setFromEuler(eulerRotation2);
              yoot2.current.rotation.x = eulerRotation2.x;
              yoot2.current.rotation.y = eulerRotation2.y;
              yoot2.current.rotation.z = eulerRotation2.z;
              yoot2.current.rotation.w = eulerRotation2.w;
              yoot2.current.position.y = 0
              
              // yoot3
              yoot3Wrapper.current.rotation.y = Math.PI/2 - Math.PI/32
              yoot3Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.liePos.x
              yoot3Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.liePos.y
              yoot3Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.liePos.z
              const eulerRotation3 = new THREE.Euler(0, 0, 0);
              const quaternionRotation3 = new THREE.Quaternion();
              quaternionRotation3.setFromEuler(eulerRotation3);
              yoot3.current.rotation.x = eulerRotation3.x;
              yoot3.current.rotation.y = eulerRotation3.y;
              yoot3.current.rotation.z = eulerRotation3.z;
              yoot3.current.rotation.w = eulerRotation3.w;
              yoot3.current.position.y = 0
              
            } else if (startTime + highlightYoot0Time > time) {
              console.log('highlight 0 time')
              console.log(yoot0Mat.current)
              yoot0Mat.current.opacity = 1
            } else if (startTime + highlightYoot1Time > time) {
              console.log('highlight 1 time')
              yoot1Mat.current.opacity = 1
            } else if (startTime + highlightYoot2Time > time) {
              console.log('highlight 2 time')
              yoot2Mat.current.opacity = 1
            } else if (startTime + recordTime > time) {
              setTextVisible(true)
            }
          } else {
            setStartTime(0);
          }
        }
      }
    })

    return <group name='how-to-play-page-0' scale={layout[device].howToPlay.throwingTheDicePage.scale}>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].howToPlay.throwingTheDicePage.text.position}
        rotation={layout[device].howToPlay.throwingTheDicePage.text.rotation}
        size={layout[device].howToPlay.throwingTheDicePage.text.size}
        height={layout[device].howToPlay.throwingTheDicePage.text.height}
      >
        {`2. Throw the yoot (dice).`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      {/* <Physics/> component is in <Home2/> */}
      <group ref={yoot0Wrapper}>
        <group
          ref={yoot0}
          scale={0.5}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011.geometry}
            material={materials["Texture wrap.008"]}
            position={[0, -0.5, 0]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[1, 6.161, 1]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane.geometry}
            material={nodes.Plane.material}
            position={[0, -0.521, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={[4.905, 1, 0.455]}
          >
            <meshStandardMaterial 
              color="white" 
              transparent 
              opacity={0}
              ref={yoot0Mat}
            />
          </mesh>
        </group>
      </group>
      <group ref={yoot1Wrapper}>
        <group
          ref={yoot1}
          scale={0.5}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011.geometry}
            material={materials["Texture wrap.008"]}
            position={[0, -0.5, 0]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[1, 6.161, 1]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane.geometry}
            material={nodes.Plane.material}
            position={[0, -0.521, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={[4.905, 1, 0.455]}
          >
            <meshStandardMaterial 
              color="white" 
              transparent 
              opacity={0}
              ref={yoot1Mat}
            />
          </mesh>
        </group>
      </group>
      <group ref={yoot2Wrapper}>
        <group
          ref={yoot2}
          scale={0.5}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011.geometry}
            material={materials["Texture wrap.008"]}
            position={[0, -0.5, 0]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[1, 6.161, 1]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane.geometry}
            material={nodes.Plane.material}
            position={[0, -0.521, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={[4.905, 1, 0.455]}
          >
            <meshStandardMaterial 
              color="white" 
              transparent 
              opacity={0}
              ref={yoot2Mat}
            />
          </mesh>
        </group>
      </group>
      <group ref={yoot3Wrapper}>
        <group 
          ref={yoot3}
          scale={0.5}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodesRhino.Cylinder007.geometry}
            material={materialsRhino["Texture wrap.005"]}
            position={[0, -0.4, 0]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[1, 6.161, 1]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodesRhino.Plane001.geometry}
            material={nodesRhino.Plane001.material}
            position={[0, -0.422, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={[4.892, 1, 0.443]}
          >
            <meshStandardMaterial 
              color="white" 
              transparent 
              opacity={0}
              ref={yoot3Mat}
            />
          </mesh>
        </group>
      </group>
      { textVisible && <group
        position={layout[device].howToPlay.throwingTheDicePage.moveText.position}
        ref={textRef}
      >
        <Text3D
          rotation={[-Math.PI/2,0,0]}
          font="fonts/Luckiest Guy_Regular.json" 
          size={layout[device].howToPlay.throwingTheDicePage.moveText.size} 
          height={0.01}
        >
          {layout[device].howToPlay.throwingTheDicePage.moveText.text}
          <meshStandardMaterial color={ "limegreen" }/>
        </Text3D>
        <GulToken 
          scale={layout[device].howToPlay.throwingTheDicePage.gulToken.scale} 
          position={layout[device].howToPlay.throwingTheDicePage.gulToken.position} 
          rotation={layout[device].howToPlay.throwingTheDicePage.gulToken.rotation}
        />
      </group> }
      <YootButtonModel
        position={layout[device].howToPlay.throwingTheDicePage.yootButtonModel.position}
        rotation={layout[device].howToPlay.throwingTheDicePage.yootButtonModel.rotation}
        turnedOn={yootButtonTurnedOn}
      />
      <Cursor
        position={layout[device].howToPlay.throwingTheDicePage.cursor.position}
        rotation={layout[device].howToPlay.throwingTheDicePage.cursor.rotation}
        scale={layout[device].howToPlay.throwingTheDicePage.cursor.scale}
      />
    </group>
  }

  // function ThrowingTheDicePage() {
    
  //   const nodes = useGLTF("models/yoot-highlight.glb").nodes;
  //   const materials = useGLTF("models/yoot-highlight.glb").materials;
  //   const nodesRhino = useGLTF("models/yoot-rhino-highlight.glb").nodes;
  //   const materialsRhino = useGLTF("models/yoot-rhino-highlight.glb").materials;

  //   const NUM_YOOTS = 4;
  //   let yoots = [];
  //   for (let i = 0; i < NUM_YOOTS; i++) {
  //     yoots.push(useRef());
  //   }

  //   const [startTime, setStartTime] = useState(0)
  //   const yoot0Mat = useRef()
  //   const yoot1Mat = useRef()
  //   const yoot2Mat = useRef()
  //   const yoot3Mat = useRef()
  //   const textRef = useRef()
  //   const yootMats = [yoot0Mat, yoot1Mat, yoot2Mat, yoot3Mat]
  //   const loopTime = 12
  //   const [yootButtonTurnedOn, setYootButtonTurnedOn] = useState(true)
  //   const throwTime = 2
  //   const [thrown, setThrown] = useState(false)
  //   const effectTime = 2.2
  //   const [effect, setEffect] = useState(false)
  //   const record0Time = 5
  //   const [record0, setRecord0] = useState(false)
  //   const record1Time = 5.5
  //   const [record1, setRecord1] = useState(false)
  //   const record2Time = 6
  //   const [record2, setRecord2] = useState(false)
  //   const record3Time = 6.5
  //   const [record3, setRecord3] = useState(false)
  //   const textTime = 7.1
  //   const [text, setText] = useState(false)

  //   useFrame((state, delta) => {
  //     if (startTime === 0) {
  //       setStartTime(state.clock.elapsedTime)
  //     } else {
  //       if (startTime + loopTime > state.clock.elapsedTime) {
  //         if (startTime + throwTime < state.clock.elapsedTime && !thrown) {
  //           for (let i = 0; i < 4; i++) {
  //             yoots[i].current.setLinvel({ x: 0, y: 0, z: 0 })
  //             yoots[i].current.setAngvel({ x: 0, y: 0, z: 0 })
  //             yoots[i].current.setTranslation(layout[device].howToPlay.throwingTheDicePage.yoot.initialThrowPos[i]);
  //             yoots[i].current.setRotation({ x: 0, y: 1, z: 0, w: 1 }, true);
  //             if (device === "landscapeDesktop") {
  //               yoots[i].current.applyImpulse({
  //                 x: 0,
  //                 y: 5,
  //                 z: 0,
  //               });
  //               yoots[i].current.applyTorqueImpulse({
  //                 x: 3,
  //                 y: 0.003,
  //                 z: 0.16 + i * 0.01,
  //               });
  //             } else {
  //               yoots[i].current.applyImpulse({
  //                 x: 0,
  //                 y: 0.25,
  //                 z: 0,
  //               });
  //               yoots[i].current.applyTorqueImpulse({
  //                 x: 0.002,
  //                 y: 0.001,
  //                 z: 0.003 + i * 0.00005,
  //               });
  //             }
  //           }
  //           setYootButtonTurnedOn(false)
  //           setThrown(true)
  //           setEffect(true)
  //         } else if ((startTime + effectTime < state.clock.elapsedTime) && effect) {
  //           setEffect(false)
  //         } else if ((startTime + record0Time < state.clock.elapsedTime) && !record0) {
  //           yootMats[0].current.opacity = 1
  //           setRecord0(true)
  //         } else if ((startTime + record1Time < state.clock.elapsedTime) && !record1) {
  //           yootMats[1].current.opacity = 1
  //           setRecord1(true)
  //         } else if ((startTime + record2Time < state.clock.elapsedTime) && !record2) {
  //           yootMats[2].current.opacity = 1
  //           setRecord2(true)
  //         } else if ((startTime + record3Time < state.clock.elapsedTime) && !record3) {
  //           yootMats[3].current.opacity = 1
  //           setRecord3(true)
  //         } else if (startTime + textTime < state.clock.elapsedTime && !text) {
  //           setText(true)
  //         } else if (startTime + textTime < state.clock.elapsedTime) {
  //           textRef.current.scale.x = Math.cos(state.clock.elapsedTime * 3) * 0.08 + 1.2
  //           textRef.current.scale.y = Math.cos(state.clock.elapsedTime * 3) * 0.08 + 1.2
  //           textRef.current.scale.z = Math.cos(state.clock.elapsedTime * 3) * 0.08 + 1.2
  //         }
  //       } else {
  //         setStartTime(0);
  //         setThrown(false);
  //         for (let i = 0; i < 4; i++) {
  //           yoots[i].current.setTranslation(layout[device].howToPlay.throwingTheDicePage.yoot.resetPos[i]);
  //           yoots[i].current.setRotation({ x: 0, y: 1, z: 0, w: 1 }, true);
  //         }
  //         setRecord0(false)
  //         yootMats[0].current.opacity = 0
  //         setRecord1(false)
  //         yootMats[1].current.opacity = 0
  //         setRecord2(false)
  //         yootMats[2].current.opacity = 0
  //         setRecord3(false)
  //         yootMats[3].current.opacity = 0
  //         setText(false)
  //         setYootButtonTurnedOn(true)
  //       }
  //     }
  //   })

  //   return <group name='how-to-play-page-0' scale={layout[device].howToPlay.throwingTheDicePage.scale}>
  //     <Text3D
  //       font="fonts/Luckiest Guy_Regular.json"
  //       position={layout[device].howToPlay.throwingTheDicePage.text.position}
  //       rotation={layout[device].howToPlay.throwingTheDicePage.text.rotation}
  //       size={layout[device].howToPlay.throwingTheDicePage.text.size}
  //       height={layout[device].howToPlay.throwingTheDicePage.text.height}
  //     >
  //       {`2. Throw the yoot (dice).`}
  //       <meshStandardMaterial color='yellow'/>
  //     </Text3D>
  //     {/* <Physics> */}
  //     <>
  //       <RigidBody type="fixed">
  //         <CuboidCollider args={[10, 0.3, 10]} restitution={0.2} friction={1}/>
  //         <mesh>
  //           <boxGeometry args={[20, 0.6, 20]} />
  //           <meshStandardMaterial 
  //             transparent 
  //             color='yellow'
  //             opacity={0}
  //           />
  //         </mesh>
  //       </RigidBody>
  //       {yoots.map((ref, index) => {
  //         return (
  //           <RigidBody
  //             ref={ref}            
  //             position={layout[device].howToPlay.throwingTheDicePage.yoot.initialPos[index]}
  //             rotation={[0, Math.PI/2, 0]}
  //             colliders="hull"
  //             restitution={0.3}
  //             friction={0.6}
  //             name={`yoot${index}`}
  //             linearDamping={0.3}
  //             angularDamping={0.1} // when this value is high, yoots spin more
  //             scale={0.35}
  //             gravityScale={2}
  //             key={index}
  //           >
  //             {index != 0 ? (
  //               <group>
  //                 <mesh
  //                   castShadow
  //                   receiveShadow
  //                   geometry={nodes.Cylinder011.geometry}
  //                   material={materials["Texture wrap.008"]}
  //                   position={[0, 0.021, 0]}
  //                   rotation={[0, 0, -Math.PI / 2]}
  //                   scale={[1, 6.161, 1]}
  //                 />
  //                 <mesh
  //                   castShadow
  //                   receiveShadow
  //                   geometry={nodes.Plane.geometry}
  //                   material={nodes.Plane.material}
  //                   rotation={[-Math.PI, 0, 0]}
  //                   scale={[4.905, 1, 0.455]}
  //                 >
  //                   <meshStandardMaterial 
  //                     color="white" 
  //                     transparent 
  //                     opacity={0}
  //                     ref={yootMats[index]}
  //                   />
  //                 </mesh>
  //               </group>
  //             ) : (
  //               <group>
  //                 <mesh
  //                   castShadow
  //                   receiveShadow
  //                   geometry={nodesRhino.Cylinder007.geometry}
  //                   material={materialsRhino["Texture wrap.005"]}
  //                   position={[0, 0.022, 0]}
  //                   rotation={[0, 0, -Math.PI / 2]}
  //                   scale={[1, 6.161, 1]}
  //                 />
  //                 <mesh
  //                   castShadow
  //                   receiveShadow
  //                   geometry={nodesRhino.Plane001.geometry}
  //                   material={nodesRhino.Plane001.material}
  //                   rotation={[-Math.PI, 0, 0]}
  //                   scale={[4.892, 1, 0.443]}
  //                 >
  //                   <meshStandardMaterial 
  //                     color="white" 
  //                     transparent 
  //                     opacity={0}
  //                     ref={yootMats[index]}
  //                   />
  //                 </mesh>
  //               </group>
  //             )}
  //           </RigidBody>
  //         );
  //       })}
  //       { text && <group ref={textRef}
  //           position={layout[device].howToPlay.throwingTheDicePage.moveText.position}>
  //         <Text3D
  //           rotation={[-Math.PI/2,0,0]}
  //           font="fonts/Luckiest Guy_Regular.json" 
  //           size={layout[device].howToPlay.throwingTheDicePage.moveText.size} 
  //           height={0.01}
  //         >
  //           {layout[device].howToPlay.throwingTheDicePage.moveText.text}
  //           <meshStandardMaterial color={ "limegreen" }/>
  //         </Text3D>
  //         <GulToken scale={0.7} position={[3.1, 0, -0.15]} rotation={[0, Math.PI/2, 0]}/>
  //       </group>}
  //     </>
  //     {/* </Physics> */}
  //     <YootButtonModel
  //       position={layout[device].howToPlay.throwingTheDicePage.yootButtonModel.position}
  //       rotation={layout[device].howToPlay.throwingTheDicePage.yootButtonModel.rotation}
  //       turnedOn={yootButtonTurnedOn}
  //     />
  //     <Cursor
  //       position={layout[device].howToPlay.throwingTheDicePage.cursor.position}
  //       rotation={layout[device].howToPlay.throwingTheDicePage.cursor.rotation}
  //       scale={layout[device].howToPlay.throwingTheDicePage.cursor.scale}
  //       effect={effect}
  //     />
  //   </group>
  // }

  function MovingPiecesPage() {
    const springs = useSpring({
      from: {
        cursorPos: layout[device].howToPlay.movingPiecesPage.cursorPos0,
        rocket3Scale: 1.5,
        cursorEffectOpacity: 0,
        legalTileScale: 0.5,
        pointerOpacity: 0,
        rocket3Pos: layout[device].howToPlay.movingPiecesPage.rocket3Pos0,
        moveTokenScale: 0,
        moveToken1Scale: 1
      },
      to: [
        {
          cursorPos: layout[device].howToPlay.movingPiecesPage.cursorPos1,
          delay: 1000
        },
        {
          rocket3Scale: 2.5,
          cursorEffectOpacity: 1,
          legalTileScale: 0.8,
          pointerOpacity: 1,
          moveTokenScale: 0.7,
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
          cursorPos: layout[device].howToPlay.movingPiecesPage.cursorPos2,
          delay: 800,
        },
        {
          cursorEffectOpacity: 1,
          rocket3Pos: layout[device].howToPlay.movingPiecesPage.rocket3Pos1,
          moveTokenScale: 0,
          moveToken1Scale: 0,
          rocket3Scale: 1.5,
          legalTileScale: 0.5,
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
          rocket3Pos: layout[device].howToPlay.movingPiecesPage.rocket3Pos2,
          delay: 100,
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket3Pos: layout[device].howToPlay.movingPiecesPage.rocket3Pos3,
          delay: 100,
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket3Pos: layout[device].howToPlay.movingPiecesPage.rocket3Pos4,
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
        <animated.group position={[5,0,2.5]} rotation={[0, Math.PI/2, 0]} scale={springs.moveTokenScale}>
          <GulToken />
        </animated.group>
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
      return <group position={position}>
        <Text3D
          rotation={[-Math.PI/2,0,0]}
          font="fonts/Luckiest Guy_Regular.json" 
          size={0.4} 
          height={0.01}
        >
          MOVES:
          <meshStandardMaterial color={ "limegreen" }/>
        </Text3D>
        <animated.group position={[2.4, 0, -0.2]} rotation={[0, Math.PI/2, 0]} scale={springs.moveToken1Scale}>
          <GulToken/>
        </animated.group>
      </group>
    }

    return <group name='moving-pieces-page'>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].howToPlay.movingPiecesPage.text.position}
        rotation={layout[device].howToPlay.movingPiecesPage.text.rotation}
        size={layout[device].howToPlay.movingPiecesPage.text.size}
        height={0.01}
      >
        {'4. Advance your piece.'}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <FirstCornerTiles position={layout[device].howToPlay.movingPiecesPage.firstCornerTiles.position}/>
      <HomePieces position={layout[device].howToPlay.movingPiecesPage.homePieces.position}/>
      <MoveDisplay position={layout[device].howToPlay.movingPiecesPage.moveDisplay.position}/>
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

  function ScoringPage() {
    const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

    // const letsGoMatRef = useRef();
    // const letsGoRef = useRef();
    const freqR = 0.4
    const freqG = 0.6
    const freqB = 0.8
    useFrame((state, delta) => {
      // text changing in rainbow colors
      // letsGoMatRef.current.color.r = Math.cos(state.clock.elapsedTime*freqR * 4) + 0.3
      // letsGoMatRef.current.color.g = Math.cos(state.clock.elapsedTime*freqG * 4) + 0.4
      // letsGoMatRef.current.color.b = Math.cos(state.clock.elapsedTime*freqB * 4) + 0.5
      // letsGoRef.current.scale.x = Math.cos(state.clock.elapsedTime * 4) * 0.1 + 1.1
      // letsGoRef.current.scale.y = Math.cos(state.clock.elapsedTime * 4) * 0.1 + 1.1
      // letsGoRef.current.scale.z = Math.cos(state.clock.elapsedTime * 4) * 0.1 + 1.1
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
                  x: layout[device].howToPlay.scoringPage.fireworks.initialPosition.x,
                  y: layout[device].howToPlay.scoringPage.fireworks.initialPosition.y,
                  z: layout[device].howToPlay.scoringPage.fireworks.initialPosition.z,
                },
                positionRange: {
                  x: layout[device].howToPlay.scoringPage.fireworks.positionRange.x,
                  y: layout[device].howToPlay.scoringPage.fireworks.positionRange.y,
                  z: layout[device].howToPlay.scoringPage.fireworks.positionRange.z,
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
                numEmit: 8
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

    function WelcomeBackText({ position, scale }) {
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

      const height = 1.1
      const width = 1.8
      useFrame((state, delta) => {
        for (let i = 0; i < borderMeshRefs.length; i++) {      
          borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
          borderMeshRefs[i].current.position.y = 0.05
          borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
        }
      })

      return <animated.group
      position={position}
      scale={scale}>
          <mesh scale={[width, 1,height]}>
              <cylinderGeometry args={[1, 1, 0.01, 32]}/>
              <meshStandardMaterial color='black' transparent opacity={0.9}/>
          </mesh>
          <Text3D
              font="fonts/Luckiest Guy_Regular.json" 
              position={[-1.2, 0.1, -0.1]}
              rotation={[-Math.PI/2, 0, 0]}
              height={0.01}
              lineHeight={0.9} 
              size={0.33}
          >
              {`Finished\nthe route!`}
              <meshStandardMaterial color='yellow'/>
          </Text3D>
          <group ref={borderMesh0Ref}>
              <Star scale={0.1} color='yellow' />
          </group>
          <group ref={borderMesh1Ref}>
              <Star scale={0.1} color='yellow' />
          </group>
          <group ref={borderMesh2Ref}>
              <Star scale={0.1} color='yellow'/>
          </group>
          <group ref={borderMesh3Ref}>
              <Star scale={0.1} color='yellow' />
          </group>
          <group ref={borderMesh4Ref}>
              <Star scale={0.1} color='yellow' />
          </group>
          <group ref={borderMesh5Ref}>
              <Star scale={0.1} color='yellow' />
          </group>
          <group ref={borderMesh6Ref}>
              <Star scale={0.1} color='yellow' />
          </group>
      </animated.group>
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
          tilesScale: layout[device].howToPlay.scoringPage.tilesScale0,
          tilesPos: layout[device].howToPlay.scoringPage.tilesPos0,
          rocketHomeScale: 0,
          shortcutStarScale: layout[device].howToPlay.star.scale,
          moveScale: 0,
          scoreScale: 0,
          scoreColor: '#ffff00',
          cursorScale: 0,
          cursorPos: layout[device].howToPlay.scoringPage.cursorPos[0],
          cursorEffectOpacity: 0,
          checkmarkColor: '#808080',
          checkmarkScale: 0,
          scoreTextScale: 0,
        },
        to: [
          ...rocket3AnimationsArray.slice(2), 
          rocket3AnimationsArray[0],
          {
            tilesScale: layout[device].howToPlay.scoringPage.tilesScale1,
            tilesPos: layout[device].howToPlay.scoringPage.tilesPos1,
            rocketHomeScale: layout[device].howToPlay.scoringPage.rocketHomeScale1,
            checkmarkScale: 0.3,
            shortcutStarScale: 0,
            moveScale: 1,
            cursorScale: 2,
            delay: 500
          },
          {
            cursorPos: layout[device].howToPlay.scoringPage.cursorPos[1],
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
            cursorPos: layout[device].howToPlay.scoringPage.cursorPos[2],
            scoreColor: '#ffffff',
            delay: 500
          },
          {
            cursorEffectOpacity: 1,
            cursorPos: layout[device].howToPlay.scoringPage.cursorPos[3],
            scoreScale: 0,
            moveScale: 0,
            rocket3Scale: 0,
            checkmarkColor: '#ff0000',
            delay: 500,
            config: {
              tension: 0,
              clamp: true
            },
          },
          {
            cursorEffectOpacity: 0,
            scoreTextScale: 0.8,
            // delay: 100,
            config: {
              friction: 26,
              tension: 170,
              // tension: 0,
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
          <animated.group name='rocket-0' position={layout[device].howToPlay.scoringPage.rocket0Pos} scale={springs.rocketHomeScale}>
            <Rocket/>
          </animated.group>
          <animated.group name='rocket-1' position={layout[device].howToPlay.scoringPage.rocket1Pos} scale={springs.rocketHomeScale}>
            <Rocket/>
          </animated.group>
          <animated.group name='rocket-2' position={layout[device].howToPlay.scoringPage.rocket2Pos} scale={springs.rocketHomeScale}>
            <Rocket/>
          </animated.group>
          <Check 
            position={layout[device].howToPlay.scoringPage.checkPos} 
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
            position={layout[device].howToPlay.scoringPage.moveText.position}
            rotation={layout[device].howToPlay.scoringPage.moveText.rotation}
            size={0.4}
            height={0.01}
          >
            {'MOVE: 1-STEP'}
            <meshStandardMaterial color='limegreen'/>
          </Text3D>
        </animated.group>
        <animated.group scale={springs.scoreScale}>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json" 
            position={layout[device].howToPlay.scoringPage.scoreText.position}
            rotation={layout[device].howToPlay.scoringPage.scoreText.rotation}
            size={layout[device].howToPlay.scoringPage.scoreText.size} 
            height={0.01}
          >
            SCORE
            <AnimatedMeshDistortMaterial color={springs.scoreColor} distort={0}/>
          </Text3D>
        </animated.group>
        <WelcomeBackText scale={springs.scoreTextScale} position={layout[device].howToPlay.scoringPage.welcomeBackText.position}/>
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

    return <group 
      name='scoring-page' 
      position={layout[device].howToPlay.scoringPage.position}
      scale={layout[device].howToPlay.scoringPage.scale}
    >
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].howToPlay.scoringPage.text.position}
        rotation={layout[device].howToPlay.scoringPage.text.rotation}
        size={layout[device].howToPlay.scoringPage.text.size}
        height={layout[device].howToPlay.scoringPage.text.height}
        lineHeight={layout[device].howToPlay.scoringPage.text.lineHeight}
      >
        {`5. Bring the piece\nhome to score.\nFirst team to score\nfour pieces wins!`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <Tiles device={device}/>
      <Fireworks/>
    </group>
  }

  // capture
  function CatchingPiecesPage() {
    const springs = useSpring({
      from: {
        cursorPos: layout[device].howToPlay.catchingPiecesPage.cursorPos[0],
        rocketScale: 1.5,
        cursorEffectOpacity: 0,
        legalTileScale: 0.5,
        pointerOpacity: 0,
        rocketPos: layout[device].howToPlay.catchingPiecesPage.rocketPos[0],
        ufoPos: layout[device].howToPlay.catchingPiecesPage.ufoPos[0],
        ufoScale: 1.5,
        moveTextScale: 1,
        bonusTurnScale: 0,
        yootButtonScale: 0,
        firstCornerTilesPos: layout[device].howToPlay.catchingPiecesPage.firstCornerTilesPos[0],
        moveTokenScale: 1,
        moveToken1Scale: 0
      },
      to: [
        {
          cursorPos: layout[device].howToPlay.catchingPiecesPage.cursorPos[1],
          delay: 1000
        },
        {
          cursorEffectOpacity: 1,
          moveToken1Scale: 1,
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
          cursorPos: layout[device].howToPlay.catchingPiecesPage.cursorPos[2],
          delay: 1000,
        },
        {
          cursorEffectOpacity: 1,
          moveTokenScale: 0,
          moveToken1Scale: 0,
          rocketScale: 1.5,
          legalTileScale: 0.5,
          pointerOpacity: 0,
          ufoScale: 1.5,
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: 0,
          cursorPos: layout[device].howToPlay.catchingPiecesPage.cursorPos[3],
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          rocketPos: layout[device].howToPlay.catchingPiecesPage.rocketPos[1],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocketPos: layout[device].howToPlay.catchingPiecesPage.rocketPos[2],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocketPos: layout[device].howToPlay.catchingPiecesPage.rocketPos[3],
          ufoPos: layout[device].howToPlay.catchingPiecesPage.ufoPos[1],
          ufoScale: 0,
          config: {
            tension: 100,
            friction: 26
          }
        },
        {
          moveTextScale: 0,
          bonusTurnScale: 2,
          yootButtonScale: 1,
          firstCornerTilesPos: layout[device].howToPlay.catchingPiecesPage.firstCornerTilesPos[1],
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
              <Pointer color='red' position={layout[device].howToPlay.catchingPiecesPage.pointer.position} scale={2} opacity={springs.pointerOpacity}/>
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
        <animated.group scale={springs.moveToken1Scale}>
          <GulToken position={[5,0,4]} rotation={[0, Math.PI/2, 0]}/>
        </animated.group>
      </animated.group>;
    }

    // ufo is flipped over, moved to a corner and scaled to 0. show sparkle
    return <group name='catching-pieces-page'>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.catchingPiecesPage.text.position}
          rotation={layout[device].howToPlay.catchingPiecesPage.text.rotation}
          size={layout[device].howToPlay.catchingPiecesPage.text.size}
          height={layout[device].howToPlay.catchingPiecesPage.text.height}
          lineHeight={layout[device].howToPlay.catchingPiecesPage.text.lineHeight}
        >
          {`6. If you move into a tile with\nan opponent, you will kick\nthem out to the start, and\nyou will get another turn.`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      <FirstCornerTiles position={springs.firstCornerTilesPos}/>
      <animated.group scale={springs.moveTextScale}>
        <Text3D
          position={layout[device].howToPlay.catchingPiecesPage.moveText.position}
          rotation={[-Math.PI/2,0,0]}
          font="fonts/Luckiest Guy_Regular.json" 
          size={0.5} 
          height={0.01}
        >
          MOVE:
          <meshStandardMaterial color={ "limegreen" }/>
        </Text3D>
        <animated.group scale={springs.moveTokenScale}>
          <GulToken 
            position={layout[device].howToPlay.catchingPiecesPage.gulToken.position} 
            rotation={layout[device].howToPlay.catchingPiecesPage.gulToken.rotation}
          />
        </animated.group>
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
      <BonusTurn rotation={[Math.PI/16, Math.PI/2, 0]} position={layout[device].howToPlay.catchingPiecesPage.bonusTurn.position} scale={springs.bonusTurnScale}/>
      <Float>
        <animated.group scale={springs.yootButtonScale}>
          <YootButtonModel rotation={[Math.PI/16, Math.PI/2, 0]} position={layout[device].howToPlay.catchingPiecesPage.yootButtonModel.position} turnedOn={true}/>
        </animated.group>
      </Float>
    </group>
  }

  // combine
  function CombiningPiecesPage() {    
    const springs = useSpring({
      from: {
        cursorPos: layout[device].howToPlay.combiningPiecesPage.cursorPos[0],
        rocket0Scale: 1.2,
        rocket1Scale: 1.2,
        cursorEffectOpacity: 0,
        legalTile0Scale: 0.5,
        legalTile1Scale: 0.5,
        pointer0Opacity: 0,
        pointer1Opacity: 0,
        rocket0Pos: layout[device].howToPlay.combiningPiecesPage.rocket0Pos[0],
        rocket1Pos: layout[device].howToPlay.combiningPiecesPage.rocket1Pos[0],
        moveText0Scale: 1,
        moveText1Scale: 0,
        bonusTurnScale: 0,
        yootButtonScale: 0,
        moveTokenScale: 0,
        moveToken1Scale: 0
      },
      to: [
        {
          cursorPos: layout[device].howToPlay.combiningPiecesPage.cursorPos[1],
          delay: 1000
        },
        {
          cursorEffectOpacity: 1,
          rocket0Scale: 1.6,
          rocket1Scale: 1.6,
          legalTile0Scale: 0.6,
          pointer0Opacity: 1,
          moveTokenScale: 1,
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
          cursorPos: layout[device].howToPlay.combiningPiecesPage.cursorPos[2],
          delay: 1000,
        },
        {
          cursorEffectOpacity: 1,
          moveTokenScale: 0,
          rocket0Scale: 1.2,
          rocket1Scale: 1.2,
          legalTile0Scale: 0.5,
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
          rocket0Pos: layout[device].howToPlay.combiningPiecesPage.rocket0Pos[1],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.combiningPiecesPage.rocket0Pos[2],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.combiningPiecesPage.rocket0Pos[3],
          rocket1Pos: layout[device].howToPlay.combiningPiecesPage.rocket1Pos[1],
          cursorPos: layout[device].howToPlay.combiningPiecesPage.cursorPos[3],
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
          cursorPos: layout[device].howToPlay.combiningPiecesPage.cursorPos[4],
          delay: 1000
        },
        {
          cursorEffectOpacity: 1,
          moveToken1Scale: 1,
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
          cursorPos: layout[device].howToPlay.combiningPiecesPage.cursorPos[5],
          delay: 1000
        },
        {
          cursorEffectOpacity: 1,
          moveToken1Scale: 0,
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
          cursorPos: layout[device].howToPlay.combiningPiecesPage.cursorPos[6],
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.combiningPiecesPage.rocket0Pos[4],
          rocket1Pos: layout[device].howToPlay.combiningPiecesPage.rocket1Pos[2],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.combiningPiecesPage.rocket0Pos[5],
          rocket1Pos: layout[device].howToPlay.combiningPiecesPage.rocket1Pos[3],
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
              <Pointer color='red' position={layout[device].howToPlay.combiningPiecesPage.pointer0.position} scale={2} opacity={springs.pointer0Opacity}/>
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
              <Pointer color='red' position={layout[device].howToPlay.combiningPiecesPage.pointer1.position} scale={2.3} opacity={springs.pointer1Opacity}/>
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
        <animated.group scale={springs.moveTokenScale}>
          <GulToken position={[4,0,5]} rotation={[0, Math.PI/2, 0]}/>
        </animated.group>
        <animated.group scale={springs.moveToken1Scale}>
          <GeToken position={[6,0,3]} rotation={[0, Math.PI/2, 0]}/>
        </animated.group>
      </group>;
    }

    // ufo is flipped over, moved to a corner and scaled to 0. show sparkle
    return <group>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].howToPlay.combiningPiecesPage.text.position}
        rotation={layout[device].howToPlay.combiningPiecesPage.text.rotation}
        size={layout[device].howToPlay.combiningPiecesPage.text.size}
        height={layout[device].howToPlay.combiningPiecesPage.text.height}
        lineHeight={layout[device].howToPlay.combiningPiecesPage.text.lineHeight}
      >
        {'7. If you move a piece into a\ntile with your own piece, you\nwill piggyback them.'}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <FirstCornerTiles position={layout[device].howToPlay.combiningPiecesPage.firstCornerTiles.position}/>
      <animated.group scale={springs.moveText0Scale}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json" 
          position={layout[device].howToPlay.combiningPiecesPage.moveText0.position}
          rotation={layout[device].howToPlay.combiningPiecesPage.moveText0.rotation}
          size={layout[device].howToPlay.combiningPiecesPage.moveText0.size} 
          height={layout[device].howToPlay.combiningPiecesPage.moveText0.height}
          lineHeight={layout[device].howToPlay.combiningPiecesPage.moveText0.lineHeight}
        >
          {`MOVES:`}
          <meshStandardMaterial color={ "limegreen" }/>
        </Text3D>
        <GulToken 
          position={layout[device].howToPlay.combiningPiecesPage.gulToken.position} 
          rotation={layout[device].howToPlay.combiningPiecesPage.gulToken.rotation}
        />
        <GeToken 
          position={layout[device].howToPlay.combiningPiecesPage.geToken0.position} 
          rotation={layout[device].howToPlay.combiningPiecesPage.geToken0.rotation}
        />
      </animated.group>
      <animated.group scale={springs.moveText1Scale}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json" 
          position={layout[device].howToPlay.combiningPiecesPage.moveText1.position}
          rotation={layout[device].howToPlay.combiningPiecesPage.moveText1.rotation}
          size={layout[device].howToPlay.combiningPiecesPage.moveText1.size} 
          height={layout[device].howToPlay.combiningPiecesPage.moveText1.height}
          lineHeight={layout[device].howToPlay.combiningPiecesPage.moveText1.lineHeight}
        >
          MOVES:
          <meshStandardMaterial color={ "limegreen" }/>
        </Text3D>
        <GeToken 
          position={layout[device].howToPlay.combiningPiecesPage.geToken1.position} 
          rotation={layout[device].howToPlay.combiningPiecesPage.geToken1.rotation}
        />
      </animated.group>
    </group>
  }
  
  function ShortcutsPage() {
    const springs = useSpring({
      from: {
        cursorPos: layout[device].howToPlay.shortcutsPage.cursor.position[0],
        cursorScale: layout[device].howToPlay.shortcutsPage.cursor.scale[0],
        cursorEffectOpacity: layout[device].howToPlay.shortcutsPage.cursor.effectOpacity[0],
        rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[0],
        legalTile0Scale: 0.4,
        legalTile1Scale: 0.4,
        legalTile2Scale: 0.5,
        legalTile3Scale: 0.5,
        pointer0Scale: 0,
        pointer1Scale: 0,
        pointer2Scale: 0,
        pointer3Scale: 0,
        pointer4Scale: 0,
        rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[0],
        scoreScale: 0,
        tilesScale: layout[device].howToPlay.shortcutsPage.tilesScale[0],
        tilesPos: layout[device].howToPlay.shortcutsPage.tilesPos[0],
        tilesRotation: [0,0,0],
        ruleTextScale: layout[device].howToPlay.shortcutsPage.text.scales[0],
        noteTextScale: 0,
        moveTextScale: layout[device].howToPlay.shortcutsPage.moveText.scale[0],
        moveTokenScale: 0
      },
      to: [
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[1],
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[2],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[3],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[4],
          rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[1],
          legalTile0Scale: 0.6,
          pointer0Scale: 1.5,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[5],
          rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[2],
          legalTile0Scale: 0.4,
          pointer0Scale: 0,
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[6],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[7],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[3],
          delay: 500,
          scoreScale: 1,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[8],
          rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[4],
          scoreScale: 0,
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[9],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[10],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[11],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[5],
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[12],
          legalTile1Scale: 0.6,
          pointer1Scale: 1,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[6],
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[13],
          legalTile1Scale: 0.4,
          pointer1Scale: 0,
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[14],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[15],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[16],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[17],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[18],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          scoreScale: 1,
          rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[7],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          scoreScale: 0,
          rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[8],
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[19],
          tilesScale: layout[device].howToPlay.shortcutsPage.tilesScale[1],
          tilesPos: layout[device].howToPlay.shortcutsPage.tilesPos[1],
          tilesRotation: [0, -Math.PI/16, 0],
          ruleTextScale: layout[device].howToPlay.shortcutsPage.text.scales[1],
          noteTextScale: 1,
          cursorPos: layout[device].howToPlay.shortcutsPage.cursor.position[1],
          cursorScale: layout[device].howToPlay.shortcutsPage.cursor.scale[1],
          moveTextScale: layout[device].howToPlay.shortcutsPage.moveText.scale[1],
          delay: 1000
        },
        {
          cursorPos: layout[device].howToPlay.shortcutsPage.cursor.position[2],
          delay: 1000
        },
        {
          cursorEffectOpacity: layout[device].howToPlay.shortcutsPage.cursor.effectOpacity[1],
          rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[9],
          legalTile2Scale: 0.4,
          legalTile3Scale: 0.8,
          pointer2Scale: 1,
          pointer3Scale: 1,
          pointer4Scale: 2.5,
          moveTokenScale: 1,
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: layout[device].howToPlay.shortcutsPage.cursor.effectOpacity[2],
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[10],
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[20],
          delay: 2000,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[21],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[22],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[23],
          moveTokenScale: 0,
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
            position={layout[device].howToPlay.shortcutsPage.scoreText.position}
            rotation={layout[device].howToPlay.shortcutsPage.scoreText.rotation}
          >
            SCORE!
            <meshStandardMaterial color='limegreen'/>
          </Text3D>
        </animated.group>
      </animated.group>;
    }

    return <group name='shortcuts-page'>
      <animated.group name='text' 
        scale={springs.ruleTextScale}
      >
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.shortcutsPage.text.position} 
          rotation={layout[device].howToPlay.shortcutsPage.text.rotation}
          size={layout[device].howToPlay.shortcutsPage.text.size}
          height={layout[device].howToPlay.shortcutsPage.text.height}
          lineHeight={layout[device].howToPlay.shortcutsPage.text.lineHeight}
        >
          {`8. When you start a move\nfrom a planet or the Moon,\nyou can take a shortcut.`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </animated.group>
      <animated.group 
      name='note-text' 
      position={layout[device].howToPlay.shortcutsPage.noteText.position} 
      rotation={layout[device].howToPlay.shortcutsPage.noteText.rotation} 
      scale={springs.noteTextScale}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[0,0,0]}
          rotation={[0, 0, 0]}
          size={0.4}
          height={0.01}
        >
          {'NOTE: you cannot\nbend in the middle\nof a move.'}
          <meshStandardMaterial color='yellow'/>
        </Text3D> 
      </animated.group>
      <animated.group 
        name='move-text' 
        position={layout[device].howToPlay.shortcutsPage.moveText.position}
        rotation={layout[device].howToPlay.shortcutsPage.moveText.rotation}
        scale={springs.moveTextScale}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json" 
          size={0.5} 
          height={0.01}
        >
          {'MOVE:'}
          <meshStandardMaterial color='limegreen'/>
        </Text3D>
        <YootToken position={layout[device].howToPlay.shortcutsPage.yootToken.position} rotation={[Math.PI/2, Math.PI/2, 0]} />
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
      <animated.group scale={springs.moveTokenScale}>
        <YootToken 
          position={layout[device].howToPlay.shortcutsPage.tileHelper.position} 
          rotation={layout[device].howToPlay.shortcutsPage.tileHelper.rotation} 
        />
      </animated.group>
    </group>
  }

  function ReadingTheDicePage() {
    return <group scale={1}>
      <animated.group name='text'>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.text.position}
          rotation={layout[device].howToPlay.readingTheDicePage.text.rotation}
          size={layout[device].howToPlay.readingTheDicePage.text.size}
          height={layout[device].howToPlay.readingTheDicePage.text.height}
        >
          {'3. How to read the dice'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </animated.group>
      <group 
      position={layout[device].howToPlay.readingTheDicePage.do.position} 
      scale={layout[device].howToPlay.readingTheDicePage.do.scale}>     
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.do.text.line0.position}
          rotation={layout[device].howToPlay.readingTheDicePage.do.text.line0.rotation}
          size={layout[device].howToPlay.readingTheDicePage.do.text.line0.size}
          height={layout[device].howToPlay.readingTheDicePage.do.text.line0.height}
        >
          {'DO'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>       
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.do.text.line1.position}
          rotation={layout[device].howToPlay.readingTheDicePage.do.text.line1.rotation}
          size={layout[device].howToPlay.readingTheDicePage.do.text.line1.size}
          height={layout[device].howToPlay.readingTheDicePage.do.text.line1.height}
        >
          {'1 Step'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>   
        <Float rotationIntensity={0.1}>
          <YootSet 
          points="do" 
          scale={layout[device].howToPlay.readingTheDicePage.do.yootSet.scale} 
          position={layout[device].howToPlay.readingTheDicePage.do.yootSet.position}/>
        </Float>
      </group>
      <group 
      position={layout[device].howToPlay.readingTheDicePage.ge.position} 
      scale={layout[device].howToPlay.readingTheDicePage.ge.scale}>        
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.ge.text.line0.position}
          rotation={layout[device].howToPlay.readingTheDicePage.ge.text.line0.rotation}
          size={layout[device].howToPlay.readingTheDicePage.ge.text.line0.size}
          height={layout[device].howToPlay.readingTheDicePage.ge.text.line0.height}
        >
          {'GE'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>       
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.ge.text.line1.position}
          rotation={layout[device].howToPlay.readingTheDicePage.ge.text.line1.rotation}
          size={layout[device].howToPlay.readingTheDicePage.ge.text.line1.size}
          height={layout[device].howToPlay.readingTheDicePage.ge.text.line1.height}
        >
          {'2 Steps'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>   
        <Float rotationIntensity={0.1}>
          <YootSet 
          points="ge" 
          scale={layout[device].howToPlay.readingTheDicePage.ge.yootSet.scale} 
          position={layout[device].howToPlay.readingTheDicePage.ge.yootSet.position}/>
        </Float>
      </group>
      <group 
      position={layout[device].howToPlay.readingTheDicePage.gul.position} 
      scale={layout[device].howToPlay.readingTheDicePage.gul.scale}>        
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.gul.text.line0.position}
          rotation={layout[device].howToPlay.readingTheDicePage.gul.text.line0.rotation}
          size={layout[device].howToPlay.readingTheDicePage.gul.text.line0.size}
          height={layout[device].howToPlay.readingTheDicePage.gul.text.line0.height}
        >
          {'GUL'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>       
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.gul.text.line1.position}
          rotation={layout[device].howToPlay.readingTheDicePage.gul.text.line1.rotation}
          size={layout[device].howToPlay.readingTheDicePage.gul.text.line1.size}
          height={layout[device].howToPlay.readingTheDicePage.gul.text.line1.height}
        >
          {'3 Steps'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>   
        <Float rotationIntensity={0.1}>
        <YootSet 
        points="gul" 
        scale={layout[device].howToPlay.readingTheDicePage.gul.yootSet.scale} 
        position={layout[device].howToPlay.readingTheDicePage.gul.yootSet.position}/>
        </Float>
      </group>
      <group
      position={layout[device].howToPlay.readingTheDicePage.yoot.position} 
      scale={layout[device].howToPlay.readingTheDicePage.yoot.scale}>            
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.yoot.text.line0.position}
          rotation={layout[device].howToPlay.readingTheDicePage.yoot.text.line0.rotation}
          size={layout[device].howToPlay.readingTheDicePage.yoot.text.line0.size}
          height={layout[device].howToPlay.readingTheDicePage.yoot.text.line0.height}
        >
          {'YOOT'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>       
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.yoot.text.line1.position}
          rotation={layout[device].howToPlay.readingTheDicePage.yoot.text.line1.rotation}
          size={layout[device].howToPlay.readingTheDicePage.yoot.text.line1.size}
          height={layout[device].howToPlay.readingTheDicePage.yoot.text.line1.height}
        >
          {'4 Steps'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>   
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.yoot.text.line2.position}
          rotation={layout[device].howToPlay.readingTheDicePage.yoot.text.line2.rotation}
          size={layout[device].howToPlay.readingTheDicePage.yoot.text.line2.size}
          height={layout[device].howToPlay.readingTheDicePage.yoot.text.line2.height}
        >
          {'bonus turn'}
          <meshStandardMaterial color='limegreen'/>
        </Text3D>   
        <Float rotationIntensity={0.1}>
          <YootSet 
          points="yoot" 
          scale={layout[device].howToPlay.readingTheDicePage.yoot.yootSet.scale} 
          position={layout[device].howToPlay.readingTheDicePage.yoot.yootSet.position}/>
        </Float>
      </group>
      <group       
      position={layout[device].howToPlay.readingTheDicePage.mo.position} 
      scale={layout[device].howToPlay.readingTheDicePage.mo.scale}>   
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.mo.text.line0.position}
          rotation={layout[device].howToPlay.readingTheDicePage.mo.text.line0.rotation}
          size={layout[device].howToPlay.readingTheDicePage.mo.text.line0.size}
          height={layout[device].howToPlay.readingTheDicePage.mo.text.line0.height}
        >
          {'MO'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>      
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.mo.text.line1.position}
          rotation={layout[device].howToPlay.readingTheDicePage.mo.text.line1.rotation}
          size={layout[device].howToPlay.readingTheDicePage.mo.text.line1.size}
          height={layout[device].howToPlay.readingTheDicePage.mo.text.line1.height}
        >
          {'5 steps'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>      
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.mo.text.line2.position}
          rotation={layout[device].howToPlay.readingTheDicePage.mo.text.line2.rotation}
          size={layout[device].howToPlay.readingTheDicePage.mo.text.line2.size}
          height={layout[device].howToPlay.readingTheDicePage.mo.text.line2.height}
        >
          {'bonus turn'}
          <meshStandardMaterial color='limegreen'/>
        </Text3D>      
        <Float rotationIntensity={0.1}>
        <YootSet 
        points="mo" 
        scale={layout[device].howToPlay.readingTheDicePage.mo.yootSet.scale} 
        position={layout[device].howToPlay.readingTheDicePage.mo.yootSet.position}/>
        </Float>
      </group>
      <group 
      position={layout[device].howToPlay.readingTheDicePage.backdo.position} 
      scale={layout[device].howToPlay.readingTheDicePage.backdo.scale}>       
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.backdo.text.line0.position}
          rotation={layout[device].howToPlay.readingTheDicePage.backdo.text.line0.rotation}
          size={layout[device].howToPlay.readingTheDicePage.backdo.text.line0.size}
          height={layout[device].howToPlay.readingTheDicePage.backdo.text.line0.height}
        >
          {'backdo'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>         
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.backdo.text.line1.position}
          rotation={layout[device].howToPlay.readingTheDicePage.backdo.text.line1.rotation}
          size={layout[device].howToPlay.readingTheDicePage.backdo.text.line1.size}
          height={layout[device].howToPlay.readingTheDicePage.backdo.text.line1.height}
        >
          {'-1 step'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>      
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.backdo.text.line2.position}
          rotation={layout[device].howToPlay.readingTheDicePage.backdo.text.line2.rotation}
          size={layout[device].howToPlay.readingTheDicePage.backdo.text.line2.size}
          height={layout[device].howToPlay.readingTheDicePage.backdo.text.line2.height}
        >
          {'backward'}
          <meshStandardMaterial color='red'/>
        </Text3D>
        <Float rotationIntensity={0.1}>
          <YootSet 
          points="backdo" 
          scale={layout[device].howToPlay.readingTheDicePage.backdo.yootSet.scale} 
          position={layout[device].howToPlay.readingTheDicePage.backdo.yootSet.position}/>
        </Float>
      </group>
    </group>
  }

  function Tabs({ position=[0,0,0], scale=1 }) {
    const [pickingTeamsHover, setPickingTeamsHover] = useState(false)
    const [throwingTheDiceHover, setThrowingTheDiceHover] = useState(false)
    const [readingTheDiceHover, setReadingTheDiceHover] = useState(false)
    const [movingPiecesHover, setMovingPiecesHover] = useState(false)
    const [scoringHover, setScoringHover] = useState(false)
    const [catchingPiecesHover, setCatchingPiecesHover] = useState(false)
    const [combiningPiecesHover, setCombiningPiecesHover] = useState(false)
    const [shortcutsHover, setShortcutsHover] = useState(false)

    function handlePickingTeamsClick() {
      setPage(0)
    }
    function handlePickingTeamsPointerEnter() {
      setPickingTeamsHover(true)
    }
    function handlePickingTeamsPointerLeave() {
      setPickingTeamsHover(false)
    }

    function handleThrowingTheDiceClick() {
      setPage(1)
    }
    function handleThrowingTheDicePointerEnter() {
      setThrowingTheDiceHover(true)
    }
    function handleThrowingTheDicePointerLeave() {
      setThrowingTheDiceHover(false)
    }

    function handleReadingTheDiceClick() {
      setPage(2)
    }
    function handleReadingTheDicePointerEnter() {
      setReadingTheDiceHover(true)
    }
    function handleReadingTheDicePointerLeave() {
      setReadingTheDiceHover(false)
    }

    function handleMovingPiecesClick() {
      setPage(3)
    }
    function handleMovingPiecesPointerEnter() {
      setMovingPiecesHover(true)
    }
    function handleMovingPiecesPointerLeave() {
      setMovingPiecesHover(false)
    }

    function handleScoringClick() {
      setPage(4)
    }
    function handleScoringPointerEnter() {
      setScoringHover(true)
    }
    function handleScoringPointerLeave() {
      setScoringHover(false)
    }

    function handleCatchingPiecesClick() {
      setPage(5)
    }
    function handleCatchingPiecesPointerEnter() {
      setCatchingPiecesHover(true)
    }
    function handleCatchingPiecesPointerLeave() {
      setCatchingPiecesHover(false)
    }

    function handleCombiningPiecesClick() {
      setPage(6)
    }
    function handleCombiningPiecesPointerEnter() {
      setCombiningPiecesHover(true)
    }
    function handleCombiningPiecesPointerLeave() {
      setCombiningPiecesHover(false)
    }

    function handleShortcutsClick() {
      setPage(7)
    }
    function handleShortcutsPointerEnter() {
      setShortcutsHover(true)
    }
    function handleShortcutsPointerLeave() {
      setShortcutsHover(false)
    }

    return <group name='tabs' position={position} scale={scale}>
      <group name='tab-0' position={[0,0,0]} scale={0.8}>
        <mesh position={[2.1, -0.1, -0.15]}>
          <boxGeometry args={[4.5, 0.05, 0.6]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh position={[2.1, -0.1, -0.15]}>
          <boxGeometry args={[4.6, 0.04, 0.7]}/>
          <meshStandardMaterial color={pickingTeamsHover || page === 0 ? 'green' : 'yellow'}/>
        </mesh>
        <mesh 
          name='tab-0-wrapper' 
          position={[2.1, -0.1, -0.15]} 
          onClick={handlePickingTeamsClick}
          onPointerEnter={handlePickingTeamsPointerEnter}
          onPointerLeave={handlePickingTeamsPointerLeave}
        >
          <boxGeometry args={[4.6, 0.1, 0.7]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.3}
          height={0.01}
        >
          1. Picking the teams
          <meshStandardMaterial color={pickingTeamsHover || page === 0 ? 'green' : 'yellow'}/>
        </Text3D>
      </group>
      <group name='tab-1' position={[0,0,0.6]} scale={0.8}>
        <mesh position={[2.1, -0.1, -0.15]}>
          <boxGeometry args={[4.5, 0.05, 0.6]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh position={[2.1, -0.1, -0.15]}>
          <boxGeometry args={[4.6, 0.04, 0.7]}/>
          <meshStandardMaterial color={throwingTheDiceHover || page === 1 ? 'green' : 'yellow'}/>
        </mesh>
        <mesh 
          name='tab-1-wrapper' 
          position={[2.1, -0.1, -0.15]} 
          onClick={handleThrowingTheDiceClick}
          onPointerEnter={handleThrowingTheDicePointerEnter}
          onPointerLeave={handleThrowingTheDicePointerLeave}
        >
          <boxGeometry args={[4.6, 0.1, 0.7]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.3}
          height={0.01}
        >
          2. Throwing the dice
          <meshStandardMaterial color={throwingTheDiceHover || page === 1 ? 'green' : 'yellow'}/>
        </Text3D>
      </group>
      <group name='tab-2' position={[0,0,1.2]} scale={0.8}>
        <mesh position={[1.9, -0.1, -0.15]}>
          <boxGeometry args={[4.1, 0.05, 0.6]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh position={[1.9, -0.1, -0.15]}>
          <boxGeometry args={[4.2, 0.04, 0.7]}/>
          <meshStandardMaterial color={readingTheDiceHover || page === 2 ? 'green' : 'yellow'}/>
        </mesh>
        <mesh 
          name='tab-2-wrapper' 
          position={[1.9, -0.1, -0.15]}
          onClick={handleReadingTheDiceClick}
          onPointerEnter={handleReadingTheDicePointerEnter}
          onPointerLeave={handleReadingTheDicePointerLeave}
        >
          <boxGeometry args={[4.2, 0.1, 0.7]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.3}
          height={0.01}
        >
          3. reading the dice
          <meshStandardMaterial color={readingTheDiceHover || page === 2 ? 'green' : 'yellow'}/>
        </Text3D>
      </group>
      <group name='tab-3' position={[0,0,1.8]} scale={0.8}>
        <mesh position={[1.65, -0.1, -0.15]}>
          <boxGeometry args={[3.6, 0.05, 0.6]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh position={[1.65, -0.1, -0.15]}>
          <boxGeometry args={[3.7, 0.04, 0.7]}/>
          <meshStandardMaterial color={movingPiecesHover || page === 3 ? 'green' : 'yellow'}/>
        </mesh>
        <mesh 
          name='tab-3-wrapper' 
          position={[1.65, -0.1, -0.15]}
          onClick={handleMovingPiecesClick}
          onPointerEnter={handleMovingPiecesPointerEnter}
          onPointerLeave={handleMovingPiecesPointerLeave}
        >
          <boxGeometry args={[3.7, 0.1, 0.7]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.3}
          height={0.01}
        >
          4. moving pieces
          <meshStandardMaterial color={movingPiecesHover || page === 3 ? 'green' : 'yellow'}/>
        </Text3D>
      </group>
      <group name='tab-4' position={[0,0,2.4]} scale={0.8}>
        <mesh position={[2.05, -0.1, -0.15]}>
          <boxGeometry args={[4.4, 0.05, 0.6]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh position={[2.05, -0.1, -0.15]}>
          <boxGeometry args={[4.5, 0.04, 0.7]}/>
          <meshStandardMaterial color={scoringHover || page === 4 ? 'green' : 'yellow'}/>
        </mesh>
        <mesh 
          name='tab-4-wrapper' 
          position={[2.05, -0.1, -0.15]}
          onClick={handleScoringClick}
          onPointerEnter={handleScoringPointerEnter}
          onPointerLeave={handleScoringPointerLeave}
        >
          <boxGeometry args={[4.5, 0.1, 0.7]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.3}
          height={0.01}
        >
          5. scoring & winning
          <meshStandardMaterial color={scoringHover || page === 4 ? 'green' : 'yellow'}/>
        </Text3D>
      </group>
      <group name='tab-5' position={[0,0,3]} scale={0.8}>
        <mesh position={[1.8, -0.1, -0.15]}>
          <boxGeometry args={[3.9, 0.05, 0.6]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh position={[1.8, -0.1, -0.15]}>
          <boxGeometry args={[4, 0.04, 0.7]}/>
          <meshStandardMaterial color={catchingPiecesHover || page === 5 ? 'green' : 'yellow'}/>
        </mesh>
        <mesh 
          name='tab-5-wrapper' 
          position={[1.8, -0.1, -0.15]}
          onClick={handleCatchingPiecesClick}
          onPointerEnter={handleCatchingPiecesPointerEnter}
          onPointerLeave={handleCatchingPiecesPointerLeave}
        >
          <boxGeometry args={[4, 0.1, 0.7]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.3}
          height={0.01}
        >
          6. catching pieces
          <meshStandardMaterial color={catchingPiecesHover || page === 5 ? 'green' : 'yellow'}/>
        </Text3D>
      </group>
      <group name='tab-6' position={[0,0,3.6]} scale={0.8}>
        <mesh position={[2, -0.1, -0.15]}>
          <boxGeometry args={[4.3, 0.05, 0.6]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh position={[2, -0.1, -0.15]}>
          <boxGeometry args={[4.4, 0.04, 0.7]}/>
          <meshStandardMaterial color={combiningPiecesHover || page === 6 ? 'green' : 'yellow'}/>
        </mesh>
        <mesh 
          name='tab-6-wrapper' 
          position={[2, -0.1, -0.15]}
          onClick={handleCombiningPiecesClick}
          onPointerEnter={handleCombiningPiecesPointerEnter}
          onPointerLeave={handleCombiningPiecesPointerLeave}
        >
          <boxGeometry args={[4.4, 0.1, 0.7]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.3}
          height={0.01}
        >
          7. combining pieces
          <meshStandardMaterial color={combiningPiecesHover || page === 6 ? 'green' : 'yellow'}/>
        </Text3D>
      </group>
      <group name='tab-7' position={[0,0,4.2]} scale={0.8}>
        <mesh position={[1.35, -0.1, -0.15]}>
          <boxGeometry args={[3, 0.05, 0.6]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh position={[1.35, -0.1, -0.15]}>
          <boxGeometry args={[3.1, 0.04, 0.7]}/>
          <meshStandardMaterial color={shortcutsHover || page === 7 ? 'green' : 'yellow'}/>
        </mesh>
        <mesh 
          name='tab-7-wrapper' 
          position={[1.35, -0.1, -0.15]}
          onClick={handleShortcutsClick}
          onPointerEnter={handleShortcutsPointerEnter}
          onPointerLeave={handleShortcutsPointerLeave}
        >
          <boxGeometry args={[3.1, 0.1, 0.7]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.3}
          height={0.01}
        >
          8. shortcuts
          <meshStandardMaterial color={shortcutsHover || page === 7 ? 'green' : 'yellow'}/>
        </Text3D>
      </group>
    </group>
  }

  function Pagination({ position, scale }) {

    function handlePageLeft() {
      setPage(page => {
        if (page === 0) {
          return 7
        } else {
          return page-1
        }
      })
    }

    function handlePageRight() {
      setPage(page => {
        if (page === 7) {
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
    function handlePage7() {
      setPage(7)
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
      <mesh position={[4, 0, 6]} onPointerUp={handlePage7}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 7 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[5, 0, 6]} rotation={[0, 0, -Math.PI/2]} onPointerUp={handlePageRight}>
        <coneGeometry args={[layout[device].howToPlay.pagination.arrowRadius, 0.6, 3]}/>
        <meshStandardMaterial color="yellow"/>
      </mesh>
    </group>
  }

  const pages = [<PickingTheTeamsPage/>, <ThrowingTheDicePage/>, <ReadingTheDicePage/>, <MovingPiecesPage/>, <ScoringPage/>, <CatchingPiecesPage/>, <CombiningPiecesPage/>, <ShortcutsPage/>]

  return <group position={position} rotation={rotation} scale={scale}>
    {pages[page]}
    { device === 'portrait' && <Pagination 
      position={layout[device].howToPlay.pagination.position}
      scale={layout[device].howToPlay.pagination.scale}
    /> }
    { device === 'landscapeDesktop' && <Tabs position={[5.5, 0, -4]} scale={1}/> }
  </group>
}

useGLTF.preload('models/yoot-highlight.glb')
useGLTF.preload('models/yoot-rhino-highlight.glb')