export const move = function (tiles, teams, from, to, moveUsed, path, pieces) {
  let starting = from == -1 ? true : false;
  let movingTeam = pieces[0].team;

  if (tiles[to].length > 0) {
    let occupyingTeam = tiles[to][0].team
    if (occupyingTeam != movingTeam) {
      for (let piece of tiles[to]) {
        piece.tile = -1
        teams[occupyingTeam].pieces[piece.id] = piece
      }
      tiles[to] = []
    }
  }

  for (const piece of pieces) {
    tiles[to].push({tile: to, team: piece.team, id: piece.id})
  }

  if (starting) {
    let piece = pieces[0]
    teams[movingTeam].pieces[piece.id] = null
  } else {
    tiles[from] = []
  }

  // remove move
  teams[movingTeam].moves[moveUsed]--;

  return { tiles, teams } 
}