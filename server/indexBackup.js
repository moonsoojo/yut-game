import initialState from "./initialState.js";

import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import router from './router.js'; // needs .js suffix
import cors from 'cors';

import { addRoom, addSpectator, getUserFromRoom, getThrown, addPlayer, getRoom, removeUserFromRoom, countPlayers, deleteRoom, addThrow, getHostId, updateGamePhase, getCurrentPlayerId, getGamePhase, isReadyToStart, updateThrown, getTeams, getTurn, updateTeams, addMove, updateTurn, updateLegalTiles, getLegalTiles, movesIsEmpty, passTurnPregame, passTurn, clearMoves, updateSelection, getTiles, updateTiles, getSelection, getThrows, bothTeamsHavePlayers, makeMove, score, countPlayersTeam, joinTeam, won, resetGame, getNameById, assignHost } from './rooms.js';

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

// have to wait for the server create the room first
let test = false;
if (test) {
  const roomId = 'QYPXT'
  addRoom({ id: roomId })

  let teams = JSON.parse(JSON.stringify(initialState.teams))
  let tiles = JSON.parse(JSON.stringify(initialState.tiles))
  
  updateGamePhase(roomId, 'game')
  let turn = {
    team: 0,
    players: [0,0]
  }
  updateTurn(roomId, turn)

  teams[0].moves['3'] = 1
  // teams[0].pieces[1] = null;
  // teams[0].pieces[2] = null;

  teams[0].pieces[0] = null;
  teams[0].pieces[1] = null;
  teams[0].pieces[2] = null;
  teams[0].pieces[3] = null;

  updateTeams(roomId, teams)
  
  tiles[27] = [
    { tile: 27, team: 0, id: 1,  history: [11,12,13,14,15,16,17]},
  ]
  tiles[22] = [
    { tile: 22, team: 0, id: 0,  history: [11,12,13,14,15,16,17]},
    { tile: 22, team: 0, id: 3,  history: [11,12,13,14,15,16,17]},
    { tile: 22, team: 0, id: 2,  history: [11,12,13,14,15,16,17]},
  ]
  updateTiles(roomId, tiles)
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

// 0, inclusive to max, exclusive
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
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
    console.log("[createRoom] id", id)
    const response = addRoom({ id })
    console.log("[createRoom] addRoom response", response)
    if (response.error) {
      return callback({ roomId: id, error: response.error })
    }
    
    return callback({ roomId: id })
  })

  socket.on("joinRoom", ({ id, savedClient }, callback) => {
    console.log("[joinRoom] room id", id, "socket id", socket.id, "savedClient", savedClient)
    roomId = id

    if (!savedClient) {

      let name = makeId(5)
      const { spectator } = addSpectator({ id: socket.id, name, room: roomId })

      socket.emit("client", spectator)

      // sends only to the socket's client
      socket.emit("message", { user: 'admin', text: `${spectator.name}, welcome to the room ${spectator.room}`})
      socket.broadcast.to(spectator.room).emit('message', { user: 'admin', text: `${spectator.name} has joined!`})
      socket.join(spectator.room);

      try {
        assignHost(roomId, socket.id)
      } catch (err) {
        console.log(`[joinRoom][no saved client] ${err}`)
      }
      
      let { room, getRoomError } = getRoom(spectator.room)
      if (getRoomError) {
        console.log(`[connect] no saved client, error: ${getRoomError}`)
        return callback({ error: getRoomError })
      }
      io.to(roomId).emit('room', room)

      callback('join room without savedClient success')
  
    } else {
      // join team

      const savedPlayer = {
        ...JSON.parse(socket.handshake.query.client),
        id: socket.id,
        room: roomId
      }
      // when bro and i joined another room, when bro joined, 
      // we didn't see each other. when we refreshed the page, we did
      const addedPlayer = addPlayer({ player: savedPlayer })
      console.log(`addedPlayer ${JSON.stringify(addedPlayer)}`)
      socket.emit("client", addedPlayer)

      socket.emit("message", { user: 'admin', text: `${addedPlayer.name}, welcome back to the room ${addedPlayer.room}`})
      console.log("[joinRoom] addedPlayer", addedPlayer)
      socket.join(addedPlayer.room);

      let { room, getRoomError } = getRoom(addedPlayer.room)
      if (getRoomError) {
        console.log(`[connect] with saved client, error: ${getRoomError}`)
        return callback({ error })
      }
      socket.broadcast.to(addedPlayer.room).emit(
        'message', 
        { 
          user: 'admin', 
          text: `${addedPlayer.name} has joined ${addedPlayer.team === 0 ? "the Rockets" : "the UFOs"}!`
        }
      )

      // this is emitted by 'room'

      console.log("[joinRoom] hostId", getHostId(roomId))
      if (getHostId(roomId) == null) { // if there's no host, there's only one player
        try {
          assignHost(roomId, socket.id)
        } catch (err) {
          console.log(`[joinRoom][no saved client] ${err}`)
        }
      } else {
        let { readyToStart, isReadyToStartError } = isReadyToStart(roomId)
        if (isReadyToStartError) {
          return callback({ error: isReadyToStartError })
        }
        // updateReadyToStart(roomId, readyToStart)
        // console.log("[joinRoom] host id", getHostId(roomId))
        io.to(getHostId(roomId)).emit("readyToStart", readyToStart);
      }
      
      try {
        const { currentPlayerId, getCurrentPlayerIdError } = getCurrentPlayerId(roomId)
        const turn = getTurn(roomId)
        if (socket.id === currentPlayerId 
          && movesIsEmpty(roomId, turn.team) 
          && getThrows(roomId, turn.team) == 0 
          && getGamePhase(roomId) !== "lobby") {
          addThrow(roomId, getTurn(roomId).team)
        }
      } catch (err) {
        console.log(`[joinRoom] ${err}`)
      }

      // doesn't update host Id
      io.to(roomId).emit('room', room)
      
      callback('join room with savedClient success')
    }
  })

  socket.on("joinTeam", ({ team, name }, callback) => {

    const { room, getRoomError } = getRoom(roomId)
    console.log("room", room, "getRoomError", getRoomError)
    if (getRoomError) {
      return callback({ error: getRoomError })
    }

    // const client = getClient(roomId, socket.id)
    // const spectator = removeUserFromRoom({ id: socket.id, roomId })
    const { joinedPlayer, joinTeamError } = joinTeam({ roomId, id: socket.id, team, name })

    if (joinTeamError) {
      return callback({ error: joinTeamError })
    }

    console.log("[joinTeam] joinedPlayer", joinedPlayer)
    // join team: pass turn skips players

    socket.emit("client", joinedPlayer) // client only deals with game state like team, not yoot state
    socket.broadcast.to(roomId).emit(
      'message', 
      { 
        user: 'admin', 
        text: `${joinedPlayer.name} has joined ${joinedPlayer.team === 0 ? "the Rockets" : "the UFOs"}!`
      }
    )

    if (getHostId(roomId) == null) { // if there's no host, there's only one player
      try {
        assignHost(roomId, socket.id)
      } catch (err) {
        console.log(`[joinRoom][no saved client] ${err}`)
      }
    } else {
      let { readyToStart, isReadyToStartError } = isReadyToStart(roomId)
      if (isReadyToStartError) {
        return callback({ error: isReadyToStartError })
      }
      // updateReadyToStart(roomId, readyToStart)
      io.to(getHostId(roomId)).emit("readyToStart", readyToStart);
    }

    try {
      const { currentPlayerId, getCurrentPlayerIdError } = getCurrentPlayerId(roomId)
      const turn = getTurn(roomId)
      if (socket.id === currentPlayerId && movesIsEmpty(roomId, turn.team) && getThrows(roomId, turn.team) == 0 && getGamePhase(roomId) !== "lobby") {
        addThrow(roomId, getTurn(roomId).team)
      }
    } catch (err) {
      console.log(`[joinTeam] ${err}`)
    }
    
    // doesn't update host Id
    io.to(roomId).emit('room', room) 

    callback({ player: joinedPlayer });
  })

  socket.on("sendMessage", ({ message, roomId }, callback) => {
    let { room, getRoomError } = getRoom(roomId)
    if (!room) {
      return callback({ error: getRoomError })
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

  socket.on("yootsAsleep", (callback) => {
    // turn passed but player didn't receive move
    try {    
      const { currentPlayerId, getCurrentPlayerIdError } = getCurrentPlayerId(roomId)
      console.log("[yootsAsleep] socket id", socket.id, "current player id", currentPlayerId, 'current player name', getNameById(roomId, currentPlayerId))
      if (socket.id === currentPlayerId && getThrown({roomId}) == true) {
        return callback({
          response: "record"
        })
      } else {
        return callback({
          response: "noRecord"
        })
      }
    } catch (err) {
      console.log(`[yootsAsleep] ${err}`)
    }
  })

  socket.on("startGame", (callback) => {
    console.log(`[startGame]`)
    // updateReadyToStart(roomId, false)
    io.to(roomId).emit("readyToStart", false);
    let { room, getRoomError } = getRoom(roomId)
    if (getRoomError) {
      return callback({ response: getRoomError })
    }
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
    io.to(roomId).emit("tiles", getTiles(roomId));
    if (won(roomId, getTurn(roomId).team)) {
      io.to(roomId).emit("winner", getTurn(roomId).team)
    }
    if (getThrows(roomId, getTurn(roomId).team) == 0 
    && movesIsEmpty(roomId, getTurn(roomId).team)) {
      clearMoves(roomId, getTurn(roomId).team)
      passTurn(roomId)
      addThrow(roomId, getTurn(roomId).team);
    }
    io.to(roomId).emit("teams", getTeams(roomId));
    io.to(roomId).emit("turn", getTurn(roomId));
  });

  socket.on("throwYoots", ({}, callback) => {
    let positionsInHand = JSON.parse(JSON.stringify(initialState.initialYootPositions))
    let rotations = JSON.parse(JSON.stringify(initialState.initialYootRotations))
    let teams = getTeams(roomId)
    let turn = getTurn(roomId)
    if (teams[turn.team].throws > 0 
      && teams[turn.team].players[turn.players[turn.team]].id === socket.id
      && !getThrown(roomId)) {

      teams[turn.team].throws--;
      updateTeams(roomId, teams)
      io.to(roomId).emit('teams', teams)

      const yootForceVectors = [];
      for (let i = 0; i < 4; i++) {
        yootForceVectors.push({
          rotation: rotations[i],
          yImpulse: generateRandomNumberInRange(0.7, 0.2),
          torqueImpulse: {
            x: generateRandomNumberInRange(0.03, 0.004),
            y: generateRandomNumberInRange(0.003, 0.001),
            z: generateRandomNumberInRange(0.003, 0.001),
          },
          positionInHand: positionsInHand[i],
        });
      }
      updateThrown({ roomId, flag: true })
      io.to(roomId).emit("throwYoots", yootForceVectors);
    }
  });

  socket.on("restart", () => {
    resetGame(roomId);
    try {
      const { room, getRoomError } = getRoom(roomId)
      if (getRoomError) {
        throw new Error(getRoomError)
      }
      io.to(roomId).emit("room", room)
    } catch(err) {
      console.log(`[restart] ${err}`)
    }
  })

  socket.on("legalTiles", ({ legalTiles }) => {
    updateLegalTiles(roomId, legalTiles)
    io.to(roomId).emit("legalTiles", { legalTiles: getLegalTiles(roomId) })
  })

  socket.on("recordThrow", ({move}) => {
    console.log("[recordThrow] move", move)
    updateThrown({ roomId, flag: false })
    io.to(roomId).emit("thrown", false)
    if (getGamePhase(roomId) === "pregame") {
      addMove(roomId, getTurn(roomId).team, move.toString())
      passTurnPregame(roomId)
      addThrow(roomId, getTurn(roomId).team)
      io.to(roomId).emit("turn", getTurn(roomId))
      io.to(roomId).emit("teams", getTeams(roomId))
      io.to(roomId).emit("gamePhase", getGamePhase(roomId))
    } else if (getGamePhase(roomId) === "game") {
      let turn = getTurn(roomId)
      addMove(roomId, turn.team, move.toString())
      if (movesIsEmpty(roomId, turn.team)) {
        clearMoves(roomId, turn.team)
        turn = passTurn(roomId)
        addThrow(roomId, turn.team)
        io.to(roomId).emit("turn", turn)
      } else if (move == 4 || move == 5) {
        addThrow(roomId, turn.team);
        // io.to(roomId).emit("yell", "bonus turn")
      }
      io.to(roomId).emit("teams", getTeams(roomId))
    }
  })

  // if client disconnected due to inactivity,
  // client should be alerted
  socket.on("disconnect", () => {

    console.log("[disconnect] roomId", roomId, "socket id", socket.id)

    let { room, getRoomError } = getRoom(roomId)
    if (room) {
      const userFromRoom = removeUserFromRoom({ id: socket.id, roomId: room.id })
      if (userFromRoom.error && userFromRoom.error === "room not found") {
        // nothing happens
      } else {
        // emit the room to everyone in the room
        // tell everyone in the room that user left
        if (countPlayers(room.id) > 0) {
          socket.broadcast.to(room.id).emit('message', { user: 'admin', text: `${userFromRoom.name} has left!`})
          try {
            assignHost(roomId, socket.id)
          } catch (err) {
            console.log(`[joinRoom][no saved client] ${err}`)
          }

          if (userFromRoom.team && countPlayersTeam(roomId, userFromRoom.team) == 0)
          {
            // updateReadyToStart(roomId, false)
            io.to(getHostId(roomId)).emit("readyToStart", false);
          }

          // if there's no player in current turn indexes
          try {
            const { currentPlayerId, getCurrentPlayerIdError } = getCurrentPlayerId(roomId)
            if (!currentPlayerId) {
              let turn = getTurn(roomId)
              turn.players[turn.team] = 0
              updateTurn(roomId, turn)
            } else if (getThrown({roomId}) === true) {
              updateThrown({roomId, flag: false})
              addThrow(roomId, getTurn(roomId).team)
            }
          } catch (err) {
            console.log(`[disconnect] ${err}`)
          }

          io.to(room.id).emit('room', room)
        } else {
          console.log("[disconnect] room empty")
          deleteRoom(room.id)
          console.log("[disconnect] rooms[roomId]", getRoom(room.id))
        }
        // start button doesn't disappear when there's only one player left 
        // in the team in my phone

      }
    } else {
      console.log(`[disconnect] ${getRoomError}`)
    }


    /*if (socket.id == getCurrentPlayerSocketId(turn, teams)) {
      turn = passTurn(turn, teams)
      clients[socket.id].thrown = false;
      io.emit("turn", turn)
      io.emit("clients", clients)
    } */
  });
});