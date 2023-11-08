import edgeList from "./edgeList.js";

/* todo */
// path history by piece // append it on 'move'
// make backdo use path history // implement once 'move' is implemented

// schema
// legalTiles: {
//   "1": { destination: 1, move: 1, path: [1, 2, 3]},
//   "29": [
//     { destination: 29, "move": 1, "path": [28, 29]},
//     { destination: 29, "move": 2, "path": [28, 29]}
//   ]
// }
export function getLegalTiles(tile, moves, pieces) { // parameters are optional
  let legalTiles = {} // add key '29' with empty list

  for (let move in moves) {
    if (moves[move] > 0) {
      let forward = parseInt(move) > 0 ? true: false
      if (checkBackdoRule(moves, pieces)) {
        legalTiles[0] = { tile: 0, move: "-1", path: [-1, 0] }
      } else {
        let forks = getNextTiles(tile, forward)
        for (let i = 0; i < forks.length; i++) {
          let path = [tile]
          let destination = getDestination(forks[i], Math.abs(parseInt(move))-1, forward, path)
          if (destination.tile == 29) {
            if (!(29 in legalTiles)) {
              legalTiles[29] = []
            }
            legalTiles[29].push({ tile: destination.tile, move: move, path: destination.path })
          } else {
            legalTiles[destination.tile] = { tile: destination.tile, move: move, path: destination.path }
          }
        }
      }
    }
  }

  console.log("legalTiles", legalTiles)
  return legalTiles
}

// recursion
// if first step, keep forks
// else, go straight
function getNextTiles(tile, forward) {
  let nextTiles = [];
  if (tile == -1 && (forward)) {
    return [1]
  }

  // on board
  let [start, end] = getStartAndEndVertices(forward);
  for (const edge of edgeList) {
    if (edge[start] == tile) {
      nextTiles.push(edge[end]);
    }
  }

  return nextTiles
}

function getStartAndEndVertices(forward) {
  if (forward === true) {
    return [0, 1]
  } else {
    return [1, 0]
  }
}

// to simplify, going backward works like going forward. no using path history
function getDestination(tile, steps, forward, path) {
  path.push(tile)
  if (steps == 0 || tile == 29) {
    return { tile, path }
  }
  
  let [start, end] = getStartAndEndVertices(forward);
  for (const edge of edgeList) {
    if (edge[start] == tile) {
      let nextTile;
      let forks = getNextTiles(tile, forward);
      if (forks.length > 1) {
        // choose next tile
        // recursively call getDestination with
        nextTile = chooseTileFromFork(path, forks)
      } else {
        nextTile = edge[end]
      }
      steps--; // updates value after reading
      return getDestination(nextTile, steps, forward, path)
    }
  }
}

function chooseTileFromFork(path, forks) {
  let closestIndexDistance = 1000;
  let closestIndex = -2;
  for (const fork of forks) {
    let indexDistance = Math.abs(path[path.length-2] - fork)
    if (indexDistance < closestIndexDistance) {
      closestIndexDistance = indexDistance
      closestIndex = fork
    }
  }
  return closestIndex
}

function checkBackdoRule(moves, pieces) {
  console.log("[checkBackdoRule] moves", moves, "pieces", pieces)
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
    if (piece.tile != -1 && piece.tile != "finished") {
      return false;
    }
  }
  
  return true;
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