import React from "react";
import Sun from "./Sun/SunBagus";
export default function Sandbox() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Sun scale={1} />
    </>
  );
}