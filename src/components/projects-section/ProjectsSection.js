
import React from "react"
import { projects } from "../../conf"
import ProjectGithubCard from "./ProjectGithubCard"

const ProjectsSection = () => {
    return (
        <div className="flex h-auto min-h-screen flex-col w-full p-3">
            <p className="py-8 text-6xl font-serif">
                Recent Projects
            </p>
            <div className="flex relative w-full h-full flex-row flex-wrap">
                {
                    projects.map(
                        (project) => (
                            <ProjectGithubCard
                                key={project.title}
                                {...project}
                            />
                        )
                    )
                }
            </div>
        </div >
    )
}

export default ProjectsSection