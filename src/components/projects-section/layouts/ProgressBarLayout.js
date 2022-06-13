import { gsap } from "gsap/all"
import React from "react"

const ProgressBarLayout = ({ progress, textGenerator }) => {
    const barRef = React.useRef(null)
    const totalBarRef = React.useRef(null)
    const textRef = React.useRef(null)

    React.useEffect(() => {
        const runAnimationUp = () => {
            const { width: totalBarWidth } = totalBarRef.current.getBoundingClientRect()
            gsap.to(barRef.current, {
                duration: 1,
                width: totalBarWidth * progress / 100,
                ease: "slow.out",
                onUpdate: () => {
                    textRef.current.innerText = textGenerator(Math.round(barRef.current.offsetWidth / totalBarWidth * 10000) / 100)
                },
                onComplete: () => {
                    textRef.current.innerText = textGenerator(progress)
                }
            })
        }

        const runAnimationDown = () => {
            gsap.to(barRef.current, {
                duration: 1,
                width: 0,
                ease: "slow.out"
            })
        }

        const callbackFunc = (entries, observer) => {
            entries.forEach(entry => {
                entry.isIntersecting ? runAnimationUp() : runAnimationDown()
            })
        }

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        }

        const observerViewPortPosition = new IntersectionObserver(callbackFunc, options)
        observerViewPortPosition.observe(barRef.current)

        const observerResize = new ResizeObserver(async () => {
            runAnimationUp()
        })
        observerResize.observe(totalBarRef.current)

        return () => {
            observerViewPortPosition.disconnect()
            observerResize.disconnect()
        }

    }, [progress, textGenerator])
    return (
        <div ref={totalBarRef} className={"flex h-10 w-11/12 mx-auto  items-center overflow-hidden bg-slate-800"}>
            <div ref={barRef} className={"h-10 w-0 bg-white border-2 border-black absolute"}>
            </div>
            <p
                ref={textRef}
                className="relative m-auto w-full text-white"
                style={{
                    mixBlendMode: "difference"
                }}
            />
        </div>
    )
}

export default ProgressBarLayout