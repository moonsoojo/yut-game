import { Server } from "socket.io";
import initialState from "./initialState.js";
import { move } from "./src/move.js";
import { score } from "./src/score.js";
import { getCurrentPlayerSocketId, movesIsEmpty, clearMoves } from "./src/helpers.js";

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
/* schema
[
  { 
    name: '',
    message: ''
  }
]
*/
let messages = []

let test = false;
if (test) {
  gamePhase = "game"
  turn = {
    team: 0,
    players: [0,0]
  }
  // teams[1].moves['4'] = 1
  // teams[0].pieces[0] = null;
  teams[0].pieces[1] = null;
  teams[1].pieces[0] = "scored";
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

function onConnect(socket) {
  if (hostId == null) {
    hostId = socket.id
  }

  io.emit("tiles", tiles);
  io.emit("selection", selection); // shouldn't be able to select when game is in 'lobby'
  io.emit("messages", messages)

  io.emit("gamePhase", gamePhase);
  io.emit("readyToStart", readyToStart);

  let newPlayer = JSON.parse(JSON.stringify(initialState.player));
  let newTeam = assignTeam(teams)
  newPlayer.team = newTeam
  newPlayer.displayName = makeId(5)
  // newPlayer.displayName = name
  newPlayer.socketId = socket.id
  newPlayer.yutsAsleep = false
  newPlayer.visibility = true
  newPlayer.thrown = false
  newPlayer.reset = false
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

  if (countPlayers2(players) >= 2) {
    readyToStart = true;
    io.to(hostId).emit("readyToStart", readyToStart)
  }

  io.emit("teams", teams);
  io.emit("turn", turn);
  io.emit("players", players)
}

io.on("connection", (socket) => { // socket.handshake.query is data obj
  console.log("a user connected", socket.id); 

  onConnect(socket);

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

  // socket.on("submitName", ({ name }, callback) => {
  //   if (hostId == null) {
  //     hostId = socket.id
  //   }
  
  //   io.emit("tiles", tiles);
  //   io.emit("selection", selection); // shouldn't be able to select when game is in 'lobby'
  //   io.emit("messages", messages)
  
  //   io.emit("gamePhase", gamePhase);
  //   io.emit("readyToStart", readyToStart);
  
  //   let newPlayer = JSON.parse(JSON.stringify(initialState.player));
  //   let newTeam = assignTeam(teams)
  //   newPlayer.team = newTeam
  //   // newPlayer.displayName = makeId(5)
  //   newPlayer.displayName = name
  //   newPlayer.socketId = socket.id
  //   newPlayer.yutsAsleep = false
  //   newPlayer.visibility = true
  //   newPlayer.thrown = false
  //   teams[newTeam].players.push(newPlayer)
  //   io.to(socket.id).emit("setUpPlayer", {player: newPlayer})
  //   players[socket.id] = newPlayer
  
  //   if (waitingToPass) {
  //     if (teams[0].players.length > 0 && teams[1].players.length > 0) {
  //       turn = passTurn(turn, teams)
  //       players[getCurrentPlayerSocketId(turn, teams)].thrown = false;
  //       teams[turn.team].throws++;
  //     }
  //   }
  
  //   if (countPlayers2(players) >= 2) {
  //     readyToStart = true;
  //     io.to(hostId).emit("readyToStart", readyToStart)
  //   }
  
  //   io.emit("teams", teams);
  //   io.emit("turn", turn);
  //   io.emit("players", players)

  //   callback({
  //     status: "success",
  //     clientPlayer: newPlayer
  //   })
  // })

  // socket.on("localStoragePlayer", ({ player }, callback) => {
  //   if (hostId == null) {
  //     hostId = socket.id
  //   }
  
  //   io.emit("tiles", tiles);
  //   io.emit("selection", selection); // shouldn't be able to select when game is in 'lobby'
  //   io.emit("messages", messages)
  
  //   io.emit("gamePhase", gamePhase);
  //   io.emit("readyToStart", readyToStart);

  //   // console.log("[localStoragePlayer] teams", teams)
    
  //   player.socketId = socket.id
  //   console.log("[localStoragePlayer] player", player)
  
  //   teams[player.team].players.push(player)
  //   io.to(socket.id).emit("setUpPlayer", {player})
  //   players[socket.id] = player
  
  //   if (waitingToPass) {
  //     if (teams[0].players.length > 0 && teams[1].players.length > 0) {
  //       turn = passTurn(turn, teams)
  //       players[getCurrentPlayerSocketId(turn, teams)].thrown = false;
  //       teams[turn.team].throws++;
  //     }
  //   }
  
  //   if (countPlayers2(players) >= 2) {
  //     readyToStart = true;
  //     io.to(hostId).emit("readyToStart", readyToStart)
  //   }
  
  //   io.emit("teams", teams);
  //   io.emit("turn", turn);
  //   io.emit("players", players)

  //   callback({
  //     status: "success",
  //     player: player
  //   })
  // })

  socket.on("sendMessage", ({ message, team, socketId }) => {
    messages.push({
      "name": players[socketId].displayName,
      team,
      message
    })
    console.log("[sendMessage]", messages)
    // display should start from the bottom, and get pushed up on new messages
    io.emit("messages", messages)
  })

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
      if (socketId === getCurrentPlayerSocketId(turn, teams)) {
        if (players[socketId].reset) {
          players[socketId].reset = false
          callback({
            status: "reset"
          })
        } else if (players[socketId].thrown == true) {
          callback({
            status: "record"
          })
        } 
      } else {
        callback({
          status: "noRecord"
        })
      }
    } 
    io.emit("players", players)
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
    console.log("[passTurnPregame] moves in team 0", teams[0].moves)
    console.log("[passTurnPregame] moves in team 1", teams[1].moves)
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

    if ((teams[turn.team].throws == 0)) {
      if (movesIsEmpty(teams[turn.team].moves)) {
        teams[turn.team].moves = clearMoves(teams[turn.team].moves)
        if (teams[0].players.length > 0 && teams[1].players.length > 0) {
          turn = passTurn(turn, teams)
          teams[turn.team].throws++;
        } else {
          waitingToPass = true
        }
      }
    }

    io.emit("tiles", tiles);
    io.emit("teams", teams);
    io.emit("turn", turn);
  });

  socket.on("score", ({selection, moveInfo}) => {
    [tiles, teams] = score(tiles, teams, selection.tile, moveInfo.move, moveInfo.path, selection.pieces)
    if (teams[turn.team].throws == 0) {
      if (movesIsEmpty(teams[turn.team].moves)) {
        teams[turn.team].moves = clearMoves(teams[turn.team].moves)
        turn = passTurn(turn, teams)
        teams[turn.team].throws++;
      }
    }
    io.emit("tiles", tiles);
    io.emit("teams", teams);
    io.emit("turn", turn);
    io.emit("players", players)
  });

  function allYutsAsleep(players) {
    let flag = true;
    for (const socketId of Object.keys(players)) {
      if (players[socketId].visibility && !players[socketId].yutsAsleep) {
        flag = false;
      }
    }
    console.log("[allYutsAsleep]", flag)
    return flag
  }

  // if player throws, at least one player's visibility is true
  socket.on("throwYuts", ({socketIdThrower}) => {
    let positionsInHand = JSON.parse(JSON.stringify(initialState.initialYutPositions))
    let rotations = JSON.parse(JSON.stringify(initialState.initialYutRotations))

    // for players
      // if screen is visible and yuts are not asleep
        // return "not reaedy"
    // throw

    // should also check if screen is visible
    // bro went to another screen
    if (players[socketIdThrower].yutsAsleep && 
      teams[turn.team].throws > 0 && 
      teams[turn.team].players[turn.players[turn.team]].socketId === socketIdThrower &&
      allYutsAsleep(players)) {

      teams[turn.team].throws--;
      io.emit("teams", teams);

      players[socketIdThrower].thrown = true;

      const yutForceVectors = [];
      for (const socketId of Object.keys(players)) {
        if (players[socketId].visibility) {
          for (let i = 0; i < 4; i++) {
            yutForceVectors.push({
              rotation: rotations[i],
              yImpulse: generateRandomNumberInRange(0.7, 0.2),
              torqueImpulse: {
                x: generateRandomNumberInRange(0.008, 0.004),
                y: generateRandomNumberInRange(0.05, 0.04),
                z: generateRandomNumberInRange(0.006, 0.003),
              },
              positionInHand: positionsInHand[i],
            });

            // hard throw
            // yutForceVectors.push({
            //   rotation: rotations[i],
            //   yImpulse: generateRandomNumberInRange(0.7, 0.2),
            //   torqueImpulse: {
            //     x: generateRandomNumberInRange(0.002, 0.001),
            //     y: generateRandomNumberInRange(0.3, 0.2),
            //     z: generateRandomNumberInRange(0.06, 0.03),
            //   },
            //   positionInHand: positionsInHand[i],
            // });
          }
          io.to(socketId).emit("throwYuts", yutForceVectors);
          players[socketId].yutsAsleep = false;
        }
      }
      io.emit("players", players);
    }
  });

  socket.on("resetYuts", ({ socketIdEmitter }) => {
    console.log("[resetYuts]")
    if (socketIdEmitter === getCurrentPlayerSocketId(turn, teams)) {
      teams[turn.team].throws++

      let positionsInHand = JSON.parse(JSON.stringify(initialState.resetYutPositions))
      let rotations = JSON.parse(JSON.stringify(initialState.initialYutRotations))

      for (const socketId of Object.keys(players)) {
        if (players[socketId].visibility) {
          players[socketId].yutsAsleep = false;
          if (socketId === socketIdEmitter) {
            players[socketId].reset = true;
          }
        }
      }

      io.emit("players", players)
      io.emit("teams", teams)
  
      // reset yuts
      for (const socketId of Object.keys(players)) {
        if (players[socketId].visibility) {
          const yutForceVectors = [];
          for (let i = 0; i < 4; i++) {
            yutForceVectors.push({
              positionInHand: positionsInHand[i],
              rotation: rotations[i],
              yImpulse: 0,
              torqueImpulse: {
                x: 0,
                y: 0,
                z: 0,
              },
            });
          }
          io.to(socketId).emit("throwYuts", yutForceVectors);
        }
      }
    }
  })

  socket.on("reset", () => {
    let positionsInHand = JSON.parse(JSON.stringify(initialState.initialYutPositions))
    let rotations = JSON.parse(JSON.stringify(initialState.initialYutRotations))

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
        positionInHand: positionsInHand[i],
        rotation: rotations[i],
        yImpulse: 0,
        torqueImpulse: {
          x: 0,
          y: 0,
          z: 0,
        },
        
      });
    }
    io.emit("throwYuts", yutForceVectors);
  });

  socket.on("legalTiles", ({ legalTiles }) => {
    io.emit("legalTiles", { legalTiles })
  })

  function recordThrow({ result, socketId }) {
    console.log("[recordThrow] result", result, "socketId", socketId)
    players[socketId].thrown = false;
    
    if (gamePhase === "pregame") {
      teams[turn.team].moves[result.toString()]++
      result = passTurnPregame(turn, teams, gamePhase)
      turn = result.turn
      teams = result.teams
      gamePhase = result.gamePhase
      teams[turn.team].throws++;
      io.emit("turn", turn)
      io.emit("gamePhase", gamePhase)
    } else if (gamePhase === "game") {
      teams[turn.team].moves[result.toString()]++
      if (movesIsEmpty(teams[turn.team].moves)) {
        teams[turn.team].moves = clearMoves(teams[turn.team].moves)
        turn = passTurn(turn, teams)
        teams[turn.team].throws++;
        io.emit("turn", turn)
      } else if (result == 4 || result == 5) {
        teams[turn.team].throws++;
      }
    }
    io.emit("teams", teams)
    io.emit("players", players)
  }

  socket.on("recordThrow", ({result, socketId}) => {
    recordThrow({ result, socketId })
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
      // players[getCurrentPlayerSocketId(turn, teams)].thrown = false;
      io.emit("turn", turn)
      io.emit("players", players)
    }
  });
});
