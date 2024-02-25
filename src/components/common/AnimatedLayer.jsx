"use client";

import { useEffect } from "react";
import {
  AnimationController,
  RenderIdArea,
} from "./AnimatedController/AnimationController";

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

const AnimatedLayer = () => {
  useEffect(() => {
    const aboutSectionArea = new RenderIdArea({
      elementId: "about-section",
      drawParticle: (canvasCtx, cx, cy, distance) => {
        canvasCtx.fillStyle = "white";
        canvasCtx.lineWidth = distance / 20;
        canvasCtx.arc(cx, cy, distance, 0, 2 * Math.PI);
      },
      updateParticle: (particle, velocity, framesPerSecond) => {
        particle.x = particle.x + particle.toX * (velocity / framesPerSecond);
        particle.y = particle.y + particle.toY * (velocity / framesPerSecond);
      },
    });

    const projectSectionArea = new RenderIdArea({
      elementId: "projects-section",
      drawParticle: (canvasCtx, cx, cy, distance) => {
        canvasCtx.strokeStyle = "black";
        canvasCtx.lineWidth = distance;
        canvasCtx.beginPath();
        canvasCtx.moveTo(cx, cy);
        canvasCtx.lineTo(cx, cy + distance * 5);
      },
      updateParticle: (particle, velocity, framesPerSecond) => {
        particle.y =
          particle.y +
          Math.sqrt(particle.toX * particle.toX + particle.toY * particle.toY) *
            3 *
            (velocity / framesPerSecond);
      },
    });

    const contactmeSectionArea = new RenderIdArea({
      elementId: "contactme-section",
      drawParticle: (canvasCtx, cx, cy, distance) => {
        drawStarParticle(
          canvasCtx,
          cx,
          cy,
          5,
          distance * 2,
          distance / 2,
          "white",
          "white"
        );
      },
      updateParticle: (particle, velocity, framesPerSecond) => {
        particle.x = particle.x + particle.toX * (velocity / framesPerSecond);
        particle.y = particle.y + particle.toY * (velocity / framesPerSecond);
      },
    });

    const animationController = new AnimationController({
      canvasId: "canvas-area",
      areas: [aboutSectionArea, projectSectionArea, contactmeSectionArea],
    });
    return () => {
      animationController.removeListeners();
    };
  }, []);

  return (
    <canvas
      className={"w-full h-full absolute left-0 top-0"}
      id="canvas-area"
    />
  );
};

export default AnimatedLayer;
