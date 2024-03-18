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
  function Tip({showPrevClick=true, showNextClick=true, position=[0,0,0], text, width}) {
    return <group>
      <HtmlElement
        text={<div>
          <div>
            {text}
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
              prev
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
              next
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
        width={width}
        position={position}
        rotation={[-Math.PI/2, 0, 0]}
        backgroundColor='black'
        color='limegreen'
        border='1px solid limegreen'
        padding='5px 8px'
        whiteSpace='initial'
      />
    </group>
  }
  return <>
    { page == 0 && <Tip 
    showPrevClick={false} 
    position={[-4.5, 0, -3.4]} 
    text='Welcome to Yoot Game where two teams race their ships across the board!'
    width="190px"
    />}
    { page == 1 && <Tip 
    showPrevClick={true} 
    position={[-4.5, 0, -3.4]} 
    text='Click the "JOIN" button to choose a team.'
    width="150px"
    />}
    { page == 2 && <Tip 
    showPrevClick={true} 
    position={[0.4, 0, -1]} 
    text='These are your pieces.'
    width="150px"
    />}
    { page == 3 && <Tip 
    showPrevClick={true} 
    position={[3.5, 0, -3.5]} 
    text='You can move these across the stars and planets.'
    width="150px"
    />}
    { page == 4 && <Tip 
    showPrevClick={true} 
    position={[3.5, 0, -3.5]} 
    text='First, you need to get points by throwing the yoot (dice).'
    width="170px"
    />}
    { page == 5 && <Tip 
    showPrevClick={true} 
    position={[0.5, 0.5, 1.7]} 
    text='On your turn, the yoot button will appear.'
    width="150px"
    />}
  </>
}