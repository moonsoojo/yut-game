import React from 'react';
import HtmlElement from './HtmlElement';
import { useAtom } from 'jotai';
import { displayMovesAtom } from './GlobalState';
// import moveToText from './moveToText';

export default function MoveList({ position, rotation, fontSize, width }) {
    const [moves] = useAtom(displayMovesAtom)
    let prettifiedMoves = ""
    for (let move in moves) {
      for (let i = 0; i < moves[move]; i++) {
        if (prettifiedMoves === "") {
          prettifiedMoves = move
        } else {
          prettifiedMoves += `, ${move}`
        }
      }
    }

    return <HtmlElement
      text={'MOVES: ' + prettifiedMoves}
      position={position}
      rotation={rotation}
      fontSize={fontSize}        
      width={width}
      whiteSpace="nowrap"
      textOverflow='ellipsis'
      overflow='hidden'
    />
}