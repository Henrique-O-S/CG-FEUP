import {CGFobject, CGFtexture, CGFappearance} from '../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';

/**
* MyTreeGroupPatch
* @constructor
 * @param scene         - Reference to MyScene object
*/

export class MyTreeGroupPatch extends CGFobject {

	constructor(scene, x, y, z) {
		super(scene);

        this.tree = new MyBillboard(this.scene)
        this.initMaterials();
        this.initTextures();

        this.treesTexture = [];
        this.treesPosition = [];
        this.treesSize = [];
        let texture;
        let offset;
        let scale;

        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){

                texture = Math.floor(Math.random() * (4 - 1) + 1);

                if(texture == 1)
                    this.treesTexture[i*3 + j] = this.material1;
                else if(texture == 2)
                    this.treesTexture[i*3 + j] = this.material2;
                else
                    this.treesTexture[i*3 + j] = this.material3;;

                offset = Math.random() * (5 - 0) + 0;

                scale = Math.random() * (1.2 - 0.8) + 0.8;
                this.treesSize[i*3 + j] = scale;

                let position = [];
                position.x = x + i*10 + offset;
                position.y = y;
                position.z = z + j*10;
                this.treesPosition[i*3 + j] = position;
            }
        }
	}

    initMaterials(){
        this.material1 = new CGFappearance(this.scene);
		this.material1.setShininess(1);
		this.material1.setEmission(1, 1, 1, 1);
		this.material1.setAmbient(1, 1, 1, 1);
		this.material1.setDiffuse(1, 1, 1, 1);
		this.material1.setSpecular(1, 1, 1, 1);

        this.material2 = new CGFappearance(this.scene);
		this.material2.setShininess(1);
		this.material2.setEmission(1, 1, 1, 1);
		this.material2.setAmbient(1, 1, 1, 1);
		this.material2.setDiffuse(1, 1, 1, 1);
		this.material2.setSpecular(1, 1, 1, 1);

        this.material3 = new CGFappearance(this.scene);
		this.material3.setShininess(1);
		this.material3.setEmission(1, 1, 1, 1);
		this.material3.setAmbient(1, 1, 1, 1);
		this.material3.setDiffuse(1, 1, 1, 1);
		this.material3.setSpecular(1, 1, 1, 1);
    }

    initTextures(){
        this.texture1 = new CGFtexture(this.scene, 'images/billboardtree1.png');
        this.material1.setTexture(this.texture1);

        this.texture2 = new CGFtexture(this.scene, 'images/billboardtree2.png');
        this.material2.setTexture(this.texture2);

        this.texture3 = new CGFtexture(this.scene, 'images/billboardtree3.png');
        this.material3.setTexture(this.texture3);
    }


	display() {

        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                this.scene.pushMatrix();
                
                this.treesTexture[i*3 + j].apply();
                this.tree.display(this.treesPosition[i*3 + j].x, this.treesPosition[i*3 + j].y, this.treesPosition[i*3 + j].z, this.treesSize[i*3 + j]);

                this.scene.popMatrix();
            }
        }

	}

};