import { useRef, useState } from "react";
import { RigidBody, Physics, vec3 } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";

export default function Yuts() {
  const [hover, setHover] = useState(false);

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
    // console.log(yuts);
    for (const yut of yuts) {
      yut.current.setTranslation(positionsInHand[index]);
      yut.current.applyImpulse({
        x: Math.random() * 1 - 0.5,
        y: 2,
        z: Math.random() * 1 - 0.5,
      });
      yut.current.applyTorqueImpulse({
        x: 0,
        y: Math.random() * 100 - 0.5,
        z: Math.random() * 100 - 0.5,
      });
      index++;
    }
  }

  return (
    <>
      {yuts.map((ref, index) => {
        yutModels[index].scene.children.forEach((mesh) => {
          mesh.castShadow = true;
        });
        return (
          <RigidBody
            ref={ref}
            position={positionsInitial[index]}
            colliders="hull"
            rotation={[Math.PI * 0.5, 0, 0]}
            restitution={0.5}
            friction={0.9}
            name={`yut${index}`}
            gravityScale={3}
            onCollisionEnter={(payload) => {
              console.log(payload);
            }}
          >
            <primitive
              object={yutModels[index].scene}
              scale={1}
              onPointerEnter={() => setHover(true)}
              onPointerLeave={() => setHover(false)}
              onClick={() => yutThrow()}
            />
          </RigidBody>
        );
      })}
    </>
  );
}
