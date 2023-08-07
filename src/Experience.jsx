import { useRef, useState, useEffect } from "react";
import { CuboidCollider, RigidBody, Physics } from "@react-three/rapier";
import Yuts from "./Yuts";
import Star from "./Star";
import Neptune2 from "./Neptune2";
import Earth from "./Earth";
import Rocket from "./Rocket";
import Ufo from "./Ufo";
import Mars from "./Mars";
import Saturn from "./Saturn";
import Sun2 from "./Sun2";
import React from "react";
import ScoreButton from "./ScoreButton";
import { Leva, useControls } from "leva";
import {
  Environment,
  Sky,
  ContactShadows,
  RandomizedLight,
  AccumulativeShadows,
  SoftShadows,
  Stars,
} from "@react-three/drei";
import Universe from "./Universe";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
// import { useRocketStore } from "./state/zstore";
import { useRocketStore } from "./state/zstore2";

export default function Experience() {
  const pieces = useRocketStore((state) => state.pieces);

  const numTiles = 29;

  const tileRefs = [...Array(numTiles)];
  for (let i = 0; i < numTiles; i++) {
    tileRefs[i] = useRef();
  }

  function Tiles() {
    const numStars = 20;
    let tiles = [];
    const radius = 4;

    //circle
    for (let i = 0; i < numStars; i++) {
      let position = [
        -Math.cos(((i - 10) * (Math.PI * 2)) / numStars) * radius - 1,
        0.5,
        Math.sin(((i - 10) * (Math.PI * 2)) / numStars) * radius + 0.5,
      ];
      if (i == 0) {
        tiles.push(<Earth position={position} tile={i} key={i} />);
      } else if (i == 5) {
        tiles.push(<Mars position={position} tile={i} key={i} />);
      } else if (i == 10) {
        tiles.push(<Saturn position={position} tile={i} key={i} />);
      } else if (i == 15) {
        tiles.push(<Neptune2 position={position} tile={i} key={i} />);
      } else {
        tiles.push(<Star position={position} tile={i} key={i} />);
      }
    }

    //shortcuts
    const radiusShortcut1 = 2.7;
    const radiusShortcut2 = 1.4;
    for (let i = 0; i < numStars; i++) {
      let indexShortcut1;
      let indexShortcut2;
      if (i == 0) {
        indexShortcut1 = 27;
        indexShortcut2 = 28;
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
              Math.sin(((i + 5) * (Math.PI * 2)) / numStars) * radiusShortcut1 -
                1,
              0.5,
              Math.cos(((i + 5) * (Math.PI * 2)) / numStars) * radiusShortcut1 +
                0.5,
            ]}
            scale={0.1}
            tile={indexShortcut1}
            key={i + 30}
          />
        );
        tiles.push(
          <Star
            position={[
              Math.sin(((i + 5) * (Math.PI * 2)) / numStars) * radiusShortcut2 -
                1,
              0.5,
              Math.cos(((i + 5) * (Math.PI * 2)) / numStars) * radiusShortcut2 +
                0.5,
            ]}
            scale={0.1}
            tile={indexShortcut2}
            key={i + 41}
          />
        );
      }
    }

    //center piece
    tiles.push(<Sun2 position={[-1, 0.5, 0.5]} tile={22} key={100} />);
    // tiles.push(<Polaris2 position={[-1, 0.5, 0.5]} tile={22} />)
    return tiles;
  }

  function PiecesTeam0() {
    //deleting brackets around function after '=>' made the meshes appear
    return (
      <>
        {pieces[0].map((value, index) =>
          value == null ? (
            <mesh position={[4, 0, -0.7 + index * 0.4]} key={index}>
              <sphereGeometry args={[0.1]} />
            </mesh>
          ) : value === "scored" ? (
            <mesh position={[4, 0, -0.7 + index * 0.4]} key={index}>
              <sphereGeometry args={[0.1]} />
              <meshStandardMaterial color={"green"} />
            </mesh>
          ) : (
            <Ufo
              position={[4, 0, -0.9 + index * 0.5]}
              keyName={`count${index}`}
              tile={-1}
              team={0}
              id={value.id}
              key={index}
            />
          )
        )}
      </>
    );
  }
  function PiecesTeam1() {
    return (
      <>
        {pieces[1].map((value, index) =>
          value == null ? (
            <mesh position={[2.8, 0, -3.5 + index * 0.5]} key={index}>
              <sphereGeometry args={[0.1]} />
            </mesh>
          ) : value === "scored" ? (
            <mesh position={[2.8, 0, -3.5 + index * 0.5]} key={index}>
              <sphereGeometry args={[0.1]} />
              <meshStandardMaterial color={"green"} />
            </mesh>
          ) : (
            <Rocket
              position={[2.8, 0, -3.7 + index * 0.5]}
              keyName={`count${index}`}
              tile={-1}
              team={1}
              id={value.id}
              key={index}
            />
          )
        )}
      </>
    );
  }
  {
    /* {[...Array(scores[1])].map((value, index) => (
          <mesh position={[3.1, 0, -3 + index * 0.4]} keyName={`count${index}`}>
            <sphereGeometry args={[0.1, 32, 16]} />
            <meshStandardMaterial color={"red"} />
          </mesh>
        ))} 
      </>
    );
  }*/
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
      value: [0.8, 1.77, -0.07],
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

  return (
    <>
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

      <Physics maxVelocityIterations={10}>
        <RigidBody
          type="fixed"
          restitution={0.01}
          position={[0, -0.5, 0]}
          friction={0.9}
        >
          <CuboidCollider
            args={[3.5, 0.5, 3.5]}
            restitution={0.2}
            friction={1}
          />
        </RigidBody>
        <Yuts />
        <Tiles />

        <PiecesTeam0 />
        <PiecesTeam1 />

        <ScoreButton position={[4, 0, 2]} />
      </Physics>
    </>
  );
}
