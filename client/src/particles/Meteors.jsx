import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useState } from 'react';
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

// boom on both sides
export default function Meteors({ delay=0, sprite, alpha, spawnPos }) {
  const { scene } = useThree();

  const system = React.useRef();
  const emitter = React.useRef();

  useEffect(() => {
    system.current = new System();
    const renderer = new SpriteRenderer(scene, THREE);
    system.current.addRenderer(renderer)

    emitter.current = new Emitter();
    emitter.current
    .setRate(new Rate(new Span(4, 16), new Span(0.01)))
    .setInitializers([
      new Position(zone),
      new Mass(1),
      new Radius(0.1, 0.2),
      new Life(1),
      new Body(sprite),
      new RadialVelocity(1, new Vector3D(0, 1, 0), 2)
    ])
    .setBehaviours([
      new Alpha(alpha, 0), 
      new Scale(1.5, 1), 
      new Color(new THREE.Color(colors.getValue()), new THREE.Color(colors.getValue())),
    ])
    .emit();

    system.current.addEmitter(emitter.current)

    return () => {
      // emitter.current.removeAllParticles();
      // emitter.current.destroy();
      // system.current.destroy();
    }
  }, [])

  let boomTime = 1 + delay
  let destroyTime = 3 + delay
  const lifeTime = 1.4;

  const zone = new PointZone(0, 0);
  const colors = new ColorSpan()
  colors.shouldRandomize = true

  //destroy emitters after timeCount
  useFrame((state, delta) => {
    if (system.current !== undefined) {
      system.current.update();

      if (state.clock.elapsedTime > boomTime) {

        boomTime += delta
        
        emitter.current.position.x = -boomTime * 4 + spawnPos[0]
        emitter.current.position.y = 5
        emitter.current.position.z = boomTime * 2 + spawnPos[2]
      } 
      if (state.clock.elapsedTime > destroyTime) {
        
        destroyTime += delta

        emitter.current.position.x = spawnPos[0]
        emitter.current.position.y = 5
        emitter.current.position.z = spawnPos[2]
        // emitter.current.removeAllParticles(); // need this to not display particles again
        // emitter.current.destroy();
      }
    }
  })
}