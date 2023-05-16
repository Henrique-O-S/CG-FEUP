import {CGFobject} from '../lib/CGF.js';
/**
* MyCone
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyCone extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;
        var texCoordS = 0;
        var texCoordT = 1;
    
        var texCoordStepS = 1 / this.slices;

    
        for (var i = 0; i < this.slices; i++) {
            var x = Math.cos(ang);
            var z = -Math.sin(ang);
    
            this.vertices.push(x, 0, z);
            this.normals.push(x, -Math.cos(Math.PI / 4.0), z);
    
            this.texCoords.push(texCoordS, texCoordT);
            texCoordS += texCoordStepS;
    
            ang += alphaAng;
        }
    
        this.vertices.push(0, 1, 0);
        this.normals.push(0, -1, 0);
        this.texCoords.push(0.5, 0.5); // Center point of the top circle
    
        for (var i = 0; i < this.slices; i++) {
            this.indices.push(i, (i + 1) % this.slices, this.slices);
            this.indices.push(i, this.slices, (i + 1) % this.slices);
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
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
}


