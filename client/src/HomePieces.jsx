import React from 'react';
import Piece from './components/Piece';

export default function HomePieces({pieceRotation, team, scale=1, position, teams, space}) {
  let POSITION_START_X = 0
  let POSITION_START_Y = 0
  let POSITION_START_Z = 0.5

  function Placeholder({key}) {
    return <mesh
      position={[
        POSITION_START_X + index * space,
        POSITION_START_Y,
        POSITION_START_Z,
      ]}
      key={key}
    >
      <sphereGeometry args={[0.2]} />
    </mesh>
  }

  function Scored({team, key}) {
    return <mesh
      position={[
        POSITION_START_X + index * space,
        POSITION_START_Y,
        POSITION_START_Z,
      ]}
      key={key}
    >
      <sphereGeometry args={[0.2]} />
      <meshStandardMaterial color={team == 0 ? "red" : "green"} />
    </mesh>
  }

  return (
    <group scale={scale} position={position}>
      {teams[team].pieces.map((value, index) =>
        value == null ? (
          <Placeholder key={index}/>
        ) : value === "scored" ? (
          <Scored key={index}/>
        ) : (
          <Piece
            position={[
              POSITION_START_X + index * space,
              POSITION_START_Y,
              POSITION_START_Z,
            ]}
            rotation={pieceRotation}
            keyName={`count${index}`}
            tile={-1}
            team={team}
            id={value.id}
            key={index}
            scale={1}
          />
        )
      )}
    </group>
  );
}