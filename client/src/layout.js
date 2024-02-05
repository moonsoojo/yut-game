let floorPosition = [0,1.5,0]
let outOfBoundsPosition = [
  floorPosition[0]-1,
  floorPosition[1],
  floorPosition[2]
]
let throwPosition = [
  floorPosition[0]-0.9,
  floorPosition[1],
  floorPosition[2]+1.5
]

export default {
  yoot: {
    floor: floorPosition, // change value on top
    outOfBounds: outOfBoundsPosition,
    throwPos: throwPosition
  },
  portrait: {
    center: [0,0,0],
    camera: {
      zoomMin: 0,
      zoomMax: 55,
      position: [0,20,3],
    },
    yootButton: {
      position: [3,0,6.8]
    },
    title: {
      position1: [-4.7, 0, -14.5],
      position2: [-4.7, 0, -13],
      yoots: {
        position1: [-0.5, 0, -14],
        rotation1: [0, -Math.PI / 2, -Math.PI / 2],
        position2: [0.1, 0, -14],
        rotation2: [0, -Math.PI / 2, -Math.PI / 2],
        position3: [0.7, 0, -14],
        rotation3: [0, -Math.PI / 2, -Math.PI / 2],
        position4: [1.3, 0, -14],
        rotation4: [0, -Math.PI / 2, -Math.PI / 2],
        scale: [0.256, 1.6, 0.256]
      },
      letsPlay: {
        position1: [-2, 0, -0.5],
        position2: [-2, 0, 0.5],
        positionBox: [-0.6, 0, -0.5],
        dimsBox: [3, 4.2, 0.1]
      },
      // rulebook: {
      //   position1: [-7, 0, -0.5],
      //   position2: [-7, 0, 0.5],
      //   positionBox: [-5.6, 0, -0.5],
      //   dimsBox: [3, 4.2, 0.1]
      // }
    },
    team0: {
      scale: 1,
      position: [-4, 0, -7.5],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
      pieces: {
        position: [0.2, 0, 0.2]
      },
      names: {
        position: [0, 0, 1.1]
      },
      join: {
        position: [2, 0, 0]
      },
      joinInput: {
        position: [2, 0, -0.42]
      }
    },
    team1: {
      scale: 1,
      position: [0, 0, -7.5],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
      pieces: {
        position: [0.2, 0, 0.2]
      },
      names: {
        position: [0, 0, 1.1]
      },
      join: {
        position: [2, 0, 0]
      },
      joinInput: {
        position: [2, 0, -0.42]
      }
    },
    joinTeamModal: {
      position: [-1.2, 0, -1]
    },
    startTip: {
      position: [2, 0, 6.5],
      line0Position: [0,0,0],
      line1Position: [0,0,0.4],
      line2Position: [0,0,0.8],
      fontSize: 0.24,
      rotation: [0, Math.PI / 2, 0],
    },
    spectatorMessage: {
      line0Position: [0,0,0],
      line1Position: [0,0,0.4],
      size: 0.24
    },
    throwCount: {
      position: [2, 0, 4.7],
      size: 0.24
    },
    turn: {
      position: [2, 0, 5.5],
      size: 0.24
    },
    yourTurn: {
      position: [2, 0, 5.5],
    },
    tips: {
      button: {
        position: [-4.3, 0, 3.5],
      },
      whosFirst: {
        position: [2.8, 1.2, 3.3]
      },
      thatsIt: {
        position: [0, 1.5, 0]
      },
      selectAUnit: {
        position: [0, 1.5, 4.5]
      },
      placeHere: {
        position: [0.5, 4, 1.5],
        line0Position: [-0.75, 0.05, -0.1],
        line1Position: [-0.75, 0.05, 0.25],
        line2Position: [-0.75, 0.05, 0.45],
        size: 0.2
      }
    },
    gamePhase: {
      position: [2, 0, 5.1],
      size: 0.24
    },
    hostId: {
      position: [5, 0, -3],
      size: 0.3
    },
    roomId: {
      position: [5, 0, -3.5],
      size: 0.3
    },
    ready: [0,0,-2.5],
    currentPlayerName: [-1,0,-3.5],
    chat: {
      position: [-4.5, 0, 5],
      fontSizeMin: 0,
      fontSizeMax: 22,
      heightMin: 0,
      heightMax: 100,
      widthMin: 0,
      widthMax: 140,
      paddingMin: 0,
      paddingMax: 8,
    },
    piecesSection: {
      position: [-1, 0, 6],
      scale: 1
    },
    actionButtons: {
      position: [1.5, 0, 0],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    menu: {
      position: [-7.3,-0.5,-2.3],
    },
    rulebook: {
      position: [-3, 0.5, -13.8],
      widthMax: 469,
      widthMin: 0,
      heightMin: 0,
      heightMax: 170,
      padding: 5
    },
    moves: {
      text: [0,0,1.5],
      list: [0,0,2]
    },
    tileRadius: {
      ring: 4,
      shortcut1: 2.7,
      shortcut2: 1.4
    },
    tilePieceScale: 2.5,
    star: {
      scale: 0.35,
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
    letsPlayButton: {
      position: [2.3, -1.2, 6.5],
      fontSize: 0.5,
      boxWidth: 2,
      boxHeight: 0.5,
      rotation: [0, Math.PI / 2, Math.PI / 2, "XZY"],
    },
    invite: {
      position: [-4.23,0,4.1],
    },
    discord: {
      position: [-4.2, 0, 4.7]
    },
    rulebookButton: {
      position: [3.5, 0, -3.4],
      size: 0.3
    },
    settings: {
      position: [2.85, 0, -4],
      size: 0.3
    },
    roomId: {
      position: [-4.4, 0, -4],
      size: 0.2
    },
    hostName: {
      position: [-4.4, 0, -3.7],
      size: 0.2
    },
    startEarth: {
      position: [3,0,4],
      helperArrow: {
        position: [2.2,0,3.8],
        rotation: [Math.PI,Math.PI + Math.PI/4 + Math.PI/16,0],
        color: 'limegreen',
        scale: [0.23, 0.23, 0.7]
      },
      fontSize: 0.3,
      boxWidth: 2.4,
      boxHeight: 0.7,
      rotation: [0, Math.PI / 2, 0],
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
    center: [0,0,0],
    camera: {
      zoomMin: 30,
      zoomMax: 150,
      position: [0,20,3],
      lookAtOffset: [0, 0, 0]
    },
    title: {
      position1: [-13.5, 0, -5.5],
      position2: [-13.5, 0, -4],
      fontSize: '80px',
      yoots: {
        position1: [-9.9, 0, -5.2],
        rotation1: [0, -Math.PI / 2, -Math.PI / 2],
        position2: [-9.4, 0, -5.2],
        rotation2: [0, -Math.PI / 2, -Math.PI / 2],
        position3: [-8.9, 0, -5.2],
        rotation3: [0, -Math.PI / 2, -Math.PI / 2],
        position4: [-8.4, 0, -5.2],
        rotation4: [0, -Math.PI / 2, -Math.PI / 2],
        scale: [0.21, 1.3, 0.21]
      },
      rockets: {
        position1: [0.3,0,-3],
        position2: [0.3,0,-4],
        position3: [2,0,-3],
        position4: [2,0,-4],
        scale: [1.1, 1.1, 1.1]
      },
      ufos: {
        position1: [0.3,0,-5],
        position2: [0.3,0,-6],
        position3: [2,0,-5],
        position4: [2,0,-6],
        scale: [1.1, 1.1, 1.1]
      },
      letsPlay: {
        position1: [0, 0, -1],
        position2: [0, 0, 0.5],
        positionBox: [1.4, 0, -0.65],
        dimsBox: [3, 16, 0.1]
      },
      // rulebook: {
      //   position1: [-13.5, 0, -1],
      //   position2: [-13.5, 0, 0.5],
      //   positionBox: [-12.1, 0, -0.65],
      //   dimsBox: [3, 16, 0.1]
      // }
    },
    team0: {
      scale: 1,
      position: [-8, 0, -3.5],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
      pieces: {
        position: [0.2, 0, 0.2]
      },
      names: {
        position: [0, 0, 1]
      },
      join: {
        position: [2, 0, 0]
      },
      joinInput: {
        position: [2, 0, -0.42]
      }
    },
    team1: {
      scale: 1,
      position: [-8, 0, -0.5],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
      pieces: {
        position: [0.2, 0, 0.1]
      },
      names: {
        position: [0, 0, 1]
      },
      join: {
        position: [2, 0, 0]
      },
      joinInput: {
        position: [2, 0, -0.42]
      }
    },
    yootButton: {
      position: [6,0,3]
    },
    gamePhase: {
      position: [5, 0, -2],
      size: 0.3
    },
    hostId: {
      position: [5, 0, -3],
      size: 0.3
    },
    roomId: {
      position: [-3.5, 0, -3.3],
      size: 0.2
    },
    hostName: {
      position: [-3.5, 0, -3.7],
      size: 0.2
    },
    rulebookButton: {
      position: [5, 0, -3.5],
      size: 0.3
    },
    settings: {
      position: [5, 0, -2.9],
      size: 0.3
    },
    throwCount: {
      position: [5, 0, -1.5],
      size: 0.3
    },
    turn: {
      position: [5, 0, 1.7],
      size: 0.3
    },
    piecesSection: {
      position: [5, 0, 0],
      scale: 1
    },
    startEarth: {
      position: [1, 0, 6.8],
      helperArrow: {
        position: [2.8,0,5],
        rotation: [Math.PI,Math.PI + Math.PI/4 + Math.PI/16,0],
        color: 'limegreen',
        scale: [0.4, 0.4, 1.2]
      },
      fontSize: 0.6,
      boxWidth: 2.4,
      boxHeight: 0.7,
      rotation: [0, Math.PI / 2, 0],
    },
    letsPlayButton: {
      position: [5, 0, 2.5],
      fontSize: 0.6,
      boxWidth: 2.4,
      boxHeight: 0.6,
      rotation: [0, Math.PI / 2, 0],
    },
    startTip: {
      position: [4.5, 0, 2],
      line0Position: [0,0,0],
      line1Position: [0,0,0.5],
      line2Position: [0,0,1],
      fontSize: 0.3,
      rotation: [0, Math.PI / 2, 0],
    },
    spectatorMessage: {
      position: [4.5, 0, 2.5]
    },
    yourTurn: {
      position: [5, 0, 1.7]
    },
    tips: {
      button: {
        position: [-8, 0, 1.9]
      },
      whosFirst: {
        position: [3,0.65,3.2]
      },      
      thatsIt: {
        position: [0,0.6,-0.5]
      },
      selectAUnit: {
        position: [3.5,0.5,0.3]
      },
      placeHere: {
        position: [0, 4, 1],
        line0Position: [-0.75, 0.05, -0.1],
        line1Position: [-0.75, 0.05, 0.25],
        line2Position: [-0.75, 0.05, 0.45],
        size: 0.2
      }
    },
    ready: [0,0,-2.5],
    currentPlayerName: [-1,0,-3.5],
    chat: {
      position: [-8.1,0,2],
      fontSizeMin: 12,
      fontSizeMax: 25,
      heightMin: 70,
      heightMax: 150,
      widthMin: 140,
      widthMax: 700,
      paddingMin: 5,
      paddingMax: 10,
    },
    joinTeamModal: {
      position: [-1.2, 0, -1]
    },
    actionButtons: {
      position: [1.5, 0, 16],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    menu: {
      position: [-8, 0, 1.9]
    },
    invite: {
      position: [-6.8, 0, 1.9]
    },
    discord: {
      position: [-5.1, 0, 1.9]
    },
    moves: {
      text: [0,0,-1],
      list: [1.5, 0, -1],
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
    tilePieceScale: 4,
    star: {
      scale: 0.4,
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
    yootButton: {
      position: [5,0,2.5]
    },
    title: {
      position1: [-13.5, 0, -5.5],
      position2: [-13.5, 0, -4],
      fontSize: '40px',
      yoots: {
        position1: [-9.9, 0, -5.2],
        rotation1: [0, -Math.PI / 2, -Math.PI / 2],
        position2: [-9.4, 0, -5.2],
        rotation2: [0, -Math.PI / 2, -Math.PI / 2],
        position3: [-8.9, 0, -5.2],
        rotation3: [0, -Math.PI / 2, -Math.PI / 2],
        position4: [-8.4, 0, -5.2],
        rotation4: [0, -Math.PI / 2, -Math.PI / 2],
        scale: [0.21, 1.3, 0.21]
      },
      rockets: {
        position1: [0.3,0,-3],
        position2: [0.3,0,-4],
        position3: [2,0,-3],
        position4: [2,0,-4],
        scale: [1.1, 1.1, 1.1]
      },
      ufos: {
        position1: [0.3,0,-5],
        position2: [0.3,0,-6],
        position3: [2,0,-5],
        position4: [2,0,-6],
        scale: [1.1, 1.1, 1.1]
      },
      letsPlay: {
        position1: [0, 0, -1],
        position2: [0, 0, 0.5],
        positionBox: [1.4, 0, -0.65],
        dimsBox: [3, 16, 0.1]
      },
      // rulebook: {
      //   position1: [-13.5, 0, -1],
      //   position2: [-13.5, 0, 0.5],
      //   positionBox: [-12.1, 0, -0.65],
      //   dimsBox: [3, 16, 0.1]
      // }
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
      },
      join: {
        position: [2, 0, 0]
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
      },
      join: {
        position: [2, 0, 0]
      }
    },
    throwCount: {
      position: throwPosition,
      size: 0.21
    },
    turn: {
      position: [-0.8, 0, -1.5],
      size: 0.22
    },
    gamePhase: {
      position: [-0.8, 0, -1.9],
      size: 0.24
    },
    hostId: {
      position: [5, 0, -3],
      size: 0.3
    },
    roomId: {
      position: [5, 0, -3.5],
      size: 0.3
    },
    rulebookButton: {
      position: [5, 0, -3.5],
      size: 0.3
    },
    settings: {
      position: [3, 0, -3.5],
      size: 0.3
    },
    ready: [0,0,-2.5],
    currentPlayerName: [-1,0,-3.5],
    chat: {
      position: [-13,-0.5,-1.5],
      fontSizeMin: 12,
      fontSizeMax: 40,
      heightMin: 50,
      heightMax: 140,
      widthMin: 110,
      widthMax: 220,
      paddingMin: 5,
      paddingMax: 7,
    },
    joinTeamModal: {
      position: [-1.2, 0, -1]
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
    tilePieceScale: 4,
    star: {
      scale: 0.4,
    },
    mars: {
    },
    saturn: {
    },
    moon: {
    },
    earth: {
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
    letsPlayButton: {
      position: [-0.8, -1.2, -5],
      fontSize: 0.6,
      boxWidth: 2.4,
      boxHeight: 0.7,
      rotation: [0, Math.PI / 2, 0],
    },
    invite: {
      position: [-6.8, 0, 1.9]
    },
    discord: {
      position: [-5.1, 0, 1.9]
    },
    startTip: {
      position: [4.5, 0, 2],
      line0Position: [0,0,0],
      line1Position: [0,0,0.5],
      line2Position: [0,0,1],
      fontSize: 0.3,
      rotation: [0, Math.PI / 2, 0],
    },
    startEarth: {
      position: [-0.8, -1.2, -5],
      helperArrow: {
        position: [1.2,0,5.8],
        rotation: [Math.PI/2,0,-Math.PI * (5/8)],
        color: 'yellow',
        scale: 2
      },
      fontSize: 0.6,
      boxWidth: 2.4,
      boxHeight: 0.7,
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
