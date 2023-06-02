import { useEffect, useRef, useState } from "react";
import { RigidBody, Physics, vec3 } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";

THREE.ColorManagement.legacyMode = false;

export default function Yuts(props) {
  const [hover, setHover] = useState(false);
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { nodes, materials } = useGLTF("/yut (5).glb");

  const textureRegular = new THREE.TextureLoader().load("textures/dots2.png");
  const textureBackdo = new THREE.TextureLoader().load("textures/dots.png");

  useEffect(() => {
    subscribeKeys(
      (state) => state.throw,
      (value) => {
        if (value) {
          yutThrow();
        }
      }
    );
  }, []);

  const yut = useRef();
  const yut2 = useRef();
  const yut3 = useRef();
  const yut4 = useRef();
  const yuts = [yut, yut2, yut3, yut4];
  const positionsInitial = [
    [0, 1, 0],
    [0, 3, 0],
    [0, 5, 0],
    [0, 7, 0],
  ];
  const positionsInHand = [
    { x: 0, y: 1, z: -0.3 },
    { x: 0, y: 1, z: -0.6 },
    { x: 0, y: 1, z: 0.3 },
    { x: 0, y: 1, z: 0.6 },
  ];

  function getRandomNumberInRange(num, plusMinus) {
    return num + Math.random() * plusMinus * (Math.random() > 0.5 ? 1 : -1);
  }

  function yutThrow() {
    let index = 0;
    for (const yut of yuts) {
      yut.current.setTranslation(positionsInHand[index], true);
      const rotation = new THREE.Quaternion();
      rotation.setFromEuler(new THREE.Euler(0, 0, 0));
      yut.current.setRotation(rotation, true);
      yut.current.userData = `yut${index}`;
      const yImpulse = getRandomNumberInRange(0.1, 0.02); // value between 0.15 and 0.25
      yut.current.applyImpulse(
        {
          x: 0,
          y: yImpulse,
          z: 0,
        },
        true
      );
      yut.current.applyTorqueImpulse(
        {
          x: getRandomNumberInRange(0.0004, 0.0001),
          y: getRandomNumberInRange(0.02, 0.01),
          z: getRandomNumberInRange(0.0004, 0.0001),
        },
        true
      );

      index++;
    }
  }

  return (
    <group {...props} dispose={null}>
      {yuts.map((ref, index) => {
        return (
          <RigidBody
            ref={ref}
            position={positionsInitial[index]}
            colliders="hull"
            restitution={0.3}
            friction={0.6}
            name={`yut${index}`}
            rotation={[Math.PI, 0, 0]}
            onWake={() => console.log("woke")}
            onSleep={() => console.log("schleep")}
            linearDamping={0.99}
            angularDamping={0.99}
            scale={0.1}
            gravityScale={1.5}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube001.geometry}
              material={materials["Material.004"]}
            />
            <meshBasicMaterial
              map={index == 0 ? textureBackdo : textureRegular}
            />
          </RigidBody>
        );
      })}
    </group>
  );
}
