"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ProjectGithubCardContent from "./ProjectGithubCardContent";
import ProjectGithubCardPreview from "./ProjectGithubCardPreview";

const ProjectGithubCard = ({ title, description, github, media }) => {
  const [{ topics }, setState] = useState({
    languages: null,
    topics: null,
  });

  const [errorOnFetch, setErrorOnFetch] = useState(false);

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/${github.owner}/${github.repo}/topics`)
      .then(({ data: newTopics }) => {
        setState((oldState) => ({
          ...oldState,
          topics: newTopics,
        }));
      })
      .catch(() => {
        setErrorOnFetch(true);
      });
  }, [github]);

  return (
    <div className="h-full w-full flex items-start p-2 hover:-translate-y-2 transition-transform">
      <a
        className="w-full h-full select-none overflow-auto flex flex-col items-center shadow-sm shadow-black backdrop-blur-md 
          hover:backdrop-blur-0 hover:shadow-md hover:shadow-black
          rounded-lg"
        href={github.src}
        target={"_blank"}
        rel={"noopener noreferrer"}
      >
        <ProjectGithubCardPreview media={media} />
        <ProjectGithubCardContent
          title={title}
          description={description}
          topics={topics}
          errorOnFetch={errorOnFetch}
        />
      </a>
    </div>
  );
};

export default ProjectGithubCard;
