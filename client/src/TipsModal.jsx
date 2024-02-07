import React from 'react';
import { Html } from '@react-three/drei';
import { askTipsAtom, tipsAtom } from './Experience';
import { useAtom } from 'jotai';

export default function TipsModal({ position, rotation, scale }) {
  const [_askTips, setAskTips] = useAtom(askTipsAtom)
  const [_tips, setTips] = useAtom(tipsAtom)
  
  function handleYesClick() {
    setAskTips(false);
    setTips(true);
  }
  function handlePointerEnter() {
    document.body.style.cursor = "pointer";
  }
  function handlePointerLeave() {
    document.body.style.cursor = "default";
  }
  function handleNoClick() {
    setAskTips(false);
    setTips(false);
  }

  return <group>
    <Html
      transform
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <div style={{
        width: '350px',
        height: '130px',
        border: '3px solid yellow',
        background: 'black',
        fontFamily: 'Luckiest Guy',
        fontSize: '30px',
        padding: '20px',
        color: 'yellow',
      }}>
        Would you like a guide?
        <div style={{
          display: 'flex'
        }}>
          <div 
            style={{
              border: '3px solid yellow',
              width: 'fit-content',
              padding: '5px',
              margin: '30px 30px 30px 80px',
              color: 'yellow'
            }}
            onClick={handleYesClick}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          >
            Yes
          </div>
          <div 
            style={{
              border: '3px solid yellow',
              width: 'fit-content',
              padding: '5px',
              margin: '30px 0px 30px 30px',
              color: 'yellow'
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