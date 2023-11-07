// tiles = function(tiles)
// check tiles is changed the way you want it to
export default function move(tiles, teams, from, to, move, path, pieces) {
  let starting = from == -1 ? true : false;
  let movingTeam = pieces[0].team;

  // if it's occupied
    // if it's an enemy
      // move enemy pieces
  // append incoming pieces
  // if starting
    // clear piece from team's pieces
  // else 
    // remove piece from tiles[from]
  // score logic should have its own function

  if (tiles[to].length > 0) {
    let occupyingTeam = tiles[to][0].team
    if (occupyingTeam != movingTeam) {
      for (const piece of tiles[to]) {
        teams[occupyingTeam].pieces[piece.id].tile = -1
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

  return { tiles, teams } 
}