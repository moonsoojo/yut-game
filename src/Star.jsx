import { useGLTF } from "@react-three/drei";
import Rocket from "./Rocket";
import Ufo from "./Ufo";
import React from "react";
import { useRef } from "react";
// import { useRocketStore } from "./state/zstore";
import { useRocketStore } from "./state/zstore2";

export default function Star({ position, tile }) {
  const { nodes, materials } = useGLTF(
    `/models/stars/star-yellow copy ${tile}.glb`
  );

  const setSelection = useRocketStore((state) => state.setSelection);
  const selection = useRocketStore((state) => state.selection);
  const setPiece = useRocketStore((state) => state.setPiece);
  const tiles = useRocketStore((state) => state.tiles);
  const starMatRef = useRef();
  const wrapperMatRef = useRef();

  //draw a circle with hover, and through shortcuts
  function handlePointerEnter(event) {
    event.stopPropagation();
    document.body.style.cursor = "pointer";
    // starMatRef.current.color.r -= 1;
    // starMatRef.current.color.g -= 0.5;
    wrapperMatRef.current.opacity += 0.5;
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    document.body.style.cursor = "default";
    // starMatRef.current.color.r += 1;
    // starMatRef.current.color.g += 0.5;
    wrapperMatRef.current.opacity -= 0.5;
  }

  function handlePointerDown(event) {
    event.stopPropagation();
    if (selection == null) {
      setSelection({ type: "tile", tile });
    } else {
      setPiece({ destination: tile });
      setSelection(null);
    }
  }

  const rocketPositions = [
    [0, 0.2, 0 * 0.3],
    [0, 0.2, -1 * 0.3],
    [-0.3, 0.2, 0 * 0.3],
    [-0.3, 0.2, -1 * 0.3],
  ];

  const ufoPositions = [
    [0, -0.1, 1 * 0.3],
    [0, -0.1, -1 * 0.3],
    [-0.3, -0.1, 1 * 0.3],
    [-0.3, -0.1, -1 * 0.3],
  ];

  function Piece() {
    if (tiles[tile][0].team == 1) {
      return (
        <>
          {tiles[tile].map((value, index) => (
            <Rocket
              position={rocketPositions[index]}
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
              position={ufoPositions[index]}
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
    <group
      position={position}
      scale={
        selection != null && selection.type === "tile" && selection.tile == tile
          ? 1.5
          : 1
      }
    >
      <mesh
        onPointerDown={(event) => handlePointerDown(event)}
        onPointerEnter={(e) => handlePointerEnter(e)}
        onPointerLeave={(e) => handlePointerLeave(e)}
      >
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial transparent opacity={0} ref={wrapperMatRef} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star.geometry}
        scale={0.15}
      >
        <meshStandardMaterial color={"yellow"} ref={starMatRef} />
      </mesh>
      {tiles[tile].length != 0 && <Piece />}
    </group>
  );
}
