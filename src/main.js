import './style.css';
import { Renderer } from './engine/renderer';
import { GameScene } from './engine/scene';
import { Player } from './entities/Player';
import { CinematicGlitch } from './effects/glitchEffect';
import { InputManager } from './core/InputManager';

class Game {
  constructor() {
    this.renderer = new Renderer();
    this.gameScene = new GameScene();
    this.inputManager = new InputManager();
    this.player = new Player(this.gameScene.scene);
    this.glitchEffect = new CinematicGlitch(this.renderer.composer);
    
    this.lastTime = 0;
    this.deltaTime = 0;
    
    this.setupEventListeners();
    this.animate();
  }
  
  setupEventListeners() {
    document.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        this.player.hack();
      }
    });
  }
  
  animate(currentTime = 0) {
    this.deltaTime = (currentTime - this.lastTime) * 0.001;
    this.lastTime = currentTime;
    
    this.player.update(this.inputManager, this.deltaTime);
    this.gameScene.update(this.deltaTime);
    this.glitchEffect.update(this.deltaTime);
    
    this.renderer.render(this.gameScene.scene, this.gameScene.camera);
    
    requestAnimationFrame((time) => this.animate(time));
  }
}

new Game();