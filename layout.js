export default {
  mobile: {
    center: [-3, 0, -7],
    camera: {
      zoom: 40,
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
    throwCount: [-0.5,0,-3],
    ready: [0,0,-2.5],
    currentPlayerName: [-1,0,-3.5],
    yutFloor: [1,-0.5,0.5],
    chat: {
      position: [-7.5,-0.5,-2],
      boxScale: 1, // decide by ratio of my monitor's width to another one
      fontScale: 1, // decide by ratio of my monitor's width to another one
      fontSize: 20,
      height: 105,
      width: 105,
      padding: 10,
    },
    piecesSection: [-4, 0, -1],
    actionButtons: {
      position: [1.5, 0, 0],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
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
    star: {
      scale: 2,
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
  desktop: {
    center: [-5.3, 0, -2.5],
    camera: {
      zoom: 150,
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
    ready: [0,0,-2.5],
    currentPlayerName: [-1,0,-3.5],
    yutFloor: [0.1,-0.5,-0.2],
    chat: {
      position: [-13,-0.5,-1],
      boxScale: 2, // decide by ratio of my monitor's width to another one
      fontScale: 2, // decide by ratio of my monitor's width to another one
      fontSize: 20,
      height: 125,
      width: 250,
      padding: 10,
    },
    piecesSection: {
      position: [-0.8, 0, -4],
      scale: 0.8
    },
    actionButtons: {
      position: [1.5, 0, 0],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
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
    star: {
      scale: 1,
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
