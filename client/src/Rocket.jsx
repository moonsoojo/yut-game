import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import { selectionAtom, teamsAtom, turnAtom, socket, gamePhaseAtom, clientTeamAtom, socketIdAtom, legalTilesAtom } from "./SocketManager";
import { useAtom } from "jotai";
import React from "react";

function hasMove(team) {
  let flag = false;
  for (let move in team.moves) {
    if (team.moves[move] > 0) {
      flag = true;
      break;
    }
  }
  return flag
}

function isMyTurn(turn, teams, socketId) {
  if (teams[turn.team].players[turn.players[turn.team]].socketId === socketId) {
    return true
  } else {
    return false
  }
}

export default function Rocket({
  position,
  rotation,
  tile,
  team,
  id,
  scale = 1,
}) {
  const { scene, materials, animations } = useGLTF(
    "/models/rockets/rocket-with-astronaut0.glb"
  );

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
  const [selection] = useAtom(selectionAtom);
  const [teams] = useAtom(teamsAtom);
  const [turn] = useAtom(turnAtom);
  const [gamePhase] = useAtom(gamePhaseAtom)
  const [clientTeam] = useAtom(clientTeamAtom)
  const [socketId] = useAtom(socketIdAtom);
  const [_legalTiles, setLegalTiles] = useAtom(legalTilesAtom);
  // use selection.tile and teams[turn.team].moves to calculate where piece can go
  // track legalTiles in Tile to see if it should be highlighted

  // on tile, both tile and piece should be clickable
  // add calculateLegalTiles logic to both tile and piece

  // on rocket click, if there is selection, move to it
  // if there isn't, use its tile to set legal tiles
  // on move, select all content in the tiles array at tile index
  

  const rocketRef = useRef();
  const flameRef = useRef();
  const rocketPart1Ref = useRef();
  const wrapperMatRef = useRef();

  scale = selection != null &&
  selection.type === "piece" &&
  selection.team == 1 &&
  selection.id == id
    ? scale * 1.5
    : scale

  const adjustedPosition = [position[0], position[1] + 0.2, position[2] - 0.5];
  useFrame((state, delta) => {
    if (tile >= 0) {
      flameRef.current.scale.y = 4 + Math.sin(state.clock.elapsedTime * 10) * 0.7;
      // rocketRef.current.position.y = adjustedPosition[1] + Math.sin(state.clock.elapsedTime * 3) * 0.07;
    }
    if (gamePhase === "game" && clientTeam == 0 && isMyTurn(turn, teams, socketId) && hasMove(teams[0])) {
      rocketRef.current.scale.x = scale + Math.cos(state.clock.elapsedTime * 2.5) * 0.08 + (0.08 / 2)
      rocketRef.current.scale.y = scale + Math.cos(state.clock.elapsedTime * 2.5) * 0.08 + (0.08 / 2)
      rocketRef.current.scale.z = scale + Math.cos(state.clock.elapsedTime * 2.5) * 0.08 + (0.08 / 2)
      wrapperMatRef.current.color.g = (Math.cos(state.clock.elapsedTime * 2.5) - 1)
      wrapperMatRef.current.opacity = Math.cos(state.clock.elapsedTime * 2.5) * 0.2
    }
  });

  function handlePointerEnter(event) {
    if (tile == -1) {
      // rocketPart1Ref.current.material.color.r += 2;
      event.stopPropagation();
      wrapperMatRef.current.opacity += 0.4;
      document.body.style.cursor = "pointer";
    }
  }

  function handlePointerLeave(event) {
    if (tile == -1) {
      // rocketPart1Ref.current.material.color.r -= 2;
      event.stopPropagation();
      wrapperMatRef.current.opacity -= 0.4;
      document.body.style.cursor = "default";
    }
  }

  function handlePointerDown(event) {
    if (tile == -1 && gamePhase === "game" && hasMove(teams[0])) {
      event.stopPropagation();
      if (selection == null) {
        // setSelection({ type: "piece", tile, team, id });
        socket.emit("select", { type: "piece", tile, team, id });
      } else {
        // setSelection(null);
        socket.emit("select", null);
      }
    }
  }

  const wrapPosition = [0, -0.4, 0.4];

  return (
    <group
      position={adjustedPosition}
      ref={rocketRef}
      dispose={null}
      scale={scale}
      rotation={rotation}
    >
      <mesh
        castShadow
        position={wrapPosition}
        visible={true}
        rotation={[-Math.PI / 4, 0, 0]}
        onPointerDown={(event) => handlePointerDown(event)}
        onPointerOver={(event) => handlePointerEnter(event)}
        onPointerLeave={(event) => handlePointerLeave(event)}
      >
        <capsuleGeometry args={[0.4, 0.6]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          ref={wrapperMatRef}
        />
      </mesh>
      <group scale={0.02} rotation={[(Math.PI * 3) / 4, 0, -Math.PI]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle007.geometry}
          material={materials["Ship White"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle007_1.geometry}
          material={materials["Ship red"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle007_2.geometry}
          material={materials["Alien Black"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle003.geometry}
          material={materials["Ship red"]}
          position={[-6.703, -24.668, -6.925]}
          rotation={[0.806, -0.595, 2.119]}
          scale={18.152}
          ref={rocketPart1Ref}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle005.geometry}
          material={materials["Ship red"]}
          position={[0.008, -48.617, 12.536]}
          rotation={[0.009, -1.571, 0]}
          scale={[1.225, 1.376, 1.225]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle006.geometry}
          material={materials["Ship red"]}
          position={[12.544, -48.617, 0]}
          rotation={[0, 0, -0.009]}
          scale={[1.225, 1.376, 1.225]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle008.geometry}
          material={materials["Astronaut red"]}
          position={[-8.273, -26.198, -2.835]}
          rotation={[0.634, 0.103, Math.PI / 2]}
          scale={0.33}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={nodes.Cube.material}
          position={[-7.987, -26.625, -3.186]}
          rotation={[0.634, -1.467, Math.PI / 2]}
          scale={8.171}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={materials["Ship red"]}
          position={[0.008, -43.911, 6.028]}
          rotation={[0.702, 0, Math.PI / 2]}
          scale={13.763}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere.geometry}
          material={materials.Fire}
          position={[0.008, -50.335, 0]}
          rotation={[0.024, 1.289, 0]}
          scale={3.393}
          ref={flameRef}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001.geometry}
          material={materials["Ship red"]}
          position={[6.036, -43.911, 0]}
          rotation={[Math.PI / 2, 0.869, 0]}
          scale={13.763}
        />
        <group
          position={[-6.539, -22.012, -9.453]}
          rotation={[-0.936, -Math.PI / 2, 0]}
          scale={4.202}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube006_1.geometry}
            material={materials.Black}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube006_2.geometry}
            material={materials["Astro White"]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Roundcube007.geometry}
          material={materials["Astro White"]}
          position={[-6.539, -18.893, -7.157]}
          rotation={[-0.936, -1.571, 0]}
          scale={[-0.79, -1.12, -1.12]}
        />
        <group
          position={[-5.718, -24.503, -6.068]}
          rotation={[-0.936, -Math.PI / 2, 0]}
          scale={[2.608, 2.608, 2.062]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube008_1.geometry}
            material={materials["Astronaut red"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube008_2.geometry}
            material={materials["Astro White"]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Roundcube009.geometry}
          material={materials["Astro White"]}
          position={[-5.718, -26.617, -3.197]}
          rotation={[-0.936, -Math.PI / 2, 0]}
          scale={[2.548, 2.548, 2.014]}
        />
        <group
          position={[-5.718, -27.179, -2.433]}
          rotation={[-0.936, -Math.PI / 2, 0]}
          scale={10.73}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube010_1.geometry}
            material={materials["Astronaut red"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube010_2.geometry}
            material={materials["Astro White"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/rockets/rocket-with-astronaut0.glb");
