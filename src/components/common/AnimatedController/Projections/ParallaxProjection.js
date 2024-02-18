import { PerspectiveTracker } from "./PerspectiveTracker";

export class ParallaxProjection {
  /**
   * Some bary data
   * @type { PerspectiveTracker }
   */
  perspectiveTracker = null;
  renderPerspective = 0;
  parallaxAmount = 0;
  maxParallaxPerSecond = 30;
  framesPerSecond = 60;

  constructor(canvas, parallaxAmount, framesPerSecond) {
    this.perspectiveTracker = new PerspectiveTracker(canvas);
    this.parallaxAmount = parallaxAmount;
    this.framesPerSecond = framesPerSecond;
  }

  updatePerspective() {
    let diff_perspective =
      this.renderPerspective - this.perspectiveTracker.mousePerspective;
    diff_perspective =
      Math.sign(diff_perspective) *
      Math.min(
        Math.abs(diff_perspective),
        this.maxParallaxPerSecond / this.framesPerSecond
      );

    this.renderPerspective =
      this.renderPerspective -
      ((diff_perspective * diff_perspective * diff_perspective) /
        this.framesPerSecond) *
        10;
  }

  applyProjection(x, distance, canvasWidth) {
    let newX =
      x - this.parallaxAmount * distance * distance * this.renderPerspective;
    if (newX < 0) newX += canvasWidth;
    if (newX > canvasWidth) newX -= canvasWidth;
    return newX;
  }

  removeListeners() {
    this.perspectiveTracker.removeListeners();
  }
}
