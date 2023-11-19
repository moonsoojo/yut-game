import TextButton from "../components/TextButton.jsx";
import layout from "../../../layout.js";
import React from 'react';
import { Text3D } from "@react-three/drei";

export default function LandingPage({ device="mobile" }) {

  // title
  // "Name"
  // input box
  // create room button
  return <>
    <Text3D
      text={"YUT GAME"}
      font="./fonts/Luckiest Guy_Regular.json"
      size={3} 
      // height={0.01}
      position={layout[device].center}
    />
  </>
}