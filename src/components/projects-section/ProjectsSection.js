
import React from "react"
import { projects } from "../../conf"
import ProjectGithubCard from "./ProjectGithubCard"

const ProjectsSection = () => {
    return (
        <div className="flex h-screen flex-row flex-wrap absolute">
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
        </div >
    )
}

export default ProjectsSection