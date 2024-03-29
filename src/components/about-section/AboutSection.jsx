import AboutCard from "./AboutCard";

const AboutSection = () => {
  return (
    <div
      className="flex items-center flex-col w-full dynamic-h-screen bg-black overflow-y-auto CustomScrollBar"
      id={"about-section"}
    >
      <p className="pt-10 sm:pt-28 text-6xl font-serif text-white">About Me!</p>
      <AboutCard />
    </div>
  );
};

export default AboutSection;
