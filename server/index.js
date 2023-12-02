import { Server } from "socket.io";
import initialState from "./initialState.js";
import { move } from "./src/move.js";
import { score } from "./src/score.js";
import { getCurrentPlayerSocketId, movesIsEmpty, getPlayerBySocketId } from "./src/helpers.js";

const io = new Server({
  cors: {
    origin: [
      "http://localhost:5173", 
      "http://192.168.86.158:5173", // home
      "http://192.168.1.181:5173" // home 2
    ],
  },
  pingTimeout: 60000
});

io.listen(3000);

let selection = null;
let tiles = JSON.parse(JSON.stringify(initialState.tiles));
let teams = JSON.parse(JSON.stringify(initialState.teams));
let turn = JSON.parse(JSON.stringify(initialState.turn));
let gamePhase = JSON.parse(JSON.stringify(initialState.gamePhase)); // possible values: "lobby", "pregame", "game"=
let hostId = null;
let readyToStart = false;
let players = {}
let waitingToPass = false;

let test = false;
if (test) {
  gamePhase = "game"
  turn = {
    team: 1,
    players: [0,0]
  }
  teams[1].throws = 1
  teams[1].moves['3'] = 1
  teams[1].moves['4'] = 1
  teams[1].pieces[0] = null;
  tiles[18] = [{tile: 18, team: 1, id: 0, history: [15,16,17]}]
}

