import { CGFobject } from "../lib/CGF.js";
import { MyWing } from "./MyWing.js";



/**
 * MyBody
 * @constructor
 */
export class MyWings extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initMaterials();
    this.rightWing = new MyWing(scene, "right");
    this.leftWing = new MyWing(scene, "left");
    this.angle = 0;
  }

  enableNormalViz(){
    
  }

  disableNormalViz(){
    
  }

  initMaterials(){
   

  }
  
  setAngle(angle){
    this.angle = angle;
  }

  display() {
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.scene.translate(0.4, 0, 0);
    this.scene.rotate(this.angle, 0, 0, 1);
    this.leftWing.display();
    this.scene.popMatrix();    
    this.scene.popMatrix();
    this.scene.rotate(-this.angle, 0, 0, 1);
    this.rightWing.display();
    this.scene.popMatrix();
    this.scene.popMatrix();

    this.scene.pushMatrix();


  }
}
