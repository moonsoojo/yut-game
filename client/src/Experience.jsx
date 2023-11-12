import { useRef, useEffect, useState } from "react";
import { CuboidCollider, RigidBody, Physics } from "@react-three/rapier";
import YutsNew3 from "./Yuts.jsx";
import Star from "./meshes/Star.jsx";
import Neptune2 from "./meshes/Neptune2.jsx";
import Earth from "./meshes/Earth.jsx";
import Mars from "./meshes/Mars.jsx";
import Saturn from "./meshes/Saturn.jsx";
import SunBagus from "./meshes/SunBagus.jsx";
import Controls3d from "./Controls3d";
// import Decorations from "./Decorations";
import layout from "./layout";
import React from "react";
import { Leva, useControls } from "leva";
import {
  Environment,
  Sky,
  ContactShadows,
  RandomizedLight,
  AccumulativeShadows,
  SoftShadows,
  Stars,
  Html,
  Text3D,
  OrthographicCamera,
} from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAtom, atom } from "jotai";
import {
  readyToStartAtom,
  teamsAtom,
  turnAtom,
  gamePhaseAtom,
  socket,
  socketIdAtom,
  throwInProgressAtom
} from "./SocketManager";
import Moon from "./meshes/Moon.jsx";
import TextButton from "./components/TextButton";
import ScoreButton from "./ScoreButton.jsx";
import { getCurrentPlayerSocketId, movesIsEmpty, isMyTurn } from "../../server/src/helpers.js";
import { Perf } from 'r3f-perf'
import Piece from "./components/Piece.jsx";

export const bannerAtom = atom("throw the yuts!");
export const playAtom = atom(false);

let device = window.innerWidth > 1000 ? "desktop" : "mobile";

