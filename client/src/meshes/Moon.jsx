import React, { useRef } from "react";
import { useTexture } from "@react-three/drei";
import { animated } from "@react-spring/three";
import * as THREE from 'three';
import AtmosphereFragmentShader from '../shader/moon/atmosphere/fragment.glsl'
import AtmosphereVertexShader from '../shader/moon/atmosphere/vertex.glsl'
import FragmentShader from '../shader/moon/fragment.glsl'
import VertexShader from '../shader/moon/vertex.glsl'

export default function Moon({ position=[0,0,0], rotation=[0,0,0], scale=1 }) {
  const textureLoader = new THREE.TextureLoader()
  const moonTexture = textureLoader.load("textures/moon/moon-color.jpg") // must use absolute path - string starts with a slash
  moonTexture.colorSpace = THREE.SRGBColorSpace

  const moon = useRef();

  return (
    <animated.group
      ref={moon}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <group scale={3.4}>
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <shaderMaterial
            vertexShader={VertexShader}
            fragmentShader={FragmentShader}
            uniforms={{
              uSunDirection: new THREE.Uniform(new THREE.Vector3(0,0,0)),
              uMoonTexture: new THREE.Uniform(moonTexture),
              uAtmosphereDayColor: new THREE.Uniform(new THREE.Color('#C0C0C0')),
              uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color('#D0D0D0'))
            }}
          />
        </mesh>
        <mesh scale={1.5}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <shaderMaterial 
          side={THREE.BackSide} 
          transparent 
          vertexShader={AtmosphereVertexShader}
          fragmentShader={AtmosphereFragmentShader}
          uniforms={{
            uSunDirection: new THREE.Uniform(new THREE.Vector3(0,0,0)),
            uAtmosphereDayColor: new THREE.Uniform(new THREE.Color('#C0C0C0')),
            uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color('#C0C0C0')),
          }}
          />
        </mesh>
      </group>
    </animated.group>
  );
}