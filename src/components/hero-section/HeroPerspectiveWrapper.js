
import React from "react"


const HeroPerspectiveWrapper = ({ perspective, children, processMouseMoveEvent = () => { }, maxRotationY = 3, maxRotationX = 5 }) => {
    const figureRef = React.useRef(null)

    const rotateBackground = React.useCallback((event, topOffset) => {
        const halfWindowH = figureRef.current.offsetHeight * 0.5,
            halfWindowW = figureRef.current.offsetWidth * 0.5

        let rotateY = ((-event.pageX + halfWindowW) / halfWindowW) * maxRotationY,
            yPosition = event.pageY - topOffset,
            rotateX = ((yPosition - halfWindowH) / halfWindowH) * maxRotationX

        if (rotateY > maxRotationY) rotateY = maxRotationY
        if (rotateY < -maxRotationY) rotateY = -maxRotationY
        if (rotateX > maxRotationX) rotateX = maxRotationX
        if (rotateX < -maxRotationX) rotateX = -maxRotationX

        figureRef.current.style.transform = "rotateX(" + rotateX + "deg ) rotateY(" + rotateY + "deg) translateZ(0)"
    }, [maxRotationX, maxRotationY])

    const handleMouseMoveEvent = React.useCallback((event) => {
        const topOffset = figureRef.current.offsetTop
        window.requestAnimationFrame(function () {
            rotateBackground(event, topOffset)
            processMouseMoveEvent(event, topOffset)
        })
    }, [processMouseMoveEvent, rotateBackground])

    return (
        <div>
            <div className="select-none w-auto h-full overflow-hidden bg-black z-0"
                style={{
                    perspective: perspective || "4000px"
                }}>
                <figure className="w-11/10 h-11/10"
                    ref={figureRef}
                    style={{

                        height: "100vh",
                        width: "110vw",
                        maxHeight: "105vh",
                        maxWidth: "110vw",
                        right: "-5%",
                        transformStyle: "preserve-3d"
                    }}
                    onMouseMove={handleMouseMoveEvent}
                >
                    {children}
                </figure>
            </div >
            <div
                style={{
                    width: "100%",
                    height: "101vh",
                    position: "absolute",
                    left: "0",
                    top: "0",
                    margin: "0",
                    pointerEvents: "none",
                    background: "linear-gradient(180deg, rgba(0,0,0,0) 75%, rgba(0,0,0,1)) "
                }}
            ></div>
        </div>
    )
}

export default HeroPerspectiveWrapper