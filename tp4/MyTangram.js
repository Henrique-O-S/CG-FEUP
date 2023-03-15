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
    this.triangleSmallRed = new MyTriangleSmall(scene, "red");
    this.triangleSmallPurple = new MyTriangleSmall(scene, "purple");
    this.triangleSmallPink = new MyTriangleSmall(scene, "pink");
    this.triangleBigBlue = new MyTriangleBig(scene, "blue");
    this.triangleBigOrange = new MyTriangleBig(scene, "orange");

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
    this.pink.loadTexture('images/tangram.png');
    this.pink.setTextureWrap('REPEAT', 'REPEAT');

    this.purple = new CGFappearance(this.scene);
    this.purple.loadTexture('images/tangram.png');
    this.purple.setTextureWrap('REPEAT', 'REPEAT');

    this.red = new CGFappearance(this.scene);
    this.red.loadTexture('images/tangram.png');
    this.red.setTextureWrap('REPEAT', 'REPEAT');

    this.green = new CGFappearance(this.scene);
    this.green.setAmbient(0, 1, 0, 1.0);
    this.green.setDiffuse(0, 0, 0, 1.0);
    this.green.setSpecular(1, 1, 1, 1.0);//Done
    this.green.setShininess(10.0);

    this.blue = new CGFappearance(this.scene);
    this.blue.loadTexture('images/tangram.png');
    this.blue.setTextureWrap('REPEAT', 'REPEAT');

    this.orange = new CGFappearance(this.scene);
    this.orange.loadTexture('images/tangram.png');
    this.orange.setTextureWrap('REPEAT', 'REPEAT');

    this.yellow = new CGFappearance(this.scene);
    this.yellow.loadTexture('images/tangram.png');
    this.yellow.setTextureWrap('REPEAT', 'REPEAT');


    this.newMaterialGreen = new CGFappearance(this.scene);
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
    this.triangleSmallPurple.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(2,0,0);


    this.blue.apply();
    this.triangleBigBlue.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    

    this.scene.translate(0,- 1 - Math.sqrt(8),0);
    
    this.red.apply();
    this.triangleSmallRed.display();


    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(Math.sqrt(2), - Math.sqrt(2), 0);

    this.scene.rotate(Math.PI / 4,0,0,1);

    this.orange.apply();
    this.triangleBigOrange.display();

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
    this.triangleSmallPink.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-1,-2,0);


    this.triangleSmallPink.display();

    this.scene.popMatrix();
  }
}
