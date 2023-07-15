precision mediump float;

uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
float PI = 3.14159;
uniform samplerCube uPerlin;
varying vec3 vLayer0;
varying vec3 vLayer1;
varying vec3 vLayer2;

varying vec2 vUv;
varying vec3 vPosition;

float supersun() {
    float sum = 0.;
    sum += textureCube(uPerlin, vLayer0).r;
    // sum += textureCube(uPerlin, vLayer1).r;
    // sum += textureCube(uPerlin, vLayer2).r;
    return sum;
}

void main() {
    gl_FragColor = textureCube(uPerlin, vPosition);
    // gl_FragColor = vec4(supersun());
    // gl_FragColor = vec4(vLayer0, 1.);
}