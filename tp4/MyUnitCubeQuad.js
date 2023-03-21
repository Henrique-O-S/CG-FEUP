import { CGFobject, CGFtexture, CGFappearance } from "../lib/CGF.js";



/**
 * MyUnitCubeQuad
 * @constructor
 */
export class MyUnitCubeQuad extends CGFobject {
  constructor(scene, myQuad, top, front, right, back, left, bottom) {
    super(scene);
    this.myQuad = myQuad;
    this.top = new CGFappearance(scene);
    this.top.setAmbient(0.1, 0.1, 0.1, 1);
    this.top.setDiffuse(0.9, 0.9, 0.9, 1);
    this.top.setSpecular(0.1, 0.1, 0.1, 1);
    this.top.setShininess(10.0);
    this.top.setTexture(top);
    this.top.setTextureWrap('REPEAT', 'REPEAT');

    this.front = new CGFappearance(scene);
    this.front.setTexture(front);

    this.right = new CGFappearance(scene);
    this.right.setTexture(right);

    this.back = new CGFappearance(scene);
    this.back.setTexture(back);

    this.left = new CGFappearance(scene);
    this.left.setTexture(left);

    this.bottom = new CGFappearance(scene);
    this.bottom.setTexture(bottom);
  }

  

  display() {

    this.scene.pushMatrix();

    //front and back
    this.front.apply();

    this.myQuad.display();

    this.scene.translate(0,0,-1);

    this.scene.rotate(Math.PI,0,1,0);

    this.back.apply();

    this.myQuad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    //top and bottom

    this.scene.translate(0,0.5,-0.5);

    this.scene.rotate(-Math.PI/2,1,0,0);

    this.top.apply();


    this.myQuad.display();

    this.scene.translate(0,0,-1);

    this.scene.rotate(Math.PI,1,0,0);

    this.top.apply();


    this.myQuad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    //sides

    this.scene.translate(0.5,0,-0.5);

    this.scene.rotate(Math.PI/2,0,1,0);
    this.right.apply();

    this.myQuad.display();

    this.scene.translate(0,0,-1);

    this.scene.rotate(Math.PI,0,1,0);
    this.left.apply();


    this.myQuad.display();

  }
}
