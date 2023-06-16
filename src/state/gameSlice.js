import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    selection: -1,
    tiles: [
      null,
      { team: 0, count: 0 },
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
  },
  reducers: {
    setSelection: (state, action) => {
      // console.log("[gameSlice][setSelection] action", action);
      state.selection = action.payload;
    },
    setTiles: (state, action) => {
      // console.log("[gameSlice][setTiles] action", action);
      let index = action.payload.index;
      let piece = action.payload.piece;
      state.tiles[index] = piece;
    },
  },
});

export const { setSelection, setTiles } = gameSlice.actions;

export default gameSlice.reducer;
