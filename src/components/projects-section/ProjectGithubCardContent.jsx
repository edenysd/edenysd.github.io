import { useMemo } from "react";
import TopicsCardComponent from "./components/TopicsCardComponent";

const TextDescriptionComponent = ({ description }) => {
  const cleanedLines = useMemo(() => {
    return description.split("\n").map((line) => {
      return line.trim();
    });
  }, [description]);

  return (
    <>
      {cleanedLines.map((line, index) =>
        line !== "" ? (
          <p
            key={index}
            className="text-xl font-normal font-sans whitespace-pre-line leading-relaxed"
            style={{ wordSpacing: 2 }}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ) : (
          <span key={index} className="mt-2"></span>
        )
      )}
    </>
  );
};

const ProjectGithubCardContent = ({
  title,
  description,
  topics,
  errorOnFetch,
}) => {
  return (
    <div className={"flex flex-col h-full w-full text-left p-4"}>
      <p className="text-3xl font-medium mb-2">{title}</p>
      <TextDescriptionComponent description={description} />
      {!errorOnFetch ? (
        <div className={"flex flex-col justify-end h-full w-full mt-8"}>
          {topics ? <TopicsCardComponent topics={topics} /> : null}
        </div>
      ) : null}
    </div>
  );
};

export default ProjectGithubCardContent;
