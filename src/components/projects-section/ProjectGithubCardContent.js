import LanguagesCardComponent from "./components/LanguagesCardComponent";
import TopicsCardComponent from "./components/TopicsCardComponent";

const ProjectGithubCardContent = ({
  title,
  description,
  languages,
  topics,
}) => {
  return (
    <div className={"h-full w-auto"}>
      <p className="text-2xl pt-1 font-sans font-medium">{title}</p>
      <p className="text-xl py-2 font-sans bg-semizinc font-light">
        {description}
      </p>
      {languages ? <LanguagesCardComponent languages={languages} /> : null}
      {topics ? <TopicsCardComponent topics={topics} /> : null}
    </div>
  );
};

export default ProjectGithubCardContent;
