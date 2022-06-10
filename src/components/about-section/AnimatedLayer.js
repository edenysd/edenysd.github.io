import React from "react"


const AnimatedLayer = () => {
    const canvasRef = React.useRef()
    const elementsRef = React.useRef([])

    React.useEffect(() => {
        const canvas = canvasRef.current

        const ctx = canvas.getContext("2d")
        let timer = null

        let canvasWidth = canvas.width = document.documentElement.clientWidth
        let canvasHeight = canvas.height = document.documentElement.clientHeight
        let numberOfParticles = canvasHeight / 20
        let velocity = canvasHeight / 100
        let size = canvasHeight / 500

        window.addEventListener("resize", function () {
            canvasWidth = canvas.width = document.documentElement.clientWidth
            canvasHeight = canvas.height = document.documentElement.clientHeight
            numberOfParticles = canvasHeight / 20
            velocity = canvasHeight / 100
            size = canvasHeight / 500
        })

        const init = () => {
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
            ctx.fillStyle = "white"
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
            clearTimeout(timer)
        }
    }, [])

    return <canvas className="absolute" ref={canvasRef} />
}

export default AnimatedLayer