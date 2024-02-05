import React from "react";

export default function HelperArrow({
  position,
  rotation,
  color = "#36454f",
  scale = 1,
}) {
  let scaleArray
  if (scale.length === 3) {
    scaleArray = scale
  } else {
    scaleArray=[1 * scale, 1 * scale, 0.8 * scale]
  }
  return (
    <mesh position={position} rotation={rotation} scale={scaleArray}>
      <coneGeometry args={[0.05, 0.25, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
