import React, {useRef, useMemo} from 'react'
import {useFrame, useThree} from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'

const vertexShader = `
  varying vec3 Normal;
  varying vec3 Position;

  void main() {
    Normal = normalize(normalMatrix * normal);
    Position = position; //vec3(modelViewMatrix * vec4(position, 1.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
const float a=1.0;
const float b=.1759;
const float PI=3.14159265359;
uniform float time;
uniform sampler2D texture1;
uniform vec4 colorTint;

varying vec3 Normal;
varying vec3 Position;


float remap(float value, vec2 inval, vec2 outval){
  return (outval.x + (outval.y - inval.x) * (value-inval.x) /(inval.y-inval.x));
}

float spiralSDF(vec2 p,vec2 c){
    // t = theta
    p = p - c;
    float t=atan(p.y, p.x) + time*0.5;
    // t=(t+PI)/(2.*PI);
    float r=length(p.xy);
    
    float n=(log(r/a)/b-t)/(2.*PI);

    // Cap the spiral
    // float nm = (log(0.11)/b-t)/(2.0*PI);
    // n = min(n,nm);
    // return (n+1.0)/100.0;
    float upper_r=a*exp(b*(t+2.*PI*ceil(n)));   
    float lower_r=a*exp(b*(t+2.*PI*floor(n)));
    // float lower_r = 0.0;
    
    float divider = remap(r,vec2(0.0,1.0), vec2(0.0,1.0));
    return min(abs(upper_r-r),abs(r-lower_r))+divider;
}

vec2 calculateUV(vec2 uv, float spiralValue){
    float angle = length(uv) * 1.0;
    float x = cos(spiralValue) * uv.x-sin(spiralValue) * uv.y;
    float y = sin(spiralValue) * uv.x + cos(spiralValue) * uv.y;
    return vec2(x,y);
}

void main(){
    //vec2 R = Position.xy;
    vec2 uv = Position.xy;
    vec2 c = vec2(0.0,0.0);
    
    // Uncomment for more swirl
    // vec2 c = vec2(0.7*sin(iTime*1.3), 0.3*sin(iTime)*2.0);
    float r = length(uv);
    float d = spiralSDF(uv,vec2(c));
    // Alter distance for a satisfying visual
    float v = pow(d, 1.23) / 1.03;
    v = 1.0-v;
    vec2 textureUV = calculateUV(uv,d);
    vec3 texcolor = texture2D(texture1,textureUV).rgb;
    gl_FragColor = vec4((v+texcolor.r)*colorTint.x,(v+texcolor.g)*colorTint.y,(v+texcolor.b)*colorTint.z,v*colorTint.w) ;
    //O.rgb = O.rgb*1.0/r;
    //O.xy=uv;
}
`

function MilkyWay(props) {
    const meshRef = useRef();
    const secondMeshRef = useRef();
    const thirdMeshRef = useRef();
    
    const loader = new THREE.TextureLoader();
    const sky = loader.load('./textures/star.jpg');
    const sky2 = loader.load('./textures/Marbles.jpg');
    const sky3 = loader.load('./textures/Marbles.jpg');

    sky.wrapS = THREE.RepeatWrapping;
    sky.wrapT = THREE.RepeatWrapping;
    sky2.wrapS = THREE.RepeatWrapping;
    sky2.wrapT = THREE.RepeatWrapping;
    sky3.wrapS = THREE.RepeatWrapping;
    sky3.wrapT = THREE.RepeatWrapping;  
    sky3.repeat.set(4, 4);

    const milkyWayUniform = useMemo(
        () => ({
            time: { value: 0 },
            resolution: { value: new THREE.Vector4() },
            texture1: { type: "t", value: sky2 },
            colorTint: { value: new THREE.Vector4(props.colorTint1.x * props.brightness, props.colorTint1.y * props.brightness, props.colorTint1.z * props.brightness, props.colorTint1.w * props.brightness) }
        }), [props.brightness, sky2, props.colorTint1]);

    const milkyWayUniformSecondLayer = useMemo(
        () => ({
            time: { value: 0 },
            resolution: { value: new THREE.Vector4() },
            texture1: { type: "t", value: sky3 },
            colorTint: { value: new THREE.Vector4(props.colorTint2.x * props.brightness, props.colorTint2.y * props.brightness, props.colorTint2.z * props.brightness, props.colorTint2.w * props.brightness) }
        }), [props.brightness, sky3, props.colorTint2]);

    const milkyWayUniformThirdLayer = useMemo(
        () => ({
            time: { value: 0 },
            resolution: { value: new THREE.Vector4() },
            texture1: { type: "t", value: sky },
            colorTint: { value: new THREE.Vector4(props.colorTint3.x * props.brightness, props.colorTint3.y * props.brightness, props.colorTint3.z * props.brightness, props.colorTint3.w * props.brightness) }
        }), [props.brightness, sky, props.colorTint3]);

    const MaterialMilkyWay = new THREE.ShaderMaterial({
      extensions:{
        derivatives: "extension GL_OES_standard_derivatives : enable"
      },
      side : THREE.DoubleSide,
      transparent:true,
        uniforms: milkyWayUniform,
      vertexShader:vertexShader,
      fragmentShader:fragmentShader,
    });

    const MaterialMilkyWaySecondLayer = new THREE.ShaderMaterial({
        extensions: {
            derivatives: "extension GL_OES_standard_derivatives : enable"
        },
        side: THREE.DoubleSide,
        transparent: true,
        uniforms: milkyWayUniformSecondLayer,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
    });

    const MaterialMilkyWayThirdLayer = new THREE.ShaderMaterial({
        extensions: {
            derivatives: "extension GL_OES_standard_derivatives : enable"
        },
        side: THREE.DoubleSide,
        transparent: true,
        uniforms: milkyWayUniformThirdLayer,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
    });


    useFrame((state) => {
        meshRef.current.material.uniforms.time.value = state.clock.getElapsedTime();
        secondMeshRef.current.material.uniforms.time.value = state.clock.getElapsedTime() / 1.0;
        thirdMeshRef.current.material.uniforms.time.value = state.clock.getElapsedTime() / 1.3;
    });
   
    return(
      <>
        <mesh 
            {...props}
            ref={meshRef}
        >
            <planeGeometry args={[5.5,5.5,32]}/>
            <shaderMaterial attach="material"{...MaterialMilkyWay} />
                <mesh
                    ref={secondMeshRef}
                    scale={[3.0, 2.5, 2.5]}
                    position={[0.0, 0.0, -0.3 ]}
                >
                    <planeGeometry args={[5.5, 5.5, 32]} />
                    <shaderMaterial attach="material"{...MaterialMilkyWaySecondLayer} />
                </mesh>
                <mesh
                    ref={thirdMeshRef}
                    scale={[3.0,2.0,3.0]}
                    position={[0.0, 0.0, -0.1 ]}
                >
                    <planeGeometry args={[5.5, 5.5, 32]} />
                    <shaderMaterial attach="material"{...MaterialMilkyWayThirdLayer} />
                </mesh>
        </mesh>
      </>
    )
}

export default MilkyWay;