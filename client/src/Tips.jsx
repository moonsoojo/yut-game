import { Text3D } from '@react-three/drei';
import React, { useState } from 'react';
import HtmlElement from './HtmlElement';

export default function Tips() {
  // multiple components with conditional renders like pages
  const [page, setPage] = useState(0)
  function onPointerEnter() {
    document.body.style.cursor = "pointer";
  }
  function onPointerLeave() {
    document.body.style.cursor = "default";
  }
  function onPrevClick() {
    setPage(page => page-1)
  }
  function onFinishClick() {
    // show game
  }
  function onNextClick() {
    setPage(page => page+1)
  }
  function Tip({showPrevClick=true, showNextClick=true, position=[0,0,0]}) {
    return <group>
      <HtmlElement
        text={<div>
          <div>
            Welcome to Yoot Game where two teams race their ships across the board!
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            { showPrevClick ? <div 
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
              onClick={onPrevClick}
              style={{
                border: '1px solid limegreen',
                padding: '1px 5px',
                justifyContent: 'center'
              }}
            >
              &lt;-
            </div> : <div></div>}
            { showNextClick ? <div
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
              onClick={onNextClick}
              style={{
                border: '1px solid limegreen',
                padding: '1px 5px',
                justifyContent: 'center'
              }}
            >
              -&gt;
            </div> : <div></div>}
            {/* <div
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
              onClick={onFinishClick}
            >
              Finish
            </div> */}
          </div>
        </div>}
        width="190px"
        position={position}
        rotation={[-Math.PI/2, 0, 0]}
        backgroundColor='black'
        color='limegreen'
        border='1px solid limegreen'
        padding='5px 8px'
      />
    </group>
  }
  return <>
    { page == 0 && <Tip showPrevClick={false} position={[-4.5, 0, -3.4]}/>}
  </>
}