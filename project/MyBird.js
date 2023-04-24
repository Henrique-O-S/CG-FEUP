import { CGFappearance, CGFobject, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyWing } from "./MyWing.js";
import { MyBody } from "./MyBody.js";
import { MyWings } from "./MyWings.js";
import { MyHead } from "./MyHead.js";



/**
 * MyBird
 * @constructor
 */
export class MyBird extends CGFobject {
  constructor(scene, position) {
    super(scene);
    this.position = position;
    this.speed = 0;
    this.angle = 0;
    this.maxWingAngle = 45;
    this.oscillation = [];
    this.oscillation.maxHeight = 0.1;//regarding constant up and down animation
    this.oscillation.duration = 1000; //ms

    /* this.diamond = new MyDiamond(scene);
    this.parallelogram = new MyParallelogram(scene);
    this.triangleSmallRed = new MyTriangleSmall(scene, "red");
    this.triangleSmallPurple = new MyTriangleSmall(scene, "purple");
    this.triangleSmallPink = new MyTriangleSmall(scene, "pink");
    this.triangleBigBlue = new MyTriangleBig(scene, "blue");
    this.triangleBigOrange = new MyTriangleBig(scene, "orange"); */
    this.wings = new MyWings(scene);
    this.head = new MyHead(scene);
    this.body = new MyBody(scene);

  

    this.initMaterials();
    this.initTextures();
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

    this.material1 = new CGFappearance(this.scene);
		this.material1.setShininess(1);
		this.material1.setEmission(1, 1, 1, 1);
		this.material1.setAmbient(1, 1, 1, 1);
		this.material1.setDiffuse(1, 1, 1, 1);
		this.material1.setSpecular(1, 1, 1, 1);

  }

  initTextures(){
    this.feathersTexture = new CGFtexture(this.scene, 'images/feathers2.jpg');
    this.material1.setTexture(this.feathersTexture);
  }
  

  display() {

    this.material1.apply();

    this.scene.pushMatrix();
    this.scene.translate(this.position.x,this.position.y,this.position.z);
    if(this.flying){
      this.scene.rotate(Math.PI / 8, 1, 0, 0);
      this.scene.pushMatrix();
      this.scene.translate(0, -0.1, 0.3);
    }
    else{
      this.scene.pushMatrix();
      this.scene.translate(0, -0.1, 0);

    }
  
    this.head.display();

    this.scene.popMatrix();

    this.scene.translate(0, -0.85, 0);
    
    this.body.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(0.2, 0, -0.5);
    this.wings.display();
    
    this.scene.popMatrix();
    this.scene.popMatrix();
    this.scene.pushMatrix();
  }

  updateHeight(elapsedTime){
    const oscillationAngle = elapsedTime / this.oscillation.duration * 2 * Math.PI;

    this.position.y = this.position.y + this.oscillation.maxHeight * Math.sin(oscillationAngle);
  }

  updateWings(elapsedTime){
    const wingAngle = elapsedTime / this.oscillation.duration * 2 * Math.PI;

    this.wings.setAngle(Math.sin(wingAngle) * this.maxWingAngle * (Math.PI / 180));

  }

  update(elapsedTime, flying){
    this.flying = flying;
    if(this.flying){
      this.updateHeight(elapsedTime);
      this.updateWings(elapsedTime);
    }
  }

}
