// tiles
// teams -- pieces at home, moves

import { move } from "./move.js";
import initialState from "../initialState.js";

describe("move", () => {
  describe("from home", () => {
    let from;
    let to;
    let moveUsed;
    let movingTeam;
    let mockTiles;
    let mockTeams;
    let mockPieces;
    let enemyTeam;

    beforeEach(() => {
      from = -1
      to = 1
      moveUsed = "1"
      movingTeam = 0
      enemyTeam = 1
      mockTiles = initialState.tiles;
      mockTeams = initialState.teams;
      mockPieces = [{tile: from, team: movingTeam, id: 0}]
      mockTeams[movingTeam].moves[moveUsed] = 1
    })

    it("to an empty tile", () => {
      let result = move(mockTiles, mockTeams, from, to, moveUsed, [], mockPieces)
      let tiles = result.tiles
      let teams = result.teams
      expect(tiles[to]).toEqual([{tile: to, team: movingTeam, id: 0}])
      expect(teams[0].moves[moveUsed]).toEqual(0)
      expect(teams[0].pieces[0]).toEqual(null)
    })
    it("to an ally", () => {
      mockTiles[to] = [{tile: to, team: movingTeam, id: 1}]
      mockTeams[movingTeam].pieces[1] = null
      let result = move(mockTiles, mockTeams, from, to, moveUsed, [], mockPieces)
      let tiles = result.tiles
      let teams = result.teams
      expect(tiles[to]).toEqual([{tile: to, team: movingTeam, id: 1}, {tile: to, team: movingTeam, id: 0}])
      expect(teams[0].moves[moveUsed]).toEqual(0)
      expect(teams[0].pieces[0]).toEqual(null)
      expect(teams[0].pieces[1]).toEqual(null)
    })
    it("to an enemy", () => {
      mockTiles[to] = [{tile: to, team: enemyTeam, id: 0}]
      mockTeams[enemyTeam].pieces[0] = null;
      let result = move(mockTiles, mockTeams, from, to, moveUsed, [], mockPieces)
      let tiles = result.tiles
      let teams = result.teams
      expect(tiles[to]).toEqual([{tile: to, team: movingTeam, id: 0}])
      expect(teams[0].moves[moveUsed]).toEqual(0)
      expect(teams[0].pieces[0]).toEqual(null)
      expect(teams[1].pieces[0]).toEqual({tile: -1, team: enemyTeam, id: 0})
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

    beforeEach(() => {
      from = 1
      to = 2
      moveUsed = "1"
      movingTeam = 0
      enemyTeam = 1
      mockTiles = initialState.tiles;
      mockTiles[from] = [{tile: from, team: movingTeam, id: 0}]
      mockTiles[to] = []
      mockTeams = initialState.teams;
      mockTeams[movingTeam].pieces[0] = null;
      mockTeams[movingTeam].moves[moveUsed] = 1
      mockPieces = [{tile: from, team: movingTeam, id: 0}]
    })

    it("to an empty tile", () => {
      let result = move(mockTiles, mockTeams, from, to, moveUsed, [], mockPieces)
      let tiles = result.tiles
      let teams = result.teams
      expect(tiles[to]).toEqual([{tile: to, team: movingTeam, id: 0}])
      expect(teams[0].moves[moveUsed]).toEqual(0)
    })
    it("to an ally", () => {
      mockTiles[to] = [{tile: to, team: movingTeam, id: 1}]
      mockTeams[movingTeam].pieces[1] = null

      let result = move(mockTiles, mockTeams, from, to, moveUsed, [], mockPieces)
      let tiles = result.tiles
      let teams = result.teams

      expect(tiles[to]).toEqual([{tile: to, team: movingTeam, id: 1}, {tile: to, team: movingTeam, id: 0}])
      expect(teams[0].moves[moveUsed]).toEqual(0)
    })
    it("to an enemy", () => {
      mockTiles[to] = [{tile: to, team: enemyTeam, id: 0}]
      mockTeams[enemyTeam].pieces[0] = null;

      let result = move(mockTiles, mockTeams, from, to, moveUsed, [], mockPieces)
      let tiles = result.tiles
      let teams = result.teams
      
      expect(tiles[to]).toEqual([{tile: to, team: movingTeam, id: 0}])
      expect(teams[0].moves[moveUsed]).toEqual(0)
      expect(teams[0].pieces[0]).toEqual(null)
      expect(teams[1].pieces[0]).toEqual({tile: -1, team: enemyTeam, id: 0})
    })
    it("multiple pieces", () => {
      mockTiles[from] = [{tile: from, team: movingTeam, id: 0}, {tile: from, team: movingTeam, id: 1}]
      mockTeams[movingTeam].pieces[0] = null;
      mockTeams[movingTeam].pieces[1] = null;
      mockPieces = mockTiles[from]

      let result = move(mockTiles, mockTeams, from, to, moveUsed, [], mockPieces)
      let tiles = result.tiles
      let teams = result.teams

      expect(tiles[to]).toEqual([{tile: to, team: movingTeam, id: 0}, {tile: to, team: movingTeam, id: 1}])
      expect(teams[0].moves[moveUsed]).toEqual(0)
      expect(teams[0].pieces[0]).toEqual(null)
      expect(teams[0].pieces[1]).toEqual(null)
    })
  })
})