import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { clientAtom, socket } from './SocketManager';
import { useAtom } from 'jotai';
import { disconnectAtom, joinTeamAtom } from './GlobalState';
import layout from './layout';

export default function JoinTeamModal({ device }) {

  const [name, setName] = useState('')
  const [alert, setAlert] = useState('')
  const [submitHover, setSubmitHover] = useState(false)
  const [cancelHover, setCancelHover] = useState(false)
  const [joinTeam, setJoinTeam] = useAtom(joinTeamAtom)

  function handleJoinSubmit(e) {
    e.preventDefault();
    if (name.length == 0) {
      setAlert('Enter something')
    } else if (name.length > 15) {
      setAlert('Must be shorter than 16 characters.')
    } else {
      setAlert("")
      socket.emit("joinTeam", { team: joinTeam, name }, ({ player }) => {
        if (player) {
          // localStorage.setItem('yootGame', JSON.stringify({
          //   ...player
          // }))
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

  return joinTeam !== null && <group 
    position={layout[device].joinTeamModal.position}
    rotation={layout[device].joinTeamModal.rotation}
    scale={layout[device].joinTeamModal.scale}
  >
    <Html 
      transform
    >
      <div style={{
        position: 'absolute'
      }}>
        <form
          onSubmit={e => handleJoinSubmit(e)}>
          <div style={{
            top: '40%',
            width: '136px',
            backgroundColor: 'black',
            border: '2px solid yellow',
            padding: '10px'
          }}>
            <p style={{
              fontFamily: 'Luckiest Guy',
              color: 'yellow',
              fontSize: '15px',
              padding: '5px',
              margin: '0px'
            }}>Enter your name</p>
            <input
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'Luckiest Guy',
                fontSize: `15px`,
                color: 'yellow',
                padding: '5px',
                width: `122px`,
                border: '2px solid yellow'
              }}
              onChange={e => setName(e.target.value)}
              placeholder="here..."/>
            <div>
              <p style={{ margin: '5px', color: 'red', fontFamily: 'Luckiest Guy', fontSize: '10px' }}>
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
                  fontSize: `15px`,
                  background: 'none',
                  border: '2px solid yellow',
                  margin: '5px',
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
                  fontSize: `15px`,
                  background: 'none',
                  border: '2px solid red',
                  margin: '5px',
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
      </div>
    </Html>
  </group>
}