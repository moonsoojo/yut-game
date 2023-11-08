export function getCurrentPlayerSocketId (turn, teams) {
  if (teams[turn.team].players[turn.players[turn.team]] != undefined) {
    return teams[turn.team].players[turn.players[turn.team]].socketId
  } else {
    return "no_player_found"
  }
}

export const movesIsEmpty = function (moves) {
  for (const move in moves) {
    if (moves[move] > 0) {
      return false;
    }
  }
  return true;
}