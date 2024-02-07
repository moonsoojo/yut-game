import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { socket } from './SocketManager';
import { useParams } from "wouter";
import { disconnectAtom } from './SocketManager';
import { useAtom } from 'jotai';

export default function JoinTeamModal({ position, rotation, scale, team, setJoinTeam }) {

  const [name, setName] = useState('')
  const [alert, setAlert] = useState('')
  const [submitHover, setSubmitHover] = useState(false)
  const [cancelHover, setCancelHover] = useState(false)
  const [_disconnect, setDisconnect] = useAtom(disconnectAtom)
  const params = useParams();

  function handleJoinSubmit(e) {
    e.preventDefault();
    if (name.length == 0) {
      setAlert('Enter something')
    } else if (name.length > 15) {
      setAlert('Must be shorter than 16 characters.')
    } else {
      setAlert("")
      socket.emit("joinTeam", { team, name }, ({ error, player }) => {
        if (error) {
          console.log("[JoinTeamModal] error", error)
          setDisconnect(true)
        } else if (player) {
          localStorage.setItem('yootGame', JSON.stringify({
            ...player
          }))
          setName('')
          setJoinTeam(null);
        }
      });
    }
  }
  
  function handleJoinCancel(e) { // submits name and emits 'joinTeam'
    e.preventDefault()
    setName('')
    setJoinTeam(null);
    return false;
  }

  function handleSubmitMouseEnter () {
    setSubmitHover(true)
  }
  function handleSubmitMouseLeave () {
    setSubmitHover(false)
  }
  function handleCancelMouseEnter () {
    setCancelHover(true)
  }
  function handleCancelMouseLeave () {
    setCancelHover(false)
  }

  return <group position={position}>
    <Html 
      transform
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <form
        onSubmit={e => handleJoinSubmit(e)}>
        <div style={{
          top: '40%',
          width: '240px',
          backgroundColor: 'black',
          border: '2px solid yellow',
          padding: '20px'
        }}>
          <p style={{
            fontFamily: 'Luckiest Guy',
            color: 'yellow',
            fontSize: '25px',
            padding: '10px',
            margin: '0px'
          }}>Enter your name</p>
          <input
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'Luckiest Guy',
              fontSize: `20px`,
              color: 'yellow',
              padding: '10px',
              width: `210px`,
              border: '2px solid yellow'
            }}
            onChange={e => setName(e.target.value)}
            placeholder="here..."/>
          <div>
            <p style={{ margin: '5px', color: 'red', fontFamily: 'Luckiest Guy' }}>
              {alert}
            </p>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <button 
              id='join-team-submit-button'
              style={{
                fontFamily: 'Luckiest Guy',
                fontSize: `20px`,
                background: 'none',
                border: '2px solid yellow',
                margin: '10px',
                padding: '5px',
                color: `${submitHover ? 'white' : 'yellow'}`,
                position: 'relative'}}
              onMouseOver={handleSubmitMouseEnter}
              onMouseOut={handleSubmitMouseLeave}
              type="submit">
            LEGGO!
            </button>
            {/* highlight on hover */}
            <button 
              id='join-team-cancel-button'
              style={{
                fontFamily: 'Luckiest Guy',
                fontSize: `20px`,
                background: 'none',
                border: '2px solid red',
                margin: '10px',
                padding: '5px',
                color: `${cancelHover ? 'white' : 'red'}`,}}
              onMouseOver={handleCancelMouseEnter}
              onMouseOut={handleCancelMouseLeave}
              onMouseDown={e => handleJoinCancel(e)}
              // need this to stop form from submitting
              type="button">
            NAH
            </button>
          </div>
        </div>
      </form>
    </Html>
  </group>
}