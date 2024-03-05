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
export default function ParticleSystem() {
  const [particleSetting] = useAtom(particleSettingAtom)
  const { scene } = useThree();

  const system = useRef();

  const zone = new PointZone(0, 0);
  
  const colors = new ColorSpan()
  colors.shouldRandomize = true

  useEffect(() => {
    system.current = new System();
    const renderer = new SpriteRenderer(scene, THREE);
    emitter.current.setRate(new Rate(0, 0)).emit();

    system.current.addEmitter(emitter.current).addRenderer(renderer);
    return () => {
      emitter.current.destroy();
      system.current.destroy();
    };
  }, [scene]);

  useEffect(() => {
    if (particleSetting) {
      const emitters = []
      for (let i = 0; i < particleSetting.numEmitters; i++) {
        const emitter = useRef();
        emitter.current = new Emitter();
        const initializers = [
          new Position(zone),
          new Mass(1),
          new Radius(1, 2),
          new Life(4),
          new Body(createSprite(particleSetting.texturePath)),
        ]
        if (particleSetting.radialVelocity) {
          initializers.push(new RadialVelocity(2, new Vector3D(0, 5, 0), 180))
        }
        const behaviours = [
          new Alpha(20, 0),
          new Scale(0.2, 0),
          new Color(new THREE.Color(particleSetting.color), new THREE.Color(colors.getValue())),
        ]
  
          emitter.current
          .setRate(new Rate(100, new Span(0.1, 0.2)))
          .setInitializers(initializers)
          .setBehaviours(behaviours)
          system.current.addEmitter(emitter.current)
          emitter.current.emit()
        emitters.push(emitter)
      }
    } else {
      emitter.current.setRate(new Rate(0, 0)).emit();
    }
  }, [particleSetting])


  useFrame((state, delta) => {
    if (system.current !== undefined) {
      system.current.update();
      if (particleSetting?.position.randomize) {
        emitter.current.position.x =
          particleSetting.position.x +
          (Math.random() < 0.5 ? 1 : -1) * particleSetting.position.xRange;
        emitter.current.position.y =
          particleSetting.position.y +
          (Math.random() < 0.5 ? 1 : -1) * particleSetting.position.yRange;
        emitter.current.position.z =
          particleSetting.position.z +
          (Math.random() < 0.5 ? 1 : -1) * particleSetting.position.zRange;
      }
    }
  });

  return 
}
