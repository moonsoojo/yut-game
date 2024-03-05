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
      let rate = new Rate(100, new Span(1.5, 2.5))
      console.log(rate)
      console.log(rate.nextTime)
      if (particleSetting.delay) {
      }
        emitter.current
        .setRate(rate)
        .setInitializers([
          new Position(zone),
          new Mass(1),
          new Radius(1, 2),
          new Life(4),
          new Body(createSprite(particleSetting.texturePath)),
          new RadialVelocity(2, new Vector3D(0, 5, 0), 180),
        ])
        .setBehaviours([
          new Alpha(20, 0),
          new Scale(0.2, 0),
          new Color(new THREE.Color(particleSetting.color), new THREE.Color(colors.getValue())),
          new Gravity(0.02, 3, ease.easeOutQuart)
        ]).emit()
    } else {
      emitter.current.setRate(new Rate(0, 0)).emit();
    }
  }, [particleSetting])

  let center = {
    x: -0.5,
    y: 0,
    z: -2,
    xRange: 0.5,
    yRange: 0,
    zRange: 0.5,
  };
  useFrame((state, delta) => {
    if (system.current !== undefined) {
      system.current.update();
      if (particleSetting?.randomizePosition) {
        emitter.current.position.x =
          center.x +
          (Math.random() < 0.5 ? 1 : -1) * center.xRange;
        emitter.current.position.y =
          center.y +
          (Math.random() < 0.5 ? 1 : -1) * center.yRange;
        emitter.current.position.z =
          center.z +
          (Math.random() < 0.5 ? 1 : -1) * center.zRange;
      }
    }
  });

  return 
}
