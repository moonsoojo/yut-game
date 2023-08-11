precision mediump float;

uniform float time;
uniform vec2 pixels;

varying vec3 vPosition;
varying vec2 vUv;

float PI = 3.141592653589793238;
void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}