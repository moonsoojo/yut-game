const rooms = {}
/*
** schema **
// gamePhase
// teams
  // index
  // players (list)
    // id
    // name (player assigned)
    // room
    // team
  // moves
  // throws
  // pieces
// spectators (list)
  // id
  // name
  // room
// id
// tiles
// turn
// legalTiles
// selection
// yoot states
*/

// add room
export const addRoom = ({ id }) => {

  if (id in rooms) {
    return { error: 'room exists' }
  }

  // make sure every room id is random on generation
  const room = {
    id,
    teams: [
      {
        index: 0,
        players: [],
        moves: {
          "1": 0,
          "2": 0,
          "3": 0,
          "4": 0,
          "5": 0,
          "-1": 0,
          "0": 0
        },
        throws: 0,
        pieces: [
          { tile: -1, team: 0, id: 0, path: [] }, // null, {values} or "scored"
          { tile: -1, team: 0, id: 1, path: [] },
          { tile: -1, team: 0, id: 2, path: [] },
          { tile: -1, team: 0, id: 3, path: [] },
        ],
      },
      {
        index: 0,
        players: [],
        moves: {
          "1": 0,
          "2": 0,
          "3": 0,
          "4": 0,
          "5": 0,
          "-1": 0,
          "0": 0
        },
        throws: 0,
        pieces: [
          { tile: -1, team: 0, id: 0, path: [] }, // null, {values} or "scored"
          { tile: -1, team: 0, id: 1, path: [] },
          { tile: -1, team: 0, id: 2, path: [] },
          { tile: -1, team: 0, id: 3, path: [] },
        ],
      }
    ],
    turn: {
      team: 0,
      players: [0, 0]
    },
    tiles: [
      [], // { [ { team: int, id: int, tile: int, history: int[] } ] }
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ],
    spectators: [],
    selection: null,
    hostId: null,
    clients: {},
    readyToStart: false,
    gamePhase: 'lobby',
    messages: []
    // waitingToPass
  }

  rooms[id] = room
  return { room }
}

export const addSpectator = ({ id, name, room }) => {
  
    const spectator = { id, name, room };
    rooms[room].spectators.push(spectator)
  
    return { spectator }

}

export const getSpectatorFromRoom = ({ id, room }) => {
  return rooms[room].spectators.find((spectator) => spectator.id === id)
}

export const addPlayer = ({ player }) => {
  rooms[player.room].teams[player.team].players.push(player)
  return player
}

export const removeUserFromRoom = ({ id, room }) => {

  if (!(room in rooms)) {
    return { error: 'room not found' }
  }

  const user = getUserFromRoom({ id, room })
  const team = user.team

  if (id in rooms[room].clients) {
    delete rooms[room].clients[id]
    console.log("[removeUserFromRoom] clients", rooms[room].clients)
  }

  // spectator
  if (team !== 0 && team !== 1) {
    const index = rooms[room].spectators.findIndex((spectator) => spectator.id === id);

    if (index !== -1) {
      return rooms[room].spectators.splice(index, 1)[0]
    }
  } else { // player
    const index = rooms[room].teams[team].players.findIndex(
      (player) => player.id === id
    );
    if (index !== -1) {
      return rooms[room].teams[team].players.splice(index, 1)[0]
    }
  }
}

export const getRoom = ( id ) => {
  return rooms[id]
}

export const getUserFromRoom = ({ id, room }) => {
  let users = rooms[room].teams[0].players.concat(rooms[room].teams[1].players.concat(rooms[room].spectators))
  const user = users.find((user) => user.id === id)

  return user
}

export const countPlayers = (roomId) => {
  const room = getRoom(roomId);
  return room.teams[0].players.length + room.teams[1].players.length
}

export const deleteRoom = (roomId) => {
  delete rooms[roomId]
}

export const addThrow = (roomId, team) => {
  rooms[roomId].teams[team].throws++
}

export const addClient = (roomId, client) => {
  rooms[roomId].clients[client.id] = client
  console.log("[addClient] clients", rooms[roomId].clients)
  console.log("[addClient] rooms[roomId]", rooms[roomId])
}

export const getHostId = (roomId) => {
  return rooms[roomId].hostId
}

export const updateHostId = (roomId, hostId) => {
  rooms[roomId].hostId = hostId
  return rooms[roomId]
}

export const isReadyToStart = (roomId) => {
  const room = rooms[roomId]
  if (room.gamePhase === 'lobby' && 
  room.teams[0].players.length > 0 &&
  room.teams[1].players.length > 0 &&
  isAllYootsAsleep(roomId)) {
    return true
  } else {
    return false;
  }
}

export const updateReadyToStart = (roomId, state) => {
  rooms[roomId].readyToStart = state
  return rooms[roomId]
}

export const getGamePhase = (roomId) => {
  return rooms[roomId].gamePhase
}

export const updateGamePhase = (roomId, gamePhase) => {
  rooms[roomId].gamePhase = gamePhase
}

export const getClients = (roomId) => {
  return rooms[roomId].clients
}

export const updateClients = (roomId, clients) => {
  rooms[roomId].clients = clients
}

export const isAllYootsAsleep = (roomId) => {
  for (const id of Object.keys(rooms[roomId].clients)) {
    if (rooms[roomId].clients[id].yootsAsleep === false) {
      return false;
    }
  }
  return true;
}

export const updateYootsAsleep = (roomId, clientId, state) => {
  rooms[roomId].clients[clientId].yootsAsleep = state
  return rooms[roomId].clients
}

export const getTurn = (roomId) => {
  return rooms[roomId].turn
}

export const getCurrentPlayerId = (roomId) => {
  let turn = rooms[roomId].turn
  let currentPlayer = turn.players[turn.team]
  return rooms[roomId].teams[turn.team].players[currentPlayer]
}

export const getThrown = (roomId, clientId) => {
  return rooms[roomId].clients[clientId].thrown
}

export const updateThrown = (roomId, clientId, state) => {
  rooms[roomId].clients[clientId].thrown = state
}