const generateRandomNumberInRange = (num, plusMinus) => {
  return num + Math.random() * plusMinus * (Math.random() > 0.5 ? 1 : -1);
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
function countPlayers2(players) {
  return Object.keys(players).length
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

io.on("connection", (socket) => { // socket.handshake.query is data obj
  console.log("a user connected"); 

  if (hostId == null) {
    hostId = socket.id
  }

  io.emit("tiles", tiles);
  io.emit("selection", selection); // shouldn't be able to select when game is in 'lobby'
  
  io.emit("gamePhase", gamePhase);
  io.emit("readyToStart", readyToStart);

  let newPlayer = JSON.parse(JSON.stringify(initialState.player));
  let newTeam = assignTeam(teams)
  newPlayer.team = newTeam
  newPlayer.displayName = makeId(5)
  newPlayer.socketId = socket.id
  newPlayer.yutsAsleep = false
  newPlayer.visibility = true
  // newPlayer.participating = true
  // newPlayer.ready = false
  newPlayer.thrown = false
  teams[newTeam].players.push(newPlayer)
  io.to(socket.id).emit("setUpPlayer", {player: newPlayer})
  players[socket.id] = newPlayer

  if (waitingToPass) {
    if (teams[0].players.length > 0 && teams[1].players.length > 0) {
      turn = passTurn(turn, teams)
      players[getCurrentPlayerSocketId(turn, teams)].thrown = false;
      teams[turn.team].throws++;
    }
  }
  socket.emit("players", players)

  if (countPlayers2(players) >= 2) {
    readyToStart = true;
    io.to(hostId).emit("readyToStart", readyToStart)
  }

  io.emit("teams", teams);
  io.emit("turn", turn);
  io.emit("players", players)

  // socket.on("ready", ({socketId, flag}) => {
  //   players[socketId].ready = flag
  //   let allPlayersReady = true;
  //   for (const socketId of Object.keys(players)) {
  //     if (players[socketId].ready == false) {
  //       allPlayersReady = false;
  //     }
  //   }
  //   if (allPlayersReady) {
  //     readyToStart = true;
  //     io.to(hostId).emit("readyToStart", readyToStart)
  //     for (const socketId of Object.keys(players)) {
  //       players[socketId].participating = true;
  //     }
  //   }
  //   // do emits after all states have changed
  //   io.emit("players", players)
  // })

  socket.on("visibilityChange", ({flag, socketId}) => {
    if (players[socketId] != undefined) {
      players[socketId].visibility = flag
      if (flag == false) {
        players[socketId].participating = false
      }
      io.emit("players", players);
    }
  })

  socket.on("yutsAsleep", ({flag, socketId}, callback) => {
    console.log("[yutsAsleep] flag", flag, "socketId", socketId)
    players[socketId].yutsAsleep = flag
    if (gamePhase === "lobby" && (teams[0].players.length > 0 && teams[1].players.length > 0)) {
      callback({
        status: "readyToStart"
      })
    } else if (gamePhase !== "lobby") {
      if (players[socketId].thrown == true && getCurrentPlayerSocketId(turn, teams) === socketId) {
        callback({
          status: "record"
        })
      } else {
        callback({
          status: "noRecord"
        })
      }
    } 
    io.emit("players", players)
  })

  socket.on("window dimensions", ({width, height}) => {
    console.log("width", width, "height", height)
  })

  socket.on("startGame", () => {
    readyToStart = false;
    io.to(hostId).emit("readyToStart", readyToStart);
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
    
    return {turn, teams, gamePhase}
  }

  socket.on("select", (payload) => {
    selection = payload;
    io.emit("select", selection);
  });

  socket.on("move", ({selection, tile, moveInfo}) => {
    [tiles, teams] = move(tiles, teams, selection.tile, tile, moveInfo.move, moveInfo.history, selection.pieces)

    if ((teams[turn.team].throws == 0 && movesIsEmpty(teams[turn.team].moves))) {
      if (teams[0].players.length > 0 && teams[1].players.length > 0) {
        turn = passTurn(turn, teams)
        players[getCurrentPlayerSocketId(turn, teams)].thrown = false
        teams[turn.team].throws++;
      } else {
        waitingToPass = true
      }
    }

    io.emit("tiles", tiles);
    io.emit("teams", teams);
    io.emit("turn", turn);
    io.emit("players", players)
  });

  socket.on("score", ({selection, moveInfo}) => {
    [tiles, teams] = score(tiles, teams, selection.tile, moveInfo.move, moveInfo.path, selection.pieces)
    if (teams[turn.team].throws == 0 && movesIsEmpty(teams[turn.team].moves)) {
      turn = passTurn(turn, teams)
      players[getCurrentPlayerSocketId(turn, teams)].thrown = false;
      teams[turn.team].throws++;
    }
    io.emit("tiles", tiles);
    io.emit("teams", teams);
    io.emit("turn", turn);
    io.emit("players", players)
  });

  let positionsInHand = JSON.parse(JSON.stringify(initialState.initialYutPositions))
  let rotations = JSON.parse(JSON.stringify(initialState.initialYutRotations))

  socket.on("checkThrowEligible", ({socketId}, callback) => {
    console.log("[checkThrowEligible] players", players);
    let eligible = players[socketId].yutsAsleep ? true: false;
    // if one player can throw, go for it
    // for (const socketId of Object.keys(players)) {
    //   let player = players[socketId]
    //   if (player.visibility == true) {
    //     if (player.yutsAsleep == true) {
    //       // pass
    //     } else {
    //       eligible = false;
    //     }
    //   } // in the use effect in Yuts, ask server if client is visible
    // }
    if (eligible) {
      callback({
        status: "ok"
      })
    } else {
      callback({
        status: "nope"
      })
    }
  })

  socket.on("throwYuts", ({socketIdThrower}) => {
    console.log("throwYuts")
    if (players[socketIdThrower].yutsAsleep && 
      teams[turn.team].throws > 0 && 
      teams[turn.team].players[turn.players[turn.team]].socketId === socketIdThrower) {

      teams[turn.team].throws--;
      io.emit("teams", teams);

      players[socketIdThrower].thrown = true;

      const yutForceVectors = [];
      for (const socketId of Object.keys(players)) {
        if (players[socketId].visibility && players[socketId].yutsAsleep) {
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
          io.to(socketId).emit("throwYuts", yutForceVectors);
        }
      }
      io.emit("players", players);
    }
  });

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

  socket.on("recordThrow", ({result, socketId}) => {
    console.log("[recordThrow] result", result, "socketId", socket.id)
    players[socketId].thrown = false;
    
    if (gamePhase === "pregame") {
      teams[turn.team].moves[result.toString()]++
      result = passTurnPregame(turn, teams, gamePhase)
      turn = result.turn
      teams = result.teams
      gamePhase = result.gamePhase
      teams[turn.team].throws++;
      io.emit("turn", turn)
      io.emit("teams", teams)
      io.emit("gamePhase", gamePhase)
      io.emit("players", players)
    } else if (gamePhase === "game") {
      teams[turn.team].moves[result.toString()]++
      if (result == 4 || result == 5) {
        teams[turn.team].throws++;
      }
      io.emit("teams", teams)
    }
  })

  socket.on("throwInProgress", (flag) => {
    throwInProgress = flag;
    io.emit("throwInProgress", flag)
  })

  socket.on("disconnect", () => {
    console.log("user disconnected");

    teams = removePlayerFromGame(teams, socket.id)
    io.emit("teams", teams)

    delete players[socket.id];
    io.emit("players", players)

    if (Object.keys(players).length < 2) {
      readyToStart = false;
      io.emit("readyToStart", readyToStart)
    }
    
    if (countPlayers(teams) > 0) {
      hostId = findRandomPlayer(teams).socketId
    } else {
      hostId = null;
    }

    if (socket.id == getCurrentPlayerSocketId(turn, teams)) {
      turn = passTurn(turn, teams)
      players[getCurrentPlayerSocketId(turn, teams)].thrown = false;
      io.emit("turn", turn)
      io.emit("players", players)
    }
  });
});
