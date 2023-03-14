import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangleBig } from "./MyTriangleBig.js"
import { MyTriangleSmall } from "./MyTriangleSmall.js"
import { MyParallelogram } from "./MyParallelogram.js"



/**
 * MyTangram
 * @constructor
 */
export class MyTangram extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initMaterials(this.scene);
    this.diamond = new MyDiamond(scene);
    this.parallelogram = new MyParallelogram(scene);
    this.triangleSmall = new MyTriangleSmall(scene);
    this.triangleBig = new MyTriangleBig(scene);
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

  initMaterials(){
    this.pink = new CGFappearance(this.scene);
    this.pink.setAmbient(1, 0.6, 1, 1.0);
    this.pink.setDiffuse(0, 0, 0, 1.0);
    this.pink.setSpecular(1, 1, 1, 1.0);//Done
    this.pink.setShininess(10.0);

    this.purple = new CGFappearance(this.scene);
    this.purple.setAmbient(0.8, 0, 0.8, 1.0);
    this.purple.setDiffuse(0, 0, 0, 1.0);
    this.purple.setSpecular(1, 1, 1, 1.0);//Done
    this.purple.setShininess(10.0);

    this.red = new CGFappearance(this.scene);
    this.red.setAmbient(1, 0, 0, 1.0);
    this.red.setDiffuse(0, 0, 0, 1.0);//Done
    this.red.setSpecular(1, 1, 1, 1.0);
    this.red.setShininess(10.0);

    this.green = new CGFappearance(this.scene);
    this.green.setAmbient(0, 1, 0, 1.0);
    this.green.setDiffuse(0, 0, 0, 1.0);
    this.green.setSpecular(1, 1, 1, 1.0);//Done
    this.green.setShininess(10.0);

    this.blue = new CGFappearance(this.scene);
    this.blue.setAmbient(0, 0, 1, 1.0);
    this.blue.setDiffuse(0, 0, 0, 1.0);
    this.blue.setSpecular(1, 1, 1, 1.0);
    this.blue.setShininess(10.0);//Done

    this.orange = new CGFappearance(this.scene);
    this.orange.setAmbient(1, 0.5, 0, 1.0);
    this.orange.setDiffuse(0, 0, 0, 1.0); //Done
    this.orange.setSpecular(1, 1, 1, 1.0);
    this.orange.setShininess(10.0);

    this.yellow = new CGFappearance(this.scene);
    this.yellow.setAmbient(1, 1, 0, 1.0);
    this.yellow.setDiffuse(0, 0, 0, 1.0);
    this.yellow.setSpecular(1, 1, 1, 1.0);//Done
    this.yellow.setShininess(10.0);

    this.newMaterialGreen = new CGFappearance(this.scene);
    this.newMaterialGreen.setAmbient(0.1, 0.1, 0.1, 1);
    this.newMaterialGreen.setDiffuse(0.9, 0.9, 0.9, 1);
    this.newMaterialGreen.setSpecular(0.1, 0.1, 0.1, 1);
    this.newMaterialGreen.setShininess(10.0);
    this.newMaterialGreen.loadTexture('images/tangram.png');
    this.newMaterialGreen.setTextureWrap('REPEAT', 'REPEAT');

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

    this.newMaterialGreen.apply();
    this.diamond.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(5,0,0);


    this.purple.apply();
    this.triangleSmall.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(2,0,0);


    this.blue.apply();
    this.triangleBig.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    

    this.scene.translate(0,- 1 - Math.sqrt(8),0);
    
    this.red.apply();
    this.triangleSmall.display();


    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(Math.sqrt(2), - Math.sqrt(2), 0);

    this.scene.rotate(Math.PI / 4,0,0,1);

    this.orange.apply();
    this.triangleBig.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-((2-Math.sqrt(2))/2),-2,0);

    this.scene.rotate(Math.PI,1,0,0);

    this.scene.rotate(3 * Math.PI / 4,0,0,1);

    this.yellow.apply();
    this.parallelogram.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0,-1,0);

    this.scene.rotate(Math.PI / 2, 0, 0, 1);

    this.pink.apply();
    this.triangleSmall.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-1,-2,0);


    this.triangleSmall.display();

    this.scene.popMatrix();
  }
}
