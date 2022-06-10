import "./App.css"
import AboutSection from "./components/about-section/AboutSection"
import HeroSection from "./components/hero-section/HeroSection"
import ProjectsSection from "./components/projects-section/ProjectsSection"

function App() {

  return (
    <div className="App">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
    </div>
  )
}

export default App
