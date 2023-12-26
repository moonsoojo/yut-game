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
let clients = {}
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

let test = true;
if (test) {
  gamePhase = "game"
  turn = {
    team: 1,
    players: [0,0]
  }
  // teams[0].moves['1'] = 1
  // teams[0].pieces[0] = null;
  // teams[0].pieces[1] = null;
  // teams[0].pieces[2] = null;
  teams[1].pieces[0] = null;
  teams[1].pieces[1] = null;
  // teams[1].pieces[2] = 'scored';
  // teams[1].pieces[3] = 'scored';
  teams[1].throws = 1;
  tiles[8] = [
    { tile: 10, team: 0, id: 0,  history: [0, 1]},
    { tile: 10, team: 0, id: 1,  history: [0, 1]},
  ]
  // tiles[10] = [
  //   { tile: 10, team: 1, id: 0,  history: [8,9]},
  // ]
  // tiles[17] = [
  //   { tile: 17, team: 0, id: 2,  history: [15,16]},
  // ]
  // displayPiecesOnTiles(0);
  // displayPiecesOnTiles(1);
}

function displayPiecesOnTiles(team) {
  if (team == 0) {
    tiles[1] = [{ tile: 1, team: 0, id: 0, history: []}, { tile: 1, team: 0, id: 1,  history: []}, { tile: 1, team: 0, id: 2,  history: []}]
    tiles[5] = [{ tile: 1, team: 0, id: 0, history: []}, { tile: 1, team: 0, id: 1,  history: []}, { tile: 1, team: 0, id: 2,  history: []}]
    tiles[10] = [{ tile: 1, team: 0, id: 0, history: []}, { tile: 1, team: 0, id: 1,  history: []}, { tile: 1, team: 0, id: 2,  history: []}]
    tiles[15] = [{ tile: 1, team: 0, id: 0, history: []}, { tile: 1, team: 0, id: 1,  history: []}, { tile: 1, team: 0, id: 2,  history: []}]
    tiles[0] = [{ tile: 1, team: 0, id: 0, history: []}, { tile: 1, team: 0, id: 1,  history: []}, { tile: 1, team: 0, id: 2,  history: []}]
    tiles[22] = [{ tile: 1, team: 0, id: 0, history: []}, { tile: 1, team: 0, id: 1,  history: []}, { tile: 1, team: 0, id: 2,  history: []}]
  } else if (team == 1) {
    tiles[1] = [{ tile: 1, team: 1, id: 0, history: []}, { tile: 1, team: 1, id: 1,  history: []}, { tile: 1, team: 1, id: 2,  history: []}]
    tiles[5] = [{ tile: 1, team: 1, id: 0, history: []}, { tile: 1, team: 1, id: 1,  history: []}, { tile: 1, team: 1, id: 2,  history: []}]
    tiles[10] = [{ tile: 1, team: 1, id: 0, history: []}, { tile: 1, team: 1, id: 1,  history: []}, { tile: 1, team: 1, id: 2,  history: []}]
    tiles[15] = [{ tile: 1, team: 1, id: 0, history: []}, { tile: 1, team: 1, id: 1,  history: []}, { tile: 1, team: 1, id: 2,  history: []}]
    tiles[0] = [{ tile: 1, team: 1, id: 0, history: []}, { tile: 1, team: 1, id: 1,  history: []}, { tile: 1, team: 1, id: 2,  history: []}]
    tiles[22] = [{ tile: 1, team: 1, id: 0, history: []}, { tile: 1, team: 1, id: 1,  history: []}, { tile: 1, team: 1, id: 2,  history: []}]
  }
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
    let randomTeam = getRandomInt(2)
    if (teams[randomTeam].players.length > 0) {
      let randomPlayer = getRandomInt(teams[randomTeam].players.length)
      return teams[randomTeam].players[randomPlayer]
    } else {
      if (randomTeam == 0) {
        randomTeam = 1
      } else {
        randomTeam = 0
      }
      let randomPlayer = getRandomInt(teams[randomTeam].players.length)
      return teams[randomTeam].players[randomPlayer]
    }
}

function onConnect(socket, storageClient) {

  storageClient = JSON.parse(storageClient);
  // game state
  io.emit("tiles", tiles);
  io.emit("selection", selection); // shouldn't be able to select when game is in 'lobby'
  io.emit("messages", messages)
  io.emit("gamePhase", gamePhase);
  io.emit("turn", turn)

  let client = {}
  client.socketId = socket.id
  client.name = makeId(5)
  client.yutsAsleep = false
  client.visibility = true
  client.thrown = false
  client.reset = false
  
  console.log("[onConnect] storageClient", storageClient)
  if (storageClient !== null) {
    client.team = storageClient.team
    client.name = storageClient.name
    teams[storageClient.team].players.push(client)
    // io.emit("teams", teams);
  }
  console.log("[onConnect] client", client)
  io.to(socket.id).emit('setUpClient', client)
  clients[socket.id] = JSON.parse(JSON.stringify(client))
  io.emit("clients", clients)
  io.emit("teams", teams);

  if (hostId == null) {
    hostId = socket.id
  }
}

