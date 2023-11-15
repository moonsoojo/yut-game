export default {
  mobile: {
    camera: {
      zoom: 40,
      position: [0, 7, 5],
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
        positionStartX: 5,
        positionStartY: 0,
        positionStartZ: -3,
        space: 0.8,
        rotation: [0, 0, Math.PI / 4],
      },
      1: {
        positionStartX: 6.5,
        positionStartY: 0,
        positionStartZ: -3,
        space: 0.8,
        rotation: [0, 0, 0],
      }
    },
    startBanner: {
      position: [3, 0, -3.5],
      rotation: [0, Math.PI / 2, Math.PI / 2, "XZY"],
    },
    startGameBanner: {
      position: [-6, 0, -2],
      rotation: [0, Math.PI / 2, Math.PI / 2, "XZY"],
    },
    scoreButton: {
      position: [3, -2, -3.5],
      rotation: [0, Math.PI / 2, Math.PI / 2, "XZY"],
    },
    resetButton: {
      position: [3, -4, -3.5],
      rotation: [0, Math.PI / 2, Math.PI / 2, "XZY"],
    },
    throwButton: {
      position: [3, -6, -3.5],
      rotation: [0, Math.PI / 2, Math.PI / 2, "XZY"],
    },
    throwButtonOrder: {
      position: [3, -7, -3.5],
      rotation: [0, Math.PI / 2, Math.PI / 2, "XZY"],
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
      position: [5, 0, 4],
      rotation: [0, Math.PI / 2, Math.PI / 2, "XZY"],
    },
    team1Banner: {
      position: [5, 0, 2],
      rotation: [0, Math.PI / 2, Math.PI / 2, "XZY"],
    },
    joinTeam0Banner:  {
      position: [5.5, 0, 4],
      rotation: [0, Math.PI / 2, Math.PI / 2, "XZY"],
    },
    joinTeam1Banner:  {
      position: [5.5, 0, 2],
      rotation: [0, Math.PI / 2, Math.PI / 2, "XZY"],
    },
  },
  desktop: {
    camera: {
      zoom: 100,
      position: [0, 7, 5],
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
        // rotation: [0, -Math.PI/2, Math.PI/4, "YZX"],
        rotation: [0, 0, 0,],
      },
      1: {
        positionStartX: -8,
        positionStartY: 0,
        positionStartZ: 6,
        space: 0.8,
        // rotation: [0, -Math.PI/2, 0, "ZYX"],
        rotation: [0, 0, 0,],
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
      position: [-11, 0, 3],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    team1Banner: {
      position: [-8, 0, 3],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    joinTeam0Banner:  {
      position: [5.5, 0, 4],
      rotation: [0, Math.PI / 2, Math.PI / 2, "XZY"],
    },
    joinTeam1Banner:  {
      position: [5.5, 0, 2],
      rotation: [0, Math.PI / 2, Math.PI / 2, "XZY"],
    },
  },
};
