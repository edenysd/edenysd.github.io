
import React from "react"
import { ReactComponent as LinkedinLogo } from "../../media/sections/contactme-section/linkedin.svg"
import { ReactComponent as GithubLogo } from "../../media/sections/contactme-section/github.svg"
import { ReactComponent as GmailLogo } from "../../media/sections/contactme-section/gmail.svg"
import gsap from "gsap/all"

const onHoverColor = "#FFF"
const onNormalColor = "#AFA"
const onActiveColor = "#AAFFAA55"

const eventMap = {
    onMouseEnter(e) {
        gsap.to(e.target, {
            fill: onHoverColor,
            filter: "drop-shadow(7px 7px 2px #a3a)"
        })
    },
    onMouseLeave(e) {
        gsap.to(e.target, {
            fill: onNormalColor,
            filter: `drop-shadow(0px 0px 0px ${onNormalColor})`
        })
    },
    onMouseDown(e) {
        gsap.to(e.target, {
            duration: 0.3,
            filter: "drop-shadow(0px 0px 10px #a3a)",
            fill: onActiveColor
        })
    }
}

const ContactmeCard = ({ title, description, github, media, className }) => {
    return (
        <div
            className={"h-full w-full flex flex-col items-center justify-start pt-10"}
        >
            <div
                className={"w-auto h-auto select-none flex flex-row p-2 shadow-lg shadow-slate-600 backdrop-blur-none hover:backdrop-blur-sm"}
                style={{
                    fill: onNormalColor
                }}
            >
                <a
                    className={"p-3"}
                    href={"https://www.linkedin.com/in/edenys-deniz-gonz%C3%A1lez-1a4532210/"}
                    target={"_blank"}
                    rel={"noreferrer"}
                    {...eventMap}
                >
                    <LinkedinLogo
                        className="h-16 w-16 sm:h-32 sm:w-32 pointer-events-none"
                    />
                </a>
                <a
                    className={"p-3"}
                    href={"https://github.com/edenysd"}
                    target={"_blank"}
                    rel={"noreferrer"}
                    {...eventMap}
                >
                    <GithubLogo
                        className="h-16 w-16 sm:h-32 sm:w-32 pointer-events-none"
                    />
                </a>
                <a
                    className={"p-3"}
                    href={"mailto:holofist1@gmail.com"}
                    target={"_top"}
                    rel={"noreferrer"}
                    {...eventMap}
                >
                    <GmailLogo
                        className="h-16 w-16 sm:h-32 sm:w-32 pointer-events-none"
                    />
                </a>
            </div>
        </div >
    )
}

export default ContactmeCard