io.on("connection", (socket) => { // socket.handshake.query is data obj
  console.log("a user connected", socket.id)

  // spectator
  // need parse & stringify to avoid keys as list of numbers
  onConnect(
    socket, 
    JSON.parse(JSON.stringify(JSON.parse(socket.handshake.query.client)))
  );

  socket.on("join", ({ team, name }, callback) => {
    clients[socket.id].team = team
    clients[socket.id].name = name
    teams[team].players.push(clients[socket.id])
    clients[socket.id].thrown = false
    let updatedClient = JSON.parse(JSON.stringify(clients[socket.id]))
    if (hostId == null) {
      hostId = socket.id
    }
  
    io.to(socket.id).emit("setUpClient", updatedClient)
    io.emit("clients", clients);
    io.emit("teams", teams);
    io.emit("turn", turn);

    if (teams[0].players.length > 0 && teams[1].players.length > 0 && allYutsAsleep(clients)) {
      readyToStart = true;
      io.to(hostId).emit(readyToStart);
    }
    callback({
      status: "success",
      client: updatedClient
    })
  })

  socket.on("sendMessage", ({ message, team }) => {
    messages.push({
      "name": clients[socket.id].name,
      team,
      message
    })
    // display should start from the bottom, and get pushed up on new messages
    io.emit("messages", messages)
  })

  socket.on("visibilityChange", ({flag}) => {
    if (clients[socket.id] != undefined) {
      clients[socket.id].visibility = flag
      clients[socket.id].visibility = flag
      if (flag == false) {
        clients[socket.id].participating = false
        clients[socket.id].participating = false
      }
      io.emit("clients", clients);
    }
  })

  socket.on("yutsAsleep", ({flag}, callback) => {
    clients[socket.id].yutsAsleep = flag
    if (gamePhase === "lobby" && (teams[0].players.length > 0 && teams[1].players.length > 0) && allYutsAsleep(clients)) {
      readyToStart = true;
      io.to(hostId).emit("readyToStart", readyToStart);
    } else if (gamePhase !== "lobby") {
      if (socket.id === getCurrentPlayerSocketId(turn, teams)) {
        if (clients[socket.id].reset) {
          clients[socket.id].reset = false
          callback({
            status: "reset"
          })
        } else if (clients[socket.id].thrown == true) {
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
    io.emit("clients", clients);
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
  });

  function allYutsAsleep(clients) {
    let flag = true;
    for (const socketId of Object.keys(clients)) {
      if (clients[socketId].visibility && !clients[socketId].yutsAsleep) {
        flag = false;
      }
    }
    return flag
  }

  // if player throws, at least one player's visibility is true
  socket.on("throwYuts", () => {
    console.log("[throwYuts]")
    let positionsInHand = JSON.parse(JSON.stringify(initialState.initialYutPositions))
    let rotations = JSON.parse(JSON.stringify(initialState.initialYutRotations))

    console.log("[throwYuts] current player socket id", teams[turn.team].players[turn.players[turn.team]].socketId)
    console.log("[throwYuts] emitter socket id", socket.id)
    console.log("[throwYuts] teams", JSON.stringify(teams))
    if (clients[socket.id].yutsAsleep && 
      teams[turn.team].throws > 0 && 
      teams[turn.team].players[turn.players[turn.team]].socketId === socket.id &&
      allYutsAsleep(clients)) {

      teams[turn.team].throws--;
      io.emit("teams", teams);

      clients[socket.id].thrown = true;

      const yutForceVectors = [];
      for (const socketId of Object.keys(clients)) {
        if (clients[socketId].visibility) {
          for (let i = 0; i < 4; i++) {
            yutForceVectors.push({
              rotation: rotations[i],
              yImpulse: generateRandomNumberInRange(0.4, 0.1),
              torqueImpulse: {
                x: generateRandomNumberInRange(0.005, 0.003),
                y: generateRandomNumberInRange(0.03, 0.02),
                z: generateRandomNumberInRange(0.003, 0.001),
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
          clients[socketId].yutsAsleep = false;
        }
      }
      io.emit("clients", clients);
    }
  });

  socket.on("resetYuts", ({ socketIdEmitter }) => {
    if (socketIdEmitter === getCurrentPlayerSocketId(turn, teams)) {
      teams[turn.team].throws++

      let positionsInHand = JSON.parse(JSON.stringify(initialState.resetYutPositions))
      let rotations = JSON.parse(JSON.stringify(initialState.initialYutRotations))

      for (const socketId of Object.keys(clients)) {
        if (clients[socketId].visibility) {
          clients[socketId].yutsAsleep = false;
          if (socketId === socketIdEmitter) {
            clients[socketId].reset = true;
          }
        }
      }

      io.emit("clients", clients)
      io.emit("teams", teams)
  
      // reset yuts
      for (const socketId of Object.keys(clients)) {
        if (clients[socketId].visibility) {
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

  socket.on("recordThrow", ({result}) => {
    clients[socket.id].thrown = false;
    
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
    io.emit("clients", clients)
  })

  socket.on("throwInProgress", (flag) => {
    throwInProgress = flag;
    io.emit("throwInProgress", flag)
  })

  socket.on("readyToStart", (value) => {
    readyToStart = value
    io.to(hostId).emit("readyToStart", readyToStart)
  })

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);

    teams = removePlayerFromGame(teams, socket.id)
    io.emit("teams", teams)

    delete clients[socket.id];
    io.emit("clients", clients)

    if (countPlayers(teams) < 2) {
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
      clients[getCurrentPlayerSocketId(turn, teams)].thrown = false;
      io.emit("turn", turn)
      io.emit("clients", clients)
    }
  });
});
