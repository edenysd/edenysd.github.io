import TopicsCardComponent from "./components/TopicsCardComponent";

const ProjectGithubCardContent = ({
  title,
  description,
  topics,
  errorOnFetch,
}) => {
  return (
    <div className={"flex flex-col h-full w-auto"}>
      <p className="text-3xl pt-1 font-sans font-medium mt-8">{title}</p>
      <p
        className="text-xl py-2 font-sans  font-light whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>
      {!errorOnFetch ? (
        <div className={"flex flex-col justify-end h-full w-full mt-8"}>
          {topics ? <TopicsCardComponent topics={topics} /> : null}
        </div>
      ) : null}
    </div>
  );
};

export default ProjectGithubCardContent;
