import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber"
import { useRef } from "react";

export default function Rocket({ position }) {
    const { nodes, materials } = useGLTF("/models/rocket-with-astronaut.glb");
    
    const rocketRef = useRef();
    const flameRef = useRef();

    useFrame((state, delta) => {
      // hovering
      // rocketRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.07
      
      //flame alive
      // flameRef.current.scale.y = 4 + Math.sin(state.clock.elapsedTime * 10) * 0.7
      
      // rocketRef.current.position.x = Math.sin(state.clock.elapsedTime * 1) * 0.4 + 0.1
      // rocketRef.current.position.z = Math.cos(state.clock.elapsedTime * 1) * 0.4 
      // rocketRef.current.position.y = -Math.cos(state.clock.elapsedTime * 1) * 0.4 
    })
    return (
      <group dispose={null} ref={rocketRef}>
        <group
          position={position}
          rotation={[Math.PI *3/4, 0, -Math.PI]}
          scale={0.009}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle007.geometry}
            material={materials["Ship White"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle007_1.geometry}
            material={materials["Ship red"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle007_2.geometry}
            material={materials["Alien Black"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle003.geometry}
            material={materials["Ship red"]}
            position={[-6.703, -24.668, -6.925]}
            rotation={[0.806, -0.595, 2.119]}
            scale={18.152}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle005.geometry}
            material={materials["Ship red"]}
            position={[0.008, -48.617, 12.536]}
            rotation={[0.009, -1.571, 0]}
            scale={[1.225, 1.376, 1.225]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle006.geometry}
            material={materials["Ship red"]}
            position={[12.544, -48.617, 0]}
            rotation={[0, 0, -0.009]}
            scale={[1.225, 1.376, 1.225]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle008.geometry}
            material={materials["Astronaut red"]}
            position={[-8.273, -26.198, -2.835]}
            rotation={[0.634, 0.103, Math.PI / 2]}
            scale={0.33}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube.geometry}
            material={nodes.Cube.material}
            position={[-7.987, -26.625, -3.186]}
            rotation={[0.634, -1.467, Math.PI / 2]}
            scale={8.171}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane.geometry}
            material={materials["Ship red"]}
            position={[0.008, -43.911, 6.028]}
            rotation={[0.702, 0, Math.PI / 2]}
            scale={13.763}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Icosphere.geometry}
            material={materials.Fire}
            position={[0.008, -50.335, 0]}
            rotation={[0.024, 1.289, 0]}
            scale={3.393}
            ref={flameRef}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane001.geometry}
            material={materials["Ship red"]}
            position={[6.036, -43.911, 0]}
            rotation={[Math.PI / 2, 0.869, 0]}
            scale={13.763}
          />
          <group
            position={[-6.539, -22.012, -9.453]}
            rotation={[-0.936, -Math.PI / 2, 0]}
            scale={4.202}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube006_1.geometry}
              material={materials.Black}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube006_2.geometry}
              material={materials["Astro White"]}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube007.geometry}
            material={materials["Astro White"]}
            position={[-6.539, -18.893, -7.157]}
            rotation={[-0.936, -1.571, 0]}
            scale={[-0.79, -1.12, -1.12]}
          />
          <group
            position={[-5.718, -24.503, -6.068]}
            rotation={[-0.936, -Math.PI / 2, 0]}
            scale={[2.608, 2.608, 2.062]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube008_1.geometry}
              material={materials["Astronaut red"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube008_2.geometry}
              material={materials["Astro White"]}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube009.geometry}
            material={materials["Astro White"]}
            position={[-5.718, -26.617, -3.197]}
            rotation={[-0.936, -Math.PI / 2, 0]}
            scale={[2.548, 2.548, 2.014]}
          />
          <group
            position={[-5.718, -27.179, -2.433]}
            rotation={[-0.936, -Math.PI / 2, 0]}
            scale={10.73}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube010_1.geometry}
              material={materials["Astronaut red"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube010_2.geometry}
              material={materials["Astro White"]}
            />
          </group>
        </group>
      </group>
    );
  }