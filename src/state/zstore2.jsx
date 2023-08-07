import { create } from "zustand";

export const useRocketStore = create((set) => ({
  selection: null,
  setSelection: (payload) =>
    set((state) => {
      return { selection: payload };
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
      let starting = state.selection.type === "piece" ? true : false;
      let piecesIncoming;
      let incomingTeam;

      if (state.selection.type === "tile") {
        piecesIncoming = JSON.parse(
          JSON.stringify(newTiles[state.selection.tile])
        );
        if (piecesIncoming.length == 0) {
          incomingTeam = -1;
        } else {
          incomingTeam = piecesIncoming[0].team;
        }
      } else if (state.selection.type === "piece") {
        piecesIncoming = [
          {
            tile: state.selection.tile,
            team: state.selection.team,
            id: state.selection.id,
          },
        ];
        incomingTeam = state.selection.team;
      }

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
        const team = state.selection.team;
        const pieceId = state.selection.id;
        newTiles[destination].push(piecesIncoming[0]);
        homePieces[team][pieceId] = null;
      } else {
        let fromTile = state.selection.tile;
        for (const piece of piecesIncoming) {
          let newPiece = { tile: destination, team: piece.team, id: piece.id };
          newTiles[destination].push(newPiece);
        }
        newTiles[fromTile] = [];
      }

      return { tiles: newTiles, pieces: homePieces };
    }),
  finishPiece: () =>
    set((state) => {
      let newTiles = JSON.parse(JSON.stringify(state.tiles));
      let homePieces = JSON.parse(JSON.stringify(state.pieces));
      let piecesIncoming;
      let scoringTeam;
      let fromTile;
      if (state.selection.type === "tile") {
        fromTile = state.selection.tile;
        piecesIncoming = JSON.parse(JSON.stringify(newTiles[fromTile]));
        if (piecesIncoming.length == 0) {
          scoringTeam = -1;
        } else {
          scoringTeam = piecesIncoming[0].team;
        }
      } else if (state.selection.type === "piece") {
        piecesIncoming = [
          {
            tile: state.selection.tile,
            team: state.selection.team,
            id: state.selection.id,
          },
        ];
        scoringTeam = state.selection.team;
      }

      if (scoringTeam != -1) {
        for (const piece of piecesIncoming) {
          homePieces[scoringTeam][piece.id] = "scored";
        }
      }

      newTiles[fromTile] = [];
      return { tiles: newTiles, pieces: homePieces };
    }),
}));
