import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import router from './router.js'; // needs .js suffix
import cors from 'cors';
import mongoose from 'mongoose';
import { makeId } from '../client/src/helpers/helpers.js';

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
    // _id: String, // socketId
    socketId: String,
    roomId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'rooms'
    },
    name: String,
    team: Number
  },
  {
    versionKey: false,
  }
)
const roomSchema = new mongoose.Schema(
  {
    createdTime: Date,
    spectators: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'users'
    }],
    team0: {
      players: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
      }]
    },
    team1: {
      players: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
      }]
    },
    messages: [{
      _id: false,
      name: String,
      text: String
    }],
    host: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'users'
    },
    yootThrown: Boolean
  },
  {
    versionKey: false,
    minimize: false
  }
)

const User = mongoose.model('users', userSchema)
const Room = mongoose.model('rooms', roomSchema)

// users collection
// arrays with user documents

// in the client, if client's socket id is the host's id
// if there is a player in team 0 and a player in team 1
// show 'let's play' button

// yoot throw
// if thrown and client disconnects
// display a button to claim turn for other players on his team
// mark player's name as disconnected
  // check for existing player by matching the name on rejoin
// on return
// if thrown
  // add a throw
  // reset flag on record result

async function addUser(socketId, name) {
  try {
    const user = new User({
      socketId,
      name,
      team: -1,
      roomId: null
    })
    await user.save();
  } catch (err) {
    console.log('[addUser]', err)
    return null
  }
}

// room stream listener
Room.watch([], { fullDocument: 'updateLookup' }).on('change', async (data) => {
  console.log(`[Room.watch] data`, data)
  if (data.operationType === 'insert') {
    for (const user of data.fullDocument.spectators) {
      try {
        let userFound = await User.findById(user, 'socketId').exec()
        let userSocketId = userFound.socketId
        let roomPopulated = await Room.findById(data.documentKey._id).populate('spectators').populate('host').exec()
        io.to(userSocketId).emit('room', roomPopulated)
      } catch (err) {
        console.log(`[Room.watch] error getting user's socket id`, err)
      }
    }
  } else if (data.operationType === 'update') {
    for (const user of data.fullDocument.spectators) {
      try {
        let userFound = await User.findById(user, 'socketId').exec()
        let userSocketId = userFound.socketId
        let roomPopulated = await Room.findById(data.documentKey._id).populate('spectators').populate('host').exec()
        io.to(userSocketId).emit('room', roomPopulated)

      } catch (err) {
        console.log(`[Room.watch] error getting user's socket id`, err)
      }
    }
  }
})

// communicate via socket id
// find user
// save room
io.on("connect", async (socket) => { // socket.handshake.query is data obj

    connectMongo().catch(err => console.log('mongo connect error', err))

    let name = makeId(5)
    addUser(socket.id, name)
    console.log(`[connect] added user with socket ${socket.id}`)

    socket.on("createRoom", async ({}, callback) => {
      // create room document
      // update user's room
      // add user as host
      let objectId = new mongoose.Types.ObjectId()

      // get user
      let user;
      try {
        user = await User.findOne({ socketId: socket.id }).exec()
      } catch (err) {
        console.log(`[createRoom] user with socket id ${socket.id} not found`)
      }

      try {
        const room = new Room({
          _id: objectId,
          createdTime: new Date(),
          spectators: [],
          team0: {
            players: []
          },
          team1: {
            players: []
          },
          messages: [],
          host: user._id
        })
        await room.save();
        console.log('[createRoom] room', room)
        return callback({ roomId: objectId })
      } catch (err) {
        return callback({ error: err.message })
      }
    })

    socket.on("joinRoom", async ({ roomId }, callback) => {
      try {
        let user = await User.findOne({ 'socketId': socket.id }).exec()
        let room = await Room.findOneAndUpdate({ _id: roomId }, { $addToSet: { "spectators": user._id }})
        await room.save();
      } catch (err) {
        return callback({ error: err.message })
      }

      try {
        let user = await User.findOneAndUpdate({ 'socketId': socket.id }, { roomId })
        await user.save()
      } catch (err) {
        return callback({ error: err.message })
      }

      return callback()
    })

    // roomId is from [client] in client
    socket.on("joinTeam", async ({ team, name, roomId }, callback) => {
      let userNameOld;
      let player;
      try {
        let room = await Room.findById(roomId).exec();
        try {
          player = {
            _id: socket.id,
            team: parseInt(team),
            name,
            roomId
          }
          console.log(`[joinTeam] teams`, room.teams)
          room.teams.id(parseInt(team)).players.push(player)

          deleteUser(room, socket.id)
          await room.save();
        } catch (err) {
          return callback({ joinRoomId: roomId, error: err.message })
        }

        // change host name to new one
        if (room.host.name === userNameOld) {
          try {
            room.host.name = name
            await room.save();
          } catch (err) {
            return callback({ joinRoomId: roomId, error: `while saving new host name, error: ${err.message}`})
          }
        }
      } catch (err) {
        return callback({ joinRoomId: roomId, error: err.message })
      }
  
      try {
        let room = await Room.findById(roomId).exec();
        const message = {
          name: 'admin',
          text: `${name} (${userNameOld}) has joined ${parseInt(team) === 0 ? "the Rockets" : "the UFOs"}!`
        }
        room.messages.push(message)
        await room.save();
        return callback({ joinRoomId: roomId, player })
      } catch (err) {
        return callback({ joinRoomId: roomId, error: err.message })
      }
    })

    socket.on("sendMessage", async ({ message, roomId }, callback) => {
      try {
        let room = await Room.findById(roomId).exec();
        message = {
          name: room.users.get(socket.id).name,
          text: message
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
      console.log(`${socket.id} disconnect`)
      try {
        let user = await User.findOneAndDelete({ 'socketId': socket.id }).exec()
        // if user is host of the room
        // find new host for room
        // announce it to the room
        let userId = user._id
        await Room.updateOne({ _id: user.roomId }, { $pullAll: { spectators: [{ _id: user._id }]}})
        let updatedRoom = await Room.findById(user.roomId).exec()
        let hostId = updatedRoom.host
        if (userId.valueOf() === hostId.valueOf() && updatedRoom.spectators.length > 0) {
          updatedRoom.host = updatedRoom.spectators[0]
          updatedRoom.save();
        }
      } catch (err) {
        console.log(`[disconnect] error deleting user`, err)
      }
    });
})