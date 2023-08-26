import React from "react";
import { Text3D } from "@react-three/drei";
import Yut from "./Yut";

export default function DiceDetails() {
  return (
    <>
      <Text3D
        position={[-8, 0, 0]}
        rotation={[0, Math.PI / 4, 0]}
        font="./fonts/Luckiest Guy_Regular.json"
        castShadow={false}
        size={0.3}
        height={0.01}
        receiveShadow
      >
        Press the Spacebar!
        <meshStandardMaterial color="yellow" />
      </Text3D>
      <group position={[-7, 0, 2]} rotation={[0, -Math.PI / 4, 0]}>
        <Text3D
          font="./fonts/Luckiest Guy_Regular.json"
          height={0.01}
          size={0.25}
          rotation={[0, Math.PI / 2, 0]}
          position={[-1, 0, 0]}
        >
          1 Step (Do)
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
      <group position={[-6, 0, 3]} rotation={[0, -Math.PI / 4, 0]}>
        <Text3D
          font="./fonts/Luckiest Guy_Regular.json"
          height={0.01}
          size={0.25}
          rotation={[0, Math.PI / 2, 0]}
          position={[-1, 0.5, 0]}
        >
          2 Steps (Ge)
        </Text3D>
        <group rotation={[0, 0, -Math.PI / 4]}>
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
      </group>
      <group position={[-4.5, 0, -6]} rotation={[0, -Math.PI / 4, 0, "ZXY"]}>
        <Text3D
          font="./fonts/Luckiest Guy_Regular.json"
          height={0.01}
          size={0.25}
          rotation={[0, Math.PI / 2, 0]}
          position={[-1, 0.5, 0]}
        >
          3 Steps (Gul)
        </Text3D>
        <group rotation={[0, 0, -Math.PI / 4]}>
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
      </group>
      <group></group>
      <group></group>
      <group></group>
    </>
  );
}
