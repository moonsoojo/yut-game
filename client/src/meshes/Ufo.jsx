import { useGLTF } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { animated } from "@react-spring/three";
import React from "react";
import * as THREE from 'three';

export default function Ufo({
  position=[0,0,0],
  rotation=[0,0,0],
  scale=1,
  animation=null
}) {
  const { scene, materials } = useGLTF("models/ufo.glb");

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const ufoGlass = useRef();
  const balls = useRef();
  const ufo = useRef();
  const frontBackPanelCircleMat = useRef();
  const leftRightPanelCircleMat = useRef();
  const ballFrontRightMatRef = useRef();
  const ballFrontLeftMatRef = useRef();
  const ballBackRightMatRef = useRef();
  const ballBackLeftMatRef = useRef();

  useEffect(() => {
    ufoGlass.current.material.opacity = 0.2;
  }, []);

  useFrame((state, delta) => {
    if (animation === 'selectable') {
      balls.current.rotation.y = state.clock.elapsedTime * 0.7;
      if (Math.floor(state.clock.elapsedTime) % 2 == 0) {
        frontBackPanelCircleMat.current.color = new THREE.Color('white')
        leftRightPanelCircleMat.current.color = new THREE.Color('purple')
        ballFrontRightMatRef.current.color = new THREE.Color('purple')
        ballFrontLeftMatRef.current.color = new THREE.Color('white')
        ballBackRightMatRef.current.color = new THREE.Color('white')
        ballBackLeftMatRef.current.color = new THREE.Color('purple')
        ufoGlass.current.material.opacity = 0.6
      } else {
        frontBackPanelCircleMat.current.color = new THREE.Color('purple')
        leftRightPanelCircleMat.current.color = new THREE.Color('white')
        ballFrontRightMatRef.current.color = new THREE.Color('white')
        ballFrontLeftMatRef.current.color = new THREE.Color('purple')
        ballBackRightMatRef.current.color = new THREE.Color('purple')
        ballBackLeftMatRef.current.color = new THREE.Color('white')
        ufoGlass.current.material.opacity = 0.2
      }
    } else if (animation === 'onBoard') {
      balls.current.rotation.y = state.clock.elapsedTime * 0.7;
    }
  });

  return (
    <animated.group position={position} rotation={rotation} scale={scale} ref={ufo}>
      <animated.group
        dispose={null}
        scale={0.5}
      >
        <group rotation={[-Math.PI/4,0,0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle024_1.geometry}
            material={materials.White}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle024_2.geometry}
            material={materials.Blue}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle024_3.geometry}
            material={materials.Grey}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle024_4.geometry}
            material={materials["Alien Black"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle024_5.geometry}
            material={materials["Inside Grey"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle.geometry}
            material={materials["Panel Grey"]}
            position={[-0.164, -0.051, 0.411]}
            scale={[0.015, 0.047, 0.015]}
          />
          {/* front and back panel circle */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle002.geometry}
            material={materials.Blue}
            position={[0, 0, 0.765]}
            scale={0.087}
          >
            <meshBasicMaterial color='turquoise' ref={frontBackPanelCircleMat}/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle013.geometry}
            material={materials["Inside Grey"]}
            position={[0, -0.051, 0]}
          />
          {/* left and right panel circle */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle024.geometry}
            material={materials.Blue}
            position={[0.765, 0, 0]}
            rotation={[0, 1.571, 0]}
            scale={0.087}
          >
            <meshBasicMaterial color='turquoise' ref={leftRightPanelCircleMat}/>
          </mesh>
          <group position={[0, -0.051, 0]} rotation={[0, -0.365, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle038.geometry}
              material={materials["Panel Grey"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle038_1.geometry}
              material={materials.red}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle038_2.geometry}
              material={materials.Green}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.NurbsPath002.geometry}
            material={materials["Alien Black"]}
            position={[0.001, 0.182, 0.375]}
            scale={0.37}
          />
          <group ref={balls}>
            {/* ball front right */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube001.geometry}
              material={materials.Blue}
              position={[0.252, -0.592, 0.252]}
              scale={0.128}
            >
              <meshBasicMaterial color='turquoise' ref={ballFrontRightMatRef}/>
            </mesh>
            {/* ball front left */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube028.geometry}
              material={materials.Blue}
              position={[-0.252, -0.592, 0.252]}
              scale={0.128}
            >
              <meshBasicMaterial color='turquoise' ref={ballFrontLeftMatRef}/>
            </mesh>
            {/* ball back right */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube029.geometry}
              material={materials.Blue}
              position={[0.252, -0.592, -0.252]}
              scale={0.128}
            >
              <meshBasicMaterial color='turquoise' ref={ballBackRightMatRef}/>
            </mesh>
            {/* ball back left */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube030.geometry}
              material={materials.Blue}
              position={[-0.252, -0.592, -0.252]}
              scale={0.128}
            >
              <meshBasicMaterial color='turquoise' ref={ballBackLeftMatRef}/>
            </mesh>
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube002.geometry}
            material={materials["Blue Alien"]}
            position={[0, 0.492, 0.138]}
            scale={0.299}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube003.geometry}
            material={materials["White Alien"]}
            position={[0, 0.096, 0.125]}
            scale={0.104}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube004.geometry}
            material={materials["White Alien"]}
            position={[0.138, 0.026, 0.324]}
            rotation={[1.869, -0.449, -0.197]}
            scale={[-0.037, -0.043, -0.037]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube005.geometry}
            material={materials["Blue Alien"]}
            position={[0.163, -0.006, 0.397]}
            rotation={[2.426, -1.563, -2.477]}
            scale={[0.029, 0.042, 0.042]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube027.geometry}
            material={materials["Blue Alien"]}
            position={[0.142, -0.022, 0.381]}
            rotation={[-2.03, -1.157, -0.683]}
            scale={[0.01, 0.023, 0.014]}
          />

          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube031.geometry}
            material={materials["White Alien"]}
            position={[-0.127, 0.026, 0.326]}
            rotation={[-1.107, 0.274, -0.261]}
            scale={[0.037, 0.043, 0.037]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube032.geometry}
            material={materials["Blue Alien"]}
            position={[-0.165, 0.007, 0.389]}
            rotation={[-1.107, 0.274, -0.261]}
            scale={[0.029, 0.042, 0.042]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube033.geometry}
            material={materials["Blue Alien"]}
            position={[-0.139, 0.023, 0.389]}
            rotation={[-1.294, 0.655, -0.208]}
            scale={[0.01, 0.023, 0.014]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere.geometry}
            material={materials["Panel Grey"]}
            position={[-0.164, 0.062, 0.411]}
            scale={-0.041}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere001.geometry}
            material={materials["Eyes Black"]}
            position={[0.138, 0.361, 0.37]}
            rotation={[1.401, -0.566, -0.511]}
            scale={[-0.08, -0.052, -0.115]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere002.geometry}
            material={materials["Eyes White"]}
            position={[0.154, 0.387, 0.415]}
            rotation={[1.489, -0.121, -0.36]}
            scale={[0.037, 0.012, 0.037]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere003.geometry}
            material={materials["Eyes White"]}
            position={[0.115, 0.308, 0.418]}
            rotation={[1.895, -0.107, -0.153]}
            scale={[0.017, 0.006, 0.017]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere008.geometry}
            material={materials.Glass}
            position={[0, 0.33, 0]}
            scale={0.404}
            ref={ufoGlass}
          />
        </group>
      </animated.group>
    </animated.group>
  );
}