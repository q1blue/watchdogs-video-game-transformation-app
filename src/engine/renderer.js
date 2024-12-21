import * as THREE from 'three';
import { EffectComposer } from 'postprocessing';

export class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    this.composer = new EffectComposer(this.renderer);
    
    document.body.appendChild(this.renderer.domElement);
    
    window.addEventListener('resize', () => this.onResize());
  }
  
  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.composer.setSize(window.innerWidth, window.innerHeight);
  }
  
  render(scene, camera) {
    this.composer.render(scene, camera);
  }
}