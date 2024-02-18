import { gsap } from "gsap/all";
import React from "react";

const ProgressBarComponent = ({ progress, textGenerator }) => {
  const barRef = React.useRef(null);
  const totalBarRef = React.useRef(null);
  const textRef = React.useRef(null);

  React.useEffect(() => {
    const animation = { trigger: null, isVisible: false };

    const showIfVisible = () => {
      animation.isVisible && animation.trigger.play();
    };

    const createAnimation = () => {
      if (animation.trigger) {
        animation.trigger.kill();
      }

      animation.trigger = gsap.to(barRef.current, {
        duration: 0.3,
        width:
          (totalBarRef.current.getBoundingClientRect().width * progress) / 100,
        ease: "slow.out",
        onComplete: () => {
          textRef.current.innerText = textGenerator(progress);
        },
        paused: true,
      });
    };
    createAnimation();

    const callbackFunc = (entries, observer) => {
      entries.forEach((entry) => {
        animation.isVisible = entry.isIntersecting;
        showIfVisible();
      });
    };

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };

    const observerViewPortPosition = new IntersectionObserver(
      callbackFunc,
      options
    );
    observerViewPortPosition.observe(barRef.current);

    let timer = null;
    const observerResize = new ResizeObserver(() => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        createAnimation();
        showIfVisible();
      }, 100);
    });
    observerResize.observe(totalBarRef.current);

    return () => {
      observerViewPortPosition.disconnect();
      observerResize.disconnect();
      clearTimeout(timer);
    };
  }, [progress, textGenerator]);

  return (
    <div
      ref={totalBarRef}
      className={
        "flex h-10 w-11/12 mx-auto  items-center overflow-hidden bg-slate-800"
      }
    >
      <div
        ref={barRef}
        className={"h-10 w-0 bg-white border-2 border-black absolute"}
      ></div>
      <p
        ref={textRef}
        className="relative m-auto w-full text-white"
        style={{
          mixBlendMode: "difference",
        }}
      />
    </div>
  );
};

export default ProgressBarComponent;
