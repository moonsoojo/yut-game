import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

io.listen(3000);

let selection = null;
let tiles = [
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
];
let pieces = [
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
];
const characters = [];

const generateRandomPosition = () => {
  return [Math.random() * 3, 0, Math.random() * 3];
};

const generateRandomHexColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

io.on("connection", (socket) => {
  console.log("a user connected");

  characters.push({
    id: socket.id,
    position: generateRandomPosition(),
    color: generateRandomHexColor(),
  });

  io.emit("characters", characters);
  io.emit("pieces", pieces);
  io.emit("tiles", tiles);

  socket.on("select", (payload) => {
    console.log("[server][select]", payload);
    selection = payload;
    io.emit("select", selection);
  });

  socket.on("placePiece", (destination) => {
    let starting = selection.type === "piece" ? true : false;
    let piecesIncoming;
    let incomingTeam;

    if (selection.type === "tile") {
      piecesIncoming = JSON.parse(JSON.stringify(tiles[selection.tile]));
      if (piecesIncoming.length == 0) {
        incomingTeam = -1;
      } else {
        incomingTeam = piecesIncoming[0].team;
      }
    } else if (selection.type === "piece") {
      piecesIncoming = [
        {
          tile: selection.tile,
          team: selection.team,
          id: selection.id,
        },
      ];
      incomingTeam = selection.team;
    }

    if (
      tiles[destination].length != 0 &&
      tiles[destination][0].team != incomingTeam
    ) {
      for (const piece of tiles[destination]) {
        pieces[piece.team][piece.id] = {
          tile: -1,
          team: piece.team,
          id: piece.id,
        };
      }
      tiles[destination] = [];
    }

    if (starting) {
      const team = selection.team;
      const pieceId = selection.id;
      tiles[destination].push(piecesIncoming[0]);
      pieces[team][pieceId] = null;
    } else {
      let fromTile = selection.tile;
      for (const piece of piecesIncoming) {
        let newPiece = { tile: destination, team: piece.team, id: piece.id };
        tiles[destination].push(newPiece);
      }
      tiles[fromTile] = [];
    }

    io.emit("placePiece", { tiles, pieces });
  });

  socket.on("finishPiece", () => {
    console.log("[server][finishPiece]");
    let piecesIncoming;
    let scoringTeam;
    let fromTile;
    if (selection.type === "tile") {
      fromTile = selection.tile;
      piecesIncoming = JSON.parse(JSON.stringify(tiles[fromTile]));
      if (piecesIncoming.length == 0) {
        scoringTeam = -1;
      } else {
        scoringTeam = piecesIncoming[0].team;
      }
    } else if (selection.type === "piece") {
      piecesIncoming = [
        {
          tile: selection.tile,
          team: selection.team,
          id: selection.id,
        },
      ];
      scoringTeam = selection.team;
    }

    if (scoringTeam != -1) {
      for (const piece of piecesIncoming) {
        pieces[scoringTeam][piece.id] = "scored";
      }
    }

    tiles[fromTile] = [];

    io.emit("finishPiece", { tiles, pieces });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");

    characters.splice(
      characters.findIndex((characters) => characters.id === socket.id),
      1
    );
    io.emit("characters", characters);
  });
});
