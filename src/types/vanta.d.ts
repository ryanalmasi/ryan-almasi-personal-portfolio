// Type declarations for Vanta.js
declare module 'vanta/dist/vanta.birds.min' {
  interface VantaEffect {
    destroy(): void;
    resize(): void;
    setOptions(options: any): void;
  }
  
  interface VantaBirdsOptions {
    el: HTMLElement;
    THREE: any;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    backgroundColor?: number;
    color1?: number;
    color2?: number;
    colorMode?: string;
    quantity?: number;
    birdSize?: number;
    wingSpan?: number;
    speedLimit?: number;
    separation?: number;
    alignment?: number;
    cohesion?: number;
  }
  
  function BIRDS(options: VantaBirdsOptions): VantaEffect;
  export default BIRDS;
}
