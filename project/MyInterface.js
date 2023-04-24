import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        // and an event handler to be called when the selection changes
        //this.gui.add(this.scene, 'selectedObject', this.scene.objectIDs).name('Selected Object').onChange(this.scene.updateObjectComplexity.bind(this.scene));

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        this.gui.add(this.scene, 'displayBird').name('Display Bird');

        this.gui.add(this.scene, 'birdFlying').name('Bird Flying');

        this.gui.add(this.scene, 'displaySphere').name('Display Sphere');

        this.gui.add(this.scene, 'displayPanorama').name('Display Panorama');

        this.gui.add(this.scene, 'displayPlane').name('Display Plane');

        this.gui.add(this.scene, 'displayTerrain').name('Display Terrain');

        this.gui.add(this.scene, 'displayNest').name('Display Nest');

        this.gui.add(this.scene, 'displayEgg').name('Display Egg');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        //this.gui.add(this.scene, 'objectComplexity', 0.01, 1.0).onChange(this.scene.updateObjectComplexity.bind(this.scene));

        return true;
    }
}