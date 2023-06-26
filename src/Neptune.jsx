import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";

export default function Neptune({ position }) {
  const { nodes, materials } = useGLTF("/models/neptune.glb");

  const [neptune1Color, setNeptune1Color] = useState({});
  const [neptune2Color, setNeptune2Color] = useState({});
  const [neptune3Color, setNeptune3Color] = useState({});
  const neptune1Ref = useRef();
  const neptune2Ref = useRef();
  const neptune3Ref = useRef();
  const neptuneWrapRef = useRef();

  useEffect(() => {
    setNeptune1Color({
      r: neptune1Ref.current.material.color.toArray()[0],
      g: neptune1Ref.current.material.color.toArray()[1],
      b: neptune1Ref.current.material.color.toArray()[2],
    });
    setNeptune2Color({
      r: neptune2Ref.current.material.color.toArray()[0],
      g: neptune2Ref.current.material.color.toArray()[1],
      b: neptune2Ref.current.material.color.toArray()[2],
    });
    setNeptune3Color({
      r: neptune3Ref.current.material.color.toArray()[0],
      g: neptune3Ref.current.material.color.toArray()[1],
      b: neptune3Ref.current.material.color.toArray()[2],
    });
  }, []);

  function NeptuneWrap({ position }) {
    return (
      <mesh
        castShadow
        position={position}
        ref={neptuneWrapRef}
        visible={false}
      >
        <sphereGeometry args={[0.23, 32, 16]} />
      </mesh>
    );
  }

  return (
    <group dispose={null}>
      <group position={position} scale={0.15}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_1.geometry}
          material={materials.Material}
          ref={neptune1Ref}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_2.geometry}
          material={materials["Material.001"]}
          ref={neptune2Ref}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_3.geometry}
          material={materials["Material.003"]}
          ref={neptune3Ref}
        />
      </group>
    </group>
  );
}

