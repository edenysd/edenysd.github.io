const HeroSection = () => {
  return (
    <div
      id="hero-section"
      className="w-full h-screen align-middle flex p-0 sm:p-16 flex-col lg:flex-row justify-center lg:justify-between bg-black"
    >
      <div className="w-full flex py-16 sm:p-16 flex-col lg:flex-row justify-center lg:justify-between overflow-hidden">
        <div
          className="flex pb-3 items-end sm:items-center"
          style={{
            transform: "translateZ(20px)",
          }}
        >
          <div className="w-full">
            <h1
              className="flex flex-col lg:text-left select-none"
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
                {"Hi! I'm"}
              </span>
              <span
                className="-rotate-12 sm:translate-x-9 glow-3"
                style={{ fontWeight: "600", color: "rgb(164 237 185)" }}
              >
                Edenis Denis
              </span>
            </h1>
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
  );
};

export default HeroSection;
