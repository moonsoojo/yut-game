import { Server } from "socket.io";
import initialState from "./initialState.js";
import { move } from "./src/move.js";
import { score } from "./src/score.js";
import { getCurrentPlayerSocketId, movesIsEmpty } from "./src/helpers.js";

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
let tiles = JSON.parse(JSON.stringify(initialState.tiles));
let teams = JSON.parse(JSON.stringify(initialState.teams));
let turn = JSON.parse(JSON.stringify(initialState.turn));
let numClientsYutsResting = initialState.numClientsYutsResting;
let clientYutResults = [];
let gamePhase = JSON.parse(JSON.stringify(initialState.gamePhase)); // possible values: "lobby", "pregame", "game"=
let hostId = null;
const characters = [];
let throwInProgress = false;
let readyToStart = false;
let showReset = false;

let test = false;
if (test) {
  gamePhase = "game"
  turn = {
    team: 0,
    players: [0,0]
  }
  teams[0].moves["2"] = 1
  teams[0].moves["4"] = 1
  teams[0].pieces[0] = null;
  tiles[19] = [{tile: 19, team: 0, id: 0, history: [17, 18]}]
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

function assignTeam(teams) {
  if (countPlayers(teams) == 0) {
    return getRandomInt(2);
  } else if (countPlayers(teams) == 1) {
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].players.length == 0) {
        return i
      }
    }
  } else {
    if (teams[0].players.length > teams[1].players.length) {
      return 1
    } else if (teams[0].players.length < teams[1].players.length) {
      return 0
    } else {
      return getRandomInt(2);
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

  return turn
}

function allTeamsHaveMove(teams) {
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

io.on("connection", (socket) => { // socket.handshake.query is data obj
  console.log("a user connected"); 
  characters.push({
    id: socket.id,
    position: generateRandomPosition(),
    color: generateRandomHexColor(),
  });

  if (hostId == null) {
    hostId = socket.id
  }
  
  // when the client loads, load server state
  io.emit("characters", characters); // this should be refactored
  io.emit("tiles", tiles);
  io.emit("selection", selection); // shouldn't be able to select when game is in 'lobby'
  io.emit("teams", teams);
  io.emit("turn", turn);
  io.emit("gamePhase", gamePhase);
  // io.to(socket.id).emit("socketId", socket.id);
  // console.log("[connect] socket.handshake.query", socket.handshake.query)
  // if (socket.handshake.query.player === 'null') {
  //   // nothing
  // } else {
  //   let player = JSON.parse(socket.handshake.query.player)    
  //   player.socketId = socket.id
  //   io.emit("setUpPlayer", {player})
  //   teams[player['team']].players.push(player)
  //   io.emit("teams", teams);
  //   if (gamePhase === "lobby" && countPlayers(teams) >= 2) {
  //     readyToStart = true;
  //     io.to(hostId).emit("readyToStart", true);
  //   }
  // }

  socket.on("readyToStart", (flag) => {
    io.to(hostId).emit("readyToStart", flag)
  })

  socket.on("submitName", ({ displayName }) => {
    let newPlayer = JSON.parse(JSON.stringify(initialState.player));
    let newTeam = assignTeam(teams)
    newPlayer.team = newTeam
    newPlayer.displayName = displayName
    newPlayer.socketId = socket.id
    teams[newTeam].players.push(newPlayer)
    io.to(socket.id).emit("setUpPlayer", {player: newPlayer})
    io.emit("teams", teams);
    if (countPlayers(teams) >= 2) {
      readyToStart = true;
      io.to(hostId).emit("readyToStart", true);
    }
  })

  socket.on("startGame", () => {
    readyToStart = false;
    io.to(hostId).emit("readyToStart", readyToStart);
    showReset = true;
    io.to(hostId).emit("showReset", showReset);
    teams[turn.team].throws++;
    io.emit("teams", teams)
    gamePhase = "pregame"
    io.emit("gamePhase", gamePhase);
  })

  function passTurnPregame(turn, teams, gamePhase) {
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
    
    return [turn, teams, gamePhase]
  }

  socket.on("select", (payload) => {
    selection = payload;
    io.emit("select", selection);
  });

  socket.on("move", ({selection, tile, moveInfo}) => {
    [tiles, teams] = move(tiles, teams, selection.tile, tile, moveInfo.move, moveInfo.history, selection.pieces)

    if (!throwInProgress && (teams[turn.team].throws == 0 && movesIsEmpty(teams[turn.team].moves))) {
      turn = passTurn(turn, teams)
      teams[turn.team].throws++;
      throwInProgress = false
      io.emit("throwInProgress", throwInProgress)
    }

    io.emit("tiles", tiles);
    io.emit("teams", teams);
    io.emit("turn", turn);
  });

  socket.on("score", ({selection, moveInfo}) => {
    [tiles, teams] = score(tiles, teams, selection.tile, moveInfo.move, moveInfo.path, selection.pieces)
    if (!throwInProgress && (teams[turn.team].throws == 0 && movesIsEmpty(teams[turn.team].moves))) {
      turn = passTurn(turn, teams)
      teams[turn.team].throws++;
      throwInProgress = false
      io.emit("throwInProgress", throwInProgress)
    }
    io.emit("tiles", tiles);
    io.emit("teams", teams);
    io.emit("turn", turn);
  });

  let positionsInHand = JSON.parse(JSON.stringify(initialState.initialYutPositions))
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
        yImpulse: generateRandomNumberInRange(0.3, 0.02),
        torqueImpulse: {
          x: generateRandomNumberInRange(0.0001, 0.0001),
          y: generateRandomNumberInRange(0.01, 0.01),
          z: generateRandomNumberInRange(0.0005, 0.005),
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
    // if num matches numPlayers
    // send message to host: "all yuts resting"
    // in Experience, only display "start game" if "all yuts resting"
    // if gamePhase === "lobby" and "all yuts resting" is false, 
      // display "resetting..."
  })

  socket.on("reset", () => {
    tiles = JSON.parse(JSON.stringify(initialState.tiles))
    teams[0].pieces = JSON.parse(JSON.stringify(initialState.teams))[0].pieces
    teams[0].moves = JSON.parse(JSON.stringify(initialState.teams))[0].moves
    teams[0].throws = 0
    teams[1].pieces = JSON.parse(JSON.stringify(initialState.teams))[1].pieces
    teams[1].moves = JSON.parse(JSON.stringify(initialState.teams))[1].moves
    teams[1].throws = 0
    gamePhase = "lobby"
    io.emit("reset", {
      tiles: tiles,
      selection: null,
      gamePhase,
      teams
    });
    if (countPlayers(teams) >= 2) {
      readyToStart = true;
    } else {
      readyToStart = false;
    }
    io.to(hostId).emit("readyToStart", readyToStart);
    showReset = false;
    io.emit("showReset", showReset);

    // reset yuts
    const yutForceVectors = [];
    for (let i = 0; i < 4; i++) {
      yutForceVectors.push({
        rotation: JSON.parse(JSON.stringify(initialState.initialYutRotations[i])),
        yImpulse: 0,
        torqueImpulse: {
          x: 0,
          y: 0,
          z: 0,
        },
        positionInHand: positionsInHand[i],
      });
    }
    io.emit("throwYuts", yutForceVectors);
  });

  socket.on("legalTiles", ({ legalTiles }) => {
    io.emit("legalTiles", { legalTiles })
  })

  socket.on("bonusThrow", () => {
    if (clientYutResults.length == characters.length && checkThrowResultsMatch(clientYutResults)) {
      teams[turn.team].throws++;
      io.emit("teams", teams)
    }
  })

  socket.on("recordThrow", (result) => {
    clientYutResults.push(result);
    if (clientYutResults.length == characters.length && checkThrowResultsMatch(clientYutResults) && gamePhase !== "lobby") {
      teams[turn.team].moves[result.toString()]++
      if (gamePhase === "pregame") {
        [turn, teams, gamePhase] = passTurnPregame(turn, teams, gamePhase)
        teams[turn.team].throws++;
        io.emit("turn", turn)
        io.emit("teams", teams)
        io.emit("gamePhase", gamePhase)
      } else {
        io.emit("teams", teams)
      }
      throwInProgress = false;
      io.emit("throwInProgress", false);
    }
  })

  socket.on("throwInProgress", (flag) => {
    throwInProgress = flag;
    io.emit("throwInProgress", flag)
  })

  socket.on("teams", (newTeams) => {
    console.log("newTeams", JSON.stringify(newTeams))
    teams = newTeams
    io.emit("teams", teams)
  })

  socket.on("disconnect", () => {
    console.log("user disconnected");

    characters.splice(
      characters.findIndex((characters) => characters.id === socket.id),
      1
    );

    teams = removePlayerFromGame(teams, socket.id)
    console.log('[disconnect] teams', teams)
    io.emit("characters", characters);
    io.emit("teams", teams)

    if (countPlayers(teams) > 0) {
      hostId = findRandomPlayer(teams).socketId
    } else {
      hostId = null;
    }

    if (countPlayers(teams) < 2) {
      readyToStart = false;
      io.to(hostId).emit("readyToStart", readyToStart);
    }

    if (socket.id == getCurrentPlayerSocketId(turn, teams)) {
      passTurn(turn, teams)
    }
  });
});
