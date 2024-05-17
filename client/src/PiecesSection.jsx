import React from 'react';
import { useAtom } from 'jotai';
import { clientAtom, selectionAtom, teamsAtom } from './GlobalState';
import layout from './layout';
import Piece from './components/Piece';
import { pieceStatus } from './helpers/helpers';

export default function PiecesSection({ 
  position=[0,0,0], 
  rotation=[0,0,0], 
  scale=1,
  device
}) {
  const [client] = useAtom(clientAtom)
  const [teams] = useAtom(teamsAtom)
  const [selection] = useAtom(selectionAtom)

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
        if (pieceStatus(piece.tile) === 'onBoard') {
          pieceOnBoard = true
        }
      }

      const moves = teams[team].moves
      if (!pieceOnBoard) {
        for (const move in moves) {
          if (parseInt(move) !== 0 && moves[move] > 0) {
            return true;
          }
        }
        return false;
      } else {
        for (const move in moves) {
          if (parseInt(move) !== 0 && parseInt(move) !== -1 && moves[move] > 0) {
            return true;
          }
        }
        return false;
      }
    }

    function pieceSelected(pieceId) {
      return selection && 
      selection.pieces[0].tile === -1 && 
      selection.pieces[0].team === team &&
      selection.pieces[0].id === pieceId
    }

    return (
      <group>
        {
          teams[team].pieces.map((value, index) =>
            pieceStatus(value.tile) === "onBoard" ? <EmptyPiece 
              position={piecePositions[index]}
              key={index}
            /> : 
            pieceStatus(value.tile) === "scored" ? <ScoredPiece
              position={piecePositions[index]}
              key={index}
            /> : <Piece
              position={layout[device].piecesSection.pieces.positions[index]}
              rotation={layout[device].piecesSection.pieces.rotation}
              scale={layout[device].piecesSection.pieces.scale}
              tile={-1}
              team={team}
              id={value.id}
              key={index}
              // on selection, no other piece should be in 'selectable' animation
              animation={(selection === null && hasValidMoveHome()) ? 'selectable' : null}
              selected={pieceSelected(value.id)}
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