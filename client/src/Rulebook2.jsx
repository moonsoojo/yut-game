import React from "react";
import TextButton from "./components/TextButton";
import { useState, useRef } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGraph, useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import { Html, useGLTF, Text3D } from "@react-three/drei";
import Yut from "./meshes/Yut";
import YutRhino from "./meshes/YutRhino";
import Rocket from "./meshes/Rocket";
import Cursor from "./meshes/Cursor";
import Earth from "./meshes/Earth";
import Star from "./meshes/Star";
import CurvedArrow from "./meshes/CurvedArrow";
import Dot from "./meshes/Dot";
import Arrow from "./meshes/Arrow";
import Ufo from "./meshes/Ufo";
import Mars from "./meshes/Mars";
import Check from "./meshes/Check";
import Cancel from "./meshes/Cancel";

export default function Rulebook2 ({position, handleShow}) {

  // useStates
  const [page, setPage] = useState(0);

  function handleNextPage() {
    setPage(page+1)
  }

  function handleBackPage() {
    setPage(page-1)
  }

  function handleTop() {
    setPage(0)
  }

  let arrowsPerTurn = 10;
  let turns = 4;
  let numArrows = arrowsPerTurn * turns
  let TILE_RADIUS = 4
  function GuideArrows() {
    let arrows = [];

    // circle
    for (let i = 0; i < numArrows; i++) {
      let position = [
        -Math.cos(((i+10) * (Math.PI * 2)) / numArrows) * TILE_RADIUS,
        0,
        Math.sin(((i+10) * (Math.PI * 2)) / numArrows) * TILE_RADIUS,
      ];
      if (i % (arrowsPerTurn) == 8) {
        arrows.push(<Arrow position={position} rotation={[0, (2 * Math.PI / numArrows) * i, -Math.PI/2]}/>);
      } else if (i % (arrowsPerTurn) != 0 && i % (arrowsPerTurn) != 1 && i % (arrowsPerTurn) != 9) {
        arrows.push(<Dot position={position} rotation={[0, (2 * Math.PI / numArrows) * i, 0]}/>);
      }
    }

    // shortcut 1
    arrows.push(<Dot position={[-2.2,0,0]} rotation={[0, 0, 0]}/>);
    arrows.push(<Dot position={[-1.7,0,0]} rotation={[0, 0, 0]}/>);
    arrows.push(<Dot position={[-1.2,0,0]} rotation={[0, 0, 0]}/>);
    arrows.push(<Dot position={[-0.7,0,0]} rotation={[0, 0, 0]}/>);
    arrows.push(<Dot position={[-0.2,0,0]} rotation={[0, 0, 0]}/>);
    arrows.push(<Dot position={[0.3,0,0]} rotation={[0, 0, 0]}/>);
    arrows.push(<Dot position={[0.8,0,0]} rotation={[0, 0, 0]}/>);
    arrows.push(<Dot position={[1.3,0,0]} rotation={[0, 0, 0]}/>);
    arrows.push(<Dot position={[1.8,0,0]} rotation={[0, 0, 0]}/>);
    arrows.push(<Dot position={[2.3,0,0]} rotation={[0, 0, 0]}/>);
    arrows.push(<Dot position={[2.8,0,0]} rotation={[0, 0, 0]}/>);
    arrows.push(<Arrow position={[-3,0,0]} rotation={[0, 0, Math.PI/2]}/>);
    // shortcut 2
    arrows.push(<Dot position={[0,0,-3]} rotation={[0, Math.PI/2, 0]}/>);
    arrows.push(<Dot position={[0,0,-2.5]} rotation={[0, Math.PI/2, 0]}/>);
    arrows.push(<Dot position={[0,0,-2]} rotation={[0, Math.PI/2, 0]}/>);
    arrows.push(<Dot position={[0,0,-1.5]} rotation={[0, Math.PI/2, 0]}/>);
    arrows.push(<Dot position={[0,0,-1]} rotation={[0, Math.PI/2, 0]}/>);
    arrows.push(<Dot position={[0,0,-0.5]} rotation={[0, Math.PI/2, 0]}/>);
    arrows.push(<Dot position={[0,0,0]} rotation={[0, Math.PI/2, 0]}/>);
    arrows.push(<Dot position={[0,0,0.5]} rotation={[0, Math.PI/2, 0]}/>);
    arrows.push(<Dot position={[0,0,1]} rotation={[0, Math.PI/2, 0]}/>);
    arrows.push(<Dot position={[0,0,1.5]} rotation={[0, Math.PI/2, 0]}/>);
    arrows.push(<Dot position={[0,0,2]} rotation={[0, Math.PI/2, 0]}/>);
    arrows.push(<Dot position={[0,0,2.5]} rotation={[0, Math.PI/2, 0]}/>);
    arrows.push(<Arrow position={[0,0,3]} rotation={[0, Math.PI/2, Math.PI/2]}/>);

    return arrows;
  }

  function NavBar() {
    return (
      <group>
        { page != 0 && <TextButton
          text="<<"
          position={[-1,0,2.7]}
          boxWidth={0.6}
          boxHeight={0.5}
          boxPosition={[0.2, 0, 0.3]}
          handlePointerClick={handleBackPage}
        />}
        <TextButton
          text="X"
          position={[7,0,-0.3]}
          boxWidth={0.5}
          boxHeight={0.5}
          boxPosition={[0.11, 0, 0.3]}
          handlePointerClick={handleShow}
        />
        { page != 11 ? <TextButton
          text=">>"
          position={[6.9,0,2.7]}
          boxWidth={0.6}
          boxHeight={0.5}
          boxPosition={[0.2, 0, 0.3]}
          handlePointerClick={handleNextPage}
        /> : <TextButton
          text="TOP"
          position={[6.5,0,2.7]}
          boxWidth={0.8}
          boxHeight={0.5}
          handlePointerClick={handleTop}
        /> }
      </group>
    )
  }

  const throwButtonRef = useRef(null);
  const clickHereTextMatRef = useRef(null);
  useFrame((state) => {
    if (throwButtonRef.current != null) {
      throwButtonRef.current.opacity = Math.sin(state.clock.elapsedTime * 4) * 0.2 + 0.3
      clickHereTextMatRef.current.opacity = Math.sin(state.clock.elapsedTime * 4) * 0.4 + 0.6
      
    }
  })

  function Page({page}) {
    if (page == 0) {
      return (
        <group>
          <TextButton
            text="MAKE TWO TEAMS OF ONE OR MORE"
            position={[-1,0,0.1]}
          />
          <TextButton
            text="PLAYERS. THE MORE, THE BETTER!"
            position={[-1,0,0.5]}
          />
          <group key="page-0-image-0">
            <TextButton
              text="ROCKETS"
              position={[-1,0,1.3]}
              color="red"
            />
            <TextButton
              text="JOIN"
              position={[1.5,0.3,1.45]}
              size={0.4}
              color="yellow"
            />
            <mesh position={[2.1, 0.2, 1.2]}> 
              <boxGeometry args={[1.5, 0.01, 0.7]}/>
              <meshStandardMaterial transparent opacity={0.3} color={'grey'}/>
            </mesh>
            <Cursor position={[2.4, 1, 2.2]} scale={1.5}/>
            <Rocket 
              position={[-0.7, 1, 2]}
              scale={0.7}
            />
            <Rocket 
              position={[-0.2, 1, 2]}
              scale={0.7}
            />
            <Rocket 
              position={[0.3, 1, 2]}
              scale={0.7}
            />
            <Rocket 
              position={[0.8, 1, 2]}
              scale={0.7}
            />
          </group>
          <group key="page-0-image-1">
            <mesh position={[5.1,0.1,1.2]}>
              <boxGeometry args={[3.5, 0.01, 0.7]}/>
              <meshStandardMaterial color='yellow'/>
            </mesh>
            <mesh position={[5.1,0.1,1.2]}>
              <boxGeometry args={[3.3, 0.02, 0.6]}/>
              <meshStandardMaterial color='black'/>
            </mesh>
            <TextButton
              text="LUCKYPUPPY"
              position={[3.55,0.3,1.45]}
              size={0.35}
              color="yellow"
            />
            <TextButton
              text="YOUR NAME"
              position={[5.4,0.3,1.9]}
              size={0.2}
              color="yellow"
            />
            <Check position={[3.4, 0, 1.55]} scale={0.18}/>
            <Cursor position={[4.1, 1, 2.7]} scale={1.5}/>
            <Cancel position={[4.25, 0, 1.9]} scale={0.18}/>
          </group>
          <NavBar/>
        </group>
      )
    } else if (page == 1) {
      return (
        <group>
          <TextButton
            text="THE BOARD CONSISTS OF A"
            position={[-1,0,0.5]}
          />
          <TextButton
            text="CIRCULAR PATH, AND TWO"
            position={[-1,0,1]}
          />
          <TextButton
            text="STRAIGHT PATHS THAT CROSS WITHIN."
            position={[-1,0,1.5]}
          />
          <NavBar/>
          {/* indicators on the game interface */}
          <mesh position={[3, 1, 8.5]}>
            <cylinderGeometry args={[4.8, 4.8, 0.01, 32]}/>
            <meshStandardMaterial transparent opacity={0.5} color={'black'}/>
          </mesh>
          <group position={[3, 1.1, 8.5]}>
            <GuideArrows/>
          </group>
          
        </group>
      )
    } else if (page == 2) {
      return <group>
        <TextButton
          text="TEAM MEMBERS TAKE TURNS THROWING"
          position={[-1,0,0.1]}
        />
        <TextButton
          text="THE YOOT STICKS. THE WAY THEY LAND"
          position={[-1,0,0.5]}
        />
        <TextButton
          text="DETERMINE HOW TO MOVE THE TOKENS."
          position={[-1,0,0.9]}
        />
        <TextButton
          text="THROW!"
          position={[0.4,0,2]}
        />
        <mesh position={[1.15, 0.1, 1.9]}> 
          <boxGeometry args={[1.9, 0.01, 1]}/>
          <meshStandardMaterial transparent opacity={0.3} ref={throwButtonRef} color={'yellow'}/>
        </mesh>
        <Cursor position={[2.5, 1, 2.8]} scale={1.5}/>
        <TextButton
          text="THE BUTTON WILL"
          position={[2.9,0,1.5]}
        />
        <TextButton
          text="SHINE ON YOUR TURN."
          position={[2.9,0,1.9]}
        />
        {/* <TextButton
          text="CLICK HERE >>"
          position={[1.6,0,17]}
        /> */}
        <group position={[1.6,0,17]} rotation={[-Math.PI / 2, 0, 0, "XZY"]}>
          {/* must use absolute path - string starts with a slash */}
          <Text3D font="/fonts/Luckiest Guy_Regular.json" size={0.3} height={0.01}> 
            CLICK HERE &gt;&gt; <meshStandardMaterial transparent ref={clickHereTextMatRef} color='yellow' />
          </Text3D>
        </group>
        <NavBar/>
      </group>
    } else if (page == 3) {
      return <group>
        {/* do */}
        <group position={[-0.8,0,-0.1]}>
          <Yut 
            position={[0,0.1,1]} // must be raised object is raised from the center in blender
            rotation={[Math.PI/2,Math.PI/2,0]}
            scale={0.15}
          />
          <Yut 
            position={[0.3,0,1]} 
            rotation={[0, Math.PI/2, -Math.PI / 2]}
            scale={0.15}
          />
          <Yut 
            position={[0.6,0,1]} 
            rotation={[0, Math.PI/2, -Math.PI / 2]}
            scale={0.15}
          />
          <Yut 
            position={[0.9,0,1]} 
            rotation={[0, Math.PI/2, -Math.PI / 2]}
            scale={0.15}
          />
          <TextButton
            text="1-STEP"
            position={[-0.1,0,2.2]}
          />
        </group>
        {/* ge */}
        <group position={[1.2,0,-0.1]}>
          <Yut 
            position={[0,0.1,1]} // must be raised object is raised from the center in blender
            rotation={[Math.PI/2,Math.PI/2,0]}
            scale={0.15}
          />
          <Yut 
            position={[0.3,0.1,1]} // must be raised object is raised from the center in blender
            rotation={[Math.PI/2,Math.PI/2,0]}
            scale={0.15}
          />
          <Yut 
          position={[0.6,0,1]} 
          rotation={[0, Math.PI/2, -Math.PI / 2]}
          scale={0.15}/>
          <Yut 
          position={[0.9,0,1]} 
          rotation={[0, Math.PI/2, -Math.PI / 2]}
          scale={0.15}/>
          <TextButton
            text="2-STEPS"
            position={[-0.2,0,2.2]}
          />
        </group>
        {/* gul */}
        <group position={[3.2,0,-0.1]}>
          <Yut 
            position={[0,0.1,1]} // must be raised object is raised from the center in blender
            rotation={[Math.PI/2,Math.PI/2,0]}
            scale={0.15}
          />
          <Yut 
            position={[0.3,0.1,1]} // must be raised object is raised from the center in blender
            rotation={[Math.PI/2,Math.PI/2,0]}
            scale={0.15}
          />
          <Yut 
            position={[0.6,0.1,1]} // must be raised object is raised from the center in blender
            rotation={[Math.PI/2,Math.PI/2,0]}
            scale={0.15}
          />
          <Yut 
          position={[0.9,0,1]} 
          rotation={[0, Math.PI/2, -Math.PI / 2]}
          scale={0.15}/>
          <TextButton
            text="3-STEPS"
            position={[-0.2,0,2.2]}
          />
        </group>
        {/* back-do */}
        <group position={[5.2,0,-0.1]}>
          <YutRhino 
            position={[0,0.1,1]} // must be raised object is raised from the center in blender
            rotation={[Math.PI/2,Math.PI/2,0]}
            scale={0.15}
          />
          <Yut 
            position={[0.3,0,1]} 
            rotation={[0, Math.PI/2, -Math.PI / 2]}
            scale={0.15}
          />
          <Yut 
            position={[0.6,0,1]} 
            rotation={[0, Math.PI/2, -Math.PI / 2]}
            scale={0.15}
          />
          <Yut 
            position={[0.9,0,1]} 
            rotation={[0, Math.PI/2, -Math.PI / 2]}
            scale={0.15}
          />
          <TextButton
            text="BACK-STEP"
            position={[-0.2,0,2.2]}
          />
        </group>
        <NavBar/>
      </group>
    } else if (page == 4) {
      return <group>
        <TextButton
          text="FOR 4 OR 5-STEPS, YOU GET A BONUS TURN."
          position={[-1,0,0.1]}
        />
        {/* yoot */}
        <group position={[0,0,0.3]}>
          <Yut 
            position={[0,0.1,1]}
            rotation={[Math.PI/2,Math.PI/2,0]}
            scale={0.15}
          />
          <Yut 
            position={[0.3,0.1,1]} 
            rotation={[Math.PI/2,Math.PI/2,0]}
            scale={0.15}
          />
          <Yut 
            position={[0.6,0.1,1]} 
            rotation={[Math.PI/2,Math.PI/2,0]}
            scale={0.15}
          />
          <YutRhino 
            position={[0.9,0.1,1]} 
            rotation={[Math.PI/2,Math.PI/2,0]}
            scale={0.15}
          />
          <TextButton
            text="4-STEPS +"
            position={[1.2,0,0.5]}
          />
          <TextButton
            text="BONUS"
            position={[1.2,0,1]}
          />
          <TextButton
            text="TURN"
            position={[1.2,0,1.5]}
          />
        </group>
        {/* mo! */}
        <group position={[3.5,0,0.3]}>
          <Yut 
            position={[0.0,0,1]} 
            rotation={[0, Math.PI/2, -Math.PI / 2]}
            scale={0.15}
          />
          <Yut 
            position={[0.3,0,1]} 
            rotation={[0, Math.PI/2, -Math.PI / 2]}
            scale={0.15}
          />
          <Yut 
            position={[0.6,0,1]} 
            rotation={[0, Math.PI/2, -Math.PI / 2]}
            scale={0.15}
          />
          <YutRhino 
            position={[0.9,0,1]} 
            rotation={[0, Math.PI/2, -Math.PI / 2]}
            scale={0.15}
          />
          <TextButton
            text="5-STEPS +"
            position={[1.2,0,0.5]}
          />
          <TextButton
            text="BONUS"
            position={[1.2,0,1]}
          />
          <TextButton
            text="TURN"
            position={[1.2,0,1.5]}
          />
        </group>
        <NavBar/>
      </group>
    } else if (page == 5) {
      return <group>
         <TextButton
          text="TOKENS START FROM EARTH. FOR EXAMPLE, "
          position={[-1,0,0.1]}
        />
        <TextButton
          text="WITH 2-STEPS, THEY ARE MOVED LIKE THIS."
          position={[-1,0,0.5]}
        />
        
        <group>
          <Rocket 
            position={[-0.1, 1, 1.3]}
            scale={0.7}
          />
          <mesh position={[-0.1, 1, 1.6]}>
            <sphereGeometry args={[0.35, 32, 16]}/>
            <meshStandardMaterial transparent opacity={0.5} color="grey"/>
          </mesh>
          <Rocket 
            position={[0.5, 1, 1.3]}
            scale={0.7}
          />
          <mesh position={[0.5, 1, 1.6]}>
            <sphereGeometry args={[0.35, 32, 16]}/>
            <meshStandardMaterial transparent opacity={0.5} color="grey"/>
          </mesh>
          <Rocket 
            position={[-0.1, 1, 1.8]}
            scale={0.7}
          />
          <mesh position={[-0.1, 1, 2.2]}>
            <sphereGeometry args={[0.35, 32, 16]}/>
            <meshStandardMaterial transparent opacity={0.5} color="grey"/>
          </mesh>
          <Rocket 
            position={[0.5, 1, 1.8]}
            scale={0.7}
          />
          <mesh position={[0.5, 1, 2.2]}>
            <sphereGeometry args={[0.35, 32, 16]}/>
            <meshStandardMaterial transparent opacity={0.5} color="grey"/>
          </mesh>
          <TextButton
            text="MOVES: 2"
            size={0.25}
            position={[-0.4,0,2.4]}
          />
          <Cursor position={[1.2, 1, 2.3]} scale={1.5}/>
        </group>
        <group>
          <Earth position={[2.2, 1, 2.5]} scale={0.2}/>
          <Star position={[3.1, 1, 2.3]} scale={0.2}/>
          <Star position={[3.9, 1, 2.0]} scale={0.2}/>
          <CurvedArrow position={[2.7,1,2.05]} scale={0.15} rotation={[0, Math.PI * (3/2), 0]}/>
          <TextButton
            text="1"
            position={[2.6, 1, 1.8]}
          />
          <CurvedArrow position={[3.4,1,1.9]} scale={0.15} rotation={[0, Math.PI * (13/8), 0]}/>
          <TextButton
            text="2"
            position={[3.35, 1, 1.6]}
          />
          <mesh position={[3.9, 1, 2.0]}>
            <sphereGeometry args={[0.5, 32, 16]}/>
            <meshStandardMaterial transparent opacity={0.3} color="red"/>
          </mesh>
          <mesh position={[3.9, 2, 2.0]} rotation={[Math.PI/2, 0, 0]}>
            <coneGeometry args={[0.1, 0.2, 3]}/>
            <meshStandardMaterial color="red"/>
          </mesh>
          <Cursor position={[4.5, 1.3, 2.4]} scale={1.5}/>
        </group>
        <group>
          <Earth position={[5.3, 1, 2.5]} scale={0.2}/>
          <Star position={[6.1, 1, 2.3]} scale={0.2}/>
          <Star position={[6.8, 1, 2.0]} scale={0.2}/>
          <Rocket 
            position={[6.8, 1, 1.3]}
            scale={0.7}
          />
        </group>
        <NavBar/>
      </group>
    } else if (page == 6) {
      return <group key='page-6'>
          <TextButton
            text="IF THE OPPONENT LANDS ON THE SAME SPOT,"
            position={[-1,0,0.1]}
          />
          <TextButton
            text="THE TOKEN IS TAKEN OFF THE BOARD, AND "
            position={[-1,0,0.5]}
          />
          <TextButton
            text="THEY GET ANOTHER TURN."
            position={[-1,0,0.9]}
          />
        <group key='page-6-image-0'>
          <Ufo position={[0, 1, 2.1]} scale={0.7} />
          <Earth position={[0.5, 1, 2.7]} scale={0.2}/>
          <Star position={[1.5, 1, 2.7]} scale={0.2}/>
          <Star position={[2.4, 1, 2.6]} scale={0.2}/>
          <mesh position={[2.4, 1, 2.6]}>
            <sphereGeometry args={[0.5, 32, 16]}/>
            <meshStandardMaterial transparent opacity={0.3} color="turquoise"/>
          </mesh>
          <mesh position={[2.4, 2, 2.3]} rotation={[Math.PI/2, 0, 0]}>
            <coneGeometry args={[0.1, 0.2, 3]}/>
            <meshStandardMaterial color="turquoise"/>
          </mesh>
          <Rocket position={[2.4, 1, 1.8]} scale={0.7}/>
          <CurvedArrow position={[1,1,2.3]} scale={0.15} rotation={[0, Math.PI * (3/2), 0]}/>
          <TextButton
            text="1"
            position={[0.9, 1, 2]}
          />
          <CurvedArrow position={[1.8,1,2.3]} scale={0.15} rotation={[0, Math.PI * (13/8), 0]}/>
          <TextButton
            text="2"
            position={[1.8, 1, 2]}
          />
        </group>
        <group key='page-6-image-1'>
          <Earth position={[4, 1, 2.7]} scale={0.2}/>
          <Star position={[4.9, 1, 2.7]} scale={0.2}/>
          <Star position={[5.7, 1, 2.5]} scale={0.2}/>
          <Ufo position={[5.7, 1, 2]} scale={0.7}/>
          <Rocket position={[6.3, 1, 2.8]} rotation={[0, -Math.PI * (5/8), 0]} scale={0.5}/>
          <CurvedArrow position={[6.2,1,2.5]} scale={0.15} rotation={[0, Math.PI * (5/4), 0]}/>
          <TextButton
            text="+ BONUS"
            size={0.2}
            position={[6.1, 1, 1.8]}
          />
          <TextButton
            text="TURN"
            size={0.2}
            position={[6.3, 1, 2.1]}
          />
        </group>
        <NavBar/>
      </group>
    } else if (page == 7) {
      return <group key='page-7'>
        <TextButton
          text="IF THEY LAND ON A SPACE WITH THEIR OWN"
          position={[-1,0,0.1]}
        />
        <TextButton
          text="TEAM..."
          position={[-1,0,0.5]}
        />
        <group key='page-7-image-0'>
          <Ufo position={[0, 1, 2.1]} scale={0.7} />
          <Earth position={[0.5, 1, 2.7]} scale={0.2}/>
          <Star position={[1.5, 1, 2.7]} scale={0.2}/>
          <Star position={[2.4, 1, 2.3]} scale={0.2}/>
          <mesh position={[2.4, 1, 2.3]}>
            <sphereGeometry args={[0.5, 32, 16]}/>
            <meshStandardMaterial transparent opacity={0.3} color="turquoise"/>
          </mesh>
          <mesh position={[2.4, 2, 1.8]} rotation={[Math.PI/2, 0, 0]}>
            <coneGeometry args={[0.1, 0.2, 3]}/>
            <meshStandardMaterial color="turquoise"/>
          </mesh>
          <Ufo 
            position={[2.4, 1, 1.7]}
            scale={0.7}
          />
          <CurvedArrow position={[1,1,2.2]} scale={0.15} rotation={[0, Math.PI * (3/2), 0]}/>
          <TextButton
            text="1"
            position={[0.9, 1, 1.9]}
          />
          <CurvedArrow position={[1.8,1,2.1]} scale={0.15} rotation={[0, Math.PI * (13/8), 0]}/>
          <TextButton
            text="2"
            position={[1.7, 1, 1.8]}
          />
        </group>
        <group key='page-7-image-1'>
          <Earth position={[4.2, 1, 2.7]} scale={0.2}/>
          <Star position={[5.1, 1, 2.7]} scale={0.2}/>
          <Star position={[5.9, 1, 2.3]} scale={0.2}/>
          <Ufo position={[5.7, 1, 1.9]} scale={0.7}/>
          <Ufo position={[6.1, 1, 1.9]} scale={0.7}/>
        </group>
        <NavBar/>
      </group>
    } else if (page == 8) {
      return <group key='page-8'>
        <TextButton
          text="THEY WILL MOVE AROUND THE BOARD AS A"
          position={[-1,0,0.1]}
        />
        <TextButton
          text="GROUP."
          position={[-1,0,0.5]}
        />
        <group key="page-8-image-0">
          <Ufo position={[0.1, 1, 2.3]} scale={0.7} />
          <Ufo position={[0.5, 1, 2.3]} scale={0.7} />
          <Star position={[0.3, 1, 2.7]} scale={0.2}/>
          <TextButton text="1" position={[0.7, 1, 1.9]}/>
          <CurvedArrow position={[0.8,1,2.2]} scale={0.15} rotation={[0, Math.PI * (3/2), 0]}/>
          <Star position={[1.23, 1, 2.51]} scale={0.2}/>
          <TextButton text="2" position={[1.5, 1, 1.9]}/>
          <CurvedArrow position={[1.6,1,2.2]} scale={0.15} rotation={[0, Math.PI * (13/8), 0]}/>
          <Star position={[2.09, 1, 2.25]} scale={0.2}/>
          <TextButton text="3" position={[2.25, 1, 1.7]}/>
          <CurvedArrow position={[2.4,1,1.9]} scale={0.15} rotation={[0, Math.PI * (13/8), 0]}/>
          <Ufo position={[2.9, 1.5, 1.6]} scale={0.7} />
          <Ufo position={[3.3, 1.5, 1.6]} scale={0.7} />
          <Mars position={[3.1, 1, 2]} scale={0.3}/>
        </group>
        <group key="page-8-image-1">
          <TextButton 
            text="(and come home" 
            size={0.25}
            position={[4.2, 1, 1.3]}
          />
          <TextButton 
            text="faster to win)" 
            size={0.25}
            position={[4.2, 1, 1.7]}
          />
          {/* <TextButton 
            text="the game." 
            size={0.25}
            position={[4.5, 1, 2.1]}
          /> */}
          <Earth position={[5.4, 1, 2.5]} scale={0.3}/>
          {/* <CurvedArrow position={[5.7,1,2.1]} scale={0.15} rotation={[0, Math.PI * (12/8), 0]}/>
          <TextButton 
            text="SCORE" 
            size={0.25}
            position={[6, 1, 2.4]}
          /> */}
        </group>
        <NavBar/>
      </group>
    } else if (page == 9) {
      return <group key='page-9'>
        <TextButton
          text="HOWEVER, IF THE OPPONENT LANDS ON YOUR"
          position={[-1,0,0.1]}
        />
        <TextButton
          text="GROUP, BOTH TOKENS WILL VE REMOVED!"
          position={[-1,0,0.5]}
        />
        <group key="page-9-image-0">
          <Rocket position={[0.2, 1, 2]} scale={0.7}/>
          <Star position={[0.2, 1, 2.81]} scale={0.2}/>
          <CurvedArrow position={[0.95,1,1.7]} scale={0.25} rotation={[0, Math.PI * (13/8), 0]}/>
          <Star position={[1, 1, 2.6]} scale={0.2}/>
          <Ufo position={[1.8, 1.5, 2]} scale={0.7} />
          <Ufo position={[2.2, 1.5, 2]} scale={0.7} />
          <Mars position={[2, 1, 2.3]} scale={0.3}/>
        </group>
        <group key="page-9-image-1">
          <Rocket position={[5.5, 1.9, 2]} scale={0.7}/>
          <Star position={[3.8, 1, 2.81]} scale={0.2}/>
          <Star position={[4.6, 1, 2.6]} scale={0.2}/>
          <Ufo position={[6.4, 1.5, 2.2]} scale={0.4} rotation={[0, Math.PI/4, 0]}/>
          <Ufo position={[6.6, 1.5, 2.4]} scale={0.2} rotation={[0, -Math.PI/8, 0]}/>
          <Mars position={[5.5, 1, 2.3]} scale={0.3}/>
        </group>
        <NavBar/>
      </group>
    } else if (page == 10) {
      return <group key='page-10'>
        <TextButton
          text="IF YOU LAND ON A PLANET, YOU HAVE A"
          position={[-1,0,0.1]}
        />
        <TextButton
          text="CHANCE TO MOVE TO A SHORTER PATH"
          position={[-1,0,0.5]}
        />
        <TextButton
          text="TOWARD HOME ON YOUR NEXT TURN."
          position={[-1,0,0.9]}
        />
        <mesh position={[3, 1, 10.65]}>
          <boxGeometry args={[1, 0.01, 2.2]}/>
          <meshStandardMaterial transparent opacity={0.7} color={'black'}/>
        </mesh>
        <mesh position={[0.9, 1, 8.6]}>
          <boxGeometry args={[2.2, 0.01, 1]}/>
          <meshStandardMaterial transparent opacity={0.7} color={'black'}/>
        </mesh>
        <mesh position={[5.1, 1, 8.6]}>
          <boxGeometry args={[2.2, 0.01, 1]}/>
          <meshStandardMaterial transparent opacity={0.7} color={'black'}/>
        </mesh>
        <mesh position={[3, 1, 6.5]}>
          <boxGeometry args={[1, 0.01, 2.2]}/>
          <meshStandardMaterial transparent opacity={0.7} color={'black'}/>
        </mesh>
        <mesh position={[5.8, 1, 5.8]}>
          <boxGeometry args={[4, 0.01, 4]}/>
          <meshStandardMaterial transparent opacity={0.7} color={'black'}/>
        </mesh>
        <mesh position={[0.2, 1, 5.8]}>
          <boxGeometry args={[4, 0.01, 4]}/>
          <meshStandardMaterial transparent opacity={0.7} color={'black'}/>
        </mesh>
        <mesh position={[0.2, 1, 11.3]}>
          <boxGeometry args={[4, 0.01, 3.8]}/>
          <meshStandardMaterial transparent opacity={0.7} color={'black'}/>
        </mesh>
        <mesh position={[5.8, 1, 11.3]}>
          <boxGeometry args={[4, 0.01, 3.8]}/>
          <meshStandardMaterial transparent opacity={0.7} color={'black'}/>
        </mesh>
        <mesh position={[5.7, 2, 9]} rotation={[Math.PI/2, 0, Math.PI/2]}>
          <coneGeometry args={[0.25, 0.7, 4]}/>
          <meshStandardMaterial color="lightblue"/>
        </mesh>
        <mesh position={[3, 2, 6.5]} rotation={[Math.PI/2, 0, 0]}>
          <coneGeometry args={[0.25, 0.7, 4]}/>
          <meshStandardMaterial color="lightblue"/>
        </mesh>
        <mesh receiveShadow={false} position={[3, 2, 11]} rotation={[Math.PI/2, 0, 0]}>
          <coneGeometry args={[0.25, 0.7, 4]}/>
          <meshStandardMaterial color="lightblue"/>
        </mesh>
        <NavBar/>
      </group>
    } else if (page == 11) {
      return <group key='page-11'>
        <TextButton
          text="THE TEAM TO HAVE ALL OF THEIR TOKENS"
          position={[-1,0,0.1]}
        />
        <TextButton
          text="PASS EARTH FIRST WINS THE GAME."
          position={[-1,0,0.5]}
        />
        <group key='page-11-image-0'>
          <Rocket position={[-0.4, 1, 1.5]} scale={0.7}/>
          <Star position={[-0.4, 1, 2.2]} scale={0.2}/>
          <Star position={[0.4, 1, 2.6]} scale={0.2}/>
          <Earth position={[1.5, 1, 2.6]} scale={0.3}/>
          <CurvedArrow position={[0.1,1,2.1]} scale={0.15} rotation={[0, Math.PI * (11/8), 0]}/>
          <TextButton text="1" position={[0.2, 1, 1.9]}/>
          <CurvedArrow position={[0.7,1,2.3]} scale={0.15} rotation={[0, Math.PI * (12/8), 0]}/>
          <TextButton text="2" position={[0.8, 1, 2.1]}/>
          <CurvedArrow position={[2.3,1,2]} scale={0.25} rotation={[0, Math.PI * (12/8), 0]}/>
          <TextButton text="3" position={[2.1, 1, 1.7]}/>
          <TextButton text="SCORE" size={0.5} position={[2.6, 1, 3]}/>
          <mesh position={[3.57, 1, 2.75]}>
            <boxGeometry args={[2.2, 0.1, 0.8]}/>
            <meshStandardMaterial transparent opacity={0.2} color={'white'}/>
          </mesh>
          <mesh position={[3.3, 2, 2.6]} rotation={[Math.PI/2, 0, 0]}>
            <coneGeometry args={[0.1, 0.3, 4]}/>
            <meshStandardMaterial color="red"/>
          </mesh>
          <Cursor position={[5.1, 1, 3]} scale={1.5}/>
          <TextButton text="BUTTON WILL APPEAR" size={0.25} position={[3.8, 1, 1.5]}/>
          <TextButton text="WHEN YOU HAVE" size={0.25} position={[3.8, 1, 1.8]}/>
          <TextButton text="ENOUGH STEPS." size={0.25} position={[3.8, 1, 2.1]}/>
        </group>
        <NavBar/>
        <mesh position={[3, -1.5, 13.8]}>
          <cylinderGeometry args={[1.5, 1.5, 0.01, 32]}/>
          <meshStandardMaterial transparent opacity={0.5} color={'yellow'}/>
        </mesh>
        <TextButton text="BUTTON WILL" size={0.25} position={[1.8, -1.5, 15.8]}/>
        <TextButton text="APPEAR HERE." size={0.25} position={[1.8, -1.5, 16.1]}/>
      </group>
    }
  }

  // const htmlRef = useRef(null);
  // console.log(htmlRef.current)

  return <group position={position}>
    {/* background */}
    <mesh>
      <boxGeometry args={[9, 0.01, 3.8]}/>
      <meshStandardMaterial color="black"/>
    </mesh>
    <mesh>
      <boxGeometry args={[9.2, 0.009, 4]}/>
      <meshStandardMaterial color="yellow"/>
    </mesh>
    {/* content */}
    <group position={[-3, 0, -1]}>
      <TextButton
        text="HOW TO PLAY:"
        position={[-1,0,-0.3]}
      />
      <Page page={page}/>
    </group>
  </group>
}