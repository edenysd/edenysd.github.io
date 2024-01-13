export class PerspectiveTracker {
  /**
   * Some bary data
   * @type { HTMLElement }
   */
  elementToTrack = null;
  mousePerspective = 0;

  /**
   *
   * @param {HTMLElement} elementToTrack
   */
  constructor(elementToTrack) {
    this.elementToTrack = elementToTrack;
    this.handleMouseMoveEventListener = this.elementToTrack.addEventListener(
      "mousemove",
      this.handleMouseMoveEvent.bind(this)
    );
  }

  handleMouseMoveEvent(event) {
    const halfWindowW = this.elementToTrack.offsetWidth * 0.5;
    this.mousePerspective = (event.pageX - halfWindowW) / halfWindowW;
  }

  removeListeners() {
    this.elementToTrack?.removeEventListener(
      "mousemove",
      this.handleMouseMoveEvent
    );
  }
}
