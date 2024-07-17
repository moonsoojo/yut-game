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
        position: [-2.1,0,-6.3],
        rotation: [-Math.PI/4,0,Math.PI/64],
        fontSize: 20,
        scale: 1.7
      },
      yoots: {
        position: [1.1, 0, -5],
        rotation: [Math.PI/4,Math.PI/2,0],
        scale: 0.14
      },
      tiles: {
        position: [0, 0, -2.1],
        rotation: [0, -Math.PI/16, 0],
        scale: 0.4
      },
      about: {
        show: false,
        position: [0, 0, 0.5],
        rotation: [0,0,0],
        scale: 0.6
      },
      howToPlay: {
        position: [0, 0, 0.9],
        rotation: [0,0,0],
        scale: 0.6
      },
      letsPlay: {
        position: [0, 0, 1.3],
        rotation: [0,0,0],
        scale: 0.6
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
          position: [-1.5, 0, -2]
        },
        moveText: {
          text: "MOVE: 3-STEPS",
          position: [-3.2, 0.7, -1.2]
        },
        yoot: {
          initialPos: [
            [-2 + 0, 1, 1],
            [-2 + 0.8, 1, 1],
            [-2 + 1.6, 1, 1],
            [-2 + 2.4, 1, 1]
          ],
          initialThrowPos: [
            { x: -1, y: 0.5, z: -1.5},
            { x: -1 + 0.4, y: 0.5, z: -1.5},
            { x: -1 + 0.8, y: 0.5, z: -1.5},
            { x: -1 + 1.2, y: 0.5, z: -1.5}
          ]
        },
        yootButtonModel: {
          position: [3, 0, 1],
          rotation: [Math.PI/16, Math.PI/2, Math.PI/32, "ZXY"]
        },
        cursor: {
          position: [4, 0.3, 2.4],
          rotation: [0, 0, 0],
          scale: [3, 3, 0.1]
        },
      },
      page1: {
        text: {
          position: [-4,0,-5.5],
          rotation: [-Math.PI/4, 0, 0],
          size: 0.55
        },
        firstCornerTiles: {
          position: [-2, 0, -2.5]
        },
        homePieces: {
          position: [-2, 0, -3]
        },
        moveDisplay: {
          position: [-3.3, 0, 0.7]
        },
        cursorPos0: [1, 0.3, 0],
        cursorPos1: [-0.5, 0.3, -1.4],
        cursorPos2: [2.3, 1.3, 2],
        rocket3Pos0: [0.8,-0.5,0.7],
        rocket3Pos1: [
          -Math.cos(((0+5) * (Math.PI * 2)) / 20) * 5,
          1.5,
          Math.sin(((0+5) * (Math.PI * 2)) / 20) * 5,
        ],
        rocket3Pos2: [
          -Math.cos(((1+5) * (Math.PI * 2)) / 20) * 5,
          0.9,
          Math.sin(((1+5) * (Math.PI * 2)) / 20) * 5,
        ],
        rocket3Pos3: [
          -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5,
          0.9,
          Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5,
        ],
        rocket3Pos4: [
          -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5,
          0.9,
          Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5,
        ],
      },
      page2: {
        text: {
          position: [1,0,0.5],
          rotation: [-Math.PI/4, 0, 0],
          size: 0.4,
          lineHeight: 1,
          height: 0.01
        },
        tilesPos0: [0,0,-1.5],
        tilesPos1: [-2, 0, -7],
        tilesScale0: 1,
        tilesScale1: 2,
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
          rotation: [-Math.PI/8, 0, 0],
          position: [0.5,0,2.2],
          fontSize: 22
        },
        scoreText: {
          rotation: [-Math.PI/8, 0, 0],
          position: [0.5, 0, 3],
          size: 0.4
        },
        letsGoText: {
          position: [0.8,0,2.2],
          rotation: [-Math.PI/8, 0, 0],
          fontSize: 22
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
          position: [-5,0,-5.5],
          rotation: [-Math.PI/4, 0, 0],
          size: 0.5,
          height: 0.01,
          lineHeight: 0.9
        },
        firstCornerTilesPos: [
          [-1.5,0,-2],
          [-0.8, 0, -2]
        ],
        cursorPos: [
          [0, 0.3, -1],
          [-1,2,3.5],
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5-1.5,
            2,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5-1.8,
          ],
          [5,2,2.5],
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
          position: [0.1,2.5,-1]
        },
        bonusTurn: {
          position: [-2.7, 0, 0]
        },
        yootButtonModel: {
          position: [0.7, 0, -0.5]
        },
        moveText: {
          position: [-3,0,0]
        }
      },
      page4: {
        text: {
          position: [-5.5,0,-5],
          rotation: [-Math.PI/4, 0, 0],
          size: 0.5,
          height: 0.01,
          lineHeight: 0.9
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
        },
        firstCornerTiles: {
          position: [-1, 0, -1.5]
        },
        moveText0: {
          position: [-4, 0, -0.5],
          rotation: [-Math.PI/4,0,0],
          size: 0.5,
          height: 0.01,
          lineHeight: 0.9
        },
        moveText1: {
          position: [-4, 0, -0.4],
          rotation: [-Math.PI/4,0,0],
          size: 0.5,
          height: 0.01,
          lineHeight: 0.9
        }
      },
      page5: {
        text: {
          position: [-4.5,0,-6],
          rotation: [-Math.PI/4, 0, 0],
          size: 0.5,
          height: 0.01,
          lineHeight: 0.9,
          scales: [1, 0] 
        },
        tilesPos: [
          [0,0,0.8],
          [-3, 0, -2]
        ],
        tilesScale: [
          0.6,
          0.9
        ],
        scoreText: {
          position: [0.7, 2, 3.5],
          rotation: [-Math.PI/4, 0, 0]
        },
        moveText: {
          position: [2,-2,-2],
          rotation: [-Math.PI/4, 0, 0],
          scale: [0, 1]
        },
        noteText: {
          position: [2,0,1],
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
            4,
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
            [4, 0, 4],
            [-1.9, 0, 3]
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
        }
      },
      page6: {
        text: {
          position: [-6,0,-6.9],
          rotation: [-Math.PI/4, 0, 0],
          size: 0.55,
          height: 0.01,
        },
        do: {
          position: [-4.7, 0, -2.7],
          scale: 0.8,
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
        ge: {
          position: [-0.6, 0, -2.7],
          scale: 0.8,
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
          position: [3.1, 0, -2.7],
          scale: 0.8,
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
          scale: 0.8,
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
          scale: 0.8,
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
          scale: 0.8,
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
      pagination: {
        pageRadius: 0.3,
        arrowRadius: 0.4,
        position: [0, 0, 0.2],
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
      position: [-2.1, 0, -4.3],
      rotation: [-Math.PI/4,0,0],
      scale: 0.28,
      mainDescription: {
        size: 0.6,
        line0Position: [0,-0.5,0],
        line1Position: [0,-1.3,0]
      },
      board: {
        position: [5.5, -6, 0],
        rotation: [Math.PI/2, 0, 0],
        scale: 0.6,
        text: {
          position: [-1,-4,-1],
          size: 0.6
        }
      },
      pieces: {
        position: [-1,-12,-1],
        size: 0.6,
        rockets: {
          position: [4, -12, 0]
        },
        ufos: {
          position: [7.5, -12, 0]
        }
      },
      yoot: {
        position: [13, -7, -2],
        text: {
          position: [10,-4,-1],
          size: 0.6
        }
      },
      playersText: {
        position: [11,-11.5,-1],
        size: 0.6
      },
      ageText: {
        position: [10,-11,-1],
        size: 0.6
      }
    },
    game: {
      letsPlayButton: {
        position: [0.6,0,7.7],
        rotation: [-Math.PI / 2, 0, 0],
        disabledButton: {
          position: [-0.5,0,0.5],
          scale: 1.8,
          text: {
            position: [-0.55, 0.025, -0.12],
            rotation: [-Math.PI/2, 0, 0],
            size: 0.3,
            height: 0.01,
            lineHeight: 0.9
          }
        },
        activeButton: {
          backdropWidth: 1.4,
          backdropHeight: 1.1,
          scale: 1.1,
          position: [-0.5, 0, 0.5],
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
        position: [-2.6, 0, -1.7],
        rotation: [-Math.PI/2, 0, 0],
        scale: [1.3, 1.3, 1.3]
      },
      chat: {
        position: [-4.7,0,6.7],
        rotation: [-Math.PI/2, 0, 0],
        scale: [0.5, 0.5, 0.5],
        box: {
          borderRadius: '5px',
          height: '140px',
          width: '220px',
          padding: '10px',
          fontSize: '20px',
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
        position: [-3.92, 0, 5.5],
        scale: 0.9,
        size: 0.3,
        height: 0.01
      },
      discord: {
        position: [-3.75, 0, 6.2],
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
        position: [4.3, 0, -4.5],
        scale: 0.9,
        text: {
          position: [-0.9, 0.025, 0.15],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.3,
          height: 0.01,
        }
      },
      rulebookButton: {
        position: [4.6, 0, -3.9],
        scale: 0.9,
        text: {
          position: [-0.57, 0.025, 0.15],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.3,
          height: 0.01,
        }
      },
      piecesSection: {
        position: [2.5, 0, 7.8],
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
            [1.5, 0, -1],
            [0, 0, 0.5],
            [1.5, 0, 0.5]
          ],
          scale: 1.5
        }
      },
      moveList: {
        position: [2, 0, 5],
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
        position: [0, 0, 7.5],
        rotation: [0, Math.PI/2, 0],
        scale: 1.15
      },
      throwCount: {
        position: [1.5, 0, 9],
        orientation: 'downUp'
      },
      scoreButtons: {
        position: [1.9, 0, 4.9],
        rotation: [-Math.PI/2, 0, 0],
        scale: 0.8
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
        position: [4.5, 0, 3.5],
        text: {
          position: [0,0,0],
          rotation: [-Math.PI/2, 0, 0],
          fontSize: 15,
        },
        helperArrow: {
          position: [0.3,0,-0.5],
          rotation: [0,Math.PI/4 + Math.PI/32 * 7,Math.PI/2],
          color: 'limegreen',
          scale: [0.9,0.9,0.9]
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
      position: [-21,0,-9],
      rotation: [-Math.PI/4, Math.PI/8, 0],
      text: {
        position: [0,0,0],
        rotation: [0,0,0],
        fontSize: 20,
        scale: 3.6,
      },
      tiles: {
        position: [0, 0, -4],
        scale: 1
      },
      about: {
        show: true,
        position: [1.5,-6,0],
        rotation: [Math.PI/2,0,0],
        scale: 2
      },
      howToPlay: {
        position: [2.8,-7.5,0],
        rotation: [Math.PI/2,0,0],
        scale: 2
      },      
      letsPlay: {
        position: [3,-9,0],
        rotation: [Math.PI/2,0,0],
        scale: 2
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
      position: [-5, -4, -13],
      rotation: [-Math.PI/4,0,Math.PI/32],
      scale: 1,
      mainDescription: {
        size: 0.6,
        line0Position: [0,-0.5,0],
        line1Position: [0,-1.3,0]
      },
      board: {
        position: [5.5, -6, 0],
        rotation: [Math.PI/2, 0, 0],
        scale: 0.6,
        text: {
          position: [-1,-4,-1],
          size: 0.6
        }
      },
      pieces: {
        position: [-1,-12,-1],
        size: 0.6,
        rockets: {
          position: [4, -12, 0]
        },
        ufos: {
          position: [7.5, -12, 0]
        }
      },
      yoot: {
        position: [13, -7, -2],
        text: {
          position: [10,-4,-1],
          size: 0.6
        }
      },
      playersText: {
        position: [11,-11,-1],
        size: 0.6
      },
      ageText: {
        position: [10,-11,-1],
        size: 0.6
      }
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
          text: "MOVE: 3-STEPS",
          position: [-5, 0.7, 0]
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
        },
        yootButtonModel: {
          position: [3, 0, 1],
          rotation: [Math.PI/16, Math.PI/2, Math.PI/32, "ZXY"]
        },
        cursor: {
          position: [4, 0.3, 2.4],
          rotation: [0, 0, 0],
          scale: [3, 3, 0.1]
        }
      },
      page1: {
        text: {
          position: [-2.5,0,-4],
          rotation: [-Math.PI/4, 0, 0],
          size: 0.5
        },
        firstCornerTiles: {
          position: [-1, 0, -1.5]
        },
        homePieces: {
          position: [-1, 0, -2]
        },
        moveDisplay: {
          position: [-2.3, 0, 1.7]
        },
        cursorPos0: [1, 0.3, 1],
        cursorPos1: [0.4, 0.3, -0.5],
        cursorPos2: [3.2, 1.3, 2.3],
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
      page2: {
        text: {
          position: [1.5,0,1.5],
          rotation: [-Math.PI/4, 0, 0],
          size: 0.4,
          lineHeight: 1,
          height: 0.01
        },
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
          [0.3, 0.2, 3.5],
          [1, 0.2, 4.2]
        ],
        moveText: {
          position: [-0.5,0,2],
          rotation: [-Math.PI/8, -Math.PI/16, 0],
          fontSize: 26
        },
        scoreText: {
          position: [-0.5, 0, 3.1],
          rotation: [-Math.PI/8, -Math.PI/16, 0],
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
            y: 0,
            z: -3,
          },
          positionRange: {
            x: 1,
            y: 0,
            z: 1
          }
        }
      },
      page3: {
        text: {
          position: [-4.5,0,-5.5],
          rotation: [-Math.PI/4, 0, 0],
          size: 0.5,
          height: 0.01,
          lineHeight: 0.9
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
          position: [-3, 0, 1]
        }
      },
      page4: {
        text: {
          position: [-4,0,-4.5],
          rotation: [-Math.PI/4, 0, 0],
          size: 0.5,
          height: 0.01,
          lineHeight: 0.9
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
        },
        firstCornerTiles: {
          position: [-1, 0, 0]
        },
        moveText0: {
          position: [-3, 0, 0.5],
          rotation: [-Math.PI/4,0,0],
          size: 0.5,
          height: 0.01,
          lineHeight: 0.9
        },
        moveText1: {
          position: [-3, 0, 1],
          rotation: [-Math.PI/4,0,0],
          size: 0.5,
          height: 0.01,
          lineHeight: 0.9
        }
      },
      page5: {
        text: {
          position: [-4,0,-6],
          rotation: [-Math.PI/4, 0, 0],
          size: 0.5,
          height: 0.01,
          lineHeight: 0.9,
          scales: [1, 0] 
        },
        tilesPos: [
          [0,0,1.5],
          [-3, 0, -1.5]
        ],
        tilesScale: [
          0.7,
          1
        ],
        scoreText: {
          position: [-1, 2, 4],
          rotation: [-Math.PI/4, 0, 0]
        },
        moveText: {
          position: [1.5, -2, 3],
          rotation: [-Math.PI/4, 0, 0],
          scale: [0, 0.8]
        },
        noteText: {
          position: [2,0,2],
          rotation: [-Math.PI/4, 0, 0]
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
            [-1.9, 0, 4]
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
        }
      },
      page6: {
        text: {
          position: [-5.5,0,-6],
          rotation: [-Math.PI/4, 0, 0],
          size: 0.5,
          height: 0.01,
        },
        do: {
          position: [-4.7, 0, -1.7],
          scale: 0.8,
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
        ge: {
          position: [-0.6, 0, -1.7],
          scale: 0.8,
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
          position: [3.1, 0, -1.7],
          scale: 0.8,
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
          position: [-4.7, 0, 4],
          scale: 0.8,
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
          position: [-0.6, 0, 4],
          scale: 0.8,
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
          position: [3.5, 0, 4],
          scale: 0.8,
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
          scale: 1.48,
          text: {
            position: [-0.6, 0.025, -0.12],
            rotation: [-Math.PI/2, 0, 0],
            size: 0.3,
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
        position: [-2.5, 0, -1.5],
        rotation: [-Math.PI/2, 0, 0],
        scale: [1, 1, 1]
      },
      chat: {
        position: [-11,0,3.5],
        rotation: [-Math.PI/2, 0, 0],
        scale: [0.5, 0.5, 0.5],
        box: {
          borderRadius: '5px',
          height: '130px',
          width: '380px',
          padding: '10px',
          fontSize: '20px',
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
        position: [-10.25, 0, 3.1],
        size: 0.3,
        height: 0.01
      },
      discord: {
        position: [-8.5, 0, 3.1],
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
        position: [9.33, 0, -4.8],
        text: {
          position: [-0.58, 0.025, 0.15],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.3,
          height: 0.01,
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
        position: [4.5, 0, 4.5],
        rotation: [-Math.PI/2, 0, 0],
        scale: 1
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
        position: [5.2, 0, 2.6],
        text: {
          position: [0,0,0],
          rotation: [-Math.PI/2, 0, 0],
          fontSize: 15,
        },
        helperArrow: {
          position: [0.3,0,-0.5],
          rotation: [0,Math.PI/4 + Math.PI/32 * 7,Math.PI/2],
          color: 'limegreen',
          scale: [0.9,0.9,0.9]
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