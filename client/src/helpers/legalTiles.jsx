import edgeList from "./edgeList.js";

// schema
// legalTiles: {
//   "1": [
//     { "move": 1, "path": [1, 2, 3]},
//     { "move": 2, "path": [1,2,3,4]}
//   ],
//   "2": [
//     { "move": 1, "path": [1, 2, 3]},
//     { "move": 2, "path": [1,2,3,4]}
//   ]
// }
export function getLegalTiles(tile, moves, pieces) {
  let legalTiles = {29: []}

  for (let move in moves) {
    if (moves[move] > 0) {
      let forward = parseInt(move) > 0 ? true: false
      let forks = getFirstTiles(tile, forward)
      for (let i = 0; i < forks.length; i++) {
        let destination = getDestination(forks[i], parseInt(move)-1, forward)
        legalTiles[destination.tile] = destination
      }
    }
  }

  return legalTiles
}

// recursion
// if first step, keep forks
// else, go straight
function getFirstTiles(tile, forward) {
  let firstTiles = [];
  if (tile == -1 && forward) {
    return [0]
  }

  // on board
  let [start, end] = getStartAndEndVertices(forward);
  for (const edge of edgeList) {
    if (edge[start] == tile) {
      firstTiles.push(edge[end]);
    }
  }
  return firstTiles
}

function getStartAndEndVertices(forward) {
  if (forward === true) {
    return [0, 1]
  } else {
    return [1, 0]
  }
}

// to simplify, going backward works like going forward. no using path history
function getDestination(tile, steps, forward) {

}



function checkBackdoRule(moves, pieces) {
  // should only have backdo
  let hasBackdo = false;
  let hasAnotherMove = false;
  for (let move in moves) {
    if (move === "-1" && moves[move] > 0) {
      hasBackdo = true;
    } else if (move !== "-1" && moves[move] > 0) {
      hasAnotherMove = true;
    }
  }
  if (!(hasBackdo && !hasAnotherMove)) {
    return false;
  }

  // should have no pieces on the board
  for (let piece of pieces) {
    if (piece.tile != -1) {
      return false;
    }
  }
}

/* extra code */
///////////////////////////////////////////
///////////  checkBackdoRule  /////////////
///////////////////////////////////////////
// if (direction === "forward") {
//   let result = getNextTiles(tile, [], direction)
//   legalTiles[result.destination] = [{move: result.move, path: result.path}]
// } else {
//   if (checkBackdoRule(moves, pieces)) {
//     legalTiles[0] = [{move: "-1", path: [29]}]
//   } else {
//     // player has a move besides backdo: a tile will be highlighted
//     // player has a piece on board: no tile will be highlighted; alert player they must move the one on the board
//     let result = getNextTiles()
//   }
// }