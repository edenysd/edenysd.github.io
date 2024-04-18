import gsap from "gsap/all";
import { random } from "gsap/gsap-core";
import { useEffect, useRef, useState } from "react";

const ProjectGithubCardPreview = ({ media }) => {
  const [currentIndex, setIndex] = useState(0);
  const imgRef = useRef(null);
  useEffect(() => {
    const timeline = gsap.timeline({
      repeat: "1000000",
      repeatDelay: random(10, 20),
      yoyo: true,
    });
    timeline.add(
      gsap.to(imgRef.current, {
        duration: 0.2,
        opacity: 0,
      })
    );
    timeline.add(() =>
      setIndex((oldIndex) => {
        return (oldIndex + 1) % media.length;
      })
    );
    timeline.add(
      gsap.to(imgRef.current, {
        duration: 0.2,
        opacity: "1",
      })
    );
    return () => {
      timeline.clear();
    };
  }, [media.length]);
  return (
    <img
      className={
        "h-full w-full aspect-square rounded-lg object-cover shadow-sm shadow-black"
      }
      ref={imgRef}
      src={media ? media[currentIndex].src : ""}
      alt={"examples"}
    />
  );
};

export default ProjectGithubCardPreview;
