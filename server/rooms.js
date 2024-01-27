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
// yoots
  // clientId
  // yootsAsleep
  // visibility
  // thrown // server use only
*/

// add room
export const addRoom = ({ id }) => {

  if (id in rooms) {
    return { addRoomError: `room ${id} exists already` }
  }

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
        throws: 10,
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
        throws: 10,
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
    spectators: [], // objects
    selection: null,
    hostId: null,
    yoots: {}, // key: socket id, value: yoot status
    readyToStart: false,
    gamePhase: 'lobby',
    readyToThrow: true,
    legalTiles: {},
    messages: []
  }

  rooms[id] = room
  return { room }
}

export const addSpectator = ({ id, randomName, room }) => {
  const spectator = { id, randomName, room };
  rooms[room].spectators.push(spectator)
  return { spectator }
}

export const getSpectatorFromRoom = ({ id, room }) => {
  if (room in rooms) {
    return rooms[room].spectators.find((spectator) => spectator.id === id)
  }
}

export const addPlayer = ({ player }) => {
  rooms[player.room].teams[player.team].players.push(player)
}

export const removeSpectator = ({ roomId, spectatorId }) => {
  const index = rooms[roomId].spectators.findIndex((spectator) => spectator.id === spectatorId);

  if (index !== -1) {
    return { removedSpectator: rooms[roomId].spectators.splice(index, 1)[0] }
  } else {
    return { removeSpectatorError: `spectator ${spectatorId} not found in room ${roomId}`}
  }
}

export const removePlayer = ({ roomId, team, playerId }) => {
  const index = rooms[roomId].teams[team].players.findIndex(
    (player) => player.id === playerId
  );
  if (index !== -1) {
    return { removedPlayer: rooms[roomId].teams[team].players.splice(index, 1)[0] }
  } else {
    return { removePlayerError: `player not found in ${team} of room ${roomId}` }
  }
}

