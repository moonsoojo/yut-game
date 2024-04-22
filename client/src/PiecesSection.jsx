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
    function EmptyPiece({ position, key }) {
      return <mesh
        position={position}
      >
        <sphereGeometry args={[0.2, 32, 16]} />
      </mesh>
    }

    function ScoredPiece({ position, key }) {
      return <mesh
        position={position}
        key={key}
      >
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial color={team == 0 ? "red" : "green"} />
      </mesh>
    }

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