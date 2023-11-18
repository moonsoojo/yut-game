export default {
  mobile: {
    camera: {
      zoom: 40,
      position: [0, 16, 20],
      lookAt: [0, 0, 8]
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
      position: [0,0,11],
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
    team0Banner: {
      position: [-4, 0, 6],
      rotation: [-Math.PI / 2, 0, 0, "XZY"],
    },
    team1Banner: {
      position: [0, 0, 6],
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
    tileShift: [0, 0, 6.5],
    teamBannerShift: [0, 0, 6.5],
    actionButtonShift: [0, 0, 6]
  },
  desktop: {
    camera: {
      zoom: 100,
      position: [-8, 7, 5],
      lookAt: [-8, 0, 0]
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
    // mobile: above
    // desktop: right side
    // center them in index.js
    tileShift: [-8, 0, 0],
    teamBannerShift: [-8, 0, 0],
    actionButtonShift: [-8, 0, 0]
  },
};
