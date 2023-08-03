import { create } from "zustand";

export const useRocketStore = create((set) => ({
  selection: null,
  setSelection: (payload) => set((state) => ({ selection: payload })),
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
  setPiece: (payload) =>
    set((state) => {
      console.log(state.tiles);
      console.log(state.selection);
      console.log(state.pieces);
      // let newTiles = JSON.parse(JSON.stringify(state.tiles));
      // let newPieces = JSON.parse(JSON.stringify(state.pieces));
      let newTiles = state.tiles;
      let newPieces = state.pieces;
      newTiles[payload.tile].push({
        id: payload.id,
        team: payload.team,
        tile: payload.tile,
      });
      if (state.selection.tile == -1) {
        newPieces[state.selection.team].splice(state.selection.id, 1);
      } else {
        newTiles[state.selection.tile] = [];
      }
      return { tiles: newTiles, pieces: newPieces };
    }),
}));
