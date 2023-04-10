import {CGFobject} from '../lib/CGF.js';
/**
* MySphere
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 * @param radius - radius of the sphere
*/
export class MySphere extends CGFobject {

    constructor(scene, slices, stacks, radius) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.initBuffers();
    };

    initBuffers() {
        this.vertices = [];
        this.normals = [];
        this.indices = [];
        this.texCoords = [];


        for (var i = 0; i <= this.stacks; i++) {
            for (var j = 0; j < this.slices; j++) {
                this.vertices.push(this.radius * Math.cos(j * Math.PI * 2 / this.slices) * Math.cos(i * Math.PI / 2 / this.stacks), this.radius * Math.sin(i * Math.PI / 2 / this.stacks), this.radius * Math.sin(j * Math.PI * 2 / this.slices) * Math.cos(i * Math.PI / 2 / this.stacks));
                this.normals.push(this.radius * Math.cos(j * Math.PI * 2 / this.slices) * Math.cos(i * Math.PI / 2 / this.stacks), 0, this.radius * Math.sin(j * Math.PI * 2 / this.slices) * Math.cos(i * Math.PI / 2 / this.stacks));
                this.texCoords.push((this.radius * Math.cos(j * Math.PI * 2 / this.slices) * Math.cos(i * Math.PI / 2 / this.stacks)) / (this.radius * Math.cos(this.slices * Math.PI * 2 / this.slices) * Math.cos(this.stacks * Math.PI / 2 / this.stacks)), ((this.radius * Math.sin(i * Math.PI / 2 / this.stacks)) / (this.radius * Math.sin(this.stacks * Math.PI / 2 / this.stacks))) / 2);
            }
        }

        

        for (var i = 0; i <= this.stacks; i++) {
            for (var j = 0; j < this.slices; j++) {
                this.vertices.push(this.radius * Math.cos(j * Math.PI * 2 / this.slices) * Math.cos(i * Math.PI / 2 / this.stacks), - this.radius * Math.sin(i * Math.PI / 2 / this.stacks), this.radius * Math.sin(j * Math.PI * 2 / this.slices) * Math.cos(i * Math.PI / 2 / this.stacks));
                this.normals.push(this.radius * Math.cos(j * Math.PI * 2 / this.slices) * Math.cos(i * Math.PI / 2 / this.stacks), 0, this.radius * Math.sin(j * Math.PI * 2 / this.slices) * Math.cos(i * Math.PI / 2 / this.stacks));
                this.texCoords.push((this.radius * Math.cos(j * Math.PI * 2 / this.slices) * Math.cos(i * Math.PI / 2 / this.stacks)) / (this.radius * Math.cos(this.slices * Math.PI * 2 / this.slices) * Math.cos(this.stacks * Math.PI / 2 / this.stacks)), ((this.radius * Math.sin(i * Math.PI / 2 / this.stacks)) / (this.radius * Math.sin(this.stacks * Math.PI / 2 / this.stacks))) / 2 + 0.5);
            }
        }

        for (var i = 0; i < 2 * this.stacks; i++) {
            for (var j = 0; j < 2 * this.slices - 1; j++) {
                this.indices.push(this.slices * i + j, this.slices * i + j + 1, this.slices * (i + 1) + j);
                this.indices.push(this.slices * i + j + 1, this.slices * i + j, this.slices * (i + 1) + j);
                this.indices.push(this.slices * (i + 1) + j, this.slices * (i + 1) + j + 1, this.slices * i + j + 1);
                this.indices.push(this.slices * (i + 1) + j + 1, this.slices * (i + 1) + j, this.slices * i + j + 1);
            }
        }

        for (var i = 0; i < 2 * this.stacks; i++) {
            var j = this.slices - 1;
            this.indices.push(this.slices * i, this.slices * i + j + 1, this.slices * i + j);
            this.indices.push(this.slices * i + j + 1, this.slices * i, this.slices * i + j);
            this.indices.push(this.slices * i + j, this.slices * i + j + 1, this.slices * (i + 1) + j);
            this.indices.push(this.slices * i + j + 1, this.slices * i + j, this.slices * (i + 1) + j);
        }

       

        this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
        this.initGLBuffers();
    }

    setFillMode() { 
		this.primitiveType=this.scene.gl.TRIANGLE_STRIP;
	}

	setLineMode() 
	{ 
		this.primitiveType=this.scene.gl.LINES;
	}

    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
};

