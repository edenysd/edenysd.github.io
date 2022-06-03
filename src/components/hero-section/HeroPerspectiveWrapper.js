
import React from "react"


const HeroPerspectiveWrapper = ({ perspective, children, processMouseMoveEvent = () => { }, maxRotationY = 3, maxRotationX = 5 }) => {
    const figureRef = React.useRef(null)

    const rotateBackground = React.useCallback((event, topOffset) => {
        const halfWindowH = figureRef.current.offsetHeight * 0.5,
            halfWindowW = figureRef.current.offsetWidth * 0.5

        let rotateY = ((-event.pageX + halfWindowW) / halfWindowW) * maxRotationY,
            yPosition = event.pageY - topOffset,
            rotateX = ((yPosition - halfWindowH) / halfWindowH) * maxRotationX;

        if (rotateY > maxRotationY) rotateY = maxRotationY;
        if (rotateY < -maxRotationY) rotateY = -maxRotationY;
        if (rotateX > maxRotationX) rotateX = maxRotationX;
        if (rotateX < -maxRotationX) rotateX = -maxRotationX;

        figureRef.current.style.transform = "rotateX(" + rotateX + "deg ) rotateY(" + rotateY + "deg) translateZ(0)"

    }, [maxRotationX, maxRotationY])

    const resetBackground = React.useCallback((event) => {

        figureRef.current.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)"

    }, [])

    const handleMouseMoveEvent = React.useCallback((event) => {
        const topOffset = figureRef.current.offsetTop;
        window.requestAnimationFrame(function () {
            rotateBackground(event, topOffset);
            processMouseMoveEvent(event, topOffset)
        });
    }, [processMouseMoveEvent, rotateBackground])

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                overflow: "hidden",
                backgroundColor: "black",
                perspective: perspective || "4000px"
            }}>
            <figure
                ref={figureRef}
                style={{
                    width: "100%",
                    height: "100vh",
                    transformStyle: "preserve-3d",
                    margin: "0"
                }}
                onMouseMove={handleMouseMoveEvent}
                onMouseLeave={resetBackground}
            >
                {children}
            </figure>
        </div >
    )
}

export default HeroPerspectiveWrapper