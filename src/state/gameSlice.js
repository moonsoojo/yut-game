import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    selection: -1,
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
    piecesTeam1: 4,
  },
  reducers: {
    setSelection: (state, action) => {
      state.selection = action.payload;
    },
    setTiles: (state, action) => {
      let index = action.payload.index;
      let piece = action.payload.piece;
      state.tiles[index] = piece;
    },
  },
});

export const { setSelection, setTiles } = gameSlice.actions;

export default gameSlice.reducer;
