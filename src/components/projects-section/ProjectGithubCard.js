
import React from "react"
import gsap from "gsap/all"


const ProjectGithubCard = ({ title, description, github, media, className }) => {
    const [state, setState] = React.useState({
        loading: true,
        languages: null,
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

        fetch(`https://api.github.com/repos/${github.owner}/${github.repo}/languages`)
            .then((data) => {
                return data.json()
            })
            .then((topics) => {
                setState((oldState) => ({
                    ...oldState,
                    topics: topics
                }))
            })

        fetch(`https://api.github.com/repos/${github.owner}/${github.repo}/contents/${github.mediaPath}`)
            .then((data) => {
                return data.json()
            })
            .then((media) => {
                console.log(media)
                setState((oldState) => ({
                    ...oldState,
                    media: media
                }))
            })

    }, [github])

    return (
        <div className={"h-auto w-full sm:w-1/4 sm:3 flex items-start p-3"}>
            <div className={"w-full h-auto flex flex-col items-center p-2 rounded-md shadow-sm shadow-black"}>
                <img className={"flex h-full w-auto"} style={{ objectFit: "cover" }} src={media} alt={"examples"} />
                state
            </div>
        </div >
    )
}

export default ProjectGithubCard