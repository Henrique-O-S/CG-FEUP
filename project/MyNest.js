import {CGFobject, CGFshader, CGFtexture, CGFappearance} from '../lib/CGF.js';
import {MyCone} from "./MyCone.js";

/**
 * MyNest
 * @constructor
    * @param scene - Reference to MyScene object
    * @param position - Nest position
 */

export class MyNest extends CGFobject {
    constructor(scene, position) {
        super(scene);
        this.position = position;
        this.extraBranches = [];

        this.initBuffers();
        this.Materials();
        this.Textures();
    }

    initBuffers() {
        this.cone = new MyCone(this.scene, 6, 6);
    }

    Materials() {
        //Trunk material (brown)
        this.nestMaterial = new CGFappearance(this.scene);

        this.nestMaterial.setAmbient(0.7, 0.5, 0.3, 1.0);
        this.nestMaterial.setDiffuse(0.7, 0.5, 0.3, 1.0);
        this.nestMaterial.setSpecular(0,0,0, 1.0);
        this.nestMaterial.setShininess(10.0);
    }

    Textures() {
        //nest texture
        this.nestTexture = new CGFtexture(this.scene, 'images/nest.jpg');

        this.nestMaterial.setTexture(this.nestTexture);
    }

    display() {
    
        this.scene.pushMatrix();


        this.scene.translate(this.position.x, this.position.y, this.position.z);

        this.nestMaterial.apply();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 180 * 180, 1, 0, 0);
        this.scene.scale(2,2,2);
        this.cone.display();
        this.scene.rotate(Math.PI / 180 * 30, 0, 1, 0);
        this.cone.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

    }

};