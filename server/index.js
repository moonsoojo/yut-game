import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import router from './router.js'; // needs .js suffix
import cors from 'cors';
import mongoose from 'mongoose';
import { makeId } from '../client/src/helpers/helpers.js';
import initialState from './initialState.js';

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
    teams: [{
      _id: Number,
      players: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
      }],
      pieces: [{
        tile: Number, // Home: -1, Scored: 29
        team: Number,
        id: Number,
        history: [Number],
        // Schema validation prevents assigning "scored" as a piece
        // (item in array)
        _id: false
      }],
      throws: Number,
      moves: {
        '0': Number,
        '1': Number,
        '2': Number,
        '3': Number,
        '4': Number,
        '5': Number,
        '-1': Number
      },
      pregameRoll: Number
    }],
    turn: {
      team: Number,
      players: [Number]
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
    yootThrown: {
      flag: Boolean,
      player: String // User ID
    },
    yootThrowValues: [{
      _id: Number,
      positionInHand: { x: Number, y: Number, z: Number },
      rotation: { x: Number, y: Number, z: Number, w: Number},
      yImpulse: Number,
      torqueImpulse: { x: Number, y: Number, z: Number }
    }],
    pregameOutcome: String,
    selection: {
      tile: Number,
      pieces: [{
        tile: Number,
        team: Number,
        id: Number,
        history: [Number],
        _id: false
      }],
    },
    legalTiles: Object,
    tiles: [
      [
        {
          tile: Number,
          team: Number,
          id: Number,
          history: [Number],
          _id: false
        }
      ]
    ]
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
    let users = data.fullDocument.spectators.concat(data.fullDocument.teams[0].players.concat(data.fullDocument.teams[1].players))
    for (const user of users) {
      try {
        let userFound = await User.findById(user, 'socketId').exec()
        let userSocketId = userFound.socketId
        if ('yootThrowValues' in data.updateDescription.updatedFields) {
          let yootThrowValues = data.fullDocument.yootThrowValues
          io.to(userSocketId).emit('throwYoot', { yootThrowValues })
        } else {
          let roomPopulated = await Room.findById(data.documentKey._id)
          .populate('spectators')
          .populate('host')
          .populate('teams.players')
          .exec()
          io.to(userSocketId).emit('room', roomPopulated)
        }
      } catch (err) {
        console.log(`[Room.watch] error getting user's socket id`, err)
      }
    }
  }
})