export default function Experience() {
  // window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
      device = "desktop";
    } else {
      device = "mobile";
    }
  });

  const [readyToStart] = useAtom(readyToStartAtom);
  const [teams] = useAtom(teamsAtom);
  const [turn] = useAtom(turnAtom);
  const [gamePhase] = useAtom(gamePhaseAtom)
  const [socketId] = useAtom(socketIdAtom);
  const [throwInProgress] = useAtom(throwInProgressAtom)
  const [endTurn, setEndTurn] = useState(false);

  useEffect(() => {
    console.log("endTurn state change")
  }, [endTurn])

  const numTiles = 29;

  const tileRefs = [...Array(numTiles)];
  for (let i = 0; i < numTiles; i++) {
    tileRefs[i] = useRef();
  }

  const TILE_RADIUS = 4;
  const NUM_STARS = 20;
  function Tiles() {
    let tiles = [];

    //circle
    for (let i = 0; i < NUM_STARS; i++) {
      let position = [
        -Math.cos(((i - 7.5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
        0,
        Math.sin(((i - 7.5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
      ];
      if (i == 0) {
        tiles.push(<Earth position={position} tile={i} key={i} />);
      } else if (i == 5) {
        tiles.push(
          <Mars
            position={[position[0], position[1], position[2]]}
            tile={i}
            key={i}
          />
        );
      } else if (i == 10) {
        tiles.push(<Saturn position={position} tile={i} key={i} />);
      } else if (i == 15) {
        tiles.push(<Neptune2 position={position} tile={i} key={i} />);
      } else {
        tiles.push(
          <Star
            position={position}
            tile={i}
            key={i}
            scale={layout[device].star.scale}
            device={device}
          />
        );
      }
    }

    //shortcuts
    const radiusShortcut1 = 2.7;
    const radiusShortcut2 = 1.4;
    for (let i = 0; i < NUM_STARS; i++) {
      let indexShortcut1;
      let indexShortcut2;
      if (i == 0) {
        indexShortcut1 = 28;
        indexShortcut2 = 27;
      } else if (i == 5) {
        indexShortcut1 = 20;
        indexShortcut2 = 21;
      } else if (i == 10) {
        indexShortcut1 = 25;
        indexShortcut2 = 26;
      } else if (i == 15) {
        indexShortcut1 = 24;
        indexShortcut2 = 23;
      }
      if (i == 0 || i == 5 || i == 10 || i == 15) {
        tiles.push(
          <Star
            position={[
              Math.sin(((i + 7.5) * (Math.PI * 2)) / NUM_STARS) *
                radiusShortcut1,
              0,
              Math.cos(((i + 7.5) * (Math.PI * 2)) / NUM_STARS) *
                radiusShortcut1,
            ]}
            tile={indexShortcut1}
            key={i + 30}
            scale={layout[device].star.scale}
          />
        );
        tiles.push(
          <Star
            position={[
              Math.sin(((i + 7.5) * (Math.PI * 2)) / NUM_STARS) *
                radiusShortcut2,
              0,
              Math.cos(((i + 7.5) * (Math.PI * 2)) / NUM_STARS) *
                radiusShortcut2,
            ]}
            tile={indexShortcut2}
            key={i + 41}
            scale={layout[device].star.scale}
          />
        );
      }
    }

    // center piece
    tiles.push(
      <Moon
        position={[0, 0, 0]}
        intensity={3}
        // scale={0.4}
        key={100}
        tile={22}
      />
    );
    return tiles;
  }

  function HomePieces({team}) {
    let positionStartX = layout[device].homePieces[team].positionStartX;
    let positionStartY = layout[device].homePieces[team].positionStartY;
    let positionStartZ = layout[device].homePieces[team].positionStartZ;
    let space = layout[device].homePieces[team].space;

    return (
      <>
        {teams[team].pieces.map((value, index) =>
          value == null ? (
            <mesh
              position={[
                positionStartX,
                positionStartY,
                positionStartZ + index * space,
              ]}
              key={index}
            >
              <sphereGeometry args={[0.1]} />
            </mesh>
          ) : value === "scored" ? (
            <mesh
              position={[
                positionStartX,
                positionStartY,
                positionStartZ + index * space,
              ]}
              key={index}
            >
              <sphereGeometry args={[0.1]} />
              <meshStandardMaterial color={team == 0 ? "red" : "turquoise"} />
            </mesh>
          ) : (
              <Piece
                position={[
                positionStartX,
                positionStartY,
                positionStartZ + index * space,
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
      </>
    );
  }
  
  function hasMove(team) {
    let flag = false;
    for (let move in team.moves) {
      if (team.moves[move] > 0) {
        flag = true;
        break;
      }
    }
    return flag
  }

  function allTeamsHaveMove(teams) {
    let allTeamsHaveMove = true;
    for (let i = 0; i < teams.length; i++) {
      let flag = hasMove(teams[i]);
      if (!flag) {
        allTeamsHaveMove = false;
        break;
      }
    }
    return allTeamsHaveMove
  }

  function firstTeamToThrow(teams) {
    let topThrow = 0;
    let topThrowTeam = -1;
    let tie = false;
    for (let i = 0; i < teams.length; i++) {
      for (let move in teams[i].moves) {
        if (teams[i].moves[move] > 0) {
          if (parseInt(move) > topThrow) {
            topThrow = parseInt(move)
            topThrowTeam = i
          } else if (parseInt(move) == topThrow) {
            tie = true;
          }
          break;
        }
      }
    }
    if (tie) {
      return -1
    } else {
      return topThrowTeam
    }
  }

  const {
    count,
    size,
    radius,
    branches,
    spin,
    randomness,
    randomnessPower,
    insideColor,
    outsideColor,
    envMapIntensity,
  } = useControls("galaxy", {
    count: {
      value: 100000,
      min: 0,
      max: 100000,
      step: 1000,
    },
    size: {
      value: 0.02,
      min: 0.01,
      max: 0.2,
      step: 0.01,
    },
    radius: {
      value: 1.4,
      min: 1,
      max: 50,
      step: 0.1,
    },
    branches: {
      value: 19,
      min: 1,
      max: 20,
      step: 1,
    },
    spin: {
      value: 4.09,
      min: -10,
      max: 10,
      step: 0.001,
    },
    randomness: {
      value: 0.34,
      min: 0,
      max: 2,
      step: 0.001,
    },
    randomnessPower: {
      value: 4.01,
      min: 1,
      max: 10,
      step: 0.001,
    },
    insideColor: {
      value: "#794c40",
    },
    outsideColor: {
      value: "#1b3984",
    },
    envMapIntensity: { value: 1, min: 0, max: 12, step: 1 },
  });

  // const {
  //   countStars,
  //   sizeStars,
  //   distanceMin,
  //   distanceMax,
  //   firstColorStars,
  //   secondColorStars,
  // } = useControls("stars", {
  //   countStars: {
  //     value: 100000,
  //     min: 0,
  //     max: 100000,
  //     step: 1000,
  //   },
  //   sizeStars: {
  //     value: 0.02,
  //     min: 0.01,
  //     max: 0.2,
  //     step: 0.01,
  //   },
  //   distanceMin: {
  //     value: 10,
  //     min: 0.01,
  //     max: 1000,
  //     step: 1,
  //   },
  //   distanceMax: {
  //     value: 10,
  //     min: 0.01,
  //     max: 1000,
  //     step: 1,
  //   },
  //   firstColorStars: {
  //     value: "#794c40",
  //   },
  //   secondColorStars: {
  //     value: "#1b3984",
  //   },
  //   envMapIntensity: { value: 1, min: 0, max: 12, step: 1 },
  // });

  const {
    turbidity,
    rayleigh,
    mieCoefficient,
    mieDirectionalG,
    inclination,
    azimuth,
    distance,
    exposure,
    sunPosition,
    lightPosition,
    lightIntensity,
  } = useControls("sky", {
    turbidity: {
      value: 1.5,
      min: 0,
      max: 20,
      step: 0.1,
    },
    rayleigh: {
      value: 0.07,
      min: 0.01,
      max: 4,
      step: 0.001,
    },
    mieCoefficient: {
      value: 0.1,
      min: 0,
      max: 0.1,
      step: 0.001,
    },
    mieDirectionalG: {
      value: 1.0,
      min: 0,
      max: 1,
      step: 0.001,
    },
    inclination: {
      value: 0.57,
      min: 0,
      max: 3.14,
      step: 0.01,
    },
    azimuth: {
      value: -81.1,
      min: -180,
      max: 180,
      step: 0.1,
    },
    distance: {
      value: 80.3,
      min: 0,
      max: 100,
      step: 0.01,
    },
    exposure: {
      value: 0.25,
      min: 0,
      max: 1,
      step: 0.0001,
    },
    sunPosition: {
      value: [-0.49, 0.11, 0.3],
      step: 0.01,
    },
    lightPosition: {
      value: [0.13, 0.42, 0.25],
      step: 0.01,
    },
    lightIntensity: {
      value: 5.62,
      min: 0,
      max: 10,
      step: 0.01,
    },
  });

  const { gl, scene } = useThree(({ gl, scene }) => ({ gl, scene }));

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = exposure;
  }, [gl, scene, exposure]);

  function prettifyMoves(moves) {
    let prettifiedMoves = ""
    for (let move in moves) {
      for (let i = 0; i < moves[move]; i++) {
        if (prettifiedMoves === "") {
          prettifiedMoves = move
        } else {
          prettifiedMoves += `, ${move}`
        }
      }
    }
    return prettifiedMoves
  }

  return (
    <>
      {/* <Perf/> */}
      <OrthographicCamera
        makeDefault
        zoom={layout[device].camera.zoom}
        top={200}
        bottom={-200}
        left={200}
        right={-200}
        near={0.1}
        far={2000}
        position={layout[device].camera.position}
      />
      {/* <color args={["#000001"]} attach="background" /> */}
      {/* <Environment
        background
        files={"./environmentMaps/empty-galaxy-small.hdr"}
      /> */}
      <Leva hidden />
      <Sky
        turbidity={turbidity}
        rayleigh={rayleigh}
        mieCoefficient={mieCoefficient}
        mieDirectionalG={mieDirectionalG}
        elevation={inclination}
        azimuth={azimuth}
        distance={distance}
        sunPosition={sunPosition}
      />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      {/* <Galaxy
        count={count}
        size={size}
        radius={radius}
        branches={branches}
        spin={spin}
        randomness={randomness}
        randomnessPower={randomnessPower}
        insideColor={insideColor}
        outsideColor={outsideColor}
        position={[-1, 0.5, 0.5]}
      /> */}

      <directionalLight
        position={lightPosition}
        intensity={lightIntensity}
        castShadow
      />
      <ambientLight intensity={0.5} />
      {/* <Controls3d
        tileRadius={TILE_RADIUS}
        numStars={NUM_STARS}
        device={device}
      /> */}
      <Physics debug maxVelocityIterations={10}>
        <RigidBody
          type="fixed"
          restitution={0.01}
          position={[0, -0.5, 0]}
          friction={0.9}
        >
          <CuboidCollider args={[30, 0.5, 30]} restitution={0.2} friction={1} />
          <mesh>
            <boxGeometry args={[60, 1, 60]} />
            <meshStandardMaterial transparent opacity={0} />
          </mesh>
        </RigidBody>
        <YutsNew3 device={device} />
        <Tiles />

        <HomePieces team={0}/>
        <HomePieces team={1}/>

        {/* score button */}
        <ScoreButton           
          position={layout[device].scoreButton.position}
          rotation={layout[device].scoreButton.rotation}
        />
        {/* reset button */}
        <TextButton
          text="Reset"
          position={layout[device].resetButton.position}
          rotation={layout[device].resetButton.rotation}
          handlePointerClick={() => {
            socket.emit("reset");
          }}
          boxWidth={1.2}
          boxHeight={0.3}
        />
        
        {/* end turn button */}
        {/* socket.emit("endTurn", true); */}
        
        {/* <Decorations /> */}
        {/* START text */}
        <TextButton
          text="Start"
          position={layout[device].startBanner.position}
          rotation={layout[device].startBanner.rotation}
          boxWidth={1.2}
          boxHeight={0.3}
        />
        {/* START GAME text */}
        {readyToStart && gamePhase === "lobby" && ( // should be set to 'false' after click
          <TextButton
            text="Start Game"
            position={layout[device].startGameBanner.position}
            rotation={layout[device].startGameBanner.rotation}
            boxWidth={1.2}
            boxHeight={0.3}
            handlePointerClick={() => socket.emit("startGame")}
          />
        )}
        <group
          position={layout[device].team0Banner.position}
          rotation={layout[device].team0Banner.rotation}
        >
          <TextButton
            text="Team 0"
            boxWidth={1.2}
            boxHeight={0.3}
            color="red"
          />
          {teams[0].players.map((value, index) => (
            <TextButton
              text={value.displayName}
              position={[0, -0.5 * (1 + index), 0]}
              color={
                turn.team == 0 && turn.players[turn.team] == index && gamePhase !== "lobby"
                  ? "white"
                  : "yellow"
              }
              key={index}
              size={value.socketId === socketId ? 0.4: 0.3}
            />
          ))}
          {(turn.team == 0 && (gamePhase === "pregame" || gamePhase === "game")) && (
            <>            
              <TextButton
                text={`Throws: ${
                  teams[0].throws
                }`}
                position={[0, -0.5 * (1 + teams[turn.team].players.length), 0]}
              />
            </>
          )}
          {(gamePhase === "pregame" || (turn.team == 0 && gamePhase !== "lobby")) && 
            <TextButton
              text={`Moves: ${
                prettifyMoves(teams[0].moves)
              }`}
              position={[0, -0.5 * (2 + teams[0].players.length), 0]}
            />
          }
          {/* <TextButton
            text="Join"
            position={layout[device].joinTeam0Banner.position}
            rotation={layout[device].joinTeam0Banner.rotation}
            boxWidth={1.2}
            boxHeight={0.3}
          /> */}
        </group>
        <group
          position={layout[device].team1Banner.position}
          rotation={layout[device].team1Banner.rotation}
        >
          <TextButton
            text="Team 1"
            boxWidth={1.2}
            boxHeight={0.3}
            color="turquoise"
          />
          {teams[1].players.map((value, index) => (
            <TextButton
              text={value.displayName}
              position={[0, -0.5 * (1 + index), 0]}
              color={
                turn.team == 1 && turn.players[turn.team] == index && gamePhase !== "lobby"
                  ? "white"
                  : "yellow"
              }
              key={index}
              size={value.socketId === socketId ? 0.4: 0.3}
            />
          ))}
          {(turn.team == 1 && (gamePhase === "pregame" || gamePhase === "game")) && (
            <>                          
              <TextButton
                text={`Throws: ${
                  teams[1].throws
                }`}
                position={[0, -0.5 * (1 + teams[turn.team].players.length), 0]}
              />
              </>
              )}
              {(gamePhase === "pregame" || (turn.team == 1 && gamePhase !== "lobby")) && (
              <TextButton
                text={`Moves: ${
                  prettifyMoves(teams[1].moves)
                }`}
                position={[0, -0.5 * (2 + teams[1].players.length), 0]}
              />)}
          {/* <TextButton
            text="Join"
            position={layout[device].joinTeam1Banner.position}
            rotation={layout[device].joinTeam1Banner.rotation}
            boxWidth={1.2}
            boxHeight={0.3}
          /> */}
        </group>
      </Physics>
    </>
  );
}
