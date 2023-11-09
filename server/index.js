import { Server } from "socket.io";
import initialState from "./initialState.js";
import { move } from "./src/move.js";
import { score } from "./src/score.js";
import { getCurrentPlayerSocketId } from "./src/helpers.js";

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
let teams = JSON.parse(JSON.stringify(initialState.teams));
let turn = JSON.parse(JSON.stringify(initialState.turn));
let numClientsYutsResting = initialState.numClientsYutsResting
let clientYutResults = [];
let gamePhase = JSON.parse(JSON.stringify(initialState.gamePhase)); // possible values: "lobby", "pregame", "game"=
let hostId = null;
const characters = [];
let throwInProgress = false;

let test = true;
if (test) {
  gamePhase = "game"
  turn = {
    team: 0,
    players: [0,0]
  }
  teams[0].moves["1"] = 1
  tiles[5] = [{tile: 5, team: 0, id: 0}]
  teams[0].pieces[0] = null
}

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

function mockAssignTeams(teams) {
  if (countPlayers(teams) == 0) {
    return getRandomInt(2);
  } else {
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].players.length == 0) {
        return i
      }
    }
  }
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

function setTurn(turn, team, players) {
  turn.team = team;
  turn.players = players;
  return turn
}

function passTurn(turn, teams) {
  if (turn.team == teams.length - 1) {
    turn.team = 0
  } else {
    turn.team++
  }
  
  if (turn.players[turn.team] == teams[turn.team].players.length - 1) {
    turn.players[turn.team] = 0
  } else {
    turn.players[turn.team]++
  }
  console.log("[passTurn] turn", turn)
  return turn
}

function allTeamsHaveMove(teams) {
  // go through every team
  // if every team has a score
  // get team with top score
  // switch turn to them
  let allTeamsHaveMove = true;
  for (let i = 0; i < teams.length; i++) {
    let hasMove = false;
    for (let move in teams[i].moves) {
      if (teams[i].moves[move] > 0) {
        hasMove = true;
        break;
      }
    }
    if (!hasMove) {
      allTeamsHaveMove = false;
      break;
    }
  }
  return allTeamsHaveMove
}

function calcFirstTeamToThrow(teams) {
  let topThrow = -2;
  let topThrowTeam = -1;
  let tie = false;
  for (let i = 0; i < teams.length; i++) {
    for (let move in teams[i].moves) {
      if (teams[i].moves[move] > 0) {
        if (parseInt(move) > topThrow) {
          topThrow = parseInt(move)
          topThrowTeam = i
        } else if (parseInt(move) == topThrow) {
          tie = true;
        }
        break;
      }
    }
  }
  if (tie) {
    return -1
  } else {
    return topThrowTeam
  }
}

// 0, inclusive to max, exclusive
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function findRandomPlayer(teams) {
  while (true) {
    let randomTeam = getRandomInt(2)
    let teamToChooseFrom = teams[randomTeam]
    if (teamToChooseFrom.players.length > 0) {
      let randomPlayer = getRandomInt(teamToChooseFrom.players.length)
      return teamToChooseFrom.players[randomPlayer]
    } else {
      continue;
    }
  }
}

