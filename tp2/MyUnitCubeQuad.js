import { CGFobject } from "../lib/CGF.js";



/**
 * MyUnitCubeQuad
 * @constructor
 */
export class MyUnitCubeQuad extends CGFobject {
  constructor(scene, myQuad) {
    super(scene);
    this.myQuad = myQuad;
  }

  

  display() {

    this.scene.pushMatrix();

    //front and back

    this.myQuad.display();

    this.scene.translate(0,0,-1);

    this.scene.rotate(Math.PI,0,1,0);

    this.myQuad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    //top and bottom

    this.scene.translate(0,0.5,-0.5);

    this.scene.rotate(-Math.PI/2,1,0,0);

    this.myQuad.display();

    this.scene.translate(0,0,-1);

    this.scene.rotate(Math.PI,1,0,0);

    this.myQuad.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    //sides

    this.scene.translate(0.5,0,-0.5);

    this.scene.rotate(Math.PI/2,0,1,0);

    this.myQuad.display();

    this.scene.translate(0,0,-1);

    this.scene.rotate(Math.PI,0,1,0);

    this.myQuad.display();

  }
}
