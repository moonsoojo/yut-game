import React from 'react';
import { useState } from 'react';
import { auth, db } from './firebase'
import { useNavigate } from 'react-router-dom'
import { collection, setDoc, doc } from 'firebase/firestore'

export default function Home() {
  const { currentUser } = auth
  const navigate = useNavigate()

  async function handlePlayOnline() {
    // starting piece
    const member = {
      uid: currentUser.uid,
      // piece
      name: localStorage.getItem('userName'),
      // creator: true // host
    }
    const game = {
      status: 'lobby',
      members: [member],
      gameId: `${Math.random().toString(36).substring(2, 9)}_${Date.now()}`
    }
    
    // db.collection('games').doc(game.gameId).set(game)
    await setDoc(doc(db, 'games', game.gameId), game)
    navigate(`/game/${game.gameId}`)
  }

  return (
    <>
      <div id='home'>
        <div id="home-section-local" className="home-section" >
          <button id="play-local-button" className="button">
            Play locally
          </button>
        </div>
        <div id="home-section-online" className="home-section">
          <button 
            id="play-online-button" 
            className="button" 
            onClick={handlePlayOnline}>
            Play online
          </button>
        </div>
      </div>
    </>

  )
}