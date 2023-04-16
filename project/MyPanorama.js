import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MySphere } from './MySphere.js';


export class MyPanorama extends CGFobject {

    constructor(scene, texture) {
      super(scene);
      this.texture = texture;
      this.scene = scene;
      this.sphere = new MySphere(scene, 50, 20, 200, "inverted", [0,0,0]);
      this.initMaterials();
    }
    
    initMaterials(){
      this.material = new CGFappearance(this.scene);
      this.material.setEmission(0.3, 0.3, 0.3, 0.7);
      this.material.setTexture(this.texture);
      this.material.setTextureWrap('REPEAT', 'REPEAT');
    }
    
  
    display() {
  
      this.material.apply();
      this.sphere.display();
    }

    updatePosition(position){
      this.sphere.changeOffSet(position);
    }

};

