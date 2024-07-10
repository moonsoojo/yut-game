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
        lastPath: [Number],
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
        lastPath: [Number],
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
          lastPath: [Number],
          _id: false
        }
      ]
    ],
    moveResult: Object,
    throwResult: Object,
    results: [Number],
    // turnAlertActive: Boolean
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
          let yootThrown = data.fullDocument.yootThrown
          let currentTeam = data.fullDocument.turn.team
          let throwCount = data.updateDescription.updatedFields[`teams.${currentTeam}.throws`]
          io.to(userSocketId).emit('throwYoot', { yootThrowValues, yootThrown, throwCount })
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
            pieces: JSON.parse(JSON.stringify(initialState.initialPiecesTeam0)),
            moves: JSON.parse(JSON.stringify(initialState.initialMoves)),
            throws: 0,
            pregameRoll: null
          },
          {
            _id: 1,
            players: [],
            pieces: JSON.parse(JSON.stringify(initialState.initialPiecesTeam1)),
            moves: JSON.parse(JSON.stringify(initialState.initialMoves)),
            throws: 0,
            pregameRoll: null
          }
        ],
        messages: [],
        host: user._id,
        gamePhase: 'lobby',
        turn: {
          team: -1,
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
        tiles: JSON.parse(JSON.stringify(initialState.initialTiles)),
        results: [],
        moveResult: {
          type: '',
          team: -1,
          amount: 0,
          tile: -1
        },
        throwResult: {
          type: '',
          num: -2,
          time: Date.now()
        },
        // turnAlertActive: true
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

  function getHostTurn(room) {
    console.log(`[getHostTurn] room`, room)
    const host = room.host
    let turn;
    room.teams[host.team].players.forEach(function (player, i) {
      console.log(`[getHostTurn] i ${i}, player`, player._id.valueOf(), `host`, host._id.valueOf())
      if (player._id.valueOf() === host._id.valueOf()) {
        let playerIndices = [0, 0]
        playerIndices[host.team] = i
        turn = {
          team: host.team,
          players: playerIndices
        }
      }
    })
    return turn
  }

  socket.on("startGame", async ({ roomId }) => {

    try {
      // find host
      // give him first turn
      const room = await Room.findOne({ _id: roomId }).populate('host')
      // if this is a second game, winner gets to go first
      let newTurn;
      if (room.results.length > 0) {
        newTurn = {
          team: room.results[room.results.length-1],
          players: [0, 0]
        }
      } else {
        newTurn = getHostTurn(room)
      }
      console.log(`[startGame] turn`, newTurn)
      
      await Room.findOneAndUpdate({ _id: roomId }, {
        $set: {
          [`teams.${newTurn.team}.throws`]: 1,
          gamePhase: "pregame",
          turn: newTurn,
        }
      })
    } catch (err) {
      console.log(`[startGame] error starting game`, err)
    }
  })

  function generateRandomNumberInRange(num, plusMinus) {
    let result = num + Math.random() * plusMinus * (Math.random() > 0.5 ? 1 : -1);
    console.log(`[generateRandomNumberInRange] result.toFixed(5)`, result.toFixed(5))
    return result.toFixed(5)
  };

  function generateForceVectors(gamePhase) {
    let initialYootPositions = JSON.parse(JSON.stringify(initialState.initialYootPositions[gamePhase]))
    let initialYootRotations = JSON.parse(JSON.stringify(initialState.initialYootRotations))

    const yootForceVectors = [];
    for (let i = 0; i < 4; i++) {
      yootForceVectors.push({
        _id: i,
        positionInHand: initialYootPositions[i],
        rotation: initialYootRotations[i],
        yImpulse: generateRandomNumberInRange(10, 3),
        torqueImpulse: {
          x: generateRandomNumberInRange(0.8, 0.3),
          y: generateRandomNumberInRange(0.9, 0.3), // Spins vertically through the center
          z: generateRandomNumberInRange(0.15, 0.3) // Spins through the middle axis
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
              },
              // turnAlertActive: false
            },
            $inc: {
              [`teams.${user.team}.throws`]: -1
            }
          }
        )
      }
    } catch (err) {
      console.log(`[throwYoot] error updating throw values and thrown flag, and decrementing throws`, err)
    }
  })

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
    if ((team0Roll !== null) && (team1Roll !== null)) {
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

    let operation = {}
    operation['$set'] = {}
    operation['$inc'] = {}
    try {
      let room = await Room.findOne({ _id: roomId })  

      // Check if user threw the yoot
      if (user._id.valueOf() === room.yootThrown.player.valueOf()) { // room.yootThrown.player is a string

        // Reset flag so client can activate the throw button again
        operation['$set']['yootThrown.flag'] = false

        // Add move to team
        if (room.gamePhase === "pregame") {
          // Test code using different throw outcome
          // if (user.team === 1) {
          //   move = 5;
          // } else {
          //   move = 1
          // }
          // move = 5;
          room.teams[user.team].pregameRoll = move
          operation['$set'][`teams.${user.team}.pregameRoll`] = move

          operation['$set']['throwResult'] = {
            type: 'regular',
            num: move,
            time: Date.now()
          }
          
          const outcome = comparePregameRolls(room.teams[0].pregameRoll, room.teams[1].pregameRoll)
          if (outcome === "pass") {
            const newTurn = passTurn(room.turn, room.teams)
            operation['$set']['turn'] = newTurn
            operation['$set']['pregameOutcome'] = outcome
            operation['$inc'][`teams.${newTurn.team}.throws`] = 1
          } else if (outcome === "tie") {
            const newTurn = passTurn(room.turn, room.teams)
            operation['$set']['turn'] = newTurn
            operation['$set']['pregameOutcome'] = outcome
            operation['$set']['teams.0.pregameRoll'] = null
            operation['$set']['teams.1.pregameRoll'] = null
            operation['$inc'][`teams.${newTurn.team}.throws`] = 1
          } else {
            // 'outcome' is the winning team index
            const newTurn = setTurn(room.turn, outcome)
            operation['$set']['turn'] = newTurn
            operation['$set']['pregameOutcome'] = outcome.toString()
            operation['$set']['gamePhase'] = 'game'
            operation['$inc'][`teams.${outcome}.throws`] = 1
          }
        } else if (room.gamePhase === "game") {
          // Test code using different throw outcome
          // move = 3
          room.teams[user.team].moves[move]++;

          // Add bonus throw on Yoot and Mo
          if (move === 4 || move === 5) {
            operation['$inc'][`teams.${user.team}.throws`] = 1
            room.teams[user.team].throws++;
            operation['$set']['throwResult'] = {
              type: 'bonus',
              num: move,
              time: Date.now()
            }
          } else {
            operation['$set']['throwResult'] = {
              type: 'regular',
              num: move,
              time: Date.now()
            }
          }

          // If user threw out of bounds, pass turn
          // Call .toObject() on moves to leave out the mongoose methods
          if (room.teams[user.team].throws === 0 && 
          isEmptyMoves(room.teams[user.team].moves.toObject())) {
            const newTurn = passTurn(room.turn, room.teams)
            operation['$set']['turn'] = newTurn
            operation['$set'][`teams.${user.team}.moves`] = JSON.parse(JSON.stringify(initialState.initialMoves))
            operation['$inc'][`teams.${newTurn.team}.throws`] = 1
          } else {
            operation['$inc'][`teams.${user.team}.moves.${move}`] = 1
          }
        }

        await Room.findOneAndUpdate(
          { 
            _id: roomId, 
          }, 
          operation
        )

      }
    } catch (err) {
      console.log(`[recordThrow] error recording throw`, err)
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

  function movesIsEmpty (moves) {
    for (const move in moves) {
      if (parseInt(move) != 0 && moves[move] > 0) {
        return false;
      }
    }
    return true;
  }

  socket.on("move", async ({ roomId, tile }) => {
    try {
      const room = await Room.findById(roomId)
      let moveInfo = room.legalTiles[tile]
      let tiles = room.tiles
      // let teams = room.teams
      let from = room.selection.tile
      let to = tile
      let moveUsed = moveInfo.move
      let path = moveInfo.path
      let history = moveInfo.history
      let pieces = room.selection.pieces
      let starting = pieces[0].tile === -1
      let movingTeam = pieces[0].team;

      let moves = room.teams[movingTeam].moves;
      let throws = room.teams[movingTeam].throws;

      let operation = {};
      operation['$set'] = {}
      operation['$inc'] = {}
      operation['$push'] = {}

      for (const piece of pieces) {
        operation['$set'][`teams.${movingTeam}.pieces.${piece.id}.tile`] = to
        operation['$set'][`teams.${movingTeam}.pieces.${piece.id}.history`] = history
        operation['$set'][`teams.${movingTeam}.pieces.${piece.id}.lastPath`] = path
      }

      // Clear pieces from the 'from' tile if they were on the board
      if (!starting) {
        operation['$set'][`tiles.${from}`] = []
      }

      pieces.forEach(function(_item, index, array) {
        array[index].tile = to
        array[index].history = history
        array[index].lastPath = path
      })

      if (tiles[to].length > 0) {
        let occupyingTeam = tiles[to][0].team

        // Catch
        if (occupyingTeam != movingTeam) {
          operation['$set']['moveResult'] = {
            type: 'catch',
            team: movingTeam,
            amount: tiles[to].length,
            tile: to
          }
          for (let piece of tiles[to]) {
            piece.tile = -1
            piece.history = []
            operation['$set'][`teams.${occupyingTeam}.pieces.${piece.id}`] = piece
          }
          
          operation['$set'][`tiles.${to}`] = pieces
          throws++;
        } else { // Join or move into tile
          operation['$push'][`tiles.${to}`] = { '$each': pieces }
        }
      } else {
        operation['$push'][`tiles.${to}`] = { '$each': pieces }
      }

      // Clear legal tiles and selection
      operation['$set']['legalTiles'] = {}
      operation['$set']['selection'] = null

      moves[moveUsed]--;

      if (throws === 0 && isEmptyMoves(moves.toObject())) {
        const newTurn = passTurn(room.turn, room.teams)
        operation['$set']['turn'] = newTurn
        operation['$set'][`teams.${movingTeam}.moves`] = JSON.parse(JSON.stringify(initialState.initialMoves))
        operation['$inc'][`teams.${newTurn.team}.throws`] = 1
      } else {
        operation['$set'][`teams.${movingTeam}.throws`] = throws
        operation['$set'][`teams.${movingTeam}.moves`] = moves
      }

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

  socket.on("score", async ({ roomId, selectedMove }) => {
    // score
    try {
      const room = await Room.findById(roomId)

      let operation = {};
      operation['$set'] = {}
      operation['$inc'] = {}
      operation['$push'] = {}
      
      // update pieces
      const pieces = room.selection.pieces
      const movingTeam = pieces[0].team;
      const history = selectedMove.history
      const path = selectedMove.path
      for (const piece of room.selection.pieces) {
        operation['$set'][`teams.${movingTeam}.pieces.${piece.id}.tile`] = 29
        operation['$set'][`teams.${movingTeam}.pieces.${piece.id}.history`] = history
        operation['$set'][`teams.${movingTeam}.pieces.${piece.id}.lastPath`] = path

        // set state within the scope of this function for win check
        room.teams[movingTeam].pieces[piece.id].tile = 29
      }

      // update tiles
      const from = room.selection.tile
      operation['$set'][`tiles.${from}`] = []
      
      // update moves
      let moves = room.teams[movingTeam].moves;
      operation['$set'][`teams.${movingTeam}.moves`] = moves

      // update selection and legal tiles
      operation['$set']['legalTiles'] = {}
      operation['$set']['selection'] = null

      function winCheck(team) {
        for (const piece of team.pieces) {
          if (piece.tile !== 29) {
            return false
          }
        }
        return true;
      }

      if (winCheck(room.teams[movingTeam])) {
        operation['$push'][`results`] = movingTeam
        operation['$set']['gamePhase'] = 'finished'
      } else {
        // pass check
        let throws = room.teams[movingTeam].throws;
        moves[selectedMove.move]--;
        console.log(`[score] throws`, throws, `moves`, moves)
        if (throws === 0 && isEmptyMoves(moves.toObject())) {
          const newTurn = passTurn(room.turn, room.teams)
          await Room.findOneAndUpdate(
            { 
              _id: roomId, 
            }, 
            { 
              $set: { 
                turn: newTurn,
                // Empty the team's moves
                [`teams.${movingTeam}.moves`]: JSON.parse(JSON.stringify(initialState.initialMoves)),
              },
              $inc: { [`teams.${newTurn.team}.throws`]: 1 } 
            }
          )
        }
      }

      await Room.findOneAndUpdate(
        { 
          _id: roomId, 
        }, 
        operation
      )
    } catch (err) {
      console.log(`[move] error scoring piece`, err)
    }
  })

  socket.on("reset", async ({ roomId }) => {
    // change gamePhase to lobby
    // reset tiles
    // reset teams except the player names (pieces, moves, throws)
    // pregame outcome, legal tiles, selection
    // set turn to someone random
    // yoot thrown
    try {
      let operation = {};
      operation['$set'] = {}
      operation['$set']['gamePhase'] = 'lobby'
      operation['$set']['tiles'] = JSON.parse(JSON.stringify(initialState.initialTiles)),
      operation['$set']['legalTiles'] = {}
      operation['$set']['selection'] = null
      operation['$set']['pregameOutcome'] = null
      operation['$set']['yootThrown'] = {
        flag: false,
        player: ''
      }
      operation['$set']['turn'] = {
        team: -1,
        // team: generateRandomNumberInRange(1, 1) > 1 ? 0 : 1,
        players: [0, 0]
      }
      operation['$set'][`teams.0.pieces`] = JSON.parse(JSON.stringify(initialState.initialPiecesTeam0))
      operation['$set'][`teams.0.throws`] = 0
      operation['$set'][`teams.0.moves`] = JSON.parse(JSON.stringify(initialState.initialMoves))
      operation['$set'][`teams.0.pregameRoll`] = null
      operation['$set'][`teams.1.pieces`] = JSON.parse(JSON.stringify(initialState.initialPiecesTeam1))
      operation['$set'][`teams.1.throws`] = 0
      operation['$set'][`teams.1.moves`] = JSON.parse(JSON.stringify(initialState.initialMoves))
      operation['$set'][`teams.1.pregameRoll`] = null

      await Room.findOneAndUpdate(
        { 
          _id: roomId, 
        }, 
        operation
      )

      console.log(`[reset] success`)
    } catch (err) {
      console.log(`[reset] error resetting game`, err)
    }
  })

  // socket.on("turnAlertActive", async ({ roomId, flag }) => {
  //   try {
  //     let operation = {}
  //     operation['$set'] = {}
  //     operation['$set'][`turnAlertActive`] = flag
  //     await Room.findOneAndUpdate(
  //       { 
  //         _id: roomId, 
  //       }, 
  //       operation
  //     )
  //   } catch (err) {
  //     console.log(`[reset] error setting turn alert flag`, err)
  //   }
  // })

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