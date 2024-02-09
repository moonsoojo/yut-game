import { Html } from '@react-three/drei';
import React from 'react';

export default function HtmlElement({ 
  position, 
  rotation, 
  scale, 
  text, 
  fontSize,
  handleClick,
  color="yellow"
}) {
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
    transform
  >
    <div
      style={{
        border: handleClick ? `1px solid ${color}` : '',
        padding: '2px',
        fontFamily: 'Luckiest Guy',
        color: color,
        fontSize: `${fontSize}px`,
        position: 'absolute',
        width: 'fit-content',
        whiteSpace: 'nowrap'
      }}  
      onPointerDown={handleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {text} 
    </div>
  </Html>
}