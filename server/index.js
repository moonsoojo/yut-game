// import { Server } from "socket.io";
import initialState from "./initialState.js";
import { generateRandomNumberInRange, makeId } from "./src/helpers.js";

import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import router from './router.js'; // needs .js suffix
import cors from 'cors';

import { addRoom, addSpectator, getUserFromRoom, getReadyToThrow, addPlayer, getRoom, removeUserFromRoom, countPlayers, deleteRoom, addThrow, updateHostId, updateReadyToStart, getHostId, updateGamePhase, updateYootsAsleep, getCurrentPlayerId, getThrown, isAllYootsAsleep, getGamePhase, isReadyToStart, getYoots, updateThrown, getTeams, getTurn, updateVisibility, updateTeams, getYootsAsleep, addMove, updateTurn, updateLegalTiles, getLegalTiles, movesIsEmpty, passTurnPregame, passTurn, clearMoves, updateSelection, getTiles, updateTiles, getSelection, updateReadyToThrow, getThrows, bothTeamsHavePlayers, makeMove, score, countPlayersTeam, getVisibility, joinTeam, getYoot, checkReadyToStart, addYoots, joinTeamAbstraction, getRandomPlayer, countSpectators, roomExists, yootExists } from './rooms.js';

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


io.on("connect", (socket) => { 

  let roomId = '';

  socket.on("createRoom", ({ id }, callback) => {
    // if room with id already exists, it won't add it
    try {
      addRoom({ id })
    } catch (err) {
      console.log(`[createRoom] ${err}`)
    } finally {
      return callback({ roomId: id })
    }
  })

  socket.on("joinRoom", ({ id, savedClient }, callback) => {
    if (roomExists(id)) {
      roomId = id

      socket.join(roomId);
      // client's yoots are always going to move on load
      updateReadyToThrow(roomId, false)

      addYoots(roomId, socket.id)

      if (!savedClient) {

        let randomName = makeId(5)
        const { spectator } = addSpectator({ room: roomId, id: socket.id, randomName })

        socket.emit("message", { 
          name: 'admin', 
          text: `${spectator.randomName}, welcome to the room ${roomId}`
        })
        socket.broadcast.to(roomId).emit('message', { 
          name: 'admin', 
          text: `${spectator.randomName} is spectating`
        })

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
          name: 'admin', 
          text: `${savedPlayer.name}, welcome back to the room ${savedPlayer.room}`
        })

        try {
          const { joinTeamAbstractionError } = joinTeamAbstraction({ player: savedPlayer })
          if (joinTeamAbstractionError) {
            throw new Error(joinTeamAbstractionError)
          } else {
            emitPlayerJoin({ player: savedPlayer })
          }
        } catch (err) {
          console.log(`[joinRoom] ${err}`)
        }
      }
    }
  })

  socket.on("joinTeam", ({ team, name }, callback) => {
    if (roomExists(roomId)) {
      try {
        const { joinedPlayer, joinTeamError } = joinTeam({ roomId, id: socket.id, name, team })
        if (joinTeamError) {
          throw new Error(joinTeamError)
        }
        const { joinTeamAbstractionError } = joinTeamAbstraction({ player: joinedPlayer })
        if (joinTeamAbstractionError) {
          throw new Error(joinTeamAbstractionError)
        }
        emitPlayerJoin({ player: joinedPlayer })
        return callback({ player: joinedPlayer })
      } catch (err) {
        console.log(`[joinTeam] ${err}`)
      }
    }
  })

  function emitPlayerJoin({ player }) {
    socket.emit("client", player)
    
    const roomId = player.room
    socket.broadcast.to(roomId).emit(
      'message', 
      {
        name: 'admin', 
        text: `${player.name} has joined ${player.team === 0 ? "the Rockets" : "the UFOs"}!`
      }
    )
    try {
      io.to(getHostId(roomId)).emit("readyToStart", checkReadyToStart(roomId));
      io.to(roomId).emit('room', getRoom(roomId))
    } catch (err) {
      console.log(`[emitPlayerJoin] ${err}`)
    }
  }

  socket.on("sendMessage", ({ message, roomId }, callback) => {
    try {
      const { user, getUserFromRoomError } = getUserFromRoom({ id: socket.id, roomId });
      if (user) {
        io.to(roomId).emit('message', { name: user.name, text: message, team: user.team });
        return callback
      } else {
        throw new Error(getUserFromRoomError)
      }
    } catch (err) {
      console.log(`[sendMessage] ${err}`)
    }
  })

  socket.on("visibilityChange", (flag) => {
    if (roomExists(roomId) && yootExists(roomId, socket.id)) {
      updateVisibility(roomId, socket.id, flag)
      if (flag === true) {
        if (!getYootsAsleep(roomId, socket.id)) {
          updateReadyToThrow(roomId, false)
          io.to(roomId).emit("readyToThrow",false)
        } else if (isAllYootsAsleep(roomId)) {
          updateReadyToThrow(roomId, true)
          io.to(roomId).emit("readyToThrow", true)
        }
      }
    }
  })

  socket.on("yootsAsleep", ({flag}, callback) => {
    console.log("[yootsAsleep]", flag, 'id', socket.id)
    if (roomExists(roomId) && yootExists(roomId, socket.id)) {
      updateYootsAsleep(roomId, socket.id, flag)
      console.log("[yootsAsleep] isAllYootsAsleep", isAllYootsAsleep(roomId))
      if (isAllYootsAsleep(roomId)) {
        updateReadyToThrow(roomId, true)
        io.to(roomId).emit("readyToThrow", true)
      }
      if (getGamePhase(roomId) === "lobby") {
        const readyToStart = isReadyToStart(roomId)
        updateReadyToStart(roomId, readyToStart)
        io.to(getHostId(roomId)).emit("readyToStart", readyToStart);
      } else {
        try {
          const { currentPlayerId, getCurrentPlayerIdError } = getCurrentPlayerId(roomId)
          if (getCurrentPlayerIdError) {
            throw new Error(getCurrentPlayerIdError)
          } else {
            if (socket.id === currentPlayerId && getThrown(roomId, socket.id)) {
              callback({
                response: "record"
              })
            } else {
              callback({
                response: "noRecord"
              })
            }
          }
        } catch (err) {
          console.log(`[yootsAsleep] ${err}`)
        }
      } 
    }
  })

  socket.on("startGame", () => {
    if (roomExists(roomId)) {
      try {
        updateReadyToStart(roomId, false)
        io.to(roomId).emit("readyToStart", false);
        addThrow(roomId, getTurn(roomId).team)
        io.to(roomId).emit("teams", getTeams(roomId))
        updateGamePhase(roomId, 'pregame') // who goes first
        io.to(roomId).emit("gamePhase", getGamePhase(roomId));
      } catch (err) {
        console.log(`[startGame] ${err}`)
      }
    }
  })

  socket.on("select", (payload) => {
    if (roomExists(roomId)) {
      updateSelection(roomId, payload) // change room state so when a new player joins, he gets the up to date state
      io.to(roomId).emit("select", payload);
    }
  });

  socket.on("move", ({ destination }) => {
    if (roomExists(roomId)) {
      makeMove(roomId, destination)
      if (getThrows(roomId, getTurn(roomId).team) == 0) {
        if (movesIsEmpty(roomId, getTurn(roomId).team)) {
          clearMoves(roomId, getTurn(roomId).team)
          if (isAllYootsAsleep(roomId)) {
            updateReadyToThrow(roomId, true)
            io.to(roomId).emit("readyToThrow", true);
          }
          if (bothTeamsHavePlayers(roomId)) {
            let newTurn = passTurn(roomId)
            addThrow(roomId, getTurn(roomId).team);
            io.to(roomId).emit("turn", newTurn);
          }
        }
      }

      io.to(roomId).emit("teams", getTeams(roomId));
      io.to(roomId).emit("tiles", getTiles(roomId));
    }

  });

  // need to get move from client because there can be multiple
  socket.on("score", ({ selectedMove }) => {
    if (roomExists(roomId)) {
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
    }
  });

  // if player throws, at least one player's visibility is true
  socket.on("throwYoots", () => {
    if (roomExists(roomId) && yootExists(roomId, socket.id)) {
      let positionsInHand = JSON.parse(JSON.stringify(initialState.initialYootPositions))
      let rotations = JSON.parse(JSON.stringify(initialState.initialYootRotations))
      let teams = getTeams(roomId)
      let turn = getTurn(roomId)

      try {
        let { currentPlayerId, getCurrentPlayerIdError } = getCurrentPlayerId(roomId)
        if (getCurrentPlayerIdError) {
          throw new Error(getCurrentPlayerIdError)
        }
        if (teams[turn.team].throws > 0
          && currentPlayerId === socket.id
          && getReadyToThrow(roomId)) {
    
          teams[turn.team].throws--;
          updateTeams(roomId, teams)
          io.to(roomId).emit('teams', teams)
    
          updateThrown(roomId, socket.id, true) // only used by server
          updateReadyToThrow(roomId, false) 
          io.to(roomId).emit("readyToThrow", false);
    
          let yoots = getYoots(roomId)
          const yootForceVectors = [];

          for (let i = 0; i < 4; i++) {
            yootForceVectors.push({
              rotation: rotations[i],
              yImpulse: generateRandomNumberInRange(0.3, 0.1),
              torqueImpulse: {
                x: generateRandomNumberInRange(0.4, 0.2),
                y: generateRandomNumberInRange(0.3, 0.2),
                z: generateRandomNumberInRange(0.02, 0.01),
              },
              positionInHand: positionsInHand[i],
            });
          }
          for (const id of Object.keys(yoots)) {
            if (yoots[id].visibility) {
              io.to(id).emit("throwYoots", yootForceVectors);
              updateYootsAsleep(roomId, id, false)
            }
          }
        }
      } catch (err) {
        console.log(`[throwYoots] ${err}`)
      }
    }
  });

  socket.on("legalTiles", ({ legalTiles }) => {
    if (roomExists(roomId)) {
      updateLegalTiles(roomId, legalTiles)
      io.to(roomId).emit("legalTiles", { legalTiles: getLegalTiles(roomId) })
    }
  })

  socket.on("recordThrow", ({move}) => {
    if (roomExists(roomId) && yootExists(roomId, socket.id)) {
      updateThrown(roomId, socket.id, false)
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
        }
        io.emit("teams", getTeams(roomId))
      }
    }
  })

  socket.on("disconnect", () => {
    console.log("[disconnect]")
    if (roomExists(roomId) && yootExists(roomId, socket.id)) {
      const room = getRoom(roomId)
      const removedYoot = getYoot(roomId, socket.id)
      try {
        const userFromRoom = removeUserFromRoom({ id: socket.id, roomId: room.id })
        if (countPlayers(room.id) > 0) {
          socket.broadcast.to(room.id).emit('message', { name: 'admin', text: `${userFromRoom.name} has left!`})
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
            throw new Error(isAllYootsAsleepError)
          }

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
          updateThrown(roomId, currentPlayerId, removedYoot.thrown)

          io.to(room.id).emit('room', room)
        } else if (countSpectators(room.id) > 0) {
          updateHostId(room.id, getRandomSpectator(room.teams).id)
          io.to(room.id).emit('room', room)
        } else {
          deleteRoom(room.id)
        }
      } catch (err) {
        console.log(`[disconnect] ${err}`)
      }
    }
  });
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