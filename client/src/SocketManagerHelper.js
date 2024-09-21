// why do i want to test this?
// because I don't want to manually put in the values in the app.
export function checkJoin(piecesPrev, piecesUpdate) {
  for (let i = 0; i < 4; i++)
    if (piecesPrev[i].tile === piecesUpdate[i].tile) // piece didn't move; i = joined piece index
      for (let j = 0; j < 4; j++)
        if (j !== i) { // pick another piece to compare
          const moved = piecesPrev[j].tile !== piecesUpdate[j].tile
          const finished = piecesUpdate[j].tile === 29
          const home = piecesUpdate[j].tile === -1
          if (moved && !finished && !home) // piece moved
            if (piecesUpdate[j].tile === piecesUpdate[i].tile) // it moved into the other one
              return { result: true, tile: piecesUpdate[i].tile }
        }
  return { result: false }
}