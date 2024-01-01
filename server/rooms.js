const rooms = {}
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
// combine 'yoots' info by looking through players and spectators

// add room
export const addRoom = ({ id }) => {

  // make sure every room id is random on generation

  try {
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
      spectators: []
    }

    rooms[id] = room
    return { room }
  } catch (error) {
    return { room: null, error }
  }
}

export const addSpectatorToRoom = ({ id, name, room }) => {
  console.log("[addUserToRoom]", room)

  try {

    let users = rooms[room].teams[0].players.concat(rooms[room].teams[1].players.concat(rooms[room].spectators))
    const existingUser = users.find((user) => user.name === name)
  
    if (existingUser) {
      throw 'Username is taken'
    }
  
    const spectator = { id, name, room };
    rooms[room].spectators.push(spectator)
  
    return { spectator }

  } catch (error) {
    return { error }
  }
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

export const getRoom = ({ id }) => rooms[id]

export const getUserFromRoom = ({ id, room }) => {
  console.log("[getUsersFromRoom]", id, room)
  let users = rooms[room].teams[0].players.concat(rooms[room].teams[1].players.concat(rooms[room].spectators))
  const userFound = users.find((user) => user.id === id)

  if (!userFound) {
    return { 
      response: {
        status: 'error', 
        message: 'user not found'
      }
    }
  } else {
    return { 
      response: {
        status: 'ok', 
      },
      user: userFound 
    }
  }
}

// remove room
// get room
