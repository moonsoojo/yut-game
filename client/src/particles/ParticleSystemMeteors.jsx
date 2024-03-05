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


function createSprite(texturePath) {
    var map = new THREE.TextureLoader().load(texturePath);
    var material = new THREE.SpriteMaterial({
      map: map,
      color: 0xfffff,
      blending: THREE.AdditiveBlending,
      fog: true,
    });
    return new THREE.Sprite(material);
}
export default function ParticleSystemMeteors() {
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
      for (let i = 0; i < particleSetting.emitters.length; i++) {
        const emitter = new Emitter();
        emitter
          .setRate(particleSetting.emitters[i].rate)
          .setInitializers(particleSetting.emitters[i].initializers)
          .setBehaviours(particleSetting.emitters[i].behaviours)
        emitter.position.x = particleSetting.emitters[i].initialPosition[0]
        emitter.position.y = particleSetting.emitters[i].initialPosition[1]
        emitter.position.z = particleSetting.emitters[i].initialPosition[2]

        system.current.addEmitter(emitter)

        emitters.current.push(emitter)
        emitters.current[i].emit(particleSetting.numEmit)
      }
    } else {
        for (let i = 0; i < emitters.current.length; i++) {
            // emitters[i].current.setRate(new Rate(0, 0)).emit();
            system.current.removeEmitter(emitters[i].current)
            emitters.current = []
        }
    }
  }, [particleSetting])

  useFrame((state, delta) => {
    if (system.current !== undefined) {
      system.current.update();
      if (particleSetting) {
        if (particleSetting.emitters.length == 1 && particleSetting.position.randomize) {
          emitter.current.position.x =
            particleSetting.position.x +
            (Math.random() < 0.5 ? 1 : -1) * particleSetting.position.xRange;
          emitter.current.position.y =
            particleSetting.position.y +
            (Math.random() < 0.5 ? 1 : -1) * particleSetting.position.yRange;
          emitter.current.position.z =
            particleSetting.position.z +
            (Math.random() < 0.5 ? 1 : -1) * particleSetting.position.zRange;
        } else if (particleSetting.emitters.length > 1) { // meteors
            for (let i = 0; i < particleSetting.emitters.length; i++) {
                emitters.current[i].position.x += (-delta * particleSetting.emitters[i].speedX)
                emitters.current[i].position.z += (delta * particleSetting.emitters[i].speedZ)
            }
        }
      }
    }
  });

  return 
}
