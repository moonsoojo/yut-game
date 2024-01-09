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
    gamePhase: 'lobby',
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

export const updateHostId = (roomId, hostId) => {
  rooms[roomId].hostId = hostId
  return rooms[roomId]
}

export const updateReadyToStart = (roomId, state) => {
  rooms[roomId].readyToStart = state
  return rooms[roomId]
}