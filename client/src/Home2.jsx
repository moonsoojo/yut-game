import React, { useState } from 'react';
import { Float, Text3D, useGLTF } from "@react-three/drei";
import { animated } from "@react-spring/three";
import { useAtom } from "jotai";
import layout from './layout';
import RocketAnimated from './meshes/RocketAnimated';
import UfoAnimated from './meshes/UfoAnimated';
import YootMesh from './meshes/YootMesh';
import { useLocation } from 'wouter';
import HowToPlay from './HowToPlay';
import Title from './Title';
import About from './About';
import { socket } from './SocketManager';
import { clientAtom, deviceAtom } from './GlobalState';
import Board from './Board';
import { Physics } from '@react-three/rapier';
import GameCamera from './GameCamera';
import StarsShader from './shader/stars/StarsShader';
import Rocket from './meshes/Rocket';
import Ufo from './meshes/Ufo';
import MilkyWay from './shader/MilkyWay';
import * as THREE from 'three';

export default function Home2() {

  const [device] = useAtom(deviceAtom)
  const [display, setDisplay] = useState('board')
  const [client] = useAtom(clientAtom)
  
  const { scene, materials } = useGLTF(
    "models/yoot.glb"
  );

  function Pieces() {
    return <group>
      {/* rocket on star 1 */}
      <Float 
        speed={3} 
        rotationIntensity={0.2}
        floatIntensity={0.1}
        floatingRange={[-0.1, 0.1]}
      >
        <RocketAnimated position={[4,0.5,1.8]} rotation={[-Math.PI/4, 0, 0]} scale={0.4}/>
      </Float>
      {/* rocket on moon */}
      <Float 
        speed={3} 
        rotationIntensity={0.3}
        floatIntensity={0.1}
        floatingRange={[-1, 1]}
      >
        <RocketAnimated position={[0,2,-0.1]} rotation={[-Math.PI/4, 0, 0]} scale={0.4}/>
      </Float>
      <Rocket position={[5,2,4]} rotation={[-Math.PI/8, 0, 0]} scale={1.2}/>
      <Rocket position={[6,2,4]} rotation={[-Math.PI/8, 0, 0]} scale={1.2}/>
      {/* ufo home piece */}
      <Ufo rotation={[-Math.PI/16,0,0]} position={[3.8, 0, 4.9]} scale={1.2}/>
      <Float 
      rotationIntensity={0.05} 
      speed={4} 
      floatIntensity={1}
      floatingRange={[0, 0.2]}
      >
        <UfoAnimated rotation={[-Math.PI/4,0,0]} position={[4.45, 0.5, -1]} scale={0.5}/>
      </Float>
      <Float rotationIntensity={0.03} speed={3} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
        <UfoAnimated rotation={[-Math.PI/4,0,0]} position={[0.3, 0.5, -4.7]} scale={0.5}/>
        <UfoAnimated rotation={[-Math.PI/4,0,0]} position={[1.1, 0.5, -4.7]} scale={0.5}/>
      </Float>
    </group>
  }

  function Yoots({position, rotation, scale}) {
    return <animated.group
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <Float floatIntensity={0.001} floatingRange={[0.05, 0.05]} speed={2} rotationIntensity={0.3}>
        <YootMesh scale={0.9} position={[0,0,-2]} rotation={[0, 0, -Math.PI/2]} scene={scene} materials={materials}/>
        <YootMesh scale={0.9} position={[0,0,0]} rotation={[0, 0, -Math.PI/2]} />
        <YootMesh scale={0.9} position={[0,0,2]} rotation={[0, 0, -Math.PI/2]} />
        <YootMesh scale={0.9} position={[0,0,4]} rotation={[0, 0, -Math.PI/2]} />
      </Float>
    </animated.group>
  }

  const [_location, setLocation] = useLocation();

  function AboutButton({ position, rotation, scale }) {
    const [hover, setHover] = useState(false)

    function handlePointerEnter(e) {
      e.stopPropagation();
      setHover(true)
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      setHover(false)
    }

    function handlePointerDown(e) {
      e.stopPropagation();
      setDisplay('about')
    }

    return <group position={position} rotation={rotation} scale={scale}>
      <mesh>
        <boxGeometry args={[1.5, 0.03, 0.55]}/>
        <meshStandardMaterial color={ hover ? 'green': 'yellow'}/>
      </mesh>
      <mesh>
        <boxGeometry args={[1.45, 0.04, 0.5]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
      >
        <boxGeometry args={[1.5, 0.1, 0.55]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-0.65, 0.025, 0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.3}
        height={0.01}
      >
        About
        <meshStandardMaterial color={ hover ? 'green': 'yellow'}/>
      </Text3D>
    </group>
  }

  function HowToPlayButton({ position, rotation, scale }) {
    const [hover, setHover] = useState(false)

    function handlePointerEnter(e) {
      e.stopPropagation();
      setHover(true)
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      setHover(false)
    }

    function handlePointerDown(e) {
      e.stopPropagation();
      setDisplay('howToPlay')
    }

    return <group position={position} rotation={rotation} scale={scale}>
      <mesh>
        <boxGeometry args={[2.8, 0.03, 0.55]}/>
        <meshStandardMaterial color={ hover ? 'green': 'yellow'}/>
      </mesh>
      <mesh>
        <boxGeometry args={[2.75, 0.04, 0.5]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
      >
        <boxGeometry args={[2.8, 0.1, 0.55]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-1.27, 0.025, 0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.3}
        height={0.01}
      >
        How To Play
        <meshStandardMaterial color={ hover ? 'green': 'yellow'}/>
      </Text3D>
    </group>
  }

  function LetsPlayButton({ position, rotation, scale }) {
    const [hover, setHover] = useState(false)

    function handlePointerEnter(e) {
      e.stopPropagation();
      setHover(true)
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      setHover(false)
    }

    function handlePointerDown(e) {
      e.stopPropagation();
      socket.emit('createRoom', { hostId: client._id }, ({ roomId }) => {
        setLocation(`/${roomId}`)
      })
    }

    return <group position={position} rotation={rotation} scale={scale}>
      <mesh>
        <boxGeometry args={[3, 0.03, 0.55]}/>
        <meshStandardMaterial color={ hover ? 'green': 'yellow'}/>
      </mesh>
      <mesh>
        <boxGeometry args={[2.95, 0.04, 0.5]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
      >
        <boxGeometry args={[2.8, 0.1, 0.55]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-1.37, 0.025, 0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.3}
        height={0.01}
      >
        Start a game
        <meshStandardMaterial color={ hover ? 'green': 'yellow'}/>
      </Text3D>
    </group>
  }
  
  return <>
    <GameCamera position={layout[device].camera.position}/>
    <group>
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
      <AboutButton 
        position={layout[device].title.about.position} 
        rotation={layout[device].title.about.rotation}
        scale={layout[device].title.about.scale}
      />
      <HowToPlayButton
        position={layout[device].title.howToPlay.position} 
        rotation={layout[device].title.howToPlay.rotation}
        scale={layout[device].title.howToPlay.scale}
      />
      <LetsPlayButton
        position={layout[device].title.letsPlay.position} 
        rotation={layout[device].title.letsPlay.rotation}
        scale={layout[device].title.letsPlay.scale}
      />
    </group>
    <group>
      { display === 'board' && <group position={layout[device].title.board.position} 
          scale={layout[device].title.board.scale}>
        <Board 
          showStart={true} 
          interactive={false}/>
        {/* <Pieces/> */}
      </group> }
      { display === 'about' && <About 
        device={device}
        position={layout[device].about.position}
        rotation={layout[device].about.rotation}
        scale={layout[device].about.scale}
      />}
      <Physics>
        { display === 'howToPlay' && <HowToPlay 
          device={device}
          position={layout[device].howToPlay.position}
          rotation={[0,0,0]}
          scale={layout[device].howToPlay.scale}
        />}
      </Physics>
    </group>
    
    <StarsShader count={1000} size={0.2}/>
    
    {/* stops on re-render */}
    <MilkyWay
      rotation={[-Math.PI/2, 0, -35.0]} 
      position={[4, -1, -0.5]} 
      scale={10}
      brightness={0.3}
      colorTint1={new THREE.Vector4(0, 1, 1, 1.0)}
      colorTint2={new THREE.Vector4(0, 1, 1, 1.0)}
      colorTint3={new THREE.Vector4(0, 1, 1, 1.0)}
    />
  </>
}