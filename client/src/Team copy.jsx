import React from 'react';
import layout from './layout';
import { useAtom } from 'jotai';
import { joinTeamAtom, clientAtom, teamsAtom, gamePhaseAtom, turnAtom } from './GlobalState';
import { Html, Text3D } from '@react-three/drei';
import HtmlElement from './HtmlElement';
import Piece from './components/Piece';
import { pieceStatus } from './helpers/helpers';
import { Color, MeshStandardMaterial } from 'three';

export default function Team({ position=[0,0,0], scale=1, team, device }) {
  const [teams] = useAtom(teamsAtom)
  const [gamePhase] = useAtom(gamePhaseAtom);
  const [turn] = useAtom(turnAtom)

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
      position={layout[device][`team${team}`].join.position}
    >
      <mesh
        material={yellowMaterial}
      >
        <boxGeometry args={[1.15, 0.03, 0.55]}/>
        {/* <meshStandardMaterial color='yellow'/> */}
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
        rotation={layout[device][`team${team}`].join.rotation}
        size={0.3}
        height={0.01}
        material={yellowMaterial}
      >
        JOIN
        {/* <meshStandardMaterial color='yellow'/> */}
      </Text3D>
    </group>
    
    
    // <HtmlElement
    //   text="JOIN"
    //   position={layout[device][`team${team}`].join.position}
    //   rotation={layout[device][`team${team}`].join.rotation}
    //   fontSize={layout[device][`team${team}`].join.fontSize}
    //   handleClick={handleJoinTeam}
    // /> 
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
    let space = layout[device][`team${team}`].pieces.space;
    let positionStartX = layout[device][`team${team}`].pieces.positionStartX;
    let positionStartY = layout[device][`team${team}`].pieces.positionStartY;
    let positionStartZ = layout[device][`team${team}`].pieces.positionStartZ;

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
              rotation={layout[device][`team${team}`].pieces.rotation}
              scale={layout[device][`team${team}`].pieces.scale}
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

    return <HtmlElement
      text={<div>
        Roll: <span style={{ "color": team === 0 ? "red" : "turquoise" }}>{rollText}</span>
      </div>}
      position={layout[device][`team${team}`].pregameRoll.position}
      rotation={layout[device][`team${team}`].pregameRoll.rotation}
      fontSize={layout[device][`team${team}`].pregameRoll.fontSize}
    />
  }

  function playerNameDisplay(team, playerIndex, name) {
    if (team === turn.team && playerIndex === turn.players[turn.team] && 
      (gamePhase === "pregame" || gamePhase === "game")) {
      return <div>{name}<span style={{'color': 'red'}}> &#9679;</span></div>
    } else {
      return name
    }
  }

  function PlayerIds() {
    return <Html
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
      {teams[team].players.map((value, index) => (
        <div
          style={{
              color: "yellow",
              fontFamily: 'Luckiest Guy',
              fontSize: layout[device][`team${team}`].names.fontSize,
              padding: layout[device][`team${team}`].names.padding
          }}
          key={index}
        >
          {playerNameDisplay(team, index, value.name)}
        </div>
      ))}
      </div>
    </Html>
  }

  return <group
    position={position}
    scale={scale}
  >
    {/* team name */}
    <Text3D
      font="fonts/Luckiest Guy_Regular.json"
      position={layout[device][`team${team}`].title.position}
      rotation={layout[device][`team${team}`].title.rotation}
      size={0.4}
      height={0.01}
    >
      { team === 0 ? "Team Rocket" : "Team UFO" }
      <meshStandardMaterial color={ team === 0 ? 'red': 'turquoise' }/>
    </Text3D>
    {/* join button */}
    { gamePhase === "lobby" && <JoinTeamButton/> }
    { gamePhase === "pregame" && <RollDisplay/> }
    {/* pieces */}
    <HomePieces position={layout[device][`team${team}`].pieces.position} team={team} scale={0.5}/>
    {/* player ids */}
    <PlayerIds/>
  </group>
}