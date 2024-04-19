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
      }],
      throws: Number
    },
    team1: {
      players: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
      }],
      throws: Number
    },
    turn: {
      team: Number,
      player: [Number]
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
    gamePhase: String,
    yootThrown: Boolean
  },
  {
    versionKey: false,
    minimize: false
  }
)

const User = mongoose.model('users', userSchema)
const Room = mongoose.model('rooms', roomSchema)

// yoot throw
// if thrown and client disconnects
// display a button to claim turn for other players on his team
// mark player's name as disconnected
  // check for existing player by matching the name on rejoin
// on return
// if thrown
  // add a throw
  // reset flag on record result

async function addUser(socket, name) {
  try {
    let user;
    if (socket.handshake.query.client === "null") { // Use saved client
      user = new User({
        socketId: socket.id,
        name,
        team: -1,
        roomId: null
      })
    } else {
      const savedClient = JSON.parse(socket.handshake.query.client)
      user = new User({
        socketId: socket.id,
        name: savedClient.name,
        team: savedClient.team,
        roomId: savedClient.roomId
      })
    }
    await user.save();
  } catch (err) {
    console.log('[addUser]', err)
    return null
  }
}

// Room stream listener
Room.watch([], { fullDocument: 'updateLookup' }).on('change', async (data) => {
  console.log(`[Room.watch] data`, data)
  if (data.operationType === 'insert' || data.operationType === 'update') {
    // Emit document to all clients in the room
    let users = data.fullDocument.spectators.concat(data.fullDocument.team0.players.concat(data.fullDocument.team1.players))
    for (const user of users) {
      try {
        let userFound = await User.findById(user, 'socketId').exec()
        let userSocketId = userFound.socketId
        let roomPopulated = await Room.findById(data.documentKey._id).populate('spectators').populate('host').populate('team0.players').populate('team1.players').exec()
        io.to(userSocketId).emit('room', roomPopulated)
      } catch (err) {
        console.log(`[Room.watch] error getting user's socket id`, err)
      }
    }
  }
})

io.on("connect", async (socket) => { // socket.handshake.query is data obj

    connectMongo().catch(err => console.log('mongo connect error', err))

    // Create user
    let name = makeId(5)
    addUser(socket, name)
    console.log(`[connect] added user with socket ${socket.id}`)

    socket.on("createRoom", async ({}, callback) => {
      let objectId = new mongoose.Types.ObjectId()

      // Get user by socket id
      let user;
      try {
        user = await User.findOne({ socketId: socket.id }).exec()
      } catch (err) {
        console.log(`[createRoom] user with socket id ${socket.id} not found`)
      }

      // Create room with socket id owner as host
      try {
        const room = new Room({
          _id: objectId,
          createdTime: new Date(),
          spectators: [],
          team0: {
            players: [],
            throws: 0
          },
          team1: {
            players: [],
            throws: 0
          },
          messages: [],
          host: user._id,
          gamePhase: 'lobby',
          turn: {
            team: 0,
            player: [0, 0]
          }
        })
        await room.save();
        console.log('[createRoom] room', room)
        return callback({ roomId: objectId })
      } catch (err) {
        return callback({ error: err.message })
      }
    })

    socket.on("joinRoom", async ({ roomId }, callback) => {
      // Add user to room
      try {
        let user = await User.findOne({ 'socketId': socket.id }).exec()
        let room;
        if (user.roomId && user.roomId.valueOf() === roomId) { // Use value saved in local storage
          if (user.team === -1) {
            room = await Room.findOneAndUpdate({ _id: roomId }, { $addToSet: { "spectators": user._id }}).exec()
          } else {
            room = await Room.findOneAndUpdate({ _id: roomId }, { $addToSet: { [`team${user.team}.players`]: user._id }}).exec()
          }
        } else { // Use default values (add as spectator)
          room = await Room.findOneAndUpdate({ _id: roomId }, { $addToSet: { "spectators": user._id }}).exec()
          user.roomId = roomId
          user.team = -1
          user.save()
        }
        await room.save();
      } catch (err) {
        console.log(`[joinRoom] error adding user to room as spectator`, err)
        return callback({ error: err.message })
      }

      // Add user as host if room is empty
      try {
        let user = await User.findOne({ 'socketId': socket.id })
        let room = await Room.findById(roomId)
        console.log(`[joinRoom] room`, room)
        if (room.host === null) {
          room.host = user._id
          room.save()
        }
      } catch (err) {
        console.log(`[joinRoom] error adding user as host`, err)
        return callback({ error: err.message })
      }

      // Update user's room id so user can be removed with socket id on disconnect
      // This reduces the number of users to loop over in Room.watch
      try {
        let user = await User.findOneAndUpdate({ 'socketId': socket.id }, { roomId })
        await user.save()
      } catch (err) {
        console.log(`[joinRoom] error updating user's room id`, err)
        return callback({ error: err.message })
      }

      return callback()
    })

    async function removeUser(user) {        
      await Room.updateOne(
        { 
          _id: user.roomId
        }, 
        { 
          $pullAll: { 
            'spectators': [
              { _id: user._id }
            ]
          }
        }
      ).exec()
      await Room.updateOne(
        { 
          _id: user.roomId 
        }, 
        { 
          $pullAll: 
            { 
              'team0.players': [
                { _id: user._id }
              ]
            }
        }
      ).exec()
      await Room.updateOne(
        { 
          _id: user.roomId 
        }, 
        { 
          $pullAll: 
            { 
              'team1.players': [
                { _id: user._id }
              ]
            }
          
        }
      ).exec()
    }

    socket.on("joinTeam", async ({ team, name }, callback) => {

      let player;
      try {
        player = await User.findOneAndUpdate({ 'socketId': socket.id }, { team, name }).exec()

        // Remove the user from the room
        await removeUser(player)
        
        // Add to the team's players array
        await Room.findOneAndUpdate({ _id: player.roomId }, { $addToSet: { [`team${team}.players`]: player._id }}).exec()
      } catch (err) {
        console.log(`[joinTeam] error joining team`, err)
        return callback()
      }

      return callback({ player })
    })

    socket.on("startGame", async ({ roomId }) => {
      let randomTeam = Math.floor(Math.random() * 2)
      let turn = {
        team: randomTeam,
        player: [0, 0]
      }
      try {
        await Room.findOneAndUpdate({ _id: roomId }, {
          gamePhase: "pregame",
          turn,
          [`team${turn.team}.throws`]: 1
        })
      } catch (err) {
        console.log(`[startGame] error starting game`, err)
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

    socket.on("disconnect", async () => {
      console.log(`${socket.id} disconnect`)
      try {
        // Remove user from room
        let user = await User.findOneAndDelete({ 'socketId': socket.id }).exec()
        console.log(`[disconnect] user to remove`, user._id)
        if (user.roomId) {
          console.log(`[disconnect] room not null`)
          await removeUser(user)
  
          // Remove host if it was the user
          // Assign another user in the room
          let updatedRoom = await Room.findById(user.roomId).exec()
          let hostId = updatedRoom.host
          let users = updatedRoom.spectators.concat(updatedRoom.team0.players.concat(updatedRoom.team1.players))
          if (user._id.valueOf() === hostId.valueOf() && users.length > 0) {
            updatedRoom.host = users[0]
            updatedRoom.save();
          } else if (users.length === 0) { // Remove host
            updatedRoom.host = null
            updatedRoom.save();
          }
        }
      } catch (err) {
        console.log(`[disconnect] error deleting user`, err)
      }
    });
})