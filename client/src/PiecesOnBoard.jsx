import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { animationPlayingAtom, pieceTeam0Id0Atom, pieceTeam0Id1Atom, pieceTeam0Id2Atom, pieceTeam0Id3Atom, pieceTeam1Id0Atom, pieceTeam1Id1Atom, pieceTeam1Id2Atom, pieceTeam1Id3Atom, teamsAtom, turnAlertActiveAtom } from './GlobalState';
import tilePositions from './tilePositions';
import { useSpring, animated } from '@react-spring/three';
import Piece from './components/Piece';
import { roundNum, generateRandomNumberInRange } from './helpers/helpers';
import Polaris from './meshes/Polaris';
import { Text3D } from '@react-three/drei';
import { useParams } from 'wouter';

export default function PiecesOnBoard() {
    const [teams] = useAtom(teamsAtom)
    const [pieceTeam0Id0] = useAtom(pieceTeam0Id0Atom)
    const [pieceTeam0Id1] = useAtom(pieceTeam0Id1Atom)
    const [pieceTeam0Id2] = useAtom(pieceTeam0Id2Atom)
    const [pieceTeam0Id3] = useAtom(pieceTeam0Id3Atom)
    const [pieceTeam1Id0] = useAtom(pieceTeam1Id0Atom)
    const [pieceTeam1Id1] = useAtom(pieceTeam1Id1Atom)
    const [pieceTeam1Id2] = useAtom(pieceTeam1Id2Atom)
    const [pieceTeam1Id3] = useAtom(pieceTeam1Id3Atom)
    const [_turnAlertActive, setTurnAlertActive] = useAtom(turnAlertActiveAtom)
    const [_animationPlaying, setAnimationPlaying] = useAtom(animationPlayingAtom)

    const params = useParams()
    const [springs0_0, api0_0] = useSpring(() => ({        
        from: {
            position: [0,0,0], // Value before api start
            scale: 1,
            sizeTwink: 0,
            welcomeTextScale: 0
        }
    }))
    const [springs0_1, api0_1] = useSpring(() => ({        
        from: {
            position: [0,0,0], 
            scale: 1,
            sizeTwink: 0,
            welcomeTextScale: 0
        }
    }))
    const [springs0_2, api0_2] = useSpring(() => ({        
        from: {
            position: [0,0,0], 
            scale: 1,
            sizeTwink: 0,
            welcomeTextScale: 0
        }
    }))
    const [springs0_3, api0_3] = useSpring(() => ({        
        from: {
            position: [0,0,0], 
            scale: 1,
            sizeTwink: 0,
            welcomeTextScale: 0
        }
    }))
    const [springs1_0, api1_0] = useSpring(() => ({        
        from: {
            position: [0,0,0], 
            scale: 1,
            sizeTwink: 0,
            welcomeTextScale: 0
        }
    }))
    const [springs1_1, api1_1] = useSpring(() => ({        
        from: {
            position: [0,0,0], 
            scale: 1,
            sizeTwink: 0,
            welcomeTextScale: 0
        }
    }))
    const [springs1_2, api1_2] = useSpring(() => ({        
        from: {
            position: [0,0,0], // Filler values
            scale: 1,
            sizeTwink: 0,
            welcomeTextScale: 0
        }
    }))
    const [springs1_3, api1_3] = useSpring(() => ({        
        from: {
            position: [0,0,0], 
            scale: 1,
            sizeTwink: 0,
            welcomeTextScale: 0
        }
    }))

    const idOffsets = [
        [-0.3, 0, 0],
        [0.3, 0, 0],
        [-0.3, 0, 0.4],
        [0.3, 0, 0.4],
    ]

    const heightOffset = 0.9

    function handleAnimationStart() {
        setAnimationPlaying(true)
    }

    function handleAnimationEnd() {
        setAnimationPlaying(false)
    }

    useEffect(() => {
        // clear path on capture
        const path = pieceTeam0Id0.lastPath
        if (path.length > 0) {
            // if destination is scored
            // trigger another animation
            if (path[path.length-1] === 29) {
                api0_0.start({
                    from: {
                        position: [
                            roundNum(3.5 + idOffsets[0][0] * 2, 1),
                            roundNum(1 + heightOffset + idOffsets[0][1] * 2, 1),
                            roundNum(3.5 + idOffsets[0][2] * 2, 1),
                        ],
                        scale: 1,
                        welcomeTextScale: 0,
                    },
                    to: [
                        {
                            position: [
                                roundNum(3.5 + idOffsets[0][0] * 2, 1),
                                roundNum(1 + heightOffset + idOffsets[0][1] * 2, 1),
                                roundNum(3.5 + idOffsets[0][2] * 2, 1),
                            ],
                            scale: 1,
                            welcomeTextScale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            }
                        },
                        {
                            position: [
                                roundNum(3.5 + idOffsets[0][0]*2, 1),
                                roundNum(1 + heightOffset + idOffsets[0][1]*2, 1),
                                roundNum(3.5 + idOffsets[0][2]*2, 1),
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
                                3.5,
                                1,
                                3.5
                            ],
                            scale: 0,
                            welcomeTextScale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            },
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
                    ],
                    loop: false,
                    onStart: () => handleAnimationStart(false),
                    onRest: () => handleAnimationEnd(true),
                })
            } else {
                // save last move's path in piece
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[0][0], 1),
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[0][1], 1),
                            roundNum(tilePositions[value][2] + idOffsets[0][2], 1),
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
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => handleAnimationStart(false),
                    onRest: () => handleAnimationEnd(true),
                })
            }
        }
    }, [pieceTeam0Id0])

    useEffect(() => {
        const path = pieceTeam0Id1.lastPath
        if (path.length > 0) {    
            if (path[path.length-1] === 29) {
                api0_1.start({
                    from: {
                        position: [
                            roundNum(3.5 + idOffsets[1][0]*2, 1),
                            roundNum(1 + heightOffset + idOffsets[1][1]*2, 1),
                            roundNum(3.5 + idOffsets[1][2]*2, 1),
                        ],
                        scale: 1,
                        welcomeTextScale: 0,
                    },
                    to: [
                        {
                            position: [
                                roundNum(3.5 + idOffsets[1][0]*2, 1),
                                roundNum(1 + heightOffset + idOffsets[1][1]*2, 1),
                                roundNum(3.5 + idOffsets[1][2]*2, 1),
                            ],
                            scale: 1,
                            welcomeTextScale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            }
                        },
                        {
                            position: [
                                roundNum(3.5 + idOffsets[1][0]*2, 1),
                                roundNum(1 + heightOffset + idOffsets[1][1]*2, 1),
                                roundNum(3.5 + idOffsets[1][2]*2, 1),
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
                                3.5,
                                1,
                                3.5
                            ],
                            scale: 0,
                            welcomeTextScale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            },
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
                    ],
                    loop: false,
                    onStart: () => handleAnimationStart(false),
                    onRest: () => handleAnimationEnd(true),
                })
            } else {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[1][0], 1),
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[1][1], 1),
                            roundNum(tilePositions[value][2] + idOffsets[1][2], 1),
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
                    onStart: () => handleAnimationStart(false),
                    onRest: () => handleAnimationEnd(true),
                })
            }
        }
    }, [pieceTeam0Id1])

    useEffect(() => {
        // clear path on capture
        const path = pieceTeam0Id2.lastPath
        if (path.length > 0) {
            // save last move's path in piece
            if (path[path.length-1] === 29) {
                api0_2.start({
                    from: {
                        position: [
                            roundNum(3.5 + idOffsets[2][0]*2, 1),
                            roundNum(1 + heightOffset + idOffsets[2][1]*2, 1),
                            roundNum(3.5 + idOffsets[2][2]*2, 1),
                        ],
                        scale: 1,
                        welcomeTextScale: 0
                    },
                    to: [
                        {
                            position: [
                                roundNum(3.5 + idOffsets[2][0]*2, 1),
                                roundNum(1 + heightOffset + idOffsets[2][1]*2, 1),
                                roundNum(3.5 + idOffsets[2][2]*2, 1),
                            ],
                            scale: 1,
                            welcomeTextScale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            }
                        },
                        {
                            position: [
                                roundNum(3.5 + idOffsets[2][0]*2, 1),
                                roundNum(1 + heightOffset + idOffsets[2][1]*2, 1),
                                roundNum(3.5 + idOffsets[2][2]*2, 1),
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
                                3.5,
                                1,
                                3.5
                            ],
                            scale: 0,
                            welcomeTextScale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            },
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
                    ],
                    loop: false,
                    onStart: () => handleAnimationStart(false),
                    onRest: () => handleAnimationEnd(true),
                })
            } else {
                const toAnimations = path.map((value) => (
                    // on score, move to Earth and add an additional animation
                    {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[2][0], 1),
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[2][1], 1),
                            roundNum(tilePositions[value][2] + idOffsets[2][2], 1),
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
                    onStart: () => handleAnimationStart(false),
                    onRest: () => handleAnimationEnd(true),
                })
            }
        }
    }, [pieceTeam0Id2])

    useEffect(() => {        
        // clear path on capture
        const path = pieceTeam0Id3.lastPath
        if (path.length > 0) {
            // save last move's path in piece
            if (path[path.length-1] === 29) {
                api0_3.start({
                    from: {
                        position: [
                            roundNum(3.5 + idOffsets[3][0] * 2, 1),
                            roundNum(1 + heightOffset + idOffsets[3][1] * 2, 1),
                            roundNum(3.5 + idOffsets[3][2] * 2, 1),
                        ],
                        scale: 1,
                        welcomeTextScale: 0,
                    },
                    to: [
                        {
                            position: [
                                roundNum(3.5 + idOffsets[3][0] * 2, 1),
                                roundNum(1 + heightOffset + idOffsets[3][1] * 2, 1),
                                roundNum(3.5 + idOffsets[3][2] * 2, 1),
                            ],
                            scale: 1,
                            welcomeTextScale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            }
                        },
                        {
                            position: [
                                roundNum(3.5 + idOffsets[3][0] * 2, 1),
                                roundNum(1 + heightOffset + idOffsets[3][1] * 2, 1),
                                roundNum(3.5 + idOffsets[3][2] * 2, 1),
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
                                3.5,
                                1,
                                3.5
                            ],
                            scale: 0,
                            welcomeTextScale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            },
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
                    ],
                    loop: false,
                    onStart: () => handleAnimationStart(false),
                    onRest: () => handleAnimationEnd(true),
                })
            } else {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[3][0], 1),
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[3][1], 1),
                            roundNum(tilePositions[value][2] + idOffsets[3][2], 1),
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
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => handleAnimationStart(false),
                    onRest: () => handleAnimationEnd(true),
                })
            }
        }
    }, [pieceTeam0Id3])

    useEffect(() => {        
        // clear path on capture
        const path = pieceTeam1Id0.lastPath        
        if (path.length > 0) {
            // save last move's path in piece
            if (path[path.length-1] === 29) {
                api1_0.start({
                    from: {
                        position: [
                            roundNum(3.5 + idOffsets[0][0] * 2, 1),
                            roundNum(1 + heightOffset + idOffsets[0][1] * 2, 1),
                            roundNum(3.5 + idOffsets[0][2] * 2, 1),
                        ],
                        scale: 1,
                        welcomeTextScale: 0,
                    },
                    to: [
                        {
                            position: [
                                roundNum(3.5 + idOffsets[0][0] * 2, 1),
                                roundNum(1 + heightOffset + idOffsets[0][1] * 2, 1),
                                roundNum(3.5 + idOffsets[0][2] * 2, 1),
                            ],
                            scale: 1,
                            welcomeTextScale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            }
                        },
                        {
                            position: [
                                roundNum(3.5 + idOffsets[0][0] * 2, 1),
                                roundNum(1 + heightOffset + idOffsets[0][1] * 2, 1),
                                roundNum(3.5 + idOffsets[0][2] * 2, 1),
                            ],
                            scale: 1.5,
                            welcomeTextScale: 1,
                            config: {
                                tension: 130,
                                friction: 26,
                                mass: 2
                            }
                        },
                        {
                            position: [
                                3.5,
                                1,
                                3.5
                            ],
                            scale: 0,
                            welcomeTextScale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            },
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
                    ],
                    loop: false,
                    onStart: () => handleAnimationStart(false),
                    onRest: () => handleAnimationEnd(true),
                })
            } else {
                // save last move's path in piece
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[0][0], 1),
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[0][1], 1),
                            roundNum(tilePositions[value][2] + idOffsets[0][2], 1),
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
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => handleAnimationStart(false),
                    onRest: () => handleAnimationEnd(true),
                })
            }
        }
    }, [pieceTeam1Id0])

    useEffect(() => {
        // clear path on capture
        const path = pieceTeam1Id1.lastPath
        if (path.length > 0) {
            // save last move's path in piece
            if (path[path.length-1] === 29) {
                api1_1.start({
                    from: {
                        position: [
                            roundNum(3.5 + idOffsets[1][0] * 2, 1),
                            roundNum(1 + heightOffset + idOffsets[1][1] * 2, 1),
                            roundNum(3.5 + idOffsets[1][2] * 2, 1),
                        ],
                        scale: 1,
                        welcomeTextScale: 0,
                    },
                    to: [
                        {
                            position: [
                                roundNum(3.5 + idOffsets[1][0] * 2, 1),
                                roundNum(1 + heightOffset + idOffsets[1][1] * 2, 1),
                                roundNum(3.5 + idOffsets[1][2] * 2, 1),
                            ],
                            scale: 1,
                            welcomeTextScale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            }
                        },
                        {
                            position: [
                                roundNum(3.5 + idOffsets[1][0] * 2, 1),
                                roundNum(1 + heightOffset + idOffsets[1][1] * 2, 1),
                                roundNum(3.5 + idOffsets[1][2] * 2, 1),
                            ],
                            scale: 1.5,
                            welcomeTextScale: 1,
                            config: {
                                tension: 130,
                                friction: 26,
                                mass: 2
                            }
                        },
                        {
                            position: [
                                3.5,
                                1,
                                3.5
                            ],
                            scale: 0,
                            welcomeTextScale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            },
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
                    ],
                    loop: false,
                    onStart: () => handleAnimationStart(false),
                    onRest: () => handleAnimationEnd(true),
                })
            } else {
                // save last move's path in piece
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[1][0], 1),
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[1][1], 1),
                            roundNum(tilePositions[value][2] + idOffsets[1][2], 1),
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
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => handleAnimationStart(false),
                    onRest: () => handleAnimationEnd(true),
                })
            }
        }
    }, [pieceTeam1Id1])


    useEffect(() => {
        // clear path on capture
        const path = pieceTeam1Id2.lastPath
        if (path.length > 0) {
            if (path[path.length-1] === 29) {
                api1_2.start({
                    from: {
                        position: [
                            roundNum(3.5 + idOffsets[2][0] * 2, 1),
                            roundNum(1 + heightOffset + idOffsets[2][1] * 2, 1),
                            roundNum(3.5 + idOffsets[2][2] * 2, 1),
                        ],
                        scale: 1,
                        welcomeTextScale: 0,
                    },
                    to: [
                        {
                            position: [
                                roundNum(3.5 + idOffsets[2][0] * 2, 1),
                                roundNum(1 + heightOffset + idOffsets[2][1] * 2, 1),
                                roundNum(3.5 + idOffsets[2][2] * 2, 1),
                            ],
                            scale: 1,
                            welcomeTextScale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            }
                        },
                        {
                            position: [
                                roundNum(3.5 + idOffsets[2][0] * 2, 1),
                                roundNum(1 + heightOffset + idOffsets[2][1] * 2, 1),
                                roundNum(3.5 + idOffsets[2][2] * 2, 1),
                            ],
                            scale: 1.5,
                            welcomeTextScale: 1,
                            config: {
                                tension: 130,
                                friction: 26,
                                mass: 2
                            }
                        },
                        {
                            position: [
                                3.5,
                                1,
                                3.5
                            ],
                            scale: 0,
                            welcomeTextScale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            },
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
                    ],
                    loop: false,
                    onStart: () => handleAnimationStart(false),
                    onRest: () => handleAnimationEnd(true),
                })
            } else {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[2][0], 1),
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[2][1], 1),
                            roundNum(tilePositions[value][2] + idOffsets[2][2], 1),
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
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => handleAnimationStart(false),
                    onRest: () => handleAnimationEnd(true),
                })
            }
        }
    }, [pieceTeam1Id2])

    useEffect(() => {
        // clear path on capture
        const path = pieceTeam1Id3.lastPath
        if (path.length > 0) {
            // save last move's path in piece
            if (path[path.length-1] === 29) {
                api1_3.start({
                    from: {
                        position: [
                            roundNum(3.5 + idOffsets[3][0] * 2, 1),
                            roundNum(1 + heightOffset + idOffsets[3][1] * 2, 1),
                            roundNum(3.5 + idOffsets[3][2] * 2, 1),
                        ],
                        scale: 1,
                        welcomeTextScale: 0,
                    },
                    to: [
                        {
                            position: [
                                roundNum(3.5 + idOffsets[3][0] * 2, 1),
                                roundNum(1 + heightOffset + idOffsets[3][1] * 2, 1),
                                roundNum(3.5 + idOffsets[3][2] * 2, 1),
                            ],
                            scale: 1,
                            welcomeTextScale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            }
                        },
                        {
                            position: [
                                roundNum(3.5 + idOffsets[3][0] * 2, 1),
                                roundNum(1 + heightOffset + idOffsets[3][1] * 2, 1),
                                roundNum(3.5 + idOffsets[3][2] * 2, 1),
                            ],
                            scale: 1.5,
                            welcomeTextScale: 1,
                            config: {
                                tension: 130,
                                friction: 26,
                                mass: 2
                            }
                        },
                        {
                            position: [
                                3.5,
                                1,
                                3.5
                            ],
                            scale: 0,
                            welcomeTextScale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            },
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
                    ],
                    loop: false,
                    onStart: () => handleAnimationStart(false),
                    onRest: () => handleAnimationEnd(true),
                })
            } else {
                const toAnimations13 = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: [
                            roundNum(tilePositions[value][0] + idOffsets[3][0], 1),
                            roundNum(tilePositions[value][1] + heightOffset + idOffsets[3][1], 1),
                            roundNum(tilePositions[value][2] + idOffsets[3][2], 1),
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
                    },
                    to: toAnimations13,
                    loop: false,
                    onStart: () => handleAnimationStart(false),
                    onRest: () => handleAnimationEnd(true),
                })
            }
        }
    }, [pieceTeam1Id3])

    function onBoardCheck(tile) {
        if (tile === -1) {
            return false
        } else {
            return true
        }
    }

    function WelcomeBackText({ position, rotation, scale }) {
        return <animated.group
        position={position}
        rotation={rotation}
        scale={scale}>
            <Text3D
            font="/fonts/Luckiest Guy_Regular.json" 
            height={0.01} 
            size={0.4}>
                {`Welcome\nBack!`}
            <meshStandardMaterial color='yellow'/>
            </Text3D>
        </animated.group>
    }

    return <>
        { onBoardCheck(teams[0].pieces[0].tile) && <Piece team={0} id={0} tile={teams[0].pieces[0].tile} position={springs0_0.position} scale={springs0_0.scale} animation='onBoard'/> }
        <Polaris                         
            position={[
                3.5,
                1,
                3.5,
            ]}
            scale={springs0_0.sizeTwink}
        />
        <WelcomeBackText position={[4.8, 0, 4]} rotation={[-Math.PI/2,0,0]} scale={springs0_0.welcomeTextScale}/>
        { onBoardCheck(teams[0].pieces[1].tile) && <Piece team={0} id={1} tile={teams[0].pieces[1].tile} position={springs0_1.position} scale={springs0_1.scale} animation='onBoard'/> }
        <Polaris                         
            position={[
                3.5,
                1,
                3.5,
            ]}
            scale={springs0_1.sizeTwink}
        />
        <WelcomeBackText position={[4.8, 0, 4]} rotation={[-Math.PI/2,0,0]} scale={springs0_1.welcomeTextScale}/>

        { onBoardCheck(teams[0].pieces[2].tile) && <Piece team={0} id={2} tile={teams[0].pieces[2].tile} position={springs0_2.position} scale={springs0_2.scale} animation='onBoard'/> }
        <Polaris                         
            position={[
                3.5,
                1,
                3.5,
            ]}
            scale={springs0_2.sizeTwink}
        />
        <WelcomeBackText position={[4.8, 0, 4]} rotation={[-Math.PI/2,0,0]} scale={springs0_2.welcomeTextScale}/>

        { onBoardCheck(teams[0].pieces[3].tile) && <Piece team={0} id={3} tile={teams[0].pieces[3].tile} position={springs0_3.position} scale={springs0_3.scale} animation='onBoard'/> }
        <Polaris                         
            position={[
                3.5,
                1,
                3.5,
            ]}
            scale={springs0_3.sizeTwink}
        />
        <WelcomeBackText position={[4.8, 0, 4]} rotation={[-Math.PI/2,0,0]} scale={springs0_3.welcomeTextScale}/>
        { onBoardCheck(teams[1].pieces[0].tile) && <Piece team={1} id={0} tile={teams[1].pieces[0].tile} position={springs1_0.position} scale={springs1_0.scale} animation='onBoard'/> }
        <Polaris                         
            position={[
                roundNum(3.5),
                roundNum(1),
                roundNum(3.5),
            ]}
            scale={springs1_0.sizeTwink}
        />
        <WelcomeBackText position={[4.8, 0, 4]} rotation={[-Math.PI/2,0,0]} scale={springs1_0.welcomeTextScale}/>
        { onBoardCheck(teams[1].pieces[1].tile) && <Piece team={1} id={1} tile={teams[1].pieces[1].tile} position={springs1_1.position} scale={springs1_1.scale} animation='onBoard'/> }
        <Polaris                         
            position={[
                roundNum(3.5 + idOffsets[1][0], 1),
                roundNum(1 + heightOffset + idOffsets[1][1], 1),
                roundNum(3.5 + idOffsets[1][2], 1),
            ]}
            scale={springs1_1.sizeTwink}
        />
        <WelcomeBackText position={[4.8, 0, 4]} rotation={[-Math.PI/2,0,0]} scale={springs1_1.welcomeTextScale}/>

        { onBoardCheck(teams[1].pieces[2].tile) && <Piece team={1} id={2} tile={teams[1].pieces[2].tile} position={springs1_2.position} scale={springs1_2.scale} animation='onBoard'/> }
        <Polaris                         
            position={[
                roundNum(3.5 + idOffsets[2][0], 1),
                roundNum(1 + heightOffset + idOffsets[2][1], 1),
                roundNum(3.5 + idOffsets[2][2], 1),
            ]}
            scale={springs1_2.sizeTwink}
        />
        <WelcomeBackText position={[4.8, 0, 4]} rotation={[-Math.PI/2,0,0]} scale={springs1_2.welcomeTextScale}/>

        { onBoardCheck(teams[1].pieces[3].tile) && <Piece team={1} id={3} tile={teams[1].pieces[3].tile} position={springs1_3.position} scale={springs1_3.scale} animation='onBoard'/> }
        <Polaris                         
            position={[
                roundNum(3.5 + idOffsets[3][0], 1),
                roundNum(1 + heightOffset + idOffsets[3][1], 1),
                roundNum(3.5 + idOffsets[3][2], 1),
            ]}
            scale={springs1_3.sizeTwink}
        />
        <WelcomeBackText position={[4.8, 0, 4]} rotation={[-Math.PI/2,0,0]} scale={springs1_3.welcomeTextScale}/>

    </>
}