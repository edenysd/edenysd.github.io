
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

    const handleMouseMoveEvent = React.useCallback((event) => {
        const topOffset = figureRef.current.offsetTop;
        window.requestAnimationFrame(function () {
            rotateBackground(event, topOffset);
            processMouseMoveEvent(event, topOffset)
        });
    }, [processMouseMoveEvent, rotateBackground])

    return (
        <div>
            <div
                style={{
                    width: "100%",
                    height: "100vh",
                    overflow: "hidden",
                    backgroundColor: "black",
                    zIndex: "0",
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
                >
                    {children}
                </figure>
            </div >
            <div
                style={{
                    width: "100%",
                    height: "100vh",
                    position: "absolute",
                    left: "0",
                    top: "0",
                    margin: "0",
                    pointerEvents: "none",
                    background: "linear-gradient(180deg, rgba(0,0,0,0) 80%, rgba(0,0,0,1))",
                    zIndex: "1"
                }}
            ></div>
        </div>
    )
}

export default HeroPerspectiveWrapper