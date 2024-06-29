import React from 'react';
import HtmlElement from './HtmlElement';
import Board from './Board';
import Rocket from './meshes/Rocket';
import Ufo from './meshes/Ufo';
import Yoot from './meshes/Yoot';
import { Float, Text3D } from '@react-three/drei';

import initialState from '../initialState';

export default function About(props) {
  function Rockets(props) {
    return <group {...props}>
      <group name='rocket-0'>
        <Rocket position={[-0.4,0,-0.7]} scale={1.5}/>
      </group>
      <group name='rocket-1'>
        <Rocket position={[0.8,0,-0.7]} scale={1.5}/>
      </group>
      <group name='rocket-2'>
        <Rocket position={[-0.4,0,0.5]} scale={1.5}/>
      </group>
      <group name='rocket-3'>
        <Rocket position={[0.8,0,0.5]} scale={1.5} />
      </group>
    </group>
  }
  function Ufos(props) {
    return <group {...props}>
      <group name='ufo-0'>
        <Ufo position={[-0.4,0,-0.7]} scale={1.5}/>
      </group>
      <group name='ufo-1'>
        <Ufo position={[0.8,0,-0.7]} scale={1.5}/>
      </group>
      <group name='ufo-2'>
        <Ufo position={[-0.4,0,0.5]} scale={1.5}/>
      </group>
      <group name='ufo-3'>
        <Ufo position={[0.8,0,0.5]} scale={1.5} />
      </group>
    </group>
  }
  function Yoots(props) {
    return <group {...props}>
      <Yoot scale={0.5} position={[0,0,0]}/>
      <Yoot scale={0.5} position={[0,0,-1]}/>
      <Yoot scale={0.5} position={[0,0,-2]}/>
      <Yoot scale={0.5} position={[0,0,-3]}/>
    </group>
  }

  return <group {...props}>
    <Text3D 
        font="fonts/Luckiest Guy_Regular.json"
        position={[0,-0.5,0]}
        size={0.4}
        height={0.01}
    >
      Yoot Nori is a game played during
      <meshStandardMaterial color='yellow'/>
    </Text3D>
    <Text3D 
        font="fonts/Luckiest Guy_Regular.json"
        position={[0,-1.1,0]}
        size={0.4}
        height={0.01}
    >
      the holidays in Korea.
      <meshStandardMaterial color='yellow'/>
    </Text3D>
    <group>
      <Text3D 
          font="fonts/Luckiest Guy_Regular.json"
          position={[-1,-4,-1]}
          size={0.4}
          height={0.01}
      >
        board
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <Float floatIntensity={0.001} speed={1} floatingRange={[0.01, 0.01]}>
        <Board device={props.device} rotation={[Math.PI/2, 0, 0]} scale={0.5} position={[5, -5, 0]} interactive={false} showStart={false}/>
      </Float>
      
      <Text3D 
          font="fonts/Luckiest Guy_Regular.json"
          position={[-1,-10,-1]}
          size={0.4}
          height={0.01}
      >
        pieces
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <Float floatIntensity={0.001} speed={1} floatingRange={[0.01, 0.01]}>
        <Rockets position={[3, -10, 0]} rotation={[Math.PI/4, 0, 0]}/>
      </Float>
      <Float floatIntensity={0.001} speed={1} floatingRange={[0.01, 0.01]}>
        <Ufos position={[7, -10.5, 0]} rotation={[Math.PI/4, 0, 0]}/>
      </Float>


      <Text3D 
        font="fonts/Luckiest Guy_Regular.json"
        position={[10,-3,-1]}
        size={0.4}
        height={0.01}
      >
        Yoot (dice)
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <Float floatIntensity={0.001} speed={1} floatingRange={[0.01, 0.01]}>
        <Yoots position={[13, -6, -2]} rotation={[0, Math.PI/2, 0]} scale={0.7}/>
      </Float>

      <Text3D 
          font="fonts/Luckiest Guy_Regular.json"
          position={[10,-10,-1]}
          size={0.4}
          height={0.01}
      >
        players: 2 or more
        <meshStandardMaterial color='yellow'/>
      </Text3D>

      <Text3D 
          font="fonts/Luckiest Guy_Regular.json"
          position={[10,-11,-1]}
          size={0.4}
          height={0.01}
      >
        age: everyone
        <meshStandardMaterial color='yellow'/>
      </Text3D>
    </group>
  </group>
}