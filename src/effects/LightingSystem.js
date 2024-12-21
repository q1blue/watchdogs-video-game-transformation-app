import * as THREE from 'three';

export class LightingSystem {
  constructor(scene) {
    this.scene = scene;
    this.lights = new Map();
    this.setupLights();
  }

  setupLights() {
    this.addAmbientLight();
    this.addDirectionalLight();
    this.addCyberpunkLights();
  }

  addAmbientLight() {
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    this.lights.set('ambient', light);
    this.scene.add(light);
  }

  addDirectionalLight() {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    this.lights.set('directional', light);
    this.scene.add(light);
  }

  addCyberpunkLights() {
    const colors = [0x00ff00, 0x0000ff, 0xff00ff];
    colors.forEach((color, i) => {
      const light = new THREE.PointLight(color, 1, 10);
      light.position.set(
        Math.cos(i * Math.PI * 2 / 3) * 5,
        2,
        Math.sin(i * Math.PI * 2 / 3) * 5
      );
      this.lights.set(`point${i}`, light);
      this.scene.add(light);
    });
  }
}