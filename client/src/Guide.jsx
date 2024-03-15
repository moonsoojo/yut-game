import React from 'react';

export default function Guide() {
    return <group>
        <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.1, 32, 16]}/>
            <meshStandardMaterial color="red"/>
        </mesh>
    </group>
}