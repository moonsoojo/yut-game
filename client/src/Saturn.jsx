import { useGLTF } from "@react-three/drei";
import { useSelector, useDispatch } from "react-redux";
import { placePiece } from "./state/gameSlice.js";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import React from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useLoader } from "@react-three/fiber";
import { useRocketStore } from "./state/zstore2";
// import { selectionAtom, socket } from "./SocketManager";
import { useAtom } from "jotai";

import Rocket from "./Rocket";
import Ufo from "./Ufo";
import HelperArrow from "./HelperArrow";

export default function Saturn({ position, tile, scale }) {
  const { nodes, materials } = useGLTF("/models/Saturn 3.glb");
  const satelliteTexture1 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-1.jpg"
  );
  const satelliteTexture2 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-2.jpg"
  );
  const satelliteTexture3 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-3.jpg"
  );
  const satelliteTexture4 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-4.jpg"
  );
  const satelliteTexture5 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-5.jpg"
  );
  const satelliteTexture6 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-6.jpg"
  );
  const satelliteTexture7 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-7.jpg"
  );

  const setSelection = useRocketStore((state) => state.setSelection);
  const selection = useRocketStore((state) => state.selection);
  // const [selection] = useAtom(selectionAtom);
  const setPiece = useRocketStore((state) => state.setPiece);
  const tiles = useRocketStore((state) => state.tiles);

  const saturnRef = useRef();
  const satellitesRef = useRef();
  const wrapperMatRef = useRef();

  useFrame((state, delta) => {
    // saturnRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    satellitesRef.current.rotation.x = state.clock.elapsedTime * 0.5;
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
      // socket.emit("select", { type: "tile", tile });
    } else {
      if (selection.tile != tile) {
        setPiece({ destination: tile });
      }
      setSelection(null);
      // socket.emit("select", null);
    }
  }

  const rocketPositions = [
    [0, 0.6, 0],
    [0, 0.6, -0.3],
    [-0.3, 0.65, -0.1],
    [-0.3, 0.65, -0.4],
  ];

  const ufoPositions = [
    [0.1, 0.4, 0.2],
    [0.1, 0.4, -0.2],
    [-0.3, 0.4, 0.2],
    [-0.3, 0.4, -0.2],
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

  function SaturnWrap() {
    return (
      <mesh
        castShadow
        visible={true}
        onPointerDown={(event) => handlePointerDown(event)}
        onPointerEnter={(event) => handlePointerEnter(event)}
        onPointerLeave={(event) => handlePointerLeave(event)}
      >
        <sphereGeometry args={[3.5, 32, 16]} />
        <meshStandardMaterial transparent opacity={0} ref={wrapperMatRef} />
      </mesh>
    );
  }

  return (
    <group
      position={position}
      scale={
        selection != null && selection.type === "tile" && selection.tile == tile
          ? 1.3
          : 1
      }
    >
      {tiles[tile].length != 0 && <Piece />}
      <group scale={0.22}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={materials["Saturn 2"]}
          ref={saturnRef}
        >
          <group scale={0.625}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_1.geometry}
              material={materials["Material.003"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_2.geometry}
              material={materials["Material.004"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_3.geometry}
              material={materials["Material.005"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_4.geometry}
              material={materials["Material.006"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_5.geometry}
              material={materials["Material.007"]}
            />
          </group>
          <group ref={satellitesRef} scale={5}>
            <mesh position={[0, 0.5, 0]}>
              <sphereGeometry args={[0.05, 32, 32]} />
              <meshStandardMaterial color={"#A59272"} map={satelliteTexture1} />
            </mesh>
            <mesh
              position={[
                0,
                Math.cos(Math.PI / 4) * 0.5,
                Math.sin(Math.PI / 4) * 0.5,
              ]}
            >
              <sphereGeometry args={[0.04, 32, 32]} />
              <meshStandardMaterial color={"#7A7974"} map={satelliteTexture2} />
            </mesh>
            <mesh
              position={[
                0,
                Math.cos((7 * Math.PI) / 16) * 0.5,
                Math.sin((7 * Math.PI) / 16) * 0.5,
              ]}
            >
              <sphereGeometry args={[0.03, 32, 32]} />
              <meshStandardMaterial color={"#A9ABA8"} map={satelliteTexture3} />
            </mesh>
            <mesh
              position={[
                0,
                Math.cos((16 * Math.PI) / 16) * 0.5,
                Math.sin((16 * Math.PI) / 16) * 0.5,
              ]}
            >
              <sphereGeometry args={[0.03, 32, 32]} />
              <meshStandardMaterial color={"#B0B0B0"} map={satelliteTexture4} />
            </mesh>
            <mesh
              position={[
                0,
                Math.cos((19 * Math.PI) / 16) * 0.5,
                Math.sin((19 * Math.PI) / 16) * 0.5,
              ]}
            >
              <sphereGeometry args={[0.025, 32, 32]} />
              <meshStandardMaterial color={"#9D9E98"} map={satelliteTexture5} />
            </mesh>
            <mesh
              position={[
                0,
                Math.cos((22 * Math.PI) / 16) * 0.5,
                Math.sin((22 * Math.PI) / 16) * 0.5,
              ]}
            >
              <sphereGeometry args={[0.02, 32, 32]} />
              <meshStandardMaterial color={"#8F8F8F"} map={satelliteTexture6} />
            </mesh>
            <mesh
              position={[
                0,
                Math.cos((24 * Math.PI) / 16) * 0.5,
                Math.sin((24 * Math.PI) / 16) * 0.5,
              ]}
            >
              <sphereGeometry args={[0.015, 32, 32]} />
              <meshStandardMaterial color={"#8F8F8F"} map={satelliteTexture7} />
            </mesh>
          </group>
        </mesh>

        <SaturnWrap />
      </group>
      <HelperArrow
        position={[0.5, 0, 0.5]}
        rotation={[Math.PI / 2, 0, -Math.PI / 4]}
        scale={0.9}
      />
      <HelperArrow
        position={[0.5, 0, -0.5]}
        rotation={[Math.PI / 2, 0, (-Math.PI * 3) / 4]}
        scale={0.9}
      />
    </group>
  );
}

useGLTF.preload("/models/Saturn 3.glb");
