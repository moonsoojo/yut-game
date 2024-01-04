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
  rooms[player.room].teams[player.team].players.push(player)
}

export const removeUserFromRoom = ({ id, room }) => {

  const user = getUserFromRoom({ id, room })
  console.log('[removeUserFromRoom] user', user)
  const team = user.team

  // spectator
  if (!team) {
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
  console.log("[getRoom] rooms", rooms)
  console.log("[getRoom] id", id)
  return rooms[id]
}

export const getUserFromRoom = ({ id, room }) => {
  let users = rooms[room].teams[0].players.concat(rooms[room].teams[1].players.concat(rooms[room].spectators))
  console.log("[getUserFromRoom] users", users)
  const user = users.find((user) => user.id === id)

  return user
}

export const countPlayers = (roomId) => {
  const room = getRoom(roomId);
  const count = room.teams[0].players.length + room.teams[1].players.length
  return count
}