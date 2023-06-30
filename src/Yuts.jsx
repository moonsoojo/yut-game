import { useEffect, useRef, useState } from "react";
import { RigidBody, Physics, vec3 } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";

THREE.ColorManagement.legacyMode = false;

export default function Yuts(props) {
  const [hover, setHover] = useState(false);
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const nodes = useGLTF("/models/yut-regular.glb").nodes;
  const materials = useGLTF("/models/yut-regular.glb").materials;
  const nodesRhino = useGLTF("/models/yut-working (1).glb").nodes;
  const materialsRhino = useGLTF("/models/yut-working (1).glb").materials;

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
  const rotationsInitial = [
    [
      getRandomNumberInRange(Math.PI, Math.PI),
      getRandomNumberInRange(Math.PI, Math.PI),
      getRandomNumberInRange(Math.PI, Math.PI),
    ],
    [
      getRandomNumberInRange(Math.PI, Math.PI),
      getRandomNumberInRange(Math.PI, Math.PI),
      getRandomNumberInRange(Math.PI, Math.PI),
    ],
    [
      getRandomNumberInRange(Math.PI, Math.PI),
      getRandomNumberInRange(Math.PI, Math.PI),
      getRandomNumberInRange(Math.PI, Math.PI),
    ],
    [
      getRandomNumberInRange(Math.PI, Math.PI),
      getRandomNumberInRange(Math.PI, Math.PI),
      getRandomNumberInRange(Math.PI, Math.PI),
    ],
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
      yut.current.rotation.x = getRandomNumberInRange(Math.PI, Math.PI);
      yut.current.rotation.y = getRandomNumberInRange(Math.PI, Math.PI);
      yut.current.rotation.z = getRandomNumberInRange(Math.PI, Math.PI);
      yut.current.userData = `yut${index}`;
      const yImpulse = getRandomNumberInRange(0.05, 0.01); // value between 0.15 and 0.25
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
          x: getRandomNumberInRange(0.0001, 0.00005),
          y: getRandomNumberInRange(0.015, 0.005),
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
            rotation={rotationsInitial[index]}
            colliders="hull"
            restitution={0.3}
            friction={0.6}
            name={`yut${index}`}
            linearDamping={0.3}
            angularDamping={0.1} // when this value is high, yuts spinned more
            scale={0.1}
            gravityScale={1.5}
          >
            {index != 0 ? (
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube001.geometry}
                material={materials["Material.002"]}
                position={[0, 0, -4.19]}
              />
            ) : (
              <mesh
                castShadow
                receiveShadow
                geometry={nodesRhino.Cube003.geometry}
                material={materialsRhino["Material.002"]}
              />
            )}
          </RigidBody>
        );
      })}
    </group>
  );
}
