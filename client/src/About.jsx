import React from 'react';
import HtmlElement from './HtmlElement';
import Board from './Board';
import Rocket from './meshes/Rocket';
import Ufo from './meshes/Ufo';
import YootMesh from './meshes/YootMesh';
import { Float, Text3D } from '@react-three/drei';

import initialState from '../initialState';
import layout from './layout';

export default function About(props) {
  function Rockets(props) {
    return <group {...props}>
      <group name='rocket-0'>
        <Rocket position={[-1,0,-0.7]} scale={2}/>
      </group>
      <group name='rocket-1'>
        <Rocket position={[0.5,0,-0.7]} scale={2}/>
      </group>
      <group name='rocket-2'>
        <Rocket position={[-1,0,0.7]} scale={2}/>
      </group>
      <group name='rocket-3'>
        <Rocket position={[0.5,0,0.7]} scale={2} />
      </group>
    </group>
  }
  function Ufos(props) {
    return <group {...props}>
      <group name='ufo-0'>
        <Ufo position={[-0.6,0,-0.7]} scale={2}/>
      </group>
      <group name='ufo-1'>
        <Ufo position={[0.8,0,-0.7]} scale={2}/>
      </group>
      <group name='ufo-2'>
        <Ufo position={[-0.6,0,0.7]} scale={2}/>
      </group>
      <group name='ufo-3'>
        <Ufo position={[0.8,0,0.7]} scale={2} />
      </group>
    </group>
  }
  function Yoots(props) {
    return <group {...props}>
      <YootMesh scale={0.5} position={[0,0,0]}/>
      <YootMesh scale={0.5} position={[0,0,-1]}/>
      <YootMesh scale={0.5} position={[0,0,-2]}/>
      <YootMesh scale={0.5} position={[0,0,-3]}/>
    </group>
  }

  return <group {...props}>
    <Text3D 
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[props.device].about.mainDescription.line0Position}
        size={layout[props.device].about.mainDescription.size}
        height={0.01}
    >
      Yoot Nori (game) is a game played
      <meshStandardMaterial color='yellow'/>
    </Text3D>
    <Text3D 
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[props.device].about.mainDescription.line1Position}
        size={layout[props.device].about.mainDescription.size}
        height={0.01}
    >
      during the holidays in Korea.
      <meshStandardMaterial color='yellow'/>
    </Text3D>
    <group>
      <Text3D 
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[props.device].about.board.text.position}
        size={layout[props.device].about.board.text.size}
        height={0.01}
      >
        board
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <Float rotationIntensity={0.001} speed={1} floatingRange={[0.01, 0.01]}>
        <Board 
        device={props.device} 
        position={layout[props.device].about.board.position} 
        rotation={layout[props.device].about.board.rotation} 
        scale={layout[props.device].about.board.scale} 
        interactive={false} 
        showStart={true}/>
      </Float>
      <Text3D 
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[props.device].about.pieces.position}
          size={layout[props.device].about.pieces.size}
          height={0.01}
      >
        pieces
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <Float rotationIntensity={0.001} speed={3} floatingRange={[0.01, 0.01]}>
        <Rockets position={layout[props.device].about.pieces.rockets.position} rotation={[Math.PI/4, 0, 0]}/>
      </Float>
      <Float rotationIntensity={0.001} speed={3} floatingRange={[0.01, 0.01]}>
        <Ufos position={layout[props.device].about.pieces.ufos.position} rotation={[Math.PI/4, 0, 0]}/>
      </Float>
      <Text3D 
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[props.device].about.yoot.text.position}
        size={layout[props.device].about.yoot.text.size}
        height={0.01}
      >
        Yoot (dice)
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <Float rotationIntensity={0.001} speed={1} floatingRange={[0.01, 0.01]}>
        <Yoots position={layout[props.device].about.yoot.position} rotation={[0, Math.PI/2, 0]} scale={0.7}/>
      </Float>

      <Text3D 
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[props.device].about.playersText.position}
          size={layout[props.device].about.playersText.size}
          height={0.01}
      >
        {`players:\n2 or more\nage: everyone`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>

      {/* <Text3D 
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[props.device].about.ageText.position}
          size={layout[props.device].about.ageText.size}
          height={0.01}
      >
        age: everyone
        <meshStandardMaterial color='yellow'/>
      </Text3D> */}
    </group>
  </group>
}