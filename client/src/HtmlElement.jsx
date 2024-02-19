import { Html } from '@react-three/drei';
import React, { useState } from 'react';

export default function HtmlElement({ 
  position, 
  rotation, 
  scale, 
  text, 
  fontSize,
  handleClick,
  color='yellow',
  colorHover='green'
}) {
  const [currColor, setCurrColor] = useState(color);
  function handlePointerEnter() {
    if (handleClick) {
      document.body.style.cursor = "pointer";
      setCurrColor(colorHover)
    }
  }
  function handlePointerLeave() {
    if (handleClick) {
      document.body.style.cursor = "default";
      setCurrColor(color)
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
        border: handleClick ? `1px solid ${currColor}` : '',
        padding: '2px',
        fontFamily: 'Luckiest Guy',
        color: currColor,
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