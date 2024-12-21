import { gsap } from 'gsap';

export class Transitions {
  static fadeIn(object, duration = 1) {
    return gsap.from(object.material, {
      opacity: 0,
      duration,
      ease: "power2.inOut"
    });
  }

  static smoothMove(object, position, duration = 0.5) {
    return gsap.to(object.position, {
      x: position.x,
      y: position.y,
      z: position.z,
      duration,
      ease: "power2.out"
    });
  }

  static pulse(object, scale = 1.2, duration = 0.2) {
    return gsap.to(object.scale, {
      x: scale,
      y: scale,
      z: scale,
      duration,
      yoyo: true,
      repeat: 1,
      ease: "back.out"
    });
  }
}