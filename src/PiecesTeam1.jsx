import React from "react";
import { useRocketStore } from "./state/zstore";

import Rocket from "./Rocket";

export default function PiecesTeam1() {
  console.log("[PiecesTeam1]");
  const pieces = useRocketStore((state) => state.pieces);
  return (
    <>
      {/* {pieces[1].map(
        (value, index) =>
          value.tile === -1 && (
            <Rocket
              position={[2.5, 0, -4 + index * 0.5]}
              keyName={`count${index}`}
              tile={-1}
              team={1}
              id={value.id}
              key={index}
            />
          )
      )} */}
      {/* <Rocket
        position={[2.5, 0, -4 + 0 * 0.5]}
        keyName={`count${0}`}
        tile={-1}
        team={1}
        id={0}
        key={0}
      /> */}
      <Rocket
        position={[2.5, 0, -4 + 1 * 0.5]}
        keyName={`count${1}`}
        tile={-1}
        team={1}
        id={1}
        key={1}
      />
      {/* {[...Array(scores[1])].map((value, index) => (
        <mesh position={[3.1, 0, -3 + index * 0.4]} keyName={`count${index}`}>
          <sphereGeometry args={[0.1, 32, 16]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      ))} */}
    </>
  );
}
