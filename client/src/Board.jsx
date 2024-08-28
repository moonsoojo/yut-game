import React from 'react';
import Tile from './components/Tile'
import { animated } from '@react-spring/three';
import Star from './meshes/Star';
import Earth from './meshes/Earth';
import Mars from './meshes/Mars';
import Saturn from './meshes/Saturn';
import Neptune from './meshes/Neptune';
import Moon from './meshes/Moon';
import layout from './layout';
import Pointer from './meshes/Pointer';
import { Text3D } from '@react-three/drei';
import { WolfConstellation } from './meshes/WolfConstellation';
import { RhinoConstellation } from './meshes/RhinoConstellation';
import { PegasusConstellation } from './meshes/PegasusConstellation';
import { TaurusConstellation } from './meshes/TaurusConstellation';
import CurvedArrow from './meshes/CurvedArrow';

// Accept flag to enable click
// Pass flag to Tile component
function getMeshByTile(tile) {
  if (tile == 0) {
    return <Earth scale={0.45}/>
  } else if (tile == 5) {
    return <Mars scale={0.4}/>
  } else if (tile == 10) {
    return <Saturn scale={0.4}/>
  } else if (tile == 15) {
    return <Neptune scale={0.4}/>
  } else if (tile == 22) {
    return <Moon scale={0.35} shiny/>
  } else {
    return <Star scale={0.35}/>
  }
}

