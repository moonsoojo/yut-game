import React, { useEffect } from "react";
import Stars from "./particles/Stars";
import Tiles from "./Tiles";
import { useFrame, useThree } from "@react-three/fiber";
import { Euler } from "three";
import * as THREE from 'three';

export default function Experience2() {
  const device = "landscapeDesktop"

  
  const camera = useThree().camera
  useEffect(() => {
    // const camera = state.camera
    // console.log(camera.rotation) 
    // rotate camera to look at what you want
    // const camera = state.camera    
    // const euler = new Euler(
    //   -0.9678104558564694, 
    //   0.07841126014215415,
    //   0.11327856815709492, 
    //   "XYZ"
    // )
    // camera.setRotationFromEuler(euler)
  }, [])

  const quaternion = new THREE.Quaternion(
    -0.4931432162936636,
    0.001544883104252418,
    0.0008757420978595298,
    0.8699463285947662, 
  );
  const finalPosition = new THREE.Vector3(
    0, 
    14.02975215256512, 
    4.463294645717035
  )
  useFrame((state) => {
    // console.log('exp2', camera.position)
    // { x: 0.2897774106438725, y: 14.02975215256512, z: 4.463294645717035 }
    camera.position.lerp(finalPosition, 0.007)
    // { w: 0.8699463285947662, x: -0.4931432162936636, y: 0.001544883104252418,
    // z: 0.0008757420978595298}
    // must disable 'orbitControls'
    camera.quaternion.slerp(quaternion, 0.007)
    console.log('exp2', camera.quaternion)
  })

  return <group>
    <Tiles device={device} position={[0, 0, -5]} scale={1}/>
    <Stars/>
  </group>
}