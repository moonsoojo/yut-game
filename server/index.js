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
    _id: String, // socketId
    name: String,
    roomId: String,
    team: Number
  },
  {
    versionKey: false,
  }
)
const teamSchema = new mongoose.Schema(
  {
    _id: Number, // int between 0 and 1, possibly more
    players: [userSchema]
  },
  {
    versionKey: false,
  }
)
const roomSchema = new mongoose.Schema(
  {
    _id: String,
    createdTime: Date,
    spectators: [userSchema],
    teams: [teamSchema],
    messages: [{
      _id: false,
      name: String,
      text: String
    }],
    host: userSchema,
    yootThrown: Boolean
  },
  {
    versionKey: false,
    minimize: false
  }
)

const Room = mongoose.model('rooms', roomSchema)
const User = mongoose.model('users', userSchema)
const roomStream = Room.watch([], { fullDocument: 'updateLookup' })
const userStream = User.watch([], { fullDocument: 'updateLookup' })

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
      _id: socketId,
      name: name,
      roomId: '',
      team: -1
    })
    await user.save();
  } catch (err) {
    console.log('[addUser]', err)
    return null
  }
}
io.on("connect", async (socket) => { // socket.handshake.query is data obj

    connectMongo().catch(err => console.log('mongo connect error', err))

    socket.on('createUser', () => {      
      userStream.on('change', data => {
        if (data.documentKey._id === socket.id) {
          console.log('[createUser] user stream change detected', data)
          socket.emit('client', data.fullDocument)
        }
      })

      let name = makeId(5)
      addUser(socket.id, name)
    })

    socket.on("createRoom", async ({ userId }, callback) => {
      // create room document
      // update user's room
      // add user as host
      try {
        let objectId = new mongoose.Types.ObjectId()
        let user = await User.findById(userId).exec()
        user.roomId = objectId
        const room = new Room({
          _id: objectId,
          createdTime: new Date(),
          spectators: [],
          teams: [{ _id: 0, players: [] }, { _id: 1, players: [] }],
          messages: [],
          host: user
        })
        await room.save();
        await user.save();
        console.log('[createRoom] room saved', room)
        return callback({ roomId: objectId.valueOf() })
      } catch (err) {
        return callback({ error: err.message })
      }
    })

    socket.on("joinRoom", ({ roomId }, callback) => {
      console.log('[joinRoom]', roomId)
      // subscribe to updates
      userStream.on('change', data => {
        if (data.documentKey._id === roomId) {
          console.log('[createUser] room stream change detected', data)
          socket.emit('room', data.fullDocument)
        }
      })
      // add to spectators
      // fetch user using socket.id
      return callback()
    })

    function deleteUser(room, socketId) {
      let users = room.spectators;
      for (const team of room.teams) {
        users.concat(team.players)
      }
      for (const user of users) {
        console.log(`[disconnect] user`, user)
        if (user._id === socketId) {
          if (user.team === -1) {
            room.spectators.id(socketId).deleteOne()
          } else {
            room.teams[user.team].players.id(socketId).deleteOne()
          }
        }
      }
    }

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

      // let userName = '';
      // try {
      //   let room = await Room.findById(roomIdSocket).exec();
      //   deleteUser(room, socket.id)
      //   await room.save();
      // } catch (err) {
      //   console.log(`[disconnect] socket ${socket.id} disconnecting from room ${roomIdSocket} error`, err)
      // }

      // try {
      //   let room = await Room.findById(roomIdSocket).exec();
      //   const message = {
      //     name: 'admin',
      //     text: `${userName} left the room.`
      //   }
      //   room.messages.push(message)
      //   await room.save();
      // } catch (err) {
      //   console.log('[disconnect] error sending message', err)
      // }
    });
})