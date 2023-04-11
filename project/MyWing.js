import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js"



/**
 * MyBird
 * @constructor
 */
export class MyWing extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initMaterials(scene);
    this.triangleSmall = new MyTriangleSmall(scene);

  }

  enableNormalViz(){
    
  }

  disableNormalViz(){
    
  }

  initMaterials(){
   

  }
  

  display() {
    this.triangleSmall.display();
  }
}