export const removeUserFromRoom = ({ id, roomId }) => {

  if (!(roomId in rooms)) {
    return { error: 'room not found' }
  }

  const user = getUserFromRoom({ id, roomId })
  const team = user.team

  if (id in rooms[roomId].yoots) {
    delete rooms[roomId].yoots[id]
    console.log("[removeUserFromRoom] yoots", rooms[roomId].yoots)
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

/*export const checkDuplicateName = ({ roomId, clientId, name }) => {
  if (!(roomId in rooms)) {
    return { checkDuplicateNameError: `room ${roomId} not found` }
  }

  let players = rooms[roomId].teams[0].players.concat(rooms[roomId].teams[1].players)
  const duplicateNameUser = players.find((player) => (player.id !== clientId && player.name === name))
  console.log("[checkDuplicateName] duplicateNameUser", duplicateNameUser)
  if (duplicateNameUser) {
    return { isDuplicate: true }
  }
  return { isDuplicate: false }
}*/

export const joinTeam = ({ roomId, id, team, name }) => {
  // remove player from spectators
  // join team
  // client remains intact
  const { user, getUserFromRoomError } = getUserFromRoom({ id, roomId })
  if (!user) {
    return { joinTeamError: getUserFromRoomError }
  }
  const existingTeam = user.team

  if (existingTeam !== 0 && existingTeam !== 1) {
    const { removedSpectator, removeSpectatorError } = removeSpectator({ roomId, spectatorId: id })
    if (removedSpectator) {
      const player = {
        ...removedSpectator,
        name,
        team,
      }
      rooms[roomId].teams[team].players.push(player)
      return { joinedPlayer: player }
    } else {
      return { joinTeamError: removeSpectatorError }
    }
  } else {
    const { removedPlayer, removePlayerError } = removePlayer({ roomId, playerId: id, team: existingTeam })
    if (removePlayerError) {
      return { joinTeamError: removePlayerError }
    }

    if (removedPlayer) {
      const player = {
        ...removedPlayer,
        name,
        team
      }
      rooms[roomId].teams[team].players.push(player)
      return { joinedPlayer: player }
    } else {
      return { joinTeamError: removePlayerError }
    }
  }
}

export const joinTeam2 = ({ player }) => {
  const roomId = player.room

  if (getHostId(roomId) == null) {
    updateHostId(roomId, player.id)
  }
  
  const { currentPlayerId, getCurrentPlayerIdError } = getCurrentPlayerId(roomId)
  if (getCurrentPlayerIdError) {
    return { joinTeam2Error: getCurrentPlayerIdError }
  }

  const turn = getTurn(roomId)
  if (player.id === currentPlayerId 
    && movesIsEmpty(roomId, turn.team) 
    && getThrows(roomId, turn.team) == 0 
    && getGamePhase(roomId) !== "lobby") {
    addThrow(roomId, turn.team)
  }

  return {}
}

export const getRoom = ( id ) => {
  console.log("[getRoom] roomId", id)
  console.log("[getRoom] room's yoots", rooms[id].yoots)
  console.log("[getRoom] room's teams", JSON.stringify(rooms[id].teams))
  console.log("[getRoom] room's turn", JSON.stringify(rooms[id].turn))
  console.log("[getRoom] room's spectators", JSON.stringify(rooms[id].spectators))
  console.log("[getRoom] room's selection", JSON.stringify(rooms[id].selection))
  console.log("[getRoom] room's hostId", rooms[id].hostId)
  console.log("[getRoom] room's readyToThrow", rooms[id].readyToThrow)
  console.log("[getRoom] room's legalTiles", rooms[id].legalTiles)
  return rooms[id]
}

export const getUserFromRoom = ({ id, roomId }) => {
  let users = rooms[roomId].teams[0].players.concat(rooms[roomId].teams[1].players.concat(rooms[roomId].spectators))
  const user = users.find((user) => user.id === id)
  if (user) {
    return { user }
  } else {
    return { getUserFromRoomError: `user with socket id ${id} not found in room ${roomId}`}
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

export const addYoots = (roomId, clientId) => {
  const yoots = {
    clientId,
    yootsAsleep: false,
    visibility: true,
    thrown: false
  }
  rooms[roomId].yoots[clientId] = yoots
}

export const getYoot = (roomId, clientId) => {
  if (roomId in rooms) {
    if (clientId in rooms[roomId].yoots) {
      return { yoot: rooms[roomId].yoots[clientId] }
    } else {
      return { getYootError: `yoot from client ${clientId}not found` }
    }
  }
}

export const getHostId = (roomId) => {
  return rooms[roomId].hostId
}

export const updateHostId = (roomId, hostId) => {
  rooms[roomId].hostId = hostId
}

export const countPlayersTeam = (roomId, team) => {
  if (!(roomId in rooms)) {
    return { countPlayersTeamError: "room not found" }
  }
  return rooms[roomId].teams[team].players.length
}

export const isReadyToStart = (roomId) => {
  const room = rooms[roomId]
  if (room.gamePhase === 'lobby' && 
    room.teams[0].players.length > 0 &&
    room.teams[1].players.length > 0 &&
    isAllYootsAsleep(roomId)) {
    return true
  } else {
    return false
  }
}

export const updateReadyToStart = (roomId, state) => {
  rooms[roomId].readyToStart = state
  return rooms[roomId]
}

export const checkReadyToStart = (roomId) => {
  const room = rooms[roomId]
  if (room.gamePhase === 'lobby' && 
    room.teams[0].players.length > 0 &&
    room.teams[1].players.length > 0 &&
    isAllYootsAsleep(roomId)) {
    return true
  } else {
    return false
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

export const getYoots = (roomId) => {
  if (roomId in rooms) {
    return rooms[roomId].yoots
  }
}

export const updateYoots = (roomId, yoots) => {
  if (roomId in rooms) {
    rooms[roomId].yoots = yoots
  }
}

export const getYootsAsleep = (roomId, id) => {
  return rooms[roomId].yoots[id].yootsAsleep
}

export const isAllYootsAsleep = (roomId) => {
  for (const id of Object.keys(rooms[roomId].yoots)) {
    if (rooms[roomId].yoots[id].visibility && 
      rooms[roomId].yoots[id].yootsAsleep === false) {
        return false;
    }
  }
  return true
}

export const updateYootsAsleep = (roomId, clientId, state) => {
  rooms[roomId].yoots[clientId].yootsAsleep = state
}

export const getTurn = (roomId) => {
  return rooms[roomId].turn
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
      if (firstTeamToThrow == -1) { // tie
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
    // return { turn: rooms[roomId].turn }
  }
}

export const getCurrentPlayerId = (roomId) => {
  let turn = rooms[roomId].turn
  let currentPlayer = turn.players[turn.team]
  if (rooms[roomId].teams[turn.team].players[currentPlayer] === undefined) {
    const error = `no player in specified index`
    console.log(`[getcurrentPlayerId] ${error}`)
    return { getCurrentPlayerIdError: error }
  }
  return { currentPlayerId: rooms[roomId].teams[turn.team].players[currentPlayer].id }
}

export const getThrown = (roomId, clientId) => {
  return rooms[roomId].yoots[clientId].thrown
}

export const updateThrown = (roomId, clientId, state) => {
  rooms[roomId].yoots[clientId].thrown = state
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
  rooms[roomId].yoots[clientId].visibility = state
  return {}
}

export const getVisibility = (roomId, clientId) => {
  return rooms[roomId].yoots[clientId].visibility
}

export const getReadyToThrow = (roomId) => {
  if (roomId in rooms) {
    return rooms[roomId].readyToThrow
  }
}

export const updateReadyToThrow = (roomId, state) => {
  rooms[roomId].readyToThrow = state
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

// 0, inclusive to max, exclusive
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const getRandomPlayer = (teams) => {
  let randomTeam = getRandomInt(2)
  let randomPlayerIndex;
  let randomPlayer;
  if (teams[randomTeam].players.length > 0) {
    randomPlayerIndex = getRandomInt(teams[randomTeam].players.length)
    randomPlayer = teams[randomTeam].players[randomPlayerIndex]
  } else {
    if (randomTeam == 0) {
      randomTeam = 1
    } else {
      randomTeam = 0
    }
    randomPlayerIndex = getRandomInt(teams[randomTeam].players.length)
    randomPlayer = teams[randomTeam].players[randomPlayerIndex]
  }
  console.log("[findRandomPlayer]", randomPlayer)
  return randomPlayer
}

export const countSpectators = (roomId) => {
  return rooms[roomId].spectators.length
}

export const getRandomSpectator = (roomId) => {
  const numSpectators = rooms[roomId].spectators.length
  return rooms[roomId].spectators[getRandomInt(numSpectators)]
}