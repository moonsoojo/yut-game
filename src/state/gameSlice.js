import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    selection: null,
    tiles: [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    piecesTeam0: 4,
    piecesTeam1: [{tile: -1, team: 1}, {tile: -1, team: 1}, {tile: -1, team: 1}, {tile: -1, team: 1}],
  },
  reducers: {
    setSelection: (state, action) => {
      state.selection = action.payload;
    },
    placePiece: (state, action) => {
      console.log("[placePiece] action", action)
      let index = action.payload.index;
      let piece = action.payload.selection;
      state.tiles[index] = piece;
      state.selection = null;
    },
  },
});

export const { setSelection, placePiece } = gameSlice.actions;

export default gameSlice.reducer;