io.on("connect", async (socket) => {

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
        teams: [
          {
            _id: 0,
            players: [],
            pieces: [
              { tile: -1, team: 0, id: 0, history: [] },
              { tile: -1, team: 0, id: 1, history: [] },
              { tile: -1, team: 0, id: 2, history: [] },
              { tile: -1, team: 0, id: 3, history: [] },
            ],
            moves: JSON.parse(JSON.stringify(initialState.initialMoves)),
            throws: 0,
            pregameRoll: null
          },
          {
            _id: 1,
            players: [],
            pieces: [
              { tile: -1, team: 1, id: 0, history: [] },
              { tile: -1, team: 1, id: 1, history: [] },
              { tile: -1, team: 1, id: 2, history: [] },
              { tile: -1, team: 1, id: 3, history: [] },
            ],
            moves: JSON.parse(JSON.stringify(initialState.initialMoves)),
            throws: 0,
            pregameRoll: null
          }
        ],
        messages: [],
        host: user._id,
        gamePhase: 'lobby',
        turn: {
          team: 0,
          players: [0, 0]
        },
        yootThrown: {
          flag: false,
          player: ''
        }, // To not trigger the throw twice in the server
        yootThrowValues: null,
        pregameOutcome: null,
        selection: null,
        legalTiles: {},
        tiles: JSON.parse(JSON.stringify(initialState.initialTiles))
      })
      await room.save();
      console.log('[createRoom] room', room)
      return callback({ roomId: objectId })
    } catch (err) {
      return callback({ error: err.message })
    }
  })

  socket.on("joinRoom", async ({ roomId }) => {
    // Add user to room
    try {
      let user = await User.findOne({ 'socketId': socket.id }).exec()
      let room;
      console.log(`[joinRoom] user`, user)
      if (user.roomId && user.roomId.valueOf() === roomId) { // Use value saved in local storage
        if (user.team === -1) {
          room = await Room.findOneAndUpdate({ _id: roomId }, { $addToSet: { "spectators": user._id }}).exec()
        } else {
          room = await Room.findOneAndUpdate({ _id: roomId, "teams._id": user.team }, { $addToSet: { [`teams.$.players`]: user._id }}).exec()
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
    }

    // Update user's room id so user can be removed with socket id on disconnect
    // This reduces the number of users to loop over in Room.watch
    try {
      let user = await User.findOneAndUpdate({ 'socketId': socket.id }, { roomId })
      await user.save()
    } catch (err) {
      console.log(`[joinRoom] error updating user's room id`, err)
    }
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
        _id: user.roomId,
        'teams._id': 0
      }, 
      { 
        $pullAll: 
          { 
            'teams.$.players': [
              { _id: user._id }
            ]
          }
      }
    ).exec()
    await Room.updateOne(
      { 
        _id: user.roomId,
        'teams._id': 1
      }, 
      { 
        $pullAll: 
          { 
            'teams.$.players': [
              { _id: user._id }
            ]
          }
        
      }
    ).exec()
  }

  socket.on("joinTeam", async ({ team, name }, callback) => {
    console.log(`[joinTeam]`)
    let player;
    try {
      player = await User.findOneAndUpdate({ 'socketId': socket.id }, { team, name }).exec()
      player.save()

      // Remove the user from the room
      await removeUser(player)
      
      // Add to the team's players array
      await Room.findOneAndUpdate({ _id: player.roomId, "teams._id": team }, { $addToSet: { [`teams.$.players`]: player._id }}).exec()
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
      players: [0, 0]
    }
    try {
      await Room.findOneAndUpdate({ _id: roomId }, {
        gamePhase: "pregame",
        turn
      })
      // get Host
      // get team
      await Room.findOneAndUpdate({ _id: roomId }, {
        $set: {
          [`teams.${randomTeam}.throws`]: 1,
        }
      })
    } catch (err) {
      console.log(`[startGame] error starting game`, err)
    }
  })

  function generateForceVectors(gamePhase) {
    let initialYootPositions = JSON.parse(JSON.stringify(initialState.initialYootPositions[gamePhase]))
    let initialYootRotations = JSON.parse(JSON.stringify(initialState.initialYootRotations))

    function generateRandomNumberInRange(num, plusMinus) {
      return num + Math.random() * plusMinus * (Math.random() > 0.5 ? 1 : -1);
    };

    const yootForceVectors = [];
    for (let i = 0; i < 4; i++) {
      yootForceVectors.push({
        _id: i,
        positionInHand: initialYootPositions[i],
        rotation: initialYootRotations[i],
        yImpulse: generateRandomNumberInRange(2, 0.4),
        torqueImpulse: {
          x: generateRandomNumberInRange(0.1, 0.05),
          y: generateRandomNumberInRange(0.3, 0.1), // Spins vertically through the center
          z: generateRandomNumberInRange(0.035, 0.02), // Spins through the middle axis
        },
      });
    }
    
    return yootForceVectors
  }

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

  socket.on("throwYoot", async ({ roomId }) => {
    console.log(`[throwYoot]`)
    let user;
    
    // Find user who made the request
    try {
      user = await User.findOne({ socketId: socket.id })
    } catch (err) {
      console.log(`[throwYoot] error getting user with socket id ${socket.id}`, err)
    }

    try {
      let room = await Room.findOne({ _id: roomId })

      // Check thrown flag again because client takes time to update its state
      if (room.teams[user.team].throws > 0 && !room.yootThrown.flag) {
        // Update throw values
        // Update thrown flag so subsequent requests don't trigger a throw
        await Room.findOneAndUpdate(
          { 
            _id: roomId
          }, 
          { 
            $set: { 
              yootThrowValues: generateForceVectors(room.gamePhase),
              yootThrown: {
                flag: true,
                player: user._id
              }
            },
          }
        )

        // Decrement throws for throwing team
        await Room.findOneAndUpdate(
          { 
            _id: roomId, 
            'teams._id': user.team 
          }, 
          { 
            $inc: { [`teams.$.throws`]: -1 } 
          }
        )
      }
    } catch (err) {
      console.log(`[throwYoot] error updating throw values and thrown flag, and decrementing throws`, err)
    }
  })

  function currentPlayer(room) {
    const turn = room.turn
    const currentTeam = turn.team
    const currentPlayer = room.teams[currentTeam].players[turn.players[currentTeam]]
    return currentPlayer
  }

  function passTurn(currentTurn, teams) {
    const currentTeam = currentTurn.team

    if (currentTurn.team == teams.length - 1) {
      currentTurn.team = 0
    } else {
      currentTurn.team++
    }
  
    if (currentTurn.players[currentTeam] == teams[currentTeam].players.length - 1) {
      currentTurn.players[currentTeam] = 0
    } else {
      currentTurn.players[currentTeam]++
    }

    return currentTurn
  }

  function setTurn(currentTurn, team) {
    return {
      team: team,
      players: currentTurn.players
    }
  }

  // Return the result
  function comparePregameRolls(team0Roll, team1Roll) {
    console.log(`[passTurnPregame] team 0 roll`, team0Roll, 'team 1 roll', team1Roll)
    if (team0Roll && team1Roll) {
      if (team0Roll === team1Roll) {
        // Clear pregame rolls
        // return passTurn(currentTurn, teams)
        return "tie"
      } else if (team0Roll > team1Roll) {
        // Proceed to the game phase
        // return setTurn(currentTurn, 0)
        return 0
      } else if (team1Roll > team0Roll) {
        // Proceed to the game phase
        // return setTurn(currentTurn, 1)
        return 1
      }
    } else {
      // return passTurn(currentTurn, teams)
      return "pass"
    }
  }

  function isEmptyMoves(moves) {
    for (const move in moves) {
      if (parseInt(move) !== 0 && moves[move] > 0) {
        return false;
      }
    }
    return true;
  }

  socket.on("recordThrow", async ({ move, roomId }) => {
    console.log("[recordThrow] move", move)

    let user;
    try {
      user = await User.findOne({ socketId: socket.id })
    } catch (err) {
      console.log(`[recordThrow] error getting user with socket id ${socket.id}`, err)
    }

    try {
      let room = await Room.findOne({ _id: roomId })  

      // Check if user threw the yoot
      if (user._id.valueOf() === room.yootThrown.player) { // room.yootThrown.player is a string

        // Reset flag so client can activate the throw button again
        await Room.findOneAndUpdate(
          { 
            _id: roomId
          }, 
          { 
            $set: { 
              'yootThrown.flag': false
            },
          }
        )

        // Add move to team
        if (room.gamePhase === "pregame") {
          // Test code using different throw outcome
          // move = 2;
          // if (user.team === 0) {
          //   move = 5;
          // } else {
          //   move = 1;
          // }
          await Room.findOneAndUpdate(
            { 
              _id: roomId, 
              'teams._id': user.team,
            }, 
            { 
              $set: { [`teams.$.pregameRoll`]: move } 
            }
          )
        } else if (room.gamePhase === "game") {
          // Test code using different throw outcome
          // move = -1;
          let operation = { 
            $inc: { [`teams.$.moves.${move}`]: 1 } 
          }
          // Add bonus throw on Yoot and Mo
          if (move === 4 || move === 5) {
            operation['$inc'][`teams.$.throws`] = 1
          }
          await Room.findOneAndUpdate(
            { 
              _id: roomId, 
              'teams._id': user.team,
            }, 
            operation
          )
          // console.log(`[recordThrow] awaited value`, awaitedValue) // undefined
        }


        console.log(`[recordThrow] added move to team`)
      }
    } catch (err) {
      console.log(`[recordThrow] error recording throw`, err)
    }

    // Pass turn
    try {
      // Fetch up-to-date room to calculate the next turn
      let room = await Room.findOne({ _id: roomId })  

      // Check if user has the turn
      if (user._id.valueOf() === room.yootThrown.player.valueOf()) {

        if (room.gamePhase === "pregame") {
          const outcome = comparePregameRolls(room.teams[0].pregameRoll, room.teams[1].pregameRoll)
          console.log(`[recordThrow] outcome`, outcome)
          if (outcome === "pass") {
            const newTurn = passTurn(room.turn, room.teams)
            await Room.findOneAndUpdate(
              { 
                _id: roomId, 
              }, 
              { 
                $set: { 
                  turn: newTurn,
                  pregameOutcome: outcome
                },
                $inc: { [`teams.${newTurn.team}.throws`]: 1 } 
              }
            )
          } else if (outcome === "tie") {
            const newTurn = passTurn(room.turn, room.teams)
            await Room.findOneAndUpdate(
              { 
                _id: roomId, 
              }, 
              { 
                $set: { 
                  'teams.0.pregameRoll': null,
                  'teams.1.pregameRoll': null,
                  'turn': newTurn,
                  'pregameOutcome': outcome
                },
                $inc: { [`teams.${newTurn.team}.throws`]: 1 } 
              }
            )
          } else {
            // 'outcome' is the winning team index
            const newTurn = setTurn(room.turn, outcome)
            console.log(`[recordThrow] newTurn`, newTurn)
            await Room.findOneAndUpdate(
              { 
                _id: roomId, 
              }, 
              {
                $set: { 
                  turn: newTurn,
                  gamePhase: 'game',
                  pregameOutcome: outcome.toString()
                },
                $inc: { [`teams.${outcome}.throws`]: 1 },
              }
            )
          }
        } else if (room.gamePhase === "game") {

          // If there's no valid move and no throw,
          // Pass turn
          // call .toObject() on moves to leave out the mongoose methods
          if (room.teams[user.team].throws === 0 && 
          isEmptyMoves(room.teams[user.team].moves.toObject())) {
            const newTurn = passTurn(room.turn, room.teams)
            await Room.findOneAndUpdate(
              { 
                _id: roomId, 
              }, 
              { 
                $set: { 
                  turn: newTurn,
                  // Empty the team's moves
                  [`teams.${user.team}.moves`]: JSON.parse(JSON.stringify(initialMoves)),
                },
                $inc: { [`teams.${newTurn.team}.throws`]: 1 } 
              }
            )
          }
        }
      }
    } catch (err) {
      console.log(`[recordThrow] error passing turn;`, err)
    }
  })

  // Client only emits this event if it has the turn
  socket.on("select", async ({ roomId, payload }) => {
    try {
      await Room.findOneAndUpdate(
        { 
          _id: roomId, 
        }, 
        { 
          $set: { 
            'selection': payload
          }
        }
      )
    } catch (err) {
      console.log(`[select] error making selection`, err)
    }
  });

  // Client only emits this event if it has the turn
  socket.on("legalTiles", async ({ roomId, legalTiles }) => {
    try {
      await Room.findOneAndUpdate(
        { 
          _id: roomId, 
        }, 
        { 
          $set: { 
            'legalTiles': legalTiles
          }
        }
      )
    } catch (err) {
      console.log(`[select] error making selection`, err)
    }
  });

  socket.on("move", async ({ roomId, tile }) => {
    try {
      // copy states
      // operate on them
      // set them to room
      const room = await Room.findById(roomId)
      let moveInfo = room.legalTiles[tile]
      let tiles = room.tiles
      let teams = room.teams
      let from = room.selection.tile
      let to = tile
      let moveUsed = moveInfo.move // not scoring
      let history = moveInfo.history
      let pieces = room.selection.pieces
      let starting = pieces[0].tile === -1
      let movingTeam = pieces[0].team;

      // logic
      // build operation
      // execute in one step
      let operation = {};
      operation['$set'] = {}
      operation['$inc'] = {}
      operation['$push'] = {}

      if (tiles[to].length > 0) {
        let occupyingTeam = tiles[to][0].team
        if (occupyingTeam != movingTeam) {
          for (let piece of tiles[to]) {
            piece.tile = -1
            piece.history = []
            operation['$set'][`teams.${occupyingTeam}.pieces.${piece.id}`] = piece
          }
          
          // Clear the pieces on the tile
          operation['$set'][`tiles.${to}`] = []
          operation['$inc'][`teams.${movingTeam}.throws`] = 1
        }
      }

      if (starting) {
        let piece = pieces[0]
        operation['$set'][`teams.${movingTeam}.pieces.${piece.id}.tile`] = to
      }

      // Add pieces to the tile
      pieces.forEach(function(_item, index, array) {
        array[index].tile = to
        array[index].history = history
      })
      operation['$push'][`tiles.${to}`] = { '$each': pieces }

      // Remove move
      operation['$inc'][`teams.${movingTeam}.moves.${moveUsed}`] = -1

      // Clear legal tiles and selection
      operation['$set']['legalTiles'] = {}
      operation['$set']['selection'] = null

      await Room.findOneAndUpdate(
        { 
          _id: roomId, 
        }, 
        operation
      )
      
    } catch (err) {
      console.log(`[move] error making move`, err)
    }
  })

  socket.on("disconnect", async () => {
    console.log(`${socket.id} disconnect`)
    try {

      // Remove user from room
      let user = await User.findOneAndDelete({ 'socketId': socket.id }).exec()
      console.log(`[disconnect] user to remove`, user)
      if (user && user.roomId) {
        console.log(`[disconnect] room not null`, user.roomId)
        let roomId = user.roomId
        await removeUser(user)

        // Remove host if it was the user
        // Assign another user in the room
        let updatedRoom = await Room.findById(roomId).exec()
        let hostId = updatedRoom.host
        console.log(`[disconnect] hostId`, hostId)
        let userCount = updatedRoom.spectators.length + updatedRoom.teams[0].players.length + updatedRoom.teams[1].players.length
        if (hostId) {
          if (user._id.valueOf() === hostId.valueOf() && userCount > 0) {
            updatedRoom.host = await User.findOne({ 'roomId': roomId })
            updatedRoom.save();
          } else if (userCount === 0) { // Remove host
            updatedRoom.host = null
            updatedRoom.save();
          }
        }
      }
    } catch (err) {
      console.log(`[disconnect] error deleting user`, err)
    }
  });
})