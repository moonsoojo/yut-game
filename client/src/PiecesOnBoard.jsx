import { useAtom } from 'jotai';
import React, { useEffect, useRef } from 'react';
import { animationPlayingAtom, clientAtom, deviceAtom, gamePhaseAtom, hasTurnAtom, mainAlertAtom, pieceAnimationPlayingAtom, pieceTeam0Id0Atom, pieceTeam0Id1Atom, pieceTeam0Id2Atom, pieceTeam0Id3Atom, pieceTeam1Id0Atom, pieceTeam1Id1Atom, pieceTeam1Id2Atom, pieceTeam1Id3Atom, selectionAtom, teamsAtom, turnAlertActiveAtom } from './GlobalState';
import tilePositions from './tilePositions';
import { useSpring, animated } from '@react-spring/three';
import Piece from './components/Piece';
import { roundNum, generateRandomNumberInRange, pieceSelected } from './helpers/helpers';
import Polaris from './meshes/Polaris';
import { Text3D } from '@react-three/drei';
import layout from './layout';
import Star from './meshes/Star';
import { useFrame } from '@react-three/fiber';

export default function PiecesOnBoard() {
    const [pieceTeam0Id0] = useAtom(pieceTeam0Id0Atom)
    const [pieceTeam0Id1] = useAtom(pieceTeam0Id1Atom)
    const [pieceTeam0Id2] = useAtom(pieceTeam0Id2Atom)
    const [pieceTeam0Id3] = useAtom(pieceTeam0Id3Atom)
    const [pieceTeam1Id0] = useAtom(pieceTeam1Id0Atom)
    const [pieceTeam1Id1] = useAtom(pieceTeam1Id1Atom)
    const [pieceTeam1Id2] = useAtom(pieceTeam1Id2Atom)
    const [pieceTeam1Id3] = useAtom(pieceTeam1Id3Atom)
    
    // const [_animationPlaying, setAnimationPlaying] = useAtom(animationPlayingAtom)
    const [_pieceAnimationPlaying, setPieceAnimationPlaying] = useAtom(pieceAnimationPlayingAtom)
    const [device] = useAtom(deviceAtom);
    const [gamePhase] = useAtom(gamePhaseAtom)
    const responsiveScale = layout[device].game.board.game.scale

    const [springs0_0, api0_0] = useSpring(() => ({        
        from: {
            position: [0,0,0], // Filler values
            scale: 0,
            sizeTwink: 0,
            welcomeTextScale: 0
        }
    }))
    const [springs0_1, api0_1] = useSpring(() => ({        
        from: {
            position: [0,0,0], 
            scale: 0,
            sizeTwink: 0,
            welcomeTextScale: 0
        }
    }))
    const [springs0_2, api0_2] = useSpring(() => ({        
        from: {
            position: [0,0,0], 
            scale: 0,
            sizeTwink: 0,
            welcomeTextScale: 0
        }
    }))
    const [springs0_3, api0_3] = useSpring(() => ({        
        from: {
            position: [0,0,0], 
            scale: 0,
            sizeTwink: 0,
            welcomeTextScale: 0
        }
    }))
    const [springs1_0, api1_0] = useSpring(() => ({        
        from: {
            position: [0,0,0], 
            scale: 0,
            sizeTwink: 0,
            welcomeTextScale: 0
        }
    }))
    const [springs1_1, api1_1] = useSpring(() => ({        
        from: {
            position: [0,0,0], 
            scale: 0,
            sizeTwink: 0,
            welcomeTextScale: 0
        }
    }))
    const [springs1_2, api1_2] = useSpring(() => ({        
        from: {
            position: [0,0,0],
            scale: 0,
            sizeTwink: 0,
            welcomeTextScale: 0
        }
    }))
    const [springs1_3, api1_3] = useSpring(() => ({        
        from: {
            position: [0,0,0], 
            scale: 0,
            sizeTwink: 0,
            welcomeTextScale: 0
        }
    }))

    const idOffsets = [
        [-0.3, 0, -0.25],
        [0.3, 0, -0.25],
        [-0.3, 0, 0.25],
        [0.3, 0, 0.25],
    ]

    const heightOffset = 0.9

    function startCheck(tile, lastPath) {
        const condition0 = (tile === 0 && lastPath[0] === 1)
        const condition1 = (tile <= 5 && lastPath[0] === 0)
        return (condition0 || condition1)
    }

    function caughtCheck(gamePhase, tile) {
        return gamePhase === 'game' && tile === -1
    }

    useEffect(() => {
        const path = pieceTeam0Id0.lastPath
        if (path.length > 0) {
            if (path[path.length-1] === 29) { // Score
                const pathToEarth = path.slice(0, path.length-1)
                const toAnimations = pathToEarth.map((value) => {
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[0][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[0][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[0][2], 1) * responsiveScale,
                        ],
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                const scoreAnimation = [
                    {
                        position: [
                            roundNum(0 + idOffsets[0][0]*2, 1) * responsiveScale,
                            roundNum(0 + heightOffset + idOffsets[0][1]*2, 1) * responsiveScale,
                            roundNum(4.5 + idOffsets[0][2]*2, 1) * responsiveScale,
                        ],
                        scale: 1.5,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    },
                    {
                        position: [
                            roundNum(0 + idOffsets[0][0]*1, 1) * responsiveScale,
                            roundNum(0 + heightOffset + idOffsets[0][1]*1, 1) * responsiveScale,
                            roundNum(5 + idOffsets[0][2]*1, 1) * responsiveScale,
                        ],
                        scale: 0,
                        config: {
                            tension: 170,
                            friction: 26
                        },
                        delay: 300
                    },
                ]
                let animations = toAnimations.concat(scoreAnimation)
                api0_0.start({
                    from: {
                        position: animations[0].position,
                        scale: responsiveScale,
                        welcomeTextScale: 0,
                    },
                    to: animations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            } else if (caughtCheck(gamePhase, pieceTeam0Id0.tile)) {
                api0_0.start({
                    from: {
                        scale: responsiveScale,
                    },
                    to: [
                        {
                            scale: 0
                        }
                    ],
                    loop: false,
                    // onStart: () => setPieceAnimationPlaying(true),
                    // onRest: () => setPieceAnimationPlaying(false),
                })
            } else if (startCheck(pieceTeam0Id0.tile, pieceTeam0Id0.lastPath)) {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[0][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[0][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[0][2], 1) * responsiveScale,
                        ],
                        scale: responsiveScale,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api0_0.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: 0,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            } else {
                // save last move's path in piece
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[0][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[0][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[0][2], 1) * responsiveScale,
                        ],
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api0_0.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: responsiveScale
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            }
        }
    }, [pieceTeam0Id0])

    useEffect(() => {
        const path = pieceTeam0Id1.lastPath
        if (path.length > 0) {    
            if (path[path.length-1] === 29) {
                const pathToEarth = path.slice(0, path.length-1)
                const toAnimations = pathToEarth.map((value) => {
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[1][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[1][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[1][2], 1) * responsiveScale,
                        ],
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                const scoreAnimation = [
                    {
                        position: [
                            roundNum(0 + idOffsets[1][0]*2, 1) * responsiveScale,
                            roundNum(0 + heightOffset + idOffsets[1][1]*2, 1) * responsiveScale,
                            roundNum(4 + idOffsets[1][2]*2, 1) * responsiveScale,
                        ],
                        scale: 1.5,
                        welcomeTextScale: 1,
                        config: {
                            tension: 130,
                            friction: 26
                        }
                    },
                    {
                        position: [
                            roundNum(0 + idOffsets[1][0]*1, 1) * responsiveScale,
                            roundNum(0 + heightOffset + idOffsets[1][1]*1, 1) * responsiveScale,
                            roundNum(4.5 + idOffsets[1][2]*1, 1) * responsiveScale,
                        ],
                        scale: 0,
                        welcomeTextScale: 0,
                        config: {
                            tension: 170,
                            friction: 26
                        },
                        delay: 1000
                    },
                    {
                        sizeTwink: 0.1,
                        config: {
                            tension: 5000,
                            friction: 100,
                            mass: 0.1
                        },
                        delay: generateRandomNumberInRange(150, 100)
                    },
                    {
                        sizeTwink: 0,
                        config: {
                            tension: 5000,
                            friction: 100,
                            mass: 0.1
                        },
                    },
                ]
                let animations = toAnimations.concat(scoreAnimation)
                api0_1.start({
                    from: {
                        position: animations[0].position,
                        scale: responsiveScale,
                        welcomeTextScale: 0,
                    },
                    to: animations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            } else if (caughtCheck(gamePhase, pieceTeam0Id1.tile)) {
                api0_1.start({
                    from: {
                        scale: responsiveScale,
                    },
                    to: [
                        {
                            scale: 0
                        }
                    ],
                    loop: false,
                    // onStart: () => setPieceAnimationPlaying(true),
                    // onRest: () => setPieceAnimationPlaying(false),
                })
            } else if (startCheck(pieceTeam0Id1.tile, pieceTeam0Id1.lastPath)) {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[1][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[1][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[1][2], 1) * responsiveScale,
                        ],
                        scale: responsiveScale,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api0_1.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: 0,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            } else {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[1][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[1][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[1][2], 1) * responsiveScale,
                        ],
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api0_1.start({
                    from: {
                        position: toAnimations[0].position,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            }
        }
    }, [pieceTeam0Id1])

    useEffect(() => {
        const path = pieceTeam0Id2.lastPath
        if (path.length > 0) {
            if (path[path.length-1] === 29) {
                const pathToEarth = path.slice(0, path.length-1)
                const toAnimations = pathToEarth.map((value) => {
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[2][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[2][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[2][2], 1) * responsiveScale,
                        ],
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                const scoreAnimation = [
                    {
                        position: [
                            roundNum(0 + idOffsets[2][0]*2, 1) * responsiveScale,
                            roundNum(0 + heightOffset + idOffsets[2][1]*2, 1) * responsiveScale,
                            roundNum(4 + idOffsets[2][2]*2, 1) * responsiveScale,
                        ],
                        scale: 1.5,
                        welcomeTextScale: 1,
                        config: {
                            tension: 130,
                            friction: 26
                        }
                    },
                    {
                      position: [
                          roundNum(0 + idOffsets[2][0]*1, 1) * responsiveScale,
                          roundNum(0 + heightOffset + idOffsets[2][1]*1, 1) * responsiveScale,
                          roundNum(4.5 + idOffsets[2][2]*1, 1) * responsiveScale,
                      ],
                        scale: 0,
                        welcomeTextScale: 0,
                        config: {
                            tension: 170,
                            friction: 26
                        },
                        delay: 1000
                    },
                    {
                        sizeTwink: 0.1,
                        config: {
                            tension: 5000,
                            friction: 100,
                            mass: 0.1
                        },
                        delay: generateRandomNumberInRange(150, 100)
                    },
                    {
                        sizeTwink: 0,
                        config: {
                            tension: 5000,
                            friction: 100,
                            mass: 0.1
                        },
                    },
                ]
                let animations = toAnimations.concat(scoreAnimation)
                api0_2.start({
                    from: {
                        position: animations[0].position,
                        scale: responsiveScale,
                        welcomeTextScale: 0,
                    },
                    to: animations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            } else if (caughtCheck(gamePhase, pieceTeam0Id2.tile)) {
                api0_2.start({
                    from: {
                        scale: responsiveScale,
                    },
                    to: [
                        {
                            scale: 0
                        }
                    ],
                    loop: false,
                    // onStart: () => setPieceAnimationPlaying(true),
                    // onRest: () => setPieceAnimationPlaying(false),
                })
            } else if (startCheck(pieceTeam0Id2.tile, pieceTeam0Id2.lastPath)) {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[2][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[2][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[2][2], 1) * responsiveScale,
                        ],
                        scale: responsiveScale,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api0_2.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: 0,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            } else {
                const toAnimations = path.map((value) => (
                    // on score, move to Earth and add an additional animation
                    {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[2][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[2][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[2][2], 1) * responsiveScale,
                        ],
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                ))
                api0_2.start({
                    from: {
                        position: toAnimations[0].position,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            }
        }
    }, [pieceTeam0Id2])

    useEffect(() => {        
        const path = pieceTeam0Id3.lastPath
        if (path.length > 0) {
            if (path[path.length-1] === 29) {
                const pathToEarth = path.slice(0, path.length-1)
                const toAnimations = pathToEarth.map((value) => {
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[3][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[3][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[3][2], 1) * responsiveScale,
                        ],
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                const scoreAnimation = [
                    {
                        position: [
                            roundNum(3.5 + idOffsets[3][0]*2, 1) * responsiveScale,
                            roundNum(0 + heightOffset + idOffsets[3][1]*2, 1) * responsiveScale,
                            roundNum(3.5 + idOffsets[3][2]*2, 1) * responsiveScale,
                        ],
                        scale: 1.5,
                        welcomeTextScale: 1,
                        config: {
                            tension: 130,
                            friction: 26
                        }
                    },
                    {
                      position: [
                          roundNum(3.5 + idOffsets[3][0]*1, 1) * responsiveScale,
                          roundNum(0 + heightOffset + idOffsets[3][1]*1, 1) * responsiveScale,
                          roundNum(3.5 + idOffsets[3][2]*1, 1) * responsiveScale,
                      ],
                        scale: 0,
                        welcomeTextScale: 0,
                        config: {
                            tension: 170,
                            friction: 26
                        },
                        delay: 1000
                    },
                    {
                        sizeTwink: 0.1,
                        config: {
                            tension: 5000,
                            friction: 100,
                            mass: 0.1
                        },
                        delay: generateRandomNumberInRange(150, 100)
                    },
                    {
                        sizeTwink: 0,
                        config: {
                            tension: 5000,
                            friction: 100,
                            mass: 0.1
                        },
                    },
                ]
                let animations = toAnimations.concat(scoreAnimation)
                api0_3.start({
                    from: {
                        position: animations[0].position,
                        scale: responsiveScale,
                        welcomeTextScale: 0,
                    },
                    to: animations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            } else if (caughtCheck(gamePhase, pieceTeam0Id3.tile)) {
                api0_3.start({
                    from: {
                        scale: responsiveScale,
                    },
                    to: [
                        {
                            scale: 0
                        }
                    ],
                    loop: false,
                    // onStart: () => setPieceAnimationPlaying(true),
                    // onRest: () => setPieceAnimationPlaying(false),
                })
            } else if (startCheck(pieceTeam0Id3.tile, pieceTeam0Id3.lastPath)) {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[3][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[3][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[3][2], 1) * responsiveScale,
                        ],
                        scale: responsiveScale,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api0_3.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: 0,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            } else {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[3][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[3][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[3][2], 1) * responsiveScale,
                        ],
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api0_3.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: responsiveScale,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            }
        }
    }, [pieceTeam0Id3])

    useEffect(() => {        
        const path = pieceTeam1Id0.lastPath        
        if (path.length > 0) {
            if (path[path.length-1] === 29) {
                const pathToEarth = path.slice(0, path.length-1)
                const toAnimations = pathToEarth.map((value) => {
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[0][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[0][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[0][2], 1) * responsiveScale,
                        ],
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                const scoreAnimation = [
                    {
                        position: [
                            roundNum(0 + idOffsets[0][0]*2, 1) * responsiveScale,
                            roundNum(0 + heightOffset + idOffsets[0][1]*2, 1) * responsiveScale,
                            roundNum(4 + idOffsets[0][2]*2, 1) * responsiveScale,
                        ],
                        scale: 1.5,
                        welcomeTextScale: 1,
                        config: {
                            tension: 130,
                            friction: 26
                        }
                    },
                    {
                      position: [
                          roundNum(0 + idOffsets[0][0]*1, 1) * responsiveScale,
                          roundNum(0 + heightOffset + idOffsets[0][1]*1, 1) * responsiveScale,
                          roundNum(4.5 + idOffsets[0][2]*1, 1) * responsiveScale,
                      ],
                        scale: 0,
                        welcomeTextScale: 0,
                        config: {
                            tension: 170,
                            friction: 26
                        },
                        delay: 1000
                    },
                    {
                        sizeTwink: 0.1,
                        config: {
                            tension: 5000,
                            friction: 100,
                            mass: 0.1
                        },
                        delay: generateRandomNumberInRange(150, 100)
                    },
                    {
                        sizeTwink: 0,
                        config: {
                            tension: 5000,
                            friction: 100,
                            mass: 0.1
                        },
                    },
                ]
                let animations = toAnimations.concat(scoreAnimation)
                api1_0.start({
                    from: {
                        position: animations[0].position,
                        scale: responsiveScale,
                        welcomeTextScale: 0,
                    },
                    to: animations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            } else if (caughtCheck(gamePhase, pieceTeam1Id0.tile)) {
                api1_0.start({
                    from: {
                        scale: responsiveScale,
                    },
                    to: [
                        {
                            scale: 0
                        }
                    ],
                    loop: false,
                    // onStart: () => setPieceAnimationPlaying(true),
                    // onRest: () => setPieceAnimationPlaying(false),
                })
            } else if (startCheck(pieceTeam1Id0.tile, pieceTeam1Id0.lastPath)) {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[0][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[0][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[0][2], 1) * responsiveScale,
                        ],
                        scale: responsiveScale,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api1_0.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: 0,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            } else {
                // save last move's path in piece
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[0][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[0][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[0][2], 1) * responsiveScale,
                        ],
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api1_0.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: responsiveScale,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            }
        }
    }, [pieceTeam1Id0])

    useEffect(() => {
        const path = pieceTeam1Id1.lastPath
        if (path.length > 0) {
            if (path[path.length-1] === 29) {
                const pathToEarth = path.slice(0, path.length-1)
                const toAnimations = pathToEarth.map((value) => {
                    return {
                        position: [
                            roundNum(tilePositions[value][0]  + idOffsets[1][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[1][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2]  + idOffsets[1][2], 1) * responsiveScale,
                        ],
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                const scoreAnimation = [
                    {
                        position: [
                            roundNum(0 + idOffsets[1][0]*2, 1) * responsiveScale,
                            roundNum(0 + heightOffset + idOffsets[1][1]*2, 1) * responsiveScale,
                            roundNum(4 + idOffsets[1][2]*2, 1) * responsiveScale,
                        ],
                        scale: 1.5,
                        welcomeTextScale: 1,
                        config: {
                            tension: 130,
                            friction: 26
                        }
                    },
                    {
                      position: [
                          roundNum(0 + idOffsets[1][0]*1, 1) * responsiveScale,
                          roundNum(0 + heightOffset + idOffsets[1][1]*1, 1) * responsiveScale,
                          roundNum(4.5 + idOffsets[1][2]*1, 1) * responsiveScale,
                      ],
                        scale: 0,
                        welcomeTextScale: 0,
                        config: {
                            tension: 170,
                            friction: 26
                        },
                        delay: 1000
                    },
                    {
                        sizeTwink: 0.1,
                        config: {
                            tension: 5000,
                            friction: 100,
                            mass: 0.1
                        },
                        delay: generateRandomNumberInRange(150, 100)
                    },
                    {
                        sizeTwink: 0,
                        config: {
                            tension: 5000,
                            friction: 100,
                            mass: 0.1
                        },
                    },
                ]
                let animations = toAnimations.concat(scoreAnimation)
                api1_1.start({
                    from: {
                        position: animations[0].position,
                        scale: responsiveScale,
                        welcomeTextScale: 0,
                    },
                    to: animations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            } else if (caughtCheck(gamePhase, pieceTeam1Id1.tile)) {
                api1_1.start({
                    from: {
                        scale: responsiveScale,
                    },
                    to: [
                        {
                            scale: 0
                        }
                    ],
                    loop: false,
                    // onStart: () => setPieceAnimationPlaying(true),
                    // onRest: () => setPieceAnimationPlaying(false),
                })
            } else if (startCheck(pieceTeam1Id1.tile, pieceTeam1Id1.lastPath)) {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[1][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[1][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[1][2], 1) * responsiveScale,
                        ],
                        scale: responsiveScale,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api1_1.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: 0,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            } else {
                // save last move's path in piece
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[1][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[1][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[1][2], 1) * responsiveScale,
                        ],
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api1_1.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: responsiveScale,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            }
        }
    }, [pieceTeam1Id1])

    useEffect(() => {
        const path = pieceTeam1Id2.lastPath
        if (path.length > 0) {
            if (path[path.length-1] === 29) {
                const pathToEarth = path.slice(0, path.length-1)
                const toAnimations = pathToEarth.map((value) => {
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[2][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[2][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[2][2], 1) * responsiveScale,
                        ],
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                const scoreAnimation = [
                    {
                        position: [
                            roundNum(0 + idOffsets[2][0]*2, 1) * responsiveScale,
                            roundNum(0 + heightOffset + idOffsets[2][1]*2, 1) * responsiveScale,
                            roundNum(4 + idOffsets[2][2]*2, 1) * responsiveScale,
                        ],
                        scale: 1.5,
                        welcomeTextScale: 1,
                        config: {
                            tension: 130,
                            friction: 26
                        }
                    },
                    {
                      position: [
                          roundNum(0 + idOffsets[2][0]*1, 1) * responsiveScale,
                          roundNum(0 + heightOffset + idOffsets[2][1]*1, 1) * responsiveScale,
                          roundNum(4.5 + idOffsets[2][2]*1, 1) * responsiveScale,
                      ],
                        scale: 0,
                        welcomeTextScale: 0,
                        config: {
                            tension: 170,
                            friction: 26
                        },
                        delay: 1000
                    },
                    {
                        sizeTwink: 0.1,
                        config: {
                            tension: 5000,
                            friction: 100,
                            mass: 0.1
                        },
                        delay: generateRandomNumberInRange(150, 100)
                    },
                    {
                        sizeTwink: 0,
                        config: {
                            tension: 5000,
                            friction: 100,
                            mass: 0.1
                        },
                    },
                ]
                let animations = toAnimations.concat(scoreAnimation)
                api1_2.start({
                    from: {
                        position: animations[0].position,
                        scale: responsiveScale,
                        welcomeTextScale: 0,
                    },
                    to: animations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            } else if (caughtCheck(gamePhase, pieceTeam1Id2.tile)) {
                api1_2.start({
                    from: {
                        scale: responsiveScale,
                    },
                    to: [
                        {
                            scale: 0
                        }
                    ],
                    loop: false,
                    // onStart: () => setPieceAnimationPlaying(true),
                    // onRest: () => setPieceAnimationPlaying(false),
                })
            } else if (startCheck(pieceTeam1Id2.tile, pieceTeam1Id2.lastPath)) {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[2][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[2][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[2][2], 1) * responsiveScale,
                        ],
                        scale: responsiveScale,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api1_2.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: 0,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            } else {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[2][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[2][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[2][2], 1) * responsiveScale,
                        ],
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api1_2.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: responsiveScale,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            }
        }
    }, [pieceTeam1Id2])

    useEffect(() => {
        const path = pieceTeam1Id3.lastPath
        if (path.length > 0) {
            if (path[path.length-1] === 29) {
                const pathToEarth = path.slice(0, path.length-1)
                const toAnimations = pathToEarth.map((value) => {
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[3][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[3][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[3][2], 1) * responsiveScale,
                        ],
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                const scoreAnimation = [
                    {
                        position: [
                            roundNum(0 + idOffsets[3][0]*2, 1) * responsiveScale,
                            roundNum(0 + heightOffset + idOffsets[3][1]*2, 1) * responsiveScale,
                            roundNum(4 + idOffsets[3][2]*2, 1) * responsiveScale,
                        ],
                        scale: 1.5,
                        welcomeTextScale: 1,
                        config: {
                            tension: 130,
                            friction: 26
                        }
                    },
                    {
                      position: [
                          roundNum(0 + idOffsets[3][0]*1, 1) * responsiveScale,
                          roundNum(0 + heightOffset + idOffsets[3][1]*1, 1) * responsiveScale,
                          roundNum(4.5 + idOffsets[3][2]*1, 1) * responsiveScale,
                      ],
                        scale: 0,
                        welcomeTextScale: 0,
                        config: {
                            tension: 170,
                            friction: 26
                        },
                        delay: 1000
                    },
                    {
                        sizeTwink: 0.1,
                        config: {
                            tension: 5000,
                            friction: 100,
                            mass: 0.1
                        },
                        delay: generateRandomNumberInRange(150, 100)
                    },
                    {
                        sizeTwink: 0,
                        config: {
                            tension: 5000,
                            friction: 100,
                            mass: 0.1
                        },
                    },
                ]
                let animations = toAnimations.concat(scoreAnimation)
                api1_3.start({
                    from: {
                        position: animations[0].position,
                        scale: responsiveScale,
                        welcomeTextScale: 0,
                    },
                    to: animations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            } else if (caughtCheck(gamePhase, pieceTeam1Id3.tile)) {
                api1_3.start({
                    from: {
                        scale: responsiveScale,
                    },
                    to: [
                        {
                            scale: 0
                        }
                    ],
                    loop: false,
                    // onStart: () => setPieceAnimationPlaying(true),
                    // onRest: () => setPieceAnimationPlaying(false),
                })
            } else if (startCheck(pieceTeam1Id3.tile, pieceTeam1Id3.lastPath)) {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[3][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[3][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[3][2], 1) * responsiveScale,
                        ],
                        scale: responsiveScale,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api1_3.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: 0,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            } else {
                const toAnimations13 = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[3][0], 1) * responsiveScale,
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[3][1], 1) * responsiveScale,
                            roundNum(tilePositions[value][2] + idOffsets[3][2], 1) * responsiveScale,
                        ],
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api1_3.start({
                    from: {
                        position: toAnimations13[0].position,
                        scale: responsiveScale,
                    },
                    to: toAnimations13,
                    loop: false,
                    onStart: () => setPieceAnimationPlaying(true),
                    onRest: () => setPieceAnimationPlaying(false),
                })
            }
        }
    }, [pieceTeam1Id3])

    function WelcomeBackText({ position, scale }) {
        const borderMesh0Ref = useRef();
        const borderMesh1Ref = useRef();
        const borderMesh2Ref = useRef();
        const borderMesh3Ref = useRef();
        const borderMesh4Ref = useRef();
        const borderMesh5Ref = useRef();
        const borderMesh6Ref = useRef();
        const borderMeshRefs = [
          borderMesh0Ref,
          borderMesh1Ref,
          borderMesh2Ref,
          borderMesh3Ref,
          borderMesh4Ref,
          borderMesh5Ref,
          borderMesh6Ref
        ]

        const height = 1.7
        const width = 2.5
        useFrame((state, delta) => {
          for (let i = 0; i < borderMeshRefs.length; i++) {      
            borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
            borderMeshRefs[i].current.position.y = 0.05
            borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
          }
        })

        return <animated.group
        position={position}
        scale={scale}>
            <mesh scale={[width, 1,height]}>
                <cylinderGeometry args={[1, 1, 0.01, 32]}/>
                <meshStandardMaterial color='black' transparent opacity={0.9}/>
            </mesh>
            <Text3D
                font="fonts/Luckiest Guy_Regular.json" 
                position={[-1.4, 0.1, -0.1]}
                rotation={[-Math.PI/2, 0, 0]}
                height={0.01}
                lineHeight={0.9} 
                size={0.46}
            >
                {`Welcome\n     Back!`}
                <meshStandardMaterial color='yellow'/>
            </Text3D>
            <group ref={borderMesh0Ref}>
                <Star scale={0.15} color='yellow' />
            </group>
            <group ref={borderMesh1Ref}>
                <Star scale={0.15} color='yellow' />
            </group>
            <group ref={borderMesh2Ref}>
                <Star scale={0.15} color='yellow'/>
            </group>
            <group ref={borderMesh3Ref}>
                <Star scale={0.15} color='yellow' />
            </group>
            <group ref={borderMesh4Ref}>
                <Star scale={0.15} color='yellow' />
            </group>
            <group ref={borderMesh5Ref}>
                <Star scale={0.15} color='yellow' />
            </group>
            <group ref={borderMesh6Ref}>
                <Star scale={0.15} color='yellow' />
            </group>
        </animated.group>
    }
    
    const [teams] = useAtom(teamsAtom)
    function hasValidMoveBoard(team) {
        const moves = teams[team].moves
        for (const move in moves) {
            if (parseInt(move) !== 0 && moves[move] > 0) {
                return true;
            }
        }
        return false;
    }

    const [selection] = useAtom(selectionAtom)
    const [hasTurn] = useAtom(hasTurnAtom)

    return <>
        <Piece 
            team={0} 
            id={0} 
            tile={pieceTeam0Id0.tile} 
            position={springs0_0.position} 
            scale={springs0_0.scale} 
            selectable={hasTurn && hasValidMoveBoard(0)}
            selected={pieceSelected(selection, 0, 0)}
            onBoard={true}
        />
        <Polaris                         
            position={[
                roundNum(0 + idOffsets[0][0], 1) * responsiveScale,
                roundNum(0 + heightOffset + idOffsets[0][1], 1) * responsiveScale,
                roundNum(4.5 + idOffsets[0][2], 1) * responsiveScale,
            ]}
            scale={springs0_0.sizeTwink}
        />
        <WelcomeBackText 
            position={layout[device].game.welcomeBackText.position} 
            rotation={layout[device].game.welcomeBackText.rotation} 
            scale={springs0_0.welcomeTextScale}
        />
        <Piece 
            team={0} 
            id={1} 
            tile={pieceTeam0Id1.tile} 
            position={springs0_1.position} 
            scale={springs0_1.scale} 
            selectable={(hasTurn && hasValidMoveBoard(0))}
            selected={pieceSelected(selection, 1, 0)}
            onBoard={true}
            animation='onBoard'
        />
        <Polaris                         
            position={[
                roundNum(0 + idOffsets[1][0], 1) * responsiveScale,
                roundNum(0 + heightOffset + idOffsets[1][1], 1) * responsiveScale,
                roundNum(4.5 + idOffsets[1][2], 1) * responsiveScale,
            ]}
            scale={springs0_1.sizeTwink}
        />
        <WelcomeBackText 
            position={layout[device].game.welcomeBackText.position} 
            rotation={layout[device].game.welcomeBackText.rotation} 
            scale={springs0_1.welcomeTextScale}
        />
        <Piece 
            team={0} 
            id={2} 
            tile={pieceTeam0Id2.tile} 
            position={springs0_2.position} 
            scale={springs0_2.scale} 
            selectable={hasTurn && hasValidMoveBoard(0)}
            selected={pieceSelected(selection, 2, 0)}
            onBoard={true}
            animation='onBoard'
        />
        <Polaris                         
            position={[
                roundNum(0 + idOffsets[2][0], 1) * responsiveScale,
                roundNum(0 + heightOffset + idOffsets[2][1], 1) * responsiveScale,
                roundNum(4.5 + idOffsets[2][2], 1) * responsiveScale,
            ]}
            scale={springs0_2.sizeTwink}
        />
        <WelcomeBackText 
            position={layout[device].game.welcomeBackText.position} 
            rotation={layout[device].game.welcomeBackText.rotation} 
            scale={springs0_2.welcomeTextScale}
        />
        <Piece 
            team={0} 
            id={3} 
            tile={pieceTeam0Id3.tile} 
            position={springs0_3.position} 
            scale={springs0_3.scale} 
            selectable={hasTurn && hasValidMoveBoard(0)}
            selected={pieceSelected(selection, 3, 0)}
            onBoard={true}
            animation='onBoard'
        />
        <Polaris                         
            position={[
                roundNum(0 + idOffsets[3][0], 1) * responsiveScale,
                roundNum(0 + heightOffset + idOffsets[3][1], 1) * responsiveScale,
                roundNum(4.5 + idOffsets[3][2], 1) * responsiveScale,
            ]}
            scale={springs0_3.sizeTwink}
        />
        <WelcomeBackText 
            position={layout[device].game.welcomeBackText.position} 
            rotation={layout[device].game.welcomeBackText.rotation} 
            scale={springs0_3.welcomeTextScale}
        />
        <Piece 
            team={1} 
            id={0} 
            tile={pieceTeam1Id0.tile} 
            position={springs1_0.position}
            scale={springs1_0.scale} 
            selectable={hasTurn && hasValidMoveBoard(1)}
            selected={pieceSelected(selection, 0, 1)}
            onBoard={true}
            animation='onBoard'
        />
        <Polaris                         
            position={[
                roundNum(0 + idOffsets[0][0], 1) * responsiveScale,
                roundNum(0 + heightOffset + idOffsets[0][1], 1) * responsiveScale,
                roundNum(4.5 + idOffsets[0][2], 1) * responsiveScale,
            ]}
            scale={springs1_0.sizeTwink}
        />
        <WelcomeBackText 
            position={layout[device].game.welcomeBackText.position} 
            rotation={layout[device].game.welcomeBackText.rotation} 
            scale={springs1_0.welcomeTextScale}
        />
        <Piece 
            team={1} 
            id={1} 
            tile={pieceTeam1Id1.tile} 
            position={springs1_1.position} 
            scale={springs1_1.scale} 
            selectable={hasTurn && hasValidMoveBoard(1)}
            selected={pieceSelected(selection, 1, 1)}
            onBoard={true}
            animation='onBoard'
        />
        <Polaris                         
            position={[
                roundNum(0 + idOffsets[1][0], 1) * responsiveScale,
                roundNum(0 + heightOffset + idOffsets[1][1], 1) * responsiveScale,
                roundNum(4.5 + idOffsets[1][2], 1) * responsiveScale,
            ]}
            scale={springs1_1.sizeTwink}
        />
        <WelcomeBackText 
            position={layout[device].game.welcomeBackText.position} 
            rotation={layout[device].game.welcomeBackText.rotation} 
            scale={springs1_1.welcomeTextScale}
        />
        <Piece 
            team={1} 
            id={2} 
            tile={pieceTeam1Id2.tile} 
            position={springs1_2.position} 
            scale={springs1_2.scale} 
            selectable={hasTurn && hasValidMoveBoard(1)}
            selected={pieceSelected(selection, 2, 1)}
            onBoard={true}
            animation='onBoard'
        />
        <Polaris                         
            position={[
                roundNum(0 + idOffsets[2][0], 1) * responsiveScale,
                roundNum(0 + heightOffset + idOffsets[2][1], 1) * responsiveScale,
                roundNum(4.5 + idOffsets[2][2], 1) * responsiveScale,
            ]}
            scale={springs1_2.sizeTwink}
        />
        <WelcomeBackText 
            position={layout[device].game.welcomeBackText.position} 
            rotation={layout[device].game.welcomeBackText.rotation} 
            scale={springs1_2.welcomeTextScale}/>
        <Piece 
            team={1} 
            id={3} 
            tile={pieceTeam1Id3.tile} 
            position={springs1_3.position} 
            scale={springs1_3.scale} 
            selectable={hasTurn && hasValidMoveBoard(1)}
            selected={pieceSelected(selection, 3, 1)}
            onBoard={true}
            animation='onBoard'
        />
        <Polaris                         
            position={[
                roundNum(0 + idOffsets[3][0], 1) * responsiveScale,
                roundNum(0 + heightOffset + idOffsets[3][1], 1) * responsiveScale,
                roundNum(4.5 + idOffsets[3][2], 1) * responsiveScale,
            ]}
            scale={springs1_3.sizeTwink}
        />
        <WelcomeBackText 
            position={layout[device].game.welcomeBackText.position} 
            rotation={layout[device].game.welcomeBackText.rotation} 
            scale={springs1_3.welcomeTextScale}
        />
    </>
}
