import React from 'react';
import Tile from './components/Tile'
import layout from './layout';
import { animated } from '@react-spring/three';
import HtmlElement from './HtmlElement';
import CurvedArrow from './meshes/CurvedArrow';
import { useAtom } from 'jotai';
import { tilesAtom } from './GlobalState';
import Star from './meshes/Star';
import Earth from './meshes/Earth';
import Mars from './meshes/Mars';
import Saturn from './meshes/Saturn';
import Neptune from './meshes/Neptune';
import Moon from './meshes/Moon';

// Accept flag to enable click
// Pass flag to Tile component
function getMeshByTile(tile) {
  if (tile == 0) {
    return <Earth scale={0.4}/>
  } else if (tile == 5) {
    return <Mars scale={0.4}/>
  } else if (tile == 10) {
    return <Saturn scale={0.4}/>
  } else if (tile == 15) {
    return <Neptune scale={0.4}/>
  } else if (tile == 22) {
    return <Moon scale={0.3}/>
  } else {
    return <Star scale={0.5}/>
  }
}

export default function Board({ position=[0,0,0], rotation=[0,0,0], scale=1, showStart=false, interactive=false }) {
  console.log(`[Board]`)
  const [tiles] = useAtom(tilesAtom)
  const tileRadius = 5
  const NUM_STARS = 20;
  let tileComponents = [];

  //circle
  for (let i = 0; i < NUM_STARS; i++) {
    let position = [
      -Math.cos(((i + 5) * (Math.PI * 2)) / NUM_STARS) * tileRadius,
      0,
      Math.sin(((i + 5) * (Math.PI * 2)) / NUM_STARS) * tileRadius,
    ];
    tileComponents.push(
      <Tile 
        position={position} 
        tile={i} 
        key={i} 
        mesh={getMeshByTile(i)}
      />
    );
  }

  //shortcuts
  const radiusShortcut1 = 3.5;
  const radiusShortcut2 = 1.7;
  for (let i = 0; i < NUM_STARS; i++) {
    let indexShortcut1;
    let indexShortcut2;
    if (i == 0) {
      indexShortcut1 = 24;
      indexShortcut2 = 23;
    } else if (i == 5) {
      indexShortcut1 = 28;
      indexShortcut2 = 27;
    } else if (i == 10) {
      indexShortcut1 = 20;
      indexShortcut2 = 21;
    } else if (i == 15) {
      indexShortcut1 = 25;
      indexShortcut2 = 26;
    }
    if (i == 0 || i == 5 || i == 10 || i == 15) {
      let position1 = [
        Math.sin(((i - 5) * (Math.PI * 2)) / NUM_STARS) *
          radiusShortcut1,
        0,
        Math.cos(((i - 5) * (Math.PI * 2)) / NUM_STARS) *
          radiusShortcut1,
      ]
      tileComponents.push(
        <Tile 
          position={position1} 
          scale={1} 
          tile={indexShortcut1} 
          key={indexShortcut1} 
          mesh={getMeshByTile(indexShortcut1)}
        />
      );
      let position2 = [
        Math.sin(((i - 5) * (Math.PI * 2)) / NUM_STARS) *
          radiusShortcut2,
        0,
        Math.cos(((i - 5) * (Math.PI * 2)) / NUM_STARS) *
          radiusShortcut2,
      ]
      tileComponents.push(
        <Tile 
          position={position2} 
          scale={1} 
          tile={indexShortcut2} 
          key={indexShortcut2} 
          mesh={getMeshByTile(indexShortcut2)}
        />
      );
    }
  }

  // center piece
  tileComponents.push(
    <Tile 
      position={[0,0,0]} 
      scale={1} 
      tile={22} 
      key={22} 
      mesh={getMeshByTile(22)}
    />
  );

  return <animated.group position={position} rotation={rotation} scale={scale}>
    {tileComponents}
    {/* {showStart && <group position={[0, 0, 0]} scale={1.67}>
      <HtmlElement
        text="Start"
        position={layout[device].startEarth.position}
        rotation={layout[device].startEarth.rotation}
        fontSize={layout[device].startEarth.fontSize}
        color='limegreen'
      />
      <CurvedArrow
        position={layout[device].startEarth.helperArrow.position}
        rotation={layout[device].startEarth.helperArrow.rotation}
        color={layout[device].startEarth.helperArrow.color}
        scale={layout[device].startEarth.helperArrow.scale}
      />
    </group>} */}
  </animated.group>;
}