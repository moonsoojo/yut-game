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
  if (room in rooms) {
    const spectator = { id, name, room };
    rooms[room].spectators.push(spectator)
  
    return { spectator }
  }
}

export const getSpectatorFromRoom = ({ id, room }) => {
  if (room in rooms) {
    return rooms[room].spectators.find((spectator) => spectator.id === id)
  }
}

export const addPlayer = ({ player }) => {
  if (player.room in rooms) {
    rooms[player.room].teams[player.team].players.push(player)
    return player
  }
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

export const joinTeam = ({ roomId, id, team, name }) => {
  // remove player from spectators
  // join team
  // client remains intact
  if (roomId in rooms) {
    const user = getUserFromRoom({ id, roomId })
    const existingTeam = user.team

    if (existingTeam !== 0 && existingTeam !== 1) {
      const index = rooms[roomId].spectators.findIndex((spectator) => spectator.id === id);
  
      if (index !== -1) {
        const player = {
          ...user,
          team,
          name
        }
        rooms[roomId].teams[team].players.push(player)
        return player
      }
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
  if (roomId in rooms) {
    let users = rooms[roomId].teams[0].players.concat(rooms[roomId].teams[1].players.concat(rooms[roomId].spectators))
    const user = users.find((user) => user.id === id)
  
    return user
  }
}

export const countPlayers = (roomId) => {
  const { room, error } = getRoom(roomId);
  if (!error) {
    return room.teams[0].players.length + room.teams[1].players.length
  }
}

export function bothTeamsHavePlayers(roomId) {
  if (roomId in rooms) {
    let teams = getTeams(roomId)
    if (teams[0].players.length > 0 && teams[1].players.length > 0) {
      return true
    } else {
      return false;
    }
  }
}

export const deleteRoom = (roomId) => {
  if (roomId in rooms) {
    delete rooms[roomId]
  }
}

export const addThrow = (roomId, team) => {
  if (roomId in rooms) {
    rooms[roomId].teams[team].throws++
  }
}

export const getThrows = (roomId, team) => {
  if (roomId in rooms) {
    return rooms[roomId].teams[team].throws
  }
}

export const addClient = (roomId, client) => {
  if (roomId in rooms) {
    rooms[roomId].clients[client.id] = client
    console.log("[addClient] clients", rooms[roomId].clients)
    console.log("[addClient] rooms[roomId]", rooms[roomId])
  }
}

export const getClient = (roomId, clientId) => {
  if (roomId in rooms) {
    if (clientId in rooms[roomId].clients) {
      return { client: rooms[roomId].clients[clientId] }
    } else {
      return { getClientError: "client not found" }
    }
  }
}

export const updateClientTurn = (roomId, clientId) => {
  if (roomId in rooms) {
    rooms[roomId].clients[clientId]
  }
}

export const getHostId = (roomId) => {
  if (roomId in rooms) {
    return rooms[roomId].hostId
  }
}

export const updateHostId = (roomId, hostId) => {
  if (!(roomId in rooms)) {
    return { updateHostIdError: "room not found" }
  }
  rooms[roomId].hostId = hostId
  return {}
}

export const countPlayersTeam = (roomId, team) => {
  if (!(roomId in rooms)) {
    return { countPlayersTeamError: "room not found" }
  }
  return rooms[roomId].teams[team].players.length
}

export const isReadyToStart = (roomId) => {
  if (!(roomId in rooms)) {
    return { isReadyToStartError: "room not found" }
  }
  
  const room = rooms[roomId]
  if (room.gamePhase === 'lobby' && 
    room.teams[0].players.length > 0 &&
    room.teams[1].players.length > 0 &&
    isAllYootsAsleep(roomId)) {
    return { readyToStart: true }
  } else {
    return { readyToStart: false }
  }
}

export const updateReadyToStart = (roomId, state) => {
  if (roomId in rooms) {
    rooms[roomId].readyToStart = state
    return rooms[roomId]
  }
}

export const getGamePhase = (roomId) => {
  if (roomId in rooms) {
    return rooms[roomId].gamePhase
  }
}

export const updateGamePhase = (roomId, gamePhase) => {
  if (roomId in rooms) {
    rooms[roomId].gamePhase = gamePhase
  }
}

export const getClients = (roomId) => {
  if (roomId in rooms) {
    return rooms[roomId].clients
  }
}

export const updateClients = (roomId, clients) => {
  if (roomId in rooms) {
    rooms[roomId].clients = clients
  }
}

export const getYootsAsleep = (roomId, id) => {
  if (!(roomId in rooms)) {
    return { getYootsAsleepError: "room not found" }
  }
  return { yootsAsleep: rooms[roomId].clients[id].yootsAsleep } 
}

export const isAllYootsAsleep = (roomId) => {
  if (!(roomId in rooms)) {
    return { isAllYootsAsleepError: "room not found" }
  }
  for (const id of Object.keys(rooms[roomId].clients)) {
    if (rooms[roomId].clients[id].visibility && 
      rooms[roomId].clients[id].yootsAsleep === false) {
        return { allYootsAsleep: false };
    }
  }
  return { allYootsAsleep: true };
}

export const updateYootsAsleep = (roomId, clientId, state) => {
  if (!(roomId in rooms)) {
    return { updateYootsAsleepError: "room not found" }
  }
  rooms[roomId].clients[clientId].yootsAsleep = state
  return {}
}

export const getTurn = (roomId) => {
  if (roomId in rooms) {
    return rooms[roomId].turn
  }
}

export const updateTurn = (roomId, turn) => {
  if (roomId in rooms) {
    rooms[roomId].turn = turn
    return rooms[roomId].turn
  }
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
  if (roomId in rooms) {
    let turn = getTurn(roomId)
    let teams = getTeams(roomId)
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
  if (roomId in rooms) {
    const room = rooms[roomId]
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
      for (let i = 0; i < 2; i++) {
        clearMoves(roomId, i)
      }
    } else {
      passTurn(roomId)
    }
    return { turn: rooms[roomId].turn }
  }
}

export const getCurrentPlayerId = (roomId) => {
  if (roomId in rooms) {
    let turn = rooms[roomId].turn
    console.log("[getCurrentPlayerId] turn", turn)
    let currentPlayer = turn.players[turn.team]
    console.log("[getCurrentPlayerId] currentPlayer", currentPlayer)
    return rooms[roomId].teams[turn.team].players[currentPlayer].id
  }
}

export const getThrown = (roomId, clientId) => {
  if (roomId in rooms) {
    return rooms[roomId].clients[clientId].thrown
  }
}

export const updateThrown = (roomId, clientId, state) => {
  if (!(roomId in rooms)) {
    return { updateThrownError: "room not found" }
  } else if (!(clientId in rooms[roomId].clients)) {
    return { updateThrownError: "client not found" }
  }
  rooms[roomId].clients[clientId].thrown = state
  return {}
}

export const getTeams = (roomId) => {
  if (roomId in rooms) {
    return rooms[roomId].teams
  }
}

export const updateTeams = (roomId, teams) => {
  if (roomId in rooms) {
    rooms[roomId].teams = teams
    return rooms[roomId].teams
  }
}

export const updateVisibility = (roomId, clientId, state) => {
  if (!(roomId in rooms)) {
    return { error: "room not found" }
  } else if (!(clientId in rooms[roomId].clients)) {
    return { error: "client not found in room" }
  }
  rooms[roomId].clients[clientId].visibility = state
  return {}
}

export const getVisibility = (roomId, clientId) => {
  if (roomId in rooms && clientId in rooms[roomId].clients) {
    return rooms[roomId].clients[clientId].visibility
  }
}

export const getReadyToThrow = (roomId) => {
  if (roomId in rooms) {
    return rooms[roomId].readyToThrow
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

export const subtractMove = (roomId, team, move) => {
  if (roomId in rooms) {
    rooms[roomId].teams[team].moves[move]--
  }
}

export const movesIsEmpty = (roomId, team) => {
  if (roomId in rooms) {
    const moves = rooms[roomId].teams[team].moves
    for (const move in moves) {
      if (parseInt(move) != 0 && moves[move] > 0) {
        return false;
      }
    }
    return true;
  }
}

export const clearMoves = (roomId, team) => {
  if (roomId in rooms) {
    for (const move in rooms[roomId].teams[team].moves) {
      rooms[roomId].teams[team].moves[move] = 0
    }
  }
}

export const getLegalTiles = (roomId) => {
  if (roomId in rooms) {
    return rooms[roomId].legalTiles
  }
}

export const updateLegalTiles = (roomId, legalTiles) => {
  if (roomId in rooms) {
    rooms[roomId].legalTiles = legalTiles
  }
}

export const getTiles = (roomId) => {
  if (roomId in rooms) {
    return rooms[roomId].tiles
  }
}

export const updateTiles = (roomId, tiles) => {
  if (roomId in rooms) {
    rooms[roomId].tiles = tiles
  }
}

export const getSelection = (roomId) => {
  if (roomId in rooms) {
    return rooms[roomId].selection
  }
}

export const updateSelection = (roomId, selection) => {
  if (roomId in rooms) {
    rooms[roomId].selection = selection
  }
}

export const makeMove = (roomId, destination) => {
  if (roomId in rooms) {
    let tiles = getTiles(roomId)
    let teams = getTeams(roomId)
    let selection = getSelection(roomId)
    let from = selection.tile
    let to = destination
    let legalTiles = getLegalTiles(roomId)
    console.log("[makeMove] legalTiles", legalTiles)
    let moveUsed = legalTiles[destination].move
    console.log("[makeMove] moveUsed", moveUsed)
    let history = legalTiles[destination].history
    let pieces = selection.pieces
  
    let starting = from == -1 ? true : false;
    let movingTeam = pieces[0].team;
  
    if (tiles[to].length > 0) {
      let occupyingTeam = tiles[to][0].team
      if (occupyingTeam != movingTeam) {
        for (let piece of tiles[to]) {
          piece.tile = -1
          piece.history = []
          teams[occupyingTeam].pieces[piece.id] = piece
        }
        tiles[to] = []
        addThrow(roomId, movingTeam);
      }
    }
  
    for (const piece of pieces) {
      tiles[to].push({tile: to, team: piece.team, id: piece.id, history})
    }
  
    // take from 1st index (not 0th) and go until the end
  
    if (starting) {
      let piece = pieces[0]
      teams[movingTeam].pieces[piece.id] = null
    } else {
      tiles[from] = []
    }
  
    // remove move
    subtractMove(roomId, movingTeam, moveUsed)
    updateTeams(roomId, teams)
    updateTiles(roomId, tiles)
  }
}

export const score = (roomId, selectedMove) => {
  if (roomId in rooms) {
    let tiles = rooms[roomId].tiles
    let teams = rooms[roomId].teams
    let from = rooms[roomId].selection.tile
    let moveUsed = selectedMove.move
    let pieces = rooms[roomId].selection.pieces
    let movingTeam = pieces[0].team;
  
    for (const piece of pieces) {
      teams[movingTeam].pieces[piece.id] = "scored"
    }
  
    tiles[from] = []
    teams[movingTeam].moves[moveUsed]--;
  
    updateTiles(roomId, tiles)
    updateTeams(roomId, teams)
  }
}