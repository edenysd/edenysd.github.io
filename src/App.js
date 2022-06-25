import "./App.css"
import AboutSection from "./components/about-section/AboutSection"
import AnimatedLayer from "./components/common/AnimatedLayer"
import NavBarLayer from "./components/common/NavBarLayer"
import ContactmeSection from "./components/contactme-section/ContactmeSection"
import HeroSection from "./components/hero-section/HeroSection"
import ProjectsSection from "./components/projects-section/ProjectsSection"

function App() {

  return (
    <div className="App">
      <NavBarLayer />
      <HeroSection />
      <div className="w-full h-auto absolute">
        <AnimatedLayer />
        <AboutSection />
        <ProjectsSection />
        <ContactmeSection />
      </div>
    </div>
  )
}

export default App
