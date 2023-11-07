import React from "react";
import Star from "./meshes/StarBackup";
import { useAtom } from "jotai";
import { playAtom } from "./Experience";

export default function Decorations() {
  const [play] = useAtom(playAtom);
  return (
    <group>
      {!play && (
        <group>
          {/* <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1, 0.005, 16, 100]} />
            <meshStandardMaterial color={"#F27D11"} />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2, 0.005, 16, 100]} />
            <meshStandardMaterial color={"#F2B311"} />
          </mesh>
          <mesh
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, 0, (Math.PI * 5) / 16]}
          >
            <torusGeometry args={[3.2, 0.005, 16, 100]} />
            <meshStandardMaterial color={"#EEF211"} />
          </mesh>
          <mesh
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, 0, (Math.PI * 5) / 16]}
          >
            <torusGeometry args={[4.8, 0.005, 16, 100]} />
            <meshStandardMaterial color={"#AAF211"} />
          </mesh> */}
        </group>
      )}
      <group>
        {/* <Star
          position={[0, 0, 3]}
          color={"#ED754F"}
          scale={0.7}
          isDecoration={true}
        /> */}
        {/* <Star
          position={[1.5, 0, 0]}
          color={"#8FFF00"}
          scale={0.7}
          isDecoration={true}
        /> */}
        {/* <Star
          position={[1.5, 0, -3]}
          color={"#5A0079"}
          scale={0.7}
          isDecoration={true}
        /> */}
        <Star
          position={[-4, 0, -4]}
          color={"#002279"}
          scale={0.7}
          isDecoration={true}
        />
        <Star
          position={[4, 0, 5]}
          color={"#CE81EA"}
          scale={0.7}
          isDecoration={true}
        />
        <Star
          position={[0, 0, 5.5]}
          color={"#45A9D4"}
          scale={0.7}
          isDecoration={true}
        />
      </group>
      <group>
        <mesh position={[-3.5, 0, 5]}>
          <sphereGeometry args={[0.05, 32, 16]} />
          {/* <meshStandardMaterial color={"orange"} /> */}
          <shadowMaterial transparent={false} color={"#EBCC5F"} />
        </mesh>
        {/* <mesh position={[-2.5, 0, 0.5]}>
          <sphereGeometry args={[0.05, 32, 16]} />
          <shadowMaterial transparent={false} color={"#002279"} />
        </mesh> */}
        <mesh position={[0, 0, -5]}>
          <sphereGeometry args={[0.05, 32, 16]} />
          {/* <meshStandardMaterial color={"orange"} /> */}
          <shadowMaterial transparent={false} color={"#45A9D4"} />
        </mesh>
      </group>
    </group>
  );
}
