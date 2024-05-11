import { useAtom } from 'jotai';
import React, { useEffect, useMemo } from 'react';
import { pieceTeam0Id1Atom, pieceTeam0Id2Atom, teamsAtom } from './GlobalState';
import tilePositions from './tilePositions';
import { useSpring, animated } from '@react-spring/three';
import Piece from './components/Piece';

export default function PiecesOnBoard() {
    const [teams] = useAtom(teamsAtom)
    const [pieceTeam0Id1] = useAtom(pieceTeam0Id1Atom)
    const [pieceTeam0Id2] = useAtom(pieceTeam0Id2Atom)

    const [springs, api] = useSpring(() => {
        from: {
            posTeam0Id0: [0,0,0] // Filler values
            posTeam0Id1: [0,0,0] // Filler values
            posTeam0Id2: [0,0,0] // Filler values
            posTeam0Id3: [0,0,0] // Filler values
            posTeam1Id0: [0,0,0] // Filler values
            posTeam1Id1: [0,0,0] // Filler values
            posTeam1Id2: [0,0,0] // Filler values
            posTeam1Id3: [0,0,0] // Filler values
        }
    })

    useEffect(() => {
    }, [teams[0].pieces[0]])

    // state individual to each piece on board
    // memoize piece information and cache it between render
    useEffect(() => {
        console.log(`[PiecesOnBoard] piece team 0 id 1 updated to`, pieceTeam0Id1)
        // clear path on capture
        const path = pieceTeam0Id1.lastPath
        // save last move's path in piece
        const toAnimations = path.map((value) => {
            // on score, move to Earth and add an additional animation
            return {
                posTeam0Id1: [
                    tilePositions[value][0],
                    tilePositions[value][1] + 1,
                    tilePositions[value][2],
                ]
            }
        })
        api.start({
            from: toAnimations[0],
            to: toAnimations,
            loop: false
        })
    }, [pieceTeam0Id1])

    useEffect(() => {
        // clear path on capture
        const path = pieceTeam0Id2.lastPath
        // save last move's path in piece
        const toAnimations = path.map((value) => {
            // on score, move to Earth and add an additional animation
            return {
                posTeam0Id2: [
                    tilePositions[value][0],
                    tilePositions[value][1] + 1,
                    tilePositions[value][2],
                ]
            }
        })
        api.start({
            from: toAnimations[0],
            to: toAnimations,
            loop: false
        })
    }, [pieceTeam0Id2])

    useEffect(() => {

    }, [teams[0].pieces[3]])

    useEffect(() => {

    }, [teams[1].pieces[0]])

    useEffect(() => {

    }, [teams[1].pieces[1]])

    useEffect(() => {

    }, [teams[1].pieces[2]])

    useEffect(() => {

    }, [teams[1].pieces[3]])
    return <>
        { teams[0].pieces[0].tile !== -1 && <animated.group position={springs.posTeam0Id0}>
            <Piece team={0} id={0}/>
        </animated.group> }
        { teams[0].pieces[1].tile !== -1 && <animated.group position={springs.posTeam0Id1}>
            <Piece team={0} id={1}/>
        </animated.group> }
        { teams[0].pieces[2].tile !== -1 && <animated.group position={springs.posTeam0Id2}>
            <Piece team={0} id={2}/>
        </animated.group> }
        { teams[0].pieces[3].tile !== -1 && <animated.group position={springs.posTeam0Id3}>
            <Piece team={0} id={3}/>
        </animated.group> }
        { teams[1].pieces[0].tile !== -1 && <animated.group position={springs.posTeam1Id0}>
            <Piece team={1} id={0}/>
        </animated.group> }
        { teams[1].pieces[1].tile !== -1 && <animated.group position={springs.posTeam1Id1}>
            <Piece team={1} id={1}/>
        </animated.group> }
        { teams[1].pieces[2].tile !== -1 && <animated.group position={springs.posTeam1Id2}>
            <Piece team={1} id={2}/>
        </animated.group> }
        { teams[1].pieces[3].tile !== -1 && <animated.group position={springs.posTeam1Id3}>
            <Piece team={1} id={3}/>
        </animated.group> }
    </>
}