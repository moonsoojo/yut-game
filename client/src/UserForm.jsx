import React, { useState, useEffect } from 'react';
import { auth } from './firebase'
import { signInAnonymously } from 'firebase/auth';
import { Text3D, Html } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { nameAtom, teamsAtom, socket } from './SocketManager';
import { useAtom } from 'jotai';
import layout from '../../layout';
import { useNavigate } from 'react-router-dom'

export default function UserForm() {
  const [name, setName] = useState('')
  const [alert, setAlert] = useState('')
  const [teams] = useAtom(teamsAtom)
  const navigate = useNavigate()

  useEffect(() => {
    let player = localStorage.getItem('clientPlayer')
    console.log("player", player)
    if (player != null) {
      socket.emit("localStoragePlayer", ({ player: JSON.parse(player) }), (response) => {
        if (response.status === "success") {
          localStorage.setItem('clientPlayer', JSON.stringify(response.player))
        }
      })
      // navigate(`/game/${game.gameId}`)
      navigate(`/game`)
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (name.length == 0) {
      setAlert('Enter something')
    } else if (name.length > 15) {
      setAlert('Must be shorter than 16 characters.')
    } else if (!validateName(name)) {
      setAlert('Name is already taken.')
    } else {
      setAlert("let's go!")
      socket.emit("submitName", { name }, (response) => {
        if (response.status === "success") {
          localStorage.setItem('clientPlayer', JSON.stringify(response.clientPlayer))
        }
      })
      navigate(`/game`)
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

  return (
    <form 
      className="user-form" 
      onSubmit={handleSubmit}>
      <h1 style={{ fontFamily: 'Luckiest Guy', color: 'yellow', fontSize: '70px' }}>YOOT GAME</h1>
      <h1 style={{ fontFamily: 'Luckiest Guy'}}>Enter your name</h1>
      <input 
        id='input-name'
        style={{ 
          height: '20px',
          borderRadius: '5px',
          padding: '5px',
          border: 0,
          fontFamily: 'Luckiest Guy'
        }} 
        onChange={e => setName(e.target.value)} 
        placeholder="Enter your name..."
      />
      <button
        style={{ 
          height: '50px',
          width: '60px',
          backgroundColor: 'yellow',
          marginTop: '5px',
          borderRadius: '5px',
          color: 'black',
          padding: '5px',
          fontFamily: 'Luckiest Guy'
        }}
        type="submit"
      >Submit</button>
      <div style={{ marginTop: '5px', fontFamily: 'Arial' }}>{alert}</div>
    </form>  
  )
}