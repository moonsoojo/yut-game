import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { animated } from "@react-spring/three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
// import HelperArrow from "./HelperArrow";

export default function Saturn({ position=[0,0,0], rotation=[0,0,0], scale=1 }) {
  const { nodes, materials } = useGLTF("models/Saturn 3.glb");
  const satelliteTexture1 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-1.jpg"
  );
  const satelliteTexture2 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-2.jpg"
  );
  const satelliteTexture3 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-3.jpg"
  );
  const satelliteTexture4 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-4.jpg"
  );
  const satelliteTexture5 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-5.jpg"
  );
  const satelliteTexture6 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-6.jpg"
  );
  const satelliteTexture7 = useLoader(
    TextureLoader,
    "/textures/saturn-satellite-texture-map-7.jpg"
  );

  const satellitesRef = useRef();

  useFrame((state) => {
    satellitesRef.current.rotation.z = state.clock.elapsedTime * 0.5;
  });
  
  return (
    <animated.group position={position} rotation={rotation} scale={scale}>
      <group scale={0.9}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={materials["Saturn 2"]}
        >
          <group scale={0.625}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_1.geometry}
              material={materials["Material.003"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_2.geometry}
              material={materials["Material.004"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_3.geometry}
              material={materials["Material.005"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_4.geometry}
              material={materials["Material.006"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle_5.geometry}
              material={materials["Material.007"]}
            />
          </group>
          <group ref={satellitesRef} scale={5}>
            <mesh position={[ 0.5, 0, 0 ]}>
              <sphereGeometry args={[0.05, 32, 32]} />
              <meshStandardMaterial color={"#A59272"} map={satelliteTexture1} />
            </mesh>
            <mesh
              position={[
                Math.cos(Math.PI / 4) * 0.5,
                Math.sin(Math.PI / 4) * 0.5,
                0,
              ]}
            >
              <sphereGeometry args={[0.04, 32, 32]} />
              <meshStandardMaterial color={"#7A7974"} map={satelliteTexture2} />
            </mesh>
            <mesh
              position={[
                Math.cos((7 * Math.PI) / 16) * 0.5,
                Math.sin((7 * Math.PI) / 16) * 0.5,
                0,
              ]}
            >
              <sphereGeometry args={[0.03, 32, 32]} />
              <meshStandardMaterial color={"#A9ABA8"} map={satelliteTexture3} />
            </mesh>
            <mesh
              position={[
                Math.cos((16 * Math.PI) / 16) * 0.5,
                Math.sin((16 * Math.PI) / 16) * 0.5,
                0,
              ]}
            >
              <sphereGeometry args={[0.03, 32, 32]} />
              <meshStandardMaterial color={"#B0B0B0"} map={satelliteTexture4} />
            </mesh>
            <mesh
              position={[
                Math.cos((19 * Math.PI) / 16) * 0.5,
                Math.sin((19 * Math.PI) / 16) * 0.5,
                0,
              ]}
            >
              <sphereGeometry args={[0.025, 32, 32]} />
              <meshStandardMaterial color={"#9D9E98"} map={satelliteTexture5} />
            </mesh>
            <mesh
              position={[
                Math.cos((22 * Math.PI) / 16) * 0.5,
                Math.sin((22 * Math.PI) / 16) * 0.5,
                0,
              ]}
            >
              <sphereGeometry args={[0.02, 32, 32]} />
              <meshStandardMaterial color={"#8F8F8F"} map={satelliteTexture6} />
            </mesh>
            <mesh
              position={[
                Math.cos((24 * Math.PI) / 16) * 0.5,
                Math.sin((24 * Math.PI) / 16) * 0.5,
                0,
              ]}
            >
              <sphereGeometry args={[0.015, 32, 32]} />
              <meshStandardMaterial color={"#8F8F8F"} map={satelliteTexture7} />
            </mesh>
          </group>
        </mesh>
      </group>
      {/* <HelperArrow
        position={[0, 0, 0.9]}
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

useGLTF.preload("/models/Saturn 3.glb");