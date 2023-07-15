precision mediump float;

uniform float time;
uniform vec2 pixels;
varying vec3 vLayer0;
varying vec3 vLayer1;
varying vec3 vLayer2;

varying vec3 vPosition;
varying vec2 vUv;

mat2 rotate(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

float PI = 3.141592653589793238;

void main() {

    float t = time*0.5;

    mat2 rotation = rotate(t);

    vec3 p0 = position;
    p0.yz = rotation * p0.yz;
    vLayer0 = p0;

    vec3 p1 = position;
    p1.xz = rotation * p1.xz;
    vLayer1 = p1;

    vec3 p2 = position;
    p2.xy = rotation * p2.xy;
    vLayer2 = p2;

    vUv = uv;
    vPosition = position;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    
}