// js
import React from "react";
import * as THREE from "three";
import Stars from './particles/Stars'

// server
import MilkyWay from "./shader/MilkyWay.jsx";
import Game from "./Game.jsx";
import MainAlert from "./MainAlert.jsx";
import PregameAlert from "./PregameAlert.jsx";
import ThrowAlert from "./alerts/ThrowAlert.jsx";
import StarsShader from "./shader/stars/StarsShader.jsx";
import TaurusConstellationShiny from './meshes/TaurusConstellationShiny';
import Alert from "./Alert.jsx";

export default function Experience() {
  console.log(`[Experience]`)
  return <group>
    {/* add game */}
    <Game/>
    <StarsShader
    count={7000}
    size={5}
    />
    <MilkyWay 
      rotation={[-Math.PI/2, 0, -35.0]} 
      position={[0, -3, 0]} 
      scale={5}
      brightness={0.5}
      colorTint1={new THREE.Vector4(0, 1, 1, 1.0)}
      colorTint2={new THREE.Vector4(0, 1, 1, 1.0)}
      colorTint3={new THREE.Vector4(0, 1, 1, 1.0)}
    />
    {/* <TaurusConstellationShiny 
      meshDir={"taurus-constellation-dhazele-2.glb"} 
      lightTexDir={'lightTaurusTexture.png'}
      meshIndex={1} 
      position={[1,0.0,2]} 
      scale={0.9} rotation={[0,0.0,0.0]} 
      baseColor={new THREE.Vector4(0.4,0.5,0.8,1.0)} 
      glistenSpeed={5.0} 
      glistenScale={200.0} 
      glistenColorMultiplier={2}
      extrudeVal={0.15}
      lightColor={new THREE.Vector4(0.2, 0.3, 0.6, 1.0)}
      lightScale={3.0}
      lightPosition = {new THREE.Vector3(-0.24,-0.0,-1.4)}
      lightRotation = {[80.1,0.0,0.0]}
      lightMultiplier = {1.3}
    /> */}
    {/* <MainAlert/> 
    <PregameAlert/>
    <ThrowAlert 
    position={[0,0,4.5]} 
    rotation={[0, Math.PI/2, 0]} 
    initialScale={1}/> */}
    <Alert position={[0,1,0]} rotation={[0,Math.PI/2,0]}/>
  </group>
}