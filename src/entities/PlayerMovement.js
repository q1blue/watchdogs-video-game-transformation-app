import * as THREE from 'three';
import { Transitions } from '../utils/transitions';

export class PlayerMovement {
  constructor(mesh, speed = 0.15) {
    this.mesh = mesh;
    this.speed = speed;
    this.velocity = new THREE.Vector3();
    this.targetPosition = new THREE.Vector3();
  }

  update(inputManager, deltaTime) {
    this.updateRotation(deltaTime);
    this.updatePosition(inputManager);
  }

  updateRotation(deltaTime) {
    this.mesh.rotation.y += 0.01 * deltaTime * 60;
  }

  updatePosition(inputManager) {
    this.velocity.set(0, 0, 0);
    
    if (inputManager.isPressed('w')) this.velocity.z = -this.speed;
    if (inputManager.isPressed('s')) this.velocity.z = this.speed;
    if (inputManager.isPressed('a')) this.velocity.x = -this.speed;
    if (inputManager.isPressed('d')) this.velocity.x = this.speed;
    
    this.targetPosition.copy(this.mesh.position).add(this.velocity);
    Transitions.smoothMove(this.mesh, this.targetPosition, 0.1);
  }
}