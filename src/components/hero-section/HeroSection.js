
import React from 'react'

import presentation from '../../media/presentation.svg'
import background from '../../media/background-hero.jpg'
import HeroPerspectiveWrapper from './HeroPerspectiveWrapper'
const HeroSection = () => {
    const backgroundRef = React.useRef(null)
    const presentationRef = React.useRef(null)

    const processMouseMoveEvent = React.useCallback((event, topOffset) => {

        const halfWindowH = window.innerHeight * 0.5,
            halfWindowW = window.innerWidth * 0.5

        const xPosition = event.pageX - halfWindowW,
            yPosition = halfWindowH - event.pageY - topOffset
        backgroundRef.current.style.filter = `hue-rotate(${Math.atan2(yPosition, xPosition) / Math.PI * 180}deg)`
        presentationRef.current.style.filter = `hue-rotate(${Math.atan2(yPosition, xPosition) / Math.PI * 180}deg)`

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
                    top: "40%",
                    left: "0%",
                    transform: "translateZ(20px)"
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