import { useRef } from "react";
import { RigidBody, Physics } from "@react-three/rapier";

export default function Yuts() {
  console.log("Yuts");
  const yut = useRef();
  const yut2 = useRef();
  const yut3 = useRef();
  const yut4 = useRef();
  const yuts = [yut, yut2, yut3, yut4];
  const positionsInitial = [
    [0, 0, 0],
    [0.2, 0, 0],
    [0.4, 0, 0],
    [0.6, 0, 0],
  ];
  const positionsInHand = [
    { x: 0, y: 0.2, z: 0 },
    { x: 0.2, y: 0.2, z: 0 },
    { x: 0.4, y: 0.2, z: 0 },
    { x: 0.6, y: 0.2, z: 0 },
  ];

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
      yut.current.applyImpulse({ x: 0, y: 0.05, z: 0 });
      yut.current.applyTorqueImpulse({
        x: Math.random() * 0.0001 - 0.0005,
        // y: Math.random() * 0.00001 - 0.00005,
        //x: 0.001,
        y: 0,
        //z: Math.random() * 0.00005 - 0.00025,
        z: 0,
      });
      index++;
    }
  }

  return (
    <>
      {yuts.map((ref, index) => {
        return (
          <RigidBody
            ref={ref}
            position={positionsInitial[index]}
            colliders="hull"
            rotation={[Math.PI * 0.5, 0, 0]}
            restitution={0.5}
            friction={0.5}
            gravityScale={1.5}
          >
            <mesh castShadow onClick={yutThrow}>
              <boxGeometry args={[0.1, 0.5, 0.1]} />
              <meshStandardMaterial color="brown" />
            </mesh>
          </RigidBody>
        );
      })}
    </>
  );
}
