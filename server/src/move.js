
// path should be appended to pieces on the board
// when it's home, clear it
// when piece moves backward, it should pop off items from the list
export const move = function (tiles, teams, from, to, moveUsed, history, pieces) {
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
      teams[movingTeam].throws++;
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
  teams[movingTeam].moves[moveUsed]--;

  // return [tiles, teams]
}