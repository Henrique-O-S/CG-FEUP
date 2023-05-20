import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyBird } from "./MyBird.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyNest } from "./MyNest.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";

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
    this.millisUpdate = 30;
    this.setUpdatePeriod(this.millisUpdate);
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
    this.sphere = new MySphere(this, 50, 20, 200, false, [0,0,0]);
    this.birdPosition = [];
    this.birdPosition.x = 1;
    this.birdPosition.y = -40;
    this.birdPosition.z = 10;
    this.bird = new MyBird(this, this.birdPosition);
    this.terrain = new MyTerrain(this, 30, 100, "images/terrain.jpg", "images/planeheightmap.jpg", "images/altimetry.png");
    this.nestPosition = [];
    this.nestPosition.x = 20;
    this.nestPosition.y = -62;
    this.nestPosition.z = 47;
    this.nest = new MyNest(this, this.nestPosition);
    this.egg = [];
    this.egg[0] = new MyBirdEgg(this, 25, -62.2, 80);
    this.egg[1] = new MyBirdEgg(this, 30, -62.5, 60);
    this.egg[2] = new MyBirdEgg(this, 10, -62.3, 35);
    this.egg[3] = new MyBirdEgg(this, 0, -62.6, 50);
    this.treeRow = new MyTreeRowPatch(this, 35, -59, 80);
    this.treeGroup = new MyTreeGroupPatch(this, -5, -59, 60);
    this.eggHeight = -61;


    this.objects = [this.plane, this.sphere, this.panorama, this.bird, this.terrain, this.nest, this.egg, this.treeRow, this.treeGroup];

    // Labels and ID's for object selection on MyInterface
    this.objectIDs = { 'Plane': 0 , 'Sphere': 1, 'Panorama': 2, 'Bird': 3, 'Terrain': 4, 'Nest': 5, 'Egg': 6, 'TreeRow': 7, 'TreeGroup': 8};

    //Objects connected to MyInterface
    this.selectedObject = 0;
    this.displayAxis = false;
    this.displayPlane = true;
    this.displaySphere = false;
    this.displayPanorama = true;
    this.displayBird = true;
    this.displayTerrain = true;
    this.displayNest = true;
    this.displayEgg = true;
    this.displayTreeRow = true;
    this.displayTreeGroup = true;
    this.displayNormals = false;
    this.objectComplexity = 0.5;
    this.scaleFactor = 1;
    this.speedFactor = 1;

    this.fallingEgg = 0;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.texture2 = new CGFtexture(this, "images/sky.jpg");
    this.panorama = new MyPanorama(this, this.texture2);
    this.appearance = new CGFappearance(this);
    //this.appearance.setTexture(this.texture);
    //this.appearance.setTextureWrap('REPEAT', 'REPEAT');

  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.23,
      0.1,
      20000,
      vec3.fromValues(-5, -38, 50),
      vec3.fromValues(0, -40, 40)
    );

    //this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(10, 10, 10), vec3.fromValues(0, 0, 0));

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
      this.appearance.setTexture(this.texture);
      this.appearance.setTextureWrap('REPEAT', 'REPEAT');
      this.translate(0,-100,0);
      this.scale(400,400,400);
      this.rotate(-Math.PI/2.0,1,0,0);
      this.plane.display();
    }
    this.popMatrix();

    this.pushMatrix();
    if(this.displaySphere){
      this.texture2.bind(this.sphere);
      this.sphere.display();
    }
    this.popMatrix();

    this.pushMatrix();
    if(this.displayPanorama){
      this.panorama.updatePosition(this.camera.position);
      this.panorama.display();
      this.popMatrix();
    }

    this.pushMatrix();
    if(this.displayBird){
      this.bird.display();
    }
    this.popMatrix();

    this.pushMatrix();
    if(this.displayTerrain){
      this.translate(0,-100,0);
      this.scale(400,400,400);
      this.rotate(-Math.PI/2.0,1,0,0);
      this.terrain.display();
    }
    this.popMatrix();

    this.pushMatrix();
    if(this.displayNest){
      this.nest.display();
    }
    this.popMatrix();

    this.pushMatrix();
    if(this.displayEgg){
      for(const eggObject of this.egg){
        eggObject.display();
      }
    }
    this.popMatrix();

    this.pushMatrix();
    if(this.displayTreeRow){
      this.treeRow.display();
    }
    this.popMatrix();

    this.pushMatrix();
    if(this.displayTreeGroup){
      this.treeGroup.display();
    }
    this.popMatrix();
    // ---- END Primitive drawing section
  }

  update(time) {
    if(!this.lastTime){
      this.lastTime = time;
    }
    const elapsedTime = time - this.lastTime;
    this.checkKeys();
    this.bird.update(elapsedTime);
    if(this.fallingEgg != 0){
      this.fallingEgg.updatePos(time);
    }
  }

  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;
    var v = 0;
    var a = 0;
    var reset = false;
    var getEgg = false;
    var dropEgg = false;
    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
        text += " W ";
        keysPressed = true;
        v += 0.01;
    }
    if (this.gui.isKeyPressed("KeyS")) {
        text += " S ";
        keysPressed = true;
        v -= 0.01;
    }
    if (this.gui.isKeyPressed("KeyA")) {
      text += " A ";
      keysPressed = true;
      a += 2 * (Math.PI / 180);
  }
  if (this.gui.isKeyPressed("KeyD")) {
    text += " D ";
    keysPressed = true;
    a -= 2 * (Math.PI / 180);
  }
  if (this.gui.isKeyPressed("KeyR")) {
    text += " R ";
    reset = true;
  }
  if (this.gui.isKeyPressed("KeyP")) {
    text += " P ";
    getEgg = true;
}
if (this.gui.isKeyPressed("KeyO")) {
  text += " O ";
  dropEgg = true;
}

  if(reset){
    this.bird.reset();
  }
  else if(getEgg){
    if(this.bird.gettingEgg == 0 && this.bird.egg == 0)
      this.bird.gettingEgg = -1;
  }
  else{
    if(keysPressed){
    this.bird.accelerate(v);
    this.bird.turn(a);
    }
    if(dropEgg){
      this.bird.dropEgg()

    }
  } 
    
  }
}
