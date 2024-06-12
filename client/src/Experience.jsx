// js
import React from "react";
import * as THREE from "three";
import Stars from './particles/Stars'

// server
import MilkyWay from "./shader/MilkyWay.jsx";
import Game from "./Game.jsx";
import BoomText from "./BoomText.jsx";
import MainAlert from "./MainAlert.jsx";

export default function Experience() {

  return <group>
    {/* add game */}
    <Game/>
    <Stars count={7000} size={5}/>
    <MilkyWay 
      rotation={[-Math.PI/2, 0, -35.0]} 
      position={[0, -3, 0]} 
      scale={5}
      brightness={0.5}
      colorTint1={new THREE.Vector4(0, 1, 1, 1.0)}
      colorTint2={new THREE.Vector4(0, 1, 1, 1.0)}
      colorTint3={new THREE.Vector4(0, 1, 1, 1.0)}
    />
    <BoomText rotation={[0, Math.PI/2, 0]} initialScale={2}/> 
    <MainAlert position={[0, 0, 7]} rotation={[0, Math.PI/2, 0]} initialScale={1}/> 
  </group>
}