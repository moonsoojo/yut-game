// React
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from "wouter";
import layout from './layout';

// Three
import { Leva, useControls } from "leva";
import { useGLTF, OrthographicCamera, Text3D, Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

// Assets
import Star from "./meshes/Star.jsx";
import Neptune2 from "./meshes/Neptune2.jsx";
import Mars from "./meshes/Mars.jsx";
import Saturn from "./meshes/Saturn.jsx";
import Moon from "./meshes/Moon.jsx";
import Earth from "./meshes/Earth.jsx";
import Rocket from './meshes/Rocket.jsx';
import Ufo from './meshes/Ufo.jsx';

// multiplayer
import { socket } from './SocketManager.jsx';

let mediaMax = 2560;
let landscapeMobileCutoff = 550;
let landscapeDesktopCutoff = 1000;

export default function Home() {

  const [size, setSize] = useState([0,0])
  
  function initializeDevice(windowWidth, landscapeMobileCutoff, landscapeDesktopCutoff) {
    if (windowWidth < landscapeMobileCutoff) {
      return "portrait"
    } else if (windowWidth < landscapeDesktopCutoff) {
      return "landscapeMobile"
    } else {
      return "landscapeDesktop"
    }
  }

  let [device, setDevice] = useState(initializeDevice(window.innerWidth, landscapeMobileCutoff, landscapeDesktopCutoff))

  const handleResize = () => {
    setSize([window.innerWidth, window.innerHeight]); // trigger render so zoom changes
    if (window.innerWidth < landscapeMobileCutoff) {
      setDevice("portrait")
    } else if (window.innerWidth < landscapeDesktopCutoff) {
      setDevice("landscapeMobile")
    } else {
      setDevice("landscapeDesktop")
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  // yoot model
  const nodes = useGLTF("models/yut.glb").nodes;
  const materials = useGLTF("models/yut.glb").materials;

  const camera = useRef();

  useEffect(() => {
    camera.current.lookAt(
      layout[device].center[0] + layout[device].camera.lookAtOffset[0], 
      layout[device].center[1] + layout[device].camera.lookAtOffset[1],  
      layout[device].center[2] + layout[device].camera.lookAtOffset[2], 
    )
  }, [device])

  let zoom;

  function calcScale(minVal, maxVal, mediaMin, mediaMax, width) {
    return minVal + (maxVal - minVal) * (width - mediaMin) / (mediaMax - mediaMin)
  }

  if (device !== "portrait") {
    zoom = calcScale(
      layout[device].camera.zoomMin,
      layout[device].camera.zoomMax,
      landscapeMobileCutoff,
      mediaMax,
      window.innerWidth
    )
  } else {
    zoom = calcScale(
      layout[device].camera.zoomMin,
      layout[device].camera.zoomMax,
      0,
      landscapeMobileCutoff,
      window.innerWidth
    )
  }

  function handleRulebook() {
    var win = window.open('https://www.youtube.com/watch?v=R-9XBzyW8Y8', '_blank');
    win.focus();
  }

  let NUM_STARS = 20;
  const TILE_RADIUS = layout[device].tileRadius.ring;
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
        tiles.push(<Neptune2 position={position} tile={i} key={i} device={device}/>);
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

  let lightPosition = {
    value: [0.13, 0.42, 0.25],
    step: 0.01,
  }
  let lightIntensity = {
    value: 4,
    min: 0,
    max: 10,
    step: 0.01,
  }

  const [rulebookHover, setRulebookHover] = useState(false);

  function handleRulebookEnter() {
    setRulebookHover(true);
  }
  
  function handleRulebookOut() {
    setRulebookHover(false);
  }

  const [letsPlayHover, setLetsPlayHover] = useState(false);

  function handleLetsPlayEnter() {
    setLetsPlayHover(true);
  }
  
  function handleLetsPlayOut() {
    setLetsPlayHover(false);
  }

  const [location, setLocation] = useLocation();

  function handleLetsPlay() {
    // create room
    // on callback
      // setLocation
    socket.emit("createRoom", {}, ({ id }) => {
      setLocation(`/${id}`)
    })
  }

  return (
    <group>
      <color args={ ['#030202']} attach="background" />
      <OrthographicCamera
        makeDefault
        zoom={zoom}
        top={200}
        bottom={-200}
        left={200}
        right={-200}
        near={0.1}
        far={2000}
        position={layout[device].camera.position}
        ref={camera}
      />
      <Leva hidden />
      <directionalLight
        position={lightPosition.value}
        intensity={lightIntensity.value}
        castShadow
      />
      <group>
        <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.9} 
        height={0.01} 
        rotation={[-Math.PI / 2, 0, 0, "XZY"]}
        position={layout[device].title.position1}> 
          YOOT
          <meshStandardMaterial color='yellow' />
        </Text3D>
        <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.9} 
        height={0.01} 
        rotation={[-Math.PI / 2, 0, 0, "XZY"]}
        position={layout[device].title.position2}> 
          GAME
          <meshStandardMaterial color='yellow' />
        </Text3D>
        <group position={layout[device].center} scale={layout[device].tiles.scale}>
          <Tiles />
        </group>
        {/* Yoots */}
        <group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder007.geometry}
            material={materials["Texture wrap.005"]}
            position={layout[device].title.yuts.position1}
            rotation={layout[device].title.yuts.rotation1}
            scale={layout[device].title.yuts.scale}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder007.geometry}
            material={materials["Texture wrap.005"]}
            position={layout[device].title.yuts.position2}
            rotation={layout[device].title.yuts.rotation2}
            scale={layout[device].title.yuts.scale}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder007.geometry}
            material={materials["Texture wrap.005"]}
            position={layout[device].title.yuts.position3}
            rotation={layout[device].title.yuts.rotation3}
            scale={layout[device].title.yuts.scale}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder007.geometry}
            material={materials["Texture wrap.005"]}
            position={layout[device].title.yuts.position4}
            rotation={layout[device].title.yuts.rotation4}
            scale={layout[device].title.yuts.scale}
          />
        </group>
        <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.8} 
        height={0.01} 
        rotation={[-Math.PI / 2, 0, 0, "XZY"]}
        position={layout[device].title.rulebook.position1}> 
          RULE
          <meshStandardMaterial color={rulebookHover ? "white" : 'yellow'} />
        </Text3D>
        <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.8} 
        height={0.01} 
        rotation={[-Math.PI / 2, 0, 0, "XZY"]}
        position={layout[device].title.rulebook.position2}> 
          BOOK
          <meshStandardMaterial color={rulebookHover ? "white" : 'yellow'} />
        </Text3D>
        <mesh
          position={layout[device].title.rulebook.positionBox}
          onPointerEnter={handleRulebookEnter}
          onPointerOut={handleRulebookOut}
          onPointerDown={handleRulebook}
        >
          <boxGeometry args={layout[device].title.rulebook.dimsBox} />
          <meshStandardMaterial transparent opacity={0} />
        </mesh>
        <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.8} 
        height={0.01} 
        rotation={[-Math.PI / 2, 0, 0, "XZY"]}
        position={layout[device].title.letsPlay.position1}> 
          LET'S
          <meshStandardMaterial color={letsPlayHover ? "white" : 'yellow'} />
        </Text3D>
        <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.8} 
        height={0.01} 
        rotation={[-Math.PI / 2, 0, 0, "XZY"]}
        position={layout[device].title.letsPlay.position2}> 
          PLAY!
          <meshStandardMaterial color={letsPlayHover ? "white" : 'yellow'} />
        </Text3D>
        <mesh
          position={layout[device].title.letsPlay.positionBox}
          onPointerEnter={handleLetsPlayEnter}
          onPointerOut={handleLetsPlayOut}
          onPointerDown={handleLetsPlay}
        >
          <boxGeometry args={layout[device].title.letsPlay.dimsBox} />
          <meshStandardMaterial transparent opacity={0} />
        </mesh>
        {/* <Html position={layout[device].title.letsPlay.position}>
          <div
            style={{ 
              'fontFamily': 'Luckiest Guy',
              'fontSize': layout[device].title.letsPlay.fontSize,
              'color': 'yellow',
              "whiteSpace": "pre-line",
              'border': '3px solid yellow',
              'borderRadius': '10px',
              "margin": "10px"
            }}
            onClick={handlePlayOnline}
          >
            <p 
              style={{
                margin: '0px 10px'
            }}>
              Let's 
              Play!
            </p>
          </div>
        </Html> */}
        {/* PIECES */}
        { device !== 'portrait' && <group>
          <Rocket 
            position={layout[device].title.rockets.position1}
            scale={layout[device].title.rockets.scale}/>
          <Rocket
            position={layout[device].title.rockets.position2}
            scale={layout[device].title.rockets.scale}/>
          <Rocket 
            position={layout[device].title.rockets.position3}
            scale={layout[device].title.rockets.scale}/>
          <Rocket 
            position={layout[device].title.rockets.position4}
            scale={layout[device].title.rockets.scale}/>
          <Ufo 
            position={layout[device].title.ufos.position1}
            scale={layout[device].title.ufos.scale}/>
          <Ufo
            position={layout[device].title.ufos.position2}
            scale={layout[device].title.ufos.scale}/>
          <Ufo 
            position={layout[device].title.ufos.position3}
            scale={layout[device].title.ufos.scale}/>
          <Ufo 
            position={layout[device].title.ufos.position4}
            scale={layout[device].title.ufos.scale}/>
        </group>}
      </group>
    </group>
  )
}