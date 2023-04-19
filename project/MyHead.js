import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MyBodyTriangle } from "./MyBodyTriangle.js";
import { MyBodyTriangleVertical } from "./MyBodyTriangleVertical.js";
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
    this.beak = new MyCone(scene, 5, 4);
    this.eye = new MySphere(scene, 50, 20, 0.09, "half");
  }

  enableNormalViz(){
    
  }

  disableNormalViz(){
    
  }

  initMaterials(){
   

  }
  

  display() {
    this.head.display();
    this.scene.pushMatrix();
    this.scene.translate(0,0, 0.328);
    this.scene.scale(0.15, 0.15, 0.20);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.beak.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 4, 1, 0, 0);
    this.scene.rotate(-Math.PI / 7, 0, 1, 0);
    this.scene.translate(0,0, 0.328);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
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
