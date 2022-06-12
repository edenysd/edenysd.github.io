
import React from "react"


const ProjectGithubCard = ({ title, description, github, media, className }) => {
    const [state, setState] = React.useState({
        loading: true,
        languages: null,
        topics: null
    })

    React.useEffect(() => {
        fetch(`https://api.github.com/repos/${github.owner}/${github.repo}/languages`)
            .then((data) => {
                return data.json()
            })
            .then((languages) => {
                let languagesTotalSum = 0

                for (const language in languages) {
                    languagesTotalSum += languages[language]
                }

                for (const language in languages) {
                    languages[language] = Math.round(languages[language] / languagesTotalSum * 10000) / 100
                }

                setState((oldState) => ({
                    ...oldState,
                    languages: languages
                }))

            })

        fetch(`https://api.github.com/repos/${github.owner}/${github.repo}/topics`)
            .then((data) => {
                return data.json()
            })
            .then((topics) => {
                setState((oldState) => ({
                    ...oldState,
                    topics: topics
                }))
            })



    }, [github, media])

    return (
        <div className={"h-auto w-full sm:w-4/12 flex items-start p-2"}>
            <div className={"w-full h-fit select-none flex flex-col items-center p-2  shadow-sm shadow-black backdrop-blur-sm hover:backdrop-blur-0 hover:shadow-md hover:shadow-black active:bg-semizinc active:shadow-none active:sepia active:backdrop-blur-sm"}>
                <img className={"flex h-1/3 w-full"} style={{ objectFit: "cover" }} src={media ? media[0] : ""} alt={"examples"} />
                <div className={"h-full w-auto"}>
                    {JSON.stringify(state)}
                </div>
            </div>
        </div >
    )
}

export default ProjectGithubCard