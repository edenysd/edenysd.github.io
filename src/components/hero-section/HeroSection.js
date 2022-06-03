
import React from 'react'

import presentation from '../../media/presentation.svg'
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

        const xPosition = event.pageX - halfWindowW,
            yPosition = halfWindowH - event.pageY - topOffset

        backgroundRef.current.style.filter = `hue-rotate(${Math.atan2(yPosition, xPosition) / Math.PI * 180}deg)`
        presentationRef.current.style.filter = `hue-rotate(${Math.atan2(yPosition, xPosition) / Math.PI * 180}deg) drop-shadow(${HERO_TEXT_SHADOW_X * (-xPosition / halfWindowW)}px ${HERO_TEXT_SHADOW_Y * (yPosition / halfWindowH)}px 2px #ffffff55)`

    }, [])

    return (
        <HeroPerspectiveWrapper
            processMouseMoveEvent={processMouseMoveEvent}
        >
            <img
                ref={presentationRef}
                src={presentation}
                style={{
                    position: "absolute",
                    width: "400px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) translateZ(20px)"
                }}
                alt={""}
            />

            <img
                ref={backgroundRef}
                src={background}
                style={{
                    position: "absolute",
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