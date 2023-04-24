import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import {MySphere} from "./MySphere.js";
/**
* MyBirdEgg
* @constructor
 * @param scene - Reference to MyScene object
 * @param x     - X component of the egg's position
 * @param y     - Y component of the egg's position
 * @param z     - Z component of the egg's position


*/
export class MyBirdEgg extends CGFobject {

    constructor(scene, x, y, z) {
        super(scene);
        this.x = x;
        this.y = y;
        this.z = z;
        this.egg = new MySphere(scene, 50, 20, 0.3, false, [0,0,0]);
        this.initMaterials();
    }

    initMaterials(){
        this.material = new CGFappearance(this.scene);
        this.material.setEmission(0.3, 0.3, 0.3, 0.7);
        this.eggTexture = new CGFtexture(this.scene, 'images/egg.jpg');
        this.material.setTexture(this.eggTexture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }
    
    display() {
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(1, 1.5, 1);
	    this.egg.display();

        this.scene.popMatrix();
	}
    
};