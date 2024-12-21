import * as THREE from 'three';

export class GameScene {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    this.setupLights();
    this.setupEnvironment();
    
    this.camera.position.z = 5;
    
    // Smooth camera movement
    this.targetCameraPos = new THREE.Vector3(0, 2, 5);
    this.cameraLerpFactor = 0.05;
  }
  
  setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);
    
    // Add point lights for cyberpunk atmosphere
    const colors = [0x00ff00, 0x0000ff, 0xff00ff];
    colors.forEach((color, i) => {
      const light = new THREE.PointLight(color, 1, 10);
      light.position.set(
        Math.cos(i * Math.PI * 2 / 3) * 5,
        2,
        Math.sin(i * Math.PI * 2 / 3) * 5
      );
      this.scene.add(light);
    });
  }
  
  setupEnvironment() {
    // Enhanced grid with fade-out effect
    const gridHelper = new THREE.GridHelper(100, 100, 0x00ff00, 0x003300);
    const gridMaterial = gridHelper.material;
    gridMaterial.transparent = true;
    gridMaterial.opacity = 0.5;
    
    // Add vertical lines for more cyberpunk feel
    const verticalLines = new THREE.Group();
    for (let i = -5; i <= 5; i += 2) {
      const geometry = new THREE.BoxGeometry(0.05, 20, 0.05);
      const material = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.3
      });
      const line = new THREE.Mesh(geometry, material);
      line.position.set(i, 0, -5);
      verticalLines.add(line);
    }
    
    this.scene.add(gridHelper);
    this.scene.add(verticalLines);
    
    // Enhanced fog
    this.scene.fog = new THREE.FogExp2(0x000000, 0.035);
  }
  
  update(deltaTime) {
    // Smooth camera movement
    this.camera.position.lerp(this.targetCameraPos, this.cameraLerpFactor);
  }
}