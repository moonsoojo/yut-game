import React from "react";
import { Text3D } from "@react-three/drei";
import Yut from "./meshes/Yut";

export default function DiceDetails() {
  return (
    <>
      <Text3D
        position={[-5, 0, 1.5]}
        rotation={[0, Math.PI / 2, 0]}
        font="./fonts/Luckiest Guy_Regular.json"
        castShadow={false}
        size={0.3}
        height={0.01}
        receiveShadow
      >
        Press the Spacebar!
        <meshStandardMaterial color="yellow" />
      </Text3D>
      <group position={[-4, 0, 6.5]} rotation={[0, 0, 0]}>
        <Text3D
          font="./fonts/Luckiest Guy_Regular.json"
          height={0.01}
          size={0.2}
          rotation={[0, Math.PI / 2, 0]}
          position={[-1, 0, 0]}
        >
          1 Step (Do)
          <meshStandardMaterial color="white" />
        </Text3D>
        <Yut
          type="regular"
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={0.1}
        />
        <Yut
          type="regular"
          position={[0, 0, -0.3]}
          rotation={[Math.PI, 0, 0]}
          scale={0.1}
        />
        <Yut
          type="regular"
          position={[0, 0, -0.6]}
          rotation={[Math.PI, 0, 0]}
          scale={0.1}
        />
        <Yut
          type="backdo"
          position={[0, 0, -0.9]}
          rotation={[Math.PI, 0, 0]}
          scale={0.1}
        />
      </group>
      <group position={[-4, 0, 4.5]} rotation={[0, 0, 0]}>
        <Text3D
          font="./fonts/Luckiest Guy_Regular.json"
          height={0.01}
          size={0.2}
          rotation={[0, Math.PI / 2, 0]}
          position={[-1, 0, 0]}
        >
          <meshStandardMaterial color="white" />
          Back Step (BackDo)
        </Text3D>
        <Yut
          type="regular"
          position={[0, 0, 0]}
          rotation={[Math.PI, 0, 0]}
          scale={0.1}
        />
        <Yut
          type="regular"
          position={[0, 0, -0.3]}
          rotation={[Math.PI, 0, 0]}
          scale={0.1}
        />
        <Yut
          type="regular"
          position={[0, 0, -0.6]}
          rotation={[Math.PI, 0, 0]}
          scale={0.1}
        />
        <Yut type="backdo" position={[0, 0, -0.9]} scale={0.1} />
      </group>
      <group position={[-2, 0, 6.5]} rotation={[0, 0, 0]}>
        <Text3D
          font="./fonts/Luckiest Guy_Regular.json"
          height={0.01}
          size={0.2}
          rotation={[0, Math.PI / 2, 0]}
          position={[-1, 0, 0]}
        >
          2 Steps (Ge)
          <meshStandardMaterial color="white" />
        </Text3D>
        <Yut type="regular" position={[0, 0, 0]} scale={0.1} />
        <Yut type="regular" position={[0, 0, -0.3]} scale={0.1} />
        <Yut
          type="regular"
          position={[0, 0, -0.6]}
          rotation={[Math.PI, 0, 0]}
          scale={0.1}
        />
        <Yut
          type="backdo"
          position={[0, 0, -0.9]}
          rotation={[Math.PI, 0, 0]}
          scale={0.1}
        />
      </group>
      <group position={[0, 0, 6.5]} rotation={[0, 0, 0]}>
        <Text3D
          font="./fonts/Luckiest Guy_Regular.json"
          height={0.01}
          size={0.2}
          rotation={[0, Math.PI / 2, 0]}
          position={[-1, 0, 0]}
        >
          3 Steps (Gul)
          <meshStandardMaterial color="white" />
        </Text3D>
        <Yut type="regular" position={[0, 0, 0]} scale={0.1} />
        <Yut type="regular" position={[0, 0, -0.3]} scale={0.1} />
        <Yut type="regular" position={[0, 0, -0.6]} scale={0.1} />
        <Yut
          type="backdo"
          position={[0, 0, -0.9]}
          rotation={[Math.PI, 0, 0]}
          scale={0.1}
        />
      </group>
      <group position={[2, 0, 6.5]} rotation={[0, 0, 0]}>
        <Text3D
          font="./fonts/Luckiest Guy_Regular.json"
          height={0.01}
          size={0.2}
          rotation={[0, Math.PI / 2, 0]}
          position={[-1, 0, 0]}
        >
          4 Steps (Yut)
          <meshStandardMaterial color="white" />
        </Text3D>
        <Yut type="regular" position={[0, 0, 0]} scale={0.1} />
        <Yut type="regular" position={[0, 0, -0.3]} scale={0.1} />
        <Yut type="regular" position={[0, 0, -0.6]} scale={0.1} />
        <Yut type="backdo" position={[0, 0, -0.9]} scale={0.1} />
      </group>
      <group position={[4, 0, 6.5]} rotation={[0, 0, 0]}>
        <Text3D
          font="./fonts/Luckiest Guy_Regular.json"
          height={0.01}
          size={0.2}
          rotation={[0, Math.PI / 2, 0]}
          position={[-1, 0, 0]}
        >
          5 Steps (Mo)
          <meshStandardMaterial color="white" />
        </Text3D>
        <Yut
          type="regular"
          position={[0, 0, 0]}
          rotation={[Math.PI, 0, 0]}
          scale={0.1}
        />
        <Yut
          type="regular"
          position={[0, 0, -0.3]}
          rotation={[Math.PI, 0, 0]}
          scale={0.1}
        />
        <Yut
          type="regular"
          position={[0, 0, -0.6]}
          rotation={[Math.PI, 0, 0]}
          scale={0.1}
        />
        <Yut
          type="backdo"
          position={[0, 0, -0.9]}
          rotation={[Math.PI, 0, 0]}
          scale={0.1}
        />
      </group>
      <group></group>
    </>
  );
}
