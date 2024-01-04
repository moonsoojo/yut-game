import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { socket } from './SocketManager';
import { useParams } from "wouter";

export default function JoinTeamModal({ position, team, setJoinTeam }) {

  const [name, setName] = useState('')
  const [submitHover, setSubmitHover] = useState(false)
  const [cancelHover, setCancelHover] = useState(false)
  const params = useParams();
  
  function handleJoinSubmit(e) {
    e.preventDefault();
    console.log("handleJoinSubmit");
    socket.emit("joinTeam", { team, name, room: params.id }, ({ response, player }) => {
      console.log("join team callback")
      if (response === 'ok') {
        localStorage.setItem('yootGame', JSON.stringify({
          ...player
        }))
        setName('')
        setJoinTeam(null);
      }
    });
  }
  function handleJoinCancel(e) { // submits name and emits 'joinTeam'
    e.preventDefault()
    console.log("[handleJoinCancel]")
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
    <Html>
      <form
        onSubmit={e => handleJoinSubmit(e)}>
        <div style={{
          top: '40%',
          width: '240px',
          height: '150px',
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