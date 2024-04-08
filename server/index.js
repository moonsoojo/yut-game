import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import router from './router.js'; // needs .js suffix
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { ObjectId } from 'bson';
import mongoose from 'mongoose';
import { makeId } from '../client/src/helpers/helpers.js';
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
  await mongoose.connect("mongodb+srv://beatrhino:databaseAdmin@yootgamecluster.fgzfv9h.mongodb.net/yootGameDb")
}

const userSchema = new mongoose.Schema(
  {
    _id: String, //socketId
    name: String,
    roomId: String,
    team: Number
  },
  {
    versionKey: false,
  }
)
const roomSchema = new mongoose.Schema(
  {
    _id: String,
    createdTime: Date,
    // spectators and players into 'users'
    // display by section by filtering in UI
    // spectator team: null
    users: {
      type: Map,
      of: userSchema
    },
    messages: [{
      _id: false,
      name: String,
      text: String
    }],
    host: String,
    yootThrown: Boolean
  },
  {
    versionKey: false,
    minimize: false
  }
)

const Room = mongoose.model('rooms', roomSchema)
const roomStream = Room.watch([], { fullDocument: 'updateLookup' })
io.on("connect", async (socket) => { // socket.handshake.query is data obj

    connectMongo().catch(err => console.log('mongo connect error', err))
    let roomIdSocket;

    socket.on("createRoom", async ({ id }, callback) => {
      console.log('[createRoom]')
      try {
        const room = new Room({ 
          _id: id,
          createdTime: new Date(),
          users: {},
          messages: [],
          host: socket.id
        })
        await room.save();
        console.log('[createRoom] room saved', room)
        return callback({ roomId: id })
      } catch (err) {
        if (err.errorResponse.code === 11000) {
          console.log(`[createRoom] room ${id} already exists`)
          return callback({ roomId: id })
        } else {
          return callback({ roomId: id, error: err.message })
        }
      }
    })

    socket.on("joinRoom", async ({ roomId, savedClient }, callback) => {
      console.log("[joinRoom] room", roomId, "socket", socket.id, "savedClient", savedClient)
      roomIdSocket = roomId;
      roomStream.on('change', data => {
        if (data.documentKey._id === roomId) {
          console.log('[joinRoom] room stream change detected', data)
          socket.emit('room', data.fullDocument)
        }
      })
      
      let room;
      try {
        room = await Room.findById(roomId).exec();
      } catch (err) {
        return callback({ error: err.message })
      }
      if (!savedClient) {
        let name = makeId(5)

        // add client as spectator
        try {
          let spectator = {
            _id: socket.id,
            name,
            roomId,
            team: -1
          }
          console.log(`setting spectator`)
          room.users.set(socket.id, spectator)
          await room.save();
        } catch (err) {
          return callback({ error: err.message })
        }

        try {
          const message = {
            name: 'admin',
            text: `${name} joined the room`
          }
          room.messages.push(message)
          await room.save();
        } catch (err) {
          return callback({ error: err.message })
        }
      } else if (room._id === socket.handshake.query.client.room) { // join team
        let player;
        try {
          player = {
            ...JSON.parse(socket.handshake.query.client),
            _id: socket.id,
            roomId,
          }
          room.users.set(socket.id, player)
          await room.save();
        } catch (err) {
          return callback({ error: err.message })
        }
  
        try {
          const message = {
            name: 'admin',
            text: `${player.name} returned to the room`
          }
          room.messages.push(message)
          await room.save();
        } catch (err) {
          return callback({ error: err.message })
        }
        
        // try {
        //   const { currentPlayerId, getCurrentPlayerIdError } = getCurrentPlayerId(roomId)
        //   const turn = getTurn(roomId)
        //   if (socket.id === currentPlayerId 
        //     && movesIsEmpty(roomId, turn.team) 
        //     && getThrows(roomId, turn.team) == 0 
        //     && getGamePhase(roomId) !== "lobby") {
        //     addThrow(roomId, getTurn(roomId).team)
        //   }
        // } catch (err) {
        //   console.log(`[joinRoom] ${err}`)
        // }
      }
    })

    // roomId is from [client] in client
    socket.on("joinTeam", async ({ team, name, roomId }, callback) => {
      let userNameOld;
      try {
        let room = await Room.findById(roomId).exec();
        userNameOld = room.users.get(socket.id).name
        try {
          let player = {
            team,
            name,
            roomId,
            _id: socket.id
          }
          room.users.set(socket.id, player);
          await room.save();
        } catch (err) {
          return callback({ joinRoomId: roomId, error: err.message })
        }
      } catch (err) {
        return callback({ joinRoomId: roomId, error: err.message })
      }
  
      try {
        let room = await Room.findById(roomId).exec();
        const message = {
          name: 'admin',
          text: `${name} (${userNameOld}) has joined ${team === 0 ? "the Rockets" : "the UFOs"}!`
        }
        room.messages.push(message)
        await room.save();
        return callback({ joinRoomId: roomId })
      } catch (err) {
        return callback({ joinRoomId: roomId, error: err.message })
      }
    })

    // save roomId on connect
    // use socket info from current connection
    socket.on("disconnect", async () => {
      console.log(`${socket.id} disconnect from room ${roomIdSocket}`)

      let userName = '';
      try {
        let room = await Room.findById(roomIdSocket).exec();
        userName = room.users.get(socket.id).name
        room.users.set(socket.id, undefined)
        await room.save();
      } catch (err) {
        console.log(`[disconnect] socket ${socket.id} disconnecting from room ${roomIdSocket} error`, err)
      }

      try {
        let room = await Room.findById(roomIdSocket).exec();
        const message = {
          name: 'admin',
          text: `${userName} left the room.`
        }
        room.messages.push(message)
        await room.save();
      } catch (err) {
        console.log('[disconnect] error sending message', err)
      }
    });
})