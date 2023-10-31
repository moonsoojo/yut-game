export default class Helper {
    firstTeamToThrow(teams) {
    let topThrow = 0;
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
}

module.exports = Helper; // for server (js)