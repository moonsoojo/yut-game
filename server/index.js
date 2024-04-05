import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import router from './router.js'; // needs .js suffix
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { ObjectId } from 'bson';
import mongoose from 'mongoose';

import { addRoom, addSpectator, getUserFromRoom, getThrown, addPlayer, getRoom, removeUserFromRoom, countPlayers, deleteRoom, addThrow, getHostId, updateGamePhase, getCurrentPlayerId, getGamePhase, isReadyToStart, updateThrown, getTeams, getTurn, updateTeams, addMove, updateTurn, updateLegalTiles, getLegalTiles, movesIsEmpty, passTurnPregame, passTurn, clearMoves, updateSelection, getTiles, updateTiles, getSelection, getThrows, bothTeamsHavePlayers, makeMove, score, countPlayersTeam, joinTeam, won, resetGame, getNameById, assignHost } from './rooms.js';


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: [
    //   // "https://master.dh445c3qmwe4t.amplifyapp.com",
    // ],
    origin: "*"
  },
});

const PORT = process.env.PORT || 5000

app.use(router);
app.use(cors());

server.listen(PORT, () => console.log(`server has started on port ${PORT}`))

async function connectMongo() {
  await mongoose.connect("mongodb+srv://beatrhino:databaseAdmin@yootgamedb.xgh59sn.mongodb.net/yootGame")
}

const roomSchema = new mongoose.Schema(
  {
    _id: String,
    createdTime: Date
  },
  {
    versionKey: false
  }
)
const Room = mongoose.model('rooms', roomSchema)

io.on("connect", async (socket) => { // socket.handshake.query is data obj

    connectMongo().catch(err => console.log('mongo connect error', err))
    
    let roomId = '';
    // console.log("[connect]", socket.handshake.query)
    socket.on("createRoom", async ({ id }, callback) => {
      try {
        const room = new Room({ 
          _id: id,
          createdTime: new Date()
        })
        await room.save();
        return callback({ roomId: id })
      } catch (err) {
        console.log(`[createRoom] ${err.message}`)
        return callback({ roomId: id, error: err.message })
      }
    })

    socket.on("joinRoom", ({ id, savedClient }, callback) => {
      console.log("[joinRoom] room id", id, "socket id", socket.id, "savedClient", savedClient)
  
      if (!savedClient) {
        // get room from mongo by id
        // add client as spectator
        // announce that client joined
        // if host is null, assign it to client
        // update room in mongo
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

    socket.on("disconnect", () => {
      console.log(`${socket.id} disconnect`)
    });
})