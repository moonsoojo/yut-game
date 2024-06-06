export function getCurrentPlayerSocketId (turn, teams) {
  if (teams[turn.team].players[turn.players[turn.team]] != undefined) {
    return teams[turn.team].players[turn.players[turn.team]].socketId
  } else {
    return "no_player_found"
  }
}

function makeId(length) {
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

export function roundNum(num, place) {
  return Math.round(num * Math.pow(10, place)) / Math.pow(10, place)
}