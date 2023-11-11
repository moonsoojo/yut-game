// tiles
// teams -- pieces at home, moves

import { move } from "./move.js";
import initialState from "../initialState.js";

describe("move", () => {
  describe("starting", () => {
    let from;
    let to;
    let moveUsed;
    let movingTeam;
    let mockTiles;
    let mockTeams;
    let mockPieces;
    let enemyTeam;
    let mockHistory;

    beforeEach(() => {
      from = -1
      to = 1
      moveUsed = "1"
      movingTeam = 0
      enemyTeam = 1
      mockTiles = initialState.tiles;
      mockTeams = initialState.teams;
      mockPieces = [{tile: from, team: movingTeam, id: 0, history: []}]
      mockTeams[movingTeam].moves[moveUsed] = 1
      mockHistory = []
    })

    fit("to an empty tile", () => {
      let result = move(mockTiles, mockTeams, from, to, moveUsed, mockHistory, mockPieces)
      let tiles = result.tiles
      let teams = result.teams
      expect(tiles[to]).toEqual([{tile: to, team: movingTeam, id: 0, history: mockHistory}])
      expect(teams[0].moves[moveUsed]).toEqual(0)
      expect(teams[0].pieces[0]).toEqual(null)
    })
    fit("to an ally", () => {
      mockTiles[to] = [{tile: to, team: movingTeam, id: 1, history: []}]
      mockTeams[movingTeam].pieces[1] = null
      let result = move(mockTiles, mockTeams, from, to, moveUsed, mockHistory, mockPieces)
      let tiles = result.tiles
      let teams = result.teams
      expect(tiles[to]).toEqual([{tile: to, team: movingTeam, id: 1, history: mockHistory}, {tile: to, team: movingTeam, id: 0, history: mockHistory}])
      expect(teams[0].moves[moveUsed]).toEqual(0)
      expect(teams[0].pieces[0]).toEqual(null)
      expect(teams[0].pieces[1]).toEqual(null)
    })
    fit("to an enemy", () => {
      mockTiles[to] = [{tile: to, team: enemyTeam, id: 0, history: []}]
      mockTeams[enemyTeam].pieces[0] = null;
      let result = move(mockTiles, mockTeams, from, to, moveUsed, mockHistory, mockPieces)
      let tiles = result.tiles
      let teams = result.teams
      expect(tiles[to]).toEqual([{tile: to, team: movingTeam, id: 0, history: mockHistory}])
      expect(teams[0].moves[moveUsed]).toEqual(0)
      expect(teams[0].pieces[0]).toEqual(null)
      expect(teams[1].pieces[0]).toEqual({tile: -1, team: enemyTeam, id: 0, history: []})
    })
    
  })
  describe("from tile", () => {
    let from;
    let to;
    let moveUsed;
    let movingTeam;
    let mockTiles;
    let mockTeams;
    let mockPieces;
    let enemyTeam;
    let mockHistory;

    beforeEach(() => {
      from = 1
      to = 2
      moveUsed = "1"
      movingTeam = 0
      enemyTeam = 1
      mockTiles = initialState.tiles;
      mockTiles[from] = [{tile: from, team: movingTeam, id: 0, path: [-1, 1]}]
      mockTiles[to] = []
      mockTeams = initialState.teams;
      mockTeams[movingTeam].pieces[0] = null;
      mockTeams[movingTeam].moves[moveUsed] = 1
      mockPieces = [{tile: from, team: movingTeam, id: 0, path: [-1, 1]}]
      mockHistory = [1]
    })

    fit("to an empty tile", () => {
      let result = move(mockTiles, mockTeams, from, to, moveUsed, mockHistory, mockPieces)
      let tiles = result.tiles
      let teams = result.teams
      expect(tiles[to]).toEqual([{tile: to, team: movingTeam, id: 0, history: mockHistory}])
      expect(teams[0].moves[moveUsed]).toEqual(0)
    })
    fit("to an ally", () => {
      mockTiles[to] = [{tile: to, team: movingTeam, id: 1, history: [1]}]
      mockTeams[movingTeam].pieces[1] = null

      let result = move(mockTiles, mockTeams, from, to, moveUsed, mockHistory, mockPieces)
      let tiles = result.tiles
      let teams = result.teams

      expect(tiles[to]).toEqual([{tile: to, team: movingTeam, id: 1, history: mockHistory}, {tile: to, team: movingTeam, id: 0, history: mockHistory}])
      expect(teams[0].moves[moveUsed]).toEqual(0)
    })
    fit("to an enemy", () => {
      mockTiles[to] = [{tile: to, team: enemyTeam, id: 0, history: [1]}]
      mockTeams[enemyTeam].pieces[0] = null;

      let result = move(mockTiles, mockTeams, from, to, moveUsed, mockHistory, mockPieces)
      let tiles = result.tiles
      let teams = result.teams
      
      expect(tiles[to]).toEqual([{tile: to, team: movingTeam, id: 0, history: mockHistory}])
      expect(teams[0].moves[moveUsed]).toEqual(0)
      expect(teams[0].pieces[0]).toEqual(null)
      expect(teams[1].pieces[0]).toEqual({tile: -1, team: enemyTeam, id: 0, history: []})
    })
    fit("multiple pieces", () => {
      mockTiles[from] = [{tile: from, team: movingTeam, id: 0, history: []}, {tile: from, team: movingTeam, id: 1, history: []}]
      mockTeams[movingTeam].pieces[0] = null;
      mockTeams[movingTeam].pieces[1] = null;
      mockPieces = mockTiles[from]

      let result = move(mockTiles, mockTeams, from, to, moveUsed, mockHistory, mockPieces)
      let tiles = result.tiles
      let teams = result.teams

      expect(tiles[to]).toEqual([{tile: to, team: movingTeam, id: 0, history: mockHistory}, {tile: to, team: movingTeam, id: 1, history: mockHistory}])
      expect(teams[0].moves[moveUsed]).toEqual(0)
      expect(teams[0].pieces[0]).toEqual(null)
      expect(teams[0].pieces[1]).toEqual(null)
    })
  })
})