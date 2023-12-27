import { Html } from "@react-three/drei";
import React, { useState } from "react";

export default function Rulebook({position, width, height, padding}) {
  const [page, setPage] = useState(0);

  function Page({page}) {
    if (page == 0) {
      return (
        <div id="rulebook-container" style={{
          width: `${width.toString()}px`,
          height: `${height.toString()}px`,
          background: 'black',
          border: '3px solid yellow',
          padding: `${padding.toString()}px`,
          borderRadius: '5px'
        }}>
          <div id="rulebook-title" style={{
            fontFamily: 'Luckiest Guy',
            fontSize: '20px',
            color: 'yellow'
          }}>HOW TO PLAY:</div>
          <div id="rulebook-body" style={{
            fontFamily: 'Luckiest Guy',
            fontSize: '20px',
            color: 'yellow'
          }}>
            <div id="rulebook-body-text">
            Make two teams of ONE OR MORE PLAYERS. tHE MORE, THE BETTER!
            </div>
            {/* <div id="rulebook-body-images"></div> */}
          </div>
          <div id="rulebook-nav-container" style={{
            display: 'flex',
            flexDirection: 'row'
          }}>
            <div id="rulebook-back-arrow" style={{
              fontFamily: 'Luckiest Guy',
              fontSize: '15px',
              color:"yellow"
            }}>&lt; back</div>
            <div id="rulebook-close-button"></div>
            <div id="rulebook-next-arrow"></div>
          </div>
        </div>
      )
    }
  }

  return (
    <Html position={position}>
      <Page page={page}/>
    </Html>
  )
}