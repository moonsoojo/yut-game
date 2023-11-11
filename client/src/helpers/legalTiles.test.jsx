import { getLegalTiles } from "./legalTiles"

describe("starting", () => {
  let mockPieces = [
    { tile: -1, team: 1, id: 0 },
    { tile: -1, team: 1, id: 1 },
    { tile: -1, team: 1, id: 2 },
    { tile: -1, team: 1, id: 3 },
  ]
  it("should have a destination at tile 1 if you only have a '1'", () => {
    let mockMoves = {
      "-1": 0,
      "1": 1,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    }
    let destinations = getLegalTiles(-1, mockMoves, mockPieces, []) 
    expect(destinations).toEqual({"1" : {"tile": 1, move: "1", history: []}})
  })
  describe("backdo rule", () => {
    it("only have '-1'", () => {
      let mockMoves = {
        "-1": 1,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      }
      let destinations = getLegalTiles(-1, mockMoves, mockPieces, []) 
      expect(destinations).toEqual({"0" : {"tile": 0, move: "-1", history: []}})
    })
    it("have '-1' and another move", () => {
      let mockMoves = {
        "-1": 1,
        "1": 1,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      }
  
      let destinations = getLegalTiles(-1, mockMoves, mockPieces, []) 
      expect(destinations).toEqual({"1" : {"tile": 1, move: "1", history: []}})
    })
    it("have a piece on the board", () => {
      let mockPieces = [
        null,
        { tile: -1, team: 1, id: 1 },
        { tile: -1, team: 1, id: 2 },
        { tile: -1, team: 1, id: 3 },
      ]
      let mockMoves = {
        "-1": 1,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      }
      let destinations = getLegalTiles(-1, mockMoves, mockPieces, []) 
      expect(destinations).toEqual({})
      // display message
    })
  })
})

