import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MyCone } from "./MyCone.js";
import { MySphere } from "./MySphere.js";



/**
 * MyBody
 * @constructor
 */
export class MyHead extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initMaterials();
    this.head = new MySphere(scene, 50, 20, 0.35);
    this.beak = new MyCone(scene, 6, 4);
    this.eye = new MySphere(scene, 50, 20, 0.09, "half");
  }

  enableNormalViz(){
    
  }

  disableNormalViz(){
    
  }

  initMaterials(){

		this.material1 = new CGFappearance(this.scene);
    this.material1.setShininess(1);
    this.material1.setEmission(1, 0.80, 0.25, 1);
    this.material1.setAmbient(1, 0.80, 0.25, 1);
    this.material1.setDiffuse(1, 0.80, 0.25, 1);
    this.material1.setSpecular(1, 0.80, 0.25, 1);

    this.material2 = new CGFappearance(this.scene);
    this.material2.setShininess(1);
    this.material1.setEmission(1, 0.80, 0.25, 1);
    this.material2.setAmbient(0, 0, 0, 1);
    this.material2.setDiffuse(0, 0, 0, 1);
    this.material2.setSpecular(0, 0, 0, 1);
	
	}
  

  display() {
    this.head.display();
    this.scene.pushMatrix();
    this.scene.translate(0,0, 0.328);
    this.scene.scale(0.15, 0.15, 0.20);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.material1.apply();
    this.beak.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 4, 1, 0, 0);
    this.scene.rotate(-Math.PI / 7, 0, 1, 0);
    this.scene.translate(0,0, 0.328);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.material2.apply();
    this.eye.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 4, 1, 0, 0);
    this.scene.rotate(Math.PI / 7, 0, 1, 0);
    this.scene.translate(0,0, 0.328);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.eye.display();
    this.scene.popMatrix();
  }
}
