import React from "react";
import { Text3D } from "@react-three/drei";
import Yut from "./Yut";

export default function DiceDetails() {
  return (
    <>
      <Text3D
        position={[-4.5, 0, 1.5]}
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
      <group position={[-3.8, 0, 6.5]} rotation={[0, 0, 0]}>
        <Text3D
          font="./fonts/Luckiest Guy_Regular.json"
          height={0.01}
          size={0.2}
          rotation={[0, Math.PI / 2, 0]}
          position={[-1, 0, 0]}
        >
          1 Step (Do)
          <meshStandardMaterial color="#D9D9D9" />
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
      <group position={[-3.8, 0, 4.5]} rotation={[0, 0, 0]}>
        <Text3D
          font="./fonts/Luckiest Guy_Regular.json"
          height={0.01}
          size={0.2}
          rotation={[0, Math.PI / 2, 0]}
          position={[-1, 0, 0]}
        >
          <meshStandardMaterial color="#D9D9D9" />
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
      <group position={[-1.8, 0, 6.5]} rotation={[0, 0, 0]}>
        <Text3D
          font="./fonts/Luckiest Guy_Regular.json"
          height={0.01}
          size={0.2}
          rotation={[0, Math.PI / 2, 0]}
          position={[-1, 0, 0]}
        >
          2 Steps (Ge)
          <meshStandardMaterial color="#D9D9D9" />
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
      <group position={[0.2, 0, 6.5]} rotation={[0, 0, 0]}>
        <Text3D
          font="./fonts/Luckiest Guy_Regular.json"
          height={0.01}
          size={0.2}
          rotation={[0, Math.PI / 2, 0]}
          position={[-1, 0, 0]}
        >
          3 Steps (Gul)
          <meshStandardMaterial color="#D9D9D9" />
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
      <group position={[2.2, 0, 6.5]} rotation={[0, 0, 0]}>
        <Text3D
          font="./fonts/Luckiest Guy_Regular.json"
          height={0.01}
          size={0.2}
          rotation={[0, Math.PI / 2, 0]}
          position={[-1, 0, 0]}
        >
          4 Steps (Yut)
          <meshStandardMaterial color="#D9D9D9" />
        </Text3D>
        <Yut type="regular" position={[0, 0, 0]} scale={0.1} />
        <Yut type="regular" position={[0, 0, -0.3]} scale={0.1} />
        <Yut type="regular" position={[0, 0, -0.6]} scale={0.1} />
        <Yut type="backdo" position={[0, 0, -0.9]} scale={0.1} />
      </group>
      <group position={[4.2, 0, 6.5]} rotation={[0, 0, 0]}>
        <Text3D
          font="./fonts/Luckiest Guy_Regular.json"
          height={0.01}
          size={0.2}
          rotation={[0, Math.PI / 2, 0]}
          position={[-1, 0, 0]}
        >
          5 Steps (Mo)
          <meshStandardMaterial color="#D9D9D9" />
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