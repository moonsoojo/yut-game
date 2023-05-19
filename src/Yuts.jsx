import { useRef } from "react";
import { RigidBody, Physics, vec3 } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";

export default function Yuts() {
  const yut = useRef();
  const yut2 = useRef();
  const yut3 = useRef();
  const yut4 = useRef();
  const yuts = [yut, yut2, yut3, yut4];
  const positionsInitial = [
    [0, 1, 0],
    [1, 2, 0],
    [2, 3, 1],
    [0, 4, 2],
  ];
  const positionsInHand = [
    { x: 1, y: 1, z: 1 },
    { x: 1, y: 1.2, z: -1 },
    { x: -1, y: 1.4, z: 1 },
    { x: -1, y: 1.6, z: -1 },
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
      yut.current.applyImpulse({ x: 0, y: 0.2, z: 0 });
      yut.current.applyTorqueImpulse({
        x: 0,
        y: 0.01,
        z: 0,
      });
      index++;
      console.log(yut);
    }
  }

  /*
              onContactForce={(payload) => {
              console.log(payload);
              target.rigidBodyObject.position =
                target.rigidBodyObject.position - maxForceMagnitude * 100; */
  return (
    <>
      {yuts.map((ref, index) => {
        return (
          <RigidBody
            ref={ref}
            position={positionsInitial[index]}
            colliders="trimesh"
            rotation={[Math.PI * 0.5, 0, 0]}
            restitution={0.8}
            friction={0.4}
            gravityScale={1.5}
            name={`yut${index}`}
            onContactForce={(payload) => {
              if (
                payload.other.rigidBodyObject.name.substring(0, 3) === "yut"
              ) {
                console.log(payload);
                // ref.current.setTranslation(
                //   payload.target.rigidBodyObject.position.add(
                //     vec3(payload.maxForceDirection) + Math.random()
                //   )
                // );
              }
            }}
          >
            <primitive
              object={yutModels[index].scene}
              scale={0.2}
              castShadow
              onClick={yutThrow}
            />
          </RigidBody>
        );
      })}
    </>
  );
}
