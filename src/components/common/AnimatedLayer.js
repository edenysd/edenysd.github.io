import React from "react"


const AnimatedLayer = () => {
    const canvasRef = React.useRef()
    const elementsRef = React.useRef([])

    React.useEffect(() => {
        const canvas = canvasRef.current

        const ctx = canvas.getContext("2d")
        let timer = null


        const { width, height } = canvas.getBoundingClientRect()
        let canvasWidth = canvas.width = width
        let canvasHeight = canvas.height = height
        let clientHeight = document.documentElement.clientHeight
        let numberOfParticles = canvasWidth / 10
        let velocity = canvasWidth / 400
        let size = canvasWidth / 500

        const observer = new ResizeObserver(async () => {
            const { width, height } = canvas.getBoundingClientRect()
            canvasWidth = canvas.width = width
            canvasHeight = canvas.height = height
            clientHeight = document.documentElement.clientHeight


            numberOfParticles = canvasWidth / 10
            velocity = canvasWidth / 400
            size = canvasWidth / 500

            init()
        }).observe(canvas)

        const init = () => {
            elementsRef.current = []
            for (let i = 0; i < numberOfParticles; i++) {
                const distance = Math.random()
                const toX = Math.random() - 0.5
                const toY = (Math.random() + 1) * 3 / 3
                elementsRef.current[i] = {
                    x: Math.ceil(Math.random() * canvasWidth),
                    y: Math.ceil(Math.random() * canvasHeight),
                    toX: toX / Math.sqrt(toY * toY + toX * toX) * distance * velocity,
                    toY: toY / Math.sqrt(toY * toY + toX * toX) * distance * velocity,
                    size: distance * size
                }
            }
        }

        const drawParticle = (cx, cy, long) => {
            ctx.fillStyle = cy < (clientHeight) ? "white" : "black"
            ctx.lineWidth = long / 20
            ctx.arc(cx, cy, long, 0, 2 * Math.PI)
        }

        const rainParticle = () => {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight)

            for (let i = 0; i < numberOfParticles; i++) {
                const particle = elementsRef.current[i]
                ctx.beginPath()
                drawParticle(particle.x, particle.y, particle.size)
                ctx.fill()
                ctx.stroke()
                particle.x = particle.x + particle.toX
                particle.y = particle.y + particle.toY
                if (particle.x > canvasWidth) particle.x = 0
                if (particle.x < 0) particle.x = canvasWidth
                if (particle.y > canvasHeight) particle.y = 0
            }
            timer = setTimeout(() => window.requestAnimationFrame(rainParticle), 100 / 20)
        }

        init()
        rainParticle()

        return () => {
            elementsRef.current = null
            clearTimeout(timer)
            observer?.disconnect()
        }
    }, [])

    return <canvas className={"w-full h-full absolute left-0 top-0"} ref={canvasRef} />
}

export default AnimatedLayer