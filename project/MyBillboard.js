import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

/**
* MyBillboard
* @constructor
 * @param scene         - Reference to MyScene object
*/

export class MyBillboard extends CGFobject {

	constructor(scene) {
		super(scene);

        this.billboard = new MyQuad(this.scene);
	}


	display(x, y, z, scale) {

        this.scene.pushMatrix();

        const camPos = vec2.fromValues(this.scene.camera.position[0], this.scene.camera.position[2]);

        // get the vector from billboard to camera
        const toCamera = vec2.subtract(vec2.create(), camPos, vec2.fromValues(x, z));
        vec2.normalize(toCamera, toCamera);

        // get the angle between camera direction and vector to camera
        let angle = 0;
        const normalXZ = vec2.fromValues(this.billboard.normals[0], this.billboard.normals[2]);
        if(toCamera[0] < 0)
            angle = - Math.acos(vec2.dot(toCamera, normalXZ));
        else
            angle = Math.acos(vec2.dot(toCamera, normalXZ));

        this.scene.translate(x, y, z);
        this.scene.rotate(angle,0,1,0);
        this.scene.scale(10, 10, 10);
        this.scene.scale(scale, scale, scale);
	    this.billboard.display();

        this.scene.popMatrix();

	}

};