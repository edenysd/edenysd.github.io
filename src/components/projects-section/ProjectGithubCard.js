import React from "react";
import ProjectGithubCardContent from "./ProjectGithubCardContent";
import ProjectGithubCardPreview from "./ProjectGithubCardPreview";

const ProjectGithubCard = ({
  title,
  description,
  github,
  media,
  className,
}) => {
  const [{ languages, topics }, setState] = React.useState({
    languages: null,
    topics: null,
  });

  React.useEffect(() => {
    fetch(
      `https://api.github.com/repos/${github.owner}/${github.repo}/languages`
    )
      .then((data) => {
        return data.json();
      })
      .then((newLanguages) => {
        let languagesTotalSum = 0;

        for (const language in newLanguages) {
          languagesTotalSum += newLanguages[language];
        }

        for (const language in newLanguages) {
          newLanguages[language] =
            Math.round((newLanguages[language] / languagesTotalSum) * 10000) /
            100;
        }

        setState((oldState) => ({
          ...oldState,
          languages: newLanguages,
        }));
      });

    fetch(`https://api.github.com/repos/${github.owner}/${github.repo}/topics`)
      .then((data) => {
        return data.json();
      })
      .then((newTopics) => {
        setState((oldState) => ({
          ...oldState,
          topics: newTopics,
        }));
      });
  }, [github, media]);

  return (
    <div className={"h-full w-full flex items-start p-2"}>
      <a
        className={
          "w-full h-full select-none flex flex-col items-center p-2 shadow-sm shadow-black backdrop-blur-sm hover:backdrop-blur-0 hover:shadow-md hover:shadow-black active:bg-semizinc active:shadow-none active:sepia active:backdrop-blur-sm"
        }
        href={github.src}
        target={"_blank"}
        rel={"noopener noreferrer"}
      >
        <ProjectGithubCardPreview media={media} />
        <ProjectGithubCardContent
          title={title}
          description={description}
          topics={topics}
          languages={languages}
        />
      </a>
    </div>
  );
};

export default ProjectGithubCard;
