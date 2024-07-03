import { Float, MeshDistortMaterial, Text3D, useGLTF } from '@react-three/drei';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import React, { useEffect, useRef, useState } from 'react';
import YootButtonModel from './meshes/YootButtonModel';
import HtmlElement from './HtmlElement';
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


const PAGE_2_PLAY_TIME = 14400 // scene loops, but it ends more quickly 
export default function HowToPlay({ device, position, rotation, scale }) {
  const [page, setPage] = useState(0)

  const [pageTimeout, setPageTimeout] = useState(null)

  
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
      <YootButtonModel
        position={[3, 0, 2]}
        rotation={[Math.PI/16, Math.PI/2, Math.PI/32, "ZXY"]}
        turnedOn={yootButtonTurnedOn}
      />
      <Cursor
        position={[4, 0.3, 3.4]}
        rotation={[0, 0, 0]}
        scale={[3, 3, 0.1]}
        effect={effect}
      />
    </group>
  }

  return <group position={position} rotation={rotation} scale={scale}>
    <Page0/>
  </group>
}

useGLTF.preload('models/yoot-highlight.glb')
useGLTF.preload('models/yoot-rhino-highlight.glb')