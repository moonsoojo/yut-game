import React from "react";
import * as THREE from "three";

function randomNumberBetween(min, max) {
  return min + Math.random() * (max - min);
}

export default function Stars({ position=[0,0,0], count=1000, size=0.2 }) {
  const radius1MinNeptune = 5;
  const radius1MaxNeptune = 20;
  const colorOneHex = "#FFFFFF";
  const colorTwoHex = "#000000";
  const positions1 = new Float32Array(count * 3);
  const colors1 = new Float32Array(count * 3);
  const colorInitial = new THREE.Color(colorOneHex);
  const colorFinal = new THREE.Color(colorTwoHex);
  const textureLoader = new THREE.TextureLoader();
  const pointsMap = textureLoader.load("/textures/particles/1.png");

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
  
    // const randomX1 = randomNumberBetween(radius1MinNeptune, radius1MaxNeptune);
    // const randomY1 = randomNumberBetween(radius1MinNeptune, radius1MaxNeptune);
    // const randomZ1 = randomNumberBetween(radius1MinNeptune, radius1MaxNeptune);

    let radius = randomNumberBetween(radius1MinNeptune, radius1MaxNeptune);

    const theta = Math.random() * Math.PI; // polar angle
    const phi = Math.random() * 2 * Math.PI; // azimuthal angle
    const x = radius * Math.sin(theta) * Math.cos(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(theta);
  
    positions1[i3] = x;
    positions1[i3 + 1] = y;
    positions1[i3 + 2] = z;
  
    const mixedColor = colorInitial.clone();
    mixedColor.lerp(colorFinal, Math.random());
  
    colors1[i3] = mixedColor.r;
    colors1[i3 + 1] = mixedColor.g;
    colors1[i3 + 2] = mixedColor.b;
  }

  return (
    <group position={position}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions1.length / 3}
            array={positions1}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors1.length / 3}
            array={colors1}
            itemSize={3}
            normalized
          />
        </bufferGeometry>
        <pointsMaterial
          color="white"
          size={size}
          sizeAttenuation
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          alphaTest={0}
          map={pointsMap}
          vertexColors={true}
        />
      </points>
    </group>
  );
}
