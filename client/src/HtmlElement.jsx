import { Html } from '@react-three/drei';
import React, { useState } from 'react';

export default function HtmlElement({ 
  position, 
  rotation, 
  scale, 
  text, 
  fontSize,
  handleClick,
  width='fit-content',
  color='yellow',
  colorHover='green',
  backgroundColor=null,
  border='',
  padding='2px',
  whiteSpace='nowrap'
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
        border: (handleClick || border) ? `1px solid ${currColor}` : '',
        padding: padding,
        fontFamily: 'Luckiest Guy',
        color: currColor,
        fontSize: `${fontSize}px`,
        position: 'absolute',
        width: width,
        whiteSpace: whiteSpace,
        WebkitUserSelect: 'none',
        backgroundColor: backgroundColor
      }}  
      onPointerDown={handleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {text} 
    </div>
  </Html>
}