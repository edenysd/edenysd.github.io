import React from "react";

import HeroPerspectiveWrapper from "./HeroPerspectiveWrapper";
import background from "../../media/sections/hero-section/background-hero.jpg";

const HERO_TEXT_SHADOW_X = 2,
  HERO_TEXT_SHADOW_Y = 2;

const HeroSection = () => {
  const backgroundRef = React.useRef(null);
  const presentationRef = React.useRef(null);

  const processMouseMoveEvent = React.useCallback((event, topOffset) => {
    const halfWindowH = window.innerHeight * 0.5,
      halfWindowW = window.innerWidth * 0.5;

    const xDeltaToCenter = event.pageX - halfWindowW,
      yDeltaToCenter = halfWindowH - event.pageY - topOffset;

    const {
      x: presentationX,
      width: presentationWidth,
      height: presentationHeight,
      y: presentationY,
    } = presentationRef.current.getBoundingClientRect();
    const xDeltaToPresentation =
        event.pageX - presentationX - presentationWidth / 2,
      yDeltaToPresentation =
        event.pageY - presentationY - presentationHeight / 2;

    backgroundRef.current &&
      (backgroundRef.current.style.filter = `hue-rotate(${
        (Math.atan2(yDeltaToCenter, xDeltaToCenter) / Math.PI) * 180
      }deg)`);
    presentationRef.current.style.filter = /*`hue-rotate(${Math.atan2(yDeltaToCenter, xDeltaToCenter) / Math.PI * 180}deg)`+*/ `drop-shadow(${
      HERO_TEXT_SHADOW_X * (xDeltaToPresentation / halfWindowW)
    }px ${
      HERO_TEXT_SHADOW_Y * (yDeltaToPresentation / halfWindowH)
    }px 2px #ffffff55)`;
  }, []);

  return (
    <HeroPerspectiveWrapper processMouseMoveEvent={processMouseMoveEvent}>
      <div
        className="absolute w-full dynamic-h-screen align-middle flex p-0 sm:p-16 flex-col lg:flex-row justify-center lg:justify-between"
        style={{ transform: "translateZ(50px)" }}
      >
        <div className="w-full flex py-16 sm:p-16 flex-col lg:flex-row justify-center lg:justify-between">
          <div
            className="flex pb-3 items-end sm:items-center"
            style={{
              transform: "translateZ(20px)",
            }}
          >
            <div className="w-full" ref={presentationRef}>
              <div
                className="flex flex-col lg:text-left"
                style={{
                  color: "rgb(247 247 247)",
                  fontFamily: "Literata",
                  fontSize: "60px",
                  fontWeight: "400",
                  whiteSpace: "pre",
                }}
              >
                <span
                  style={{
                    paintOrder: "fill",
                    fontWeight: "600",
                    strokeWidth: "0px",
                  }}
                >
                  Hi! I'm
                </span>
                <span style={{ fontWeight: "600", color: "rgb(164 237 185)" }}>
                  Edenis Denis
                </span>
              </div>
            </div>
          </div>
          <div
            className="flex items-top  sm:items-center"
            style={{
              transform: "translateZ(11px)",
            }}
          >
            {/* <Phrase className="w-full" /> */}
          </div>
        </div>
      </div>
      <img
        ref={backgroundRef}
        src={background}
        style={{
          position: "relative",
          height: "105vh",
          width: "110vw",
          maxHeight: "110vh",
          maxWidth: "110vw",
          left: "-5%",
          top: "-5%",
          objectFit: "cover",
          transform: "translateZ(10px)",
        }}
        alt={""}
      />
    </HeroPerspectiveWrapper>
  );
};

export default HeroSection;
