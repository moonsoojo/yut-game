import { getLegalTiles } from "./legalTiles"

describe("starting", () => {
  it("should have a destination at tile 0 if you only have a '1'", () => {
    let mockMoves = {
      "-1": 0,
      "1": 1,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    }
    let destinations = getLegalTiles(-1, mockMoves) 
    expect(destinations).toEqual({"0" : {"tile": 0, move: "1", path: [0]}})
  })
})