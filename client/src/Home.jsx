// React
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import layout from '../../layout';

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
import TextButton from './components/TextButton.jsx';

let mediaMax = 2560;
let landscapeMobileCutoff = 550;
let landscapeDesktopCutoff = 1000;

export default function Home() {
  const navigate = useNavigate()

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
  const nodes = useGLTF("/models/yut.glb").nodes;
  const materials = useGLTF("/models/yut.glb").materials;

  const camera = useRef();

  useEffect(() => {
    camera.current.lookAt(
      layout[device].center[0] + layout[device].camera.lookAtOffset[0], 
      layout[device].center[1] + layout[device].camera.lookAtOffset[1],  
      layout[device].center[2] + layout[device].camera.lookAtOffset[2], 
    )
  }, [device])

  let zoom;

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

  function calcScale(minVal, maxVal, mediaMin, mediaMax, width) {
    return minVal + (maxVal - minVal) * (width - mediaMin) / (mediaMax - mediaMin)
  }

  function handlePlayOnline() {
    navigate(`/game/1`)
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
    value: 1.62,
    min: 0,
    max: 10,
    step: 0.01,
  }

  return (
    <group>
      <color args={ ['#030202']} attach="background" />
      <Leva hidden />
      <directionalLight
        position={lightPosition.value}
        intensity={lightIntensity.value}
        castShadow
      />
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
      <group position={[-5.3, 0, -17]}>
        <Html>
          <div
            style={{ 
              'fontFamily': 'Luckiest Guy',
              'fontSize': '60px',
              'color': 'yellow',
              "whiteSpace": "pre-line",
            }}
          >
            <p 
              style={{
                margin: '0px 10px'
            }}>
              YOOT
              GAME
            </p>
          </div>
        </Html>
      </group>
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
          rotation={[0, -Math.PI / 2, -Math.PI / 2]}
          scale={[0.32, 2, 0.32]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder007.geometry}
          material={materials["Texture wrap.005"]}
          position={layout[device].title.yuts.position2}
          rotation={[0, - 7 * Math.PI / 16, -Math.PI / 2]}
          scale={[0.32, 2, 0.32]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder007.geometry}
          material={materials["Texture wrap.005"]}
          position={layout[device].title.yuts.position3}
          rotation={[0, - 7 * Math.PI / 16, -Math.PI / 2]}
          scale={[0.32, 2, 0.32]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder007.geometry}
          material={materials["Texture wrap.005"]}
          position={layout[device].title.yuts.position4}
          rotation={[0, - 9 * Math.PI / 16, -Math.PI / 2]}
          scale={[0.32, 2, 0.32]}
        />
      </group>
      <Html position={layout[device].title.rulebook.position}>
        <div
          style={{ 
            'fontFamily': 'Luckiest Guy',
            'fontSize': '50px',
            'color': 'yellow',
            "whiteSpace": "pre-line",
            'border': '3px solid yellow',
            'borderRadius': '10px',
            "margin": "10px"
          }}
          onClick={handleRulebook}
        >
          <p 
            style={{
              margin: '0px 10px'
          }}>
            RULE
            BOOK
          </p>
        </div> 
      </Html>
      <Html position={layout[device].title.letsPlay.position}>
        <div
          style={{ 
            'fontFamily': 'Luckiest Guy',
            'fontSize': '50px',
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
      </Html>
    </group>
  )
}