function checkThrowResultsMatch(results) {
  let resultsMatch = "true";
  let resultToMatch = results[0]
  for (let i = 1; i < results.length; i++) {
    if (resultToMatch !== results[i]) {
      resultsMatch = "false";
      break;
    }
  }
  return resultsMatch
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
  let newTeam = mockAssignTeams(teams)
  newPlayer.team = newTeam
  // mock assigning a name 
  newPlayer.displayName = makeId(5)
  newPlayer.socketId = socket.id
  newPlayer.index = teams[newTeam].players.length
  teams[newTeam].players.push(newPlayer)
  io.to(socket.id).emit("setUpPlayer", {socketId: newPlayer.socketId, team: newTeam})

  // mock assign "host" to display 'start game' button
  // by default, it's hidden for everyone
  io.emit("readyToStart", false);
  if (countPlayers(teams) >= 2) {
    io.to(hostId).emit("readyToStart", true);
  }

  io.emit("characters", characters); // this should be refactored
  io.emit("tiles", tiles);
  io.emit("selection", selection);
  io.emit("teams", teams);
  io.emit("turn", turn);
  io.emit("gamePhase", gamePhase);


  socket.on("startGame", () => {
    // turn = passTurn(turn, teams)
    // io.emit("turn", turn)
    io.to(hostId).emit("readyToStart", false);
    let currentPlayer = teams[turn.team].players[turn.players[turn.team]]
    teams[turn.team].throws++;
    io.emit("teams", teams)
    io.to(currentPlayer.socketId).emit("showThrow")
    // io.to(currentPlayer.socketId).emit("canEndTurn", false)
    gamePhase = "pregame"
    io.emit("gamePhase", gamePhase);
  })

  // pass turn to next player
  socket.on("endTurn", () => {
    // clear old player's turn
    let currentPlayer = teams[turn.team].players[turn.players[turn.team]]
    // io.to(currentPlayer.socketId).emit("canEndTurn", false)

    if (gamePhase === "pregame") {
      if (allTeamsHaveMove(teams)) {
        let firstTeamToThrow = calcFirstTeamToThrow(teams)
        if (firstTeamToThrow == -1) {
          turn = passTurn(turn, teams)
        } else {
          // turn has been decided
          turn = setTurn(turn, firstTeamToThrow, [0, 0])
          gamePhase = "game"
        }
        // clear moves in teams
        for (let i = 0; i < teams.length; i++) {
          teams[i].moves = JSON.parse(JSON.stringify(initialState.moves));
        }
      } else {
        turn = passTurn(turn, teams)
      }
    } else if (gamePhase === "game") {
      turn = passTurn(turn, teams)
    }

    // next player
    currentPlayer = teams[turn.team].players[turn.players[turn.team]]
    
    teams[turn.team].throws++;
    io.emit("turn", turn)
    io.emit("teams", teams)
    io.emit("gamePhase", gamePhase)
    io.to(currentPlayer.socketId).emit("showThrow")
    io.to(currentPlayer.socketId).emit("throwInProgress", false)
  })

  socket.on("select", (payload) => {
    selection = payload;
    io.emit("select", selection);
  });

  socket.on("move", ({selection, tile, moveInfo}) => {
    let from = selection.tile
    let to = tile
    let moveUsed = moveInfo.move
    let path = moveInfo.path
    let pieces = selection.pieces
    let result = move(tiles, teams, from, to, moveUsed, path, pieces)
    tiles = result.tiles
    teams = result.teams
    io.emit("tiles", tiles);
    io.emit("teams", teams);
  });

  socket.on("score", ({selection, moveInfo}) => {
    let from = selection.tile
    console.log("[score] moveUsed", moveInfo.move)
    let moveUsed = moveInfo.move
    let path = moveInfo.path
    let pieces = selection.pieces
    let result = score(tiles, teams, from, moveUsed, path, pieces)
    tiles = result.tiles
    teams = result.teams
    io.emit("tiles", tiles);
    io.emit("teams", teams);
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
    numClientsYutsResting = 0
    clientYutResults = [];
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
    
    io.emit("throwYuts", yutForceVectors);
    teams[turn.team].throws--;
    io.emit("teams", teams)
  });

  socket.on("clientYutsResting", () => {
    numClientsYutsResting++;
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



  socket.on("bonusThrow", () => {
    if (clientYutResults.length == characters.length && checkThrowResultsMatch(clientYutResults)) {
      teams[turn.team].throws++;
      io.emit("teams", teams)
    }
  })

  // socket.on("canEndTurn", () => {
  //   io.to(teams[turn.team].players[turn.players[turn.team]].socketId).emit("canEndTurn", true);
  //   // all clients' yuts should be resting
  //   // display status text based on 'teams' in client
  // })

  socket.on("recordThrow", (result) => {
    clientYutResults.push(result);
    if (clientYutResults.length == characters.length && checkThrowResultsMatch(clientYutResults)) {
      teams[turn.team].moves[result.toString()]++
      io.emit("teams", teams)
      throwInProgress = false;
      io.emit("throwInProgress", throwInProgress);
    }
  })

  socket.on("throwInProgress", (flag) => {
    throwInProgress = flag;
    io.emit("throwInProgress", flag)
  })

  socket.on("disconnect", () => {
    console.log("user disconnected");

    characters.splice(
      characters.findIndex((characters) => characters.id === socket.id),
      1
    );

    teams = removePlayerFromGame(teams, socket.id)
    io.emit("characters", characters);
    io.emit("teams", teams)

    if (countPlayers(teams) > 0) {
      hostId = findRandomPlayer(teams).socketId
    } else {
      hostId = null;
    }

    if (socket.id == getCurrentPlayerSocketId(turn, teams)) {
      passTurn(turn, teams)
    }
  });
});
