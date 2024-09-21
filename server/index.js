import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import router from './router.js'; // needs .js suffix
import cors from 'cors';
import mongoose from 'mongoose';
import { makeId } from './src/helpers.js';
import initialState from './initialState.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: [
    //   "https://master.dh445c3qmwe4t.amplifyapp.com",
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
    gameLogs: [{
      _id: false,
      logType: String,
      content: Object
    }],
    host: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'users'
    },
    gamePhase: String,
    yootOutcome: Number,
    yootAnimation: Number,
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
    results: [Number],
    serverEvent: String,
    lastJoinedUser: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'users'
    },
  },
  {
    versionKey: false,
    minimize: false
  }
)

const User = mongoose.model('users', userSchema)
const Room = mongoose.model('rooms', roomSchema)

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
    console.log(`[Room.watch] users`, users)
    let roomPopulated = await Room.findById(data.documentKey._id)
    .populate('spectators')
    .populate('host')
    .populate('teams.players')
    .exec()
    for (const user of users) {
      try {
        let userFound = await User.findById(user, 'socketId').exec()
        let userSocketId = userFound.socketId
        console.log(`[Room.watch] userSocketId`, userSocketId)
        const serverEvent = data.fullDocument.serverEvent
        console.log(`[Room.watch] serverEvent`, serverEvent)
        if (serverEvent === "gameStart") {
          io.to(userSocketId).emit("gameStart", {
            teams: roomPopulated.teams,
            gamePhase: data.fullDocument.gamePhase,
            turn: data.fullDocument.turn,
            gameLogs: data.fullDocument.gameLogs
          })
        } else if (serverEvent === "recordThrow") {
          io.to(userSocketId).emit("recordThrow", {
            teams: roomPopulated.teams,
            gamePhaseUpdate: data.fullDocument.gamePhase,
            turn: data.fullDocument.turn,
            pregameOutcome: data.fullDocument.pregameOutcome,
            yootOutcome: data.fullDocument.yootOutcome,
            gameLogs: data.fullDocument.gameLogs
          })
        } else if (serverEvent === "move") {
          io.to(userSocketId).emit("move", {
            teamsUpdate: roomPopulated.teams,
            turnUpdate: data.fullDocument.turn,
            legalTiles: data.fullDocument.legalTiles,
            tiles: data.fullDocument.tiles,
            gameLogs: data.fullDocument.gameLogs,
            selection: data.fullDocument.selection
          })
        } else if (serverEvent === "select") {
          io.to(userSocketId).emit("select", {
            selection: data.fullDocument.selection,
            legalTiles: data.fullDocument.legalTiles
          })
        } else if (serverEvent === "throwYoot") {
          io.to(userSocketId).emit('throwYoot', { 
            yootOutcome: data.fullDocument.yootOutcome, 
            yootAnimation: data.fullDocument.yootAnimation, 
            teams: roomPopulated.teams, 
            turn: data.fullDocument.turn
          })
        } else if (serverEvent === "score") {
          io.to(userSocketId).emit('score', { 
            teamsUpdate: roomPopulated.teams, 
            turnUpdate: data.fullDocument.turn,
            legalTiles: data.fullDocument.legalTiles,
            tiles: data.fullDocument.tiles,
            gameLogs: data.fullDocument.gameLogs,
            selection: data.fullDocument.selection,
            results: data.fullDocument.results,
            gamePhase: data.fullDocument.gamePhase
          })
        } else if (serverEvent === "joinRoom") {
          if (user._id.valueOf() === data.fullDocument.lastJoinedUser.valueOf()) {
            io.to(userSocketId).emit('room', roomPopulated)
          } else {
            io.to(userSocketId).emit('joinRoom', { 
              spectators: roomPopulated.spectators,
              teams: roomPopulated.teams,
              host: roomPopulated.host,
              gamePhase: roomPopulated.gamePhase
            })
          }
        } else if (serverEvent === "joinTeam") {
          io.to(userSocketId).emit("joinTeam", { 
            spectators: roomPopulated.spectators,
            teams: roomPopulated.teams,
            gamePhase: roomPopulated.gamePhase
          })
        } else {
          console.log(`[Room.watch] no serverEvent match`)
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
  // save user into a variable
  // if addUser failed, disconnect and alert client

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
        gameLogs: [],
        host: user._id,
        gamePhase: 'lobby',
        turn: {
          team: -1,
          players: [0, 0]
        },
        yootOutcome: null,
        yootAnimation: null,
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
        serverEvent: ''
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
      if (user.roomId && user.roomId.valueOf() === roomId) { // Use value saved in local storage
        if (user.team === -1) { // if spectator
          room = await Room.findOneAndUpdate(
            { _id: roomId }, 
            { 
              $addToSet: { "spectators": user._id },
              $set: { 
                "serverEvent": 'joinRoom',
                "lastJoinedUser": user._id
              }
            })
            .exec()
        } else {
          room = await Room.findOneAndUpdate(
            { _id: roomId, "teams._id": user.team }, 
            { 
              $addToSet: { [`teams.$.players`]: user._id },
              $set: { 
                "serverEvent": 'joinRoom',
                "lastJoinedUser": user._id
              }
            })
            .exec()
        }
      } else { // Use default values (add as spectator)
        room = await Room.findOneAndUpdate(
          { _id: roomId }, 
          { 
            $addToSet: { "spectators": user._id },
            $set: { 
              "serverEvent": 'joinRoom',
              "lastJoinedUser": user._id
            }
          })
          .exec()
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
          ],
          'teams.0.players': [
            { _id: user._id }
          ],
          'teams.1.players': [
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

      let operation = {}
      operation['$pullAll'] = { 
        'spectators': [{ _id: player._id }], // Remove the user from the spectator list
        [`teams.${team === 0 ? 1 : 0}.players`]: [{ _id: player._id }] 
      }
      operation['$addToSet'] = { [`teams.${team}.players`]: player._id }
      operation['$set'] = { 'serverEvent': 'joinTeam' }
      
      // Add to the team's players array
      await Room.findOneAndUpdate(
        { _id: player.roomId }, 
        operation
      )
        .exec()
    } catch (err) {
      console.log(`[joinTeam] error joining team`, err)
      return callback()
    }

    return callback({ player })
  })

  function getHostTurn(room) {
    const host = room.host
    let turn;
    room.teams[host.team].players.forEach(function (player, i) {
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
    console.log(`[startGame]`)
    try {

      const room = await Room.findOne({ _id: roomId }).populate('host')

      let newTurn;
      if (room.results.length > 0) {
        newTurn = {
          team: room.results[room.results.length-1],
          players: [0, 0]
        }
      } else {
        newTurn = getHostTurn(room)
      }
      
      await Room.findOneAndUpdate({ _id: roomId }, {
        $set: {
          [`teams.${newTurn.team}.throws`]: 1,
          gamePhase: "pregame",
          turn: newTurn,
          serverEvent: "gameStart"
        },
        $push: {
          gameLogs: {
            logType: 'gameStart',
            content: {
              text: `Match ${room.results.length+1} started`
            }
          }
        }
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

  function sumArray(array) {
    return array.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  }

  function pickOutcome() {
    // return outcome
    // front end maps outcome to an animation
    const doProb = 0.15
    const backdoProb = 0.05
    const geProb = 0.3
    const gulProb = 0.33
    const yootProb = 0.12
    const moProb = 0.03
    const nakProb = 0.02
    const probs = [doProb, backdoProb, geProb, gulProb, yootProb, moProb, nakProb]
    const randomNum = Math.random()
    console.log(`[pickOutcome] randomNum`, randomNum)
    if (randomNum < sumArray(probs.slice(0, 1))) {
      return 1
    } else if (randomNum >= sumArray(probs.slice(0, 1)) && randomNum < sumArray(probs.slice(0, 2))) {
      return -1
    } else if (randomNum >= sumArray(probs.slice(0, 2)) && randomNum < sumArray(probs.slice(0, 3))) {
      return 2
    } else if (randomNum >= sumArray(probs.slice(0, 3)) && randomNum < sumArray(probs.slice(0, 4))) {
      return 3
    } else if (randomNum >= sumArray(probs.slice(0, 4)) && randomNum < sumArray(probs.slice(0, 5))) {
      return 4
    } else if (randomNum >= sumArray(probs.slice(0, 5)) && randomNum < sumArray(probs.slice(0, 6))) {
      return 5
    } else if (randomNum >= sumArray(probs.slice(0, 6)) && randomNum < sumArray(probs.slice(0, 7))) {
      return 0
    }
  }

  function pickAnimation(outcome) {
    const outcomeToPseudoIndex = {
      '1': [14, 22, 25, 42],
      '-1': [59, 60],
      '2': [8, 13, 15, 16, 23, 28, 30, 31, 32, 35, 38, 39, 40, 48, 49, 50, 52, 54, 57, 58],
      '3': [2, 17, 21, 24, 29, 34, 36, 37, 41, 46, 47, 51, 53, 55, 56],
      '4': [19, 20, 26, 27, 33, 44, 45],
      '5': [43],
      '0': [1, 3, 4, 5, 6, 7, 9, 10, 11, 12, 18],
    }
    console.log(`[pickAnimation] outcome ${outcome}`)
    const listOfAnimations = outcomeToPseudoIndex[outcome]
    let pseudoIndex = listOfAnimations[Math.floor(Math.random() * listOfAnimations.length)]
    console.log(`[pickAnimation] length of animations ${listOfAnimations.length}, pseudoIndex ${pseudoIndex}`)
    return pseudoIndex
  }

  socket.on("throwYoot", async ({ roomId }) => {
    let user;
    
    // Find user who made the request
    try {
      user = await User.findOne({ socketId: socket.id })
    } catch (err) {
      console.log(`[throwYoot] error getting user with socket id ${socket.id}`, err)
    }

    try {
      let room = await Room.findOne({ _id: roomId })

      if (room.teams[user.team].throws > 0) {

        // const outcome = pickOutcome()
        // for testing
        let outcome;
        if (room.gamePhase === 'pregame') {
          if (room.turn.team === 1) {
            outcome = 5
          } else {
            outcome = 4
          }
        } else if (room.gamePhase === 'game') {
          outcome = 1
        }
        const animation = pickAnimation(outcome)
        await Room.findOneAndUpdate(
          { 
            _id: roomId
          }, 
          { 
            $set: { 
              yootOutcome: outcome,
              yootAnimation: animation,
              serverEvent: 'throwYoot'
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

    console.log('[recordThrow] move', move)

    let user;
    try {
      user = await User.findOne({ socketId: socket.id })
    } catch (err) {
      console.log(`[recordThrow] error getting user with socket id ${socket.id}`, err)
    }

    let operation = {}
    operation['$set'] = {}
    operation['$inc'] = {}
    operation['$push'] = {}
    try {
      let room = await Room.findOne({ _id: roomId })  

      // on yoot or mo, if gamePhase is 'game', add 'bonus: true' to 'content'.
      // else, add 'bonus: false'
      let gameLogs = [] 

      // Add move to team
      if (room.gamePhase === "pregame") {
        // Test code using different throw outcome
        // if (user.team === 0) {
        //   move = 5;
        // } else {
        //   move = 4
        // }
        // move = 3;
        room.teams[user.team].pregameRoll = move
        operation['$set'][`teams.${user.team}.pregameRoll`] = move

        gameLogs.push(
          {
            logType: 'throw',
            content: {
              playerName: user.name,
              team: user.team,
              move: move,
              bonus: false
            }
          }
        )
        
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
          gameLogs.push(
            {
              logType: 'pregameResult',
              content: {
                team: -1
              }
            }
          )
        } else {
          // 'outcome' is the winning team index
          const newTurn = setTurn(room.turn, outcome)
          operation['$set']['turn'] = newTurn
          operation['$set']['pregameOutcome'] = outcome.toString()
          operation['$set']['gamePhase'] = 'game'
          operation['$inc'][`teams.${outcome}.throws`] = 1
          gameLogs.push(
            {
              logType: 'pregameResult',
              content: {
                team: outcome
              }
            }
          )
        }
      } else if (room.gamePhase === "game") {
        // Test code using different throw outcome
        // if (user.team === 1) {
        //   move = 1;
        // } else {
        //   move = 5;
        // }
        // move = 0;
        room.teams[user.team].moves[move]++;

        // Add bonus throw on Yoot and Mo
        if (room.yootOutcome === 4 || room.yootOutcome === 5) {
          operation['$inc'][`teams.${user.team}.throws`] = 1
          room.teams[user.team].throws++;
          
          gameLogs.push({
            logType: 'throw',
            content: {
              playerName: user.name,
              team: user.team,
              move: move,
              bonus: true
            }
          })
        } else {
          gameLogs.push({
            logType: 'throw',
            content: {
              playerName: user.name,
              team: user.team,
              move: move,
              bonus: false
            }
          })
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

      operation['$push']['gameLogs'] = { '$each': gameLogs }
      
      console.log(`[recordThrow] logging server event`)
      operation['$set']['serverEvent'] = 'recordThrow'

      await Room.findOneAndUpdate(
        { 
          _id: roomId, 
        }, 
        operation
      )
    } catch (err) {
      console.log(`[recordThrow] error recording throw`, err)
    }
  })

  // Client only emits this event if it has the turn
  socket.on("select", async ({ roomId, selection, legalTiles }) => {
    // emit server event "select"
    // disable yoot button
    try {
      await Room.findOneAndUpdate(
        { 
          _id: roomId, 
        }, 
        { 
          $set: { 
            'selection': selection === 'null' ? null : selection,
            'legalTiles': legalTiles,
            'serverEvent': 'select'
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
      console.log(`[legalTiles] error making selection`, err)
    }
  });

  socket.on("move", async ({ roomId, tile }) => {
    try {
      const room = await Room.findById(roomId)
      let user;
      try {
        user = await User.findOne({ socketId: socket.id })
      } catch (err) {
        console.log(`[recordThrow] error getting user with socket id ${socket.id}`, err)
      }
  
      let moveInfo = room.legalTiles[tile]
      let tiles = room.tiles
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

      let gameLogs = [];
      gameLogs.push({
        logType: "move",
        content: {
          playerName: user.name,
          team: movingTeam,
          tile,
          numPieces: pieces.length,
          starting
        }
      })

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
          for (let piece of tiles[to]) {
            piece.tile = -1
            piece.history = []
            operation['$set'][`teams.${occupyingTeam}.pieces.${piece.id}`] = piece
          }
          
          operation['$set'][`tiles.${to}`] = pieces
          throws++;

          gameLogs.push({
            logType: "catch",
            content: {
              playerName: user.name,
              team: movingTeam,
              caughtTeam: occupyingTeam,
              numPiecesCaught: tiles[to].length,
            }
          })
        } else { // Join pieces
          operation['$push'][`tiles.${to}`] = { '$each': pieces }
          
          gameLogs.push({
            logType: "join",
            content: {
              playerName: user.name,
              team: movingTeam,
              numPiecesCombined: pieces.length + tiles[to].length,
            }
          })
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
      
      operation['$push']['gameLogs'] = { '$each': gameLogs }
      operation['$set']['serverEvent'] = 'move'

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

      let gameLogs = [];
      
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

      let user;
      try {
        user = await User.findOne({ socketId: socket.id })
      } catch (err) {
        console.log(`[recordThrow] error getting user with socket id ${socket.id}`, err)
      }

      gameLogs.push({
        logType: 'score',
        content: {
          playerName: user.name,
          team: movingTeam,
          numPiecesScored: room.selection.pieces.length
        }
      })

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

        gameLogs.push({
          logType: 'finish',
          content: {
            winningTeam: movingTeam,
            matchNum: room.results.length+1
          }
        })
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

      operation['$push']['gameLogs'] = { '$each' : gameLogs }
      operation['$set']['serverEvent'] = 'score'

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