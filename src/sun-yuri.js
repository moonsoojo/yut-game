this.cubeRenderTarget1 = new THREE.WebGLCubeRenderTarget( 256, {
    format: THREE.RGB_ETC1_Format,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
    encoding: THREE.sRGBEncoding
})

this.cubeCamera1 = new THREE.CubeCamera( 0.1, 10, this.cubeRenderTarget1)

cubeCamera1.update( this.renderer, this.scene);

this.materialPerlin = new THREE.ShaderMaterial({
    extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable"
    },
    side: THREE.DoubleSide,
    uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector4() },
    },
    vertexShader: vertex,
    fragmentShader: fragment
})

this.geometry = new THREE.SphereBufferGeometry(1, 30, 30);
this.perlin = new THREE.Mesh(this.geometry, this.materialPerlin);
this.scene.add(this.perlin)

this.materialSun = new THREE.ShaderMaterial({
    extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable"
    },
    side: THREE.DoubleSide,
    uniforms: {
        time: { value: 0 },
        uPerlin: { value: null },
        resolution: { value: new THREE.Vector4() },
    },
    vertexShader: vertexSun,
    fragmentShader: fragmentSun
})

this.geometry = new THREE.SphereBufferGeometry(1, 30, 30);
this.sun = new THREE.Mesh(this.geometry, this.materialSun);
this.scene.add(this.sun)

this.cubeCamera1.update( this.renderer, this.scene );
this.materialSun.uniforms.uPerlin.value = this.cubeRenderTarget1.texture;

this.time += 0.05;
this.materialSun.uniforms.time.value = this.time;
this.materialPerlin.uniforms.time.value = this.time;

//couldn't 
this.renderer.render(this.scene, this.camera)