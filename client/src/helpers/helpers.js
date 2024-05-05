export function getCurrentPlayerSocketId (turn, teams) {
  if (teams[turn.team].players[turn.players[turn.team]] != undefined) {
    return teams[turn.team].players[turn.players[turn.team]].id
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

export function clientHasTurn(clientSocketId, teams, turn) {
  const currentTeam = turn.team
  const currentPlayer = turn.players[turn.team]
  // Check if a player is at the index
  // He/she could have dropped
  if (teams[currentTeam].players[currentPlayer] &&
  teams[currentTeam].players[currentPlayer].socketId === clientSocketId) {
    return true;
  } else {
    return false;
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

export function makeId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function getRandomNumber(min, max) {
  let randomNumber = (max - min) * Math.random() + min
  return randomNumber;
}