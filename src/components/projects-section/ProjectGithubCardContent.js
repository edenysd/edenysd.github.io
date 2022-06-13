import LanguagesCardLayout from "./layouts/LanguagesCardLayout"
import TopicsCardLayout from "./layouts/TopicsCardLayout"

const ProjectGithubCardContent = ({ title, description, languages, topics }) => {
    return (
        <div className={"h-full w-auto"}>
            <p className="text-2xl pt-1 font-sans font-medium">
                {title}
            </p>
            <p className="text-xl py-2 font-sans bg-semizinc font-light">
                {description}
            </p>
            {languages ? <LanguagesCardLayout languages={languages} /> : null}
            {topics ? <TopicsCardLayout topics={topics} /> : null}
        </div>
    )
}

export default ProjectGithubCardContent