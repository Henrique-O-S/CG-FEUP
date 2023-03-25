import {CGFobject} from '../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
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

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

		
		for(var i = 0; i < this.slices; i++){

            this.vertices.push(Math.cos(ang), Math.sin(ang), 0);
            this.indices.push(i, this.slices, (i+1) % this.slices);
            this.normals.push(Math.cos(ang), Math.sin(ang), 0);
            ang+=alphaAng;
        }
		this.vertices.push(0,0,0);
        this.normals.push(0,0,-1);

		
		
	
		for(var i = 0; i < this.stacks; i++){
			ang = 0;
			for(var j = 0; j < this.slices; j++){

				this.vertices.push(Math.cos(ang), Math.sin(ang), i+1);
				if(j == this.slices - 1){
					this.indices.push((j+1) + (i+1) * this.slices + (i*1), (i+1) * (this.slices+1), (this.slices+1) * (i+2) - 1);
				}
				else{
					this.indices.push((j+1) + (i+1) * this.slices + (i*1), (j+2) + (i+1) * this.slices + (i*1), (this.slices+1) * (i+2) - 1);
				}
				this.normals.push(Math.cos(ang), Math.sin(ang), 0);
				ang+=alphaAng;
			}
			this.vertices.push(0,0,i+1);
        	this.normals.push(0,0,1);
		}
		
		
		
		

		/*
		for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(0,0,0);
            this.vertices.push(ca, sa, 0);
            this.vertices.push(caa, saa, 0);

            // triangle normal computed by cross product of two edges
            var normal= [
                caa+ca,
                saa+sa,
                -1
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3*i, (3*i+2) , (3*i+1) );

            ang+=alphaAng;
        }

		
		for(var i = 0; i < this.stacks; i++){
			ang = 0;
        	alphaAng = 2*Math.PI/this.slices;
			for(var j = 0; j < this.slices; j++){
				// All vertices have to be declared for a given face
				// even if they are shared with others, as the normals 
				// in each face will be different

				var sa=Math.sin(ang);
				var saa=Math.sin(ang+alphaAng);
				var ca=Math.cos(ang);
				var caa=Math.cos(ang+alphaAng);

				this.vertices.push(0,0,i+1);
				this.vertices.push(ca, sa, i+1);
				this.vertices.push(caa, saa, i+1);

				// triangle normal computed by cross product of two edges
				var normal= [
					caa+ca,
					saa+sa,
					1
				];

				// normalization
				var nsize=Math.sqrt(
					normal[0]*normal[0]+
					normal[1]*normal[1]+
					normal[2]*normal[2]
					);
				normal[0]/=nsize;
				normal[1]/=nsize;
				normal[2]/=nsize;

				// push normal once for each vertex of this triangle
				this.normals.push(...normal);
				this.normals.push(...normal);
				this.normals.push(...normal);

				this.indices.push(3*j + 3*this.slices * (i+1) , (3*j+1) + 3*this.slices * (i+1) , (3*j+2) + 3*this.slices * (i+1) );

				ang+=alphaAng;
			}
		}
		*/

		for(var i = 0; i < this.stacks; i++){
			for(var j = 0; j < this.slices; j++){
				if(j == this.slices-1){
					this.indices.push(j+i*(this.slices+1), i*(this.slices+1), j+(i+1)*(this.slices+1));
					this.indices.push(j+(i+1)*(this.slices+1), i*(this.slices+1), (i+1)*(this.slices+1));
				}
				else{
				this.indices.push(j+i*(this.slices+1), (j+1)+i*(this.slices+1), j+(i+1)*(this.slices+1));
				this.indices.push(j+(i+1)*(this.slices+1), (j+1)+i*(this.slices+1), (j+1)+(i+1)*(this.slices+1));
				}
			}
		}
		


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
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

