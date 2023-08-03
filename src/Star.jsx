import { useGLTF } from "@react-three/drei";
import Rocket from "./Rocket";
import Ufo from "./Ufo";
import React from "react";
import { useRef } from "react";
import { useRocketStore } from "./state/zstore";

export default function Star({ position, tile }) {
  const { nodes, materials } = useGLTF(
    `/models/stars/star-yellow copy ${tile}.glb`
  );

  const setSelection = useRocketStore((state) => state.setSelection);
  const selection = useRocketStore((state) => state.selection);
  const setPiece = useRocketStore((state) => state.setPiece);
  const tiles = useRocketStore((state) => state.tiles);
  const starMatRef = useRef();

  function handlePointerDown(event) {
    event.stopPropagation();
    if (selection != null) {
      setPiece({ tile, team: selection.team, id: selection.id });
      setSelection(null);
    } else {
      console.log("[Star]", selection);
      // setSelection({ type: "tile", tile });
      // if tile is selected, and component's tile matches the selected tile, enlarge it (will enlarge its pieces too)
      //clicking on star keeps resetting the animation
    }
  }

  //draw a circle with hover, and through shortcuts
  function handlePointerEnter(event) {
    event.stopPropagation();
    starMatRef.current.color.r -= 1;
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    starMatRef.current.color.r += 1;
  }

  function Piece() {
    let position2Start = -0.2 + tiles[tile].length * 0.05;
    if (tiles[tile][0].team == 1) {
      return (
        <>
          {tiles[tile].map((value, index) => (
            <Rocket
              position={[0, 0.7, position2Start - index * 0.3]}
              keyName={`count${index}`}
              tile={tile}
              team={1}
              id={value.id}
              key={index}
            />
          ))}
        </>
      );
    } else {
      return (
        <>
          {tiles[tile].map((value, index) => (
            <Ufo
              position={[0, 0.7, position2Start - index * 0.3]}
              keyName={`count${index}`}
              tile={tile}
              team={0}
              id={value.id}
              key={index}
            />
          ))}
        </>
      );
    }
  }

  return (
    <group position={position}>
      <mesh
        onPointerDown={(event) => handlePointerDown(event)}
        onPointerEnter={(e) => handlePointerEnter(e)}
        onPointerLeave={(e) => handlePointerLeave(e)}
      >
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial transparent opacity={0.1} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.star.geometry} scale={0.1}>
        <meshStandardMaterial color={"yellow"} ref={starMatRef} />
      </mesh>
      {tiles[tile].length != 0 && <Piece />}
    </group>
  );
}
