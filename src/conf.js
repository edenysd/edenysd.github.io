import portfolioMedia from "./media/preview/portfolio"
import gatoRatonMedia from "./media/preview/gato_raton"
export const projects = [
    {
        title: "Edenys' Portfolio",
        description: "Here is the project for this portfolio in case you have any questions or simply do you want to see how it works.",
        media: portfolioMedia,
        github: {
            src: "https://github.com/edenysd/edenysd.github.io",
            owner: "edenysd",
            repo: "edenysd.github.io"
        }
    },
    {
        title: "El Gato y el Raton",
        description: "A beautiful game with some interesting things. The entire game is rendered on a single canvas using good programming practices to control game state and transicions. The only utilities used are the android canvas and the system event provider.",
        media: gatoRatonMedia,
        github: {
            src: "https://github.com/edenysd/El-Gato-y-el-Raton",
            owner: "edenysd",
            repo: "El-Gato-y-el-Raton"
        }
    }
]