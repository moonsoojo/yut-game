import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { useRocketStore } from "./state/zstore";
import React from "react";

export default function Rocket({ position, tile, team, id }) {
  const { nodes, materials } = useGLTF(
    `/models/rockets/rocket-with-astronaut${id}.glb`
  );

  const setSelection = useRocketStore((state) => state.setSelection);
  const selection = useRocketStore((state) => state.selection);

  // const [active, setActive] = useState(false); // doesn't reset animation
  const rocketRef = useRef();
  const flameRef = useRef();
  const rocketPart1Ref = useRef();

  useFrame((state, delta) => {
    if (tile >= 0) {
      flameRef.current.scale.y =
        4 + Math.sin(state.clock.elapsedTime * 10) * 0.7;
      rocketRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.07;
    }
  });

  function handlePointerEnter(event) {
    event.stopPropagation();
    if (tile == -1) {
      rocketPart1Ref.current.material.color.r += 2;
    }
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    if (tile == -1) {
      rocketPart1Ref.current.material.color.r -= 2;
    }
  }

  function handlePointerDown(event) {
    event.stopPropagation();
    if (tile == -1) {
      console.log("[Rocket][handlePointerDown]");
      if (selection == null) {
        setSelection({ type: "piece", tile, team, id });
      } else {
        setSelection(null);
      }
    }
  }

  const wrapPosition = [0, -0.2, +0.2];
  return (
    <group
      position={position}
      ref={rocketRef}
      dispose={null}
      scale={
        selection != null && selection[0].team == 1 && selection[0].id == id ? 1.5 : 1
      }
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
        <capsuleGeometry args={[0.15, 0.3]} />
        <meshBasicMaterial transparent opacity={0.1} />
      </mesh>
      <group rotation={[(Math.PI * 3) / 4, 0, -Math.PI]} scale={0.009}>
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
