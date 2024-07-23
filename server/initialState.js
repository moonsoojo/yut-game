export default {
  initialYootPositions: {
    pregame: [
      { x: -0.8, y: 5, z: 2, },
      { x: -0.4, y: 5, z: 2, },
      { x: 0.4, y: 5, z: 2, },
      { x: 0.8, y: 5, z: 2, },
    ],
    game: [
      { x: -0.8, y: 5, z: 1.5, },
      { x: -0.4, y: 5, z: 1.5, },
      { x: 0.4, y: 5, z: 1.5, },
      { x: 0.8, y: 5, z: 1.5, },
    ]
  },
  initialPiecesTeam0: [
    { tile: -1, team: 0, id: 0, history: [], lastPath: [] },
    { tile: -1, team: 0, id: 1, history: [], lastPath: [] },
    { tile: -1, team: 0, id: 2, history: [], lastPath: [] },
    { tile: -1, team: 0, id: 3, history: [], lastPath: [] },
  ],
  initialPiecesTeam1: [
    { tile: 1, team: 1, id: 0, history: [], lastPath: [] },
    { tile: 1, team: 1, id: 1, history: [], lastPath: [] },
    { tile: -1, team: 1, id: 2, history: [], lastPath: [] },
    { tile: -1, team: 1, id: 3, history: [], lastPath: [] },
  ],
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
  ],
  initialMoves: {
    '0': 0,
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '-1': 0
  },
  initialTiles: [
    [], // { [ { team: Number, id: Number, tile: Number, history: [Number], status: String } ] }
    [
      { tile: 1, team: 1, id: 0, history: [], lastPath: [] },
      { tile: 1, team: 1, id: 1, history: [], lastPath: [] },
    ],
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
