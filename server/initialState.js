export default {
  selection: undefined,
  numClientsYutResting: 0,
  // when piece is moved to the board, it is set to null
  pieces: [
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
  ],
  teams: [
    {
      index: 0,
      displayName: "",
      players: [], // list of objects
      pieces: [
        { tile: -1, team: 0, id: 0 },
        { tile: -1, team: 0, id: 1 },
        { tile: -1, team: 0, id: 2 },
        { tile: -1, team: 0, id: 3 },
      ],
    },
    { 
      index: 1,
      displayName: "",
      players: [], // list of objects
      pieces: [
        { tile: -1, team: 1, id: 0 },
        { tile: -1, team: 1, id: 1 },
        { tile: -1, team: 1, id: 2 },
        { tile: -1, team: 1, id: 3 },
      ],
    }
  ],
  player: {
    socketId: -1, // generated by the connection
    index: -1, // in the 'players' list in the team
    displayName: "",
    team: -1,
    throws: 0,
    moves: {
      "1-step": 0,
      "2-steps": 0,
      "3-steps": 0,
      "4-steps": 0,
      "5-steps": 0,
      "back-1-step": 0
    }
  },
  turn: {
    team: -1,
    player: -1
  },
  tiles: [
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
  ],
};
