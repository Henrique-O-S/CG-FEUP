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
    this.beak = new MyCone(scene, 5, 5);
  }

  enableNormalViz(){
    
  }

  disableNormalViz(){
    
  }

  initMaterials(){
   

  }
  

  display() {
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.chest.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-0.2, 0.5, 0);
    this.lateral.display();

    //this.vertical.display();

    this.scene.pushMatrix();
    this.scene.popMatrix();

    this.scene.translate(0.4, 0, 0);
    this.lateral.display();
    //this.vertical.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.translate(-0.2, 0.5, 0);
    this.scene.rotate(52.7 * (Math.PI / 180) , 1, 0, 0);

    this.vertical.display();

    this.scene.rotate(Math.PI, 0, 0, 1);
    this.scene.translate(-0.4, 1.57, 0);
    this.vertical.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.scale(1,1,1.25 / 1.57);
    this.scene.translate(-0.2, -0.45, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
  
    this.vertical.display();

    this.scene.rotate(Math.PI, 1, 0, 0);
    this.scene.rotate(Math.PI, 0, 1, 0);

    this.scene.translate(-0.4, 1.57, 0);
    this.vertical.display();

  }
}
