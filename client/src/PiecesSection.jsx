import React from 'react';
import { useAtom } from 'jotai';
import { clientAtom, teamsAtom } from './GlobalState';
import layout from './layout';
import Piece from './components/Piece';

export default function PiecesSection({ 
  position=[0,0,0], 
  rotation=[0,0,0], 
  scale=1,
  device
}) {
  const [client] = useAtom(clientAtom)
  const [teams] = useAtom(teamsAtom)

  const piecePositions = [
    [0.5, 0, -0.5],
    [1.5, 0, -0.5],
    [0.5, 0, 0.5],
    [1.5, 0, 0.5]
  ]

  function UnassignedPieces() {
    const emptyPieces = [0, 0, 0, 0]
    return <group>
      {emptyPieces.map((_value, index) =>
        (<mesh
          position={piecePositions[index]}
          key={index}
        >
          <sphereGeometry args={[0.3, 32, 16]} />
          <meshStandardMaterial color="#505050"/>
        </mesh>
      ))}
    </group>
  }

  function AssignedPieces() {  
    const team = client.team  

    // Need to accept "key" to use it in an map
    function EmptyPiece({ position }) {
      return <mesh
        position={position}
      >
        <sphereGeometry args={[0.2, 32, 16]} />
      </mesh>
    }

    function ScoredPiece({ position }) {
      return <mesh
        position={position}
      >
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial color={team == 0 ? "red" : "green"} />
      </mesh>
    }

    function hasValidMoveHome() {
      // if no pieces are on the board
      // -1 is a valid move
      // else
      // only 1-5 are valid moves
      // 0 is not a valid move
      let pieceOnBoard = false
      for (const piece of teams[team].pieces) {
        if (piece.status === 'onBoard') {
          pieceOnBoard = true
        }
      }
      // console.log(`[PiecesSection][hasValidMoveHome] pieceOnBoard`, pieceOnBoard)

      const moves = teams[team].moves
      if (!pieceOnBoard) {
        for (const move in moves) {
          // console.log(`[PiecesSection][hasValidMoveHome] move`, move)
          if (parseInt(move) !== 0 && moves[move] > 0) {
            return true;
          }
        }
        return false;
      } else {
        for (const move in moves) {
          // console.log(`[PiecesSection][hasValidMoveHome] move`, move)
          if (parseInt(move) !== 0 && parseInt(move) !== -1 && moves[move] > 0) {
            return true;
          }
        }
        return false;
      }
    }

    // pass down 'animate' flag to Piece, and pass it down to mesh (rocket or ufo)
    return (
      <group>
        {
          teams[team].pieces.map((value, index) =>
            value.status === "onBoard" ? <EmptyPiece 
              position={piecePositions[index]}
              key={index}
            /> : 
            value.status === "scored" ? <ScoredPiece
              position={piecePositions[index]}
              key={index}
            /> : <Piece
              position={piecePositions[index]}
              rotation={layout[device].homePieces[team].rotation}
              scale={1}
              tile={-1}
              team={team}
              id={value.id}
              key={index}
              animate={hasValidMoveHome()}
            />
          )
        }
      </group>
    )
  } 

  return <group
    position={position}
    rotation={rotation}
    scale={scale}
  >
    { client.team === -1 && <UnassignedPieces/> }
    { (client.team === 0 || client.team === 1) && <AssignedPieces/>}
  </group>
}