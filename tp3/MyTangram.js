import { CGFobject } from "../lib/CGF.js";



/**
 * MyTangram
 * @constructor
 */
export class MyTangram extends CGFobject {
  constructor(scene, diamond, parallelogram, triangleSmall, triangleBig) {
    super(scene);
    this.parallelogram = parallelogram;
    this.diamond = diamond;
    this.triangleSmall = triangleSmall;
    this.triangleBig = triangleBig;
  }

  enableNormalViz(){
    this.parallelogram.enableNormalViz();
    this.diamond.enableNormalViz();
    this.triangleSmall.enableNormalViz();
    this.triangleBig.enableNormalViz();
  }

  disableNormalViz(){
    this.parallelogram.disableNormalViz();
    this.diamond.disableNormalViz();
    this.triangleSmall.disableNormalViz();
    this.triangleBig.disableNormalViz();
  }
  

  display() {

    this.scene.pushMatrix();

    var m = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0, 
      4, 1, 0, 1
    ]

    this.scene.multMatrix(m);

    this.diamond.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(5,0,0);

    this.triangleSmall.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(2,0,0);

    this.triangleBig.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    
    
    this.scene.translate(0,- 1 - Math.sqrt(8),0);

    this.triangleSmall.display();


    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(Math.sqrt(2), - Math.sqrt(2), 0);

    this.scene.rotate(Math.PI / 4,0,0,1);


    this.triangleBig.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-((2-Math.sqrt(2))/2),-2,0);

    this.scene.rotate(Math.PI,1,0,0);

    this.scene.rotate(3 * Math.PI / 4,0,0,1);


    this.parallelogram.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0,-1,0);

    this.scene.rotate(Math.PI / 2, 0, 0, 1);


    this.triangleSmall.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-1,-2,0);



    this.triangleSmall.display();

  }
}
