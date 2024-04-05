// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Add CORS middleware to allow requests from the Amplify app
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Define a schema for the room document
const roomSchema = new mongoose.Schema({
  roomName: String,
  players: [String],
  gameState: String,
});

// Define a model based on the schema
const Room = mongoose.model('Room', roomSchema);

// Express middleware to parse JSON bodies
app.use(express.json());

// Express route to create a new room
app.post('/rooms', async (req, res) => {
  try {
    const { roomName, players, gameState } = req.body;
    const newRoom = new Room({
      roomName,
      players,
      gameState,
    });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
