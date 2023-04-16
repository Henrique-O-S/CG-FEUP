import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyWing } from "./MyWing.js";
import { MyBody } from "./MyBody.js";



/**
 * MyBird
 * @constructor
 */
export class MyBird extends CGFobject {
  constructor(scene, position) {
    super(scene);
    this.position = position;
    this.initMaterials(scene);
    /* this.diamond = new MyDiamond(scene);
    this.parallelogram = new MyParallelogram(scene);
    this.triangleSmallRed = new MyTriangleSmall(scene, "red");
    this.triangleSmallPurple = new MyTriangleSmall(scene, "purple");
    this.triangleSmallPink = new MyTriangleSmall(scene, "pink");
    this.triangleBigBlue = new MyTriangleBig(scene, "blue");
    this.triangleBigOrange = new MyTriangleBig(scene, "orange"); */
    this.rightWing = new MyWing(scene, "right");
    this.leftWing = new MyWing(scene, "left");
    this.head = new MySphere(scene, 50, 20, 0.5);
    this.body = new MyBody(scene);
  }

  enableNormalViz(){
    /* this.parallelogram.enableNormalViz();
    this.diamond.enableNormalViz();
    this.triangleSmall.enableNormalViz();
    this.triangleBig.enableNormalViz(); */
  }

  disableNormalViz(){
   /*  this.parallelogram.disableNormalViz();
    this.diamond.disableNormalViz();
    this.triangleSmall.disableNormalViz();
    this.triangleBig.disableNormalViz(); */
  }

  initMaterials(){
   /*  this.pink = new CGFappearance(this.scene);
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
    this.newMaterialGreen.setTextureWrap('REPEAT', 'REPEAT'); */

  }
  

  display() {
    this.scene.pushMatrix();
    this.scene.translate(this.position[0],this.position[1],this.position[2]);
    this.head.display();
    this.scene.translate(0, -1, 0);
    this.body.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(this.position[0] * 3,this.position[1] * 3,this.position[2] * 3);
    this.rightWing.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();


    this.scene.rotate(Math.PI, 0, 0, 1);
    this.leftWing.display();


  }
}
