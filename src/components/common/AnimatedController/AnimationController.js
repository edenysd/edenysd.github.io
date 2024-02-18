import { ParallaxProjection } from "./Projections/ParallaxProjection";

const drawStarParticle = (
  ctx,
  cx,
  cy,
  spikes,
  outerRadius,
  innerRadius,
  fillStyle = "skyblue",
  strokeStyle = "blue"
) => {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = strokeStyle;
  ctx.stroke();
  ctx.fillStyle = fillStyle;
  ctx.fill();
};

export class AnimationController {
  canvas = null;
  canvasCtx = null;

  parallaxProjection = null;
  reziseObserver = null;
  interval = null;

  framesPerSecond = 60;
  // canvas layer variables
  canvasWidth = 0;
  canvasTop = 0;
  canvasBottom = 0;
  canvasHeight = 0;
  canvasTotalArea = 0;

  clientHeight = 0;
  clientWidth = 0;
  clientTotalArea = 0;

  numberOfParticles = 0;
  velocity = 0;
  size = 0;

  constructor({ canvasId = "canvas-area" }) {
    this.canvas = document.getElementById(canvasId);
    this.canvasCtx = this.canvas.getContext("2d");

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
      () => window.requestAnimationFrame(this.rainParticle.bind(this)),
      1000 / this.framesPerSecond
    );
  }

  removeListeners() {
    this.parallaxProjection.removeListeners();
    clearInterval(this.interval);
    this.reziseObserver?.disconnect();
  }

  updateScroll() {
    const { top, bottom } = this.canvas.getBoundingClientRect();
    this.canvasBottom = bottom;
    this.canvasTop = top;
  }

  updateValues() {
    this.updateScroll();
    const { width, height } = this.canvas.getBoundingClientRect();
    this.canvasWidth = this.canvas.width = width;
    this.canvasHeight = this.canvas.height = height;
    this.canvasTotalArea = this.canvasWidth * this.canvasHeight;
    this.clientHeight = document.documentElement.clientHeight;
    this.clientWidth = document.documentElement.clientWidth;
    this.clientTotalArea = this.clientHeight * this.clientWidth;
    this.numberOfParticles = this.clientTotalArea / 10800;
    this.velocity = this.clientHeight / 6;
    this.size = Math.sqrt(this.canvasTotalArea / 300000);
    this.parallaxProjection.parallaxAmount = this.canvasWidth / 5;
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
    if (cy < this.clientHeight) {
      this.canvasCtx.fillStyle = "white";
      this.canvasCtx.lineWidth = distance / 20;
      this.canvasCtx.arc(cx, cy, distance, 0, 2 * Math.PI);
    } else if (cy > this.canvasHeight - this.clientHeight) {
      drawStarParticle(
        this.canvasCtx,
        cx,
        cy,
        5,
        distance * 2,
        distance / 2,
        "white",
        "white"
      );
    } else {
      this.canvasCtx.strokeStyle = "black";
      this.canvasCtx.lineWidth = distance;
      this.canvasCtx.beginPath();
      this.canvasCtx.moveTo(cx, cy);
      this.canvasCtx.lineTo(cx, cy + distance * 5);
    }
  }

  updateParticle(particle) {
    if (particle.y < this.clientHeight) {
      particle.x =
        particle.x + particle.toX * (this.velocity / this.framesPerSecond);
      particle.y =
        particle.y + particle.toY * (this.velocity / this.framesPerSecond);
    } else if (particle.y > this.canvasHeight - this.clientHeight) {
      particle.x =
        particle.x + particle.toX * (this.velocity / this.framesPerSecond);
      particle.y =
        particle.y + particle.toY * (this.velocity / this.framesPerSecond);
    } else {
      particle.y =
        particle.y +
        Math.sqrt(particle.toX * particle.toX + particle.toY * particle.toY) *
          3 *
          (this.velocity / this.framesPerSecond);
    }
    if (particle.x > this.canvasWidth) particle.x = 0;
    if (particle.x < 0) particle.x = this.canvasWidth;
    if (particle.y > this.canvasHeight) particle.y = 0;
  }

  isParticleOutOfScreen(particle) {
    return (
      particle.y + this.canvasTop < 0 ||
      particle.y + this.canvasTop > document.documentElement.clientHeight ||
      this.canvasBottom < 0
    );
  }

  rainParticle() {
    this.canvasCtx.clearRect(
      0,
      Math.max(0, -this.canvasTop),
      this.canvasWidth,
      Math.min(this.canvasHeight - this.canvasTop, this.canvasHeight)
    );

    this.parallaxProjection.updatePerspective();

    this.updateScroll();

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
