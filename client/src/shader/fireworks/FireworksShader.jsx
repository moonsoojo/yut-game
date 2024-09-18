import fireworkVertexShader from './vertex.glsl';
import fireworkFragmentShader from './fragment.glsl';
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export function useFireworksShader() {

    const { scene } = useThree();
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2)
    }
    sizes.resolution = new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio);

    window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)
        sizes.resolution.set(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)
    })

    const textures = [
        useLoader(TextureLoader, 'textures/particles/1.png'),
        useLoader(TextureLoader, 'textures/particles/2.png'),
        useLoader(TextureLoader, 'textures/particles/3.png'),
        useLoader(TextureLoader, 'textures/particles/4.png'),
        useLoader(TextureLoader, 'textures/particles/5.png'),
        useLoader(TextureLoader, 'textures/particles/6.png'),
        useLoader(TextureLoader, 'textures/particles/7.png'),
        useLoader(TextureLoader, 'textures/particles/8.png'),
    ]

    function CreateFirework({count, position, size, texture, radius, color}) {
        const positionsArray = new Float32Array(count * 3)
        const sizesArray = new Float32Array(count)
        const timeMultipliersArray = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            const i3 = i * 3

            const spherical = new THREE.Spherical(
                radius * (0.8 + Math.random() * 0.2),
                Math.random() * Math.PI,
                Math.random() * Math.PI * 2
            )
            const position = new THREE.Vector3()
            position.setFromSpherical(spherical)

            positionsArray[i3] = position.x
            positionsArray[i3+1] = position.y
            positionsArray[i3+2] = position.z

            sizesArray[i] = Math.random()

            timeMultipliersArray[i] = 1 + Math.random()
        }

        texture.flipY = false;

        // const firework = useRef();
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3))
        geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizesArray, 1))
        geometry.setAttribute('aTimeMultiplier', new THREE.Float32BufferAttribute(timeMultipliersArray, 1));
        const material = new THREE.ShaderMaterial({
            vertexShader: fireworkVertexShader,
            fragmentShader: fireworkFragmentShader,
            uniforms: {
                uSize: new THREE.Uniform(size), // needs the THREE.Uniform object
                uResolution: new THREE.Uniform(sizes.resolution),
                uTexture: new THREE.Uniform(texture),
                uColor: new THREE.Uniform(color),
                uProgress: new THREE.Uniform(0)
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        })

        const points = new THREE.Points(geometry, material)
        points.position.copy(position)
        const destroy = () => { // may need to run on component unmount as well
            console.log('destroy')
            scene.remove(points)
            geometry.dispose()
            material.dispose()
        }

        gsap.to(
            material.uniforms.uProgress,
            { value: 1, duration: 3, ease: 'linear', onComplete: destroy }
        )

        scene.add(points)
    }

    function CreateRandomFirework() {
        const count = Math.round(400 + Math.random() * 1000);
        const position = new THREE.Vector3(
            (Math.random()-0.5) * 2, 
            Math.random(),
            (Math.random()-0.5) * 2, 
        )
        const size = 0.15 + Math.random() * 0.06
        const texture = textures[Math.floor(Math.random() * textures.length)]
        const radius = 0.8 + Math.random() * 0.6
        const color = new THREE.Color();
        color.setHSL(Math.random(), 1, 0.7)
        CreateFirework({
            count,
            position,
            size,
            texture,
            radius,
            color
        })
    }

    return CreateRandomFirework;
}