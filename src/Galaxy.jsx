import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Points } from "@react-three/drei";

export default function Galaxy() {
  const points = useRef();

  const parameters = {
    count: 1000,
    size: 0.1,
    radius: 10,
  };

  const positions = new Float32Array(parameters.count * 3);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * parameters.radius;
    positions[i3 + 1] = (Math.random() - 0.5) * parameters.radius;
    positions[i3 + 2] = (Math.random() - 0.5) * parameters.radius;
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      {/* <sphereGeometry args={[1, 48, 48]} /> */}
      <pointsMaterial
        color="#5786F5"
        size={parameters.size}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
