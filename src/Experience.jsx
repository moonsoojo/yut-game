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
  const ufoGlassRef = useRef();
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
    ufoGlassRef.current.material.opacity = 0.3
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
        {(tiles[index] != null && tiles[index].team == 0) ? (
          <>
          <Ufo position={[position[0], position[1] + 0.4, position[2] - 0.1]} />
          <Ufo position={[position[0], position[1] + 0.4, position[2] + 0.1]} />
          <Ufo position={[position[0]+0.2, position[1] + 0.4, position[2] - 0.1]} />
          <Ufo position={[position[0]+0.2, position[1] + 0.4, position[2] + 0.1]} />
          </>
          
        ) : (
          <></>
        )}
        {(tiles[index] != null && tiles[index].team == 1) ? (
          <><Rocket position={[position[0], position[1] + 0.6, position[2] - 0.2]} />
          <Rocket position={[position[0], position[1] + 0.6, position[2] - 0.4]} />
          <Rocket position={[position[0]-0.25, position[1] + 0.6, position[2] - 0.2]} />
          <Rocket position={[position[0]-0.25, position[1] + 0.6, position[2] - 0.4]} /></>
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

  function Rocket({ position }) {
    const { nodes, materials } = useGLTF("/models/rocket-with-astronaut.glb");
    return (
      <group dispose={null}>
        <group
          position={position}
          rotation={[Math.PI *3/4, 0, -Math.PI]}
          scale={0.007}
        >
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
            geometry={nodes.Icosphere.geometry}
            material={materials.Fire}
            position={[0.008, -50.335, 0]}
            rotation={[0.024, 1.289, 0]}
            scale={3.393}
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

  function Ufo({ position }) {
    const { nodes, materials } = useGLTF("/models/ufo.glb");
    return (
      <group dispose={null}>
        <group position={position} scale={0.2} rotation={[0, Math.PI/2, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle024_1.geometry}
            material={materials.White}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle024_2.geometry}
            material={materials.Blue}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle024_3.geometry}
            material={materials.Grey}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle024_4.geometry}
            material={materials["Alien Black"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle024_5.geometry}
            material={materials["Inside Grey"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle.geometry}
            material={materials["Panel Grey"]}
            position={[-0.164, -0.051, 0.411]}
            scale={[0.015, 0.047, 0.015]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle002.geometry}
            material={materials.Blue}
            position={[0, 0, 0.765]}
            scale={0.087}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle013.geometry}
            material={materials["Inside Grey"]}
            position={[0, -0.051, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle024.geometry}
            material={materials.Blue}
            position={[0.765, 0, 0]}
            rotation={[0, 1.571, 0]}
            scale={0.087}
          />
          <group position={[0, -0.051, 0]} rotation={[0, -0.365, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle038.geometry}
              material={materials["Panel Grey"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle038_1.geometry}
              material={materials.red}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle038_2.geometry}
              material={materials.Green}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.NurbsPath002.geometry}
            material={materials["Alien Black"]}
            position={[0.001, 0.182, 0.375]}
            scale={0.37}
          />
          {/* ball front right */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube001.geometry}
            material={materials.Blue}
            position={[0.252, -0.592, 0.252]}
            scale={0.128}
          /> 
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube002.geometry}
            material={materials["Blue Alien"]}
            position={[0, 0.492, 0.138]}
            scale={0.299}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube003.geometry}
            material={materials["White Alien"]}
            position={[0, 0.096, 0.125]}
            scale={0.104}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube004.geometry}
            material={materials["White Alien"]}
            position={[0.138, 0.026, 0.324]}
            rotation={[1.869, -0.449, -0.197]}
            scale={[-0.037, -0.043, -0.037]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube005.geometry}
            material={materials["Blue Alien"]}
            position={[0.163, -0.006, 0.397]}
            rotation={[2.426, -1.563, -2.477]}
            scale={[0.029, 0.042, 0.042]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube027.geometry}
            material={materials["Blue Alien"]}
            position={[0.142, -0.022, 0.381]}
            rotation={[-2.03, -1.157, -0.683]}
            scale={[0.01, 0.023, 0.014]}
          />
          {/* ball front left */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube028.geometry}
            material={materials.Blue}
            position={[-0.252, -0.592, 0.252]}
            scale={0.128}
          />
          {/* ball back right */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube029.geometry}
            material={materials.Blue}
            position={[0.252, -0.592, -0.252]}
            scale={0.128}
          />
          {/* ball back left */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube030.geometry}
            material={materials.Blue}
            position={[-0.252, -0.592, -0.252]}
            scale={0.128}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube031.geometry}
            material={materials["White Alien"]}
            position={[-0.127, 0.026, 0.326]}
            rotation={[-1.107, 0.274, -0.261]}
            scale={[0.037, 0.043, 0.037]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube032.geometry}
            material={materials["Blue Alien"]}
            position={[-0.165, 0.007, 0.389]}
            rotation={[-1.107, 0.274, -0.261]}
            scale={[0.029, 0.042, 0.042]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube033.geometry}
            material={materials["Blue Alien"]}
            position={[-0.139, 0.023, 0.389]}
            rotation={[-1.294, 0.655, -0.208]}
            scale={[0.01, 0.023, 0.014]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere.geometry}
            material={materials["Panel Grey"]}
            position={[-0.164, 0.062, 0.411]}
            scale={-0.041}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere001.geometry}
            material={materials["Eyes Black"]}
            position={[0.138, 0.361, 0.37]}
            rotation={[1.401, -0.566, -0.511]}
            scale={[-0.08, -0.052, -0.115]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere002.geometry}
            material={materials["Eyes White"]}
            position={[0.154, 0.387, 0.415]}
            rotation={[1.489, -0.121, -0.36]}
            scale={[0.037, 0.012, 0.037]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere003.geometry}
            material={materials["Eyes White"]}
            position={[0.115, 0.308, 0.418]}
            rotation={[1.895, -0.107, -0.153]}
            scale={[0.017, 0.006, 0.017]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere008.geometry}
            material={materials.Glass}
            position={[0, 0.33, 0]}
            scale={0.404}
            ref={ufoGlassRef}
          />
        </group>
      </group>
    );
  }

  function Tiles() {
    const numStars = 20;
    let tiles = [];
    const radius = 3;

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
    const radiusShortcut1 = 1.8;
    const radiusShortcut2 = 0.8;
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
