import React from "react";

export default function TextButton({
  position,
  rotation,
  handlePointerClick,
  text,
}) {
  const [hover, setHover] = useState(false);

  function handlePointerEnter() {
    setHover(true);
    document.body.style.cursor = "pointer";
  }

  function handlePointerOut() {
    setHover(false);
    document.body.style.cursor = "default";
  }

  return (
    <group position={position} rotation={rotation}>
      <mesh
        onPointerEnter={handlePointerEnter}
        onPointerOut={handlePointerOut}
        onPointerDown={handlePointerClick}
      >
        {/* scale this with text */}
        <boxGeometry args={[1, 0.25, 0.1]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
      <Text3D font="./fonts/Luckiest Guy_Regular.json" size={0.3} height={0.01}>
        {text} <meshStandardMaterial color={hover ? "white" : "yellow"} />
      </Text3D>
    </group>
  );
}
