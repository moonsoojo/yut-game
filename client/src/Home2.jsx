import React, { useState } from 'react';
import { Float, PresentationControls, useGLTF } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { useAtom } from "jotai";
import layout from './layout';
import RocketAnimated from './meshes/RocketAnimated';
import UfoAnimated from './meshes/UfoAnimated';
import { useFrame } from '@react-three/fiber';
import { Euler } from 'three';
import Yoot from './meshes/Yoot';
import { useLocation } from 'wouter';
import HtmlElement from './HtmlElement';
import HowToPlay from './HowToPlay';
import Title from './Title';
import About from './About';
import Stars from './particles/Stars';
import { socket } from './SocketManager';
import { clientAtom, deviceAtom } from './GlobalState';
import Board from './Board';
import initialState from '../initialState';

export default function Home2() {

  const [device] = useAtom(deviceAtom)
  const [display, setDisplay] = useState('board')
  const [client] = useAtom(clientAtom)
  
  const { scene, materials } = useGLTF(
    "models/yoot.glb"
  );

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
      <RocketAnimated position={[4,2,0]} rotation={[-Math.PI/4, -Math.PI/8, 0]} scale={0.5}/>
      <RocketAnimated position={[-1,2,0]} rotation={[-Math.PI/4, -Math.PI/16, 0]} scale={0.5}/>
      <Float speed={3} floatIntensity={1}>
        <group rotation={[-Math.PI/4,0,0]}>
          <UfoAnimated position={[-1, -1, 3.5]} scale={0.5}/>
          <UfoAnimated position={[-2, -1, 3.5]} scale={0.5}/>
          <UfoAnimated position={[-1.5, -1.3, 4.2]} scale={0.5}/>
        </group>
      </Float>
      <UfoAnimated position={ufoPosition} scale={0.5} rotation={ufoRotation}/>
    </group>
  }

  useFrame((state, delta) => {
    const camera = state.camera
    if (device === "landscapeDesktop") {
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
      camera.position.x = -3.431723242390655
      camera.position.y = (12.798027537168215)
      camera.position.z = (6.469516796871723 )
    } else if (device === "portrait") {
      // console.log(camera.rotation) 
      // rotate camera to look at what you want
      // const camera = state.camera    
      const euler = new Euler(
        -0.9678104558564694, 
        0,
        0, 
        "XYZ"
      )
      camera.setRotationFromEuler(euler)
      camera.position.x = (0)
      camera.position.y = (10)
      camera.position.z = (5)
    }
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
      <Float floatIntensity={0.001} floatingRange={[0.05, 0.05]} speed={2} rotationIntensity={0.3}>
        <Yoot scale={1} position={[0,0,-2]} rotation={[0, 0, -Math.PI/2]} scene={scene} materials={materials}/>
        <Yoot scale={1} position={[0,0,0]} rotation={[0, 0, -Math.PI/2]} />
        <Yoot scale={1} position={[0,0,2]} rotation={[0, 0, -Math.PI/2]} />
        <Yoot scale={1} position={[0,0,4]} rotation={[0, 0, -Math.PI/2]} />
      </Float>
    </animated.group>
  }

  const [location, setLocation] = useLocation();

  function handleLetsPlay() {
    socket.emit('createRoom', { hostId: client._id }, ({ roomId }) => {
      setLocation(`/${roomId}`)
    })
  }
  function handleHowToPlay() {
    setDisplay('howToPlay');
  }
  function handleAbout() {
    setDisplay('about')
  }
  
  // move board down to fill the gap
  // add page navigation on how-to-play
  // dots and arrows
  return <PresentationControls
    global
    polar={[-0.4, 0.2]}
    azimuth={[-1, 0.75]}
    config={{ mass: 2, tension: 400 }}
    snap={{ mass: 4, tension: 400 }}
  >
    <group
      position={layout[device].title.position}
      rotation={layout[device].title.rotation}
      scale={1.4}
    >
      <Title 
        position={layout[device].title.text.position}
        rotation={layout[device].title.text.rotation}
        scale={layout[device].title.text.scale}
        setDisplay={setDisplay}
      />
      <Yoots 
        position={layout[device].title.yoots.position}
        rotation={layout[device].title.yoots.rotation}
        scale={layout[device].title.yoots.scale} 
      />
      <HtmlElement 
        position={layout[device].title.about.position}
        rotation={layout[device].title.about.rotation}
        fontSize={layout[device].title.about.fontSize} 
        handleClick={handleAbout}
        text='about'
        color='yellow'
      />
      <HtmlElement
        position={layout[device].title.howToPlay.position}
        rotation={layout[device].title.howToPlay.rotation}
        fontSize={layout[device].title.howToPlay.fontSize} 
        handleClick={handleHowToPlay}
        text='how to play'
      />
      <HtmlElement
        position={layout[device].title.letsPlay.position}
        rotation={layout[device].title.letsPlay.rotation}
        fontSize={layout[device].title.letsPlay.fontSize}
        text="LET'S PLAY!"
        scale={layout[device].title.letsPlay.scale}
        handleClick={handleLetsPlay}
      />
    </group>
    <group>
      <group
        position={layout[device].title.tiles.position}
        rotation={layout[device].title.tiles.rotation}
        scale={layout[device].title.tiles.scale}
      >
        { display === 'board' && <group>
          <Board showStart={false} interactive={false}/>
          <Pieces/>
        </group>}
      </group>
      <group>
        { display === 'about' && <About 
          device={device}
          position={layout[device].about.position}
          rotation={layout[device].about.rotation}
          scale={layout[device].about.scale}
        />}
        { display === 'howToPlay' && <HowToPlay 
          device={device}
          position={layout[device].howToPlay.position}
          rotation={layout[device].howToPlay.rotation}
          scale={layout[device].howToPlay.scale}
        />}
      </group>  
    </group>
    
    <Stars count={1000} size={0.2}/>
    
  </PresentationControls>
}