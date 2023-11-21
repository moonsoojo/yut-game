import TextButton from "../components/TextButton.jsx";
import layout from "../../../layout.js";
import React, { useState } from 'react';
import { Text3D, Html } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAtom } from "jotai";
import { socket, teamsAtom } from "../SocketManager";

export default function LandingPage({ device="mobile" }) {

  const [displayName, setDisplayName] = useState('')
  const [alert, setAlert] = useState('');
  const [teams] = useAtom(teamsAtom);

  let position=[
    layout[device].center[0]-3,
    layout[device].center[1],
    layout[device].center[2]-1,
  ]

  function submitName() {
    if (displayName.length == 0) {
      setAlert('Enter something')
    } else if (displayName.length > 15) {
      setAlert('Must be shorter than 16 characters.')
    } else if (!validateName(displayName)) {
      setAlert('Name is already taken.')
    } else {
      setAlert("let's go!")
      socket.emit("submitName", {displayName})
    }
  }

  function validateName(name) {
    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams[i].players.length; j++) {
        if (teams[i].players[j].displayName === name) {
          return false;
        }
      }
    }
    return true;
  }

  return <>
    <group position={position}>
      <Text3D
        font="./fonts/Luckiest Guy_Regular.json"
        size={1} 
        height={0.01}
        rotation={layout[device].textRotation}
      >{"YUT GAME"}
        <meshStandardMaterial color='yellow' />
      </Text3D>
      <Text3D
        font="./fonts/Luckiest Guy_Regular.json"
        position={[0,0,1]}
        size={0.5} 
        height={0.01}
        rotation={layout[device].textRotation}
      >{'name'}
        <meshStandardMaterial color='yellow' />
      </Text3D>
      <Html position={[0,0,1.5]} style={{ color: 'white' }}>
        <input 
          id='input-name'
          style={{ 
            height: '20px',
            borderRadius: '5px',
            padding: '5px',
            border: 0
          }} 
          onChange={e => setDisplayName(e.target.value)} 
          placeholder="Enter your name..."
        />
        <div
          style={{ 
            height: '20px',
            width: '53px',
            backgroundColor: 'yellow',
            marginTop: '5px',
            borderRadius: '5px',
            color: 'black',
            padding: '5px',
            fontFamily: 'Arial'
          }}
          onClick={submitName}
        >Submit</div>
        <div style={{ marginTop: '5px', fontFamily: 'Arial' }}>{alert}</div>
      </Html>
    </group>
  </>
}