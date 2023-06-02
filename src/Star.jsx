export default function star({ position, scale, nodes, materials }) {
  
  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.star.geometry}
      material={materials.GlowingStar}
      position={position}
      scale={scale}
    />
  );
}
