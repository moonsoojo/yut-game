export const score = function (tiles, teams, from, moveUsed, path, pieces) {
  let movingTeam = pieces[0].team;

  for (const piece of pieces) {
    teams[movingTeam].pieces[piece.id] = "scored"
  }

  tiles[from] = []
  teams[movingTeam].moves[moveUsed]--;

  return { tiles, teams } 
}