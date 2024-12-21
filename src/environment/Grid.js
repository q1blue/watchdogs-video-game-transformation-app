import * as THREE from 'three';

export class Grid {
  constructor(scene) {
    this.scene = scene;
    this.setupGrid();
    this.setupVerticalLines();
  }

  setupGrid() {
    const gridHelper = new THREE.GridHelper(100, 100, 0x00ff00, 0x003300);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.5;
    this.scene.add(gridHelper);
  }

  setupVerticalLines() {
    const verticalLines = new THREE.Group();
    for (let i = -5; i <= 5; i += 2) {
      const line = this.createVerticalLine(i);
      verticalLines.add(line);
    }
    this.scene.add(verticalLines);
  }

  createVerticalLine(position) {
    const geometry = new THREE.BoxGeometry(0.05, 20, 0.05);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.3
    });
    const line = new THREE.Mesh(geometry, material);
    line.position.set(position, 0, -5);
    return line;
  }
}