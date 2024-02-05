import React, { useRef } from 'react';
import { Float, PresentationControls, Text3D } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

import Earth from './meshes/Earth';
import Moon from './meshes/Moon';
import Mars from './meshes/Mars';
import Star from './meshes/Star';
import Saturn from './meshes/Saturn';
import Neptune from './meshes/Neptune';
import layout from './layout';
import RocketAnimated from './meshes/RocketAnimated';
import UfoAnimated from './meshes/UfoAnimated';
import { useFrame } from '@react-three/fiber';
import { Euler } from 'three';
import Yoot from './meshes/Yoot';
import TextButton from './components/TextButton';
import { useLocation } from 'wouter';
import { makeId } from './helpers/helpers';

// text colors to green like earth
export default function Home2() {

  const device = "landscapeDesktop"

  const TILE_RADIUS = layout[device].tileRadius.ring;
  const NUM_STARS = 20;

  const yoot0 = useRef()
  const yoot1 = useRef()
  const yoot2 = useRef()
  const yoot3 = useRef()
  const yoots = [yoot0, yoot1, yoot2, yoot3]

  function Tiles() {
    let tiles = [];

    //circle
    for (let i = 0; i < NUM_STARS; i++) {
      let position = [
        -Math.cos(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
        0,
        Math.sin(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
      ];
      if (i == 0) {
        tiles.push(<Earth position={position} tile={i} key={i} device={device}/>);
      } else if (i == 5) {
        tiles.push(
          <Mars
            position={position}
            tile={i}
            key={i}
            device={device}
          />
        );
      } else if (i == 10) {
        tiles.push(<Saturn position={position} tile={i} key={i} device={device}/>);
      } else if (i == 15) {
        tiles.push(<Neptune position={position} tile={i} key={i} device={device}/>);
      } else {
        tiles.push(
          <Star
            position={position}
            tile={i}
            key={i}
            scale={layout[device].star.scale}
            device={device}
          />
        );
      }
    }

    //shortcuts
    const radiusShortcut1 = layout[device].tileRadius.shortcut1;
    const radiusShortcut2 = layout[device].tileRadius.shortcut2;
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
            scale={layout[device].star.scale}
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
            scale={layout[device].star.scale}
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
        // scale={0.4}
        key={100}
        tile={22}
        device={device}
      />
    );
    return tiles;
  }

  const { ufoRotation, ufoPosition } = useSpring({
    from: {
      ufoRotation: [-Math.PI/8,0,Math.PI * 1/4],
      ufoPosition: [5, 2, -3]
    },
    to: [
      {
        ufoRotation: [-Math.PI/8,0,Math.PI * -1/4],
        ufoPosition: [3, 2, -3],
      },
      {
        ufoRotation: [-Math.PI/8,0,Math.PI * 1/4],
        ufoPosition: [5, 2, -3],
      }
    ],
    config: {
      friction: 36
    },
    loop: true
  })

  function Pieces() {
    return <group>
      <RocketAnimated position={[4,2,-5]} scale={0.5}/>
      <RocketAnimated position={[0,2,-5]} scale={0.5}/>
      <Float speed={5} floatIntensity={2}>
        <group rotation={[-Math.PI/12,0,0]}>
          <UfoAnimated position={[-1.8, 2, -4]} scale={0.5}/>
          <UfoAnimated position={[-3.4, 2, -4]} scale={0.5}/>
          <UfoAnimated position={[-2.4, 2, -5.5]} scale={0.5}/>
        </group>
      </Float>
      <UfoAnimated position={ufoPosition} scale={0.5} rotation={ufoRotation}/>
    </group>
  }

  useFrame((state, delta) => {
    const camera = state.camera
    // console.log(camera.rotation) 
    // rotate camera to look at what you want
    // const camera = state.camera    
    const euler = new Euler(
      -0.9678104558564694, 
      0.07841126014215415,
      0.11327856815709492, 
      "XYZ"
    )
    camera.setRotationFromEuler(euler)
    
    // set position in index.jsx
    // console.log(camera.position)
    
    /* how to make camera.lookAt() with default camera */
    // camera.lookAt(new Vector3(-0.311, -0.661, -0.683))
  })

  function Yoots() {
    return <animated.group 
        scale={0.6} 
        rotation={[Math.PI/4,Math.PI/2,0]}
        position={[-7, 1, -5.5]}
      >
        <Float>
          <Yoot scale={0.5} position={[0,0,0]}/>
          <Yoot scale={0.5} position={[0,0,-1]}/>
          <Yoot scale={0.5} position={[0,0,-2]}/>
          <Yoot scale={0.5} position={[0,0,-3]}/>
        </Float>
    </animated.group>
  }

  const [location, setLocation] = useLocation();

  function handleLetsPlay() {
    setLocation(`/${(makeId(5)).toUpperCase()}`)
  }
  
  return <PresentationControls
    global
    polar={[-0.4, 0.2]}
    azimuth={[-1, 0.75]}
    config={{ mass: 2, tension: 400 }}
    snap={{ mass: 4, tension: 400 }}
  >
  <group position={[-14,2,-2]} rotation={[-Math.PI/4,Math.PI/8,Math.PI/32]}>
    <Text3D 
      font="/fonts/Luckiest Guy_Regular.json" 
      size={1.3} 
      height={0.01} 
      position={[0, 1.5, 0]}
      // rotation={[-Math.PI/8,Math.PI/4,0]}
    >
      YOOT
      <meshStandardMaterial color="yellow"/>
    </Text3D>
    <Text3D 
      font="/fonts/Luckiest Guy_Regular.json" 
      size={1.3} 
      height={0.01} 
      position={[0, -0.5, 0]}
      // rotation={[-Math.PI/8,Math.PI/4,0]}
    >
      GAME!
      <meshStandardMaterial color="yellow"/>
    </Text3D>
    <Text3D 
      font="/fonts/Luckiest Guy_Regular.json" 
      size={0.7} 
      height={0.01} 
      position={[0, -3.5, 0]}
      // rotation={[-Math.PI/8,Math.PI/4,0]}
    >
      ABOUT
      <meshStandardMaterial color="yellow"/>
    </Text3D>
    <Text3D 
      font="/fonts/Luckiest Guy_Regular.json" 
      size={0.7} 
      height={0.01} 
      position={[0, -6.5, 0]}
      // rotation={[-Math.PI/8,Math.PI/4,0]}
    >
      HOW TO PLAY
      <meshStandardMaterial color="yellow"/>
    </Text3D>
  </group>
    <group>
      <TextButton
        text="LET'S PLAY!"
        position={[-2.2, 0, 2]}
        rotation={[-Math.PI/2,0,0]}
        size={0.6} 
        boxHeight={0.8}
        boxWidth={4.5}
        handlePointerClick={handleLetsPlay}
      />
      <group position={[0, 0, -5]}>
        <Tiles/>
      </group>
      <Pieces/>
      <Yoots/>
    </group>
  </PresentationControls>
}