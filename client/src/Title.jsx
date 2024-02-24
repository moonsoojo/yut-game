import { Text3D } from '@react-three/drei';
import React, { useState } from 'react';

export default function Title({ scale, setDisplay }) {

    const [hover, setHover] = useState(false);
    function handlePointerEnter() {
        setHover(true)
    }
    function handlePointerLeave() {
        setHover(false)
    }
    function handlePointerUp() {
        setDisplay('board')
    }

    return <group scale={scale}
    >
      {/* line 1 */}
      {/* line 2 */}
      {/* wrapper */}
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        size={0.4}
        height={0.01}
        position={[0, -0.5, 0]}
      >
        YOOT
        <meshStandardMaterial color={hover ? "green": "yellow"} />
      </Text3D>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        size={0.4}
        height={0.01}
        position={[0, -1, 0]}
      >
        GAME
        <meshStandardMaterial color={hover ? "green": "yellow"} />
      </Text3D>
      <mesh 
        position={[0.7, -0.5, 0]} 
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerUp={handlePointerUp}
      >
        <boxGeometry args={[1.5, 1, 0.1]}/>
        <meshStandardMaterial color="grey" transparent opacity={0}/>
      </mesh>
    </group>
}