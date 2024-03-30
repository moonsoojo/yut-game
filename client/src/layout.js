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
      position: [2.8,0,6.9]
    },
    title: {
      position: [0,0,0],
      rotation: [0,0,0],
      text: {
        position: [-2.1,0,-5.8],
        rotation: [-Math.PI/4,0,Math.PI/64],
        fontSize: 20,
        scale: 1.7
      },
      yoots: {
        position: [1.1, 0, -4.5],
        rotation: [Math.PI/4,Math.PI/2,0],
        scale: 0.14
      },
      tiles: {
        position: [0, 0, -1.8],
        rotation: [0, -Math.PI/16, 0],
        scale: 0.5
      },
      about: {
        show: false,
        position: [-0.4, 0, 0.5],
        rotation: [-Math.PI/4,0,0],
        fontSize: 10
      },
      howToPlay: {
        position: [-0.75, 0, 1],
        rotation: [-Math.PI/4,0,0],
        fontSize: 10
      },
      letsPlay: {
        position: [-0.63, 0, 1.48],
        rotation: [-Math.PI/4,0,0],
        fontSize: 10
      },
      pieces: {
        position: [0,0,0],
        scale: 0.5
      },
    },
    howToPlay: {
      position: [0,0,-2],
      rotation: [0,0,0],
      scale: 0.4,
      page0: {
        text: {
          position: [-1, 0, -1]
        },
        moveText: {
          text: "MOVE: 4",
          position: [-3.2, 0.2, -0.2]
        },
        yoot: {
          initialPos: [
            [-2 + 0, 1, 3],
            [-2 + 0.8, 1, 3],
            [-2 + 1.6, 1, 3],
            [-2 + 2.4, 1, 3]
          ],
          initialThrowPos: [
            { x: -1, y: 0.5, z: -1},
            { x: -1 + 0.4, y: 0.5, z: -1},
            { x: -1 + 0.8, y: 0.5, z: -1},
            { x: -1 + 1.2, y: 0.5, z: -1}
          ]
        }
      },
      page1: {
        text: {
          position: [-3.5,0,-5],
          rotation: [-Math.PI/8, 0, 0],
          fontSize: 26
        },
        firstCornerTiles: {
          position: [-2, 0, -1.5]
        },
        homePieces: {
          position: [-2, 0, -2]
        },
        moveDisplay: {
          position: [-2.8, 0, 1.7]
        },
        cursorPos0: [1, 0.3, 1],
        cursorPos1: [-0.5, 0.3, -0.4],
        cursorPos2: [2.3, 1.3, 3],
        rocket3Pos0: [0,0,0],
        rocket3Pos1: [
          -Math.cos(((0+5) * (Math.PI * 2)) / 20) * 5 - 1,
          1.5,
          Math.sin(((0+5) * (Math.PI * 2)) / 20) * 5 - 1,
        ],
        rocket3Pos2: [
          -Math.cos(((1+5) * (Math.PI * 2)) / 20) * 5 - 1,
          1,
          Math.sin(((1+5) * (Math.PI * 2)) / 20) * 5 - 1,
        ],
        rocket3Pos3: [
          -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5 - 1,
          1,
          Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5 - 1,
        ],
        rocket3Pos4: [
          -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5 - 1,
          1,
          Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5 - 1,
        ],
      },
      page2: {
        tilesPos0: [0,0,0],
        tilesPos1: [-2, 0, -4],
        tilesScale0: 1,
        tilesScale1: 2,
        rocketHomeScale1: 1,
        rocket0Pos: [0.3,0,-0.5],
        rocket1Pos: [0.9,0,-0.5],
        rocket2Pos: [0.3,0,0.1],
        checkPos: [0.9,0,0.6],
        cursorPos: [
          [1, 0, 4],
          [0.3, 1.5, 4.8],
          [1, 0.2, 2.9]
        ],
        moveText: {
          rotation: [-Math.PI/8, 0, 0],
          position: [-0.2,0,1.2],
          fontSize: 22
        },
        scoreText: {
          rotation: [-Math.PI/8, 0, 0],
          position: [-0.1, 0, 2.5],
          size: 0.4
        },
        letsGoText: {
          lets: {
            position: [-0.2,0,1.7],
            rotation: [-Math.PI/8, 0, 0],
            fontSize: 22
          },
          go: {
            position: [-0.2,0,2.4],
            rotation: [-Math.PI/8, 0, 0],
            fontSize: 22
          }
        },
        fireworks: {
          initialPosition: {
            x: -0.5,
            y: 0,
            z: -2,
          },
          positionRange: {
            x: 0.5,
            y: 0,
            z: 0.5
          }
        }
      },
      page3: {
        text: {
          position: [-4.5,0,-5]
        },
        firstCornerTilesPos: [
          [-1.5,0,-1],
          [-0.5, 0, -1]
        ],
        cursorPos: [
          [0, 0.3, 0],
          [-1,2,4.5],
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5-0.8,
            2,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5-0.8,
          ],
          [5,2,3.5],
        ],
        rocketPos: [
          [
            -Math.cos(((0+5) * (Math.PI * 2)) / 20) * 5-1,
            1.5,
            Math.sin(((0+5) * (Math.PI * 2)) / 20) * 5-1,
          ],
          [
            -Math.cos(((1+5) * (Math.PI * 2)) / 20) * 5-1,
            1.5,
            Math.sin(((1+5) * (Math.PI * 2)) / 20) * 5-1,
          ],
          [
            -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5-1,
            1.5,
            Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5-1,
          ],
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5-1,
            1.5,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5-1,
          ]
        ],
        ufoPos: [
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5-0.8,
            0.5,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5-1,
          ],
          [7, -3, -5]
        ],
        pointer: {
          position: [0.1,2.5,0]
        },
        bonusTurn: {
          position: [-2, 0, 0.5]
        },
        yootButtonModel: {
          position: [1.5, 0, 0.5]
        },
        moveText: {
          position: [-2,0,1]
        }
      },
      page4: {
        text: {
          position: [-5,0,-5]
        },
        cursorPos: [
          [1, 0.3, 3],
          [-1.2,2,5.5],
          [3,2,5],
          [6, 0.3, 1],
          [2.8,2,5],
          [4.5, 2, 3.2],
          [6.5, 0.3, 1]
        ],
        pointer0: {
          position: [-0.3,2.5,0]
        },
        pointer1: {
          position: [-0.15,1.9,0]
        }
      },
      page5: {
        text: {
          position: [-4,0,-6],
          rotation: [-Math.PI/8, 0, 0]
        },
        tilesPos: [
          [0,0,1.3],
          [-3, 0, -1.5]
        ],
        tilesScale: [
          0.6,
          0.9
        ],
        tilesOnly: {
          scale: 1.2
        },
        scoreText: {
          position: [0.7, 2, 3.5],
          rotation: [-Math.PI/4, 0, 0]
        },
        rocket0Scale: [
          1.7,
          2.3,
          1.7,
          0,
          1.7,
          2.3,
          1.7,
          0,
          1.7,
          2.3,
          1.7,
        ]
      },
      pagination: {
        pageRadius: 0.3,
        arrowRadius: 0.4
      }
    },
    about: {
      position: [-2.5, 0, -4],
      rotation: [-Math.PI/4,0,0],
      scale: 0.35
    },
    team0: {
      scale: 1,
      position: [-4, 0, -7.5],
      title: {
        position: [0,0,0],
        rotation: [-Math.PI / 2, 0, 0],
      },
      pieces: {
        position: [0.2, 0, 0.7]
      },
      names: {
        position: [0, 0, 1.1],
        rotation: [-Math.PI/2, 0, 0],
        padding: '0px 15px 0px 0px',
        divWidth: 150
      },
      join: {
        position: [2, 0, 0.1],
        rotation: [-Math.PI / 2, 0, 0],
        fontSize: 15
      },
      joinInput: {
        position: [2, 0, -0.42]
      }
    },
    team1: {
      scale: 1,
      position: [0, 0, -7.5],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
      title: {
        position: [0,0,0],
        rotation: [-Math.PI / 2, 0, 0],
      },
      pieces: {
        position: [0.2, 0, 0.6]
      },
      names: {
        position: [0, 0, 1.1],
        rotation: [-Math.PI/2, 0, 0],
        padding: '0px 15px 0px 0px',
        divWidth: 150
      },
      join: {
        position: [2, 0, 0.1],
        rotation: [-Math.PI / 2, 0, 0],
        fontSize: 15
      },
      joinInput: {
        position: [2, 0, -0.42]
      }
    },
    joinTeamModal: {
      position: [-1, 0, -0.7],
      rotation: [-Math.PI/2, 0, 0],
      scale: [1, 1, 1]
    },
    disconnectModal: {
      position: [-2.3,0.1,-1],
      rotation: [-Math.PI/2,0,0],
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
      position: [2, 0, 4.4],
      rotation: [-Math.PI/2, 0, 0],
      fontSize: 13
    },
    gamePhase: {
      position: [2, 0, 4.8],
      rotation: [-Math.PI/2, 0, 0],
      fontSize: 13
    },
    turn: {
      position: [2, 0, 4.8],
      rotation: [-Math.PI/2, 0, 0],
      fontSize: 13
    },
    yourTurn: {
      position: [2, 0, 5.2],
      rotation: [-Math.PI/2, 0, 0],
      fontSize: 13
    },
    startEarth: {
      position: [0.5,0,4.5],
      rotation: [-Math.PI/2, 0, 0],
      helperArrow: {
        position: [2,0,4],
        rotation: [Math.PI,Math.PI + Math.PI/4 + Math.PI/10,0],
        color: 'limegreen',
        scale: [0.2, 0.2, 0.6]
      },
      fontSize: 15
    },
    tips: {
      button: {
        position: [-4.3, 0, 3.5],
        rotation: [-Math.PI/2, 0, 0],
        fontSize: 13,
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
    hostName: {
      position: [-4.1, 0, -4.5],
      rotation: [-Math.PI/2, 0, 0],
      fontSize: 13,
    },
    roomId: {
      position: [-4.1, 0, -4.1],
      rotation: [-Math.PI/2, 0, 0],
      fontSize: 13,
    },
    ready: [0,0,-2.5],
    currentPlayerName: [-1,0,-3.5],
    chat: {
      position: [-4.35,0,5.3],
      rotation: [-Math.PI/2, 0, 0],
      scale: [0.5, 0.5, 0.5],
      box: {
        borderRadius: '5px',
        height: '150px',
        width: '200px',
        padding: '10px',
        fontSize: '20px',
      },
      input: {
        height: '20px',
        borderRadius: '5px',
        padding: '10px',
        border: 0,
        width: '200px',
        fontSize: '20px',
      }
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
      text: {
        position: [0, 0, 0.95],
        rotation: [-Math.PI/2, 0, 0],
        fontSize: 15
      },
      list: {
        position: [0, 0, 1.35],
        rotation: [-Math.PI/2, 0, 0],
        fontSize: 15
      },
    },
    tileRadius: {
      ring: 4,
      shortcut1: 2.7,
      shortcut2: 1.4
    },
    tilePieceScale: 2.5,
    star: {
      scale: 0.4,
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
      position: [2,0,6.3],
      rotation: [-Math.PI / 2, 0, 0],
      fontSize: 15,
    },
    invite: {
      position: [-4.3,0,4.1],
      rotation: [-Math.PI/2, 0, 0],
      fontSize: 13,
    },
    discord: {
      position: [-4.3, 0, 4.7],
      rotation: [-Math.PI/2, 0, 0],
      fontSize: 13,
    },
    rulebookButton: {
      position: [3.5, 0, -3.8],
      rotation: [-Math.PI/2, 0, 0],
      fontSize: 13,
    },
    settings: {
      position: [3, 0, -4.4],
      rotation: [-Math.PI/2, 0, 0],
      fontSize: 13,
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
    tooltip: {
      whoFirst: {
        position: [1.3,1,3]
      }
    },
    tiles: {
      position: [-8, 0, 0],
      scale: 1
    },
    tipsModal: {
      position: [-2.5,0,-0.9],
      rotation: [-Math.PI/2,0,0],
      height: 60,
      padding: 10,
      scale: [1,1,1],
      fontSize: 15
    },
    meteors: {
      initialPosition: {
        x: 0,
        y: 3,
        z: 0,
      }
    },
    winScreen: {
      fireworks: {
        emitters: [
          { // left
            initialPosition: {
              x: -4,
              y: 0,
              z: 0
            },
            positionRange: {
              x: 2,
              y: 2,
              z: 2
            }
          },
          { // left
            initialPosition: {
              x: -1,
              y: 2,
              z: 0
            },
            positionRange: {
              x: 2,
              y: 2,
              z: 2
            }
          },
          { // left
            initialPosition: {
              x: 1,
              y: 4,
              z: 0
            },
            positionRange: {
              x: 2,
              y: 2,
              z: 2
            }
          },
          { // right
            initialPosition: {
              x: 4,
              y: 4,
              z: 0
            },
            positionRange: {
              x: 2,
              y: 2,
              z: 2
            }
          }
        ],
        timePanA: 1
      },
      dust: {          
        initialPosition: {
          x: 0,
          y: -5,
          z: 0
        },
        positionRange: {
          x: 2,
          y: 1,
          z: 2
        }
      }
    }
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
      position: [-21,0,-9],
      rotation: [-Math.PI/4, Math.PI/8, 0],
      text: {
        position: [0,0,0],
        rotation: [0,0,0],
        fontSize: 20,
        scale: 3.6,
      },
      board: {
      },
      tiles: {
        position: [0, 0, -4],
        scale: 1
      },
      about: {
        show: true,
        position: [0,-5,0],
        rotation: [0,0,0],
        fontSize: 40
      },
      howToPlay: {
        position: [0,-7,0],
        rotation: [0,0,0],
        fontSize: 40
      },      
      letsPlay: {
        position: [0,-9,0],
        rotation: [0,0,0],
        fontSize: 40
      },
      pieces: {
        position: [0,0,0],
        scale: 1
      },
      yoots: {
        position: [7, -2, 0],
        rotation: [Math.PI/8 * 3,Math.PI/2,0],
        scale: 0.4
      }
    },
    about: {
      position: [-6, 0, -9],
      rotation: [-Math.PI/4,0,Math.PI/32],
      scale: 1
    },
    howToPlay: {
      position: [-1,0,-4],
      rotation: [0,Math.PI/32,Math.PI/64],
      scale: 1,
      page0: {
        text: {
          position: [0, 0, -1]
        },
        moveText: {
          text: "MOVE: 3",
          position: [-5, 0.2, 0]
        },
        yoot: {
          initialPos: [
            [-2 + 0, 1, 3],
            [-2 + 0.8, 1, 3],
            [-2 + 1.6, 1, 3],
            [-2 + 2.4, 1, 3]
          ],
          initialThrowPos: [
            { x: -2 + 0, y: 1, z: -2},
            { x: -2 + 0.8, y: 1, z: -2},
            { x: -2 + 1.6, y: 1, z: -2},
            { x: -2 + 2.4, y: 1, z: -2}
          ]
        }
      },
      page1: {
        text: {
          position: [-2.5,0,-5],
          rotation: [-Math.PI/8, 0, 0],
          fontSize: 26
        },
        firstCornerTiles: {
          position: [-1, 0, -1.5]
        },
        homePieces: {
          position: [-1, 0, -2]
        },
        moveDisplay: {
          position: [-1.8, 0, 1.7]
        },
        cursorPos0: [1, 0.3, 1],
        cursorPos1: [0.4, 0.3, -0.5],
        cursorPos2: [3.2, 1.3, 2.3],
        rocket3Pos0: [0,0,0],
        rocket3Pos1: [
          -Math.cos(((0+5) * (Math.PI * 2)) / 20) * 5 - 1,
          1.5,
          Math.sin(((0+5) * (Math.PI * 2)) / 20) * 5 - 1,
        ],
        rocket3Pos2: [
          -Math.cos(((1+5) * (Math.PI * 2)) / 20) * 5 - 1,
          1,
          Math.sin(((1+5) * (Math.PI * 2)) / 20) * 5 - 1,
        ],
        rocket3Pos3: [
          -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5 - 1,
          1,
          Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5 - 1,
        ],
        rocket3Pos4: [
          -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5 - 1,
          1,
          Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5 - 1,
        ],
      },
      page2: {
        tilesPos0: [0,0,0],
        tilesPos1: [-2, 0, -4],
        tilesScale0: 0.8,
        tilesScale1: 1.5,
        rocketHomeScale1: 1.3,
        rocket0Pos: [-0.4,0,-0.7],
        rocket1Pos: [0.8,0,-0.7],
        rocket2Pos: [-0.4,0,0.5],
        checkPos: [0.6,0,1],
        cursorPos: [
          [1, 0, 4],
          [0, 1.5, 5.8],
          [0.3, 0.2, 3.9]
        ],
        moveText: {
          position: [-0.5,0,2],
          rotation: [-Math.PI/8, -Math.PI/16, 0],
          fontSize: 26
        },
        scoreText: {
          position: [-0.5, 0, 3.5],
          rotation: [-Math.PI/8, -Math.PI/16, 0],
          size: 0.5
        },
        letsGoText: {
          lets: {
            position: [-0.5,0,1.7],
            rotation: [-Math.PI/8, -Math.PI/16, 0],
            fontSize: 26
          },
          go: {
            position: [-0.5,0,2.4],
            rotation: [-Math.PI/8, -Math.PI/16, 0],
            fontSize: 26
          }
        },
        fireworks: {
          initialPosition: {
            x: -0.5,
            y: 0,
            z: -2,
          },
          positionRange: {
            x: 0.5,
            y: 0,
            z: 0.5
          }
        }
      },
      page3: {
        text: {
          position: [-3.5,0,-5]
        },
        firstCornerTilesPos: [
          [-1.5,0,-1],
          [-1.5,0,-1]
        ],
        cursorPos: [
          [0, 0.3, 0],
          [-1,2,4.5],
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5-1.2,
            2,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5-0.5,
          ],
          [5,2,3.5],
        ],
        rocketPos: [
          [
            -Math.cos(((0+5) * (Math.PI * 2)) / 20) * 5-1,
            1.5,
            Math.sin(((0+5) * (Math.PI * 2)) / 20) * 5-1,
          ],
          [
            -Math.cos(((1+5) * (Math.PI * 2)) / 20) * 5-1,
            1.5,
            Math.sin(((1+5) * (Math.PI * 2)) / 20) * 5-1,
          ],
          [
            -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5-1,
            1.5,
            Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5-1,
          ],
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5-1,
            1.5,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5-1,
          ]
        ],
        ufoPos: [
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5-0.8,
            0.5,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5-1,
          ],
          [7, -3, -5]
        ],
        pointer: {
          position: [-0.5,2.5,0]
        },
        bonusTurn: {
          position: [-3, 0, 0.5]
        },
        yootButtonModel: {
          position: [0.5, 0, 0.5]
        },
        moveText: {
          position: [-2, 0, 1]
        }
      },
      page4: {
        text: {
          position: [-3.5,0,-5]
        },
        cursorPos: [
          [1, 0.3, 3],
          [-1.2,2,5.5],
          [2.8,2,5],
          [6, 0.3, 1],
          [2.8,2,5],
          [4, 2, 3],
          [6, 0.3, 1]
        ],
        pointer0: {
          position: [-0.3,2.5,0]
        },
        pointer1: {
          position: [-0.3,1.7,0]
        }
      },
      page5: {
        text: {
          position: [-3.5,0,-7],
          rotation: [-Math.PI/8, 0, 0]
        },
        tilesPos: [
          [0,0,1.5],
          [-3, 0, -1.5]
        ],
        tilesScale: [
          0.6,
          1
        ],
        tilesOnly: {
          scale: 1
        },
        scoreText: {
          position: [-1, 2, 4],
          rotation: [-Math.PI/8, -Math.PI/16, 0]
        },
        rocket0Scale: [
          1.2,
          1.8,
          1.2,
          0,
          1.2,
          1.6,
          1.2,
          0,
          1.4,
          1.9,
          1.4,
        ]
      },
      pagination: {
        pageRadius: 0.2,
        arrowRadius: 0.4
      }
    },
    team0: {
      scale: 1,
      position: [-8, 0, -3.5],
      title: {
        position: [0,0,0],
        rotation: [-Math.PI / 2, 0, 0],
      },
      pieces: {
        position: [0.23, 0, 0.6]
      },
      names: {
        position: [0, 0, 1],
        rotation: [-Math.PI/2, 0, 0],
        padding: '0px 15px 0px 0px',
        divWidth: 200
      },
      join: {
        position: [2, 0, 0.15],
        rotation: [-Math.PI / 2, 0, 0],
        fontSize: 15
      },
    },
    team1: {
      scale: 1,
      position: [-8, 0, -1],
      title: {
        position: [0,0,0],
        rotation: [-Math.PI / 2, 0, 0],
      },
      pieces: {
        position: [0.3, 0, 0.5]
      },
      names: {
        position: [0, 0, 1],
        rotation: [-Math.PI/2, 0, 0],
        padding: '0px 15px 0px 0px',
        divWidth: 200
      },
      join: {
        position: [2, 0, 0.15],
        rotation: [-Math.PI / 2, 0, 0],
        fontSize: 15
      },
      joinInput: {
        position: [2, 0, -0.42]
      }
    },
    yootButton: {
      position: [5.8,0,3.2]
    },
    gamePhase: {
      position: [5, 0, -2],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
      fontSize: 15
    },
    roomId: {
      position: [-4.5, 0, -3.1],
      rotation: [-Math.PI/2, 0, 0],
      fontSize: 13,
    },
    hostName: {
      position: [-4.5, 0, -3.5],
      rotation: [-Math.PI/2, 0, 0],
      fontSize: 13,
    },
    rulebookButton: {
      position: [5, 0, -3.5],
      rotation: [-Math.PI/2, 0, 0],
      fontSize: 15,
    },
    settings: {
      position: [5, 0, -2.8],
      rotation: [-Math.PI/2, 0, 0],
      fontSize: 15,
    },
    throwCount: {
      position: [5, 0, -1.5],
      rotation: [-Math.PI / 2, 0, 0],
      fontSize: 15
    },
    turn: {
      position: [5, 0, -2],
      rotation: [-Math.PI / 2, 0, 0],
      fontSize: 15
    },
    yourTurn: {
      position: [5, 0, 1.5],
      rotation: [-Math.PI / 2, 0, 0],
      fontSize: 15
    },
    piecesSection: {
      position: [5, 0, 0],
      scale: 1
    },
    startEarth: {
      position: [0.6, 0, 3.6],
      rotation: [-Math.PI/2, 0, 0],
      helperArrow: {
        position: [1.6,0,3.1],
        rotation: [Math.PI,Math.PI + Math.PI/4 + Math.PI/12,0],
        color: 'limegreen',
        scale: [0.2, 0.2, 0.6]
      },
      fontSize: 15,
    },
    letsPlayButton: {
      position: [5,0,2.5],
      rotation: [-Math.PI / 2, 0, 0],
      fontSize: 15,
    },
    startTip: {
      position: [5, 0, 2],
      rotation: [-Math.PI / 2, 0, 0],
      line0Position: [0,0,0],
      line1Position: [0,0,0.5],
      line2Position: [0,0,1],
      fontSize: 15,
    },
    spectatorMessage: {
      position: [4.5, 0, 2.5]
    },
    tips: {
      button: {
        position: [-8, 0, 1.35],
        rotation: [-Math.PI/2, 0, 0],
        fontSize: 15
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
      position: [-8,0,2],
      rotation: [-Math.PI/2, 0, 0],
      scale: [0.5, 0.5, 0.5],
      box: {
        borderRadius: '5px',
        height: '110px',
        width: '350px',
        padding: '10px',
        fontSize: '20px',
      },
      input: {
        height: '10px',
        borderRadius: '5px',
        padding: '10px',
        border: 0,
      }
    },
    joinTeamModal: {
      position: [-1, 0, -0.7],
      rotation: [-Math.PI/2, 0, 0],
    },
    disconnectModal: {
      position: [-2.6,0.1,-1],
      rotation: [-Math.PI/2,0,0],
    },
    tipsModal: {
      position: [-4,0,-1.5],
      rotation: [-Math.PI/2,0,0],
      height: 60,
      padding: 10,
      scale: [1.5,1.5,1.5],
      fontSize: 15
    },
    actionButtons: {
      position: [1.5, 0, 16],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    menu: {
      position: [-8, 0, 1.9]
    },
    invite: {
      position: [-8, 0, 1.35],
      rotation: [-Math.PI/2, 0, 0],
      fontSize: 15
    },
    discord: {
      position: [-6.7, 0, 1.35],
      rotation: [-Math.PI/2, 0, 0],
      fontSize: 15
    },
    moves: {
      text: {
        position: [0, 0, 1.5],
        rotation: [-Math.PI/2, 0, 0],
        fontSize: 15
      },
      list: {
        position: [1.4, 0, 1.5],
        rotation: [-Math.PI/2, 0, 0],
        fontSize: 15
      },
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
    tooltip: {
      whoFirst: {
        position: [0.5,1.5,2.2]
      }
    },
    meteors: {
      initialPosition: {
        x: 0,
        y: 3,
        z: 0,
      }
    },
    winScreen: {
      fireworks: {
        emitters: [
          { // left
            initialPosition: {
              x: -8,
              y: 0,
              z: 0
            },
            positionRange: {
              x: 2,
              y: 2,
              z: 2
            }
          },
          { // left
            initialPosition: {
              x: -11,
              y: 0,
              z: 0
            },
            positionRange: {
              x: 2,
              y: 2,
              z: 2
            }
          },
          { // right
            initialPosition: {
              x: 8,
              y: 0,
              z: 0
            },
            positionRange: {
              x: 2,
              y: 2,
              z: 2
            }
          },
          { // right
            initialPosition: {
              x: 11,
              y: 0,
              z: 0
            },
            positionRange: {
              x: 2,
              y: 2,
              z: 2
            }
          }
        ],
        timePanA: 1,
      },
      dust: {          
        initialPosition: {
          x: 0,
          y: -4,
          z: 0
        },
        positionRange: {
          x: 3,
          y: 1,
          z: 3
        }
      }
    }
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
        position: [2, 0, 0],
        rotation: [-Math.PI / 2, 0, 0, "XZY"],
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
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
      fontSize: 15
    },
    roomId: {
      position: [5, 0, -3.5],
      size: 0.3
    },
    rulebookButton: {
      position: [5, 0, -3.5],
      rotation: [-Math.PI/2, 0, 0],
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
      position: [0,0,0],
      rotation: [-Math.PI / 2, 0, 0],
      fontSize: 15,
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
      position: [-0.8, -1.2, 0],
      rotation: [-Math.PI/2, 0, 0],
      helperArrow: {
        position: [1.2,0,5.8],
        rotation: [Math.PI/2,0,-Math.PI * (5/8)],
        color: 'yellow',
        scale: 2
      },
      fontSize: 15,
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
  },
};