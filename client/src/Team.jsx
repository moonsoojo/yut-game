import React from 'react';
import layout from './layout';
import { useAtom } from 'jotai';
import { clientAtom, team0PlayersAtom, team1PlayersAtom, teamsAtom } from './SocketManager';
import { joinTeamAtom } from './GlobalState';
import { Html } from '@react-three/drei';
import HtmlElement from './HtmlElement';
import Piece from './components/Piece';

export default function Team({ team, device }) {
  const [players] = useAtom(team === 0 ? team0PlayersAtom : team1PlayersAtom)
  const [teams] = useAtom(teamsAtom)

  function JoinTeam() {
    const [client] = useAtom(clientAtom);
    const [joinTeam, setJoinTeam] = useAtom(joinTeamAtom);
    function handleJoinTeam () {
        setJoinTeam(team);
    }
    return client.team !== team && joinTeam !== team && <HtmlElement
      text="JOIN"
      position={layout[device][`team${team}`].join.position}
      rotation={layout[device][`team${team}`].join.rotation}
      fontSize={layout[device][`team${team}`].join.fontSize}
      handleClick={handleJoinTeam}
    /> 
  }

  function HomePieces({position, scale=1}) {
    let space = layout[device].homePieces[team].space;
    let positionStartX = 0
    let positionStartY = 0
    let positionStartZ = 0.5

    return (
      <group position={position} scale={scale}>
        {teams[team].pieces.map((value, index) =>
          value == null ? (
            <mesh
              position={[
                positionStartX + index * space,
                positionStartY,
                positionStartZ,
              ]}
              key={index}
            >
              <sphereGeometry args={[0.2]} />
            </mesh>
          ) : value === "scored" ? (
            <mesh
              position={[
                positionStartX + index * space,
                positionStartY,
                positionStartZ,
              ]}
              key={index}
            >
              <sphereGeometry args={[0.2]} />
              <meshStandardMaterial color={team == 0 ? "red" : "green"} />
            </mesh>
          ) : (
              <Piece
                position={[
                positionStartX + index * space,
                positionStartY,
                positionStartZ,
              ]}
              rotation={layout[device].homePieces[team].rotation}
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

  return <group
    position={layout[device][`team${team}`].position}
    scale={layout[device][`team${team}`].scale}
  >
    {/* team name */}
    <HtmlElement
      text={ team === 0 ? "Rockets" : "UFOs" }
      position={layout[device][`team${team}`].title.position}
      rotation={layout[device][`team${team}`].title.rotation}
      color={ team === 0 ? "red" : "turquoise" }
    />
    {/* join button */}
    <JoinTeam/>
    {/* pieces */}
    <HomePieces position={layout[device][`team${team}`].pieces.position} team={team} scale={0.5}/>
    {/* player ids */}
    <Html
      position={layout[device][`team${team}`].names.position}
      rotation={layout[device][`team${team}`].names.rotation}
      transform
    >
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        position: 'absolute',
        width: `${layout[device][`team${team}`].names.divWidth}px`
      }}>
      {players.map((value, index) => (
        <div
          style={{
              color: "yellow",
              fontFamily: 'Luckiest Guy',
              fontSize: '15px',
              padding: layout[device][`team${team}`].names.padding
          }}
          key={index}
        >
          {value.name}
        </div>
      ))}
      </div>
    </Html>
  </group>
}