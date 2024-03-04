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
export default function ParticleSystem() {
  const [particleSetting] = useAtom(particleSettingAtom)
  const { scene } = useThree();

  const emitter = useRef();
  const system = useRef();

  const zone = new PointZone(0, 0);
  
  const colors = new ColorSpan()
  colors.shouldRandomize = true

  useEffect(() => {
    system.current = new System();
    emitter.current = new Emitter();
    const renderer = new SpriteRenderer(scene, THREE);
    emitter.current.setRate(new Rate(0, 0)).emit();

    system.current.addEmitter(emitter.current).addRenderer(renderer);
    return () => {
      emitter.current.destroy();
      system.current.destroy();
    };
  }, [scene]);

  useEffect(() => {
    console.log(`[ParticleSystem] ${particleSetting}`)
    if (particleSetting) {
        emitter.current
        .setRate(new Rate(10, 2))
        .setInitializers([
          new Position(zone),
          new Mass(1),
          new Radius(1, 2),
          new Life(3),
          new Body(createSprite(particleSetting.texturePath)),
          new RadialVelocity(3, new Vector3D(0, 1, 0), 180),
        ])
        .setBehaviours([
          new Alpha(1, 0),
          new Scale(0.3, 0.5),
          new Color(new THREE.Color(colors.getValue()), new THREE.Color(colors.getValue())),
        ])
    } else {
      emitter.current.setRate(new Rate(0, 0)).emit();
    }
  }, [particleSetting])

  let fireTime = 0;
  let fireInterval = 1;
  let center = {
    x: 0,
    y: 0,
    z: 0,
    xRange: 0.1,
    yRange: 0,
    zRange: 0.1,
  };
  useFrame((state, delta) => {
    if (system.current !== undefined) {
      system.current.update();
      if (state.clock.elapsedTime > fireTime) {
        console.log('emit')
        emitter.current.position.x =
          center.x +
          Math.random() * center.xRange +
          (Math.random() < 0.5 ? 1 : -1);
        emitter.current.position.y =
          center.y +
          Math.random() * center.yRange +
          (Math.random() < 0.5 ? 1 : -1);
        emitter.current.position.z =
          center.z +
          Math.random() * center.zRange +
          (Math.random() < 0.5 ? 1 : -1);
        fireTime += fireInterval;
      }
    }
  });

  return 
}
