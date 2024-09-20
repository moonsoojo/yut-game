import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { socket } from './SocketManager';
import { useAtom } from 'jotai';
import { joinTeamAtom } from './GlobalState';

export default function JoinTeamModal({ position, rotation, scale }) {

  const [name, setName] = useState('')
  const [alert, setAlert] = useState('')
  const [submitHover, setSubmitHover] = useState(false)
  const [cancelHover, setCancelHover] = useState(false)
  const [joinTeam, setJoinTeam] = useAtom(joinTeamAtom)
  
  function isAlphaNumeric(str) {
    var code, i, len;
  
    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (!(code > 47 && code < 58) && // numeric (0-9)
          !(code > 64 && code < 91) && // upper alpha (A-Z)
          !(code > 96 && code < 123)) { // lower alpha (a-z)
        return false;
      }
    }
    return true;
  };

  function handleJoinSubmit(e) {
    e.preventDefault();
    if (name.length == 0) {
      setAlert('Enter something')
    } else if (name.length > 15) {
      setAlert('Must be shorter than 16 characters.')
    } else if (!isAlphaNumeric(name)) { // prevent user from imitating host by adding '(host)'
      setAlert('Can only contain letters and numbers.')
    } else {
      setAlert("")
      socket.emit("joinTeam", { team: joinTeam, name }, ({ player }) => {
        if (player) { // refactor into mongodb stream
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
    setAlert('');
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
    position={position}
    rotation={rotation}
    scale={scale}
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
            width: '155px',
            backgroundColor: 'black',
            border: '2px solid #F1EE92',
            padding: '10px'
          }}>
            <p style={{
              fontFamily: 'Luckiest Guy',
              color: '#F1EE92',
              fontSize: '15px',
              padding: '5px',
              margin: '0px',
              textAlign: 'center'
            }}>
              Join the {joinTeam === 0 ? <span style={{ color: '#FF5030' }}>rockets</span> : <span style={{ color: 'turquoise' }}>ufos</span>} as
            </p>
            <input
              style={{
                width: `142px`,
                background: 'none',
                border: 'none',
                fontFamily: 'Luckiest Guy',
                fontSize: `15px`,
                color: '#F1EE92',
                padding: '5px',
                border: '2px solid #F1EE92'
              }}
              onChange={e => setName(e.target.value)}
              placeholder="name..."/>
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
                  border: `2px solid ${submitHover ? 'white' : '#F1EE92'}`,
                  margin: '5px',
                  padding: '5px',
                  color: `${submitHover ? 'white' : '#F1EE92'}`,
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
                  border: `2px solid ${cancelHover ? 'white' : 'red'}`,
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