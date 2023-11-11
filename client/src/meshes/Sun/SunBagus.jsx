import React, { useRef, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const fragmentShaderSun = `

  precision mediump float;
  varying vec3 Normal;
  varying vec3 Position;
  varying vec2 vUv;
  varying vec3 eyeVector;
  varying vec3 vNN;

  uniform vec3 Ka;
  uniform vec3 Kd;
  uniform vec3 Ks;
  uniform vec4 LightPosition;
  uniform vec3 LightIntensity;
  uniform float Shininess;

  
  uniform float progress;
  uniform samplerCube uPerlin;
  uniform vec4 resolution;
  float PI = 3.14159;

  
  varying vec3 vLayer0;
  varying vec3 vLayer1;
  varying vec3 vLayer2;

  vec3 brightnessToColor(float b){
    b*=0.25;
    return(vec3(b,b*b,b*b*b*b)/0.25) * 0.8;
  }

  
  float Freshnel(vec3 eyeVector, vec3 worldNormal){
    return pow(-min(dot(eyeVector,normalize(worldNormal)),0.0),2.0);
  }

  float supersun(){
    float sum = 0.0;
    sum += textureCube(uPerlin, vLayer0).r;
    sum += textureCube(uPerlin, vLayer1).r;
    sum += textureCube(uPerlin, vLayer2).r;
    sum *= 0.53;
    return sum;
  }

  void main() {
    float brightness = supersun();
    brightness = (brightness*4.0)+1.0;

    float fres = 1.0-Freshnel(eyeVector, vNN);
    brightness += pow(fres,1.);

    vec3 col = brightnessToColor(brightness);
    gl_FragColor = vec4(col,1);
    //gl_FragColor = vec4(cameraPosition.x,cameraPosition.y,cameraPosition.z,1);
    //gl_FragColor = textureCube(uPerlin, Position);
}`;

const vertexShaderSun = `
  varying vec3 Normal;
  varying vec3 Position;
  varying vec4 GN;


  varying vec3 vLayer0;
  varying vec3 vLayer1;
  varying vec3 vLayer2;
  varying vec3 eyeVector;
  uniform float time;
  varying vec3 vNN;

  mat2 rotate(float a){
    float s= sin(a);
    float c= cos(a);
    return mat2(c,-s,s,c);
  }


  void main() {

    float t = time*0.05;
    Normal = normal;

    
    mat4 LM = modelMatrix;
    LM[2][3] = 0.0;
    LM[3][0] = 0.0;
    LM[3][1] = 0.0;
    LM[3][2] = 0.0;


    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    GN = LM * vec4(normal.xyz,1.0);
    vNN = normalize(normalMatrix*normal);

    //eyeVector = -normalize(GN.xyz - cameraPosition.xyz);
    eyeVector = normalize(vec3(modelViewMatrix * vec4(position,1.0)).xyz);

    mat2 rot = rotate(t);
    vec3 p0 = position;
    p0.yz = rot*p0.yz;
    vLayer0 = p0;

    
    mat2 rot1 = rotate(t+10.);
    vec3 p1 = position;
    p1.xz = rot1*p1.xz;
    vLayer1 = p1;

    
    mat2 rot2 = rotate(t+30.);
    vec3 p2 = position;
    p2.xy = rot2*p2.xy;
    vLayer2 = p2;

    //Normal = normalize(normalMatrix * normal);
    Position = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const fragmentShaderOuterSun = `

  varying vec3 Normal;
  varying vec3 Position;
  varying vec4 vPos;
  varying vec2 vUv;
  varying vec3 eyeVector;
  varying vec3 vNN;

  uniform vec3 Ka;
  uniform vec3 Kd;
  uniform vec3 Ks;
  uniform vec4 LightPosition;
  uniform vec3 LightIntensity;
  uniform float Shininess;
  uniform float time;
  uniform vec3 normalizedScreenSpacePos;

  
  uniform float progress;
  uniform samplerCube uPerlin;
  uniform vec4 resolution;
  float PI = 3.14159;

  
  varying vec3 vLayer0;
  varying vec3 vLayer1;
  varying vec3 vLayer2;

  float random (in vec2 p) {
    vec3 p3  = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }


  vec3 brightnessToColor(float b){
    b*=0.25;
    return(vec3(b,b*b,b*b*b*b)/0.25) * 0.8;
  }

  float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3. - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1. - u.x) +
            (d - b) * u.x * u.y;
}

  
  float Freshnel(vec3 eyeVector, vec3 worldNormal){
    return pow(-min(dot(eyeVector,normalize(worldNormal)),0.0),2.0);
  }

  float supersun(){
    float sum = 0.0;
    sum += textureCube(uPerlin, vLayer0).r;
    sum += textureCube(uPerlin, vLayer1).r;
    sum += textureCube(uPerlin, vLayer2).r;
    sum *= 0.53;
    return sum;
  }

  float flare(in float angle,in float alpha,in float _time){
    float t = _time;
      float n = noise(vec2(t+0.5+abs(angle)+pow(alpha,0.6),t-abs(angle)+pow(alpha+0.1,0.6))*3.0);
     //	n = 1.0;
      float split = (15.0+sin(t*2.0+n*0.5+angle*10.0+alpha*1.0*n)*(.3+.1+alpha*.3*n));
  
      float rotate = sin(angle*3.0+ sin(angle*5.0+alpha*4.0+t*30.0+n*5.0+alpha*8.0))*(.5 + alpha*1.5);
  
      float g = pow((2.0+sin(split+n*1.*alpha+rotate)*1.4)*n*4.0,n*(1.5-0.8*alpha));
  
      g *= alpha * alpha * alpha * .5;
    g += alpha*.7 + g * g * g;
    return g;
  }

  #define SIZE 14.5
  #define RADIUS 0.07
  #define INNER_FADE 1.6
  #define OUTER_FADE 0.1
  #define SPEED .1
  #define BORDER 1.21

  float light(in vec2 pos,in float size,in float radius,in float inner_fade,in float outer_fade){
    float len = length(pos/size);
    return pow(clamp((1.0 - pow( clamp(len-radius,0.0,1.0) , 1.0/inner_fade)),0.0,1.0),1.0/outer_fade);
  }

  void main() {
    vec2 vCoords = vPos.xy;
    vCoords /= vPos.w;
    vCoords = vCoords * 0.5 + 0.5;
    vec2 screenSpacePos = fract(vCoords * 1.0);
    float angle = atan(screenSpacePos.x -normalizedScreenSpacePos.x , screenSpacePos.y-normalizedScreenSpacePos.y);
    float n = noise(vec2(screenSpacePos.x*56.+time*0.1,screenSpacePos.y*50.+time*0.1));


    float brightness = Freshnel(eyeVector, vNN)*1.2;
    brightness = light(Position.xy,SIZE,RADIUS,INNER_FADE,OUTER_FADE);
    //angle = atan(vCoords.x,vCoords.y);

    float sunFlare = flare(angle, brightness, time*0.05)*1.;
    //gl_FragColor = vec4(brightness,brightness,brightness,1);
    gl_FragColor.rgb = brightnessToColor((brightness)*sunFlare)*1.5;
    //gl_FragColor.rgb = vec3(sunFlare-0.7,sunFlare-0.7,sunFlare-0.7);
    //gl_FragColor.rgb = Position;
    gl_FragColor.a = gl_FragColor.g+(gl_FragColor.r*0.1)/4.0;
    gl_FragColor.a = gl_FragColor.a<0.3?0.0:gl_FragColor.a;
  }`;

const vertexShaderOuterSun = `
  varying vec3 Normal;
  varying vec3 Position;
  varying vec4 vPos;
  varying vec4 GN;


  varying vec3 vLayer0;
  varying vec3 vLayer1;
  varying vec3 vLayer2;
  varying vec3 vNN;
  varying vec3 eyeVector;
  uniform float time;
  uniform vec3 normalizedScreenSpacePos;
  uniform float objectScale;

  

  mat2 rotate(float a){
    float s= sin(a);
    float c= cos(a);
    return mat2(c,-s,s,c);
  }


  void main() {

    mat4 LM = modelMatrix;
    LM[2][3] = 0.0;
    LM[3][0] = 0.0;
    LM[3][1] = 0.0;
    LM[3][2] = 0.0;

    float t = time*0.05;
    Normal = normal;

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);

    GN = LM * vec4(normal.xyz,1.0);
    vNN = -normalize(normalMatrix*normal);

    //eyeVector = -normalize(GN.xyz - cameraPosition.xyz);
    eyeVector = normalize(vec3(modelViewMatrix * vec4(position,1.0)).xyz);

    mat2 rot = rotate(t);
    vec3 p0 = position;
    p0.yz = rot*p0.yz;
    vLayer0 = p0;

    
    mat2 rot1 = rotate(t+10.);
    vec3 p1 = position;
    p1.xz = rot1*p1.xz;
    vLayer1 = p1;

    
    mat2 rot2 = rotate(t+30.);
    vec3 p2 = position;
    p2.xy = rot2*p2.xy;
    vLayer2 = p2;

    Normal = normalize(normalMatrix * normal);
    Position = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = (projectionMatrix * (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0) + (vec4(position.x, position.y, 0.0, 0.0)*objectScale)));
    vPos = gl_Position;
  }
