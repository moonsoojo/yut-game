export function getCurrentPlayerSocketId (turn, teams) {
  if (teams[turn.team].players[turn.players[turn.team]] != undefined) {
    return teams[turn.team].players[turn.players[turn.team]].socketId
  } else {
    return "no_player_found"
  }
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