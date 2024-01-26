import { useAtom } from "jotai";
import React from "react";
import { clientAtom, gamePhaseAtom, teamsAtom, turnAtom } from "./SocketManager";
import TextButton from "./components/TextButton";
import HomePieces from "./HomePieces";

export default function TeamDisplay({
  position,
  scale,
  joinPosition,
  handleJoinTeam,
  pieceRotation,
  team,
  piecePosition,
  pieceSpace,
  namesPosition,
}) {
  const [teams] = useAtom(teamsAtom);
  const [turn] = useAtom(turnAtom);
  const [gamePhase] = useAtom(gamePhaseAtom)
  const [client] = useAtom(clientAtom);

  return <group
    position={position}
    scale={scale}
  >
    {/* team name */}
    <TextButton
      text={ team == 0 ? "Rockets" : "UFOs" }
      boxWidth={1.2}
      boxHeight={0.3}
      color={ team == 0 ? "red" : "turquoise" }
    />
    {/* join button */}
    { client.team !== 0 && <TextButton
      text="JOIN"
      boxWidth={0.9}
      boxHeight={0.3}
      color="yellow"
      position={joinPosition}
      handlePointerClick={handleJoinTeam}
    /> }
    {/* pieces */}
    <HomePieces 
      pieceRotation={pieceRotation}
      team={team}
      scale={0.5} 
      position={piecePosition} 
      teams={teams} 
      space={pieceSpace}
    />
    {/* player ids */}
    {teams[team].players.map((value, index) => (
      <TextButton
        text={`${value.name}`}
        position={[
          namesPosition[0],
          namesPosition[1], 
          namesPosition[2] + 0.5 * (index)
        ]}
        color={
          turn.team == 0 
          && turn.players[turn.team] == index 
          && gamePhase !== "lobby"
          ? "white"
          : "yellow"
        }
        key={index}
      />
    ))}
  </group>
}