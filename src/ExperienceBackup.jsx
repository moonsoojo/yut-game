import { useRef, useState } from "react";
import { useThree, extend, useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody, Physics } from "@react-three/rapier";
import { CameraControls, useGLTF } from "@react-three/drei";
import Yuts from "./Yuts";
import Star from "./Star";
import Neptune from "./Neptune";
import Earth from "./Earth";

export default function Experience() {
  const { camera, gl } = useThree();
  const groupRef = useRef();
  const starRef = useRef();
  const earthRef = useRef();
  const star1Ref = useRef();
  const star2Ref = useRef();
  const star3Ref = useRef();
  const star4Ref = useRef();
  const neptuneRef = useRef();
  const [star1Hover, setStar1Hover] = useState(false);
  const tiles = [earthRef, star1Ref, star2Ref, star3Ref, star4Ref, neptuneRef];

  const positions = [
    [0, 0, 0],
    [0.5, 0, 0],
    [1, 0, 0],
    [1.5, 0, 0],
  ];

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
  });

  function Tiles() {
    const numStars = 20;
    let tiles = [];
    const radius = 2;

    //circle
    for (let i = 0; i < numStars; i++) {
      if (i == 0) {
        tiles.push(
          <Earth
            position={[
              Math.sin(((i - 5) * (Math.PI * 2)) / numStars) * radius,
              0,
              Math.cos(((i - 5) * (Math.PI * 2)) / numStars) * radius,
            ]}
            scale={0.14}
          />
        );
      } else if (i == 5) {
        tiles.push(
          <mesh
            castShadow
            position={[
              Math.sin(((i - 5) * (Math.PI * 2)) / numStars) * radius,
              0,
              Math.cos(((i - 5) * (Math.PI * 2)) / numStars) * radius,
            ]}
          >
            <sphereGeometry args={[0.1, 32, 16]} />
            <meshStandardMaterial color="yellow" />
          </mesh>
        );
      } else if (i == 10) {
        tiles.push(
          <mesh
            castShadow
            position={[
              Math.sin(((i - 5) * (Math.PI * 2)) / numStars) * radius,
              0,
              Math.cos(((i - 5) * (Math.PI * 2)) / numStars) * radius,
            ]}
          >
            <sphereGeometry args={[0.1, 32, 16]} />
            <meshStandardMaterial color="red" />
          </mesh>
        );
      } else if (i == 15) {
        tiles.push(
          <Neptune
            position={[
              Math.sin(((i - 5) * (Math.PI * 2)) / numStars) * radius,
              0,
              Math.cos(((i - 5) * (Math.PI * 2)) / numStars) * radius + 0.15,
            ]}
            scale={0.1}
          />
        );
      } else {
        if (i == 1) {
          tiles.push(
            <Star
              position={[
                Math.sin(((i - 5) * (Math.PI * 2)) / numStars) * radius,
                0,
                Math.cos(((i - 5) * (Math.PI * 2)) / numStars) * radius,
              ]}
              scale={0.1}
              hover={star1Hover}
              setHover={setStar1Hover}
            />
          );
        } else {
          tiles.push(
            <Star
              position={[
                Math.sin(((i - 5) * (Math.PI * 2)) / numStars) * radius,
                0,
                Math.cos(((i - 5) * (Math.PI * 2)) / numStars) * radius,
              ]}
              scale={0.1}
            />
          );
        }
      }
    }

    //shortcuts
    const radiusShortcut1 = 1.3;
    const radiusShortcut2 = 0.6;
    for (let i = 0; i < numStars; i++) {
      if (i == 0 || i == 5 || i == 10 || i == 15) {
        tiles.push(
          <Star
            position={[
              Math.sin(((i + 5) * (Math.PI * 2)) / numStars) * radiusShortcut1,
              0,
              Math.cos(((i + 5) * (Math.PI * 2)) / numStars) * radiusShortcut1,
            ]}
            scale={0.1}
          />
        );
        tiles.push(
          <Star
            position={[
              Math.sin(((i + 5) * (Math.PI * 2)) / numStars) * radiusShortcut2,
              0,
              Math.cos(((i + 5) * (Math.PI * 2)) / numStars) * radiusShortcut2,
            ]}
            scale={0.1}
          />
        );
      }
    }

    return tiles;
  }

  return (
    <>
      <color args={["#313557"]} attach="background" />
      {/* <CameraControls /> */}

      <directionalLight position={[1, 10, 3]} intensity={1.3} castShadow />
      <ambientLight intensity={0.5} />

      <Physics debug maxVelocityIterations={10}>
        <RigidBody
          type="fixed"
          restitution={0.01}
          position={[0, -1, 0]}
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
        {/* <Background />
        <Scene /> */}
      </Physics>
    </>
  );
}
