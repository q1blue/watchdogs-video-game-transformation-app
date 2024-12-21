import * as THREE from 'three';
import { PlayerMovement } from './PlayerMovement';
import { Transitions } from '../utils/transitions';

export class Player {
  constructor(scene) {
    this.mesh = this.createMesh();
    this.movement = new PlayerMovement(this.mesh);
    scene.add(this.mesh);
    Transitions.fadeIn(this.mesh);
  }

  createMesh() {
    const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x00ff00,
      transparent: true,
      opacity: 1
    });
    return new THREE.Mesh(geometry, material);
  }

  update(inputManager, deltaTime) {
    this.movement.update(inputManager, deltaTime);
  }

  hack() {
    Transitions.pulse(this.mesh);
  }
}