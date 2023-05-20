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
        this.nestColision = [];
        this.nestColision.x = 6;
        this.nestColision.y = 2;
        this.nestColision.z = 6;
        this.a = -(10/1000) / 2;
        this.time = 0;
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

    updatePos(time){
        if(this.time == 0){
            this.time = time;
        }
        else{
            const elapsedTime = time - this.time;
            this.x = this.x + this.vx;
            this.z = this.z + this.vz;
            this.y = this.y + this.vy + 0.5 * this.a * elapsedTime;
        }
        if(this.checkNestColision()){
            this.vx = 0;
            this.vy = 0;
            this.vz = 0;
            this.egg.time = 0;
            this.scene.fallingEgg = 0;
            this.scene.nest.addEgg(this);
        }
        if(this.y <= this.scene.eggHeight){
            this.vx = 0;
            this.vy = 0;
            this.vz = 0;
            this.egg.time = 0;
            this.scene.fallingEgg = 0;
        }
    }

    checkNestColision(){
        return Math.abs(this.y - this.scene.nestPosition.y) < this.nestColision.y && Math.abs(this.x - this.scene.nestPosition.x) < this.nestColision.x && Math.abs(this.z - this.scene.nestPosition.z) < this.nestColision.z;
    }


    
};