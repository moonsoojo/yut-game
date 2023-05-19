import { RigidBody, Physics } from "@react-three/rapier";

export default function Yut({ ref, yutThrow }) {
  return (
    <>
      <RigidBody
        ref={ref}
        position={[0, 1, 0]}
        colliders="trimesh"
        rotation={[Math.PI * 0.5, 0, 0]}
        restitution={0.5}
        friction={0.5}
      >
        <mesh castShadow onClick={yutThrow}>
          <boxGeometry args={[0.1, 0.5, 0.1]} />x
          <meshStandardMaterial color="brown" />
        </mesh>
      </RigidBody>
    </>
  );
}
