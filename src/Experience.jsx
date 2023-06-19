import { useRef, useState, useEffect } from "react";
import { useThree, extend, useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody, Physics } from "@react-three/rapier";
import { CameraControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import Yuts from "./Yuts";
// import Star from "./Star";
// import Neptune from "./Neptune";
// import Earth from "./Earth";
import { useSelector, useDispatch } from "react-redux";
import { setSelection, setTiles } from "./state/gameSlice";

export default function Experience() {
  const tiles = useSelector((state) => state.game.tiles);
  const dispatch = useDispatch();
  const numTiles = 29;

  const starRef = useRef();
  const [starHover, setStarHover] = useState(false);
  const [earth1Color, setEarth1Color] = useState({});
  const [earth2Color, setEarth2Color] = useState({});
  const [earth3Color, setEarth3Color] = useState({});
  const [earth4Color, setEarth4Color] = useState({});
  const [earth5Color, setEarth5Color] = useState({});
  const [neptune1Color, setNeptune1Color] = useState({});
  const [neptune2Color, setNeptune2Color] = useState({});
  const [neptune3Color, setNeptune3Color] = useState({});
  const earth1Ref = useRef();
  const earth2Ref = useRef();
  const earth3Ref = useRef();
  const earth4Ref = useRef();
  const earth5Ref = useRef();
  const earthWrapRef = useRef();
  const [earthHover, setEarthHover] = useState(false);
  const [neptuneHover, setNeptuneHover] = useState(false);
  const neptune1Ref = useRef();
  const neptune2Ref = useRef();
  const neptune3Ref = useRef();
  const neptuneWrapRef = useRef();
  const saturnWrapRef = useRef();
  const marsWrapRef = useRef();
  const tileRefs = [...Array(numTiles)];
  for (let i = 0; i < numTiles; i++) {
    tileRefs[i] = useRef();
  }

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
    setNeptune1Color({
      r: neptune1Ref.current.material.color.toArray()[0],
      g: neptune1Ref.current.material.color.toArray()[1],
      b: neptune1Ref.current.material.color.toArray()[2],
    });
    setNeptune2Color({
      r: neptune2Ref.current.material.color.toArray()[0],
      g: neptune2Ref.current.material.color.toArray()[1],
      b: neptune2Ref.current.material.color.toArray()[2],
    });
    setNeptune3Color({
      r: neptune3Ref.current.material.color.toArray()[0],
      g: neptune3Ref.current.material.color.toArray()[1],
      b: neptune3Ref.current.material.color.toArray()[2],
    });
  }, []);

  const handleStarPointerOver = (event, index) => {
    event.stopPropagation();
    tileRefs[index].current.material.color = new THREE.Color("white");
  };

  const handleStarPointerOut = (event, index) => {
    event.stopPropagation();
    tileRefs[index].current.material.color = new THREE.Color("yellow");
  };

  //game state
  //render piece on tile
  //click adds piece onto state
  const handleStarClick = (event, index) => {
    event.stopPropagation();
    if (tiles[index] == null) {
      let piece = { team: 0, count: 1 };
      dispatch(setTiles({ index, piece }));
    } else {
      dispatch(setTiles({ index, piece: null }));
    }
  };

  const handleEarthWrapPointerOver = (event) => {
    event.stopPropagation();
    earth1Ref.current.material.color = new THREE.Color(
      earth1Color.r + 0.2,
      earth1Color.g + 0.2,
      earth1Color.b + 0.2
    );
    earth2Ref.current.material.color = new THREE.Color(
      earth2Color.r + 0.2,
      earth2Color.g + 0.2,
      earth2Color.b + 0.2
    );
    earth3Ref.current.material.color = new THREE.Color(
      earth3Color.r + 0.2,
      earth3Color.g + 0.2,
      earth3Color.b + 0.2
    );
    earth4Ref.current.material.color = new THREE.Color(
      earth4Color.r + 0.2,
      earth4Color.g + 0.2,
      earth4Color.b + 0.2
    );
    earth5Ref.current.material.color = new THREE.Color(
      earth5Color.r + 0.2,
      earth5Color.g + 0.2,
      earth5Color.b + 0.2
    );
  };

  const handleEarthWrapPointerOut = (event) => {
    event.stopPropagation();
    earth1Ref.current.material.color = new THREE.Color(
      earth1Color.r,
      earth1Color.g,
      earth1Color.b
    );
    earth2Ref.current.material.color = new THREE.Color(
      earth2Color.r,
      earth2Color.g,
      earth2Color.b
    );
    earth3Ref.current.material.color = new THREE.Color(
      earth3Color.r,
      earth3Color.g,
      earth3Color.b
    );
    earth4Ref.current.material.color = new THREE.Color(
      earth4Color.r,
      earth4Color.g,
      earth4Color.b
    );
    earth5Ref.current.material.color = new THREE.Color(
      earth5Color.r,
      earth5Color.g,
      earth5Color.b
    );
  };

  const handleNeptuneWrapPointerOver = (event, index) => {
    event.stopPropagation();
    neptune1Ref.current.material.color = new THREE.Color(
      neptune1Color.r + 0.2,
      neptune1Color.g + 0.2,
      neptune1Color.b + 0.2
    );
    neptune2Ref.current.material.color = new THREE.Color(
      neptune2Color.r + 0.2,
      neptune2Color.g + 0.2,
      neptune2Color.b + 0.2
    );
    neptune3Ref.current.material.color = new THREE.Color(
      neptune3Color.r + 0.2,
      neptune3Color.g + 0.2,
      neptune3Color.b + 0.2
    );
    console.log("[handleNeptuneWrapPointerOver] index", index);
    // dispatch(setSelection(index));
  };

  const handleNeptuneWrapPointerOut = (event, index) => {
    event.stopPropagation();
    neptune1Ref.current.material.color = new THREE.Color(
      neptune1Color.r,
      neptune1Color.g,
      neptune1Color.b
    );
    neptune2Ref.current.material.color = new THREE.Color(
      neptune2Color.r,
      neptune2Color.g,
      neptune2Color.b
    );
    neptune3Ref.current.material.color = new THREE.Color(
      neptune3Color.r,
      neptune3Color.g,
      neptune3Color.b
    );
    console.log("[handleNeptuneWrapPointerOut]", tiles);
    // dispatch(setSelection(-1));
  };

  function Earth({ position }) {
    const { nodes, materials } = useGLTF("/models/earth-round.glb");

    return (
      <group scale={0.15} position={position}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.low_poly_earth.geometry}
          material={materials.water}
          position={[0, 0.12, 0]}
          rotation={[-0.4, -0.4, 0.3]}
          ref={earth1Ref}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder.geometry}
            material={materials["Material.001"]}
            position={[1.1, 0.98, 0.38]}
            rotation={[0.49, 0.02, 0.39]}
            ref={earth2Ref}
          >
            <mesh
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
            castShadow
            receiveShadow
            geometry={nodes.Mesh.geometry}
            material={materials.water}
            ref={earth4Ref}
          />
          <mesh
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

  function EarthWrap({ position }) {
    return (
      <mesh
        castShadow
        position={position}
        ref={earthWrapRef}
        onPointerOver={(event) => handleEarthWrapPointerOver(event)}
        onPointerOut={(event) => handleEarthWrapPointerOut(event)}
        onPointerDown={(event) => handleEarthWrapPointerDown(event)}
        visible={false}
      >
        <sphereGeometry args={[0.27, 32, 16]} />
      </mesh>
    );
  }

  function Star({ position, index }) {
    const { nodes, materials } = useGLTF("/models/star-yellow.glb");

    return (
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.star.geometry}
          position={position}
          scale={0.1}
          ref={tileRefs[index]}
          onPointerEnter={(event) => handleStarPointerOver(event, index)}
          onPointerOut={(event) => handleStarPointerOut(event, index)}
          onClick={(event) => handleStarClick(event, index)}
        >
          <meshStandardMaterial color={"yellow"} />
        </mesh>
        {tiles[index] != null ? (
          <mesh
            castShadow
            position={[position[0], position[1] + 0.5, position[2]]}
          >
            <sphereGeometry args={[0.1, 32, 16]} />
            <meshStandardMaterial color={"red"} />
          </mesh>
        ) : (
          <></>
        )}
      </group>
    );
  }

  function Neptune({ position }) {
    const { nodes, materials } = useGLTF("/models/neptune-2.glb");

    return (
      <group dispose={null} scale={0.1} position={position}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle002_1.geometry}
          material={materials["Material.003"]}
          ref={neptune1Ref}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle002_2.geometry}
          material={materials.Material}
          ref={neptune2Ref}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle002_3.geometry}
          material={materials["Material.001"]}
          ref={neptune3Ref}
        />
      </group>
    );
  }

  function NeptuneWrap({ position, index }) {
    return (
      <mesh
        castShadow
        position={position}
        ref={neptuneWrapRef}
        onPointerOver={(event) => handleNeptuneWrapPointerOver(event, index)}
        onPointerOut={(event) => handleNeptuneWrapPointerOut(event, index)}
        visible={false}
      >
        <sphereGeometry args={[0.23, 32, 16]} />
      </mesh>
    );
  }

  function Saturn({ position }) {
    const { nodes, materials } = useGLTF("/models/Saturn 3.glb");
    return (
      <group dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={materials["Saturn 2"]}
          position={position}
          scale={0.15}
        >
          <group scale={0.63}>
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
        </mesh>
      </group>
    );
  }

  function SaturnWrap({ position, index }) {
    return (
      <mesh
        castShadow
        position={position}
        ref={saturnWrapRef}
        // onPointerOver={(event) => handleSaturnPointerOver(event, index)}
        // onPointerOut={(event) => handleSaturnWrapPointerOut(event, index)}
        visible={false}
      >
        <sphereGeometry args={[0.23, 32, 16]} />
      </mesh>
    );
  }

  function Mars({ position }) {
    const { nodes, materials } = useGLTF("/models/Mars 4.glb");
    return (
      <group dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mars.geometry}
          material={materials.Mars}
          position={position}
          scale={0.2}
        ></mesh>
      </group>
    );
  }

  function Tiles() {
    const numStars = 20;
    let tiles = [];
    const radius = 2;

    //circle
    for (let i = 0; i < numStars; i++) {
      let position = [
        Math.cos(((i - 10) * (Math.PI * 2)) / numStars) * radius,
        0,
        Math.sin(((i - 10) * (Math.PI * 2)) / numStars) * radius,
      ];
      if (i == 0) {
        tiles.push(
          <group>
            <Earth position={position} index={i} />
            <EarthWrap position={position} index={i} />
          </group>
        );
      } else if (i == 5) {
        tiles.push(
          <group>
            <Neptune position={position} />
            <NeptuneWrap position={position} index={i} />
          </group>
        );
      } else if (i == 10) {
        tiles.push(
          <group>
            <Mars position={position} />
          </group>
        );
      } else if (i == 15) {
        tiles.push(
          <group>
            <Saturn position={position} />
            <SaturnWrap position={position} />
          </group>
        );
      } else {
        tiles.push(<Star position={position} index={i} />);
      }
    }

    //shortcuts
    const radiusShortcut1 = 1.3;
    const radiusShortcut2 = 0.6;
    for (let i = 0; i < numStars; i++) {
      let indexShortcut1;
      let indexShortcut2;
      if (i == 0) {
        indexShortcut1 = 28;
        indexShortcut2 = 27;
      } else if (i == 5) {
        indexShortcut1 = 20;
        indexShortcut2 = 21;
      } else if (i == 10) {
        indexShortcut1 = 24;
        indexShortcut2 = 25;
      } else if (i == 15) {
        indexShortcut1 = 23;
        indexShortcut2 = 22;
      }
      if (i == 0 || i == 5 || i == 10 || i == 15) {
        tiles.push(
          <Star
            position={[
              Math.sin(((i + 5) * (Math.PI * 2)) / numStars) * radiusShortcut1,
              0,
              Math.cos(((i + 5) * (Math.PI * 2)) / numStars) * radiusShortcut1,
            ]}
            scale={0.1}
            index={indexShortcut1}
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
            index={indexShortcut2}
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

      <Physics maxVelocityIterations={10}>
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
        <Tiles />
        {/* <Background />
        <Scene /> */}
      </Physics>
    </>
  );
}
