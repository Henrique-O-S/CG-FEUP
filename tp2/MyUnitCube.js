import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			//front vertices
			-0.5, -0.5, 0.5,	//0
			0.5, -0.5, 0.5,		//1
			0.5, 0.5, 0.5,		//2
			-0.5, 0.5, 0.5,		//3
			//back vertices
			-0.5, -0.5, -0.5,	//4
			0.5, -0.5, -0.5,	//5
			0.5, 0.5, -0.5,		//6
			-0.5, 0.5, -0.5		//7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			//front
			0, 1, 2,
			2, 3, 0,
			//back
			6, 5, 4,
			4, 7, 6,
			//right side
			1, 5, 6,
			6, 2, 1,
			//left side
			4, 0, 3,
			3, 7, 4,
			//top
			3, 2, 6,
			6, 7, 3,
			//bottom
			0, 4, 5,
			5, 1, 0,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

