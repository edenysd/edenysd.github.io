import { ParallaxProjection } from "./Projections/ParallaxProjection";

export class RenderIdArea {
  elementRef = null;
  drawParticle = () => {};
  updateParticle = () => {};

  constructor({ elementId, drawParticle, updateParticle }) {
    this.elementRef = document.getElementById(elementId);
    this.drawParticle = drawParticle;
    this.updateParticle = updateParticle;
    this.updateAreaBounds();
  }
  updateAreaBounds() {
    this.bounds = this.elementRef.getBoundingClientRect();
  }
  // canvas relative position
  isParticleContained(canvasBounds, px, py) {
    const elementBounds = this.bounds;

    const relative_px = canvasBounds.x + px;
    const relative_py = canvasBounds.y + py;

    return (
      elementBounds.top <= relative_py &&
      elementBounds.bottom >= relative_py &&
      elementBounds.left <= relative_px &&
      elementBounds.right >= relative_px
    );
  }
}

export class AnimationController {
  canvas = null;
  canvasCtx = null;
  canvasBounds = null;

  parallaxProjection = null;
  reziseObserver = null;
  interval = null;

  framesPerSecond = 60;

  // canvas layer variables
  canvasWidth = 0;
  canvasHeight = 0;
  canvasTotalArea = 0;

  clientHeight = 0;
  clientWidth = 0;
  clientTotalArea = 0;

  numberOfParticles = 0;
  velocity = 0;
  size = 0;

  areas = [];

  constructor({ canvasId = "canvas-area", areas }) {
    this.canvas = document.getElementById(canvasId);
    this.canvasCtx = this.canvas.getContext("2d");

    this.areas = areas;

    this.parallaxProjection = new ParallaxProjection(
      this.canvas,
      10,
      this.framesPerSecond
    );

    this.reziseObserver = new ResizeObserver(async () => {
      this.updateValues();
      this.init();
    }).observe(this.canvas);

    this.elementsRef = [];

    this.updateValues();

    this.init();

    this.interval = setInterval(
      () => window.requestAnimationFrame(() => this.rainParticle()),
      1000 / this.framesPerSecond
    );
  }

  removeListeners() {
    this.parallaxProjection.removeListeners();
    clearInterval(this.interval);
    this.reziseObserver?.disconnect();
  }

  updateBounds() {
    this._updateAreasBounds();
    this.canvasBounds = this.canvas.getBoundingClientRect();
  }

  updateValues() {
    const { width, height } = this.canvas.getBoundingClientRect();
    this.canvasWidth = this.canvas.width = width;
    this.canvasHeight = this.canvas.height = height;
    this.canvasTotalArea = this.canvasWidth * this.canvasHeight;
    this.clientHeight = document.documentElement.clientHeight;
    this.clientWidth = document.documentElement.clientWidth;
    this.clientTotalArea = this.clientHeight * this.clientWidth;
    this.numberOfParticles = this.clientTotalArea / 10800;
    this.velocity = this.clientHeight / 6;
    this.size = Math.sqrt(this.clientTotalArea / 30000);
    this.parallaxProjection.parallaxAmount = this.canvasWidth / 5;

    this.canvasBounds = this.canvas.getBoundingClientRect();
    this._updateAreasBounds();
  }

  _updateAreasBounds() {
    this.areas.forEach((area) => {
      area.updateAreaBounds();
    });
  }

  init() {
    this.elementsRef.current = [];
    for (let i = 0; i < this.numberOfParticles; i++) {
      const distance = Math.random();
      const toX = Math.random() - 0.5;
      const toY = ((Math.random() + 1) * 3) / 3;
      this.elementsRef.current[i] = {
        x: Math.ceil(Math.random() * this.canvasWidth),
        y: Math.ceil(Math.random() * this.canvasHeight),
        toX:
          (toX / Math.sqrt(toY * toY + toX * toX)) *
          distance *
          (this.velocity / this.framesPerSecond),
        toY:
          (toY / Math.sqrt(toY * toY + toX * toX)) *
          distance *
          (this.velocity / this.framesPerSecond),
        distance: distance,
      };
    }
  }

  drawParticle(cx, cy, distance) {
    this.areas.forEach((area) => {
      if (area.isParticleContained(this.canvasBounds, cx, cy)) {
        area.drawParticle(this.canvasCtx, cx, cy, distance);
      }
    });
  }

  updateParticle(particle) {
    this.areas.forEach((area) => {
      if (area.isParticleContained(this.canvasBounds, particle.x, particle.y)) {
        area.updateParticle(particle, this.velocity, this.framesPerSecond);
      }
    });

    if (particle.x > this.canvasWidth) particle.x = 0;
    if (particle.x < 0) particle.x = this.canvasWidth;
    if (particle.y > this.canvasHeight) particle.y = 0;
  }

  isParticleOutOfScreen(particle) {
    return (
      particle.y + this.canvasBounds.top < 0 ||
      particle.y + this.canvasBounds.top >
        document.documentElement.clientHeight ||
      this.canvasBounds.bottom < 0
    );
  }

  rainParticle() {
    this.canvasCtx.clearRect(
      0,
      Math.max(0, -this.canvasBounds.top),
      this.canvasWidth,
      Math.min(this.canvasHeight - this.canvasBounds.top, this.canvasHeight)
    );

    this.parallaxProjection.updatePerspective();

    this.updateBounds();

    for (let i = 0; i < this.numberOfParticles; i++) {
      const particle = this.elementsRef.current[i];
      if (!this.isParticleOutOfScreen(particle)) {
        this.canvasCtx.beginPath();
        this.drawParticle(
          this.parallaxProjection.applyProjection(
            particle.x,
            particle.distance,
            this.canvasWidth
          ),
          particle.y,
          particle.distance * this.size
        );
        this.canvasCtx.fill();
        this.canvasCtx.stroke();
      }
      this.updateParticle(particle);
    }
  }
}
