import { create } from "zustand";

export const useRocketStore = create((set) => ({
  selection: null,
  setSelection: (payload) => set({ selection: payload }),
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
      let newTiles = JSON.parse(JSON.stringify(state.tiles));
      let newPieces = JSON.parse(JSON.stringify(state.pieces));

      //overtaking
      if (state.selection.tile == -1) {
        //starting
        newTiles[payload.destination].push({
          id: state.selection.id,
          team: state.selection.team,
          tile: payload.destination,
        });
        newPieces[state.selection.team][state.selection.id] = null;
      } else {
        //moving from tile to another tile
        for (const piece of newTiles[state.selection.tile]) {
          newTiles[payload.destination].push(piece);
        }
        newTiles[state.selection.tile] = [];
      }

      return { tiles: newTiles, pieces: newPieces };
    }),
  //remove
  //move
  //stack
}));
