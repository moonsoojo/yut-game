// import { Server } from "socket.io";
import initialState from "./initialState.js";
import { move } from "./src/move.js";
import { score } from "./src/score.js";
import { getCurrentPlayerSocketId, movesIsEmpty, clearMoves } from "./src/helpers.js";

import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import router from './router.js'; // needs .js suffix
import cors from 'cors';

import { addUser, removeUser, getUser, getUsersInRoom } from './users.js';
import { addRoom, addSpectator, getUserFromRoom, getSpectatorFromRoom, addPlayer, getRoom, removeUserFromRoom, countPlayers, deleteRoom, addThrow, updateHostId, addClient, updateReadyToStart, getHostId, updateGamePhase, updateYootsAsleep, getCurrentPlayerId, getThrown, isAllYootsAsleep, getGamePhase, isReadyToStart, updateClients, getClients, updateThrown } from './rooms.js';
import { v4 as uuidv4 } from 'uuid';
import { allYootsAsleep } from "../client/src/helpers/helpers.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173", 
      "http://192.168.86.158:5173", // home
      "http://192.168.1.181:5173", // home 2
      "https://master.dh445c3qmwe4t.amplifyapp.com"
    ],
  },
});

const PORT = process.env.PORT || 5000

app.use(router);
app.use(cors());

server.listen(PORT, () => console.log(`server has started on port ${PORT}`))

let test = false;
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

function findRandomPlayer(teams) {
  let randomTeam = getRandomInt(2)
  let randomPlayerIndex;
  let randomPlayer;
  if (teams[randomTeam].players.length > 0) {
    randomPlayerIndex = getRandomInt(teams[randomTeam].players.length)
    randomPlayer = teams[randomTeam].players[randomPlayerIndex]
  } else {
    if (randomTeam == 0) {
      randomTeam = 1
    } else {
      randomTeam = 0
    }
    randomPlayerIndex = getRandomInt(teams[randomTeam].players.length)
    randomPlayer = teams[randomTeam].players[randomPlayerIndex]
  }
  console.log("[findRandomPlayer]", randomPlayer)
  return randomPlayer
}