`;

const fragmentShader = `

  precision mediump float;
  varying vec3 Normal;
  varying vec3 Position;
  varying vec2 vUv;

  uniform vec3 Ka;
  uniform vec3 Kd;
  uniform vec3 Ks;
  uniform vec4 LightPosition;
  uniform vec3 LightIntensity;
  uniform float Shininess;

  
  uniform float time;
  uniform float progress;
  uniform sampler2D texture1;
  uniform vec4 resolution;
  float PI = 3.14159;


  vec3 phong() {
    vec3 n = normalize(Normal);
    vec3 s = normalize(vec3(LightPosition) - Position);
    vec3 v = normalize(vec3(-Position));
    vec3 r = reflect(-s, n);

    vec3 ambient = Ka;
    vec3 diffuse = Kd * max(dot(s, n), 0.0);
    vec3 specular = Ks * pow(max(dot(r, v), 0.0), Shininess);

    return LightIntensity * (ambient + diffuse + specular);
  }

  
vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  float mod289(float x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 permute(vec4 x) {
  return mod289(((x*34.0)+1.0)*x);
  }
  
  float permute(float x) {
  return mod289(((x*34.0)+1.0)*x);
  }
  
  vec4 taylorInvSqrt(vec4 r)
  {
  return 1.79284291400159 - 0.85373472095314 * r;
  }
  
  float taylorInvSqrt(float r)
  {
  return 1.79284291400159 - 0.85373472095314 * r;
  }
  
  vec4 grad4(float j, vec4 ip)
  {
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
  vec4 p,s;
  
  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
  s = vec4(lessThan(p, vec4(0.0)));
  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;
  
  return p;
  }
  
  // (sqrt(5) - 1)/4 = F4, used once below
  #define F4 0.309016994374947451
  
  float snoise(vec4 v)
  {
  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4
  0.276393202250021,  // 2 * G4
  0.414589803375032,  // 3 * G4
  -0.447213595499958); // -1 + 4 * G4
  
  // First corner
  vec4 i  = floor(v + dot(v, vec4(F4)) );
  vec4 x0 = v -   i + dot(i, C.xxxx);
  
  // Other corners
  
  // Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
  vec4 i0;
  vec3 isX = step( x0.yzw, x0.xxx );
  vec3 isYZ = step( x0.zww, x0.yyz );
  //  i0.x = dot( isX, vec3( 1.0 ) );
  i0.x = isX.x + isX.y + isX.z;
  i0.yzw = 1.0 - isX;
  //  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
  i0.y += isYZ.x + isYZ.y;
  i0.zw += 1.0 - isYZ.xy;
  i0.z += isYZ.z;
  i0.w += 1.0 - isYZ.z;
  
  // i0 now contains the unique values 0,1,2,3 in each channel
  vec4 i3 = clamp( i0, 0.0, 1.0 );
  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );
  
  //  x0 = x0 - 0.0 + 0.0 * C.xxxx
  //  x1 = x0 - i1  + 1.0 * C.xxxx
  //  x2 = x0 - i2  + 2.0 * C.xxxx
  //  x3 = x0 - i3  + 3.0 * C.xxxx
  //  x4 = x0 - 1.0 + 4.0 * C.xxxx
  vec4 x1 = x0 - i1 + C.xxxx;
  vec4 x2 = x0 - i2 + C.yyyy;
  vec4 x3 = x0 - i3 + C.zzzz;
  vec4 x4 = x0 + C.wwww;
  
  // Permutations
  i = mod289(i);
  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
  vec4 j1 = permute( permute( permute( permute (
  i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
  + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
  + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
  + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));
  
  // Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope
  // 7*7*6 = 294, which is close to the ring size 17*17 = 289.
  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;
  
  vec4 p0 = grad4(j0,   ip);
  vec4 p1 = grad4(j1.x, ip);
  vec4 p2 = grad4(j1.y, ip);
  vec4 p3 = grad4(j1.z, ip);
  vec4 p4 = grad4(j1.w, ip);
  
  // Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  p4 *= taylorInvSqrt(dot(p4,p4));
  
  // Mix contributions from the five corners
  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
  m0 = m0 * m0;
  m1 = m1 * m1;
  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
  + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;
  
  }
  
  float fbm(vec4 p) {
      float sum = 0.;
      float amp = 1.;
      float scale = 1.;
      for(int i = 0; i<6; i++) {
          sum += snoise(p*scale)*amp;
          p.w += 100.;
          amp *= 0.9;
          scale *= 5.;
      }
      return sum;
  }

  void main() {
    vec4 p = vec4(Position*13., time*0.05);
    float noisy = fbm(p);
    vec4 p1 = vec4(Position*2.7, time*0.1);
    float spots = max(snoise(p1),0.);
    gl_FragColor = vec4(noisy,noisy,noisy,noisy);
    gl_FragColor *= mix(1.,spots,0.8);
}`;

const vertexShader = `
  varying vec3 Normal;
  varying vec3 Position;

  void main() {
    Normal = normalize(normalMatrix * normal);
    Position = vec3(modelViewMatrix * vec4(position, 1.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function Sun({ tile, ...props }) {
  // game logic

  const [selected, setSelected] = useState(false);
  const wrapperMatRef = useRef();

  function handlePointerEnter(event) {
    event.stopPropagation();
    document.body.style.cursor = "pointer";
    // earth1Ref.current.material.color.r += 0.1;
    // waterMatRef.current.color.r += 1;
    wrapperMatRef.current.opacity += 0.5;
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    document.body.style.cursor = "default";
    // earth1Ref.current.material.color.r -= 0.1;
    // waterMatRef.current.color.r -= 1;
    wrapperMatRef.current.opacity -= 0.5;
  }

  function handlePointerDown(event) {
    event.stopPropagation();
    if (selected == false) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }

  function SunWrap() {
    return (
      <mesh
        castShadow
        visible={true}
        onPointerDown={(event) => handlePointerDown(event)}
        onPointerEnter={(event) => handlePointerEnter(event)}
        onPointerLeave={(event) => handlePointerLeave(event)}
      >
        <sphereGeometry args={[2, 32, 16]} />
        <meshStandardMaterial
          transparent
          opacity={0}
          ref={wrapperMatRef}
          color="grey"
        />
      </mesh>
    );
  }

  // shader
  const meshRef = useRef();
  const childMeshRef = useRef();
  var scene1 = new THREE.Scene();
  const { gl, camera, scene, size } = useThree();

  //Use this to scale the sun
  var sphereGeometryScale;

  var cubeRenderTarget1 = new THREE.WebGLCubeRenderTarget(1024, {
    format: THREE.RGBAFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
    colorSpace: THREE.SRGBColorSpace,
  });

  var cubeCamera = new THREE.CubeCamera(0.01, 100, cubeRenderTarget1);

  var MaterialPerlin = new THREE.ShaderMaterial({
    extensions: {
      derivatives: "extension GL_OES_standard_derivatives : enable",
    },
    side: THREE.DoubleSide,
    uniforms: {
      time: { value: 0 },
      resolution: { value: new THREE.Vector4() },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });

  var geometry = new THREE.SphereGeometry(1, 32, 16);
  var perlin = new THREE.Mesh(geometry, MaterialPerlin);
  scene1.add(perlin);

  useFrame((state, delta) => {
    meshRef.current.material.uniforms.time.value = state.clock.elapsedTime;
    meshRef.current.rotation.y = state.clock.elapsedTime / 10;
    childMeshRef.current.material.uniforms.objectScale.value =
      selected === true ? props.scale * 1.3 : props.scale;
    MaterialPerlin.uniforms.time.value = state.clock.elapsedTime;
    childMeshRef.current.material.transparent = true;
    childMeshRef.current.material.uniforms.time.value = state.clock.elapsedTime;
  }, 0);

  useFrame(({ gl, scene, camera }) => {
    scene.background = new THREE.Color(0x000d1c);
    perlin.position.copy(meshRef.current.position);
    cubeCamera.position.copy(perlin.position);
    cubeCamera.update(gl, scene1);
    meshRef.current.material.uniforms.uPerlin.value = cubeRenderTarget1.texture;
    var updatePosition = new THREE.Vector3();
    updatePosition = meshRef.current.position.clone();
    updatePosition.project(camera);
    updatePosition.x = (updatePosition.x + 1) / 2;
    updatePosition.y = (updatePosition.y + 1) / 2;
    childMeshRef.current.material.uniforms.normalizedScreenSpacePos.value =
      updatePosition;
    gl.render(scene, camera);
  }, 1);
  const data = useMemo(
    () => ({
      uniforms: {
        Ka: { value: new THREE.Vector3(1, 1, 1) },
        Kd: { value: new THREE.Vector3(1, 1, 1) },
        Ks: { value: new THREE.Vector3(1, 1, 1) },
        LightIntensity: { value: new THREE.Vector4(0.5, 0.5, 0.5, 1.0) },
        LightPosition: { value: new THREE.Vector4(0.0, 2000.0, 0.0, 1.0) },
        Shininess: { value: 20.0 },
        uPerlin: { value: null },
        time: { type: "f", value: "0.0" },
      },
      fragmentShader: fragmentShaderSun,
      vertexShader: vertexShaderSun,
    }),
    []
  );

  const outerData = useMemo(
    () => ({
      uniforms: {
        time: { type: "f", value: "0.0" },
        normalizedScreenSpacePos: { value: new THREE.Vector3(0.5, 0.5, 1) },
        objectScale: {
          value: selected === true ? props.scale * 1.3 : props.scale,
        },
      },
      side: THREE.FrontSide,
      transparent: true,
      fragmentShader: fragmentShaderOuterSun,
      vertexShader: vertexShaderOuterSun,
    }),
    []
  );

  return (
    <>
      <mesh
        {...props}
        ref={meshRef}
        scale={selected === true ? props.scale * 1.3 : props.scale}
      >
        <sphereGeometry args={[1, 32, 16]} />
        <shaderMaterial attach="material" {...data} />
        <mesh
          ref={childMeshRef}
          scale={selected === true ? props.scale * 1.3 : props.scale}
        >
          <planeGeometry args={[2.5, 2.5, 32]} />
          <shaderMaterial attach="material" {...outerData} />
          <pointLight
            intensity={props.intensity}
            distance={props.distance}
          ></pointLight>
        </mesh>
      </mesh>
      <SunWrap />
    </>
  );
}

export default Sun;
