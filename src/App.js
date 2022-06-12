import "./App.css"
import AboutSection from "./components/about-section/AboutSection"
import AnimatedLayer from "./components/common/AnimatedLayer"
import HeroSection from "./components/hero-section/HeroSection"
import ProjectsSection from "./components/projects-section/ProjectsSection"

function App() {

  return (
    <div className="App">
      <HeroSection />
      <div className="w-full h-auto absolute">
        <AnimatedLayer />
        <AboutSection />
        <ProjectsSection />
      </div>
    </div>
  )
}

export default App
