let floorPosition = [0.1,0,0]
let outOfBoundsPosition = [
  floorPosition[0]-1,
  floorPosition[1],
  floorPosition[2]
]

export default {
  yut: {
    floor: floorPosition, // change value on top
    outOfBounds: outOfBoundsPosition
  },
  portrait: {
    center: [-3, 0, -7],
    camera: {
      // zoom: 40,
      zoomMin: 25,
      zoomMax: 40,
      position: [-3, 25, 6],
      lookAtOffset: [0, 0, 0]
    },
    team0: {
      scale: 1,
      position: [-7, 0, -14],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
      pieces: {
        position: [2, 0, -0.5]
      },
      names: {
        position: [0, 0, 0.5]
      }
    },
    team1: {
      scale: 1,
      position: [-3, 0, -14],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
      pieces: {
        position: [1.5, 0, -0.5]
      },
      names: {
        position: [0, 0, 0.5]
      }
    },
    throwCount: {
      position: [-1.2,0,-2.5],
      size: 0.24
    },
    turn: {
      position: [-1.2, 0, -1.7],
      size: 0.24
    },
    gamePhase: {
      position: [-1.2, 0, -2.1],
      size: 0.24
    },
    ready: [0,0,-2.5],
    currentPlayerName: [-1,0,-3.5],
    chat: {
      position: [-7.5,-0.5,-2],
      fontSizeMin: 12,
      fontSizeMax: 16,
      heightMin: 50,
      heightMax: 80,
      widthMin: 75,
      widthMax: 110,
      paddingMin: 2.5,
      paddingMax: 8,
    },
    piecesSection: {
      position: [-4, 0, -1],
      scale: 1
    },
    actionButtons: {
      position: [1.5, 0, 0],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    menu: {
      position: [-7.3,-0.5,-2.3],
    },
    moves: {
      text: [0,0,2],
      list: [0,0,2.5]
    },
    tileRadius: {
      ring: 4,
      shortcut1: 2.7,
      shortcut2: 1.4
    },
    tilePieceScale: 1,
    star: {
      scale: 1.1,
      rocketScale: 0.4,
      ufoScale: 0.2,
    },
    mars: {
      rocketScale: 0.6,
      ufoScale: 0.3,
    },
    saturn: {
      rocketScale: 0.4,
      ufoScale: 0.2,
    },
    moon: {
      rocketScale: 0.6,
      ufoScale: 0.3,
    },
    earth: {
      rocketScale: 0.4,
      ufoScale: 0.2,
    },
    homePieces: {
      0: {
        positionStartX: -4,
        positionStartY: 0,
        positionStartZ: 9,
        space: 0.8,
        rotation: [0, 0, 0],
      },
      1: {
        positionStartX: 0,
        positionStartY: 0,
        positionStartZ: 9,
        space: 0.8,
        rotation: [0, 0, 0],
      },
    },
    startBanner: {
      position: [3, 0, -3.5],
      rotation: [0, Math.PI / 2, Math.PI / 2, "XZY"],
    },
    startGameBanner: {
      position: [2,0,10],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    throwButton: {
      position: [-4, 0, 11],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    throwButtonOrder: {
      position: [-4, 0, 11.5],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    scoreButton: {
      position: [-2, 0, 11],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    resetButton: {
      position: [3, 0, 11],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    controlsButton: {
      position: [-3, 0, -5],
      rotation: [0, Math.PI / 2, 0],
    },
    rulesButton: {
      position: [-3, -0.5, -5],
      rotation: [0, Math.PI / 2, 0],
    },
    goalButton: {
      position: [0, -0.5, 0],
    },
    diceButton: {
      position: [0, -1, 0],
    },
    movesButton: {
      position: [0, -1.5, 0],
    },
    scoreDetailsButton: {
      position: [0, -2, 0],
    },
    joinTeam0Banner:  {
      position: [5.5, 0, 4],
      rotation: [0, Math.PI / 2, Math.PI / 2, "XZY"],
    },
    joinTeam1Banner:  {
      position: [5.5, 0, 2],
      rotation: [0, Math.PI / 2, Math.PI / 2, "XZY"],
    },
    tiles: {
      position: [-8, 0, 0],
      scale: 1
    },
    textRotation: [-Math.PI / 2, 0, 0, "XZY"]
  },
  landscapeDesktop: {
    center: [-5.3, 0, -2.5],
    camera: {
      // zoom: 150,
      zoomMin: 35,
      zoomMax: 150,
      position: [-5.3, 25, 1.5],
      lookAtOffset: [0, 0, 0]
    },
    team0: {
      scale: 0.7,
      position: [-13, 0, -5.5],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
      pieces: {
        position: [0.2, 0, 0.2]
      },
      names: {
        position: [0, 0, 1]
      }
    },
    team1: {
      scale: 0.7,
      position: [-13, 0, -3.5],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
      pieces: {
        position: [0.2, 0, 0.1]
      },
      names: {
        position: [0, 0, 1]
      }
    },
    throwCount: {
      position: [-2.7, 0, 0.8],
      size: 0.21
    },
    turn: {
      position: [-0.8, 0, -1.5],
      size: 0.24
    },
    gamePhase: {
      position: [-0.8, 0, -1.9],
      size: 0.24
    },
    ready: [0,0,-2.5],
    currentPlayerName: [-1,0,-3.5],
    chat: {
      position: [-13,-0.5,-1],
      fontSizeMin: 12,
      fontSizeMax: 40,
      heightMin: 70,
      heightMax: 250,
      widthMin: 140,
      widthMax: 550,
      paddingMin: 5,
      paddingMax: 10,
    },
    piecesSection: {
      position: [-0.8, 0, -4],
      scale: 0.8
    },
    actionButtons: {
      position: [1.5, 0, 0],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    menu: {
      position: [0, 0, -6]
    },
    moves: {
      text: [0,0,2],
      list: [1.5,0,2],
      // size: 0.3
    },
    tiles: {
      position: [-8, 0, 0],
      scale: 0.6
    },
    tileRadius: {
      ring: 5,
      shortcut1: 3.5,
      shortcut2: 1.7
    },
    tilePieceScale: 1.5,
    star: {
      scale: 1.2,
      rocketScale: 0.6,
      ufoScale: 0.3,
    },
    mars: {
      rocketScale: 0.6,
      ufoScale: 0.3,
    },
    saturn: {
      rocketScale: 0.4,
      ufoScale: 0.2,
    },
    moon: {
      rocketScale: 0.4,
      ufoScale: 0.2,
    },
    earth: {
      rocketScale: 0.4,
      ufoScale: 0.2,
    },
    homePieces: {
      0: {
        positionStartX: -11.5,
        positionStartY: 0,
        positionStartZ: 6,
        space: 0.8,
        rotation: [0, 0, 0],
      },
      1: {
        positionStartX: -8,
        positionStartY: 0,
        positionStartZ: 6,
        space: 0.8,
        rotation: [0, 0, 0],
      },
    },
    startBanner: {
      position: [2.7, -1.2, -2.5],
      rotation: [0, Math.PI / 2, 0],
    },
    startGameBanner: {
      position: [6, 0, 3],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    scoreButton: {
      position: [6, 0, 3.5],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    resetButton: {
      position: [6, 0, 4],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    throwButton: {
      position: [6, 0, 4.5],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    throwButtonOrder: {
      position: [6, 0, 5],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    controlsButton: {
      position: [-3, 0, -5],
      rotation: [0, Math.PI / 2, 0],
    },
    rulesButton: {
      position: [-3, -0.5, -5],
      rotation: [0, Math.PI / 2, 0],
    },
    goalButton: {
      position: [0, -0.5, 0],
    },
    diceButton: {
      position: [0, -1, 0],
    },
    movesButton: {
      position: [0, -1.5, 0],
    },
    scoreDetailsButton: {
      position: [0, -2, 0],
    },
    team0Banner: {
      position: [-12, 0, 3],
    },
    team1Banner: {
      position: [-8, 0, 3],
    },
    actionButtons: {
      position: [1.5, 0, 16],
    },
    joinTeam0Banner:  {
      position: [5.5, 0, 4],
      rotation: [0, Math.PI / 2, Math.PI / 2, "XZY"],
    },
    joinTeam1Banner:  {
      position: [5.5, 0, 2],
      rotation: [0, Math.PI / 2, Math.PI / 2, "XZY"],
    },
    textRotation: [-Math.PI / 2, 0, 0, "XZY"]
  },
  landscapeMobile: {
    center: [-5.3, 0, -2.5],
    camera: {
      // zoom: 150,
      zoomMin: 35,
      zoomMax: 40,
      position: [-5.3, 25, 1.5],
      lookAtOffset: [0, 0, 0]
    },
    team0: {
      scale: 0.7,
      position: [-13, 0, -5.5],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
      pieces: {
        position: [0.2, 0, 0.2]
      },
      names: {
        position: [0, 0, 1]
      }
    },
    team1: {
      scale: 0.7,
      position: [-13, 0, -3.5],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
      pieces: {
        position: [0.2, 0, 0.1]
      },
      names: {
        position: [0, 0, 1]
      }
    },
    throwCount: {
      position: [-2.7, 0, 0.8],
      size: 0.21
    },
    turn: {
      position: [-0.8, 0, -1.5],
      size: 0.24
    },
    gamePhase: {
      position: [-0.8, 0, -1.9],
      size: 0.24
    },
    ready: [0,0,-2.5],
    currentPlayerName: [-1,0,-3.5],
    chat: {
      position: [-13,-0.5,-1],
      fontSizeMin: 12,
      fontSizeMax: 40,
      heightMin: 50,
      heightMax: 200,
      widthMin: 110,
      widthMax: 220,
      paddingMin: 5,
      paddingMax: 10,
    },
    piecesSection: {
      position: [-0.8, 0, -4],
      scale: 0.8
    },
    actionButtons: {
      position: [1.5, 0, 0],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    menu: {
      position: [0, 0, -6]
    },
    moves: {
      text: [0,0,2],
      list: [1.5,0,2],
      // size: 0.3
    },
    tiles: {
      position: [-8, 0, 0],
      scale: 0.6
    },
    tileRadius: {
      ring: 5,
      shortcut1: 3.5,
      shortcut2: 1.7
    },
    tilePieceScale: 1.5,
    star: {
      scale: 1.5,
      rocketScale: 0.6,
      ufoScale: 0.3,
    },
    mars: {
      rocketScale: 0.6,
      ufoScale: 0.3,
    },
    saturn: {
      rocketScale: 0.4,
      ufoScale: 0.2,
    },
    moon: {
      rocketScale: 0.4,
      ufoScale: 0.2,
    },
    earth: {
      rocketScale: 0.4,
      ufoScale: 0.2,
    },
    homePieces: {
      0: {
        positionStartX: -11.5,
        positionStartY: 0,
        positionStartZ: 6,
        space: 0.8,
        rotation: [0, 0, 0],
      },
      1: {
        positionStartX: -8,
        positionStartY: 0,
        positionStartZ: 6,
        space: 0.8,
        rotation: [0, 0, 0],
      },
    },
    startBanner: {
      position: [2.7, -1.2, -2.5],
      rotation: [0, Math.PI / 2, 0],
    },
    startGameBanner: {
      position: [6, 0, 3],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    scoreButton: {
      position: [6, 0, 3.5],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    resetButton: {
      position: [6, 0, 4],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    throwButton: {
      position: [6, 0, 4.5],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    throwButtonOrder: {
      position: [6, 0, 5],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    controlsButton: {
      position: [-3, 0, -5],
      rotation: [0, Math.PI / 2, 0],
    },
    rulesButton: {
      position: [-3, -0.5, -5],
      rotation: [0, Math.PI / 2, 0],
    },
    goalButton: {
      position: [0, -0.5, 0],
    },
    diceButton: {
      position: [0, -1, 0],
    },
    movesButton: {
      position: [0, -1.5, 0],
    },
    scoreDetailsButton: {
      position: [0, -2, 0],
    },
    team0Banner: {
      position: [-12, 0, 3],
    },
    team1Banner: {
      position: [-8, 0, 3],
    },
    actionButtons: {
      position: [1.5, 0, 16],
    },
    joinTeam0Banner:  {
      position: [5.5, 0, 4],
      rotation: [0, Math.PI / 2, Math.PI / 2, "XZY"],
    },
    joinTeam1Banner:  {
      position: [5.5, 0, 2],
      rotation: [0, Math.PI / 2, Math.PI / 2, "XZY"],
    },
    textRotation: [-Math.PI / 2, 0, 0, "XZY"]
  },
};
