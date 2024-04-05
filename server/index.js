import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import router from './router.js'; // needs .js suffix
import cors from 'cors';
const { MongoClient, ServerApiVersion } = require('mongodb');

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
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

const PORT = process.env.PORT || 5000

app.use(router);
app.use(cors());

server.listen(PORT, () => console.log(`server has started on port ${PORT}`))

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