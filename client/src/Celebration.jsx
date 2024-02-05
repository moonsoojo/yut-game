import { Text3D } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useAtom } from 'jotai';
import React, { useEffect, useMemo, useRef, useState } from 'react';
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

export default function Celebration() {

  const map = useMemo(() => new THREE.TextureLoader().load("textures/dot.png"), [])
  const material = useMemo(() => new THREE.SpriteMaterial({
    map: map,
    color: new THREE.Color("#FF2727"),
    blending: THREE.AdditiveBlending,
    fog: true,
  }), [map])
  const sprite = useMemo(() => new THREE.Sprite(material), [material])

  const { scene } = useThree();

  const system = useRef();
  let numMeteors = 7
  const emitter0 = useRef();
  const emitter1 = useRef();
  const emitter2 = useRef();
  const emitter3 = useRef();
  const emitter4 = useRef();
  const emitter5 = useRef();
  const emitter6 = useRef();
  const emitter7 = useRef();
  const emitter8 = useRef();
  const emitter9 = useRef();
  const emitters = [emitter0, emitter1, emitter2, emitter3, emitter4, emitter5, emitter6, emitter7, emitter8, emitter9]
  const speeds = useRef([
    [4.1, 2.9],
    [4.3, 1.67],
    [4.7, 1.3],
    [3.2, 2.8],
    [4.6, 1.5],
    [3.7, 1.8],
    [4.9, 2.3],
    [3.3, 1.6],
    [4.13, 2.69],
    [3.8, 2.31]
  ]);

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
      for (let i = 0; i < numMeteors; i++) {
        const alpha = generateRandomNumberInRange(1, 0.4)
        const scale0 = generateRandomNumberInRange(1.5, 0.3)
        const scale1 = generateRandomNumberInRange(0.5, 0.3)
        let color0;
        let color1;
          color0 = colors.getValue()
          color1 = colors.getValue()
        setTimeout(() => {
          emitters[i].current
          .setRate(new Rate(1, new Span(0.01)))
          .setInitializers([
            new Position(zone),
            new Mass(1),
            new Radius(0.1, 0.2),
            new Life(2),
            new Body(sprite),
            new RadialVelocity(1, new Vector3D(0, 1, 0), 2)
          ])
          .setBehaviours([
            new Alpha(alpha, 0), 
            new Scale(scale0, scale1), 
            new Color(new THREE.Color(color0), new THREE.Color(color1)),
          ])
          .emit(7);
    
          emitters[i].current.position.x = i * 3 - 3
          emitters[i].current.position.y = 5
          emitters[i].current.position.z = generateRandomNumberInRange(-3, 2)
      
        }, 1000 * Math.random() * 1.5)
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
    console.log(`[CelebrationMeteors] not expired`)
    if (system.current) {
      system.current.update();
      for (let i = 0; i < numMeteors; i++) {
        if (emitters[i].current) {
          emitters[i].current.position.x += (-delta * speeds.current[i][0])
          emitters[i].current.position.z += (delta * speeds.current[i][1])
        }
      }
    }
  })

  return
}