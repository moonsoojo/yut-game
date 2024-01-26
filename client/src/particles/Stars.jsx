import React from "react";
import * as THREE from "three";

function randomNumberBetween(min, max) {
  return min + Math.random() * (max - min);
}

const countNeptune1 = 1000;
const sizeNeptune = 0.2;
const radius1MinNeptune = -20;
const radius1MaxNeptune = 20;
const colorOneHex = "#FFFFFF";
const colorTwoHex = "#000000";
const positions1 = new Float32Array(countNeptune1 * 3);
const colors1 = new Float32Array(countNeptune1 * 3);
const colorInitial = new THREE.Color(colorOneHex);
const colorFinal = new THREE.Color(colorTwoHex);
const textureLoader = new THREE.TextureLoader();
const pointsMap = textureLoader.load("/textures/1.png");

for (let i = 0; i < countNeptune1; i++) {
  const i3 = i * 3;

  const randomX1 = randomNumberBetween(radius1MinNeptune, radius1MaxNeptune);
  const randomY1 = randomNumberBetween(radius1MinNeptune, radius1MaxNeptune);
  const randomZ1 = randomNumberBetween(radius1MinNeptune, radius1MaxNeptune);

  positions1[i3] = randomX1;
  positions1[i3 + 1] = randomY1;
  positions1[i3 + 2] = randomZ1;

  const mixedColor = colorInitial.clone();
  mixedColor.lerp(colorFinal, Math.random());

  colors1[i3] = mixedColor.r;
  colors1[i3 + 1] = mixedColor.g;
  colors1[i3 + 2] = mixedColor.b;
}


function stars(position) {
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
          size={sizeNeptune}
          sizeAttenuation
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          // depthTest={false}
          alphaTest={0}
          map={pointsMap}
          vertexColors={true}
        />
      </points>
    </group>
  );
}

export default function Stars({
  position=[0,0,0],
}) {
  return stars(position);
}
