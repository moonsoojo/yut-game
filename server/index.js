import { Server } from "socket.io";
import initialState from "./initialState.js";

const io = new Server({
  cors: {
    origin: ["http://localhost:5173", "http://192.168.86.158:5173"],
  },
});

io.listen(3000);

let selection = null;
let tiles = JSON.parse(JSON.stringify(initialState.tiles));
let pieces = JSON.parse(JSON.stringify(initialState.pieces));
const characters = [];

const generateRandomNumberInRange = (num, plusMinus) => {
  return num + Math.random() * plusMinus * (Math.random() > 0.5 ? 1 : -1);
};

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
  io.emit("selection", selection);

  socket.on("select", (payload) => {
    console.log("[server][select]", payload);
    selection = payload;
    io.emit("select", selection);
  });

  socket.on("placePiece", (destination) => {
    console.log(destination);
    let starting =
      selection != null && selection.type === "piece" ? true : false;
    let piecesIncoming;
    let incomingTeam;

    if (selection != null && selection.type === "tile") {
      piecesIncoming = JSON.parse(JSON.stringify(tiles[selection.tile]));
      if (piecesIncoming.length == 0) {
        incomingTeam = -1;
      } else {
        incomingTeam = piecesIncoming[0].team;
      }
    } else if (selection != null && selection.type === "piece") {
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
    let piecesIncoming;
    let scoringTeam;
    let fromTile;
    if (selection != null && selection.type === "tile") {
      fromTile = selection.tile;
      piecesIncoming = JSON.parse(JSON.stringify(tiles[fromTile]));
      if (piecesIncoming.length == 0) {
        scoringTeam = -1;
      } else {
        scoringTeam = piecesIncoming[0].team;
      }
    } else if (selection != null && selection.type === "piece") {
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

  let positionsInHand = [
    { x: -2, y: 1, z: 0 },
    { x: 0, y: 1, z: 2 },
    { x: 2, y: 1, z: 0 },
    { x: 0, y: 1, z: -2 },
  ];
  let rotations = [
    { x: 1, y: 1, z: 1, w: 0 },
    { x: 2, y: 2, z: 2, w: 0 },
    { x: -1, y: -1, z: -1, w: 0 },
    { x: -2, y: -2, z: -2, w: 0 },
  ];
  socket.on("throwYuts", () => {
    const yutForceVectors = [];
    for (let i = 0; i < 4; i++) {
      yutForceVectors.push({
        // rotation: {
        //   x: generateRandomNumberInRange(3.14, 3.14),
        //   y: generateRandomNumberInRange(3.14, 3.14),
        //   z: generateRandomNumberInRange(3.14, 3.14),
        //   w: 0,
        // },
        rotation: rotations[i],
        yImpulse: generateRandomNumberInRange(0.05, 0.01),
        torqueImpulse: {
          x: generateRandomNumberInRange(0.00001, 0.000005),
          y: generateRandomNumberInRange(0.0015, 0.0005),
          z: generateRandomNumberInRange(0.00004, 0.00001),
        },
        positionInHand: positionsInHand[i],
      });
    }
    io.emit("throwYuts", yutForceVectors);
  });

  socket.on("throwVisibleFlag", (value) => {
    io.emit("throwVisibleFlag", value);
  });

  socket.on("reset", () => {
    tiles = JSON.parse(JSON.stringify(initialState.tiles));
    pieces = JSON.parse(JSON.stringify(initialState.pieces));
    io.emit("reset", {
      tiles: tiles,
      pieces: pieces,
      selection: null,
    });
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
