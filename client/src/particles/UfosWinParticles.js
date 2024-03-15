import { Alpha, Body, Color, ColorSpan, Force, Life, Mass, PointZone, Position, RadialVelocity, Radius, Rate, Scale, Span, Vector3D } from "three-nebula";
import layout from "../layout"
import * as THREE from 'three';

export default function UfosWinParticles(device) {
    const emitters = [];
    const numEmittersFireworks = 4; // one emitter on each side of Earth

    const colors = new ColorSpan()
    colors.shouldRandomize = true
    const zone = new PointZone(0, 0);
    
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

    for (let i = 0; i < numEmittersFireworks; i++) {
        emitters.push(
            {
                initialPosition: {
                  x: layout[device].winScreen.fireworks.emitters[i].initialPosition.x,
                  y: layout[device].winScreen.fireworks.emitters[i].initialPosition.y,
                  z: layout[device].winScreen.fireworks.emitters[i].initialPosition.z,
                },
                positionRange: {
                  x: layout[device].winScreen.fireworks.emitters[i].positionRange.x,
                  y: layout[device].winScreen.fireworks.emitters[i].positionRange.y,
                  z: layout[device].winScreen.fireworks.emitters[i].positionRange.z,
                },
                moving: false,
                randomizePosition: true,
                rate: new Rate(new Span(50, 100), new Span(layout[device].winScreen.fireworks.timePanA)),
                initializers: [
                    new Position(zone),
                    new Mass(1, 3),
                    new Radius(0.1),
                    new Life(1.4, 2.4),
                    new Body(createSprite('./textures/dot.png')),
                    new RadialVelocity(new Span(2, 2.3), new Vector3D(0, 3, 0), 180),
                ],
                behaviours: [
                    new Alpha(5, 0), 
                    new Scale(1, 1.3), 
                    new Color(new THREE.Color(colors.getValue()), new THREE.Color(colors.getValue())),
                ],
                numEmit: 'infinite'
            }
        )
    }

    // dust particles
    emitters.push(
        {
            initialPosition: {
              x: layout[device].winScreen.dust.initialPosition.x,
              y: layout[device].winScreen.dust.initialPosition.y,
              z: layout[device].winScreen.dust.initialPosition.z,
            },
            positionRange: {
              x: layout[device].winScreen.dust.positionRange.x,
              y: layout[device].winScreen.dust.positionRange.y,
              z: layout[device].winScreen.dust.positionRange.z,
            },
            moving: false,
            randomizePosition: true,
            rate: new Rate(new Span(1, 1), new Span(0.05)),
            initializers: [
                new Position(zone),
                new Mass(1, 3),
                new Radius(0.05),
                new Life(1, 2.2),
                new Body(createSprite('./textures/dot.png')),
            ],
            behaviours: [
                new Alpha(5, 0), 
                new Scale(1, 1.5), 
                new Color(new THREE.Color('#40E0D0'), new THREE.Color('#FFFFFF')),
                new Force(0, 0.05, 0)
            ],
            numEmit: 'infinite'
        }
    )
    return emitters
}