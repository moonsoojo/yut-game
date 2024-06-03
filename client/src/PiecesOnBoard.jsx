import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { pieceTeam0Id0Atom, pieceTeam0Id1Atom, pieceTeam0Id2Atom, pieceTeam0Id3Atom, pieceTeam1Id0Atom, pieceTeam1Id1Atom, pieceTeam1Id2Atom, pieceTeam1Id3Atom, teamsAtom } from './GlobalState';
import tilePositions from './tilePositions';
import { useSpring } from '@react-spring/three';
import Piece from './components/Piece';

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

    const [springs0_0, api0_0] = useSpring(() => ({        
        from: {
            position: [0,0,0] // Filler values
        }
    }))
    const [springs0_1, api0_1] = useSpring(() => ({        
        from: {
            position: [0,0,0] // Filler values
        }
    }))
    const [springs0_2, api0_2] = useSpring(() => ({        
        from: {
            position: [0,0,0] // Filler values
        }
    }))
    const [springs0_3, api0_3] = useSpring(() => ({        
        from: {
            position: [0,0,0] // Filler values
        }
    }))
    const [springs1_0, api1_0] = useSpring(() => ({        
        from: {
            position: [0,0,0] // Filler values
        }
    }))
    const [springs1_1, api1_1] = useSpring(() => ({        
        from: {
            position: [0,0,0] // Filler values
        }
    }))
    const [springs1_2, api1_2] = useSpring(() => ({        
        from: {
            position: [0,0,0] // Filler values
        }
    }))
    const [springs1_3, api1_3] = useSpring(() => ({        
        from: {
            position: [0,0,0] // Filler values
        }
    }))

    const idOffsets = [
        [-0.3, 0, 0],
        [0.3, 0, 0],
        [-0.3, 0, 0.4],
        [0.3, 0, 0.4],
    ]

    const heightOffset = 0.9

    useEffect(() => {
        // clear path on capture
        const path = pieceTeam0Id0.lastPath
        if (path.length > 0) {
            // save last move's path in piece
            const toAnimations = path.map((value) => {
                // on score, move to Earth and add an additional animation
                return {
                    position: [
                        tilePositions[value][0] + idOffsets[0][0],
                        tilePositions[value][1] + heightOffset + idOffsets[0][1],
                        tilePositions[value][2] + idOffsets[0][2],
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
                loop: false
            })
        }
    }, [pieceTeam0Id0])

    useEffect(() => {
        // clear path on capture
        const path = pieceTeam0Id1.lastPath
        if (path.length > 0) {
            // save last move's path in piece
            const toAnimations = path.map((value) => {
                // on score, move to Earth and add an additional animation
                return {
                    position: [
                        tilePositions[value][0] + idOffsets[1][0],
                        tilePositions[value][1] + heightOffset + idOffsets[1][1],
                        tilePositions[value][2] + idOffsets[1][2],
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
                loop: false
            })
        }
    }, [pieceTeam0Id1])

    useEffect(() => {
        // clear path on capture
        const path = pieceTeam0Id2.lastPath
        if (path.length > 0) {
            // save last move's path in piece
            const toAnimations = path.map((value) => {
                // on score, move to Earth and add an additional animation
                return {
                    position: [
                        tilePositions[value][0] + idOffsets[2][0],
                        tilePositions[value][1] + heightOffset + idOffsets[2][1],
                        tilePositions[value][2] + idOffsets[2][2],
                    ],
                    config: {
                        tension: 170,
                        friction: 26
                    }
                }
            })
            api0_2.start({
                from: {
                    position: toAnimations[0].position,
                },
                to: toAnimations,
                loop: false
            })
        }
    }, [pieceTeam0Id2])

    useEffect(() => {        
        // clear path on capture
        const path = pieceTeam0Id3.lastPath
        console.log(`[PiecesOnBoard] path`, path)
        if (path.length > 0) {
            // save last move's path in piece
            const toAnimations = path.map((value) => {
                // on score, move to Earth and add an additional animation
                return {
                    position: [
                        tilePositions[value][0] + idOffsets[3][0],
                        tilePositions[value][1] + heightOffset + idOffsets[3][1],
                        tilePositions[value][2] + idOffsets[3][2],
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
                loop: false
            })
        }
    }, [pieceTeam0Id3])

    useEffect(() => {        
        // clear path on capture
        const path = pieceTeam1Id0.lastPath
        if (path.length > 0) {
            // save last move's path in piece
            const toAnimations = path.map((value) => {
                // on score, move to Earth and add an additional animation
                return {
                    position: [
                        tilePositions[value][0] + idOffsets[0][0],
                        tilePositions[value][1] + heightOffset + idOffsets[0][1],
                        tilePositions[value][2] + idOffsets[0][2],
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
                loop: false
            })
        }
    }, [pieceTeam1Id0])

    useEffect(() => {
        // clear path on capture
        const path = pieceTeam1Id1.lastPath
        if (path.length > 0) {
            // save last move's path in piece
            const toAnimations = path.map((value) => {
                // on score, move to Earth and add an additional animation
                return {
                    position: [
                        tilePositions[value][0] + idOffsets[1][0],
                        tilePositions[value][1] + heightOffset + idOffsets[1][1],
                        tilePositions[value][2] + idOffsets[1][2],
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
                loop: false
            })
        }
    }, [pieceTeam1Id1])

    useEffect(() => {
        // clear path on capture
        const path = pieceTeam1Id2.lastPath
        if (path.length > 0) {
            // save last move's path in piece
            const toAnimations = path.map((value) => {
                // on score, move to Earth and add an additional animation
                return {
                    position: [
                        tilePositions[value][0] + idOffsets[2][0],
                        tilePositions[value][1] + heightOffset + idOffsets[2][1],
                        tilePositions[value][2] + idOffsets[2][2],
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
                loop: false
            })
        }
    }, [pieceTeam1Id2])

    useEffect(() => {
        // clear path on capture
        const path = pieceTeam1Id3.lastPath
        if (path.length > 0) {
            // save last move's path in piece
            const toAnimations = path.map((value) => {
                // on score, move to Earth and add an additional animation
                return {
                    position: [
                        tilePositions[value][0] + idOffsets[3][0],
                        tilePositions[value][1] + heightOffset + idOffsets[3][1],
                        tilePositions[value][2] + idOffsets[3][2],
                    ],
                    config: {
                        tension: 170,
                        friction: 26
                    }
                }
            })
            api1_3.start({
                from: {
                    position: toAnimations[0].position,
                },
                to: toAnimations,
                loop: false
            })
        }
    }, [pieceTeam1Id3])

    return <>
        { teams[0].pieces[0].tile !== -1 && <Piece team={0} id={0} position={springs0_0.position} animation='onBoard'/> }
        { teams[0].pieces[1].tile !== -1 && <Piece team={0} id={1} position={springs0_1.position} animation='onBoard'/> }
        { teams[0].pieces[2].tile !== -1 && <Piece team={0} id={2} position={springs0_2.position} animation='onBoard'/> }
        { teams[0].pieces[3].tile !== -1 && <Piece team={0} id={3} position={springs0_3.position} animation='onBoard'/> }
        { teams[1].pieces[0].tile !== -1 && <Piece team={1} id={0} position={springs1_0.position} animation='onBoard'/> }
        { teams[1].pieces[1].tile !== -1 && <Piece team={1} id={1} position={springs1_1.position} animation='onBoard'/> }
        { teams[1].pieces[2].tile !== -1 && <Piece team={1} id={2} position={springs1_2.position} animation='onBoard'/> }
        { teams[1].pieces[3].tile !== -1 && <Piece team={1} id={3} position={springs1_3.position} animation='onBoard'/> }
    </>
}