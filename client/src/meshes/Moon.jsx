import React, { useRef } from "react";
import { useTexture } from "@react-three/drei";
import { animated } from "@react-spring/three";

export default function Moon({ position=[0,0,0], rotation=[0,0,0], scale=1 }) {
  const props = useTexture({
    map: "textures/moon/moon-color.jpg", // must use absolute path - string starts with a slash
  });

  const moon = useRef();

  return (
    <animated.group
      ref={moon}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <group scale={3.4}>
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial map={props.map} />
        </mesh>
      </group>
      {/* <HelperArrow
        position={[0, 0, 1]}
        rotation={[Math.PI/2, 0, 0]}
        scale={0.9}
      />
      <HelperArrow
        position={[-1, 0, 0]}
        rotation={[0, 0, Math.PI/2]}
        scale={0.9}
      /> */}
    </animated.group>
  );
}