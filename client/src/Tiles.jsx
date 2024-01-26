import React from 'react'
import layout from './layout.js'
import Earth from './meshes/Earth.jsx'
import Mars from './meshes/Mars.jsx'
import Saturn from './meshes/Saturn.jsx'
import Neptune from './meshes/Neptune.jsx'
import Star from './meshes/Star.jsx'
import Moon from './meshes/Moon.jsx'

export default function Tiles({ device, position, scale }) {
  // const tileRadius = layout[device].tileRadius.ring;
  const tileRadius = 5;
  const numStars = 20;
  let tiles = [];

  //circle
  for (let i = 0; i < numStars; i++) {
    let position = [
      -Math.cos(((i+5) * (Math.PI * 2)) / numStars) * tileRadius,
      0,
      Math.sin(((i+5) * (Math.PI * 2)) / numStars) * tileRadius,
    ];
    if (i == 0) {
      tiles.push(<Earth position={position} tile={i} key={i} device={device}/>);
    } else if (i == 5) {
      tiles.push(
        <Mars
          position={position}
          tile={i}
          key={i}
          device={device}
        />
      );
    } else if (i == 10) {
      tiles.push(<Saturn position={position} tile={i} key={i} device={device}/>);
    } else if (i == 15) {
      tiles.push(<Neptune position={position} tile={i} key={i} device={device}/>);
    } else {
      tiles.push(
        <Star
          position={position}
          tile={i}
          key={i}
          scale={layout[device].star.scale}
          device={device}
        />
      );
    }
  }

  //shortcuts
  const radiusShortcut1 = layout[device].tileRadius.shortcut1;
  const radiusShortcut2 = layout[device].tileRadius.shortcut2;
  for (let i = 0; i < numStars; i++) {
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
        Math.sin(((i -5) * (Math.PI * 2)) / numStars) *
          radiusShortcut1,
        0,
        Math.cos(((i -5) * (Math.PI * 2)) / numStars) *
          radiusShortcut1,
      ]
      tiles.push(
        <Star
          position={position1}
          tile={indexShortcut1}
          key={i + 30}
          scale={layout[device].star.scale}
          device={device}
        />
      );
      let position2 = [
        Math.sin(((i -5) * (Math.PI * 2)) / numStars) *
          radiusShortcut2,
        0,
        Math.cos(((i -5) * (Math.PI * 2)) / numStars) *
          radiusShortcut2,
      ]
      tiles.push(
        <Star
          position={position2}
          tile={indexShortcut2}
          key={i + 41}
          scale={layout[device].star.scale}
          device={device}
        />
      );
    }
  }
  // center piece
  tiles.push(
    <Moon
      position={[0,0,0]}
      intensity={3}
      // scale={0.4}
      key={100}
      tile={22}
      device={device}
    />
  );
  
  return <group position={position} scale={scale}>
    {tiles}
  </group>
}