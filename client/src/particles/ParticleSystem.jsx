import React, { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
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
  ease,
  Gravity,
  Force,
} from "three-nebula";
import { useAtom, atom } from 'jotai';
import { particleSettingAtom } from "../SocketManager";
import { getRandomNumber } from "../helpers/helpers";

export default function ParticleSystem() {
  const [particleSetting] = useAtom(particleSettingAtom)
  const { scene } = useThree();

  const system = useRef();
  const emitters = useRef([]);

  // const zone = new PointZone(0, 0);
  
  const colors = new ColorSpan()
  colors.shouldRandomize = true

  useEffect(() => {
    system.current = new System();
    const renderer = new SpriteRenderer(scene, THREE);
    // emitter.current.setRate(new Rate(0, 0)).emit();

    system.current.addRenderer(renderer);
    return () => {
      system.current.destroy();
    };
  }, [scene]);

  useEffect(() => {
    if (particleSetting) {
      emitters.current = []
      console.log(particleSetting)
      for (let i = 0; i < particleSetting.emitters.length; i++) {
        const emitter = new Emitter();
        emitter
          .setRate(particleSetting.emitters[i].rate)
          .setInitializers(particleSetting.emitters[i].initializers)
          .setBehaviours(particleSetting.emitters[i].behaviours)
        emitter.position.x = particleSetting.emitters[i].initialPosition.x
        emitter.position.y = particleSetting.emitters[i].initialPosition.y
        emitter.position.z = particleSetting.emitters[i].initialPosition.z

        system.current.addEmitter(emitter)

        emitters.current.push(emitter)
        if (particleSetting.emitters[i].numEmit === 'infinite') {
          emitters.current[i].emit()
        } else {
          emitters.current[i].emit(particleSetting.emitters[i].numEmit)
        }
      }
    } else {
        for (let i = 0; i < emitters.current.length; i++) {
            emitters.current[i].setRate(new Rate(0, 0)).emit();
        }
        emitters.current = []
    }
  }, [particleSetting])

  useFrame((state, delta) => {
    if (system.current !== undefined) {
      system.current.update();
      if (particleSetting) {
        // for each emitter
        // if moving
          // do something
        // else if randomize position
          // do something else
        for (let i = 0; i < particleSetting.emitters.length; i++) {
          if (particleSetting.emitters[i].moving) {
            emitters.current[i].position.x += (-delta * particleSetting.emitters[i].speedX)
            emitters.current[i].position.z += (delta * particleSetting.emitters[i].speedZ)
          } else if (particleSetting.emitters[i].randomizePosition) {
            emitters.current[i].position.x =
              particleSetting.emitters[i].initialPosition.x +
              getRandomNumber(-particleSetting.emitters[i].positionRange.x, particleSetting.emitters[i].positionRange.x)
            emitters.current[i].position.y =
              particleSetting.emitters[i].initialPosition.y +
              getRandomNumber(-particleSetting.emitters[i].positionRange.y, particleSetting.emitters[i].positionRange.y)
            emitters.current[i].position.z =
              particleSetting.emitters[i].initialPosition.z +
              getRandomNumber(-particleSetting.emitters[i].positionRange.z, particleSetting.emitters[i].positionRange.z)
          }
        }
      }
    }
  });

  return 
}
