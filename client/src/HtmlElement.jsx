import { Html } from '@react-three/drei';
import React from 'react';

export default function HtmlElement({ 
  position, 
  rotation, 
  scale, 
  text, 
  fontSize,
  handleClick
}) {
  console.log(`[HtmlElement] ${text} ${handleClick}`)
  function handlePointerEnter() {
    if (handleClick) {
      document.body.style.cursor = "pointer";
    }
  }
  function handlePointerLeave() {
    if (handleClick) {
      document.body.style.cursor = "default";
    }
  }
  return <Html
    position={position}
    rotation={rotation}
    scale={scale}
  >
    <div
      style={{
        border: '3px solid yellow',
        padding: '5px 10px',
        fontFamily: 'Luckiest Guy',
        color: 'yellow',
        fontSize: `${fontSize}px`
      }}  
      onPointerDown={handleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {text}
    </div>
  </Html>
}