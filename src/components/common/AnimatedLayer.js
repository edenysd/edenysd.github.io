import React from "react";
import { AnimationController } from "./AnimatedController/AnimationController";

const AnimatedLayer = () => {
  React.useEffect(() => {
    const animationController = new AnimationController({
      canvasId: "canvas-area",
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
