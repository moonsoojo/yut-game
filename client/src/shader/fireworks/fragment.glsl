uniform sampler2D uTexture;
uniform vec3 uColor;

void main()
{
    float textureAlpha = texture(uTexture, gl_PointCoord).r;

    // Final color
    gl_FragColor = vec4(uColor, textureAlpha);
    // gl_FragColor = vec4(gl_PointCoord, 1.0, 1.0);
    #include <tonemapping_fragment>
    // #include <colorspace_fragment>
}