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
    pieces: [
      [
        { tile: -1, team: 0, id: 0 },
        { tile: -1, team: 0, id: 1 },
        { tile: -1, team: 0, id: 2 },
        { tile: -1, team: 0, id: 3 },
      ],
      [
        { tile: -1, team: 1, id: 0 },
        { tile: -1, team: 1, id: 1 },
        { tile: -1, team: 1, id: 2 },
        { tile: -1, team: 1, id: 3 },
      ],
    ],
    scores: [0, 0],
  },
  reducers: {
    setSelection: (state, action) => {
      // how to handle click between star and score button
      console.log(action);
      state.selection = action.payload;
    },
    finishPiece: (state, action) => {
      if (state.selection != null) {
        let tile = action.payload.selection.tile;
        if (tile != -1) {
          let team = action.payload.selection.team;
          let count = state.tiles[tile].length;
          for (let i = 0; i < count; i++) {
            state.scores[team]++;
          }
          state.tiles[tile] = [];
        }
      }
    },
    placePiece: (state, action) => {
      let tile = action.payload.tile;
      let piece = JSON.parse(JSON.stringify(action.payload.selection)); // must deep copy; object is not mutable

      if (state.selection == null) {
        if (state.tiles[tile].length > 0) {
          // return pieces to home
          let teamOnTile = state.tiles[tile][0].team;
          const newPiece = { tile: -1, team: teamOnTile };
          for (let count = 0; count < state.tiles[tile].length; count++) {
            state.pieces[teamOnTile].push(newPiece);
          }
          state.tiles[tile] = [];
        }
      } else {
        if (piece.tile != tile) {
          if (piece.tile == -1) {
            // start
            // if opponent's team, replace pieces
            // if same team, push
            state.pieces[piece.team].pop();
            piece.tile = tile; // set it to the new tile
            if (state.tiles[tile].length == 0) {
              state.tiles[tile].push(piece);
            } else {
              if (piece.team == state.tiles[tile][0].team) {
                //friendly
                state.tiles[tile].push(piece);
              } else {
                let teamOnTile = state.tiles[tile][0].team;
                const newPieceEnemy = { tile: -1, team: teamOnTile }; // return enemies
                for (let count = 0; count < state.tiles[tile].length; count++) {
                  state.pieces[teamOnTile].push(newPieceEnemy);
                }
                state.tiles[tile] = [];
                state.tiles[tile].push(piece);
              }
            }
          } else if (piece.tile >= 0) {
            //moving around
            if (state.tiles[tile].length == 0) {
              const newPiece = { tile: tile, team: piece.team };
              for (
                let count = 0;
                count < state.tiles[piece.tile].length;
                count++
              ) {
                state.tiles[tile].push(newPiece);
              }
              state.tiles[piece.tile] = [];
            } else {
              if (piece.team == state.tiles[tile][0].team) {
                const newPiece = { tile: tile, team: piece.team };
                for (
                  let count = 0;
                  count < state.tiles[piece.tile].length;
                  count++
                ) {
                  state.tiles[tile].push(newPiece);
                }
                state.tiles[piece.tile] = [];
              } else {
                let teamOnTile = state.tiles[tile][0].team;
                const newPieceEnemy = { tile: -1, team: teamOnTile };
                for (let count = 0; count < state.tiles[tile].length; count++) {
                  state.pieces[teamOnTile].push(newPieceEnemy);
                }
                state.tiles[tile] = [];
                const newPiece = { tile: tile, team: piece.team };
                for (
                  let count = 0;
                  count < state.tiles[piece.tile].length;
                  count++
                ) {
                  state.tiles[tile].push(newPiece);
                }
                state.tiles[piece.tile] = [];
              }
            }
          } // displaying multiple pieces on a tile
          state.selection = null;
        }
      }
    },
  },
});

export const { setSelection, placePiece, finishPiece } = gameSlice.actions;

export default gameSlice.reducer;
