import React from "react";
import { ReactComponent as LinkedinLogo } from "../../media/sections/contactme-section/linkedin.svg";
import { ReactComponent as GithubLogo } from "../../media/sections/contactme-section/github.svg";
import { ReactComponent as GmailLogo } from "../../media/sections/contactme-section/gmail.svg";

const ContactmeCard = ({ title, description, github, media, className }) => {
  return (
    <div
      className={
        "h-full w-full flex flex-col items-center justify-start pt-10  fill-green-300"
      }
    >
      <div
        className={
          "w-auto h-auto select-none flex flex-row p-2 hover:backdrop-blur-sm"
        }
      >
        <a
          className={"p-3 drop-shadow-custom-1 hover:fill-white"}
          href={
            "https://www.linkedin.com/in/edenys-deniz-gonz%C3%A1lez-1a4532210/"
          }
          target={"_blank"}
          rel={"noreferrer"}
        >
          <LinkedinLogo className="h-16 w-16 sm:h-32 sm:w-32 pointer-events-none" />
        </a>
        <a
          className={"p-3 drop-shadow-custom-1 hover:fill-white"}
          href={"https://github.com/edenysd"}
          target={"_blank"}
          rel={"noreferrer"}
        >
          <GithubLogo className="h-16 w-16 sm:h-32 sm:w-32 pointer-events-none" />
        </a>
        <a
          className={"p-3 drop-shadow-custom-1 hover:fill-white"}
          href={"mailto:holofist1@gmail.com"}
          target={"_top"}
          rel={"noreferrer"}
        >
          <GmailLogo className="h-16 w-16 sm:h-32 sm:w-32 pointer-events-none" />
        </a>
      </div>
    </div>
  );
};

export default ContactmeCard;
