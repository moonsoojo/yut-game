import React from "react";
import Piece from "./components/Piece";
import { animated, useSpring } from "@react-spring/three";
import { Text3D } from "@react-three/drei";

export default function ScoreDetails() {
  let direction0position0 = [
    -Math.cos(((19 - 7.5) * (Math.PI * 2)) / 20) * 4,
    0.5,
    Math.sin(((19 - 7.5) * (Math.PI * 2)) / 20) * 4,
  ];
  let direction0position1 = [
    -Math.cos(((20 - 7.5) * (Math.PI * 2)) / 20) * 4,
    0.5,
    Math.sin(((20 - 7.5) * (Math.PI * 2)) / 20) * 4,
  ];
  let direction0position2 = [
    -Math.cos(((20 - 7.5) * (Math.PI * 2)) / 20) * 4 + 1.5,
    0.5,
    Math.sin(((20 - 7.5) * (Math.PI * 2)) / 20) * 4,
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
  return (
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
      <animated.group scale={direction0ScaleStep2} position={[4.5, 0, -2]}>
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
        You must pass &#10;Earth to finish.
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
  );
}
