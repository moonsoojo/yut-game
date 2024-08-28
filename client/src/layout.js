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
      position: [0,17,7],
    },
    title: {
      position: [0,0,0],
      rotation: [0,0,0],
      text: {
        position: [-4,0,-8.3],
        rotation: [-Math.PI/2,0,0],
        scale: 3.5
      },
      yoots: {
        position: [2.5, 0, -6.3],
        rotation: [0,Math.PI/2,0],
        scale: 0.35
      },
      tiles: {
        position: [0, 0, -0.1],
        rotation: [0, -Math.PI/16, 0],
        scale: 0.4
      },
      about: {
        show: false,
        position: [0, 0, 5.8],
        rotation: [0,0,0],
        scale: 1.7
      },
      howToPlay: {
        position: [0, 0, 7],
        rotation: [0,0,0],
        scale: 1.7
      },
      letsPlay: {
        position: [0, 0, 8.2],
        rotation: [0,0,0],
        scale: 1.7
      },
      pieces: {
        position: [0,0,0],
        scale: 0.5
      },
      board: {
        position: [0, 0, 0.5],
        scale: 0.75
      }
    },
    howToPlay: {
      position: [0,0,0],
      rotation: [0,0,0],
      scale: 0.8,
      pickingTheTeamsPage: {
        cursorPos: [
          [4,0,0],
          [-0.5, 0.5, -1.4],
          [-0.5, 0.5, 2.3],
        ],
        text: {
          position: [-5,0,-4],
          rotation: [-Math.PI/2,0,0],
          size: 0.5,
          height: 0.01
        },
        rockets: {
          position: [-5, 0, -2.5],
          text: {
            position: [0,0,0],
            rotation: [-Math.PI/2, 0, 0],
            size: 0.5,
            height: 0.01
          },
          piece0: {
            position: [0.4,0,0.6]
          },
          piece1: {
            position: [1.2,0,0.6]
          },
          piece2: {
            position: [2.0,0,0.6]
          },
          piece3: {
            position: [2.8,0,0.6]
          },
          joinButton: {
            position: [3, 0, 0.8],
            text: {
              position: [0.7,0,0],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            }
          },
          names: [
            {
              position: [0,0,2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,2.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,3.4],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,4.1],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,4.8],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
          ]
        },
        ufos: {
          position: [0.6, 0, -2.5],
          text: {
            position: [0,0,0],
            rotation: [-Math.PI/2, 0, 0],
            size: 0.5,
            height: 0.01
          },
          piece0: {
            position: [0.4,0,0.6]
          },
          piece1: {
            position: [1.4,0,0.6]
          },
          piece2: {
            position: [2.4,0,0.6]
          },
          piece3: {
            position: [3.4,0,0.6]
          },
          joinButton: {
            position: [3.7, 0, 0.8],
            text: {
              position: [0.7,0,0],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            }
          },
          names: [
            {
              position: [0,0,2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,2.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,3.4],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,4.1],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,4.8],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,5.5],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,6.2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
          ]
        },
        inputModal: {
          position: [0, 0.1, 1]
        }
      },
      throwingTheDicePage: {
        text: {
          position: [-5, 0, -4],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.5,
          height: 0.01
        },
        moveText: {
          text: "MOVE:\n3-STEPS",
          position: [2.3, 0.7, -0.9],
          size: 0.5
        },
        gulToken: {
          position: [3.1, 0, 0.7],
          rotation: [0, Math.PI/2, 0],
          scale: 0.9
        },
        yoot: {
          yoot0Wrapper: {
            restPos: {
              x: -2,
              y: 0,
              z: 1
            },
            throwPos: {
              x: -2.5,
              y: 0,
              z: 1
            },
            liePos: {
              x: -2.7,
              y: 0,
              z: 1,
            }
          },
          yoot1Wrapper: {
            restPos: {
              x: -1.5,
              y: 0.5,
              z: 1
            },
            throwPos: {
              x: -1.5,
              y: 0.5,
              z: 1
            },
            liePos: {
              x: -1.5,
              y: 0,
              z: 1,
            }
          },
          yoot2Wrapper: {
            restPos: {
              x: -0.7,
              y: 0,
              z: 1
            },
            throwPos: {
              x: -0.4,
              y: 0,
              z: 1
            },
            liePos: {
              x: -0.3,
              y: 0,
              z: 1,
            }
          },
          yoot3Wrapper: {
            restPos: {
              x: -0.1,
              y: 0.7,
              z: 1
            },
            throwPos: {
              x: 0.5,
              y: 0.7,
              z: 1
            },
            liePos: {
              x: 0.8,
              y: 0,
              z: 1,
            }
          },
        },
        yootButtonModel: {
          position: [3.5, 0, 2.5],
          rotation: [0, Math.PI/2, 0, "ZXY"]
        },
        cursor: {
          position: [4.5, 0.3, 4.1],
          rotation: [0, 0, 0],
          scale: [3, 3, 0.1]
        },
      },
      readingTheDicePage: {
        text: {
          position: [-5, 0, -4],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.5,
          height: 0.01,
        },
        do: {
          position: [-4.7, 0, -1.3],
          scale: 0.6,
          text: {
            line0: {
              position: [-0.2,0,-2.7],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-1.7],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            }
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.55
          }
        },
        ge: {
          position: [-0.6, 0, -1.3],
          scale: 0.6,
          text: {
            line0: {
              position: [-0.2,0,-2.7],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-1.8],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            }
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.55
          }
        },
        gul: {
          position: [3.1, 0, -1.3],
          scale: 0.6,
          text: {
            line0: {
              position: [-0.2,0,-2.7],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-1.8],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            }
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.55
          }
        },
        yoot: {
          position: [-4.7, 0, 3],
          scale: 0.6,
          text: {
            line0: {
              position: [-0.2,0,-3.5],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-2.6],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line2: {
              position: [-0.2,0,-1.7],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.5
          }
        },
        mo: {
          position: [-0.6, 0, 3],
          scale: 0.6,
          text: {
            line0: {
              position: [-0.2,0,-3.5],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-2.6],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line2: {
              position: [-0.2,0,-1.7],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.5
          }
        },
        backdo: {
          position: [3.5, 0, 3],
          scale: 0.6,
          text: {
            line0: {
              position: [-0.2,0,-3.5],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-2.6],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line2: {
              position: [-0.2,0,-1.7],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            }
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.5
          }
        },
      },
      movingPiecesPage: {
        text: {
          position: [-5, 0, -4],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.5
        },
        homePieces: {
          position: [-2, 0, -1.5]
        },
        firstCornerTiles: {
          position: [-2, 0, -2]
        },
        moveDisplay: {
          position: [-3.3, 0, 1.2]
        },
        cursorPos0: [1, 0.3, 0],
        cursorPos1: [-0.5, 0.3, -0.2],
        cursorPos2: [2.3, 1.3, 2],
        rocket3Pos0: [0.8,-0.5,0.7],
        rocket3Pos1: [
          -Math.cos(((0+5) * (Math.PI * 2)) / 20) * 5,
          1.5,
          Math.sin(((0+5) * (Math.PI * 2)) / 20) * 5 - 0.5,
        ],
        rocket3Pos2: [
          -Math.cos(((1+5) * (Math.PI * 2)) / 20) * 5,
          0.9,
          Math.sin(((1+5) * (Math.PI * 2)) / 20) * 5 - 0.5,
        ],
        rocket3Pos3: [
          -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5,
          0.9,
          Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5 - 0.5,
        ],
        rocket3Pos4: [
          -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5,
          0.9,
          Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5 - 0.5,
        ],
      },
      scoringPage: {
        scale: 0.8,
        position: [0, 0, 0.5],
        text: {
          position: [1,0,0.5],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.5,
          lineHeight: 1,
          height: 0.01
        },
        tilesPos0: [0,0,-1.5],
        tilesPos1: [-1, 0.5, -5],
        tilesScale0: 1,
        tilesScale1: 1.3,
        rocketHomeScale1: 1,
        rocket0Pos: [0.8, 0, 0],
        rocket1Pos: [1.6, 0, 0],
        rocket2Pos: [0.8, 0, 1],
        checkPos: [1.5, 0, 1],
        cursorPos: [
          [1, 0, 4.5],
          [0.3, 1.5, 5.7],
          [1, 0.2, 3.2],
          [1, 0.2, 4.2]
        ],
        moveText: {
          rotation: [-Math.PI/2, 0, 0],
          position: [0.7,0,2],
          fontSize: 22
        },
        scoreText: {
          rotation: [-Math.PI/2, 0, 0],
          position: [0.7, 0, 2.8],
          size: 0.4
        },
        letsGoText: {
          position: [0.8,0,2.2],
          rotation: [-Math.PI/8, 0, 0],
          fontSize: 22
        },
        fireworks: {
          initialPosition: {
            x: -1,
            y: 2,
            z: -3,
          },
          positionRange: {
            x: 0.5,
            y: 0,
            z: 0.5
          }
        },
        welcomeBackText: {
          position: [2.5, 0, 2],
          rotation: [-Math.PI/2,0,0]
        }
      },
      catchingPiecesPage: {
        text: {
          position: [-5,0,-4],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.45,
          height: 0.01,
          lineHeight: 0.9
        },
        firstCornerTilesPos: [
          [-1.5,0,-1],
          [-0.8, 0, -1]
        ],
        cursorPos: [
          [1, 0.3, 0],
          [-1,2,4.8],
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5-1,
            1.5,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [5,2,2.5],
        ],
        rocketPos: [
          [
            -Math.cos(((0+5) * (Math.PI * 2)) / 20) * 5,
            2,
            Math.sin(((0+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((1+5) * (Math.PI * 2)) / 20) * 5,
            2,
            Math.sin(((1+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5,
            2,
            Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5,
            2,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5,
          ]
        ],
        ufoPos: [
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5,
            1.5,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [7, -3, -5]
        ],
        pointer: {
          position: [0.1,2.5,-1]
        },
        bonusTurn: {
          position: [-3.3, 0, 1]
        },
        yootButtonModel: {
          position: [0.2, 0, 1],
        },
        moveText: {
          position: [-3,0,0.5]
        },
        gulToken: {
          position: [-0.5,0,0.25],
          rotation: [0, Math.PI/2, 0]
        }
      },
      combiningPiecesPage: {
        text: {
          position: [-5,0,-4],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.45,
          height: 0.01,
          lineHeight: 0.9
        },
        cursorPos: [
          [1, 0.3, 3],
          [-0.8,2,5.5],
          [3.3,2,5.2],
          [6, 0.3, 1],
          [2.8,2,5],
          [4.5, 2, 3.2],
          [6.5, 0.3, 1]
        ],
        rocket0Pos: [
          [
            -Math.cos(((-1+5) * (Math.PI * 2)) / 20) * 5,
            1,
            Math.sin(((-1+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((0+5) * (Math.PI * 2)) / 20) * 5,
            1,
            Math.sin(((0+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((1+5) * (Math.PI * 2)) / 20) * 5,
            1,
            Math.sin(((1+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5-0.3,
            1,
            Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5-0.3,
            1,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((4+5) * (Math.PI * 2)) / 20) * 5-0.3,
            1.1,
            Math.sin(((4+5) * (Math.PI * 2)) / 20) * 5,
          ],
        ],
        rocket1Pos: [
          [
            -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5,
            1,
            Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5+0.3,
            1,
            Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5+0.3,
            1,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((4+5) * (Math.PI * 2)) / 20) * 5+0.3,
            1.1,
            Math.sin(((4+5) * (Math.PI * 2)) / 20) * 5,
          ],
        ],
        pointer0: {
          position: [-0.3,2.5,0]
        },
        pointer1: {
          position: [-0.15,1.9,0]
        },
        firstCornerTiles: {
          position: [-1, 0, -1.5]
        },
        moveText0: {
          position: [-3, 0, 0.5],
          rotation: [-Math.PI/2,0,0],
          size: 0.5,
          height: 0.01,
          lineHeight: 0.9
        },
        moveText1: {
          position: [-3, 0, 0.5],
          rotation: [-Math.PI/2,0,0],
          size: 0.5,
          height: 0.01,
          lineHeight: 0.9
        },
        gulToken: {
          position: [-0.2, 0, 0.2],
          rotation: [0, Math.PI/2, 0],
        },
        geToken0: {
          position: [0.7, 0, 0.2],
          rotation: [0, Math.PI/2, 0]
        },
        geToken1: {
          position: [-0.2, 0, 0.25],
          rotation: [0, Math.PI/2, 0]
        }
      },
      shortcutsPage: {
        text: {
          position: [-5,0,-4.8],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.45,
          height: 0.01,
          lineHeight: 0.9,
          scales: [1, 0] 
        },
        tilesPos: [
          [0,0,0.8],
          [-3.5, 0, -1]
        ],
        tilesScale: [
          0.6,
          0.85
        ],
        scoreText: {
          position: [0.7, 2, 3.5],
          rotation: [-Math.PI/2, 0, 0]
        },
        moveText: {
          position: [20,0,1],
          rotation: [-Math.PI/2, 0, 0],
          scale: [0, 1]
        },
        noteText: {
          position: [1,0,2.5],
          rotation: [-Math.PI/2, 0, 0]
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
          2,
          2.8,
          2,
        ],
        rocket0Pos: [
          [
            -Math.cos(((5+5) * (Math.PI * 2)) / 20) * 5,
            0 + 2,
            Math.sin(((5+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            Math.sin(((10 -5) * (Math.PI * 2)) / 20) * 3.5,
            1.5,
            Math.cos(((10 -5) * (Math.PI * 2)) / 20) * 3.5,
          ],
          [
            Math.sin(((10 -5) * (Math.PI * 2)) / 20) * 1.7,
            1.5,
            Math.cos(((10 -5) * (Math.PI * 2)) / 20) * 1.7,
          ],
          [
            0,
            2.5,
            0,
          ],
          [
            0,
            3,
            0,
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              1.7,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              1.7,
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              3.5,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              3.5,
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              5,
            2,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((12 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((12 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((13 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((13 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((14 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((14 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((15 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((15 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((15 -5) * (Math.PI * 2)) / 20) *
              5,
            2.5,
            Math.cos(((15 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((15 -5) * (Math.PI * 2)) / 20) *
              3.5,
            1.5,
            Math.cos(((15 -5) * (Math.PI * 2)) / 20) *
              3.5,
          ],
          [
            Math.sin(((15 -5) * (Math.PI * 2)) / 20) *
              1.7,
            1.5,
            Math.cos(((15 -5) * (Math.PI * 2)) / 20) *
              1.7,
          ],
          [
            0,
            2,
            0
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              1.7,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              1.7,
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              3.5,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              3.5,
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              5,
            2,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((8 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((8 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((9 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((9 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((10 -5) * (Math.PI * 2)) / 20) *
              5,
            2,
            Math.cos(((10 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((11 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((11 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((12 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((12 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
        ],
        cursor: {
          position: [
            [1, 0.3, 2],
            [0, 0, 4],
            [0, 0, 2.2]
          ],
          scale: [
            [0,0,0],
            [2, 2, 2]
          ],
          effectOpacity: [
            0,
            1,
            0
          ]
        },
        yootToken: {
          position: [2.5, 0.2, 0],
          rotation: [Math.PI/2, Math.PI/2, 0]
        },
        tileHelper: {
          position: [1.7, 0, -2.7],
          rotation: [0, Math.PI/2, 0]
        }
      },
      pagination: {
        pageRadius: 0.3,
        arrowRadius: 0.4,
        position: [-0.5, 0, 0.5],
        scale: 0.8
      },
      tileRadius: {
        ring: 5,
        shortcut1: 3.5,
        shortcut2: 1.7
      },
      star: {
        scale: 0.5,
        rocketScale: 0.6,
        ufoScale: 0.3,
      }
    },
    about: {
      position: [-4, 0, -3.3],
      rotation: [-Math.PI/2,0,0],
      scale: 0.5,
      mainDescription: {
        size: 0.6,
        line0Position: [0,0.5,0],
      },
      board: {
        position: [6.5, -7.5, 0],
        rotation: [Math.PI/2, 0, 0],
        scale: 0.7,
        text: {
          position: [0,-5.5,0],
          size: 0.6
        }
      },
      pieces: {
        position: [-1,-13,0],
        size: 0.6,
        rockets: {
          position: [4, -14, 0]
        },
        ufos: {
          position: [7.5, -14, 0]
        }
      },
      yoot: {
        position: [14.5, -8.5, 0],
        text: {
          position: [11.5,-5.5,0],
          size: 0.6
        }
      },
      playersText: {
        position: [11.5,-13,0],
        size: 0.6
      },
      ageText: {
        position: [10,-1.5,0],
        size: 0.6
      }
    },
    game: {
      letsPlayButton: {
        position: [3.7,0,7.7],
        rotation: [-Math.PI / 2, 0, 0],
        disabledButton: {
          position: [-0.5,0,0.5],
          scale: 1.8,
          text: {
            position: [-0.6, 0.025, -0.25],
            rotation: [-Math.PI/2, 0, 0],
            size: 0.2,
            height: 0.01,
            lineHeight: 0.9
          }
        },
        waitingForHostButton: {
          position: [-0.5,0,0.5],
          scale: 1.8,
          text: {
            position: [-0.6, 0.025, -0.25],
            rotation: [-Math.PI/2, 0, 0],
            size: 0.2,
            height: 0.01,
            lineHeight: 0.9
          }
        },
        activeButton: {
          backdropWidth: 1.4,
          backdropHeight: 1.1,
          scale: 1.1,
          position: [-0.4, 0, 0.4],
          text: {
            position: [-0.8,0,-0.15],
            rotation: [-Math.PI/2,0,0],
            size: 0.45,
            height: 0.01,
            lineHeight: 0.7
          }
        }
      },
      hostName: {
        position: [-4.6, 0.025, 4.5],
        rotation: [-Math.PI/2, 0, 0],
        size: 0.3,
        height: 0.01
      },
      team0: {
        position: [-4.5, 0, -8],
        scale: 1,
        title: {
          position: [0,0,0],
          rotation: [-Math.PI / 2, 0, 0],
          size: 0.4,
          height: 0.01
        },
        pieces: {
          position: [0.23, 0, 0],
          positionStartX: 0,
          positionStartY: 0,
          positionStartZ: 0.8,
          rotation: [0, 0, 0],
          scale: 1.4,
          space: 1.1,
          sectionScale: 0.5
        },
        names: {
          position: [0, 0, 1.3],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.35,
          height: 0.01,
          maxLength: 12
        },
        join: {
          position: [3.2, 0, -0.1],
          rotation: [-Math.PI / 2, 0, 0],
          scale: 1.2,
          size: 0.3,
          height: 0.01
        },
        pregameRoll: {
          position: [3.4, 0, 0.5],
          rotation: [-Math.PI / 2, 0, 0],
          size: 0.35,
          height: 0.01
        }
      },
      team1: {
        scale: 1,
        position: [0.2, 0, -8],
        title: {
          position: [0,0,0],
          rotation: [-Math.PI / 2, 0, 0],
          size: 0.4,
          height: 0.01
        },
        pieces: {
          position: [0.23, 0, 0.1],
          positionStartX: 0,
          positionStartY: 0,
          positionStartZ: 0.8,
          rotation: [0, 0, 0],
          scale: 1.2,
          space: 1.2,
          sectionScale: 0.5
        },
        names: {
          position: [0, 0, 1.3],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.35,
          height: 0.01,
          maxLength: 12
        },
        join: {
          position: [3.2, 0, -0.1],
          rotation: [-Math.PI / 2, 0, 0],
          scale: 1.2,
          size: 0.3,
          height: 0.01
        },
        pregameRoll: {
          position: [3.5, 0, 0.6],
          rotation: [-Math.PI / 2, 0, 0],
          size: 0.35,
          height: 0.01
        }
      },
      joinTeamModal: {
        position: [-2.9, 0, -1.7],
        rotation: [-Math.PI/2, 0, 0],
        scale: [1.3, 1.3, 1.3]
      },
      chat: {
        position: [-4.7,0,5.6],
        rotation: [-Math.PI/2, 0, 0],
        scale: [0.5, 0.5, 0.5],
        box: {
          borderRadius: '5px',
          height: '320px',
          width: '220px',
          padding: '10px',
          fontSize: '24px',
        },
        input: {
          height: '15px',
          fontSize: '20px',
          borderRadius: '5px',
          padding: '10px',
          border: 0,
        }
      },
      invite: {
        position: [-3.05, 0, 5.4],
        scale: 0.9,
        size: 0.3,
        height: 0.01,
        text: {
          content: `copy room\nlink`,
          position: [-1.5, 0.025, -9.7]
        },
        copiedText: {
          position: [-1.35, 0.025, -0.75]
        },
        outerBox: {
          args: [3.2, 0.03, 1.3]
        },
        innerBox: {
          args: [3.1, 0.04, 1.2]
        }
      },
      discord: {
        position: [-3.75, 0, 5.8],
        scale: 0.9,
        size: 0.3,
        height: 0.01
      },
      disconnectModal: {
        position: [0, 3, 1],
        rotation: [0,0,0],
      },
      board: {
        lobby: {
          scale: 0.85,
          position: [0, 0, 0]
        },
        pregame: {
          scale: 0.2,
          position: [4.2, 0, -2.2]
        },
        game: {
          scale: 0.85,
          position: [0, 0, 0]
        },
        finished: {
          scale: 0.2,
          position: [5, 0, 1]
        },
      },
      whoGoesFirst: {
        title: {
          position: [-4.5, 0, -4],
          rotation: [-Math.PI/2,0,0],
          size: 0.5,
          height: 0.01
        },
        description: {
          position: [-4.5, 0, -3.3],
          rotation: [-Math.PI/2,0,0],
          size: 0.3,
          height: 0.01,
          lineHeight: 0.7
        }
      },
      settings: {
        position: [4.1, 0, -4.5],
        scale: 0.9,
        text: {
          position: [-0.9, 0.025, 0.15],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.3,
          height: 0.01,
        }
      },
      rulebookButton: {
        position: [4.375, 0, -3.9],
        scale: 0.9,
      },
      rulebook: {
        position: [0, 9, 3],
        blocker: {
          args: [12, 0.1, 10]
        },
        closeButton: {
          position: [5.7,0,-5],
          scale: 1
        }
      },
      piecesSection: {
        position: [-0.6, 0, 7.3],
        emptyPieces: {
          positions: [
            [0, 0, -0.3],
            [1.5, 0, -0.3],
            [0, 0, 1.1],
            [1.5, 0, 1.1]
          ]
        },
        pieces: {
          rotation: [0, 0, 0],
          positions: [
            [0, 0, -1],
            [1.2, 0, -1],
            [0, 0, 0.2],
            [1.2, 0, 0.2]
          ],
          scale: 1.3
        }
      },
      moveList: {
        position: [-1.2, 0, 9],
        rotation: [-Math.PI/2, 0, 0],
        tokenScale: 0.8,
        tokenPosition: [0.5, 0, 0.5]
      },
      currentPlayer: {
        position: [3.2, 0, 5],
        rotation: [0,0,0],
        text: {
          position: [0.7, 0.025, 0.15],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.35,
          height: 0.01
        }
      },
      practiceYootButton: {
        position: [3.3, 0, 8.5],
        scale: 1.2
      },
      yootButton: {
        position: [3.2, 0, 8],
        rotation: [0, Math.PI/2, 0],
        scale: 1.2
      },
      throwCount: {
        position: [1.5, 0, 9],
        orientation: 'downUp'
      },
      scoreButtons: {
        text: "touch\ndown",
        textSize: 0.6,
        lineHeight: 0.8,
        position: [-1.2, 0, 6.9],
        rotation: [-Math.PI/2, 0, 0],
        scale: 0.8,
        buttons: {
          position: [0, -1, 0]
        }
      },
      mainAlert: {
        position: [0, 0.3, 7],
        rotation: [0, Math.PI/2, 0]
      },
      pregameAlert: {
        position: [-2, 0, -3.5],
        initialScale: 1.7,
        rocketsGoFirst: {
          position: [0.5, 2, 1],
          rotation: [0, Math.PI/2, 0],
        },
        ufosGoFirst: {
          position: [0.5, 2, 1],
          rotation: [0, Math.PI/2, 0],
        },
        tie: {
          position: [0.5, 3, 1],
          rotation: [0, Math.PI/2, 0],
        }
      },
      throwAlert: {
        position: [0,0,5.5],
        rotation: [0, Math.PI/2, 0],
        initialScale: 1
      },
      ufo: {
        selectedAdditionalScale: 0.3,
        selectedAnimatedScaleRange: 0.15
      },
      welcomeBackText: {
        position: [0, 1, 0],
        rotation: [-Math.PI/2,0,0]
      }
    },
    board: {
      startEarth: {
        position: [2.5, 0, 5.5],
        text: {
          position: [-0.9,0,0.4],
          rotation: [-Math.PI/2, 0, 0],
          fontSize: 15,
        },
        helperArrow: {
          position: [0.3, 0, -0.4],
          rotation: [Math.PI, -Math.PI/2 - Math.PI/8 - Math.PI/32, 0],
          color: 'limegreen',
          scale: [0.2, 0.1, 0.5]
        },
      },
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
  landscapeDesktop: {
    center: [0,0,0],
    camera: {
      zoomMin: 30,
      zoomMax: 150,
      position: [0,17,7],
      lookAtOffset: [0, 0, 0]
    },
    title: {
      text: {
        position: [-11,0,-5],
        rotation: [-Math.PI/2,0,0],
        scale: 4,
      },
      about: {
        show: true,
        position: [-9.5, 0, 0.5],
        rotation: [0,0,0],
        scale: 2
      },
      howToPlay: {
        position: [-8.2, 0, 2],
        rotation: [0, 0, 0],
        scale: 2
      },      
      letsPlay: {
        position: [-8, 0, 3.5],
        rotation: [0, 0, 0],
        scale: 2
      },
      pieces: {
        position: [0,0,0],
        scale: 1
      },
      yoots: {
        position: [-3.5, 0, -2.8],
        rotation: [Math.PI/2,Math.PI/2,-Math.PI/2],
        scale: 0.4
      },
      board: {
        position: [4.5, 0, 0],
        scale: 0.9
      }
    },
    about: {
      position: [1, 0, -4],
      rotation: [-Math.PI/2,0,0],
      scale: 0.6,
      mainDescription: {
        size: 0.6,
        line0Position: [-1,0.5,0],
      },
      board: {
        position: [5.5, -7, 0],
        rotation: [Math.PI/2, 0, 0],
        scale: 0.6,
        text: {
          position: [-1,-5,0],
          size: 0.6
        }
      },
      pieces: {
        position: [-1,-13,0],
        size: 0.6,
        rockets: {
          position: [4, -13, 0]
        },
        ufos: {
          position: [7.5, -13, 0]
        }
      },
      yoot: {
        position: [14.2, -8, 0],
        text: {
          position: [11.1,-5,0],
          size: 0.6
        },
      },
      playersText: {
        position: [11.5,-12.5,0],
        size: 0.6
      },
      ageText: {
        position: [10.5,-12.5,-1],
        size: 0.6
      }
    },
    howToPlay: {
      position: [3,0,0],
      rotation: [0,Math.PI/32,Math.PI/64],
      scale: 1,
      pickingTheTeamsPage: {
        cursorPos: [
          [4,0,0],
          [1.5, 0.5, -1.4],
          [-0.5, 0.5, 1.3],
        ],
        text: {
          position: [-3,0,-4],
          rotation: [-Math.PI/2,0,0],
          size: 0.4,
          height: 0.01
        },
        rockets: {
          position: [-3, 0, -2.5],
          text: {
            position: [0,0,0],
            rotation: [-Math.PI/2, 0, 0],
            size: 0.4,
            height: 0.01
          },
          piece0: {
            position: [0.4,0,0.6]
          },
          piece1: {
            position: [1.2,0,0.6]
          },
          piece2: {
            position: [2.0,0,0.6]
          },
          piece3: {
            position: [2.8,0,0.6]
          },
          joinButton: {
            position: [3, 0, 0.8],
            text: {
              position: [0.7,0,0],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            }
          },
          names: [
            {
              position: [0,0,2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [2,0,2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [3.8,0,2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [5.8,0,2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,2.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
          ]
        },
        ufos: {
          position: [-3, 0, 1.5],
          text: {
            position: [0,0,0],
            rotation: [-Math.PI/2, 0, 0],
            size: 0.4,
            height: 0.01
          },
          piece0: {
            position: [0.4,0,0.6]
          },
          piece1: {
            position: [1.4,0,0.6]
          },
          piece2: {
            position: [2.4,0,0.6]
          },
          piece3: {
            position: [3.4,0,0.6]
          },
          joinButton: {
            position: [3.5, 0, 0.8],
            text: {
              position: [0.7,0,0],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            }
          },
          names: [
            {
              position: [0,0,2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [2.5,0,2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [4.5,0,2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [6,0,2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,2.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [3.5,0,2.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [5.5,0,2.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
          ]
        },
        inputModal: {
          position: [0, 0.1, 0]
        }
      },
      throwingTheDicePage: {
        text: {
          position: [-3, 0, -3.5],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.4,
          height: 0.01
        },
        moveText: {
          text: "MOVE:\n3-STEPS",
          position: [2, 0.7, -0.9],
          size: 0.4
        },
        gulToken: {
          position: [2.5, 0, 0.6],
          rotation: [0, Math.PI/2, 0],
          scale: 0.8
        },
        yoot: {
          yoot0Wrapper: {
            restPos: {
              x: -2,
              y: 0,
              z: 1
            },
            throwPos: {
              x: -2.5,
              y: 0,
              z: 1
            },
            liePos: {
              x: -2.7,
              y: 0,
              z: 1,
            }
          },
          yoot1Wrapper: {
            restPos: {
              x: -1.5,
              y: 0.5,
              z: 1
            },
            throwPos: {
              x: -1.5,
              y: 0.5,
              z: 1
            },
            liePos: {
              x: -1.5,
              y: 0,
              z: 1,
            }
          },
          yoot2Wrapper: {
            restPos: {
              x: -0.7,
              y: 0,
              z: 1
            },
            throwPos: {
              x: -0.4,
              y: 0,
              z: 1
            },
            liePos: {
              x: -0.3,
              y: 0,
              z: 1,
            }
          },
          yoot3Wrapper: {
            restPos: {
              x: -0.1,
              y: 0.7,
              z: 1
            },
            throwPos: {
              x: 0.5,
              y: 0.7,
              z: 1
            },
            liePos: {
              x: 0.8,
              y: 0,
              z: 1,
            }
          },
        },
        yootButtonModel: {
          position: [3, 0, 2],
          rotation: [0,Math.PI/2,0]
        },
        cursor: {
          position: [3.3, 0.3, 3.5],
          rotation: [0, 0, 0],
          scale: [3, 3, 0.1]
        },
      },
      movingPiecesPage: {
        text: {
          position: [-3,0,-4],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.4
        },
        firstCornerTiles: {
          position: [-2, 0, -1]
        },
        homePieces: {
          position: [-2, 0.7, -1.5]
        },
        moveDisplay: {
          position: [-3.3, 0, 1.7]
        },
        cursorPos0: [1, 0.3, 1.7],
        cursorPos1: [-0.6, 0.3, 0],
        cursorPos2: [2.4, 1.3, 2.8],
        rocket3Pos0: [0.8,-0.5,0.7],
        rocket3Pos1: [
          -Math.cos(((0+5) * (Math.PI * 2)) / 20) * 5,
          1.5,
          Math.sin(((0+5) * (Math.PI * 2)) / 20) * 5,
        ],
        rocket3Pos2: [
          -Math.cos(((1+5) * (Math.PI * 2)) / 20) * 5,
          1,
          Math.sin(((1+5) * (Math.PI * 2)) / 20) * 5,
        ],
        rocket3Pos3: [
          -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5,
          1,
          Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5,
        ],
        rocket3Pos4: [
          -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5,
          1,
          Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5,
        ],
      },
      scoringPage: {
        scale: 0.8,
        position: [0, 0, 0.5],
        text: {
          position: [1.5,0,1.5],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.4,
          lineHeight: 1,
          height: 0.01
        },
        tilesPos0: [0,0,0],
        tilesPos1: [-0.5, 0.5, -3],
        tilesScale0: 0.8,
        tilesScale1: 1,
        rocketHomeScale1: 1.1,
        rocket0Pos: [0.8,0.5,-0.1],
        rocket1Pos: [1.8,0.5,-0.1],
        rocket2Pos: [0.8,0.5,0.8],
        checkPos: [1.6, 0.5,0.8],
        cursorPos: [
          [1, 0, 4],
          [0, 1.5, 5.8],
          [1.8, 0.2, 3.5],
          [1, 0.2, 4.2]
        ],
        moveText: {
          position: [1,0,2],
          rotation: [-Math.PI/2, 0, 0],
          fontSize: 26
        },
        scoreText: {
          position: [1, 0, 3.1],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.5
        },
        letsGoText: {
          position: [0,0,2.2],
          rotation: [-Math.PI/8, -Math.PI/16, 0],
          fontSize: 26
        },
        fireworks: {
          initialPosition: {
            x: -1,
            y: 2,
            z: -1,
          },
          positionRange: {
            x: 1,
            y: 0,
            z: 1
          }
        },
        welcomeBackText: {
          position: [2.5, 0, 2],
          scale: 1.2
        }
      },
      catchingPiecesPage: {
        text: {
          position: [-3.5,0,-4],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.4,
          height: 0.01,
          lineHeight: 0.9
        },
        firstCornerTilesPos: [
          [-1.5,0,-1],
          [-1.5,0,-1]
        ],
        cursorPos: [
          [0, 0.3, 1],
          [-1,2,5],
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5-1.2,
            2,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5 + 0.5,
          ],
          [5,2,3.5],
        ],
        rocketPos: [
          [
            -Math.cos(((0+5) * (Math.PI * 2)) / 20) * 5,
            2,
            Math.sin(((0+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((1+5) * (Math.PI * 2)) / 20) * 5,
            2,
            Math.sin(((1+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5,
            2,
            Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5,
            2,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5,
          ]
        ],
        ufoPos: [
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5,
            1.5,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [6, -3, -2]
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
          position: [-3, 0, 0]
        },
        gulToken: {
          position: [-0.5,0,-0.25],
          rotation: [0, Math.PI/2, 0]
        }
      },
      combiningPiecesPage: {
        text: {
          position: [-3.5,0,-4],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.4,
          height: 0.01,
          lineHeight: 0.9
        },
        cursorPos: [
          [1.1, 0.3, 3.3],
          [-1.0,2,5.7],
          [3.5,2,5.1],
          [6.5, 0.3, 1],
          [3.5,2,5],
          [5, 2, 3],
          [6.3, 0.3, 1]
        ],
        rocket0Pos: [
          [
            -Math.cos(((-1+5) * (Math.PI * 2)) / 20) * 5,
            1,
            Math.sin(((-1+5) * (Math.PI * 2)) / 20) * 5 ,
          ],
          [
            -Math.cos(((0+5) * (Math.PI * 2)) / 20) * 5,
            1,
            Math.sin(((0+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((1+5) * (Math.PI * 2)) / 20) * 5,
            1,
            Math.sin(((1+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5-0.35,
            1,
            Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5-0.35,
            1,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((4+5) * (Math.PI * 2)) / 20) * 5-0.35,
            1,
            Math.sin(((4+5) * (Math.PI * 2)) / 20) * 5,
          ],
        ],
        rocket1Pos: [
          [
            -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5,
            1,
            Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5 +0.35,
            1,
            Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5  +0.35,
            1,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((4+5) * (Math.PI * 2)) / 20) * 5 +0.35,
            1.1,
            Math.sin(((4+5) * (Math.PI * 2)) / 20) * 5,
          ],
        ],
        pointer0: {
          position: [-0.3,2.5,0]
        },
        pointer1: {
          position: [-0.3,1.7,0]
        },
        firstCornerTiles: {
          position: [-1, 0, 0]
        },
        moveText0: {
          position: [-3, 0, 0.5],
          rotation: [-Math.PI/2,0,0],
          size: 0.5,
          height: 0.01,
          lineHeight: 0.9
        },
        moveText1: {
          position: [-3, 0, 1],
          rotation: [-Math.PI/2,0,0],
          size: 0.5,
          height: 0.01,
          lineHeight: 0.9
        },
        gulToken: {
          position: [-0.2, 0, 0.2],
          rotation: [0, Math.PI/2, 0],
        },
        geToken0: {
          position: [0.7, 0, 0.2],
          rotation: [0, Math.PI/2, 0]
        },
        geToken1: {
          position: [-0.2, 0, 0.7],
          rotation: [0, Math.PI/2, 0]
        }
      },
      shortcutsPage: {
        text: {
          position: [-3.5,0,-4],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.4,
          height: 0.01,
          lineHeight: 0.9,
          scales: [1, 0] 
        },
        tilesPos: [
          [0,0,1.7],
          [-3, 0, -1.5]
        ],
        tilesScale: [
          0.6,
          1
        ],
        scoreText: {
          position: [0.5, 0, 3.5],
          rotation: [-Math.PI/2, 0, 0]
        },
        moveText: {
          position: [0, 0, 4],
          rotation: [-Math.PI/2, 0, 0],
          scale: [0, 0.8]
        },
        noteText: {
          position: [3,0,2],
          rotation: [-Math.PI/2, 0, 0]
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
        ],
        rocket0Pos: [
          [
            -Math.cos(((5+5) * (Math.PI * 2)) / 20) * 5,
            1.5,
            Math.sin(((5+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            Math.sin(((10 -5) * (Math.PI * 2)) / 20) * 3.5,
            1.5,
            Math.cos(((10 -5) * (Math.PI * 2)) / 20) * 3.5,
          ],
          [
            Math.sin(((10 -5) * (Math.PI * 2)) / 20) * 1.7,
            1.5,
            Math.cos(((10 -5) * (Math.PI * 2)) / 20) * 1.7,
          ],
          [
            0,
            2.5,
            0,
          ],
          [
            0,
            3,
            0,
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              1.7,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              1.7,
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              3.5,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              3.5,
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              5,
            2,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((12 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((12 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((13 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((13 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((14 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((14 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((15 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((15 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((15 -5) * (Math.PI * 2)) / 20) *
              5,
            2.5,
            Math.cos(((15 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((15 -5) * (Math.PI * 2)) / 20) *
              3.5,
            1.5,
            Math.cos(((15 -5) * (Math.PI * 2)) / 20) *
              3.5,
          ],
          [
            Math.sin(((15 -5) * (Math.PI * 2)) / 20) *
              1.7,
            1.5,
            Math.cos(((15 -5) * (Math.PI * 2)) / 20) *
              1.7,
          ],
          [
            0,
            2,
            0
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              1.7,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              1.7,
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              3.5,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              3.5,
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              5,
            2,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((8 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((8 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((9 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((9 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((10 -5) * (Math.PI * 2)) / 20) *
              5,
            2.6,
            Math.cos(((10 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((11 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((11 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((12 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((12 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
        ],
        cursor: {
          position: [
            [1, 0.3, 3],
            [3, 0, 5],
            [0.7, 0.5, 2.6]
          ],
          scale: [
            [0,0,0],
            [2, 2, 2]
          ],
          effectOpacity: [
            0,
            1,
            0
          ]
        },
        yootToken: {
          position: [2.5,0.2,0],
          rotation: [Math.PI/2, Math.PI/2, 0]
        },
        tileHelper: {
          position: [2.7, 0, -2.7],
          rotation: [0, Math.PI/2, 0]
        }
      },
      readingTheDicePage: {
        text: {
          position: [-3.7,0,-4],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.4,
          height: 0.01,
        },
        do: {
          position: [-3.6, 0, -1.2],
          scale: 0.6,
          text: {
            line0: {
              position: [-0.2,0,-2.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-1.8],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            }
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.55
          }
        },
        ge: {
          position: [-0.6, 0, -1.2],
          scale: 0.6,
          text: {
            line0: {
              position: [-0.2,0,-2.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-1.8],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            }
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.55
          }
        },
        gul: {
          position: [2.6, 0, -1.2],
          scale: 0.6,
          text: {
            line0: {
              position: [-0.2,0,-2.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-1.8],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            }
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.55
          }
        },
        yoot: {
          position: [-3.6, 0, 3.5],
          scale: 0.6,
          text: {
            line0: {
              position: [-0.2,0,-3.5],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-2.6],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line2: {
              position: [-0.2,0,-1.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            },
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.5
          }
        },
        mo: {
          position: [-0.6, 0, 3.5],
          scale: 0.6,
          text: {
            line0: {
              position: [-0.2,0,-3.5],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-2.6],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line2: {
              position: [-0.2,0,-1.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            },
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.5
          }
        },
        backdo: {
          position: [2.6, 0, 3.5],
          scale: 0.6,
          text: {
            line0: {
              position: [-0.2,0,-3.5],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-2.6],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line2: {
              position: [-0.2,0,-1.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            }
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.5
          }
        },
      },
      pagination: {
        pageRadius: 0.2,
        arrowRadius: 0.4
      },
      tileRadius: {
        ring: 5,
        shortcut1: 3.5,
        shortcut2: 1.7
      },
      star: {
        scale: 0.4,
        rocketScale: 0.6,
        ufoScale: 0.3,
      },
    },
    game: {
      letsPlayButton: {
        position: [8.65,0,3.5],
        rotation: [-Math.PI / 2, 0, 0],
        disabledButton: {
          position: [0.25,0,0.1],
          scale: 1.8,
          text: {
            position: [-0.6, 0.025, -0.25],
            rotation: [-Math.PI/2, 0, 0],
            size: 0.2,
            height: 0.01,
            lineHeight: 0.9
          }
        },
        waitingForHostButton: {
          position: [0.25,0,0.1],
          scale: 1.8,
          text: {
            position: [-0.6, 0.025, -0.25],
            rotation: [-Math.PI/2, 0, 0],
            size: 0.2,
            height: 0.01,
            lineHeight: 0.9
          }
        },
        activeButton: {
          backdropWidth: 1.4,
          backdropHeight: 1.1,
          scale: 1,
          position: [0.1, 0, 0],
          text: {
            position: [-0.8,0,-0.1],
            rotation: [-Math.PI/2,0,0],
            size: 0.45,
            height: 0.01,
            lineHeight: 0.7
          }
        }
      },
      hostName: {
        position: [8, 0.025, -3.95],
        rotation: [-Math.PI/2, 0, 0],
        size: 0.3,
        height: 0.01
      },
      team0: {
        position: [-11, 0, -5.2],
        scale: 1,
        title: {
          position: [0,0,0],
          rotation: [-Math.PI / 2, 0, 0],
          size: 0.4,
          height: 0.01
        },
        pieces: {
          position: [0.23, 0, 0],
          positionStartX: 0,
          positionStartY: 0,
          positionStartZ: 0.8,
          rotation: [0, 0, 0],
          scale: 1.4,
          space: 1.1,
          sectionScale: 0.5
        },
        names: {
          position: [0, 0, 1.3],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.35,
          height: 0.01,
          maxLength: 12
        },
        join: {
          position: [3, 0, 0.45],
          rotation: [-Math.PI / 2, 0, 0],
          size: 0.3,
          height: 0.01
        },
        pregameRoll: {
          position: [3.4, 0, 0.5],
          rotation: [-Math.PI / 2, 0, 0],
          size: 0.35,
          height: 0.01
        }
      },
      team1: {
        scale: 1,
        position: [-11, 0, -1],
        title: {
          position: [0,0,0],
          rotation: [-Math.PI / 2, 0, 0],
          size: 0.4,
          height: 0.01
        },
        pieces: {
          position: [0.23, 0, 0.1],
          positionStartX: 0,
          positionStartY: 0,
          positionStartZ: 0.8,
          rotation: [0, 0, 0],
          scale: 1.2,
          space: 1.2,
          sectionScale: 0.5
        },
        names: {
          position: [0, 0, 1.3],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.35,
          height: 0.01,
          maxLength: 12
        },
        join: {
          position: [3.1, 0, 0.5],
          rotation: [-Math.PI / 2, 0, 0],
          size: 0.3,
          height: 0.01
        },
        pregameRoll: {
          position: [3.5, 0, 0.6],
          rotation: [-Math.PI / 2, 0, 0],
          size: 0.35,
          height: 0.01
        }
      },
      joinTeamModal: {
        position: [-3.4, 0, -2.5],
        rotation: [-Math.PI/2, 0, 0],
        scale: [1.5, 1.5, 1.5]
      },
      chat: {
        position: [-11.05,0,3.1],
        rotation: [-Math.PI/2, 0, 0],
        scale: [0.5, 0.5, 0.5],
        box: {
          borderRadius: '5px',
          height: '170px',
          width: '420px',
          padding: '10px',
          fontSize: '24px',
        },
        input: {
          height: '15px',
          fontSize: '20px',
          borderRadius: '5px',
          padding: '10px',
          border: 0,
        }
      },
      invite: {
        position: [-8.35, 0, 2.7],
        scale: 0.9,
        size: 0.3,
        height: 0.01,
        text: {
          content: `copy room link to share`,
          position: [-2.55, 0.025, 0.15]
        },
        copiedText: {
          position: [-2.55, 0.025, -0.5]
        },
        outerBox: {
          args: [5.4, 0.03, 0.6]
        },
        innerBox: {
          args: [5.3, 0.04, 0.5]
        }
      },
      discord: {
        position: [-8.5, 0, 2.7],
        size: 0.3,
        height: 0.01
      },
      disconnectModal: {
        position: [0, 3, 1],
        rotation: [0,0,0],
      },
      board: {
        lobby: {
          scale: 1,
          position: [0, 0, 0]
        },
        pregame: {
          scale: 0.2,
          position: [5.5, 0, -3.4]
        },
        game: {
          scale: 1,
          position: [0, 0, 0]
        },
        finished: {
          scale: 0.2,
          position: [5, 0, 1]
        }
      },
      whoGoesFirst: {
        title: {
          position: [-4.5, 0, -5],
          rotation: [-Math.PI/2,0,0],
          size: 0.7,
          height: 0.01
        },
        description: {
          position: [-4.5, 0, -4.3],
          rotation: [-Math.PI/2,0,0],
          size: 0.35,
          height: 0.01,
          lineHeight: 0.8
        }
      },
      settings: {
        position: [9, 0, -5.5],
        text: {
          position: [-0.9, 0.025, 0.15],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.3,
          height: 0.01,
        }
      },
      rulebookButton: {
        position: [9.3, 0, -4.8],
        scale: 1,
      },
      rulebook: {
        position: [-1.5, 9, 3],
        blocker: {
          args: [12, 0.1, 9]
        },
        closeButton: {
          position: [9,0,5.3],
          scale: 1
        }
      },
      piecesSection: {
        position: [7.8, 0, 0.5],
        emptyPieces: {
          positions: [
            [0.5, 0, -0.5],
            [1.8, 0, -0.5],
            [0.5, 0, 0.7],
            [1.8, 0, 0.7]
          ],
        },
        pieces: {
          rotation: [0, 0, 0],
          positions: [
            [0.5, 0, -0.5],
            [1.8, 0, -0.5],
            [0.5, 0, 0.7],
            [1.8, 0, 0.7]
          ],
          scale: 1.4
        }
      },
      moveList: {
        position: [8, 0, -2],
        rotation: [-Math.PI/2, 0, 0],
        tokenScale: 0.9,
        tokenPosition: [0.5, 0, 0.6]
      },
      currentPlayer: {
        position: [8.4, 0, -3],
        rotation: [0,0,0],
        text: {
          position: [0.7, 0.025, 0.15],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.35,
          height: 0.01
        }
      },
      practiceYootButton: {
        position: [9, 0, 3],
      },
      yootButton: {
        position: [9, 0, 4.2],
        rotation: [0, Math.PI/2, 0],
        scale: 1
      },
      throwCount: {
        position: [7.7, 0, 5.4],
        orientation: 'downUp'
      },
      scoreButtons: {
        text: 'touchdown',
        textSize: 0.4,
        lineHeight: 1,
        position: [4.5, 0, 4.5],
        rotation: [-Math.PI/2, 0, 0],
        scale: 1,
        buttons: {
          position: [0, 0, 0]
        }
      },
      mainAlert: {
        position: [0, 0.3, 6],
        rotation: [0, Math.PI/2, 0]
      },
      pregameAlert: {
        position: [-2, 0, -4.5],
        initialScale: 1.7,
        rocketsGoFirst: {
          position: [0.5, 2, 1],
          rotation: [0, Math.PI/2, 0],
        },
        ufosGoFirst: {
          position: [0.5, 2, 1],
          rotation: [0, Math.PI/2, 0],
        },
        tie: {
          position: [0.5, 3, 1],
          rotation: [0, Math.PI/2, 0],
        }
      },
      throwAlert: {
        position: [0,0,4.5],
        rotation: [0, Math.PI/2, 0],
        initialScale: 1
      },
      ufo: {
        selectedAdditionalScale: 0.3,
        selectedAnimatedScaleRange: 0.15
      },
      welcomeBackText: {
        position: [0, 1, 0],
        rotation: [-Math.PI/2,0,0]
      }
    },
    board: {
      startEarth: {
        position: [2.5, 0, 5.5],
        text: {
          position: [-0.9,0,0.4],
          rotation: [-Math.PI/2, 0, 0],
          fontSize: 15,
        },
        helperArrow: {
          position: [0.3, 0, -0.4],
          rotation: [Math.PI, -Math.PI/2 - Math.PI/8 - Math.PI/32, 0],
          color: 'limegreen',
          scale: [0.2, 0.1, 0.5]
        },
      },
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
};