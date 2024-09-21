import { checkJoin } from "./SocketManagerHelper"

describe("checkJoin", () => {
  // variables
  describe("true cases", () => {
    it("one joins one", () => {
      const piecesPrev = [
        { tile: 1, team: 1, id: 0, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 1, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 2, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 3, history: [], lastPath: [] },
      ]
      const piecesUpdate = [
        { tile: 1, team: 1, id: 0, history: [], lastPath: [] },
        { tile: 1, team: 1, id: 1, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 2, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 3, history: [], lastPath: [] },
      ]
      const joined = checkJoin(piecesPrev, piecesUpdate)
      expect(joined).toEqual({
        result: true,
        tile: 1
      })
    })
    it("one joins many", () => {
      const piecesPrev = [
        { tile: 1, team: 1, id: 0, history: [], lastPath: [] },
        { tile: 1, team: 1, id: 1, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 2, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 3, history: [], lastPath: [] },
      ]
      const piecesUpdate = [
        { tile: 1, team: 1, id: 0, history: [], lastPath: [] },
        { tile: 1, team: 1, id: 1, history: [], lastPath: [] },
        { tile: 1, team: 1, id: 2, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 3, history: [], lastPath: [] },
      ]
      const joined = checkJoin(piecesPrev, piecesUpdate)
      expect(joined).toEqual({
        result: true,
        tile: 1
      })
    })
    it("many joins one", () => {
      const piecesPrev = [
        { tile: 2, team: 1, id: 0, history: [], lastPath: [] },
        { tile: 1, team: 1, id: 1, history: [], lastPath: [] },
        { tile: 1, team: 1, id: 2, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 3, history: [], lastPath: [] },
      ]
      const piecesUpdate = [
        { tile: 2, team: 1, id: 0, history: [], lastPath: [] },
        { tile: 2, team: 1, id: 1, history: [], lastPath: [] },
        { tile: 2, team: 1, id: 2, history: [], lastPath: [] },
        { tile: 1, team: 1, id: 3, history: [], lastPath: [] },
      ]
      const joined = checkJoin(piecesPrev, piecesUpdate)
      expect(joined).toEqual({
        result: true,
        tile: 2
      })
    })
    it("many joins many", () => {
      const piecesPrev = [
        { tile: 2, team: 1, id: 0, history: [], lastPath: [] },
        { tile: 2, team: 1, id: 1, history: [], lastPath: [] },
        { tile: 1, team: 1, id: 2, history: [], lastPath: [] },
        { tile: 1, team: 1, id: 3, history: [], lastPath: [] },
      ]
      const piecesUpdate = [
        { tile: 2, team: 1, id: 0, history: [], lastPath: [] },
        { tile: 2, team: 1, id: 1, history: [], lastPath: [] },
        { tile: 2, team: 1, id: 2, history: [], lastPath: [] },
        { tile: 2, team: 1, id: 3, history: [], lastPath: [] },
      ]
      const joined = checkJoin(piecesPrev, piecesUpdate)
      expect(joined).toEqual({
        result: true,
        tile: 2
      })
    })
  })
  describe("false cases", () => {
    it("one token moved to a star with no token", () => {
      const piecesPrev = [
        { tile: 1, team: 1, id: 0, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 1, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 2, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 3, history: [], lastPath: [] },
      ]
      const piecesUpdate = [
        { tile: 2, team: 1, id: 0, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 1, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 2, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 3, history: [], lastPath: [] },
      ]
      const joined = checkJoin(piecesPrev, piecesUpdate)
      expect(joined).toEqual({
        result: false
      })
    })
    it("two tokens moved to a star with no token", () => {
      const piecesPrev = [
        { tile: 1, team: 1, id: 0, history: [], lastPath: [] },
        { tile: 1, team: 1, id: 1, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 2, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 3, history: [], lastPath: [] },
      ]
      const piecesUpdate = [
        { tile: 2, team: 1, id: 0, history: [], lastPath: [] },
        { tile: 2, team: 1, id: 1, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 2, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 3, history: [], lastPath: [] },
      ]
      const joined = checkJoin(piecesPrev, piecesUpdate)
      expect(joined).toEqual({
        result: false
      })
    })
    it("scoring when another token has been scored already", () => {
      const piecesPrev = [
        { tile: 28, team: 1, id: 0, history: [], lastPath: [] },
        { tile: 29, team: 1, id: 1, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 2, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 3, history: [], lastPath: [] },
      ]
      const piecesUpdate = [
        { tile: 29, team: 1, id: 0, history: [], lastPath: [] },
        { tile: 29, team: 1, id: 1, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 2, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 3, history: [], lastPath: [] },
      ]
      const joined = checkJoin(piecesPrev, piecesUpdate)
      expect(joined).toEqual({
        result: false
      })
    })
    it("caught when another token is at home", () => {
      const piecesPrev = [
        { tile: 28, team: 1, id: 0, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 1, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 2, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 3, history: [], lastPath: [] },
      ]
      const piecesUpdate = [
        { tile: -1, team: 1, id: 0, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 1, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 2, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 3, history: [], lastPath: [] },
      ]
      const joined = checkJoin(piecesPrev, piecesUpdate)
      expect(joined).toEqual({
        result: false
      })
    })
  })
})
