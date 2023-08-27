import { useGLTF } from "@react-three/drei";
import Rocket from "./Rocket";
import Ufo from "./Ufo";
import React from "react";
import { useRef, useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useFrame, useGraph } from "@react-three/fiber";
// import { useRocketStore } from "./state/zstore";
import { useRocketStore } from "./state/zstore2";
// import { selectionAtom, tilesAtom, socket } from "./SocketManager";
import { useAtom } from "jotai";

export default function Star({
  position,
  tile,
  color = "yellow",
  scale = 1,
  isDecoration = false,
}) {
  const { scene, materials, animations } = useGLTF(
    "/models/stars/star-yellow copy 1.glb"
  );

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const setSelection = useRocketStore((state) => state.setSelection);
  const selection = useRocketStore((state) => state.selection);
  // const [selection] = useAtom(selectionAtom);
  // const [tiles] = useAtom(tilesAtom);
  const setPiece = useRocketStore((state) => state.setPiece);
  const tiles = useRocketStore((state) => state.tiles);
  const starMatRef = useRef();
  const wrapperMatRef = useRef();
  const star = useRef();

  // useFrame((state, delta) => {
  //   if (tile < 20) {
  //     star.current.position.y =
  //       position[1] +
  //       Math.sin(state.clock.elapsedTime * 2 + 0.5 * tile) * -0.05;
  //   }
  // });

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
      // socket.emit("select", { type: "tile", tile });
    } else {
      if (selection.tile != tile) {
        setPiece({ destination: tile });
        // socket.emit("placePiece", tile);
      }
      setSelection(null);
      // socket.emit("select", null);
    }
  }

  const rocketPositions = [
    [-0.1, 0.4, 0],
    [-0.1, 0.4, -0.3],
    [-0.4, 0.4, 0],
    [-0.4, 0.4, -0.3],
  ];

  const ufoPositions = [
    [0.1, 0.3, 0.1],
    [0.1, 0.3, -0.3],
    [-0.3, 0.2, 0.1],
    [-0.3, 0.2, -0.3],
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
      ref={star}
      position={position}
      scale={
        !isDecoration &&
        selection != null &&
        selection.type === "tile" &&
        selection.tile == tile
          ? scale * 1.3
          : scale * 1
      }
    >
      {!isDecoration && (
        <mesh
          onPointerDown={(event) => handlePointerDown(event)}
          onPointerEnter={(e) => handlePointerEnter(e)}
          onPointerLeave={(e) => handlePointerLeave(e)}
        >
          <sphereGeometry args={[0.6]} />
          <meshStandardMaterial transparent opacity={0} ref={wrapperMatRef} />
        </mesh>
      )}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star.geometry}
        scale={0.15}
      >
        <meshStandardMaterial color={color} ref={starMatRef} />
      </mesh>
      {tile && tiles[tile].length != 0 && <Piece />}
    </group>
  );
}

useGLTF.preload(`/models/stars/star-yellow copy 1.glb`);
