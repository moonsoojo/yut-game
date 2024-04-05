// App.js

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [roomName, setRoomName] = useState('');
  const [players, setPlayers] = useState('');
  const [gameState, setGameState] = useState('');

  const handleCreateRoom = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/rooms', {
        roomName,
        players: players.split(','),
        gameState,
      });
      console.log('Room created:', response.data);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <div>
      <h1>Create Room</h1>
      <label>
        Room Name:
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </label>
      <label>
        Players (comma separated):
        <input
          type="text"
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
        />
      </label>
      <label>
        Game State:
        <textarea
          value={gameState}
          onChange={(e) => setGameState(e.target.value)}
        />
      </label>
      <button onClick={handleCreateRoom}>Create Room</button>
    </div>
  );
}

export default App;
