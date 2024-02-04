import { Text3D } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useAtom } from 'jotai';
import React, { useEffect, useRef } from 'react';
import { celebrateTextAtom } from './SocketManager';
import Meteors from './particles/Meteors';
import * as THREE from 'three';
import { generateRandomNumberInRange } from './helpers/helpers';
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

export default function Celebration() {

  let map = new THREE.TextureLoader().load("textures/dot.png");
  var sprite = new THREE.SpriteMaterial({
    map: map,
    color: new THREE.Color("#FF2727"),
    blending: THREE.AdditiveBlending,
    fog: true,
  });

  const text0Mat = useRef();
  const text1Mat = useRef();
  const text2Mat = useRef();
  const text3Mat = useRef();
  const [celebrateText, setCelebrateText] = useAtom(celebrateTextAtom)

  useFrame((state, delta) => {
    if (celebrateText && text0Mat.current !== undefined) {
      text0Mat.current.opacity = Math.sin(state.clock.elapsedTime * 5)
      text1Mat.current.opacity = Math.sin(state.clock.elapsedTime * 5)
      text2Mat.current.opacity = Math.sin(state.clock.elapsedTime * 5)
      text3Mat.current.opacity = Math.sin(state.clock.elapsedTime * 5)
    } else {
      text0Mat.current.opacity = 0
      text1Mat.current.opacity = 0
      text2Mat.current.opacity = 0
      text3Mat.current.opacity = 0
    }
  })

  const { scene } = useThree();

  const system = useRef();
  let numMeteors = 5
  const emitter0 = useRef();
  const emitter1 = useRef();
  const emitter2 = useRef();
  const emitter3 = useRef();
  const emitter4 = useRef();
  const emitter5 = useRef();
  const emitter6 = useRef();
  const emitter7 = useRef();
  const emitter8 = useRef();
  const emitter9 = useRef();
  const emitters = [emitter0, emitter1, emitter2, emitter3, emitter4, emitter5, emitter6, emitter7, emitter8, emitter9]
  console.log("new speeds")
  const speeds = useRef([
    [4.1, 1.9],
    [4.3, 1.67],
    [4.7, 1.3],
    [4.2, 1.8],
    [4.6, 1.5],
  ]);

  // const [speeds, setSpeeds] = useState(Array.apply(null, Array(numMeteors)).map(function () {}))

  const zone = new PointZone(0, 0);
  const colors = new ColorSpan([
    '#4CD3C2', // deep turquoise
    '#774CD3', // purple
    '#FBB122', // orange
    '#35FFFF', // cyan
    '#FFFFFF', // white
    '#CDCE02'
  ])
  colors.shouldRandomize = true

  useEffect(() => {
    system.current = new System();
    const renderer = new SpriteRenderer(scene, THREE);
    system.current.addRenderer(renderer)
  }, [])

  useEffect(() => {
    if (celebrateText === "yoot" || celebrateText === "mo") {
      for (let i = 0; i < numMeteors; i++) {
        const alpha = generateRandomNumberInRange(1, 0.4)
        const scale0 = generateRandomNumberInRange(1.5, 0.3)
        const scale1 = generateRandomNumberInRange(0.5, 0.3)
        const color0 = celebrateText === "yoot" ? "#FFFF00" : colors.getValue()
        const color1 = celebrateText === "yoot" ? "#FFFF00" : colors.getValue()

        setTimeout(() => {
          emitters[i].current = new Emitter();
          emitters[i].current
          .setRate(new Rate(1, new Span(0.01)))
          .setInitializers([
            new Position(zone),
            new Mass(1),
            new Radius(0.1, 0.2),
            new Life(2),
            new Body(new THREE.Sprite(sprite)),
            new RadialVelocity(1, new Vector3D(0, 1, 0), 2)
          ])
          .setBehaviours([
            new Alpha(alpha, 0), 
            new Scale(scale0, scale1), 
            new Color(new THREE.Color(color0), new THREE.Color(color1)),
          ])
          .emit(7);
    
          emitters[i].current.position.x = i * 3 - 3
          emitters[i].current.position.y = 5
          emitters[i].current.position.z = generateRandomNumberInRange(-3, 2)
      
          system.current.addEmitter(emitters[i].current)
        }, 1000 * Math.random() * 1.5)
      }
  
      return () => {
        // emitter.current.removeAllParticles();
        // emitter.current.destroy();
        // system.current.destroy();
      }
    }
  }, [celebrateText])

  useFrame((state, delta) => {
    if (system.current) {
      // console.log("system.current")
      system.current.update();

      for (let i = 0; i < numMeteors; i++) {
        if (emitters[i].current) {
          emitters[i].current.position.x += (-delta * speeds.current[i][0])
          emitters[i].current.position.z += (delta * speeds.current[i][1])
        }
      }
    }
  })

  return <group>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json" 
      size={0.3} 
      height={0.01} 
      position={[-2,0,-1]}
      rotation={[-Math.PI/2,0,0, "YXZ"]}
    >
      <meshStandardMaterial transparent ref={text0Mat} color="limegreen"/>
      {celebrateText}
    </Text3D>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json" 
      size={0.3} 
      height={0.01} 
      position={[0.8,0,-1]}
      rotation={[-Math.PI/2,0,0, "YXZ"]}
    >
      <meshStandardMaterial transparent ref={text1Mat} color="limegreen"/>
      {celebrateText}
    </Text3D>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json" 
      size={0.3} 
      height={0.01} 
      position={[0.8,0,1.5]}
      rotation={[-Math.PI/2,0,0, "YXZ"]}
    >
      <meshStandardMaterial transparent ref={text2Mat} color="limegreen"/>
      {celebrateText}
    </Text3D>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json" 
      size={0.3} 
      height={0.01} 
      position={[-2,0,1.5]}
      rotation={[-Math.PI/2,0,0, "YXZ"]}
    >
      <meshStandardMaterial transparent ref={text3Mat} color="limegreen"/>
      {celebrateText}
    </Text3D>
    {/* <Meteors 
      sprite={sprite} 
      delay={0} 
      alpha ={Math.random()+1} 
      spawnPos={[
        // -5 + generateRandomNumberInRange(3, 3),
        // 5,
        // 5 + generateRandomNumberInRange(3, 3),
        10, -5, -3
      ]}
    />
    <Meteors       
      sprite={sprite} 
      delay={0.3} 
      alpha ={Math.random()+1} 
      spawnPos={[
        // -5 + generateRandomNumberInRange(3, 3),
        // 5,
        // 5 + generateRandomNumberInRange(3, 3),
        9, -5, -5
      ]}
    />
    <Meteors
      sprite={sprite} 
      delay={0.6} 
      alpha ={Math.random()+1} 
      spawnPos={[
        // -5 + generateRandomNumberInRange(3, 3),
        // 5,
        // 5 + generateRandomNumberInRange(3, 3),
        8, -5, -7
      ]}
    /> */}
  </group>
}