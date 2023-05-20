import { CGFobject } from "../lib/CGF.js";
import { MyWingTriangle } from "./MyWingTriangle.js"
import { MyWingTriangleTip } from "./MyWingTriangleTip.js";



/**
 * MyBird
 * @constructor
 */
export class MyWing extends CGFobject {
  constructor(scene, orientation) {
    super(scene);
    this.initMaterials(scene);
    this.orientation = orientation == "right" ? -1 : 1;
    this.initialTriangle = new MyWingTriangle(scene);
    this.tip = new MyWingTriangleTip(scene);

  }

  enableNormalViz(){
    
  }

  disableNormalViz(){
    
  }

  initMaterials(){
   

  }
  

  display() {
    this.scene.pushMatrix();

    this.initialTriangle.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.scale(0.5, 1, 0.5);

    this.scene.rotate(Math.PI, 0, 1, 0);

    this.scene.translate(-1.8, 0, -0.4);
    this.initialTriangle.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.9, 0, 0);
    this.scene.rotate((Math.PI * this.orientation) / 6, 0, 0, 1);

    this.tip.display();

  }
}
