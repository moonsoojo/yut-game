export default {
  room: {
    id: null,
    teams: [
      {
        index: 0,
        players: [],
        moves: {
          "1": 0,
          "2": 0,
          "3": 0,
          "4": 0,
          "5": 0,
          "-1": 0,
          "0": 0
        },
        throws: 0,
        pieces: [
          { tile: -1, team: 0, id: 0, path: [] }, // null, {values} or "scored"
          { tile: -1, team: 0, id: 1, path: [] },
          { tile: -1, team: 0, id: 2, path: [] },
          { tile: -1, team: 0, id: 3, path: [] },
        ],
      },
      {
        index: 0,
        players: [],
        moves: {
          "1": 0,
          "2": 0,
          "3": 0,
          "4": 0,
          "5": 0,
          "-1": 0,
          "0": 0
        },
        throws: 0,
        pieces: [
          { tile: -1, team: 0, id: 0, path: [] }, // null, {values} or "scored"
          { tile: -1, team: 0, id: 1, path: [] },
          { tile: -1, team: 0, id: 2, path: [] },
          { tile: -1, team: 0, id: 3, path: [] },
        ],
      }
    ],
    turn: {
      team: 0,
      players: [0, 0]
    },
    tiles: [
      [], // { [ { team: int, id: int, tile: int, history: int[] } ] }
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
    spectators: [],
    selection: null,
    hostId: null,
    clients: {},
    readyToStart: false,
    gamePhase: 'lobby',
    readyToThrow: false,
    legalTiles: {},
    messages: [],
    winner: null
  },
  selection: undefined,
  gamePhase: "lobby",
  teams: [
    {
      index: 0,
      // name: "",
      players: [], // list of objects
      pieces: [
        { tile: -1, team: 0, id: 0, path: [] }, // null, {values} or "scored"
        { tile: -1, team: 0, id: 1, path: [] },
        { tile: -1, team: 0, id: 2, path: [] },
        { tile: -1, team: 0, id: 3, path: [] },
      ],
      moves: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "-1": 0,
        "0": 0
      },
      throws: 0
    },
    { 
      index: 1,
      // name: "",
      players: [], // list of objects
      pieces: [
        { tile: -1, team: 1, id: 0, history: [] },
        { tile: -1, team: 1, id: 1, history: [] },
        { tile: -1, team: 1, id: 2, history: [] },
        { tile: -1, team: 1, id: 3, history: [] },
      ],
      moves: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "-1": 0,
        "0": 0
      },
      throws: 0
    }
  ],
  moves: {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "-1": 0,
    "0": 0
  },
  player: {
    //   team: int,
    //   name: string,
    //   socketId: string,
    //   yutsAsleep: boolean,
    //   participating: boolean,
    //   firstLoad: boolean
  },
  turn: {
    team: 0,
    players: [0, 0] // list of ints
  },
  tiles: [
    [], // { [ { team: int, id: int, tile: int, history: int[] } ] }
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
  legalTiles: {},
  // schema
  // legalTiles: {
  //    int (tile): { move: int, history: int[] },
  //    29: [ 
  //      { move: int, history: int[] }, 
  //      { move: int, history: int[] }  
  //    ] 
  // }
  initialYootPositions: [
    { x: -0.8, y: 5, z: 0, },
    { x: -0.4, y: 5, z: 0, },
    { x: 0.4, y: 5, z: 0, },
    { x: 0.8, y: 5, z: 0, },
  ],
  // initialYootRotations: [
  //   // must be set to non-0 value to reset the rotation
  //   { x: -0.269, y:  0.654, z: -0.269, w:  0.654 },
  //   { x: -0.269, y:  0.654, z: -0.269, w:  0.654 },
  //   { x: -0.269, y:  0.654, z: -0.269, w: 0.654 },
  //   { x: -0.269, y:  0.654, z: -0.269, w:  0.654 },
  // ],
  initialYootRotations: [
    // must be set to non-0 value to reset the rotation
    { x: 0, y: 1, z: 0, w: 1 },
    { x: 0, y: 1, z: 0, w: 1 },
    { x: 0, y: 1, z: 0, w: 1 },
    { x: 0, y: 1, z: 0, w: 1 },
  ],
  resetYootPositions: [
    { x: -1, y: 0.5, z: 0, },
    { x: -0.4, y: 0.5, z: 0, },
    { x: 0.2, y: 0.5, z: 0, },
    { x: 0.8, y: 0.5, z: 0, },
  ]
};