describe("on board", () => {
  let mockPieces = [
    { tile: -1, team: 1, id: 0 },
    { tile: -1, team: 1, id: 1 },
    { tile: -1, team: 1, id: 2 },
    { tile: -1, team: 1, id: 3 },
  ]
  describe("regular tile", () => {
    it("should have a destination at tile 3 if you are on tile 2 with a '1'", () => {
      let mockMoves = {
        "-1": 0,
        "1": 1,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      }
      let destinations = getLegalTiles(2, mockMoves, mockPieces, [1]) 
      expect(destinations).toEqual({"3" : {"tile": 3, move: "1", history: [1, 2]}})
    })
    it("should have a destination at tile 5 if you are on tile 3 with a '2'", () => {
      let mockMoves = {
        "-1": 0,
        "1": 0,
        "2": 1,
        "3": 0,
        "4": 0,
        "5": 0
      }
      let destinations = getLegalTiles(3, mockMoves, mockPieces, [1, 2]) 
      expect(destinations).toEqual({"5" : {"tile": 5, move: "2", history: [1, 2, 3, 4]}})
    })
    it("should have a destination at tile 6 if you are on tile 3 with a '3'", () => {
      let mockMoves = {
        "-1": 0,
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 0,
        "5": 0
      }
      let destinations = getLegalTiles(3, mockMoves, mockPieces, [1, 2]) 
      expect(destinations).toEqual({"6" : {"tile": 6, move: "3", history: [1, 2, 3, 4, 5]}})
    })
    it("going over fork 22 from tile 21", () => {
      let mockMoves = {
        "-1": 0,
        "1": 0,
        "2": 1,
        "3": 0,
        "4": 0,
        "5": 0
      }
      let mockHistory = [1, 2, 3, 4, 5, 20]
      let destinations = getLegalTiles(21, mockMoves, mockPieces, mockHistory) 
      expect(destinations).toEqual({"23" : {"tile": 23, move: "2", history: [ ...mockHistory, 21, 22 ]}})
    })
    it("multiple moves from tile 3", () => {
      let mockMoves = {
        "-1": 0,
        "1": 0,
        "2": 1,
        "3": 1,
        "4": 0,
        "5": 0
      }
      let mockHistory = [1, 2]
      let destinations = getLegalTiles(3, mockMoves, mockPieces, mockHistory) 
      expect(destinations).toEqual({
        "6": {"tile": 6, move: "3", history: [1, 2, 3, 4, 5]},
        "5": {"tile": 5, move: "2", history: [1, 2, 3, 4]},
      })
    })

    describe("finish", () => {
      it("should have one way to finish from tile 28", () => {
        let mockMoves = {
          "-1": 0,
          "1": 0,
          "2": 1,
          "3": 0,
          "4": 0,
          "5": 0
        }
        let mockHistory = [1, 2, 3, 4, 5, 20, 21, 22, 26, 27]
        let destinations = getLegalTiles(28, mockMoves, mockPieces, mockHistory) 
        expect(destinations).toEqual({
          "29" : [{"tile": 29, move: "2", history: [ ...mockHistory, 28, 0 ]}], 
        })
      })
      it("from tile 0 with one move", () => {
        let mockMoves = {
          "-1": 0,
          "1": 1,
          "2": 0,
          "3": 0,
          "4": 0,
          "5": 0
        }
        let mockHistory = [1, 2, 3, 4, 5, 20, 21, 22, 26, 27, 28, 0]
        let destinations = getLegalTiles(0, mockMoves, mockPieces, mockHistory) 
        expect(destinations).toEqual({
          "29" : [{"tile": 29, move: "1", history: [ ...mockHistory, 0 ]}], 
        })
      })
      it("from tile 28 with multiple moves to finish", () => {
        let mockMoves = {
          "-1": 0,
          "1": 0,
          "2": 1,
          "3": 1,
          "4": 0,
          "5": 0
        }
        let mockHistory = [1, 2, 3, 4, 5, 20, 21, 22, 26, 27]
        let destinations = getLegalTiles(28, mockMoves, mockPieces, mockHistory) 
        expect(destinations).toEqual({
          "29" : [
            {"tile": 29, move: "2", history: [ ...mockHistory, 28, 0 ]},
            {"tile": 29, move: "3", history: [ ...mockHistory, 28, 0 ]},
          ], 
        })
      })
      it("from tile 19", () => {
        let mockMoves = {
          "-1": 0,
          "1": 0,
          "2": 1,
          "3": 0,
          "4": 0,
          "5": 0
        }
        let mockHistory = [1, 2, 3, 4, 5, 20, 21, 22, 23, 24, 15, 16, 17, 18]
        let destinations = getLegalTiles(19, mockMoves, mockPieces, mockHistory) 
        expect(destinations).toEqual({
          "29" : [
            {"tile": 29, move: "2", history: [ ...mockHistory, 19, 0 ]},
          ], 
        })
      })
    })
  })
  describe("fork tile", () => {
    it("should have a destination at tile 20 and tile 6 if you are on tile 5 with a '1'", () => {
      let mockMoves = {
        "-1": 0,
        "1": 1,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      }
      let mockHistory = [1, 2, 3, 4]
      let destinations = getLegalTiles(5, mockMoves, mockPieces, mockHistory) 
      expect(destinations).toEqual({
        "20" : {"tile": 20, move: "1", history: [ ...mockHistory, 5]}, 
        "6": {"tile": 6, move: "1", history: [ ...mockHistory, 5]}
      })
    })
    it("should have a destination at tile 20, 6, 21, and 7 if you are on tile 5 with  a '1' and a '2'", () => {
      let mockMoves = {
        "-1": 0,
        "1": 1,
        "2": 1,
        "3": 0,
        "4": 0,
        "5": 0
      }
      let mockHistory = [1, 2, 3, 4]
      let destinations = getLegalTiles(5, mockMoves, mockPieces, mockHistory) 
      expect(destinations).toEqual({
        "20" : {"tile": 20, move: "1", history: [ ...mockHistory, 5]}, 
        "6": {"tile": 6, move: "1", history: [ ...mockHistory, 5]},
        "21": {"tile": 21, move: "2", history: [ ...mockHistory, 5, 20]},
        "7": {"tile": 7, move: "2", history: [ ...mockHistory, 5, 6]}
      })
    })
  })
  describe("backdo", () => {
    it("from tile 3 with history", () => {
      let mockMoves = {
        "-1": 1,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      }
      let mockPieces = [
        null,
        { tile: -1, team: 0, id: 1, history: [] },
        { tile: -1, team: 0, id: 2, history: [] },
        { tile: -1, team: 0, id: 3, history: [] },
      ]
      let mockHistory = [1, 2]
      let destinations = getLegalTiles(3, mockMoves, mockPieces, mockHistory) 
      expect(destinations).toEqual({
        "2" : {"tile": 2, move: "-1", history: [1]}
      })
    })
    it("from 0 with path history", () => {
      let mockMoves = {
        "-1": 1,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      }
      let mockPieces = [
        null,
        { tile: -1, team: 0, id: 1, history: [] },
        { tile: -1, team: 0, id: 2, history: [] },
        { tile: -1, team: 0, id: 3, history: [] },
      ]
      let mockHistory = [1, 2, 3, 4, 5, 20, 21, 22, 23, 24, 15, 16, 17, 18, 19]
      let destinations = getLegalTiles(0, mockMoves, mockPieces, mockHistory) 
      expect(destinations).toEqual({
        "19" : {"tile": 19, move: "-1", history: mockHistory.slice(0, mockHistory.length-1)}
      })
    })
    it("from 0 without path history", () => {
      let mockMoves = {
        "-1": 1,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      }
      let mockPieces = [
        null,
        { tile: -1, team: 0, id: 1, path: [] },
        { tile: -1, team: 0, id: 2, path: [] },
        { tile: -1, team: 0, id: 3, path: [] },
      ]
      let mockHistory = []
      let destinations = getLegalTiles(0, mockMoves, mockPieces, mockHistory) 
      expect(destinations).toEqual({
        "19" : {"tile": 19, move: "-1", history: []}, 
        "28" : {"tile": 28, move: "-1", history: []}
      })
    })
    // when 'expansion' is implemented, try with -4 moves
  })
})
