import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

io.listen(3000);

let selection = null;
let tiles = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
];
let pieces = [
  [
    { tile: -1, team: 0, id: 0 },
    { tile: -1, team: 0, id: 1 },
    { tile: -1, team: 0, id: 2 },
    { tile: -1, team: 0, id: 3 },
  ],
  [
    { tile: -1, team: 1, id: 0 },
    { tile: -1, team: 1, id: 1 },
    { tile: -1, team: 1, id: 2 },
    { tile: -1, team: 1, id: 3 },
  ],
];
const characters = [];

const generateRandomPosition = () => {
  return [Math.random() * 3, 0, Math.random() * 3];
};

const generateRandomHexColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

io.on("connection", (socket) => {
  console.log("a user connected");

  characters.push({
    id: socket.id,
    position: generateRandomPosition(),
    color: generateRandomHexColor(),
  });

  io.emit("characters", characters);

  socket.on("select", (payload) => {
    console.log("[server][select]", payload);
    selection = payload;
    io.emit("select", selection);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");

    characters.splice(
      characters.findIndex((characters) => characters.id === socket.id),
      1
    );
    io.emit("characters", characters);
  });
});
