import React from "react";
import HelperArrow from "./HelperArrow";
import { Text3D } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function GoalDetails({ tileRadius, numStars }) {
  let camera = useThree((state) => state.camera);
  console.log(camera.position);

  function Arrows() {
    let arrows = [];
    //circle
    for (let i = 0; i < numStars; i++) {
      // let fix;
      // if (i == 15) {
      //   fix = 0.2;
      // } else {
      //   fix = 0;
      // }
      let position = [
        -Math.cos(
          ((i - 10) * (Math.PI * 2)) / numStars +
            (Math.PI * 2) / numStars / 2 -
            Math.PI / 20
        ) * tileRadius,
        0,
        Math.sin(
          ((i - 10) * (Math.PI * 2)) / numStars +
            (Math.PI * 2) / numStars / 2 -
            Math.PI / 20
        ) * tileRadius,
      ];
      arrows.push(
        <HelperArrow
          key={i}
          position={position}
          rotation={[0, ((Math.PI * 2) / numStars) * (i - 5), Math.PI / 2]}
          color="white"
        />
      );
    }

    return arrows;
  }

  return (
    <>
      <Text3D
        font="./fonts/Luckiest Guy_Regular.json"
        size={0.3}
        height={0.01}
        position={[2.7, 0.7, -2.2]}
        rotation={[0, Math.PI / 2, 0]}
      >
        Start
        <meshStandardMaterial color="yellow" />
      </Text3D>
      <Text3D
        font="./fonts/Luckiest Guy_Regular.json"
        size={0.3}
        height={0.01}
        position={[2.7, -1, -2.2]}
        rotation={[0, Math.PI / 2, 0]}
      >
        Finish
        <meshStandardMaterial color="yellow" />
      </Text3D>
      <Text3D
        position={[-5, 0, 6]}
        rotation={[0, Math.PI / 2, 0]}
        font="./fonts/Luckiest Guy_Regular.json"
        castShadow={false}
        size={0.3}
        height={0.01}
        receiveShadow
      >
        Make a circle from Earth to Earth around the solar system.
        <meshStandardMaterial color="yellow" />
      </Text3D>
      <Arrows />
    </>
  );
}