export default function Board({ 
  position=[0,0,0], 
  rotation=[0,0,0], 
  scale=1, 
  tiles=[], // Must be defined
  legalTiles={},
  helperTiles={},
  showStart=false, 
  interactive=false,
  device="landscapeDesktop"
}) {
  const tileRadius = 5
  const NUM_STARS = 20;
  let tileComponents = [];

  // Circle
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
        pieces={tiles[i]}
        legalTileInfo={legalTiles[i]}
        pathNum={helperTiles[i]}
        key={i} 
        mesh={getMeshByTile(i)}
        interactive={interactive}
      />
    );
  }

  // Shortcuts
  const radiusShortcut1 = 3.4;
  const radiusShortcut2 = 1.7;

  let position20 = [
    Math.sin(((10 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut1,
    0,
    Math.cos(((10 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut1,
  ]
  tileComponents.push(
    <Tile 
      position={position20} 
      scale={1} 
      tile={20} 
      pieces={tiles[20]}
      legalTileInfo={legalTiles[20]}
      pathNum={helperTiles[20]}
      key={20} 
      mesh={getMeshByTile(20)}
      interactive={interactive}
    />
  );
  let position21 = [
    Math.sin(((10 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut2,
    0,
    Math.cos(((10 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut2,
  ]
  tileComponents.push(
    <Tile 
      position={position21} 
      scale={1} 
      tile={21} 
      pieces={tiles[21]}
      legalTileInfo={legalTiles[21]}
      pathNum={helperTiles[21]}
      key={21} 
      mesh={getMeshByTile(21)}
      interactive={interactive}
    />
  );

  // center piece
  const centerTile = 22
  tileComponents.push(
    <Tile 
      position={[0,0,0]} 
      scale={1} 
      tile={centerTile} 
      pieces={tiles[centerTile]}
      legalTileInfo={legalTiles[centerTile]}
      pathNum={helperTiles[centerTile]}
      key={centerTile} 
      mesh={getMeshByTile(centerTile)}
      interactive={interactive}
    />
  );

  let position23 = [
    Math.sin(((0 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut2,
    0,
    Math.cos(((0 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut2,
  ]
  tileComponents.push(
    <Tile 
      position={position23} 
      scale={1} 
      tile={23} 
      pieces={tiles[23]}
      legalTileInfo={legalTiles[23]}
      pathNum={helperTiles[23]}
      key={23} 
      mesh={getMeshByTile(23)}
      interactive={interactive}
    />
  );
  let position24 = [
    Math.sin(((0 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut1,
    0,
    Math.cos(((0 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut1,
  ]
  tileComponents.push(
    <Tile 
      position={position24} 
      scale={1} 
      tile={24} 
      pieces={tiles[24]}
      legalTileInfo={legalTiles[24]}
      pathNum={helperTiles[24]}
      key={24} 
      mesh={getMeshByTile(24)}
      interactive={interactive}
    />
  );
  let position25 = [
    Math.sin(((15 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut1,
    0,
    Math.cos(((15 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut1,
  ]
  tileComponents.push(
    <Tile 
      position={position25} 
      scale={1} 
      tile={25} 
      pieces={tiles[25]}
      legalTileInfo={legalTiles[25]}
      pathNum={helperTiles[25]}
      key={25} 
      mesh={getMeshByTile(25)}
      interactive={interactive}
    />
  );
  let position26 = [
    Math.sin(((15 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut2,
    0,
    Math.cos(((15 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut2,
  ]
  tileComponents.push(
    <Tile 
      position={position26} 
      scale={1} 
      tile={26} 
      pieces={tiles[26]}
      legalTileInfo={legalTiles[26]}
      pathNum={helperTiles[26]}
      key={26} 
      mesh={getMeshByTile(26)}
      interactive={interactive}
    />
  );
  let position27 = [
    Math.sin(((5 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut2,
    0,
    Math.cos(((5 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut2,
  ]
  tileComponents.push(
    <Tile 
      position={position27} 
      scale={1} 
      tile={27} 
      pieces={tiles[27]}
      legalTileInfo={legalTiles[27]}
      pathNum={helperTiles[27]}
      key={27} 
      mesh={getMeshByTile(27)}
      interactive={interactive}
    />
  );
  let position28 = [
    Math.sin(((5 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut1,
    0,
    Math.cos(((5 - 5) * (Math.PI * 2)) / NUM_STARS) *
      radiusShortcut1,
  ]
  tileComponents.push(
    <Tile 
      position={position28} 
      scale={1} 
      tile={28} 
      pieces={tiles[28]}
      legalTileInfo={legalTiles[28]}
      pathNum={helperTiles[28]}
      key={28} 
      mesh={getMeshByTile(28)}
      interactive={interactive}
    />
  );

  return <animated.group position={position} rotation={rotation} scale={scale}>
    {tileComponents}
    {showStart && <group 
      position={layout[device].board.startEarth.position} 
      scale={1.67}>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].board.startEarth.text.position}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.25}
        height={0.01}
      >
        Start
        <meshStandardMaterial color='limegreen'/>
      </Text3D>
      <CurvedArrow 
      color='limegreen' 
      position={layout[device].board.startEarth.helperArrow.position} 
      scale={layout[device].board.startEarth.helperArrow.scale} 
      rotation={layout[device].board.startEarth.helperArrow.rotation}/>
    </group>}
    <group name='helper-arrows'>
      <mesh name='mars-top' position={[4.8, 0, -1]} rotation={[Math.PI/2, 0, Math.PI - Math.PI/32]}>
        <coneGeometry args={[0.08, 0.3, 8]}/>
        <meshBasicMaterial color='grey'/>
      </mesh>
      <mesh name='mars-left' position={[4, 0, 0]} rotation={[Math.PI/2, 0, Math.PI/2]}>
        <coneGeometry args={[0.08, 0.3, 8]}/>
        <meshBasicMaterial color='grey'/>
      </mesh>
      <mesh name='saturn-left' position={[-1, 0, -4.9]} rotation={[Math.PI/2, 0, Math.PI/2 - Math.PI/32]}>
        <coneGeometry args={[0.08, 0.3, 8]}/>
        <meshBasicMaterial color='grey'/>
      </mesh>
      <mesh name='saturn-bottom' position={[0, 0, -4]} rotation={[Math.PI/2, 0, 0]}>
        <coneGeometry args={[0.08, 0.3, 8]}/>
        <meshBasicMaterial color='grey'/>
      </mesh>
      <mesh name='neptune-bottom' position={[-4.9, 0, 0.9]} rotation={[Math.PI/2, 0, -Math.PI/32]}>
        <coneGeometry args={[0.08, 0.3, 8]}/>
        <meshBasicMaterial color='grey'/>
      </mesh>
      <mesh name='moon-bottom' position={[0, 0, 1.1]} rotation={[Math.PI/2, 0, 0]}>
        <coneGeometry args={[0.08, 0.3, 8]}/>
        <meshBasicMaterial color='grey'/>
      </mesh>
      <mesh name='moon-left' position={[-1.1, 0, 0]} rotation={[Math.PI/2, 0, Math.PI/2]}>
        <coneGeometry args={[0.08, 0.3, 8]}/>
        <meshBasicMaterial color='grey'/>
      </mesh>
    </group>
    
    <WolfConstellation rotation={[-Math.PI/2, 0, 0]} position={[-2.1,0,-1.2]} scale={0.85}/>
    <RhinoConstellation position={[2.2,0,-2]} rotation={[0, -Math.PI/32, 0]} scale={0.13}/>
    <PegasusConstellation position={[-2.4, 0, 2.1]} scale={0.09}/>
    <TaurusConstellation position={[2.3, 0, 3.5]} scale={0.8} rotation={[-Math.PI/2, 0, Math.PI/16]}/>
  </animated.group>;
}