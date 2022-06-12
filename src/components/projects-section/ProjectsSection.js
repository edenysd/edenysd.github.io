
import React from "react"
import { projects } from "../../conf"
import ProjectGithubCard from "./ProjectGithubCard"

const ProjectsSection = () => {
    return (
        <div className="flex h-auto w-full p-3">
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