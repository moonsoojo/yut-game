import React from 'react';
import { Html } from '@react-three/drei';
import { askTipsAtom, tipsAtom } from './Experience';
import { useAtom } from 'jotai';

export default function TipsModal({ position, rotation, scale, fontSize, height, padding }) {
  const [_askTips, setAskTips] = useAtom(askTipsAtom)
  const [_tips, setTips] = useAtom(tipsAtom)
  
  function handleYesClick() {
    setAskTips(false);
    setTips(true);
    document.body.style.cursor = "default";
  }
  function handlePointerEnter() {
    document.body.style.cursor = "pointer";
  }
  function handlePointerLeave() {
    document.body.style.cursor = "default";
  }
  function handleNoClick() {
    console.log('no click')
    setAskTips(false);
    setTips(false);
    document.body.style.cursor = "default";
  }

  return <group>
    <Html
      transform
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <div style={{
        width: 'fit-content',
        height: `${height}px`,
        border: '1px solid yellow',
        background: 'black',
        fontFamily: 'Luckiest Guy',
        fontSize: `${fontSize}px`,
        padding: `${padding}px`,
        width: `175px`,
        color: 'yellow',
        position: 'absolute'
      }}>
        Would you like a guide?
        <div style={{
          display: 'flex'
        }}>
          <div 
            style={{
              border: '1px solid yellow',
              width: 'fit-content',
              padding: '5px',
              color: 'yellow',
              left: '55px',
              top: '40px',
              position: 'absolute'
            }}
            onClick={handleYesClick}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          >
            Yes
          </div>
          <div 
            style={{
              border: '1px solid yellow',
              width: 'fit-content',
              padding: '5px',
              color: 'yellow',
              left: '105px',
              top: '40px',
              position: 'absolute'
            }}
            onClick={handleNoClick}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          >
            No
          </div>
        </div>
      </div>
    </Html>
  </group>
}