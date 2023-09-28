import Tile from "./components/Tile"

export default function Star({ position, tile, device = "mobile" }) {
  const { scene, materials, animations } = useGLTF(
    "/models/stars/star-yellow copy 1.glb"
  );

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  return (
    <Tile position={position}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star.geometry}
        scale={0.15}
      >
        <meshStandardMaterial color={"yellow"} />
      </mesh>
    </Tile>
  );
}
