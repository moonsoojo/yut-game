import { useRef, useState, useEffect } from "react";
import { useThree, extend, useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody, Physics } from "@react-three/rapier";
import { CameraControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import Yuts from "./Yuts";
// import Star from "./Star";
import Neptune from "./Neptune";
// import Earth from "./Earth";

export default function Experience() {
  const starRef = useRef();
  const [starHover, setStarHover] = useState(false);
  const [earth1Color, setEarth1Color] = useState({});
  const [earth2Color, setEarth2Color] = useState({});
  const [earth3Color, setEarth3Color] = useState({});
  const [earth4Color, setEarth4Color] = useState({});
  const [earth5Color, setEarth5Color] = useState({});
  const earth1Ref = useRef();
  const earth2Ref = useRef();
  const earth3Ref = useRef();
  const earth4Ref = useRef();
  const earth5Ref = useRef();
  const [earthHover, setEarthHover] = useState(false);

  useEffect(() => {
    //can only set state variables
    setEarth1Color({
      r: earth1Ref.current.material.color.toArray()[0],
      g: earth1Ref.current.material.color.toArray()[1],
      b: earth1Ref.current.material.color.toArray()[2],
    });
    setEarth2Color({
      r: earth2Ref.current.material.color.toArray()[0],
      g: earth2Ref.current.material.color.toArray()[1],
      b: earth2Ref.current.material.color.toArray()[2],
    });
    setEarth3Color({
      r: earth3Ref.current.material.color.toArray()[0],
      g: earth3Ref.current.material.color.toArray()[1],
      b: earth3Ref.current.material.color.toArray()[2],
    });
    setEarth4Color({
      r: earth4Ref.current.material.color.toArray()[0],
      g: earth4Ref.current.material.color.toArray()[1],
      b: earth4Ref.current.material.color.toArray()[2],
    });
    setEarth5Color({
      r: earth5Ref.current.material.color.toArray()[0],
      g: earth5Ref.current.material.color.toArray()[1],
      b: earth5Ref.current.material.color.toArray()[2],
    });
  }, []);

  const handleStarPointerEnter = () => {
    if (!starHover) {
      setStarHover(true);
      starRef.current.material.color.set(`white`);
    }
  };

  const handleStarPointerOut = () => {
    if (starHover) {
      setStarHover(false);
      starRef.current.material.color.set(`black`);
    }
  };

  const handleEarthPointerEnter = () => {
    if (!earthHover) {
      setEarthHover(true);
      earth1Ref.current.material.color = new THREE.Color(`rgb(1, 1, 1)`);
      earth2Ref.current.material.color = `rgb(1, 1, 1)`;
      earth3Ref.current.material.color = `rgb(1, 1, 1)`;
      earth4Ref.current.material.color = `rgb(1, 1, 1)`;
      earth5Ref.current.material.color = `rgb(1, 1, 1)`;
    }
  };

  const handleEarthPointerOut = () => {
    if (earthHover) {
      setEarthHover(false);
      earth1Ref.current.material.color = new THREE.Color(
        `rgb(${Math.ceil(earth1Color.r * 255)}, ${Math.ceil(
          earth1Color.g * 255
        )}, ${Math.ceil(earth1Color.b * 255)})`
      );
      earth2Ref.current.material.color = new THREE.Color(
        `rgb(${Math.ceil(earth2Color.r * 255)}, ${Math.ceil(
          earth2Color.g * 255
        )}, ${Math.ceil(earth2Color.b * 255)})`
      );
      earth3Ref.current.material.color = new THREE.Color(
        `rgb(${Math.ceil(earth3Color.r * 255)}, ${Math.ceil(
          earth3Color.g * 255
        )}, ${Math.ceil(earth3Color.b * 255)})`
      );
      earth4Ref.current.material.color = new THREE.Color(
        `rgb(${Math.ceil(earth4Color.r * 255)}, ${Math.ceil(
          earth4Color.g * 255
        )}, ${Math.ceil(earth4Color.b * 255)})`
      );
      earth5Ref.current.material.color = new THREE.Color(
        `rgb(${Math.ceil(earth5Color.r * 255)}, ${Math.ceil(
          earth5Color.g * 255
        )}, ${Math.ceil(earth5Color.b * 255)})`
      );
    }
  };

  function Earth({ position }) {
    const { nodes, materials } = useGLTF("/models/earth-round.glb");

    return (
      <group scale={0.1} position={position}>
        <mesh
          onPointerEnter={handleEarthPointerEnter}
          onPointerOut={handleEarthPointerOut}
          castShadow
          receiveShadow
          geometry={nodes.low_poly_earth.geometry}
          material={materials.water}
          position={[0, 0.12, 0]}
          rotation={[-0.4, -0.4, 0.3]}
          ref={earth1Ref}
        >
          <mesh
            onPointerEnter={handleEarthPointerEnter}
            onPointerOut={handleEarthPointerOut}
            castShadow
            receiveShadow
            geometry={nodes.Cylinder.geometry}
            material={materials["Material.001"]}
            position={[1.1, 0.98, 0.38]}
            rotation={[0.49, 0.02, 0.39]}
            ref={earth2Ref}
          >
            <mesh
              onPointerEnter={handleEarthPointerEnter}
              onPointerOut={handleEarthPointerOut}
              castShadow
              receiveShadow
              geometry={nodes.Plane.geometry}
              material={materials.Material}
              position={[0.24, 1.29, 0]}
              scale={0.77}
              ref={earth3Ref}
            />
          </mesh>
          <mesh
            onPointerEnter={handleEarthPointerEnter}
            onPointerOut={handleEarthPointerOut}
            castShadow
            receiveShadow
            geometry={nodes.Mesh.geometry}
            material={materials.water}
            ref={earth4Ref}
          />
          <mesh
            onPointerEnter={handleEarthPointerEnter}
            onPointerOut={handleEarthPointerOut}
            castShadow
            receiveShadow
            geometry={nodes.Mesh_1.geometry}
            material={materials.earth}
            ref={earth5Ref}
          />
        </mesh>
      </group>
    );
  }

  function Star({ position }) {
    const { nodes, materials } = useGLTF("/models/star-yellow.glb");

    return (
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star.geometry}
        material={materials.GlowingStar}
        position={position}
        scale={0.1}
        ref={starRef}
        onPointerEnter={handleStarPointerEnter}
        onPointerOut={handleStarPointerOut}
      />
    );
  }

  function Tiles() {
    const numStars = 20;
    let tiles = [];
    const radius = 2;

    //circle
    for (let i = 0; i < numStars; i++) {
      if (i == 0) {
        tiles.push(
          <Earth
            position={[
              Math.sin(((i - 5) * (Math.PI * 2)) / numStars) * radius,
              0,
              Math.cos(((i - 5) * (Math.PI * 2)) / numStars) * radius,
            ]}
            scale={0.14}
          />
        );
      } else if (i == 5) {
        tiles.push(
          <mesh
            castShadow
            position={[
              Math.sin(((i - 5) * (Math.PI * 2)) / numStars) * radius,
              0,
              Math.cos(((i - 5) * (Math.PI * 2)) / numStars) * radius,
            ]}
          >
            <sphereGeometry args={[0.1, 32, 16]} />
            <meshStandardMaterial color="yellow" />
          </mesh>
        );
      } else if (i == 10) {
        tiles.push(
          <mesh
            castShadow
            position={[
              Math.sin(((i - 5) * (Math.PI * 2)) / numStars) * radius,
              0,
              Math.cos(((i - 5) * (Math.PI * 2)) / numStars) * radius,
            ]}
          >
            <sphereGeometry args={[0.1, 32, 16]} />
            <meshStandardMaterial color="red" />
          </mesh>
        );
      } else if (i == 15) {
        tiles.push(
          <Neptune
            position={[
              Math.sin(((i - 5) * (Math.PI * 2)) / numStars) * radius,
              0,
              Math.cos(((i - 5) * (Math.PI * 2)) / numStars) * radius + 0.15,
            ]}
            scale={0.1}
          />
        );
      } else {
        if (i == 1) {
          tiles.push(
            <Star
              position={[
                Math.sin(((i - 5) * (Math.PI * 2)) / numStars) * radius,
                0,
                Math.cos(((i - 5) * (Math.PI * 2)) / numStars) * radius,
              ]}
              scale={0.1}
              hover={star1Hover}
              setHover={setStar1Hover}
            />
          );
        } else {
          tiles.push(
            <Star
              position={[
                Math.sin(((i - 5) * (Math.PI * 2)) / numStars) * radius,
                0,
                Math.cos(((i - 5) * (Math.PI * 2)) / numStars) * radius,
              ]}
              scale={0.1}
            />
          );
        }
      }
    }

    //shortcuts
    const radiusShortcut1 = 1.3;
    const radiusShortcut2 = 0.6;
    for (let i = 0; i < numStars; i++) {
      if (i == 0 || i == 5 || i == 10 || i == 15) {
        tiles.push(
          <Star
            position={[
              Math.sin(((i + 5) * (Math.PI * 2)) / numStars) * radiusShortcut1,
              0,
              Math.cos(((i + 5) * (Math.PI * 2)) / numStars) * radiusShortcut1,
            ]}
            scale={0.1}
          />
        );
        tiles.push(
          <Star
            position={[
              Math.sin(((i + 5) * (Math.PI * 2)) / numStars) * radiusShortcut2,
              0,
              Math.cos(((i + 5) * (Math.PI * 2)) / numStars) * radiusShortcut2,
            ]}
            scale={0.1}
          />
        );
      }
    }

    return tiles;
  }

  return (
    <>
      <color args={["#313557"]} attach="background" />

      <directionalLight position={[1, 10, 3]} intensity={1.3} castShadow />
      <ambientLight intensity={0.5} />

      <Physics debug maxVelocityIterations={10}>
        <RigidBody
          type="fixed"
          restitution={0.01}
          position={[0, -1, 0]}
          friction={0.9}
        >
          <CuboidCollider
            args={[3.5, 0.5, 3.5]}
            restitution={0.2}
            friction={1}
          />
        </RigidBody>
        <Yuts />
        <Star
          position={[
            Math.sin(((1 - 5) * (Math.PI * 2)) / 20) * 2,
            0,
            Math.cos(((1 - 5) * (Math.PI * 2)) / 20) * 2,
          ]}
        />
        <Earth
          position={[
            Math.sin(((0 - 5) * (Math.PI * 2)) / 20) * 2,
            0,
            Math.cos(((0 - 5) * (Math.PI * 2)) / 20) * 2,
          ]}
        />
        {/* <Tiles /> */}
        {/* <Background />
        <Scene /> */}
      </Physics>
    </>
  );
}
