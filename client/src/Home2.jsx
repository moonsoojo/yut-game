import React, { useEffect, useRef, useState } from 'react';
import { Float, Html, PresentationControls, Text3D, useGLTF } from "@react-three/drei";
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
import { useLocation } from 'wouter';
import { makeId } from './helpers/helpers';
import HtmlElement from './HtmlElement';
import HowToPlay from './HowToPlay';

let mediaMax = 2560;
let landscapeMobileCutoff = 550;
let landscapeDesktopCutoff = 1000;

export default function Home2() {
  console.log(`[Home2]`)

  let [device, setDevice] = useState(initializeDevice(window.innerWidth, landscapeMobileCutoff, landscapeDesktopCutoff))
  // let [fov, setFov] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    console.log(`[Home2] ${device}`)
    
    console.log(window.innerWidth, window.innerHeight)
  }, []);

  const TILE_RADIUS = layout[device].tileRadius.ring;
  const NUM_STARS = 20;

  const [display, setDisplay] = useState('board')

  function initializeDevice(windowWidth, landscapeMobileCutoff) {
    if (windowWidth < landscapeMobileCutoff) {
      return "portrait"
    } else {
      return "landscapeDesktop"
    }
  }

  // asus monitor screen ratio: w / h 2560 / 1279
  // first fov: 45
  // let fovNormal = 35;
  // let widthNormal = 2560
  // let heightNormal = 1279
  // let screenRatio = widthNormal / heightNormal
  const handleResize = () => {
    // let widthRatio = window.innerWidth / widthNormal
    // let heightRatio = window.innerHeight / heightNormal
    // if (widthRatio > heightRatio) {
    //   setFov(fovNormal / heightRatio)
    // } else {
    //   setFov(fovNormal / widthRatio)
    // }
    if (window.innerWidth < landscapeMobileCutoff) {
      setDevice("portrait")
    } else {
      setDevice("landscapeDesktop")
    }
  }

  // assets
  
  const { scene, materials } = useGLTF(
    "models/yoot.glb"
  );

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
      ufoPosition: [4, 2, 4]
    },
    to: [
      {
        ufoRotation: [-Math.PI/8,0,Math.PI * -1/4],
        ufoPosition: [2, 2, 4],
      },
      {
        ufoRotation: [-Math.PI/8,0,Math.PI * 1/4],
        ufoPosition: [4, 2, 4],
      }
    ],
    config: {
      friction: 36
    },
    loop: true
  })

  function Pieces() {
    return <group>
      <RocketAnimated position={[4,2,0]} scale={0.5}/>
      <RocketAnimated position={[-1,2,0]} scale={0.5}/>
      <Float speed={3} floatIntensity={1}>
        <group rotation={[-Math.PI/12,0,0]}>
          <UfoAnimated position={[-1.5, 1, 3.5]} scale={0.5}/>
          <UfoAnimated position={[-2.5, 1, 3.5]} scale={0.5}/>
          <UfoAnimated position={[-2, 1, 4.2]} scale={0.5}/>
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
    // camera.fov = fov
    
    // set position in index.jsx
    // console.log(camera.position)
    
    /* how to make camera.lookAt() with default camera */
    // camera.lookAt(new Vector3(-0.311, -0.661, -0.683))
  })

  function Yoots({position, rotation, scale}) {
    return <animated.group
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <Float floatIntensity={0.001} speed={2}>
        <Yoot scale={0.5} position={[0,0,0]} scene={scene} materials={materials}/>
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
  function handleHowToPlay() {
    setDisplay('howToPlay');
  }
  
  return <PresentationControls
    global
    polar={[-0.4, 0.2]}
    azimuth={[-1, 0.75]}
    config={{ mass: 2, tension: 400 }}
    snap={{ mass: 4, tension: 400 }}
  >
  <group 
    position={layout[device].title.text.position} 
    rotation={layout[device].title.text.rotation}
    scale={layout[device].title.text.scale}
  >
    <Html 
      transform
    >
      <div
        style={{
          fontFamily: 'Luckiest Guy',
          fontSize: `${layout[device].title.text.fontSize}px`,
          color: 'yellow'
        }}>
        <div>YOOT</div>
        <div>GAME!</div>
      </div>
    </Html> 
  </group>
  <Yoots 
    position={layout[device].title.yoots.position}
    rotation={layout[device].title.yoots.rotation}
    scale={layout[device].title.yoots.scale} 
  />
  { layout[device].title.about.show && <HtmlElement 
    font="/fonts/Luckiest Guy_Regular.json" 
    position={layout[device].title.about.position}
    rotation={layout[device].title.about.rotation}
    fontSize={layout[device].title.about.fontSize} 
    text='about'
  >
    ABOUT
    <meshStandardMaterial color="yellow"/>
  </HtmlElement> }
  <HtmlElement
    position={layout[device].title.howToPlay.position}
    rotation={layout[device].title.howToPlay.rotation}
    fontSize={layout[device].title.howToPlay.fontSize} 
    handleClick={handleHowToPlay}
    text='how to play'
  >
    HOW TO PLAY
  </HtmlElement>
  <group>
    <group scale={layout[device].title.letsPlay.scale}>
      <HtmlElement
        text="LET'S PLAY!"
        position={layout[device].title.letsPlay.position}
        rotation={layout[device].title.letsPlay.rotation}
        fontSize={25}
        handleClick={handleLetsPlay}
      />
    </group>
    <group
      position={layout[device].title.tiles.position} 
      scale={layout[device].title.tiles.scale}
    >
      { display === 'board' && <group 
      >
        <Tiles/>
        <Pieces/>
      </group>}
      { display === 'howToPlay' && <HowToPlay device={device}/>}
    </group>  
  </group>
  </PresentationControls>
}