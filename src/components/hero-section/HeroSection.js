
import React from 'react'
import gsap from 'gsap/all'


import { ReactComponent as Presentation } from '../../media/presentation.svg'
import background from '../../media/background-hero.jpg'
import HeroPerspectiveWrapper from './HeroPerspectiveWrapper'

const HERO_TEXT_SHADOW_X = 10,
    HERO_TEXT_SHADOW_Y = 10

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
        presentationRef.current.style.filter = `hue-rotate(${Math.atan2(yDeltaToCenter, xDeltaToCenter) / Math.PI * 180}deg) drop-shadow(${HERO_TEXT_SHADOW_X * (-xDeltaToPresentation / halfWindowW)}px ${HERO_TEXT_SHADOW_Y * (-yDeltaToPresentation / halfWindowH)}px 2px #ffffff55)`

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
                    height: "3em",
                    width: "auto",
                    top: "50%",
                    left: "20%",
                    transform: "translate(-20%, -50%) translateZ(20px)"
                }}
            >
                <Presentation ref={presentationRef} />
            </div >
            <img
                ref={backgroundRef}
                src={background}
                style={{
                    position: "relative",
                    height: "110vh",
                    width: "110%",
                    objectFit: "cover",
                    top: "-5%",
                    left: "-5%",
                    transform: "translateZ(10px)"
                }}
                alt={""}
            />
        </HeroPerspectiveWrapper>
    )
}

export default HeroSection