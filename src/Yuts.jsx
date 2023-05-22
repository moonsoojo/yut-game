import { useEffect, useRef, useState } from "react";
import { RigidBody, Physics, vec3 } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";

THREE.ColorManagement.legacyMode = false;

export default function Yuts(props) {
  const [hover, setHover] = useState(false);
  const [subscribeKeys, getKeys] = useKeyboardControls();
  // const { starNodes, starMaterials } = useGLTF("/star.glb");

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

  useFrame(() => {
    // const keys = getKeys();
    // if (keys.throw) {
    //   yutThrow();
    // }
  });

  const yut = useRef();
  const yut2 = useRef();
  const yut3 = useRef();
  const yut4 = useRef();
  const yuts = [yut, yut2, yut3, yut4];
  const positionsInitial = [
    [5, 5, 5],
    [-5, 5, 5],
    [5, 5, -5],
    [-5, 5, -5],
  ];
  const positionsInHand = [
    { x: 5, y: 5, z: 5 },
    { x: 5, y: 5, z: -5 },
    { x: -5, y: 5, z: 5 },
    { x: -5, y: 5, z: -5 },
  ];
  const yutModel = useGLTF("./yut.glb");
  const yutModel2 = useGLTF("./yut2.glb");
  const yutModel3 = useGLTF("./yut3.glb");
  const yutModel4 = useGLTF("./yut4.glb");
  const yutModels = [yutModel, yutModel2, yutModel3, yutModel4];

  function getRandomNumberInRange(min, max) {
    let randomNum = Math.random();
    while (randomNum < min || randomNum > max) {
      randomNum = Math.random();
    }
    return randomNum;
  }

  function yutThrow() {
    let index = 0;
    for (const yut of yuts) {
      yut.current.setTranslation(positionsInHand[index]);
      yut.current.applyImpulse(
        {
          x: 0,
          y: 200,
          z: 0,
        },
        true
      );
      yut.current.applyTorqueImpulse(
        {
          //x: Math.random() * 70 - 35,
          //x: Math.random() * 70 - 35,
          x: 0,
          //y: 0,
          y: 50,
          // z: Math.random() * 50 - 25,
          //z: Math.random() * 100 - 50,
          //z: Math.random() * 70 - 35,
          z: 5,
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
            restitution={0.5}
            friction={0.9}
            name={`yut${index}`}
            rotation={[Math.PI, 0, 0]}
            // onContactForce={(payload) => {
            //   if (
            //     payload.target.colliderObject.name.substring(0, 3) === "yut" &&
            //     payload.other.colliderObject.name.substring(0, 3) === "yut"
            //   ) {
            //     console.log(
            //       vec3(
            //         payload.target.colliderObject.name,
            //         "before moving",
            //         ref.current.translation()
            //       )
            //     );
            //     ref.current.setTranslation(
            //       vec3(ref.current.translation()) - maxForceDirection
            //     );
            //     console.log(
            //       vec3(
            //         payload.target.colliderObject.name,
            //         "after moving",
            //         ref.current.translation()
            //       )
            //     );
            //   }
            // }}
            onWake={() => console.log("woke")}
            onSleep={() => console.log("schleep")}
            linearDamping={1}
            angularDamping={1}
          >
            <primitive object={yutModels[index].scene} />
          </RigidBody>
        );
      })}
    </group>
  );
}
