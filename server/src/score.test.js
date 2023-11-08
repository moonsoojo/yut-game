import { score } from "./score.js";
import initialState from "../initialState.js";

describe("score", () => {
  let from;
  let to;
  let moveUsed;
  let movingTeam;
  let mockTiles;
  let mockTeams;
  let mockPieces;

  beforeEach(() => {
    from = 19
    to = 29
    moveUsed = "2"
    movingTeam = 0
    mockTiles = initialState.tiles;
    mockTeams = initialState.teams;
    mockTeams[movingTeam].moves[moveUsed] = 1
  })

  it("one piece", () => {
    mockTeams[movingTeam].pieces[0] = null;
    mockTiles[from] = [{tile: from, team: movingTeam, id: 0}]
    mockPieces = [{tile: from, team: movingTeam, id: 0}]
    let result = score(mockTiles, mockTeams, from, moveUsed, [], mockPieces)
    let tiles = result.tiles
    let teams = result.teams
    expect(tiles[from]).toEqual([])
    expect(teams[movingTeam].moves[moveUsed]).toEqual(0)
    expect(teams[movingTeam].pieces[0]).toEqual("scored")
  })
  it("multiple pieces", () => {
    mockTeams[movingTeam].pieces[0] = null;
    mockTeams[movingTeam].pieces[1] = null;
    mockTiles[from] = [{tile: from, team: movingTeam, id: 0}, {tile: from, team: movingTeam, id: 1}]
    mockPieces = [{tile: from, team: movingTeam, id: 0}, {tile: from, team: movingTeam, id: 1}]
    let result = score(mockTiles, mockTeams, from, moveUsed, [], mockPieces)
    let tiles = result.tiles
    let teams = result.teams
    expect(tiles[from]).toEqual([])
    expect(teams[movingTeam].moves[moveUsed]).toEqual(0)
    expect(teams[movingTeam].pieces[0]).toEqual("scored")
    expect(teams[movingTeam].pieces[1]).toEqual("scored")
  })
})