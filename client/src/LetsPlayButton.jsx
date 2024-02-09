import { Text3D } from '@react-three/drei';
import React, { useState } from 'react';
import { socket } from './SocketManager';
import HtmlElement from './HtmlElement';

export default function LetsPlayButton({
  position,
  scale,
  rotation,
  size
}) {
  const buttonDimensions = [2, 0.2, 1.3]
  const borderDimensions = [
    buttonDimensions[0] * 1.1,
    buttonDimensions[1] * 0.9,
    buttonDimensions[2] * 1.1,
  ]

  const [hover, setHover] = useState(false)

  function handleLetsPlayEnter() {
    setHover(true)
  }
  function handleLetsPlayLeave() {
    setHover(false)
  }

  function handleLetsPlay() {
    console.log(`[LetsPlayButton] clicked`)

  }
  return 
}