import React from 'react';
import layout from './layout';
import { useAtom } from 'jotai';
import { joinTeamAtom, clientAtom, teamsAtom, gamePhaseAtom } from './GlobalState';
import { Html, Text3D } from '@react-three/drei';
import Piece from './components/Piece';
import { formatName, pieceStatus } from './helpers/helpers';
import { Color, MeshStandardMaterial } from 'three';

export default function Team({ position=[0,0,0], scale=1, team, device }) {
  const [teams] = useAtom(teamsAtom)
  const [gamePhase] = useAtom(gamePhaseAtom);

  function JoinTeamButton() {
    const [client] = useAtom(clientAtom);
    const [joinTeam, setJoinTeam] = useAtom(joinTeamAtom);
    const yellowMaterial = new MeshStandardMaterial({ color: new Color('yellow')});

    function handlePointerEnter(e) {
      e.stopPropagation();
      yellowMaterial.color = new Color('green')
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      yellowMaterial.color = new Color('yellow')
    }

    function handlePointerDown(e) {
      e.stopPropagation();
      setJoinTeam(team);
    }

    return client.team !== team && joinTeam !== team && <group
      position={layout[device].game[`team${team}`].join.position}
    >
      <mesh
        material={yellowMaterial}
      >
        <boxGeometry args={[1.15, 0.03, 0.55]}/>
      </mesh>
      <mesh>
        <boxGeometry args={[1.1, 0.04, 0.5]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
      >
        <boxGeometry args={[1.2, 0.1, 0.6]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-0.45, 0.025, 0.15]}
        rotation={layout[device].game[`team${team}`].join.rotation}
        size={layout[device].game[`team${team}`].join.size}
        height={layout[device].game[`team${team}`].join.height}
        material={yellowMaterial}
      >
        JOIN
      </Text3D>
    </group>
  }

  // Need to accept "key" to use it in an map
  function EmptyPiece({ position }) {
    return <mesh position={position}>
      <sphereGeometry args={[0.2, 32, 16]} />
    </mesh>
  }

  function ScoredPiece({ position }) {
    return <mesh position={position}>
      <sphereGeometry args={[0.2]} />
      <meshStandardMaterial color={team == 0 ? "red" : "green"} />
    </mesh>
  }

  function HomePieces({position, scale=1}) {
    let space = layout[device].game[`team${team}`].pieces.space;
    let positionStartX = layout[device].game[`team${team}`].pieces.positionStartX;
    let positionStartY = layout[device].game[`team${team}`].pieces.positionStartY;
    let positionStartZ = layout[device].game[`team${team}`].pieces.positionStartZ;

    return (
      <group position={position} scale={scale}>
        {
          teams[team].pieces.map((value, index) =>
            pieceStatus(value.tile) === "onBoard" ? <EmptyPiece 
              position={[
                positionStartX + index * space,
                positionStartY,
                positionStartZ,
              ]}
              key={index}
            /> : 
            pieceStatus(value.tile) === "scored" ? <ScoredPiece
              position={[
                positionStartX + index * space,
                positionStartY,
                positionStartZ,
              ]}
              key={index}
            /> : <Piece
              position={[
                positionStartX + index * space,
                positionStartY,
                positionStartZ,
              ]}
              rotation={layout[device].game[`team${team}`].pieces.rotation}
              scale={layout[device].game[`team${team}`].pieces.scale}
              tile={-1}
              team={team}
              id={value.id}
              key={index}
              animation={null}
            />
          )
        }
      </group>
    );
  }

  function RollDisplay() {
    // Handle 0 because it is coerced to 'null' as a string
    let rollText;
    if (teams[team].pregameRoll === null) {
      rollText = '';
    } else {
      rollText = teams[team].pregameRoll.toString()
    }

    return <group position={layout[device].game[`team${team}`].pregameRoll.position}>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-0.9, 0.025, 0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={layout[device].game[`team${team}`].pregameRoll.size}
        height={layout[device].game[`team${team}`].pregameRoll.height}
      >
        {`roll: ${rollText}`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
    </group>
  }

  function PlayerIds() {
    return <group
      position={layout[device].game[`team${team}`].names.position}
      rotation={layout[device].game[`team${team}`].names.rotation}
    >
      {teams[team].players.map((value, index) => (
        index < 5 &&
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          key={index}
          size={layout[device].game[`team${team}`].names.size}
          height={layout[device].game[`team${team}`].names.height}
          position={[0, -index * 0.5, 0]}
        >
          {formatName(value.name, layout[device].game[`team${team}`].names.maxLength)}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      ))}
    </group>
  }

  return <group
    position={position}
    scale={scale}
  >
    {/* team name */}
    <Text3D
      font="fonts/Luckiest Guy_Regular.json"
      position={layout[device].game[`team${team}`].title.position}
      rotation={layout[device].game[`team${team}`].title.rotation}
      size={layout[device].game[`team${team}`].title.size}
      height={layout[device].game[`team${team}`].title.height}
    >
      { team === 0 ? "Team Rocket" : "Team UFO" }
      <meshStandardMaterial color={ team === 0 ? 'red': 'turquoise' }/>
    </Text3D>
    {/* join button */}
    { gamePhase === "lobby" && <JoinTeamButton/> }
    { gamePhase === "pregame" && <RollDisplay/> }
    {/* pieces */}
    <HomePieces 
    position={layout[device].game[`team${team}`].pieces.position} 
    team={team} 
    scale={layout[device].game[`team${team}`].pieces.sectionScale}
    />
    {/* player ids */}
    <PlayerIds/>
  </group>
}