io.on("connect", (socket) => { // socket.handshake.query is data obj

  let roomId = '';
  // console.log("[connect]", socket.handshake.query)
  socket.on("createRoom", ({ id }, callback) => {
    
    const response = addRoom({ id })
    if (response.error) {
      return callback({ roomId: id, error: response.error })
    }
    return callback({ roomId: id })
  })

  socket.on("joinRoom", ({ id, savedClient }, callback) => {
    console.log("[joinRoom]", id)
    roomId = id
    console.log("[joinRoom] room", roomId, "savedClient", savedClient)

    if (!savedClient) {

      let name = makeId(5)
      const { spectator } = addSpectator({ id: socket.id, name, room: roomId })

      socket.emit("client", spectator)

      // sends only to the socket's client
      socket.emit("message", { user: 'admin', text: `${spectator.name}, welcome to the room ${spectator.room}`})
      socket.broadcast.to(spectator.room).emit('message', { user: 'admin', text: `${spectator.name} has joined!`})
      socket.join(spectator.room);
      let client = {
        ...spectator,
        visibility: true,
        yootsAsleep: false,
        thrown: false
      }
      let room = getRoom(spectator.room)
      addClient(spectator.room, client)
      io.to(spectator.room).emit('room', room)

      callback('join room without savedClient success')
  
    } else {
      // join team

      const savedPlayer = {
        ...JSON.parse(socket.handshake.query.client),
        id: socket.id,
        room: roomId
      }
      const addedPlayer = addPlayer({ player: savedPlayer })
      socket.emit("client", addedPlayer)

      socket.emit("message", { user: 'admin', text: `${addedPlayer.name}, welcome back to the room ${addedPlayer.room}`})
      console.log("[joinRoom] addedPlayer", addedPlayer)
      socket.join(addedPlayer.room);
      io.to(addedPlayer.room).emit('room', getRoom(addedPlayer.room))
      socket.broadcast.to(addedPlayer.room).emit(
        'message', 
        { 
          user: 'admin', 
          text: `${addedPlayer.name} has joined ${addedPlayer.team === 0 ? "the Rockets" : "the UFOs"}!`
        }
      )

      let client = {
        ...addedPlayer,
        visibility: true,
        yootsAsleep: false,
        thrown: false,
        participating: false
      }
      let room = getRoom(roomId)
      addClient(roomId, client)
      io.to(roomId).emit('room', room)

      let hostId = room.hostId
      console.log("[joinRoom] hostId", hostId)
      if (hostId == null) { // if there's no host, there's only one player
        updateHostId(roomId, socket.id)
      } else {
        if (isReadyToStart(roomId)) {
          updateReadyToStart(roomId, true)
          io.to(hostId).emit("readyToStart", true);
        }
      }
      
      callback('join room with savedClient success')
    }
  })

  socket.on("joinTeam", ({ team, name, room }, callback) => {

    const spectator = removeUserFromRoom({ id: socket.id, room })
    const player = {
      ...spectator,
      team,
      name
    }

    const addedPlayer = addPlayer({ player })

    console.log("[joinTeam] addedPlayer", addedPlayer)

    socket.emit("client", addedPlayer)

    io.to(addedPlayer.room).emit('room', getRoom(addedPlayer.room))
    socket.broadcast.to(addedPlayer.room).emit(
      'message', 
      { 
        user: 'admin', 
        text: `${addedPlayer.name} has joined ${addedPlayer.team === 0 ? "the Rockets" : "the UFOs"}!`
      }
    )

    let hostId = getRoom(roomId).hostId
    if (hostId == null) { // if there's no host, there's only one player
      hostId = socket.id
    } else {
      if (isReadyToStart(roomId)) {
        updateReadyToStart(roomId, true)
        io.to(hostId).emit("readyToStart", true);
      }
    }

    callback({ response: 'ok', player: addedPlayer });
  })

  socket.on("sendMessage", ({ message, roomId }, callback) => {
    let room = getRoom(roomId)
    console.log('[sendMessage] room', room)
    if (!room) {
      callback({ error: 'no room with id' + roomId })
    } else {
      const { response, user } = getUserFromRoom({ id: socket.id, roomId });
  
      if (response.status === 'error') {
        return callback({ error: response.message })
      } else {
        io.to(roomId).emit('message', { user: user.name, text: message, team: user.team });
        callback();
      }
    }
  })

  socket.on("visibilityChange", ({flag}) => {
    let room = getRoom(roomId)
    if (room) {
      let clients = room.clients
      if (clients[socket.id] != undefined) {
        clients[socket.id].visibility = flag
        if (flag == false) {
          clients[socket.id].participating = false
        }
        updateClients(roomId, clients);
        io.to(roomId).emit("clients", clients);
      }
    }
  })

  socket.on("yootsAsleep", ({flag}, callback) => {
    updateYootsAsleep(roomId, socket.id, flag)
    io.emit("clients", getClients(roomId));

    if (isReadyToStart(roomId)) {
      updateReadyToStart(roomId, true)
      io.to(getHostId(roomId)).emit("readyToStart", true);
    } else if (getGamePhase(roomId) !== "lobby") {
      if (socket.id === getCurrentPlayerId(roomId)) {
        if (getThrown(roomId, socket.id) == true) {
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
  })

  socket.on("startGame", () => {
    updateReadyToStart(roomId, false)
    io.to(roomId).emit("readyToStart", false);
    addThrow(roomId, getRoom(roomId).turn.team)
    io.to(roomId).emit("teams", getRoom(roomId).teams)
    updateGamePhase(roomId, 'pregame')
    io.to(roomId).emit("gamePhase", getRoom(roomId).gamePhase);
  })

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



  // if player throws, at least one player's visibility is true
  socket.on("throwYoots", () => {
    let positionsInHand = JSON.parse(JSON.stringify(initialState.initialYootPositions))
    let rotations = JSON.parse(JSON.stringify(initialState.initialYootRotations))
    if (teams[turn.team].throws > 0 && 
      teams[turn.team].players[turn.players[turn.team]].id === socket.id && 
      // after throw, 
      // turn was passed, but the client was disconnected (tab switch)
      isAllYootsAsleep(roomId)) {

      teams[turn.team].throws--;
      io.emit("teams", teams);

      updateThrown(roomId, socket.id, true)

      let clients = getClients(roomId)
      for (const id of Object.keys(clients)) {
        const yootForceVectors = [];
        if (clients[id].visibility) {
          for (let i = 0; i < 4; i++) {
            yootForceVectors.push({
              rotation: rotations[i],
              yImpulse: generateRandomNumberInRange(0.4, 0.1),
              torqueImpulse: {
                x: generateRandomNumberInRange(0.005, 0.003),
                y: generateRandomNumberInRange(0.03, 0.02),
                z: generateRandomNumberInRange(0.003, 0.001),
              },
              positionInHand: positionsInHand[i],
            });

            /* hard throw
            yootForceVectors.push({
              rotation: rotations[i],
              yImpulse: generateRandomNumberInRange(0.7, 0.2),
              torqueImpulse: {
                x: generateRandomNumberInRange(0.002, 0.001),
                y: generateRandomNumberInRange(0.3, 0.2),
                z: generateRandomNumberInRange(0.06, 0.03),
              },
              positionInHand: positionsInHand[i],
            });*/
          }
          io.to(id).emit("throwYoots", yootForceVectors);
          clients = updateYootsAsleep(roomId, id, false)
        }
      }
      io.emit("clients", clients);
    }
  });

  socket.on("resetYoots", ({ socketIdEmitter }) => {
    if (socketIdEmitter === getCurrentPlayerSocketId(turn, teams)) {
      teams[turn.team].throws++

      let positionsInHand = JSON.parse(JSON.stringify(initialState.resetYootPositions))
      let rotations = JSON.parse(JSON.stringify(initialState.initialYootRotations))

      for (const socketId of Object.keys(clients)) {
        if (clients[socketId].visibility) {
          clients[socketId].yootsAsleep = false;
          if (socketId === socketIdEmitter) {
            clients[socketId].reset = true;
          }
        }
      }

      io.emit("clients", clients)
      io.emit("teams", teams)
  
      // reset yoots
      for (const socketId of Object.keys(clients)) {
        if (clients[socketId].visibility) {
          const yootForceVectors = [];
          for (let i = 0; i < 4; i++) {
            yootForceVectors.push({
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
          io.to(socketId).emit("throwYoots", yootForceVectors);
        }
      }
    }
  })

  socket.on("reset", () => {
    let positionsInHand = JSON.parse(JSON.stringify(initialState.initialYootPositions))
    let rotations = JSON.parse(JSON.stringify(initialState.initialYootRotations))

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

    // reset yoots
    const yootForceVectors = [];
    for (let i = 0; i < 4; i++) {
      yootForceVectors.push({
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
    io.emit("throwYoots", yootForceVectors);
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

  socket.on("disconnect", () => {

    console.log("[disconnect] roomId", roomId)

    let room = getRoom(roomId)
    if (room) {
      const userFromRoom = removeUserFromRoom({ id: socket.id, room: room.id })
      if (userFromRoom.error && userFromRoom.error === "room not found") {
        // nothing happens
      } else {
        // emit the room to everyone in the room
        // tell everyone in the room that user left
        if (countPlayers(room.id) > 0) {
          socket.broadcast.to(room.id).emit('message', { user: 'admin', text: `${userFromRoom.name} has left!`})
          io.to(room.id).emit('room', room)
          if (room.hostId === socket.id) {
            updateHostId(room.id, findRandomPlayer(getRoom(room.id).teams).id)
          }
          if (!isReadyToStart(roomId)) {
            updateReadyToStart(roomId, false)
            io.to(getHostId(room.id)).emit("readyToStart", false)
          }
        } else {
          console.log("[disconnect] room empty")
          deleteRoom(room.id)
          console.log("[disconnect] rooms[roomId]", getRoom(room.id))
        }
      }
    }


    /*

    if (socket.id == getCurrentPlayerSocketId(turn, teams)) {
      turn = passTurn(turn, teams)
      clients[socket.id].thrown = false;
      io.emit("turn", turn)
      io.emit("clients", clients)
    } */
  });
});
