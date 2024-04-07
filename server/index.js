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
    
    socket.on("createRoom", async ({ id }, callback) => {
      try {
        const room = new Room({ 
          _id: id,
          createdTime: new Date(),
          users: {},
          messages: [],
          host: socket.id
        })
        await room.save();
      } catch (err) {
        return callback({ roomId: id, error: err.message })
      }
    })

    socket.on("joinRoom", async ({ roomId, savedClient }, callback) => {
      // console.log("[joinRoom] room id", roomId, "socket id", socket.id, "savedClient", savedClient)
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
        // if host is null, assign it to client
        // update room in mongo
        let name = makeId(5)
        // const { spectator } = addSpectator({ id: socket.id, name, room: roomId })

        // add client as spectator
        try {
          let spectator = {
            _id: socket.id,
            name,
            roomId,
            team: -1
          }
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

    // roomId is from client info in client
    socket.on("joinTeam", async({ team, name, roomId }, callback) => {
      let room;
      try {
        room = await Room.findById(roomId).exec();
        try {
          let player = {
            team,
            name,
            roomId,
            _id: socket.id
          }
          await room.users.set(socket.id, player);
          room.save();
        } catch (err) {
          return callback({ error: err.message })
        }
      } catch (err) {
        return callback({ error: err.message })
      }
  
      try {
        const message = {
          name: 'admin',
          text: `${name} has joined ${team === 0 ? "the Rockets" : "the UFOs"}!`
        }
        room.messages.push(message)
        await room.save();
      } catch (err) {
        return callback({ error: err.message })
      }
    })

    socket.on("disconnect", () => {
      console.log(`${socket.id} disconnect`)
    });
})