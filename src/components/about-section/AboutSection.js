import React from "react"
import AboutCard from "./AboutCard"


const AboutSection = () => {
    return (
        <div className="flex items-start w-1/1 h-screen bg-black overflow-y-auto CustomScrollBar">
            <AboutCard />
        </div >
    )
}

export default AboutSection