
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import System, {
  Emitter,
  Rate,
  Span,
  Position,
  Mass,
  Radius,
  Life,
  PointZone,
  Vector3D,
  Alpha,
  Scale,
  Color,
  Body,
  RadialVelocity,
  SpriteRenderer,
  ColorSpan,
} from "three-nebula";

function generateRandomNumberInRange(num, plusMinus) {
  return num + (Math.random() * plusMinus * (Math.random() < 0.5 ? 1 : -1))
}

export default function Meteors() {
  const map = new THREE.TextureLoader().load("textures/dot.png")
  const material = new THREE.SpriteMaterial({
    map: map,
    color: new THREE.Color("#FF2727"),
    blending: THREE.AdditiveBlending,
    fog: true,
  })
  const sprite = new THREE.Sprite(material)

  const { scene } = useThree();

  const speeds = useRef([])
  const system = useRef();
  let numMeteors = 100
  const emitters = []
  for (let i = 0; i < numMeteors; i++) {
    emitters.push(useRef())
    speeds.current.push([
      generateRandomNumberInRange(6, 2), 
      generateRandomNumberInRange(3, 1)
    ])
  }
  

  const zone = new PointZone(0, 0);
  const colors = new ColorSpan([
    '#4CD3C2', // deep turquoise
    '#774CD3', // purple
    '#FBB122', // orange
    '#35FFFF', // cyan
    '#FFFFFF', // white
    '#CDCE02'
  ])
  colors.shouldRandomize = true

  useEffect(() => {
    console.log("[Celebration] no dependency use effect")
    system.current = new System();
    const renderer = new SpriteRenderer(scene, THREE);
    system.current.addRenderer(renderer)
    for (let i = 0; i < numMeteors; i++) {
      emitters[i].current = new Emitter();
      system.current.addEmitter(emitters[i].current)
    }
    return () => {
      for (let i = 0; i < numMeteors; i++) {
        emitters[i].current.destroy()
      }
      system.current.destroy()
    }
  }, [])

  useEffect(() => {
    console.log(`[Meteors] useEffect`)
    for (let i = 0; i < numMeteors; i++) {
      setTimeout(() => {
        const alpha = generateRandomNumberInRange(1, 0.4)
        const scale0 = generateRandomNumberInRange(1.5, 0.3)
        const scale1 = generateRandomNumberInRange(0.5, 0.3)
        let color0;
        let color1;
        color0 = colors.getValue()
        color1 = colors.getValue()
        emitters[i].current
        .setRate(new Rate(1, new Span(0.01)))
        .setInitializers([
          new Position(zone),
          new Mass(1),
          new Radius(0.1, 0.2),
          new Life(2),
          new Body(sprite),
        ])
        .setBehaviours([
          new Alpha(alpha, 0), 
          new Scale(scale0, scale1), 
          new Color(new THREE.Color(color0), new THREE.Color(color1)),
        ])
        .emit(20);
        emitters[i].current.position.x = generateRandomNumberInRange(11, 3)
        emitters[i].current.position.y = generateRandomNumberInRange(5, 6)
        emitters[i].current.position.z = 0

      }, 1000 * Math.random() * 0.3 * numMeteors)

    }

    return () => {
      // emitter0.current.stopEmit();
      // emitter0.current.stopEmit();
      // emitter1.current.stopEmit();
      // emitter2.current.stopEmit();
      // emitter3.current.stopEmit();
      // emitter4.current.stopEmit();
      // emitter5.current.stopEmit();
      // emitter6.current.stopEmit();
      // system.current.destroy();
    }
  }, [])

  useFrame((state, delta) => {
    if (system.current) {
      system.current.update();
      for (let i = 0; i < numMeteors; i++) {
        if (emitters[i].current) {
          emitters[i].current.position.x += (-delta * speeds.current[i][0])
          emitters[i].current.position.y += (-delta * speeds.current[i][1])
        }
      }
    }
  })

  return <OrbitControls/>
}