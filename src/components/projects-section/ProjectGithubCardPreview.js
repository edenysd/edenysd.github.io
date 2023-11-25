import gsap from "gsap/all";
import { random } from "gsap/gsap-core";
import React from "react"

const ProjectGithubCardPreview = ({ media }) => {
    const [currentIndex, setIndex] = React.useState(0)
    const imgRef = React.useRef(null)
    React.useEffect(() => {
        const timeline = gsap.timeline({ repeat: "1000000", repeatDelay: random(10, 20), yoyo: true })
        timeline.add(
            gsap.to(imgRef.current, {
                duration: 0.2,
                opacity: 0,
            }))
        timeline.add(
            () => setIndex(
                (oldIndex) => {
                    return (oldIndex + 1) % (media.length)
                }
            )
        )
        timeline.add(
            gsap.to(imgRef.current, {
                duration: 0.2,
                opacity: "1",
            }))
        return () => {
            timeline.clear()
        }
    }, [media.length])
    return (
        <img ref={imgRef} className={"flex h-60  w-full"} style={{ objectFit: "contain" }} src={media ? media[currentIndex] : ""} alt={"examples"} />
    )
}

export default ProjectGithubCardPreview