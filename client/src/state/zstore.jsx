import { create } from "zustand";

export const useRocketStore = create((set) => ({
  selection: null,
  setSelection: (payload) =>
    set((state) => {
      console.log("[setSelection]", payload);
      if (payload == null) {
        return { selection: null };
      }
      if (payload.type === "piece") {
        return {
          selection: [
            { tile: payload.tile, team: payload.team, id: payload.id },
          ],
        };
      } else if (payload.type === "tile") {
        return {
          selection: JSON.parse(JSON.stringify(state.tiles[payload.tile])),
        };
      }
    }),
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
      let homePieces = JSON.parse(JSON.stringify(state.pieces));
      let destination = payload.destination;
      let incomingTeam = state.selection[0].team;
      let starting = state.selection[0].tile == -1 ? true : false;

      //overtaking
      //clear tile first
      if (
        newTiles[destination].length != 0 &&
        newTiles[destination][0].team != incomingTeam
      ) {
        for (const piece of newTiles[destination]) {
          homePieces[piece.team][piece.id] = JSON.parse(JSON.stringify(piece));
        }
        newTiles[destination] = [];
      }

      if (starting) {
        const team = state.selection[0].team;
        const pieceId = state.selection[0].id;
        const piece = { team, id: pieceId, tile: destination };
        //starting
        newTiles[destination].push(piece);
        homePieces[team][pieceId] = null;
      } else {
        let fromTile = state.selection[0].tile;
        //moving from tile to another tile
        for (const piece of newTiles[fromTile]) {
          let newPiece = { tile: destination, team: piece.team, id: piece.id };
          newTiles[destination].push(newPiece);
        }
        newTiles[fromTile] = [];
      }

      return { tiles: newTiles, pieces: homePieces };
    }),
  finishPiece: () =>
    set((state) => {
      if (state.selection != null && state.selection.length > 0) {
        let newTiles = JSON.parse(JSON.stringify(state.tiles));
        let homePieces = JSON.parse(JSON.stringify(state.pieces)); 
        let fromTile = state.selection[0].tile;
        let team = state.selection[0].team;
        let starting = state.selection[0].tile == -1 ? true : false;

        //mark home pieces as "scored"
        //clear tile
        if (starting) {
          for (const piece of state.selection) {
            homePieces[team][piece.id] = "scored";
          }
        } else {
          for (const piece of newTiles[fromTile]) {
            homePieces[team][piece.id] = "scored";
          }
        }

        newTiles[fromTile] = [];
        return { tiles: newTiles, pieces: homePieces };
      } else {
        return {};
      }
    }),
}));
