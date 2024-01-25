import React from "react";
import Piece from "../components/Piece";
import { animated, useSpring } from "@react-spring/three";
import { Text3D } from "@react-three/drei";

export default function MoveDetails() {
  // 2 steps - 1, 2
  // cannot cut across mars
  // you can if you start from the planet.
  let direction0position0 = [
    -Math.cos(((0 - 7.5) * (Math.PI * 2)) / 20) * 4,
    0.5,
    Math.sin(((0 - 7.5) * (Math.PI * 2)) / 20) * 4,
  ];
  let direction0position1 = [
    -Math.cos(((1 - 7.5) * (Math.PI * 2)) / 20) * 4,
    0.5,
    Math.sin(((1 - 7.5) * (Math.PI * 2)) / 20) * 4,
  ];
  let direction0position2 = [
    -Math.cos(((2 - 7.5) * (Math.PI * 2)) / 20) * 4,
    0.5,
    Math.sin(((2 - 7.5) * (Math.PI * 2)) / 20) * 4,
  ];
  let direction1position0 = [
    -Math.cos(((5 - 7.5) * (Math.PI * 2)) / 20) * 4,
    0.5,
    Math.sin(((5 - 7.5) * (Math.PI * 2)) / 20) * 4,
  ];
  let direction1position1 = [
    -Math.cos(((5 - 7.5) * (Math.PI * 2)) / 20) * 2.66,
    0.5,
    Math.sin(((5 - 7.5) * (Math.PI * 2)) / 20) * 2.66,
  ];
  let direction1position2 = [
    -Math.cos(((5 - 7.5) * (Math.PI * 2)) / 20) * 1.33,
    0.5,
    Math.sin(((5 - 7.5) * (Math.PI * 2)) / 20) * 1.33,
  ];
  let direction2position0 = [
    -Math.cos(((9 - 7.5) * (Math.PI * 2)) / 20) * 4,
    0.5,
    Math.sin(((9 - 7.5) * (Math.PI * 2)) / 20) * 4,
  ];
  let direction2position1 = [
    -Math.cos(((10 - 7.5) * (Math.PI * 2)) / 20) * 4,
    0.5,
    Math.sin(((10 - 7.5) * (Math.PI * 2)) / 20) * 4,
  ];
  let direction2position2 = [
    -Math.cos(((11 - 7.5) * (Math.PI * 2)) / 20) * 4,
    0.5,
    Math.sin(((11 - 7.5) * (Math.PI * 2)) / 20) * 4,
  ];
  const { direction0Position } = useSpring({
    from: {
      direction0Position: direction0position0,
    },
    to: [
      {
        direction0Position: direction0position1,
      },
      {
        direction0Position: direction0position2,
      },
    ],
    config: {
      mass: 2,
      tension: 100,
      friction: 36,
    },
    loop: true,
  });
  const { direction0ScaleStep1 } = useSpring({
    from: {
      direction0ScaleStep1: 0.01,
    },
    to: [
      {
        direction0ScaleStep1: 1,
      },
      {
        direction0ScaleStep1: 0.02,
      },
    ],
    config: {
      mass: 2,
      tension: 100,
      friction: 36,
    },
    loop: true,
  });
  const { direction0ScaleStep2 } = useSpring({
    from: {
      direction0ScaleStep2: 0.01,
    },
    to: [
      {
        direction0ScaleStep2: 0.02,
      },
      {
        direction0ScaleStep2: 1,
      },
    ],
    config: {
      mass: 2,
      tension: 100,
      friction: 36,
    },
    loop: true,
  });

  const { direction1Position } = useSpring({
    from: {
      direction1Position: direction1position0,
    },
    to: [
      {
        direction1Position: direction1position1,
      },
      {
        direction1Position: direction1position2,
      },
    ],
    config: {
      mass: 2,
      tension: 100,
      friction: 36,
    },
    loop: true,
  });

  const { direction2Position } = useSpring({
    from: {
      direction2Position: direction2position0,
    },
    to: [
      {
        direction2Position: direction2position1,
      },
      {
        direction2Position: direction2position2,
      },
    ],
    config: {
      mass: 2,
      tension: 100,
      friction: 36,
    },
    loop: true,
  });
  const { direction2ScaleStep1 } = useSpring({
    from: {
      direction2ScaleStep1: 0.01,
    },
    to: [
      {
        direction2ScaleStep1: 1,
      },
      {
        direction2ScaleStep1: 0.02,
      },
    ],
    config: {
      mass: 2,
      tension: 100,
      friction: 36,
    },
    loop: true,
  });
  const { direction2ScaleStep2 } = useSpring({
    from: {
      direction2ScaleStep2: 0.01,
    },
    to: [
      {
        direction2ScaleStep2: 0.02,
      },
      {
        direction2ScaleStep2: 1,
      },
    ],
    config: {
      mass: 2,
      tension: 100,
      friction: 36,
    },
    loop: true,
  });

  return (
    <>
      <group>
        <animated.group scale={direction0ScaleStep1} position={[1.2, 0, -2.5]}>
          <Text3D
            rotation={[0, Math.PI / 2, 0]}
            height={0.01}
            size={0.3}
            font="./fonts/Luckiest Guy_Regular.json"
          >
            1
            <meshStandardMaterial color="yellow" />
          </Text3D>
        </animated.group>
        <animated.group scale={direction0ScaleStep2} position={[0.6, 0, -3]}>
          <Text3D
            rotation={[0, Math.PI / 2, 0]}
            height={0.01}
            size={0.3}
            font="./fonts/Luckiest Guy_Regular.json"
          >
            2
            <meshStandardMaterial color="yellow" />
          </Text3D>
        </animated.group>
        <Text3D
          position={[1.5, 0, -4]}
          rotation={[0, Math.PI / 2, 0]}
          height={0.01}
          size={0.25}
          font="./fonts/Luckiest Guy_Regular.json"
        >
          Start from Earth. &#10; This is 2-steps (Ge).
          <meshStandardMaterial color="yellow" />
        </Text3D>
        <animated.group>
          <Ufo
            tile={-1}
            position={direction0Position}
            scale={0.5}
            rotation={[0, 0, -Math.PI / 4]}
          />
        </animated.group>
      </group>
      <group>
        <Text3D
          position={[-5, 0, -2]}
          rotation={[0, Math.PI / 2, 0]}
          height={0.01}
          size={0.25}
          font="./fonts/Luckiest Guy_Regular.json"
        >
          Cut through the middle &#10; from planets.
          <meshStandardMaterial color="yellow" />
        </Text3D>
        <animated.group>
          <Piece
            tile={-1}
            team={1}
            position={direction1Position}
            scale={0.5}
            rotation={[0, 0, -Math.PI / 4]}
          />
        </animated.group>
      </group>
      <group>
        <animated.group scale={direction2ScaleStep1} position={[-4, 0, 3.5]}>
          <Text3D
            rotation={[0, Math.PI / 2, 0]}
            height={0.01}
            size={0.3}
            font="./fonts/Luckiest Guy_Regular.json"
          >
            1
            <meshStandardMaterial color="yellow" />
          </Text3D>
        </animated.group>
        <animated.group scale={direction2ScaleStep2} position={[-3, 0, 4.5]}>
          <Text3D
            rotation={[0, Math.PI / 2, 0]}
            height={0.01}
            size={0.3}
            font="./fonts/Luckiest Guy_Regular.json"
          >
            2
            <meshStandardMaterial color="yellow" />
          </Text3D>
        </animated.group>
        <Text3D
          position={[-5, 0, 5]}
          rotation={[0, Math.PI / 2, 0]}
          height={0.01}
          size={0.25}
          font="./fonts/Luckiest Guy_Regular.json"
        >
          You can't cut in the same move.
          <meshStandardMaterial color="yellow" />
        </Text3D>
        <animated.group>
          <Ufo
            tile={-1}
            position={direction2Position}
            scale={0.5}
            rotation={[0, 0, -Math.PI / 4]}
          />
        </animated.group>
      </group>
    </>
  );
}
