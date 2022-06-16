import { gsap } from "gsap/all"
import React from "react"
import { ReactComponent as Logo } from "../../media/logo.svg"
import NavBarButtonSection from "./NavBarButtonSection"

const SECTIONS = [
    {
        sectionId: "about-section",
        sectionName: "ABOUT ME"
    },
    {
        sectionId: "projects-section",
        sectionName: "PROJECTS"
    }
]


const NavBarLayer = () => {
    const navRef = React.useRef(null)

    React.useEffect(() => {
        let timer = null

        const hideNavigation = () => {
            if (window.scrollY !== 0)
                gsap.to(navRef.current, {
                    transform: "translatey(-100%)"
                })
        }

        const showNavigation = () => {
            gsap.to(navRef.current, {
                transform: "translatey(0)"
            })
        }

        let lastYscroll = 0
        let lastDiff = 0

        const scrollHandler = (e) => {
            if (timer) {
                clearTimeout(timer)
            }

            let diff = window.scrollY - lastYscroll
            if (diff > 0 && diff * lastDiff > 0) {
                hideNavigation()
            }
            if (diff < 0 && diff * lastDiff > 0) {
                showNavigation()
                timer = setTimeout(hideNavigation, 5000)
            }
            lastDiff = diff
            lastYscroll = window.scrollY
            console.log(navRef)
            if (window.scrollY === 0) {
                navRef.current.classList.remove("backdrop-blur-sm")
                navRef.current.classList.remove("bg-transparentBlack")
                navRef.current.classList.add("backdrop-blur-none")
                navRef.current.classList.add("bg-transparent")
            }
            else {
                navRef.current.classList.remove("backdrop-blur-none")
                navRef.current.classList.remove("bg-transparent")
                navRef.current.classList.add("backdrop-blur-sm")
                navRef.current.classList.add("bg-transparentBlack")

            }
        }

        window.addEventListener("scroll", scrollHandler)

        return () => {
            window.removeEventListener("scroll", scrollHandler)
            if (timer) {
                clearTimeout(timer)
            }
        }
        
    }, [])
    return (
        <nav ref={navRef} className="flex flex-row items-center backdrop-blur-sm bg-transparentBlack w-full h-16  fixed z-10 pointer-events-none">
            <div className={"h-full w-64 py-3"}>
                <a className="h-full w-auto m-auto pointer-events-auto" href="#hero-section">
                    <Logo width={"4em"} height={"100%"}
                        style={{
                            margin: "auto"
                        }}
                    />
                </a>
            </div>
            <div className="flex flex-row w-full h-full font-semibold px-3">
                <ul className="flex flex-row w-full h-full justify-end"
                >
                    {
                        SECTIONS.map(
                            (section) => (
                                <li className="flex w-fit items-center mx-1" key={section.sectionId}>
                                    <NavBarButtonSection
                                        sectionId={section.sectionId}
                                        sectionName={section.sectionName}
                                    />
                                </li>
                            )
                        )
                    }
                </ul>
            </div >
        </nav >

    )
}

export default NavBarLayer