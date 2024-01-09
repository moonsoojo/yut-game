export function getCurrentPlayerSocketId (turn, teams) {
  if (teams[turn.team].players[turn.players[turn.team]] != undefined) {
    return teams[turn.team].players[turn.players[turn.team]].socketId
  } else {
    return "no_player_found"
  }
}

export function bothTeamsHavePlayers(teams) {
  if (teams[0].players.length > 0 && teams[1].players.length > 0) {
    return true
  } else {
    return false;
  }
}

export function countClients(clients) {
  return Object.keys(clients).length
}

export function movesIsEmpty (moves) {
  for (const move in moves) {
    if (parseInt(move) != 0 && moves[move] > 0) {
      return false;
    }
  }
  return true;
}

export function clearMoves(moves) {
  for (const move in moves) {
    moves[move] = 0
  }
  return moves;
}

export function hasValidMove (moves) {
  let flag = false;
  for (let move in moves) {
    if (parseInt(move) != 0 && moves[move] > 0) {
      flag = true;
      break;
    }
  }
  return flag
}

export function isMyTurn (turn, teams, socketId) {
  if (getCurrentPlayerSocketId(turn, teams) === socketId) {
    return true
  } else {
    return false
  }
}

export function getPlayerBySocketId(teams, socketId) {
  for (let i = 0; i < teams.length; i++) {
    for (let j = 0; j < teams[i].players.length; j++) {
      if (teams[i].players[j].socketId === socketId) {
        return JSON.parse(JSON.stringify(teams[i].players[j]))
      }
    }
  }
  return {} // not found
}

export function allYootsAsleep(clients) {
  let flag = true;
  for (const socketId of Object.keys(clients)) {
    if (clients[socketId].visibility && !clients[socketId].yootsAsleep) {
      flag = false;
    }
  }
  return flag
}