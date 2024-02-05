import React, { useState } from 'react';
import layout from './layout';
import { useAtom } from 'jotai';
import { clientAtom, teamsAtom, turnAtom } from './SocketManager';
import TextButton from './components/TextButton';
import { hasValidMove, isMyTurn } from './helpers/helpers';
import PieceClean from './components/PieceClean';
import { OrthographicCamera, Text3D, OrbitControls } from '@react-three/drei';

export default function Teams({ device='landscapeDesktop' }) {
  const [teams] = useAtom(teamsAtom)
  const [client] = useAtom(clientAtom)
  const [turn] = useAtom(turnAtom)
  
  const [showJoinTeam0Button, setShowJoinTeam0Button] = useState(true)
  const [showJoinTeam1Button, setShowJoinTeam1Button] = useState(true)
  const [joinTeam, setJoinTeam] = useState(null);
  function handleJoinTeam0 () {
    setJoinTeam(0);
  }
  function handleJoinTeam1 () {
    setJoinTeam(1)
  }
  function HomePieces({team, scale=1}) {
    let space = layout[device].homePieces[team].space;
    let positionStartX = 0
    let positionStartY = 0
    let positionStartZ = 0.5

    return (
      <group scale={scale}>
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
              <PieceClean
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
              isMyTurn={isMyTurn(turn, teams, client.id)}
              hasValidMove={client.team && hasValidMove(teams[client.team].moves)}
            />
          )
        )}
      </group>
    );
  }
  function Team0() {
    return <group
      position={[layout[device].team0.position]}
      scale={layout[device].team0.scale}
    >
      {/* team name */}
      <Text3D 
      font="/fonts/Luckiest Guy_Regular.json" 
      size={0.3} 
      height={0.01}>
        Team Rocket
        <meshStandardMaterial color='red'/>
      </Text3D>
      {/* join button */}
      {/* { client.team !== 0 && showJoinTeam0Button && <TextButton
        text="JOIN"
        boxWidth={0.9}
        boxHeight={0.3}
        color="yellow"
        position={layout[device].team0.join.position}
        handlePointerClick={handleJoinTeam0}
      /> } */}
      {/* pieces */}
      {/* <group position={layout[device].team0.pieces.position}>
        <HomePieces team={0} scale={0.5}/>
      </group> */}
      {/* player ids */}
      {/* {teams[0].players.map((value, index) => (
        <TextButton
          text={`${value.name}`}
          position={[
            layout[device].team0.names.position[0],
            layout[device].team0.names.position[1], 
            layout[device].team0.names.position[2] + 0.5 * (index)]}
          color={
            turn.team == 0 && turn.players[turn.team] == index
              ? "white"
              : "yellow"
          }
          key={index}
        />
      ))} */}
    </group>
  }
  function Team1() {
    return <group
      position={layout[device].team1.position}
      scale={layout[device].team1.scale}
    >
      {/* team name */}
      <TextButton
        text="Rockets"
        boxWidth={1.2}
        boxHeight={0.3}
        color="red"
      />
      {/* join button */}
      { client.team !== 0 && showJoinTeam1Button && <TextButton
        text="JOIN"
        boxWidth={0.9}
        boxHeight={0.3}
        color="yellow"
        position={layout[device].team1.join.position}
        handlePointerClick={handleJoinTeam1}
      /> }
      {/* pieces */}
      <group position={layout[device].team1.pieces.position}>
        <HomePieces team={0} scale={0.5}/>
      </group>
      {/* player ids */}
      {teams[0].players.map((value, index) => (
        <TextButton
          text={`${value.name}`}
          position={[
            layout[device].team1.names.position[0],
            layout[device].team1.names.position[1], 
            layout[device].team1.names.position[2] + 0.5 * (index)]}
          color={
            turn.team == 1 && turn.players[turn.team] == index
              ? "white"
              : "yellow"
          }
          key={index}
        />
      ))}
    </group>
  }
  return <group scale={layout[device].scale}>
    <OrbitControls/>
    <OrthographicCamera
      makeDefault
      zoom={30}
      top={400}
      bottom={-400}
      left={400}
      right={-400}
      near={0.01}
      far={2000}
      position={layout[device].camera.position}
    />
    <Team0/>
    {/* <Team1/> */}
  </group>
}