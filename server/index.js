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
const uri = "mongodb+srv://beatrhino:databaseAdmin@yootgamedb.xgh59sn.mongodb.net/?retryWrites=true&w=majority&appName=YootGameDB";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoClient = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

// async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       // Send a ping to confirm a successful connection
//       await mongoClient.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await mongoClient.close();
//     }
//   }

const PORT = process.env.PORT || 5000

app.use(router);
app.use(cors());

server.listen(PORT, () => console.log(`server has started on port ${PORT}`))


// run().catch(console.dir);

async function connectMongo() {
  await mongoose.connect("mongodb+srv://beatrhino:databaseAdmin@yootgamedb.xgh59sn.mongodb.net/yootGame")
}

const roomSchema = new mongoose.Schema(
  {
    id: String,
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

      // emit message from 'handleLetsPlay'
      // create object id
      // create room with it
      // return it in callback
      // setLocation with id
      let objectId = new mongoose.Types.ObjectId()
      console.log('objectId', objectId.valueOf())
      const room = new Room({ 
        _id: objectId,
        createdTime: new Date()
      })
      await room.save();
      
      console.log("[createRoom] id", id)
      const response = addRoom({ id })
      console.log("[createRoom] addRoom response", response)
      if (response.error) {
        return callback({ roomId: id, error: response.error })
      }
      
      return callback({ roomId: id })
    })

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
    });
})