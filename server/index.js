import { Server } from "socket.io";
import initialState from "./initialState.js";

const io = new Server({
  cors: {
    origin: [
      "http://localhost:5173", 
      "http://192.168.86.158:5173", // home
      "http://192.168.1.181:5173" // home 2
    ],
  },
});

io.listen(3000);

let selection = null;
let tiles = initialState.tiles;
let pieces = JSON.parse(JSON.stringify(initialState.pieces));
let teams = JSON.parse(JSON.stringify(initialState.teams));
let turn = JSON.parse(JSON.stringify(initialState.turn));
let numClientsYutsResting = initialState.numClientsYutsResting
let throwVisible = false
let hostId = null;
const characters = [];
// mock for multiplayer
let mockTeam = 0

const generateRandomNumberInRange = (num, plusMinus) => {
  return num + Math.random() * plusMinus * (Math.random() > 0.5 ? 1 : -1);
};

const generateRandomPosition = () => {
  return [Math.random() * 3, 0, Math.random() * 3];
};

const generateRandomHexColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

function makeId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function mockAssignTeams(mockTeam) {
  if (mockTeam == 0) {
    mockTeam = 1
  } else {
    mockTeam = 0
  }
  return mockTeam
}

function removePlayerFromGame(teams, socketId) {
  for (let i = 0; i < teams.length; i++) {
    for (let j = 0; j < teams[i].players.length; j++) {
      if (teams[i].players[j].socketId === socketId) {
        teams[i].players.splice(j, 1)
      }
    }
  }
  return teams
}

function countPlayers(teams) {
  let count = 0
  for (let i = 0; i < teams.length; i++) {
    for (let j = 0; j < teams[i].players.length; j++) {
      count++
    }
  }
  return count
}

function passTurn(turn, teams) {
  if (turn.team == -1) {
    turn.team = 0
  } else {
    if (turn.team == teams.length - 1) {
      turn.team = 0
    } else {
      turn.team++
    }
  }
  if (turn.players[turn.team] == -1) {
    turn.players[turn.team] = 0
  } else {
    if (turn.players[turn.team] == teams[turn.team].players.length - 1) {
      turn.players[turn.team] = 0
    } else {
      turn.players[turn.team]++
    }
  }
  return turn
}

io.on("connection", (socket) => {
  console.log("a user connected");

  characters.push({
    id: socket.id,
    position: generateRandomPosition(),
    color: generateRandomHexColor(),
  });

  if (hostId == null) {
    hostId = socket.id
  }

  // represent new player
  // team is chosen by player from UI
  // name is chosen by player from UI
  let newPlayer = JSON.parse(JSON.stringify(initialState.player));
  newPlayer.team = mockTeam // it starts at 1
  //mockTeam = mockAssignTeams(mockTeam) // this changes the value in the object
  // mock assigning a name 
  newPlayer.displayName = makeId(5)
  newPlayer.socketId = socket.id
  newPlayer.index = teams[mockTeam].players.length
  teams[mockTeam].players.push(newPlayer)

  // mock assigning teams
  mockTeam = mockAssignTeams(mockTeam)

  // mock assign "host" to display 'start game' button
  if (countPlayers(teams) >= 2) {
    io.to(hostId).emit("readyToStart", true);
  }

  io.emit("characters", characters);
  io.emit("pieces", pieces);
  io.emit("tiles", tiles);
  io.emit("selection", selection);
  io.emit("teams", teams);

  socket.on("startGame", () => {
    turn = passTurn(turn, teams)
    console.log("[server][startGame] turn", turn)
    io.emit("turn", turn)
    io.to(hostId).emit("readyToStart", false);
    io.to(teams[turn.team].players[turn.players[turn.team]].socketId).emit("takeTurn")
  })

  socket.on("endTurn", () => {
    console.log("[server] endTurn")
    // switch turn to next player
    turn = passTurn(turn, teams)
    io.emit("turn", turn)
    io.to(teams[turn.team].players[turn.players[turn.team]].socketId).emit("takeTurn")
  })

  socket.on("select", (payload) => {
    selection = payload;
    io.emit("select", selection);
  });

  socket.on("placePiece", (destination) => {
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
    { x: -4, y: 1, z: -1 },
    { x: -4, y: 1, z: -0.5 },
    { x: -4, y: 1, z: 0.5 },
    { x: -4, y: 1, z: 1 },
  ];
  let rotations = [
    { x: 1, y: 1, z: 1, w: 0.1 },
    { x: 2, y: 2, z: 2, w: 0 },
    { x: -1, y: -1, z: -1, w: 0.1 },
    { x: -2, y: -2, z: -2, w: 0 },
  ];
  socket.on("throwYuts", () => {
    const yutForceVectors = [];
    for (let i = 0; i < 4; i++) {
      yutForceVectors.push({
        rotation: rotations[i],
        yImpulse: generateRandomNumberInRange(0.4, 0.01),
        torqueImpulse: {
          x: generateRandomNumberInRange(0.00005, 0.0001),
          y: generateRandomNumberInRange(0.0075, 0.05),
          z: generateRandomNumberInRange(0.0002, 0.0025),
        },
        positionInHand: positionsInHand[i],
      });
    }
    numClientsYutsResting = 0
    throwVisible = false
    io.emit("throwVisibleFlag", throwVisible);
    io.emit("throwYuts", yutForceVectors);
  });

  socket.on("clientYutsResting", () => {
    numClientsYutsResting++;
    if (numClientsYutsResting == characters.length) {
      console.log("[clientYutsResting] all clients' yuts")
      throwVisible = true
      io.emit("throwVisibleFlag", throwVisible);
    }
  })

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



    teams = removePlayerFromGame(teams, socket.id)
    io.emit("characters", characters);
    io.emit("teams", teams)

    if (countPlayers(teams) == 0) {
      hostId = null;
    }
  });
});
