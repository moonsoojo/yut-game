// import { useEffect, useRef, useState } from "react";
// import { RigidBody, Physics, vec3, useRapier } from "@react-three/rapier";
// import { useFrame } from "@react-three/fiber";
// import { useGLTF, useKeyboardControls, Text3D } from "@react-three/drei";
// import * as THREE from "three";
// import React from "react";
// import { yutForceVectorsAtom, socket } from "./SocketManager";
// import { useAtom } from "jotai";

// THREE.ColorManagement.legacyMode = false;

// const positionsInitial = [
//   [2, 1, 0],
//   [2, 2, 0],
//   [2, 3, 0],
//   [2, 4, 0],
// ];

// export default function YutsNew2(props) {
//   const [subscribeKeys, getKeys] = useKeyboardControls();
//   const nodes = useGLTF("/models/yut-regular.glb").nodes;
//   const materials = useGLTF("/models/yut-regular.glb").materials;
//   const nodesRhino = useGLTF("/models/yut-backdo.glb").nodes;
//   const materialsRhino = useGLTF("/models/yut-backdo.glb").materials;
//   const [yutForceVector] = useAtom(yutForceVectorAtom);
//   const [throwTime] = useAtom(throwTimeAtom);
//   const [time, setTime] = useState(0);
//   const [timeRemaining, setTimeRemaining] = useState(0);
//   const [thrown, setThrown] = useState(undefined);

//   const { step } = useRapier()

//   useFrame((state, delta) => {
//     setTime(state.clock.elapsedTime);
//     if (timeRemaining > 0) {
//       console.log("time remaining", timeRemaining);
//       setTimeRemaining(Math.max(0, timeRemaining - delta));
//     }
//     if (timeRemaining === 0 && thrown) {
//       console.log("no more time remaining");
//       console.log(state.clock.elapsedTime);
//       for (let i = 0; i < 4; i++) {
//         yuts[i].current.setTranslation(yutForceVector[i].positionInHand);
//         // yuts[i].current.rotation.x = values[i].rotation.x;
//         // yuts[i].current.rotation.y = values[i].rotation.y;
//         // yuts[i].current.rotation.z = values[i].rotation.z;
//         // yuts[i].current.applyImpulse({
//         //   x: 0,
//         //   y: values[i].yImpulse,
//         //   z: 0,
//         // });
//         // yuts[i].current.applyTorqueImpulse({
//         //   x: values[i].torqueImpulse.x,
//         //   y: values[i].torqueImpulse.y,
//         //   z: values[i].torqueImpulse.z,
//         // });
//       }
//       setThrown(false);
//     }
//   });

//   function handleThrowClick() {
//     console.log("handleThrowClick", throwTime);
//     socket.emit("throwYuts", time);
//   }

//   useEffect(() => {
//     subscribeKeys(
//       (state) => state.throw,
//       (value) => {
//         if (value) {
//           // socket.emit("throwYuts", throwTime);
//         }
//       }
//     );
//   }, [throwTime]);

//   useEffect(() => {
//     console.log("yut throw", yutForceVector, throwTime);
//     setTimeRemaining(throwTime + 2 - time);
//     setThrown(true);
//   }, [yutForceVector]);

//   useEffect(() => {}, [throwTime]);

//   const yut = useRef();
//   const yut2 = useRef();
//   const yut3 = useRef();
//   const yut4 = useRef();
//   const yuts = [yut, yut2, yut3, yut4];

//   function throwYuts(values) {
//     for (let i = 0; i < 4; i++) {
//       yuts[i].current.setTranslation(values[i].positionInHand);
//       // yuts[i].current.rotation.x = values[i].rotation.x;
//       // yuts[i].current.rotation.y = values[i].rotation.y;
//       // yuts[i].current.rotation.z = values[i].rotation.z;
//       // yuts[i].current.applyImpulse({
//       //   x: 0,
//       //   y: values[i].yImpulse,
//       //   z: 0,
//       // });
//       // yuts[i].current.applyTorqueImpulse({
//       //   x: values[i].torqueImpulse.x,
//       //   y: values[i].torqueImpulse.y,
//       //   z: values[i].torqueImpulse.z,
//       // });
//     }
//   }

//   return (
//     <group {...props} dispose={null}>
//       <Text3D
//         font="./fonts/Luckiest Guy_Regular.json"
//         height={0.01}
//         size={0.2}
//         rotation={[0, Math.PI / 2, 0]}
//         position={[-2, 0, 0]}
//         onPointerDown={handleThrowClick}
//       >
//         Throw
//       </Text3D>

//       {yuts.map((ref, index) => {
//         return (
//           <RigidBody
//             ref={ref}
//             position={positionsInitial[index]}
//             colliders="hull"
//             restitution={0.3}
//             friction={0.6}
//             name={`yut${index}`}
//             linearDamping={0.3}
//             angularDamping={0.1} // when this value is high, yuts spinned more
//             scale={0.1}
//             gravityScale={1.5}
//             key={index}
//           >
//             {index != 0 ? (
//               <mesh
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube001.geometry}
//                 material={materials["Material.002"]}
//                 position={[0, 0, -4.19]}
//               />
//             ) : (
//               <mesh
//                 castShadow
//                 receiveShadow
//                 geometry={nodesRhino.Cube003.geometry}
//                 material={materialsRhino["Material.002"]}
//               />
//             )}
//           </RigidBody>
//         );
//       })}
//     </group>
//   );
// }

// useGLTF.preload("/models/yut-regular.glb");
// useGLTF.preload("/models/yut-backdo.glb");
