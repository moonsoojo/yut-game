// import { Server } from "socket.io";
import initialState from "./initialState.js";
import { getCurrentPlayerSocketId } from "./src/helpers.js";

import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import router from './router.js'; // needs .js suffix
import cors from 'cors';

import { addRoom, addSpectator, getUserFromRoom, getSpectatorFromRoom, getReadyToThrow, addPlayer, getRoom, removeUserFromRoom, countPlayers, deleteRoom, addThrow, updateHostId, updateReadyToStart, getHostId, updateGamePhase, updateYootsAsleep, getCurrentPlayerId, getThrown, isAllYootsAsleep, getGamePhase, isReadyToStart, getYoots, updateThrown, getTeams, getTurn, updateVisibility, updateTeams, getYootsAsleep, addMove, updateTurn, updateLegalTiles, getLegalTiles, movesIsEmpty, passTurnPregame, passTurn, clearMoves, updateSelection, getTiles, updateTiles, getSelection, updateReadyToThrow, getThrows, bothTeamsHavePlayers, makeMove, score, countPlayersTeam, getVisibility, joinTeam, getYoot, checkReadyToStart, addYoots, joinTeam2, getRandomPlayer, countSpectators } from './rooms.js';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: [
    //   // "http://localhost:5173", 
    //   // "http://localhost:5174", 
    //   // "http://192.168.86.158:5173", // home
    //   // "http://192.168.1.181:5173", // home 2
    //   // "http://192.168.86.158:5174", // home
    //   // "http://192.168.1.181:5174", // home 2
    //   // "https://master.dh445c3qmwe4t.amplifyapp.com",
    //   // "https://yootgameonline.com",
    //   // "https://www.yootgameonline.com",
    //   // "https://yootgame3d.com",
    //   // "https://www.yootgame3d.com",
    // ],
    origin: "*"
  },
});

const PORT = process.env.PORT || 5000

app.use(router);
app.use(cors());

server.listen(PORT, () => console.log(`server has started on port ${PORT}`))

