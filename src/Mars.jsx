import { useGLTF } from "@react-three/drei";
import Rocket from "./Rocket";
import Ufo from "./Ufo";
import { useSelector, useDispatch } from "react-redux";
import { placePiece } from "./state/gameSlice.js";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import React from "react";
import { useRocketStore } from "./state/zstore2";

export default function Mars({ position, tile }) {
  const { nodes, materials } = useGLTF("/models/Mars 4.glb");

  const setSelection = useRocketStore((state) => state.setSelection);
  const selection = useRocketStore((state) => state.selection);
  const setPiece = useRocketStore((state) => state.setPiece);
  const tiles = useRocketStore((state) => state.tiles);

  const marsRef = useRef();
  const wrapperMatRef = useRef();

  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime;
    marsRef.current.rotation.y = elapsedTime * 0.5;
  });

  function handlePointerEnter(event) {
    event.stopPropagation();
    document.body.style.cursor = "pointer";
    // earth1Ref.current.material.color.r += 0.1;
    // waterMatRef.current.color.r += 1;
    wrapperMatRef.current.opacity += 0.5;
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    document.body.style.cursor = "default";
    // earth1Ref.current.material.color.r -= 0.1;
    // waterMatRef.current.color.r -= 1;
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
    [0, 0.5, 0 * 0.3],
    [0, 0.5, -1 * 0.3],
    [-0.3, 0.5, 0 * 0.3],
    [-0.3, 0.5, -1 * 0.3],
  ];

  const ufoPositions = [
    [0, 0.3, 1 * 0.3],
    [0, 0.3, -1 * 0.3],
    [-0.3, 0.3, 1 * 0.3],
    [-0.3, 0.3, -1 * 0.3],
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
      {tiles[tile].length != 0 && <Piece />}
      <mesh
        onPointerEnter={(event) => handlePointerEnter(event)}
        onPointerDown={(event) => handlePointerDown(event)}
        onPointerLeave={(event) => handlePointerLeave(event)}
      >
        <sphereGeometry args={[0.6]} />
        <meshStandardMaterial transparent opacity={0} ref={wrapperMatRef} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mars.geometry}
        material={materials.Mars}
        scale={0.25}
        onPointerDown={(event) => handlePointerDown(event)}
        ref={marsRef}
      />
    </group>
  );
}
