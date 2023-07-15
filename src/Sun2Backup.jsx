import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl"
import vertexSun from "./shaderSun/vertex.glsl";
import fragmentSun from "./shaderSun/fragment.glsl"
import React from 'react';
import {useRef } from 'react';
import * as THREE from "three"
import {useFrame } from '@react-three/fiber'
import { CubeCamera } from "@react-three/drei";

export default function Sun2({position, tile}) {

    const shaderRef = useRef();
    const sunShaderRef = useRef();
    const cubeCameraRef = useRef();
    const sceneRef = useRef();

    const renderer = new THREE.WebGLRenderer( { antialias: true } );

    const cubeRenderTarget1 = new THREE.WebGLCubeRenderTarget( 256, {
        format: THREE.RGB_ETC1_Format,
        generateMipmaps: true,
        minFilter: THREE.LinearMipmapLinearFilter
    })

    useFrame((state, delta) => {
        const elapsedTime = state.clock.elapsedTime
        shaderRef.current.uniforms.time.value = elapsedTime;
        sunShaderRef.current.uniforms.time.value = elapsedTime
        sunShaderRef.current.uniforms.uPerlin.value = cubeCameraRef.current.renderTarget.texture
    })

    return <>      
        <scene ref={sceneRef}>
            <mesh position={position}>
                <sphereGeometry args={[1.1, 30, 30]}/>
                <shaderMaterial
                    ref={shaderRef}
                    side={THREE.DoubleSide}
                    vertexShader={vertex}
                    fragmentShader={fragment}
                    uniforms={{
                        time: { value: 0 },
                        resolution: { value: new THREE.Vector4() }
                    }}
                />
            </mesh>
        </scene>
        <cubeCamera ref={cubeCameraRef} args={[0.1, 10, cubeRenderTarget1]} update={[renderer, sceneRef.current]}/>
        <mesh position={position}>
            <sphereGeometry args={[1, 30, 30]}/>
            <shaderMaterial
                ref={sunShaderRef}
                side={THREE.DoubleSide}
                vertexShader={vertexSun}
                fragmentShader={fragmentSun}
                uniforms={{
                    time: { value: 0 },
                    uPerlin: { value: null },
                    resolution: { value: new THREE.Vector4() }
                }}
            />
        </mesh>
        {/* <CubeCamera resolution={256} frames={Infinity} near={0.1} far={10}>
                {(texture) => (
                    <>        

                    </>
                )} 
        </CubeCamera> */}
    </>
}