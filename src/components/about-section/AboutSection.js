import React from "react"
import AboutCard from "./AboutCard"
import AnimatedLayer from "./AnimatedLayer"


const AboutSection = () => {
    return (
        <div className="flex items-center w-1/1 h-screen bg-black overflow-y-auto">
            <AnimatedLayer />
            <AboutCard />
        </div>
    )
}

export default AboutSection