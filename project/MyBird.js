import { CGFappearance, CGFobject, CGFtexture } from "../lib/CGF.js";
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
    this.initialPosition = [];
    this.initialPosition.x = position.x;
    this.initialPosition.y = position.y;
    this.initialPosition.z = position.z;
    this.speed = 0;
    this.angle = 0;
    this.maxWingAngle = 45;
    this.oscillation = [];
    this.oscillation.maxHeight = 0.3;//regarding constant up and down animation
    this.oscillation.duration = 1000; //ms
    this.gettingEgg = 0;
    this.egg = 0;

    this.eggColision = [];
      this.eggColision.x = 6;
      this.eggColision.y = 2;
      this.eggColision.z = 6;
    this.wings = new MyWings(scene);
    this.head = new MyHead(scene);
    this.body = new MyBody(scene);

  

    this.initMaterials();
    this.initTextures();
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
    this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
    this.scene.pushMatrix();
    this.scene.rotate(this.angle, 0, 1, 0);
  
    if(this.moving){
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
    this.scene.popMatrix();
  
    if(this.egg){
      this.egg.display();
    }
  }

  updateHeight(elapsedTime){
    if(this.gettingEgg != 0){
      if(this.position.y <= this.scene.eggHeight){
        this.gettingEgg = 1;
      }
      this.position.y = this.position.y + (this.initialPosition.y - this.scene.eggHeight) * this.gettingEgg / (1000/this.scene.millisUpdate);
      if(this.position.y >= this.initialPosition.y){
        this.gettingEgg = 0;
        this.position.y = this.initialPosition.y;
      }
    }
    else{
      const oscillationAngle = elapsedTime / this.oscillation.duration * 2 * Math.PI;
      this.position.y = this.initialPosition.y + this.oscillation.maxHeight * Math.sin(oscillationAngle);
    }
  }

  updateWings(elapsedTime){
    const wingAngle = elapsedTime / (this.oscillation.duration - this.speed*100 * this.scene.speedFactor)  * 2 * Math.PI;

    this.wings.setAngle(Math.sin(wingAngle) * this.maxWingAngle * (Math.PI / 180));

  }

  updatePosition(){
    this.position.x = this.position.x + Math.sin(this.angle) * (this.speed * this.scene.speedFactor);
    this.position.z = this.position.z + Math.cos(this.angle) * (this.speed * this.scene.speedFactor);
  }

  update(elapsedTime){
    this.moving = this.speed != 0;
    this.updateWings(elapsedTime);
    this.updatePosition();
    this.updateHeight(elapsedTime);
    if(this.gettingEgg != 0){
      this.checkNearEgg();
    }
    if(this.egg){
      this.egg.x = this.position.x;
      this.egg.y = this.position.y - 1.7;
      this.egg.z = this.position.z;
    }
  }

  atNormalHeight(){
    return (this.position.y < this.initialPosition.y + this.oscillation.maxHeight && this.position.y > this.initialPosition.y - this.oscillation.maxHeight);
  }

  turn(a){
    if(this.atNormalHeight())
      this.angle += a * this.scene.speedFactor;
  }
  
  accelerate(v){
    if(this.atNormalHeight())
      this.speed += v;
    if(this.speed < 0)
      this.speed = 0;
  }

  reset(){
    this.position.x = this.initialPosition.x;
    this.position.y = this.initialPosition.y;
    this.position.z = this.initialPosition.z;
    this.gettingEgg = 0;
    this.angle = 0;
    this.speed = 0;
    this.updateWings(0);
    this.egg = 0;
  }

  checkNearEgg(){
    if(this.egg == 0){
      for(let eggObject of this.scene.egg){
      if(this.checkEggCollision(eggObject)){
        this.egg = eggObject;
        this.scene.egg = this.scene.egg.filter(el => !(el.x == eggObject.x && el.y == eggObject.y && el.z == eggObject.z));
        break;
      }
    }
    }
    
  }

  checkEggCollision(egg){
    return Math.abs(this.position.y - egg.y) < this.eggColision.y && Math.abs(this.position.x - egg.x) < this.eggColision.x && Math.abs(this.position.z - egg.z) < this.eggColision.z;
  }

  dropEgg(){
    if(this.egg && this.atNormalHeight()){
      this.egg.vx = Math.sin(this.angle) * this.speed;
      this.egg.vy = 0;
      this.egg.vz = Math.cos(this.angle) * this.speed;
      this.egg.time = 0;
      this.scene.fallingEgg = this.egg;
      this.scene.egg.push(this.egg);
      this.egg = 0;
    }
  }


}
