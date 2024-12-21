import * as THREE from 'three';
import { gsap } from 'gsap';
import { Transitions } from '../utils/transitions';

export class Player {
  constructor(scene) {
    // Enhanced player geometry with smoother look
    const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x00ff00,
      transparent: true,
      opacity: 1
    });
    
    this.mesh = new THREE.Mesh(geometry, material);
    this.speed = 0.15;
    this.velocity = new THREE.Vector3();
    this.targetPosition = new THREE.Vector3();
    
    scene.add(this.mesh);
    
    this.setupAnimations();
    this.setupControls();
    
    // Initial fade-in
    Transitions.fadeIn(this.mesh);
  }
  
  setupAnimations() {
    this.animations = {
      hack: () => {
        gsap.to(this.mesh.scale, {
          x: 1.2,
          y: 1.2,
          z: 1.2,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "back.out"
        });
      }
    };
  }
  
  setupControls() {
    this.keys = new Set();
    
    document.addEventListener('keydown', (e) => this.keys.add(e.key));
    document.addEventListener('keyup', (e) => this.keys.delete(e.key));
    
    document.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        this.animations.hack();
      }
    });
  }
  
  update(deltaTime) {
    // Smooth rotation
    this.mesh.rotation.y += 0.01 * deltaTime * 60;
    
    // Calculate movement based on held keys
    this.velocity.set(0, 0, 0);
    
    if (this.keys.has('w')) this.velocity.z = -this.speed;
    if (this.keys.has('s')) this.velocity.z = this.speed;
    if (this.keys.has('a')) this.velocity.x = -this.speed;
    if (this.keys.has('d')) this.velocity.x = this.speed;
    
    // Apply smooth movement
    this.targetPosition.copy(this.mesh.position).add(this.velocity);
    Transitions.smoothMove(this.mesh, this.targetPosition, 0.1);
  }
}