import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
/**
 * MyBodyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBodyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
		this.initMaterials();
    	this.initTextures();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0, //0
			0, -0.95, 0,	//1
			0, -0.95, -1.25,	//2

			0, 0, 0,	//0
			0, -0.95, 0,	//1
			0, -0.95, -1.25	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			0, 2, 1
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];

		this.texCoords = [
			0, 0,
			1, 0,
			0, 1,
			0, 0,
			1, 0,
			0, 1
		];



		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	initMaterials(){

		this.material1 = new CGFappearance(this.scene);
			this.material1.setShininess(1);
			this.material1.setEmission(1, 1, 1, 1);
			this.material1.setAmbient(1, 1, 1, 1);
			this.material1.setDiffuse(1, 1, 1, 1);
			this.material1.setSpecular(1, 1, 1, 1);
	
	}

	initTextures(){
		this.feathersTexture = new CGFtexture(this.scene, 'images/feathers2.jpg');
		this.material1.loadTexture(this.feathersTexture);
	}

}

