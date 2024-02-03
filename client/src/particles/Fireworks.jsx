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
export default function Fireworks({ delay, position, sprite }) {
  const { scene } = useThree();

  const system = React.useRef();
  const emitter2 = React.useRef();

  useEffect(() => {
    system.current = new System();
    const renderer = new SpriteRenderer(scene, THREE);
    system.current.addRenderer(renderer)
    return () => {
      emitter2.current.removeAllParticles();
      emitter2.current.destroy();
      system.current.destroy()
    }
  }, [])

  let boomTime = 0.08 + delay
  let destroyTime = 1 + delay
  let timeInc = 1
  const lifeTime = 1.4;

  const zone = new PointZone(0, 0);
  const colors = new ColorSpan()
  colors.shouldRandomize = true

  //destroy emitters after timeCount
  useFrame((state, delta) => {
    if (system.current !== undefined) {
      system.current.update();

      if (state.clock.elapsedTime > boomTime) {
        boomTime += timeInc
        
        emitter2.current = new Emitter();
        emitter2.current
          .setRate(new Rate(new Span(100, 200), new Span(0.01)))
          .setInitializers([
            new Position(zone),
            new Mass(1, 3),
            new Radius(0.1),
            new Life(lifeTime, lifeTime+1),
            new Body(sprite),
            new RadialVelocity(new Span(2, 2.3), new Vector3D(0, 3, 0), 180),
          ])
          .setBehaviours([
            new Alpha(5, 0), 
            new Scale(1, 1.3), 
            new Color(new THREE.Color(colors.getValue()), new THREE.Color(colors.getValue())),
            // new Force(0, -0.01, 0)
          ])
          .emit(1)

        emitter2.current.position.x = position.x + Math.random() * position.xRange + (Math.random() < 0.5 ? 1 : -1)
        emitter2.current.position.y = position.y + Math.random() * position.yRange + (Math.random() < 0.5 ? 1 : -1)
        emitter2.current.position.z = position.z + Math.random() * position.zRange + (Math.random() < 0.5 ? 1 : -1)
          
        system.current.addEmitter(emitter2.current)
      } 
      if (state.clock.elapsedTime > destroyTime) {
        emitter2.current.removeAllParticles(); // need this to not display particles again
        emitter2.current.destroy();
  
        destroyTime += timeInc
      }
    }
  })
}