import { CGFappearance, CGFobject } from "../lib/CGF.js";



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
    this.initMaterials();
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

    this.triangleSmallMaterialPink.apply();

    this.triangleSmall.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(2,0,0);


    //this.triangleBigMaterialOrange.apply();


    this.triangleBig.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    
    //this.triangleSmallMaterialPink.apply();

    this.scene.translate(0,- 1 - Math.sqrt(8),0);

    this.triangleSmall.display();


    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(Math.sqrt(2), - Math.sqrt(2), 0);

    this.scene.rotate(Math.PI / 4,0,0,1);

    //this.triangleBigMaterialBlue.apply();

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

  initMaterials(){
    this.triangleSmallMaterialPink = new CGFappearance(this.scene);
    this.triangleSmallMaterialPink.setAmbient(0, 0, 0, 1.0);
    this.triangleSmallMaterialPink.setDiffuse(0, 0, 0, 1.0);
    this.triangleSmallMaterialPink.setSpecular(1, 0.75, 0.79, 0.7);//Done
    this.triangleSmallMaterialPink.setShininess(10.0);

    this.triangleSmallMaterialPurple = new CGFappearance(this.scene);
    this.triangleSmallMaterialPurple.setAmbient(0, 0, 0, 1.0);
    this.triangleSmallMaterialPurple.setDiffuse(0, 0, 0, 1.0);
    this.triangleSmallMaterialPurple.setSpecular(0.53, 0.12, 0.47, 1.0);//Done
    this.triangleSmallMaterialPurple.setShininess(10.0);

    this.triangleSmallMaterialRed = new CGFappearance(this.scene);
    this.triangleSmallMaterialRed.setAmbient(0, 0, 0, 1.0);
    this.triangleSmallMaterialRed.setDiffuse(0, 0, 0, 1.0);//Done
    this.triangleSmallMaterialRed.setSpecular(1, 0, 0, 1.0);
    this.triangleSmallMaterialRed.setShininess(10.0);

    this.diamondMaterialGreen = new CGFappearance(this.scene);
    this.diamondMaterialGreen.setAmbient(0, 0, 0, 1.0);
    this.diamondMaterialGreen.setDiffuse(0, 0, 0, 1.0);
    this.diamondMaterialGreen.setSpecular(0, 1, 0.2, 1.0);//Done
    this.diamondMaterialGreen.setShininess(10.0);

    this.triangleBigMaterialBlue = new CGFappearance(this.scene);
    this.triangleBigMaterialBlue.setAmbient(0, 0, 0, 1.0);
    this.triangleBigMaterialBlue.setDiffuse(0, 0, 0, 1.0);
    this.triangleBigMaterialBlue.setSpecular(0, 0.6, 0.88, 1.0);
    this.triangleBigMaterialBlue.setShininess(10.0);//Done

    this.triangleBigMaterialOrange = new CGFappearance(this.scene);
    this.triangleBigMaterialOrange.setAmbient(0, 0, 0, 1.0);
    this.triangleBigMaterialOrange.setDiffuse(0, 0, 0, 1.0); //Done
    this.triangleBigMaterialOrange.setSpecular(1, 0.647, 1, 0.7);
    this.triangleBigMaterialOrange.setShininess(10.0);

    this.parallelogramMaterialYellow = new CGFappearance(this.scene);
    this.parallelogramMaterialYellow.setAmbient(0, 0, 0, 1.0);
    this.parallelogramMaterialYellow.setDiffuse(0, 0, 0, 1.0);
    this.parallelogramMaterialYellow.setSpecular(0.98, 0.93, 0.36, 1.0);//Done
    this.parallelogramMaterialYellow.setShininess(10.0);





  }
}
