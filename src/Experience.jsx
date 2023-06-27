import { useRef, useState, useEffect } from "react";
import { useThree, extend, useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody, Physics } from "@react-three/rapier";
import { CameraControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import Yuts from "./Yuts";
import Star from "./Star";
import Neptune from "./Neptune";
import Earth from "./Earth";
import Rocket from "./Rocket";
import Ufo from "./Ufo";
import Mars from "./Mars";
import Saturn from "./Saturn";
import { useSelector } from "react-redux";
// import { CameraControls } from "@react-three/drei";


export default function Experience() {
  
  const pieces = useSelector((state) => state.game.pieces);
  const numTiles = 29;
  const cameraControlsRef = useRef();

  const tileRefs = [...Array(numTiles)];
  for (let i = 0; i < numTiles; i++) {
    tileRefs[i] = useRef();
  }

  function Tiles() {
    const numStars = 20;
    let tiles = [];
    const radius = 3;

    //circle
    for (let i = 0; i < numStars; i++) {
      let position = [
        - Math.cos(((i - 10) * (Math.PI * 2)) / numStars) * radius-1,
        0.5,
        Math.sin(((i - 10) * (Math.PI * 2)) / numStars) * radius+0.5,
      ];
      if (i == 0) {
        tiles.push(<Earth position={position} tile={i}/>);
      } else if (i == 5) {
        tiles.push(<Mars position={position} tile={i}/>);
      } else if (i == 10) {
        tiles.push(<Saturn position={position} tile={i}/>);
      } else if (i == 15) {
        tiles.push(<Neptune position={position} tile={i}/>)
      } else {
        tiles.push(<Star position={position} tile={i} />);
      }
    }

    //shortcuts
    const radiusShortcut1 = 1.8;
    const radiusShortcut2 = 0.8;
    for (let i = 0; i < numStars; i++) {
      let indexShortcut1;
      let indexShortcut2;
      if (i == 0) {
        indexShortcut1 = 28;
        indexShortcut2 = 27;
      } else if (i == 5) {
        indexShortcut1 = 20;
        indexShortcut2 = 21;
      } else if (i == 10) {
        indexShortcut1 = 24;
        indexShortcut2 = 25;
      } else if (i == 15) {
        indexShortcut1 = 23;
        indexShortcut2 = 22;
      }
      if (i == 0 || i == 5 || i == 10 || i == 15) {
        tiles.push(
          <Star
            position={[
              Math.sin(((i + 5) * (Math.PI * 2)) / numStars) * radiusShortcut1-1,
              0.5,
              Math.cos(((i + 5) * (Math.PI * 2)) / numStars) * radiusShortcut1+0.5,
            ]}
            scale={0.1}
            tile={indexShortcut1}
          />
        );
        tiles.push(
          <Star
            position={[
              Math.sin(((i + 5) * (Math.PI * 2)) / numStars) * radiusShortcut2-1,
              0.5,
              Math.cos(((i + 5) * (Math.PI * 2)) / numStars) * radiusShortcut2+0.5,
            ]}
            scale={0.1}
            tile={indexShortcut2}
          />
        );
      }
    }
    return tiles;
  }

  function PiecesTeam0() {
    //deleting brackets around function after '=>' made the meshes appear
    return <>{pieces[0].map((value, index) => 
      value.tile === -1 && 
      <Ufo
        position={[3.5, 0, -0.3 + index * 0.4]}
        keyName={ `count${index}`}
        tile={-1}
        team={0}
      />
    )}</>
  }

  function PiecesTeam1() {
    return <>{pieces[1].map((value, index) => 
      value.tile === -1 && 
      <Rocket
        position={[2.5, 0, -3 + index * 0.4]}
        keyName={ `count${index}`}
        tile={-1}
        team={1}
      />
        
    )}</>
  }

  return (
    <>
      <color args={["#313557"]} attach="background" />

      <directionalLight position={[1, 10, 3]} intensity={1.3} castShadow />
      <ambientLight intensity={0.5} />

      <CameraControls ref={cameraControlsRef}/>

      <Physics maxVelocityIterations={10}>
        <RigidBody
          type="fixed"
          restitution={0.01}
          position={[0, -0.5, 0]}
          friction={0.9}
        >
          <CuboidCollider
            args={[3.5, 0.5, 3.5]}
            restitution={0.2}
            friction={1}
          />
        </RigidBody>
        <Yuts />
        <Tiles />
        <PiecesTeam0/>
        <PiecesTeam1/>
      </Physics>
    </>
  );
}
