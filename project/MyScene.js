import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyBird } from "./MyBird.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.sphere = new MySphere(this, 50, 20, 200);
    this.bird = new MyBird(this, [1,1,1]);

    this.objects = [this.plane, this.sphere, this.panorama, this.bird];

    // Labels and ID's for object selection on MyInterface
    this.objectIDs = { 'Plane': 0 , 'Sphere': 1, 'Panorama': 2, 'Bird': 3};

    //Objects connected to MyInterface
    this.selectedObject = 0;
    this.displayAxis = false;
    this.displayPlane = false;
    this.displaySphere = false;
    this.displayPanorama = true;
    this.displayBird = false;
    this.displayNormals = false;
    this.objectComplexity = 0.5;
    this.scaleFactor = 1;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.texture2 = new CGFtexture(this, "images/test.jpg");
    this.panorama = new MyPanorama(this, this.texture2);
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    /* this.camera = new CGFcamera(
      1.23,
      0.1,
      1000,
      vec3.fromValues(0, 0, 0),
      vec3.fromValues(0, 0, 1)
    ); */

    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(10, 10, 10), vec3.fromValues(0, 0, 0));

  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  updateObjectComplexity(){
    this.objects[this.selectedObject].updateBuffers(this.objectComplexity);
  }

  

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();


    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    //this.appearance.apply();

    if (this.displayPlane){
      this.translate(0,-100,0);
      this.scale(400,400,400);
      this.rotate(-Math.PI/2.0,1,0,0);
      this.plane.display();
      this.popMatrix();
    }

    if(this.displaySphere){
      this.texture2.bind(this.sphere);
      this.sphere.display();
    }
    if(this.displayPanorama){
      this.panorama.updatePosition(this.camera.position);
      this.panorama.display();
    }

    if(this.displayBird){
      this.bird.display();
    }
    // ---- END Primitive drawing section
  }
}
