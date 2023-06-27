import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    selection: null,
    tiles: [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ],
    pieces: [[{tile: -1, team: 0}, {tile: -1, team: 0}, {tile: -1, team: 0}, {tile: -1, team: 0}], [{tile: -1, team: 1}, {tile: -1, team: 1}, {tile: -1, team: 1}, {tile: -1, team: 1}]]
  },
  reducers: {
    setSelection: (state, action) => {
      state.selection = action.payload;
      console.log(action)
    },
    placePiece: (state, action) => {
      // console.log("[placePiece] action", action) // action needs to be an object
      let tile = action.payload.tile;
      let piece = action.payload.selection
      if (state.selection == null) {
        if (state.tiles[tile].length > 0) { // return pieces to home
          let teamOnTile = state.tiles[tile][0].team
          const newPiece = {tile: -1, team: teamOnTile}
          for (let count = 0; count < state.tiles[tile].length; count++) {
            state.pieces[teamOnTile].push(newPiece)
          }
          state.tiles[tile] = [];
        }
      } else {
        if (piece.tile == -1) { // start
          // if opponent's team, replace pieces
          // if same team, push
          state.pieces[piece.team].pop()
          if (state.tiles[tile].length == 0) {
            state.tiles[tile].push(piece);
          } else {
            if (piece.team == state.tiles[tile][0].team) {
              state.tiles[tile].push(piece);
            } else {
              let teamOnTile = state.tiles[tile][0].team
              const newPiece = {tile: -1, team: teamOnTile}
              for (let count = 0; count < state.tiles[tile].length; count++) {
                state.pieces[teamOnTile].push(newPiece)
              }
              state.tiles[tile] = [];
              state.tiles[tile].push(piece);
            }
          }
        } else if (piece.tile >= 0) { //moving around
          if (state.tiles[tile].length == 0) {
            state.tiles[tile].push(piece);
            state.tiles[piece.tile] = [];
          } else {
            console.log("adding more pieces to an occupied tile")
            if (piece.team == state.tiles[tile][0].team) {
              const newPiece = {tile: tile, team: piece.team}
              for (let count = 0; count < state.tiles[tile].length; count++) {
                state.tiles[tile].push(newPiece);
              }
            } else {
              let teamOnTile = state.tiles[tile][0].team
              const newPieceEnemy = {tile: -1, team: teamOnTile}
              for (let count = 0; count < state.tiles[tile].length; count++) {
                state.pieces[teamOnTile].push(newPieceEnemy)
              }
              state.tiles[tile] = [];
              const newPiece = {tile: tile, team: piece.team}
              for (let count = 0; count < state.tiles[tile].length; count++) {
                state.tiles[tile].push(newPiece);
              }
            }
          }
        } // displaying multiple pieces on a tile
        state.selection = null;
      }
    },
  },
});

export const { setSelection, placePiece } = gameSlice.actions;

export default gameSlice.reducer;
