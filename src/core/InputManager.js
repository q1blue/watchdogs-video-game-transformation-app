export class InputManager {
  constructor() {
    this.keys = new Set();
    this.setupListeners();
  }

  setupListeners() {
    document.addEventListener('keydown', (e) => this.keys.add(e.key));
    document.addEventListener('keyup', (e) => this.keys.delete(e.key));
  }

  isPressed(key) {
    return this.keys.has(key);
  }
}