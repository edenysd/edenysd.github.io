import React from "react";
import { gsap } from "gsap/all";
import Logo from "../../media/logo.svg?react";
import NavBarButtonSection from "./NavBarButtonSection";

const SECTIONS = [
  {
    sectionId: "about-section",
    sectionName: "ABOUT ME",
  },
  {
    sectionId: "projects-section",
    sectionName: "PROJECTS",
  },
  {
    sectionId: "contactme-section",
    sectionName: "CONTACT ME",
  },
];

const NavBarLayer = () => {
  const navRef = React.useRef(null);

  React.useEffect(() => {
    let timer = null;

    const hideNavigation = () => {
      if (window.scrollY !== 0)
        gsap.to(navRef.current, {
          transform: "translatey(-100%)",
        });
    };

    const showNavigation = () => {
      gsap.to(navRef.current, {
        transform: "translatey(0)",
      });
    };

    let lastYscroll = 0;
    let lastDiff = 0;
    const scrollHandler = (e) => {
      if (timer) {
        clearTimeout(timer);
      }

      let diff = window.scrollY - lastYscroll;
      if (diff > 0 && diff * lastDiff > 0) {
        hideNavigation();
      }
      if (diff < 0 && diff * lastDiff > 0) {
        showNavigation();
        timer = setTimeout(hideNavigation, 5000);
      }
      lastDiff = diff;
      lastYscroll = window.scrollY;
      if (window.scrollY === 0) {
        gsap.to(navRef.current, {
          background: "transparent",
        });
        navRef.current.classList.remove("backdrop-blur-sm");
        navRef.current.classList.remove("bg-transparentBlack");
        navRef.current.classList.add("backdrop-blur-none");
        navRef.current.classList.add("bg-transparent");
      } else {
        gsap.to(navRef.current, {
          background: "rgba(0,0,0,0.3)",
        });
        navRef.current.classList.remove("backdrop-blur-none");
        navRef.current.classList.remove("bg-transparent");
        navRef.current.classList.add("backdrop-blur-sm");
        navRef.current.classList.add("bg-transparentBlack");
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);
  return (
    <nav
      ref={navRef}
      className="flex flex-row items-center text-sm sm:text-base backdrop-blur-sm bg-transparentBlack w-full h-16 fixed z-10 pointer-events-none"
    >
      <div className={"flex flex-row h-full w-64 py-3 items-center"}>
        <a
          className="h-full w-auto m-auto pointer-events-auto glow-on-hover"
          href="#hero-section"
        >
          <Logo
            className="pointer-events-none"
            width={"4em"}
            height={"100%"}
            style={{
              margin: "auto",
            }}
          />
        </a>
        <a
          className="group nav-link p-3 hover:bg-lime-200 active:bg-gray-800 pointer-events-auto font-semibold px-3"
          target={"_blank"}
          rel={"noreferrer"}
          href="/Edenys's Resume.pdf"
        >
          <span className="w-fit text-lime-200 group-hover:text-black">
            GET CV
          </span>
        </a>
      </div>
      <div className="flex flex-row w-full h-full font-semibold px-3">
        <ul className="flex flex-row w-full h-full justify-end">
          {SECTIONS.map((section) => (
            <li
              className="flex w-fit items-center mx-0 sm:mx-1"
              key={section.sectionId}
            >
              <NavBarButtonSection
                sectionId={section.sectionId}
                sectionName={section.sectionName}
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBarLayer;
