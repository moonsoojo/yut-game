import React from 'react';
import * as THREE from 'three';

export default function FloorDotted(props) {
    const geometry = new THREE.CylinderGeometry(4, 4, 0.01, 100)
    const material = new THREE.PointsMaterial()
    material.size = 3
    return <group {...props}>
        <points geometry={geometry} material={material}/>
    </group>
}