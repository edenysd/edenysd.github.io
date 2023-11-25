import React from "react";

const AnimatedLayer = () => {
  const canvasRef = React.useRef();
  const elementsRef = React.useRef([]);
  const mousePerspective = React.useRef(0);

  const handleMouseMoveEvent = React.useCallback((event) => {
    const halfWindowW = canvasRef.current.offsetWidth * 0.5;
    mousePerspective.current = (event.pageX - halfWindowW) / halfWindowW;
  }, []);

  React.useEffect(() => {
    const canvasArea = document.getElementById("canvas-area");
    const listenner = canvasArea.addEventListener(
      "mousemove",
      handleMouseMoveEvent
    );
    return () => {
      canvasArea.removeEventListener("mousemove", listenner);
    };
  }, [handleMouseMoveEvent]);
  React.useEffect(() => {
    const FRAMES_PER_SECOND = 60;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let interval = null;
    // canvas layer variables
    let canvasWidth,
      canvasHeight,
      canvasMaxDimension,
      clientHeight,
      numberOfParticles,
      velocity,
      size;

    // required parallax variables
    let current_render_perspective = 0,
      parallax;
    const updatePerspective = () => {
      const diff_perspective =
        current_render_perspective - mousePerspective.current;
      current_render_perspective =
        current_render_perspective -
        ((diff_perspective * diff_perspective * diff_perspective) /
          FRAMES_PER_SECOND) *
          10;
    };

    const updateValues = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvasWidth = canvas.width = width;
      canvasHeight = canvas.height = height;
      canvasMaxDimension = Math.max(canvasWidth, canvasHeight);
      clientHeight = document.documentElement.clientHeight;
      numberOfParticles = canvasMaxDimension / 5;
      velocity = canvasMaxDimension / 30;
      size = canvasMaxDimension / 500;
      parallax = canvasMaxDimension / 5;
    };
    updateValues();

    const observer = new ResizeObserver(async () => {
      updateValues();
      init();
    }).observe(canvas);

    const init = () => {
      elementsRef.current = [];
      for (let i = 0; i < numberOfParticles; i++) {
        const distance = Math.random();
        const toX = Math.random() - 0.5;
        const toY = ((Math.random() + 1) * 3) / 3;
        elementsRef.current[i] = {
          x: Math.ceil(Math.random() * canvasWidth),
          y: Math.ceil(Math.random() * canvasHeight),
          toX:
            (toX / Math.sqrt(toY * toY + toX * toX)) *
            distance *
            (velocity / FRAMES_PER_SECOND),
          toY:
            (toY / Math.sqrt(toY * toY + toX * toX)) *
            distance *
            (velocity / FRAMES_PER_SECOND),
          distance: distance,
        };
      }
    };

    const drawStarParticle = (
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

    const drawParticle = (cx, cy, long) => {
      if (cy < clientHeight) {
        ctx.fillStyle = "white";
        ctx.lineWidth = long / 20;
        ctx.arc(cx, cy, long, 0, 2 * Math.PI);
      } else if (cy > canvasHeight - clientHeight) {
        drawStarParticle(cx, cy, 5, long * 2, long / 2, "white", "white");
      } else {
        ctx.strokeStyle = "black";
        ctx.lineWidth = long;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx, cy + long * 5);
      }
    };

    const updateParticle = (particle) => {
      if (particle.y < clientHeight) {
        particle.x = particle.x + particle.toX * (velocity / FRAMES_PER_SECOND);
        particle.y = particle.y + particle.toY * (velocity / FRAMES_PER_SECOND);
      } else if (particle.y > canvasHeight - clientHeight) {
        particle.x = particle.x + particle.toX * (velocity / FRAMES_PER_SECOND);
        particle.y = particle.y + particle.toY * (velocity / FRAMES_PER_SECOND);
      } else {
        particle.y =
          particle.y +
          Math.sqrt(particle.toX * particle.toX + particle.toY * particle.toY) *
            5 *
            (velocity / FRAMES_PER_SECOND);
      }
      if (particle.x > canvasWidth) particle.x = 0;
      if (particle.x < 0) particle.x = canvasWidth;
      if (particle.y > canvasHeight) particle.y = 0;
    };

    const applyProjection = (x, distance) => {
      let newX = x - parallax * distance * current_render_perspective;
      if (newX < 0) newX += canvasWidth;
      if (newX > canvasWidth) newX -= canvasWidth;
      return newX;
    };

    const rainParticle = () => {
      ctx.clearRect(0, 0, canvasMaxDimension, canvasHeight);
      updatePerspective();
      for (let i = 0; i < numberOfParticles; i++) {
        const particle = elementsRef.current[i];
        ctx.beginPath();
        drawParticle(
          applyProjection(particle.x, particle.distance),
          particle.y,
          particle.distance * size
        );
        ctx.fill();
        ctx.stroke();
        updateParticle(particle);
      }
    };

    init();

    interval = setInterval(
      () => window.requestAnimationFrame(rainParticle),
      1000 / FRAMES_PER_SECOND
    );

    return () => {
      elementsRef.current = null;
      clearInterval(interval);
      observer?.disconnect();
    };
  }, []);

  return (
    <canvas className={"w-full h-full absolute left-0 top-0"} ref={canvasRef} />
  );
};

export default AnimatedLayer;
