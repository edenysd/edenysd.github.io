import LanguagesCardComponent from "./components/LanguagesCardComponent";
import TopicsCardComponent from "./components/TopicsCardComponent";

const ProjectGithubCardContent = ({
  title,
  description,
  languages,
  topics,
}) => {
  return (
    <div className={"flex flex-col h-full w-auto"}>
      <p className="text-3xl pt-1 font-sans font-medium">{title}</p>
      <p
        className="text-xl py-2 font-sans bg-semizinc font-light whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>
      <div className={"flex flex-col justify-end h-full w-full"}>
        {languages ? <LanguagesCardComponent languages={languages} /> : null}
        {topics ? <TopicsCardComponent topics={topics} /> : null}
      </div>
    </div>
  );
};

export default ProjectGithubCardContent;
