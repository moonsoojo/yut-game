export const movesIsEmpty = function (moves) {
  for (const move in moves) {
    if (moves[move] > 0) {
      return false;
    }
  }
  return true;
}