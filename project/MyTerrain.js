import {CGFobject, CGFshader, CGFtexture, CGFappearance} from '../lib/CGF.js';
import { MyPlane } from "./MyPlane.js";

/**
* MyTerrain
* @constructor
 * @param scene         - Reference to MyScene object
 * @param nrDivs        - number of divisions in both directions of the surface
 * @param heightscale   - number of divisions along the Y axis
 * @param texture   	- radius of the sphere
 * @param heightmap 	- boolean indicating wether it is an inverter sphere (for the panorama) or a normal one
 * @param altimetry 	- vector to be added to the position of the center


*/

export class MyTerrain extends CGFobject {

	constructor(scene, nrDivs, heightscale, texture, heightmap, altimetry) {
		super(scene);

        this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
		this.shader.setUniformsValues({normScale: heightscale});
		this.shader.setUniformsValues({uSampler2: 1});
		this.shader.setUniformsValues({uSampler3: 2});

    
        this.texture = new CGFtexture(this.scene, texture);
        this.heightmap = new CGFtexture(this.scene, heightmap);
		this.altimetry = new CGFtexture(this.scene, altimetry);

        this.terrain = new MyPlane(this.scene, nrDivs);
	
		this.material = new CGFappearance(this.scene);
		this.material.setShininess(1);
		this.material.setEmission(1, 1, 1, 1);
		this.material.setAmbient(1, 1, 1, 1);
		this.material.setDiffuse(1, 1, 1, 1);
		this.material.setSpecular(1, 1, 1, 1);
		this.material.setTexture(this.texture);

	}


	display() {
		this.scene.setActiveShader(this.shader);

		this.material.apply();
		this.heightmap.bind(1);
		this.altimetry.bind(2);
	    this.terrain.display();

	    this.scene.setActiveShader(this.scene.defaultShader);
	}

};