let test = false;
if (test) {
  const roomId = '1V7'
  addRoom({ id: roomId })

  let teams = JSON.parse(JSON.stringify(initialState.teams))
  let tiles = JSON.parse(JSON.stringify(initialState.tiles))
  
  updateGamePhase(roomId, 'game')
  let turn = {
    team: 0,
    players: [0,0]
  }
  updateTurn(roomId, turn)

  teams[0].moves['2'] = 1
  // teams[0].pieces[0] = null;
  // teams[0].pieces[1] = null;
  // teams[0].pieces[2] = null;

  teams[0].pieces[0] = null;
  teams[0].pieces[1] = null;
  teams[0].pieces[2] = 'scored';
  teams[0].pieces[3] = 'scored';
  teams[1].pieces[0] = null;
  teams[1].pieces[1] = null;
  // teams[1].pieces[2] = 'scored';
  // teams[1].pieces[3] = 'scored';
  updateTeams(roomId, teams)
  
  addThrow(roomId, turn.team)
  tiles[18] = [
    { tile: 18, team: 0, id: 0,  history: [15,16,17]},
    { tile: 18, team: 0, id: 1,  history: [15,16,17]},
  ]
  tiles[4] = [
    { tile: 4, team: 1, id: 0,  history: [0, 1,2,3]},
  ]
  tiles[13] = [
    { tile: 13, team: 1, id: 1,  history: [10,11,12]},
  ]
  updateTiles(roomId, tiles)
  // tiles[10] = [
  //   { tile: 10, team: 1, id: 0,  history: [8,9]},
  // ]
  // tiles[17] = [
  //   { tile: 17, team: 0, id: 2,  history: [15,16]},
  // ]
  // displayPiecesOnTiles(0);
  // displayPiecesOnTiles(1);

  updateReadyToThrow(roomId, true)
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

io.on("connect", (socket) => { 

  let roomId = '';
  socket.on("createRoom", ({ id }, callback) => {
    console.log('[createRoom]')
    // if room with id already exists, it won't add it
    addRoom({ id })
    return callback({ roomId: id })
  })

  socket.on("joinRoom", ({ id, savedClient }) => {
    console.log('[joinRoom] roomId', id)
    roomId = id

    socket.join(roomId);

    // client's yoots are always going to move on load
    updateReadyToThrow(roomId, false)

    addYoots(roomId, socket.id)

    if (!savedClient) {
      // sends only to the socket's client
      socket.emit("message", { 
        user: 'admin', 
        text: `${spectator.randomName}, welcome to the room ${roomId}`
      })
      socket.broadcast.to(roomId).emit('message', { 
        user: 'admin', 
        text: `${spectator.randomName} is spectating`
      })

      let randomName = makeId(5)
      const { spectator } = addSpectator({ room: roomId, id: socket.id, randomName })
      socket.emit("client", spectator)

      io.to(roomId).emit('room', getRoom(spectator.room))       
    } else {
      // join team

      const savedPlayer = {
        ...JSON.parse(socket.handshake.query.client),
        room: roomId,
        id: socket.id,
      }
      addPlayer({ player: savedPlayer })

      socket.emit("message", { 
        user: 'admin', 
        text: `${savedPlayer.name}, welcome back to the room ${savedPlayer.room}`
      })

      const { joinTeam2Error } = joinTeam2({ player: savedPlayer })
      if (joinTeam2Error) {
        return callback({ error: joinTeam2Error })
      }
      emitPlayerJoin({ player: savedPlayer })
    }
  })

  socket.on("joinTeam", ({ team, name }, callback) => {
    const { joinedPlayer, joinTeamError } = joinTeam({ roomId, id: socket.id, name, team })

    if (joinTeamError) {
      return callback({ error: joinTeamError })
    }

    const { joinTeam2Error } = joinTeam2({ player: joinedPlayer })
    if (joinTeam2Error) {
      return callback({ error: joinTeam2Error })
    }
    emitPlayerJoin({ player: joinedPlayer })
  })

  function emitPlayerJoin({ player }) {
    socket.emit("client", player)
    
    const roomId = player.room
    socket.broadcast.to(roomId).emit(
      'message', 
      { 
        user: 'admin', 
        text: `${player.name} has joined ${player.team === 0 ? "the Rockets" : "the UFOs"}!`
      }
    )
    io.to(getHostId(roomId)).emit("readyToStart", checkReadyToStart(roomId));
    io.to(roomId).emit('room', getRoom(roomId))
  }

  socket.on("sendMessage", ({ message, roomId }, callback) => {
    let room = getRoom(roomId)
    if (!room) {
      callback({ error: 'no room with id' + roomId })
    } else {
      const user = getUserFromRoom({ id: socket.id, roomId });
  
      if (user !== undefined) {
        io.to(roomId).emit('message', { user: user.name, text: message, team: user.team });
        callback({});
      } else {
        callback({ error: `user with id ${socket.id} in room ${roomId} not found`})
      }
    }
  })

  /*socket.on("checkDuplicateName", ({ name }, callback) => {
    const { isDuplicate, checkDuplicateNameError } = checkDuplicateName({ roomId, clientId: socket.id, name })
    if (checkDuplicateNameError) {
      return callback({ error: checkDuplicateNameError })
    }
    return callback({ isDuplicate })
  })*/

  // console log not fired when i switched apps in mobile
  socket.on("visibilityChange", (flag, callback) => {
    const { error } = updateVisibility(roomId, socket.id, flag)
    if (error) {
      callback({ response: error })
    } else if (flag === true) {
      const { yootsAsleep, getYootsAsleepError } = getYootsAsleep(roomId, socket.id)
      if (getYootsAsleepError) {
        callback({ response: getYootsAsleepError })
      }
      const { updateYootsAsleepError } = updateYootsAsleep(roomId, socket.id, yootsAsleep)
      if (updateYootsAsleepError) {
        callback({ response: updateYootsAsleepError })
      }
      if (!yootsAsleep) {
        const { updateReadyToThrowError } = updateReadyToThrow(roomId, false)
        if (updateReadyToThrowError) {
          return callback({ error: updateReadyToThrowError })
        }
        io.to(roomId).emit("readyToThrow", false)
      } else {
        const { allYootsAsleep, isAllYootsAsleepError } = isAllYootsAsleep(roomId)
        if (isAllYootsAsleepError) {
          callback({ response: isAllYootsAsleepError})
        }
        if (allYootsAsleep) {
          const { updateReadyToThrowError } = updateReadyToThrow(roomId, true)
          if (updateReadyToThrowError) {
            return callback({ error: updateReadyToThrowError })
          }
          io.to(roomId).emit("readyToThrow", true)
        }
      }
    }
  })

  socket.on("yootsAsleep", ({flag}, callback) => {
    const { updateYootsAsleepError } = updateYootsAsleep(roomId, socket.id, flag)
    if (updateYootsAsleepError) {
      return callback({ error: updateYootsAsleepError })
    }
    const { allYootsAsleep, isAllYootsAsleepError } = isAllYootsAsleep(roomId)
    if (isAllYootsAsleepError) {
      return callback({ error: isAllYootsAsleepError })
    }
    console.log("[yootsAsleep] allYootsAsleep", allYootsAsleep)
    if (allYootsAsleep) {
      const { updateReadyToThrowError } = updateReadyToThrow(roomId, true)
      if (updateReadyToThrowError) {
        return callback({ error: updateReadyToThrowError })
      }
      io.to(roomId).emit("readyToThrow", true)
    }

    if (getGamePhase(roomId) === "lobby") {
      let { readyToStart, isReadyToStartError } = isReadyToStart(roomId)
      if (isReadyToStartError) {
        return callback({ error: isReadyToStartError })
      }
      updateReadyToStart(roomId, readyToStart)
      io.to(getHostId(roomId)).emit("readyToStart", readyToStart);
    } else {
      const { currentPlayerId } = getCurrentPlayerId(roomId)
      console.log("[yootsAsleep] socket id", socket.id, "current player id", currentPlayerId)
      if (socket.id === currentPlayerId) {
        console.log("[yootsAsleep] get thrown", getThrown(roomId, socket.id))
        if (getThrown(roomId, socket.id) == true) {
          callback({
            response: "record"
          })
        } 
      } else {
        callback({
          response: "noRecord"
        })
      }
    } 
  })

  socket.on("startGame", () => {
    updateReadyToStart(roomId, false)
    io.to(roomId).emit("readyToStart", false);
    let room = getRoom(roomId)
    const turn = getTurn(roomId)
    addThrow(roomId, turn.team)
    io.to(roomId).emit("teams", room.teams)
    updateGamePhase(roomId, 'pregame')
    // how does this work? the room changed after I updated the game phase
    io.to(roomId).emit("gamePhase", room.gamePhase);
  })

  socket.on("select", (payload) => {
    updateSelection(roomId, payload)
    console.log("[select] updated selection", getSelection(roomId))
    io.to(roomId).emit("select", payload);
  });

  socket.on("move", ({ destination }, callback) => {
    makeMove(roomId, destination)

    if (getThrows(roomId, getTurn(roomId).team) == 0) {
      if (movesIsEmpty(roomId, getTurn(roomId).team)) {
        clearMoves(roomId, getTurn(roomId).team)
        if (isAllYootsAsleep(roomId)) {
          io.to(roomId).emit("readyToThrow", updateReadyToThrow(roomId, true));
        }
        if (bothTeamsHavePlayers(roomId)) {
          let newTurn = passTurn(roomId)
          // update turn in 'rooms.js'
          addThrow(roomId, getTurn(roomId).team);
          io.to(roomId).emit("turn", newTurn);
        }
      }
    }

    io.to(roomId).emit("teams", getTeams(roomId));
    io.to(roomId).emit("tiles", getTiles(roomId));
  });

  // need to get move from client because there can be multiple
  socket.on("score", ({ selectedMove }) => {
    score(roomId, selectedMove)
    if (getThrows(roomId, getTurn(roomId).team) == 0) {
      if (movesIsEmpty(roomId, getTurn(roomId).team)) {
        clearMoves(roomId, getTurn(roomId).team)
        passTurn(roomId)
        addThrow(roomId, getTurn(roomId).team);
      }
    }
    io.to(roomId).emit("tiles", getTiles(roomId));
    io.to(roomId).emit("teams", getTeams(roomId));
    io.to(roomId).emit("turn", getTurn(roomId));
  });

  // if player throws, at least one player's visibility is true
  socket.on("throwYoots", () => {
    let positionsInHand = JSON.parse(JSON.stringify(initialState.initialYootPositions))
    let rotations = JSON.parse(JSON.stringify(initialState.initialYootRotations))
    let teams = getTeams(roomId)
    let turn = getTurn(roomId)

    if (teams[turn.team].throws > 0 && 
      teams[turn.team].players[turn.players[turn.team]].id === socket.id && 
      // after throw, 
      // turn was passed, but the client was disconnected (tab switch)
      getReadyToThrow(roomId)) {

      teams[turn.team].throws--;
      updateTeams(roomId, teams)
      io.to(roomId).emit('teams', teams)

      let { updateThrownError } = updateThrown(roomId, socket.id, true)
      if (updateThrownError) {
        return callback({ error: updateThrownError })
      }
      
      let { updateReadyToThrowError } = updateReadyToThrow(roomId, false) 
      if (updateReadyToThrowError) {
        return callback({ error: updateReadyToThrowError })
      }
      io.to(roomId).emit("readyToThrow", false);

      let clients = getClients(roomId)
      const yootForceVectors = [];
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
      for (const id of Object.keys(clients)) {
        if (clients[id].visibility) {
          io.to(id).emit("throwYoots", yootForceVectors);
          updateYootsAsleep(roomId, id, false)
        }
      }
      io.to(roomId).emit("clients", clients);
    }
  });

  /*socket.on("resetYoots", ({ socketIdEmitter }) => {
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
  })*/

  /*socket.on("reset", () => {
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
  });*/

  socket.on("legalTiles", ({ legalTiles }) => {
    updateLegalTiles(roomId, legalTiles)
    io.to(roomId).emit("legalTiles", { legalTiles: getLegalTiles(roomId) })
  })

  socket.on("recordThrow", ({move}, callback) => {
    console.log("[recordThrow] move", move)
    let { updateThrownError } = updateThrown(roomId, socket.id, false)
    if (updateThrownError) {
      return callback({ error: updateThrownError })
    }
    // io.to(roomId).emit("clients", clients)
    if (getGamePhase(roomId) === "pregame") {
      addMove(roomId, getTurn(roomId).team, move.toString())
      passTurnPregame(roomId)
      addThrow(roomId, getTurn(roomId).team)
      io.to(roomId).emit("turn", getTurn(roomId))
      io.to(roomId).emit("teams", getTeams(roomId))
      io.to(roomId).emit("gamePhase", getGamePhase(roomId))
    } else if (getGamePhase(roomId) === "game") {
      let turn = getTurn(roomId)
      console.log("[recordThrow] turn.team", turn.team)
      addMove(roomId, turn.team, move.toString())
      if (movesIsEmpty(roomId, turn.team)) {
        clearMoves(roomId, turn.team)
        turn = passTurn(roomId)
        addThrow(roomId, turn.team)
        io.to(roomId).emit("turn", turn)
      } else if (move == 4 || move == 5) {
        addThrow(roomId, turn.team);
      }
      io.emit("teams", getTeams(roomId))
    }
  })

  // if client disconnected due to inactivity,
  // client should be alerted
  socket.on("disconnect", () => {

    console.log("[disconnect] roomId", roomId, "socket id", socket.id)

    let room = getRoom(roomId)
    if (room) {
      const { yoot } = getYoot(roomId, socket.id)
      // save it to pass 'thrown' to another player
      const removedYoot = yoot
      const userFromRoom = removeUserFromRoom({ id: socket.id, roomId: room.id })
      if (userFromRoom.error && userFromRoom.error === "room not found") {
        // nothing happens
      } else {
        if (countPlayers(room.id) > 0) {
          socket.broadcast.to(room.id).emit('message', { user: 'admin', text: `${userFromRoom.name} has left!`})
          if (room.hostId === socket.id) {
            updateHostId(room.id, getRandomPlayer(room.teams).id)
          }

          if (userFromRoom.team && countPlayersTeam(roomId, userFromRoom.team) == 0)
          {
            updateReadyToStart(roomId, false)
            io.to(getHostId(roomId)).emit("readyToStart", false);
          }

          // other players should be able to play if their yoots are asleep
          const { allYootsAsleep, isAllYootsAsleepError } = isAllYootsAsleep(roomId)
          if (isAllYootsAsleepError) {
            return callback({ error: isAllYootsAsleepError })
          }
          console.log("[disconnect] allYootsAsleep", allYootsAsleep)
          if (allYootsAsleep) {
            updateReadyToThrow(roomId, true)
          }

          // if there's no player in current turn indexes
          const { currentPlayerId } = getCurrentPlayerId(roomId)
          if (!currentPlayerId) {
            let turn = getTurn(roomId)
            turn.players[turn.team] = 0
            updateTurn(roomId, turn)
          }
          console.log("[disconnect] removedClient.thrown", removedYoot.thrown, "current player ID", currentPlayerId)
          updateThrown(roomId, currentPlayerId, removedYoot.thrown)

          io.to(room.id).emit('room', room)
        } else if (countSpectators(room.id) > 0) {
          updateHostId(room.id, getRandomSpectator(room.teams).id)
          io.to(room.id).emit('room', room)
        } else {
          console.log("[disconnect] room empty")
          deleteRoom(room.id)
          console.log(`[disconnect] deleted room ${room.id}`)
        }
      }
    }
  });
});
