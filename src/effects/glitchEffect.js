import * as THREE from 'three';
import { GlitchEffect, BlendFunction, GlitchMode } from 'postprocessing';

export class CinematicGlitch {
  constructor(composer) {
    this.glitchEffect = new GlitchEffect({
      chromaticAberrationOffset: 0.5,
      delay: new THREE.Vector2(1.5, 3.5),
      duration: new THREE.Vector2(0.6, 1.0),
      strength: new THREE.Vector2(0.3, 1.0),
      mode: GlitchMode.CONSTANT_WILD
    });
    
    composer.addPass(this.glitchEffect);
  }
  
  update(deltaTime) {
    // Update glitch parameters for dynamic effect
    this.glitchEffect.randomizationTime = Math.sin(deltaTime) * 0.5 + 0.5;
  }
}