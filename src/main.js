import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.112.1/build/three.module.js';
import {GUI} from 'https://cdn.jsdelivr.net/npm/three@0.112.1/examples/jsm/libs/dat.gui.module.js';
import {controls} from './controls.js';
import {game} from './game.js';
import {terrain} from './terrain.js';

let _APP = null;


class ProceduralTerrain_Demo extends game.Game {
  constructor() {
    super();
  }

  _OnInitialize() {
    this._CreateGUI();

    this.graphics_.Camera.position.set(355898.9978932907, -16169.249553939484, -181920.2108868533);
    this.graphics_.Camera.quaternion.set(0.3525209450519473, 0.6189868049149101, -0.58773147927222, 0.38360921119467495);

    this._AddEntity('_terrain', new terrain.TerrainChunkManager({
        camera: this.graphics_.Camera,
        scene: this.graphics_.Scene,
        scattering: this.graphics_._depthPass,
        gui: this._gui,
        guiParams: this._guiParams,
        game: this}), 1.0);

    this._AddEntity('_controls', new controls.FPSControls({
        camera: this.graphics_.Camera,
        scene: this.graphics_.Scene,
        domElement: this.graphics_._threejs.domElement,
        gui: this._gui,
        guiParams: this._guiParams}), 0.0);

    // this._AddEntity('_controls', new controls.ShipControls({
    //     camera: this.graphics_.Camera,
    //     scene: this.graphics_.Scene,
    //     domElement: this.graphics_._threejs.domElement,
    //     gui: this._gui,
    //     guiParams: this._guiParams,
    // }), 0.0);
  
    this._totalTime = 0;

    this._LoadBackground();
  }

  _CreateGUI() {
    this._guiParams = {
      general: {
      },
    };
    this._gui = new GUI();

    const generalRollup = this._gui.addFolder('General');
    this._gui.close();
  }

  _LoadBackground() {
    this.graphics_.Scene.background = new THREE.Color(0x000000);
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        './resources/space-posx.jpg',
        './resources/space-negx.jpg',
        './resources/space-posy.jpg',
        './resources/space-negy.jpg',
        './resources/space-posz.jpg',
        './resources/space-negz.jpg',
    ]);
    texture.encoding = THREE.sRGBEncoding;
    this.graphics_._scene.background = texture;
  }

  _OnStep(timeInSeconds) {
  }
}


function _Main() {
  _APP = new ProceduralTerrain_Demo();
}

_Main();
