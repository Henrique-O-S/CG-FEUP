import { CGFappearance, CGFobject, CGFtexture } from "../lib/CGF.js";
import { MyBodyTriangle } from "./MyBodyTriangle.js";
import { MyBodyTriangleVertical } from "./MyBodyTriangleVertical.js";
import { MySphere } from "./MySphere.js";



/**
 * MyBody
 * @constructor
 */
export class MyBody extends CGFobject {
  constructor(scene) {
    super(scene);

    this.chest = new MySphere(scene, 50, 20, 0.5, "half");
    this.lateral = new MyBodyTriangle(scene);
    this.vertical = new MyBodyTriangleVertical(scene);

    this.initMaterials();
    this.initTextures();
  }

  enableNormalViz(){
    
  }

  disableNormalViz(){
    
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

    this.scene.pushMatrix();
    this.material1.apply();
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
