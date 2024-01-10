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
    readyToThrow: false,
    legalTiles: {},
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

export const removeUserFromRoom = ({ id, roomId }) => {

  if (!(roomId in rooms)) {
    return { error: 'room not found' }
  }

  const user = getUserFromRoom({ id, roomId })
  const team = user.team

  if (id in rooms[roomId].clients) {
    delete rooms[roomId].clients[id]
    console.log("[removeUserFromRoom] clients", rooms[roomId].clients)
  }

  // spectator
  if (team !== 0 && team !== 1) {
    const index = rooms[roomId].spectators.findIndex((spectator) => spectator.id === id);

    if (index !== -1) {
      return rooms[roomId].spectators.splice(index, 1)[0]
    }
  } else { // player
    const index = rooms[roomId].teams[team].players.findIndex(
      (player) => player.id === id
    );
    if (index !== -1) {
      return rooms[roomId].teams[team].players.splice(index, 1)[0]
    }
  }
}

export const getRoom = ( id ) => {
  if (!(id in rooms)) {
    return { error: 'room not found' }
  } else {
    return { room: rooms[id] }
  }
}

export const getUserFromRoom = ({ id, roomId }) => {
  let users = rooms[roomId].teams[0].players.concat(rooms[roomId].teams[1].players.concat(rooms[roomId].spectators))
  const user = users.find((user) => user.id === id)

  return user
}

export const countPlayers = (roomId) => {
  const { room, error } = getRoom(roomId);
  if (!error) {
    return room.teams[0].players.length + room.teams[1].players.length
  }
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

export const getClient = (roomId, clientId) => {
  return rooms[roomId].clients[clientId]
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

export const getYootsAsleep = (roomId, id) => {
  if (roomId in rooms) {
    return rooms[roomId].clients[id].yootsAsleep
  }
}

export const isAllYootsAsleep = (roomId) => {
  // what if no client is visible?
  for (const id of Object.keys(rooms[roomId].clients)) {
    if (rooms[roomId].clients[id].visibility && 
      rooms[roomId].clients[id].yootsAsleep === false) {
        return false;
    }
  }
  return true;
}

export const updateYootsAsleep = (roomId, clientId, state) => {
  let room = getRoom(roomId)
  if (room.error === "room not found") {
    return { error: room.error }
  }
  rooms[roomId].clients[clientId].yootsAsleep = state
  return {}
}

export const getTurn = (roomId) => {
  return rooms[roomId].turn
}

export const updateTurn = (roomId, turn) => {
  rooms[roomId].turn = turn
  return rooms[roomId].turn
}

function allTeamsHaveMove (teams) {
  let allTeamsHaveMove = true;
  for (let i = 0; i < teams.length; i++) {
    let hasMove = false;
    for (let move in teams[i].moves) {
      if (teams[i].moves[move] > 0) {
        hasMove = true;
        break;
      }
    }
    if (!hasMove) {
      allTeamsHaveMove = false;
      break;
    }
  }
  return allTeamsHaveMove
}

export const passTurn = (roomId) => {
  console.log("[passTurn] roomId", roomId)
  let turn = rooms[roomId].turn
  let teams = rooms[roomId].teams
  if (turn.team == teams.length - 1) {
    turn.team = 0
  } else {
    turn.team++
  }

  if (turn.players[turn.team] == teams[turn.team].players.length - 1) {
    turn.players[turn.team] = 0
  } else {
    turn.players[turn.team]++
  }

  return updateTurn(roomId, turn)
}

function calcFirstTeamToThrow(teams) {
  let topThrow = -2;
  let topThrowTeam = -1;
  let tie = false;
  for (let i = 0; i < teams.length; i++) {
    for (let move in teams[i].moves) {
      if (teams[i].moves[move] > 0) {
        if (parseInt(move) > topThrow) {
          topThrow = parseInt(move)
          topThrowTeam = i
        } else if (parseInt(move) == topThrow) {
          tie = true;
        }
        break;
      }
    }
  }
  if (tie) {
    return -1
  } else {
    return topThrowTeam
  }
}

export const passTurnPregame = (roomId) => {
  const room = rooms[roomId]
  let turn = room.turn
  let teams = room.teams
  if (allTeamsHaveMove(teams)) {
    let firstTeamToThrow = calcFirstTeamToThrow(teams)
    if (firstTeamToThrow == -1) {
      passTurn(roomId)
    } else {
      // turn has been decided
      updateTurn(roomId, { team: firstTeamToThrow, players: [0,0] })
      updateGamePhase(roomId, "game")
    }
    // clear moves in teams
    for (let i = 0; i < teams.length; i++) {
      clearMoves(roomId, i)
    }
  } else {
    passTurn(roomId)
  }
  return { turn: rooms[roomId].turn, teams: rooms[roomId].teams, gamePhase: rooms[roomId].gamePhase }
}

export const getCurrentPlayerId = (roomId) => {
  let turn = rooms[roomId].turn
  console.log("[getCurrentPlayerId] turn", turn)
  let currentPlayer = turn.players[turn.team]
  console.log("[getCurrentPlayerId] currentPlayer", currentPlayer)
  return rooms[roomId].teams[turn.team].players[currentPlayer].id
}

export const getThrown = (roomId, clientId) => {
  return rooms[roomId].clients[clientId].thrown
}

export const updateThrown = (roomId, clientId, state) => {
  rooms[roomId].clients[clientId].thrown = state
}

export const getTeams = (roomId) => {
  return rooms[roomId].teams
}

export const updateTeams = (roomId, teams) => {
  if (roomId in rooms) {
    rooms[roomId].teams = teams
    return rooms[roomId].teams
  }
}

export const updateVisibility = (roomId, clientId, state) => {
  if (roomId in rooms) {
    rooms[roomId].clients[clientId].visibility = state
    return { client: rooms[roomId].clients[clientId] }
  } else {
    return { error: 'room not found' }
  }
}

export const updateReadyToThrow = (roomId, state) => {
  if (roomId in rooms) {
    rooms[roomId].readyToThrow = state
  }
}

export const addMove = (roomId, team, move) => {
  if (roomId in rooms) {
    rooms[roomId].teams[team].moves[move]++
  }
}

export const movesIsEmpty = (roomId, team) => {
  const moves = rooms[roomId].teams[team].moves
  for (const move in moves) {
    if (parseInt(move) != 0 && moves[move] > 0) {
      return false;
    }
  }
  return true;
}

export const clearMoves = (roomId, team) => {
  for (const move in rooms[roomId].teams[team].moves) {
    rooms[roomId].teams[team].moves[move] = 0
  }
}

export const getLegalTiles = (roomId) => {
  return rooms[roomId].legalTiles
}

export const updateLegalTiles = (roomId, legalTiles) => {
  rooms[roomId].legalTiles = legalTiles
}

