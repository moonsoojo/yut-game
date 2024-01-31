import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
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
  Alpha,
  Scale,
  Color,
  Body,
  SpriteRenderer,
  Force,
  ColorSpan,
} from "three-nebula";

function DustParticle({position, delay, sprite}) {

  const { scene } = useThree();

  const system = React.useRef();
  const emitter = React.useRef();
  emitter.current = new Emitter();

  useEffect(() => {
    console.log("useEffect")
    // couldn't abstract the renderer or the system
    system.current = new System(); 
    const renderer = new SpriteRenderer(scene, THREE);
    system.current.addRenderer(renderer)
    return () => {
      console.log("return")
      // system.current.removeRenderer(renderer)
      emitter.current.removeAllParticles();
      emitter.current.destroy();
    }
  }, [])
  

  let emitterTime = 0.04 + delay
  let destroyTime = 1 + delay
  let timeInc = 1

  const zone = new PointZone(0, 0);
  const colors = new ColorSpan(['#00FFD1'])
  // colors.shouldRandomize = true

  //destroy emitters after timeCount
  useFrame((state, delta) => {
    if (system.current !== undefined) {
      system.current.update();

      if (state.clock.elapsedTime > emitterTime) {
        emitterTime += timeInc
        
        emitter.current = new Emitter();
        emitter.current
          .setRate(new Rate(new Span(1, 1), new Span(0.01)))
          .setInitializers([
            new Position(zone),
            new Mass(1, 3),
            new Radius(0.05),
            new Life(1, 2.2),
            new Body(sprite),
            // new RadialVelocity(new Span(2, 2.3), new Vector3D(0, 3, 0), 180),
          ])
          .setBehaviours([
            new Alpha(5, 0), 
            new Scale(1, 1.5), 
            new Color(new THREE.Color(colors.getValue()), new THREE.Color(colors.getValue())),
            new Force((0 - position.x) / 200, 0.05, (0 - position.z) / 200)
          ])
          .emit(1)

        emitter.current.position.x = position.x
        emitter.current.position.y = position.y
        emitter.current.position.z = position.z
          
        system.current.addEmitter(emitter.current)
      } 
      if (state.clock.elapsedTime > destroyTime) {
        emitter.current.removeAllParticles(); // need this to not display particles again
        emitter.current.destroy();
  
        destroyTime += timeInc
      }
    }
  })

  return <>

  </>
}

export default function Dust({sprite, count, spawnDelay}) {
  const dust = [];
  const dustCount = count
  const dustHeight = -3.5
  const dustRadius = 2.9
  for (let i = 0; i < dustCount; i++) {
    const position={
      x: Math.random() * dustRadius * (Math.random() < 0.5 ? 1 : -1),
      y: Math.random() * 0.5 * (Math.random() < 0.5 ? 1 : -1) + dustHeight,
      z: Math.random() * dustRadius * (Math.random() < 0.5 ? 1 : -1) + 2,
    }

    dust.push(<DustParticle position={{
      x: position.x,
      y: position.y,
      z: position.z,
    }} 
    delay={i * spawnDelay}
    key={i}
    sprite={sprite}
    />)
  }
  return dust;
}