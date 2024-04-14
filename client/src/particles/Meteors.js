import layout from "../layout";
import { getRandomNumber } from "../helpers/helpers";
import { Alpha, Body, Color, ColorSpan, Life, Mass, PointZone, Position, RadialVelocity, Radius, Rate, Scale, Span, Vector3D } from "three-nebula";
import * as THREE from "three";

export default function meteorSettings(device) {
    const meteors = [];
    const numEmitters = 7

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

    for (let i = 0; i < numEmitters; i++) {
        meteors.push(
            {
                initialPosition: {
                    x: layout[device].meteors.initialPosition.x + getRandomNumber(2+2*i, 3+2*i),
                    y: layout[device].meteors.initialPosition.y,
                    z: layout[device].meteors.initialPosition.z + getRandomNumber(-5+i, -4+i),
                },
                speedX: getRandomNumber(3.5, 4.5),
                speedZ: getRandomNumber(1.5, 2.5),
                rate: new Rate(new Span(1, 2), new Span(0.02)),
                initializers: [
                    new Position(zone),
                    new Mass(0.1),
                    new Radius(1.5, 2),
                    new Life(3, 4),
                    new Body(createSprite('./textures/dot.png')),
                    new RadialVelocity(0.2, new Vector3D(0, 10, 0), 500, true)
                ],
                behaviours: [
                    new Alpha(0.7, 0),
                    new Scale(0.6, 0.4),
                    new Color(new THREE.Color(colors.getValue()), new THREE.Color(colors.getValue())),
                ],
                numEmit: 10,
                moving: true
            }
        )
    }
    return meteors
}