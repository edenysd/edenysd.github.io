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
        let canvasMaxDimension = Math.max(canvasWidth, canvasHeight)
        let clientHeight = document.documentElement.clientHeight
        let numberOfParticles = canvasMaxDimension / 10
        let velocity = canvasMaxDimension / 400
        let size = canvasMaxDimension / 500

        const updateValues = () => {
            const { width, height } = canvas.getBoundingClientRect()
            canvasWidth = canvas.width = width
            canvasHeight = canvas.height = height
            canvasMaxDimension = Math.max(canvasWidth, canvasHeight)
            clientHeight = document.documentElement.clientHeight
            numberOfParticles = canvasMaxDimension / 10
            velocity = canvasMaxDimension / 400
            size = canvasMaxDimension / 500
        }
        updateValues()

        const observer = new ResizeObserver(async () => {
            updateValues()
            init()
        }).observe(canvas)

        const init = () => {
            elementsRef.current = []
            for (let i = 0; i < numberOfParticles; i++) {
                const distance = Math.random()
                const toX = Math.random() - 0.5
                const toY = (Math.random() + 1) * 3 / 3
                elementsRef.current[i] = {
                    x: Math.ceil(Math.random() * canvasMaxDimension),
                    y: Math.ceil(Math.random() * canvasHeight),
                    toX: toX / Math.sqrt(toY * toY + toX * toX) * distance * velocity,
                    toY: toY / Math.sqrt(toY * toY + toX * toX) * distance * velocity,
                    size: distance * size
                }
            }
        }

        const drawStarParticle = (cx, cy, spikes, outerRadius, innerRadius, fillStyle = "skyblue", strokeStyle = "blue") => {
            let rot = Math.PI / 2 * 3
            let x = cx
            let y = cy
            let step = Math.PI / spikes

            ctx.beginPath()
            ctx.moveTo(cx, cy - outerRadius)
            for (let i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * outerRadius
                y = cy + Math.sin(rot) * outerRadius
                ctx.lineTo(x, y)
                rot += step

                x = cx + Math.cos(rot) * innerRadius
                y = cy + Math.sin(rot) * innerRadius
                ctx.lineTo(x, y)
                rot += step
            }
            ctx.lineTo(cx, cy - outerRadius)
            ctx.closePath()
            ctx.lineWidth = 1
            ctx.strokeStyle = strokeStyle
            ctx.stroke()
            ctx.fillStyle = fillStyle
            ctx.fill()
        }

        const drawParticle = (cx, cy, long) => {
            if (cy < (clientHeight)) {
                ctx.fillStyle = "white"
                ctx.lineWidth = long / 20
                ctx.arc(cx, cy, long, 0, 2 * Math.PI)
            }
            else if (cy > canvasHeight - clientHeight) {
                drawStarParticle(cx, cy, 5, long * 2, long / 2, "white", "white")
            }
            else {
                ctx.strokeStyle = "black"
                ctx.lineWidth = long
                ctx.beginPath()
                ctx.moveTo(cx, cy)
                ctx.lineTo(cx, cy + long * 5)
                ctx.stroke()
            }
        }

        const updateParticle = (particle) => {
            if (particle.y < (clientHeight)) {
                particle.x = particle.x + particle.toX
                particle.y = particle.y + particle.toY
            }
            else if (particle.y > canvasHeight - clientHeight) {
                particle.x = particle.x + particle.toX
                particle.y = particle.y + particle.toY
            }
            else {
                particle.y = particle.y + Math.sqrt(particle.toX * particle.toX + particle.toY * particle.toY) * 5
            }
            if (particle.x > canvasMaxDimension) particle.x = 0
            if (particle.x < 0) particle.x = canvasMaxDimension
            if (particle.y > canvasHeight) particle.y = 0
        }

        const rainParticle = () => {
            ctx.clearRect(0, 0, canvasMaxDimension, canvasHeight)

            for (let i = 0; i < numberOfParticles; i++) {
                const particle = elementsRef.current[i]
                ctx.beginPath()
                drawParticle(particle.x, particle.y, particle.size)
                ctx.fill()
                ctx.stroke()
                updateParticle(particle)
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