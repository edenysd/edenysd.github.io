
import React from "react"

import HeroPerspectiveWrapper from "./HeroPerspectiveWrapper"
import { ReactComponent as Presentation } from "../../media/sections/hero-section/presentation.svg"
import { ReactComponent as Phrase } from "../../media/sections/hero-section/hero-phrase.svg"
import background from "../../media/sections/hero-section/background-hero.jpg"

const HERO_TEXT_SHADOW_X = 2,
    HERO_TEXT_SHADOW_Y = 2


const HeroSection = () => {
    const backgroundRef = React.useRef(null)
    const presentationRef = React.useRef(null)

    const processMouseMoveEvent = React.useCallback((event, topOffset) => {

        const halfWindowH = window.innerHeight * 0.5,
            halfWindowW = window.innerWidth * 0.5

        const xDeltaToCenter = event.pageX - halfWindowW,
            yDeltaToCenter = halfWindowH - event.pageY - topOffset

        const { x: presentationX, width: presentationWidth, height: presentationHeight, y: presentationY } = presentationRef.current.getBoundingClientRect()
        const xDeltaToPresentation = event.pageX - presentationX - presentationWidth / 2,
            yDeltaToPresentation = event.pageY - presentationY - presentationHeight / 2

        backgroundRef.current.style.filter = `hue-rotate(${Math.atan2(yDeltaToCenter, xDeltaToCenter) / Math.PI * 180}deg)`
        presentationRef.current.style.filter = /*`hue-rotate(${Math.atan2(yDeltaToCenter, xDeltaToCenter) / Math.PI * 180}deg)`+*/`drop-shadow(${HERO_TEXT_SHADOW_X * (xDeltaToPresentation / halfWindowW)}px ${HERO_TEXT_SHADOW_Y * (yDeltaToPresentation / halfWindowH)}px 2px #ffffff55)`

    }, [])

    React.useEffect(() => {
        global.a = presentationRef.current
    }, [])

    return (
        <HeroPerspectiveWrapper
            processMouseMoveEvent={processMouseMoveEvent}
        >
            <div
                style={{
                    position: "absolute",
                    width: "26vw",
                    height: "auto",
                    top: "50%",
                    left: "7%",
                    transform: "translate(0%, -50%) translateZ(20px)"
                }}
            >
                <Presentation
                    ref={presentationRef}
                />
            </div >
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "75%",
                    transform: "translate(-50%, -50%) translateZ(11px)"
                }}
            >
                <Phrase
                    width={"40vw"}
                />
            </div >
            <img
                ref={backgroundRef}
                src={background}
                style={{
                    position: "relative",
                    height: "110vh",
                    width: "110vw",
                    maxHeight: "110vh",
                    maxWidth: "110vw",
                    left: "-5%",
                    right: "-5%",
                    objectFit: "cover",
                    transform: "translateZ(10px)"
                }}
                alt={""}
            />
        </HeroPerspectiveWrapper>
    )
}

export default HeroSection