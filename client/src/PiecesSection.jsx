import { useAtom } from "jotai";
import React from "react";
import { gamePhaseAtom, legalTilesAtom, teamsAtom, turnAtom } from "./SocketManager";
import TextButton from "./components/TextButton";
import { prettifyMoves } from "./helpers/helpers";
import Piece from "./components/Piece";

export default function PiecesSection({
  sectionPosition,
  sectionScale,
  moveTextPosition,
  moveTextListPosition,
  team
}) {
  const [gamePhase] = useAtom(gamePhaseAtom)
  const [legalTiles] = useAtom(legalTilesAtom)
  const [teams] = useAtom(teamsAtom)
  const [turn] = useAtom(turnAtom)

  const POSITIONS = [
    [0.5, 0, 0],
    [1.5, 0, 0],
    [0.5, 0, 1],
    [1.5, 0, 1]
  ]

  function Placeholder({position, key}) {
    return <mesh
      position={position}
      key={key}
    >
      <sphereGeometry args={[0.2]} />
    </mesh>
  }
  function Scored({position, team, key}) {
    return <mesh
      position={position}
      key={key}
    >
      <sphereGeometry args={[0.2]} />
      <meshStandardMaterial color={team == 0 ? "red" : "green"} />
    </mesh>
  }
  function PregameMoves({moveTextPosition, moveTextListPosition}) {
    const moveTextListPositionOpposite = [
      moveTextListPosition[0] + 0.5,
      moveTextListPosition[1],
      moveTextListPosition[2],
    ]
    return <group>
      <TextButton
        text={`Moves:`}
        position={moveTextPosition}
      />
      <TextButton
        text={`${prettifyMoves(teams[0].moves)}`}
        position={moveTextListPosition}
        color="red"
      />
      <TextButton
        text={`${prettifyMoves(teams[1].moves)}`}
        position={moveTextListPositionOpposite}
        color="green"
      />
    </group>
  }
  function GameMoves({moveTextPosition, moveTextListPosition}) {
    return <group>
      <TextButton
        text={`Moves: `}
        position={moveTextPosition}
      />
      <TextButton
        text={`${prettifyMoves(teams[turn.team].moves)}`}
        position={moveTextListPosition}
      />
    </group>
  }
  function EmptyPieces({sectionPosition, sectionScale}) {
    return <group 
      position={sectionPosition} 
      scale={sectionScale}
    >
      {[0,0,0,0].map((_value, index) =>
        (<mesh
          position={POSITIONS[index]}
          key={index}
        >
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#505050"/>
        </mesh>))}
    </group>
  }

  if (team !== undefined) {
    return (
      <group position={sectionPosition} scale={sectionScale}>
        { (gamePhase === "game" && 29 in legalTiles) ?
          <ScoreButton
            position={[0,0,0]}
            device={device}
          /> :
          teams[team].pieces.map((value, index) =>
            value == null ? (
              <Placeholder position={POSITIONS[index]} key={index}/>
            ) : value === "scored" ? (
              <Scored position={POSITIONS[index]} key={index}/>
            ) : (
              <Piece
                position={POSITIONS[index]}
                rotation={[0,0,0]}
                keyName={`count${index}`}
                tile={-1}
                team={team}
                id={value.id}
                key={index}
                scale={1}
              />
            )
          )
        }
        {/* moves */}
        {gamePhase === "pregame" && <PregameMoves
          moveTextPosition={moveTextPosition}
          moveTextListPosition={moveTextListPosition}
        />}
        {gamePhase === 'game' &&  <GameMoves
          moveTextPosition={moveTextPosition}
          moveTextListPosition={moveTextListPosition}
        />}
      </group>
    )
  } else {
    return <EmptyPieces 
      sectionPosition={sectionPosition} 
      scale={sectionScale}
    />
  }
}