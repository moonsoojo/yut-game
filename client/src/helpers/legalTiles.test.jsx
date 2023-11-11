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
    let destinations = getLegalTiles(-1, mockMoves, mockPieces) 
    expect(destinations).toEqual({"1" : {"tile": 1, move: "1", path: [-1, 1]}})
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
  
      let destinations = getLegalTiles(-1, mockMoves, mockPieces) 
      expect(destinations).toEqual({"0" : {"tile": 0, move: "-1", path: [-1, 0]}})
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
  
      let destinations = getLegalTiles(-1, mockMoves, mockPieces) 
      expect(destinations).toEqual({"1" : {"tile": 1, move: "1", path: [-1, 1]}})
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
  
      let destinations = getLegalTiles(-1, mockMoves, mockPieces) 
      expect(destinations).toEqual({})
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
      let destinations = getLegalTiles(2, mockMoves, mockPieces) 
      expect(destinations).toEqual({"3" : {"tile": 3, move: "1", path: [2, 3]}})
    })
  
    it("should have a destination at tile 5 if you are on tile 3 with a '2'", () => {
      let mockMoves = {
        "-1": 0,
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 0,
        "5": 0
      }
      let destinations = getLegalTiles(2, mockMoves, mockPieces) 
      expect(destinations).toEqual({"5" : {"tile": 5, move: "3", path: [2, 3, 4, 5]}})
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
      let destinations = getLegalTiles(3, mockMoves, mockPieces) 
      expect(destinations).toEqual({"6" : {"tile": 6, move: "3", path: [3, 4, 5, 6]}})
    })

    it("going over fork from one tile before", () => {
      let mockMoves = {
        "-1": 0,
        "1": 0,
        "2": 1,
        "3": 0,
        "4": 0,
        "5": 0
      }
      let destinations = getLegalTiles(21, mockMoves, mockPieces) 
      expect(destinations).toEqual({"23" : {"tile": 23, move: "2", path: [21, 22, 23]}})
    })

    it("multiple moves", () => {
      let mockMoves = {
        "-1": 0,
        "1": 0,
        "2": 1,
        "3": 1,
        "4": 0,
        "5": 0
      }
      let destinations = getLegalTiles(3, mockMoves, mockPieces) 
      expect(destinations).toEqual({
        "6": {"tile": 6, move: "3", path: [3, 4, 5, 6]},
        "5": {"tile": 5, move: "2", path: [3, 4, 5]},
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
        let destinations = getLegalTiles(28, mockMoves, mockPieces) 
        expect(destinations).toEqual({
          "29" : [{"tile": 29, move: "2", path: [28, 0, 29]}], 
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
        let destinations = getLegalTiles(0, mockMoves, mockPieces) 
        expect(destinations).toEqual({
          "29" : [{"tile": 29, move: "1", path: [0, 29]}], 
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
        let destinations = getLegalTiles(28, mockMoves, mockPieces) 
        expect(destinations).toEqual({
          "29" : [
            {"tile": 29, move: "2", path: [28, 0, 29]},
            {"tile": 29, move: "3", path: [28, 0, 29]},
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
        let destinations = getLegalTiles(19, mockMoves, mockPieces) 
        expect(destinations).toEqual({
          "29" : [
            {"tile": 29, move: "2", path: [19, 0, 29]},
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
      let destinations = getLegalTiles(5, mockMoves, mockPieces) 
      expect(destinations).toEqual({"20" : {"tile": 20, move: "1", path: [5, 20]}, "6": {"tile": 6, move: "1", path: [5, 6]}})
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
      let destinations = getLegalTiles(5, mockMoves, mockPieces) 
      expect(destinations).toEqual({
        "20" : {"tile": 20, move: "1", path: [5, 20]}, 
        "6": {"tile": 6, move: "1", path: [5, 6]},
        "21": {"tile": 21, move: "2", path: [5, 20, 21]},
        "7": {"tile": 7, move: "2", path: [5, 6, 7]}
      })
    })

    it("multiple moves", () => {
      let mockMoves = {
        "-1": 0,
        "1": 1,
        "2": 0,
        "3": 0,
        "4": 1,
        "5": 0
      }
      let destinations = getLegalTiles(5, mockMoves, mockPieces) 
      expect(destinations).toEqual({
        "20" : {"tile": 20, move: "1", path: [5, 20]}, 
        "6": {"tile": 6, move: "1", path: [5, 6]},
        "23": {"tile": 23, move: "4", path: [5, 20, 21, 22, 23]},
        "9": {"tile": 9, move: "4", path: [5, 6, 7, 8, 9]}
      })
    })
  })
  fdescribe("backdo", () => {
    it("from regular tile with history", () => {
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
      let mockHistory = [1, 2]
      let destinations = getLegalTiles(3, mockMoves, mockPieces, mockHistory) 
      expect(destinations).toEqual({"2" : {"tile": 2, move: "-1", path: []}})
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
      let destinations = getLegalTiles(22, mockMoves, mockPieces) 
      expect(destinations).toEqual({
        "21" : {"tile": 21, move: "-1", path: []}, 
        "26" : {"tile": 26, move: "-1", path: []}
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
      let destinations = getLegalTiles(22, mockMoves, mockPieces) 
      expect(destinations).toEqual({
        "21" : {"tile": 21, move: "-1", path: []}, 
        "26" : {"tile": 26, move: "-1", path: []}
      })
    })
    // when 'expansion' is implemented, try with -4 moves
  })
})
