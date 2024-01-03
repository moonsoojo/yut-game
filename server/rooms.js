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
*/

// add room
export const addRoom = ({ id }) => {

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
    spectators: []
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
  try {
    rooms[player.room].teams[player.team].players.push(player)
    return { addedPlayer: player }
  } catch (error) {
    return { error }
  }
}

export const removeUserFromRoom = ({ id, room }) => {

  const { getUserFromRoomResponse } = getUserFromRoom({ id, room })
  if (getUserFromRoomResponse.status === 'error') {
    return {
      removeUserFromRoomResponse: {
        status: 'error',
        message: getUserFromRoomResponse.message
      }
    }
  }
  const userFromRoom = getUserFromRoomResponse.user
  const team = userFromRoom.team

  // spectator
  if (!team) {
    try {
      const index = rooms[room].spectators.findIndex(
        (spectator) => spectator.id === id
      );
  
      if (index !== -1) {
        return {
          removeUserFromRoomResponse: {
            status: 'ok',
            user: rooms[room].spectators.splice(index, 1)[0]
          }
        }
      }
    } catch (error) {
      return { 
        removeUserFromRoomResponse: {
          status: 'error',
          message: error
        }
      }
    }
  } else { // player
    try {
      const index = rooms[room].teams[team].players.findIndex(
        (player) => player.id === id
      );
      if (index !== -1) {
        return {
          removeUserFromRoomResponse: {
            status: 'ok',
            user: rooms[room].teams[team].players.splice(index, 1)[0]
          }
        }
      }
    } catch (error) {
      return { 
        removeUserFromRoomResponse: {
          status: 'error',
          message: error
        }
      }
    }
  }
}

export const getRoom = ({ id }) => rooms[id]

export const getUserFromRoom = ({ id, room }) => {
  let users = rooms[room].teams[0].players.concat(rooms[room].teams[1].players.concat(rooms[room].spectators))
  const userFound = users.find((user) => user.id === id)

  if (!userFound) {
    return { 
      getUserFromRoomResponse: {
        status: 'error', 
        message: 'user not found'
      }
    }
  } else {
    return { 
      getUserFromRoomResponse: {
        status: 'ok', 
        user: userFound 
      },
    }
  }
}

// remove room
// get room
