import { useRef } from "react";
import { useThree, extend, useFrame } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RigidBody, Physics } from "@react-three/rapier";
import Yuts from "./Yuts";

extend({ OrbitControls });

export default function Experience() {
  const { camera, gl } = useThree();
  const groupRef = useRef();
  const starRef = useRef();

  const positions = [
    [0, 0, 0],
    [0.5, 0, 0],
    [1, 0, 0],
    [1.5, 0, 0],
  ];

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);
    // starRef.current.rotation.y += delta * 0.5;
    // groupRef.current.rotation.y += delta * 0.5;
  });

  function stars() {
    const numStars = 20;
    let stars = [];
    const radius = 2;
    for (let i = 0; i < numStars; i++) {
      const star = (
        <mesh
          ref={starRef}
          position={[
            Math.sin((i * (Math.PI * 2)) / numStars) * radius,
            0,
            Math.cos((i * (Math.PI * 2)) / numStars) * radius,
          ]}
        >
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
      );
      stars.push(star);
    }
    return stars;
  }

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <directionalLight
        position={[1, 15, 3]}
        intensity={1.5}
        // color="white"
        castShadow
      />
      <ambientLight intensity={0.5} />

      <Physics gravity={[0, -100, 0]}>
        {/* <group ref={groupRef}>{stars()}</group> */}
        <RigidBody
          type="fixed"
          collision="hull"
          restitution={0.01}
          position={[0, -1, 0]}
          friction={0.9}
        >
          <mesh receiveShadow>
            <boxGeometry args={[50, 1, 50]} />
            <meshStandardMaterial color="limegreen" />
          </mesh>
        </RigidBody>
        <Yuts />
      </Physics>
    </>
  );
}
