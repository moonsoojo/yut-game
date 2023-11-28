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

export function allPlayersReady(players) {
  for (const socketId of Object.keys(players)) {
    if (players[socketId].ready == false) {
      return false;
    }
  }
  return true;
}

export function countPlayers2(players) {
  return Object.keys(players).length
}

export function movesIsEmpty (moves) {
  for (const move in moves) {
    if (moves[move] > 0) {
      return false;
    }
  }
  return true;
}

export function hasMove (team) {
  let flag = false;
  for (let move in team.moves) {
    if (team.moves[move] > 0) {
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