import { Text3D } from '@react-three/drei';
import React from 'react';

export default function DecideOrderTooltip(props) {
    return <group {...props}>
        <Text3D font="/fonts/Luckiest Guy_Regular.json" height={0.01} size={0.3}>
            Throw to decide 
            <meshStandardMaterial color='limegreen'/>
        </Text3D>      
        <Text3D 
            font="/fonts/Luckiest Guy_Regular.json"
            height={0.01} 
            size={0.3}
            position={[0, -0.5, 0]}
        >
            who goes first.
            <meshStandardMaterial color='limegreen'/>
        </Text3D>      
        <Text3D 
            font="/fonts/Luckiest Guy_Regular.json"
            height={0.01} 
            size={0.3}
            position={[0, -1, 0]}
        >
            Higher move wins.
            <meshStandardMaterial color='limegreen'/>
        </Text3D>      
        <mesh name='background-inner' position={[1.85, -0.37, -0.05]}>
            <boxGeometry args={[4.1, 1.8, 0.1]}/>
            <meshStandardMaterial color='black'/>
        </mesh>
        <mesh name='background-outer' position={[1.85, -0.37, -0.05]}>
            <boxGeometry args={[4.2, 1.9, 0.09]}/>
            <meshStandardMaterial color='limegreen'/>
        </mesh>
    </group>
}