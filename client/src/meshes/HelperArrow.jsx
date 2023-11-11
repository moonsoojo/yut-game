import React from "react";

export default function HelperArrow({
  position,
  rotation,
  color = "#36454f",
  scale = 1,
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <coneGeometry args={[0.05, 0.25, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
