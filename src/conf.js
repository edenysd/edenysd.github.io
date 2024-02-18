import liasShopMedia from "./media/preview/lias_shop";
import slackCloneMedia from "./media/preview/my_slack_clone";
import portfolioMedia from "./media/preview/portfolio";
import histlogMedia from "./media/preview/histlog";
import gatoRatonMedia from "./media/preview/gato_raton";
import rendoMedia from "./media/preview/rendo";

export const projects = [
  {
    title: "Lia's Shop",
    description: `Ready to production store webpage.
    Integrated with a fake store API.`,
    media: liasShopMedia,
    github: {
      src: "https://github.com/edenysd/lia-s-shop",
      owner: "edenysd",
      repo: "lia-s-shop",
    },
  },
  {
    title: "My Slack Clone",
    description: `<strong>Slack Clone SPA</strong>.
       With avatars, conversations, private messages and channels.

       Log in and see the demo.
       `,
    media: slackCloneMedia,
    github: {
      src: "https://github.com/edenysd/my-slack-clone",
      owner: "edenysd",
      repo: "my-slack-clone",
    },
  },
  {
    title: "Rendo",
    description: `Demo visualization tool for detailed exploration of structured models.`,
    media: rendoMedia,
    github: {
      src: "https://github.com/edenysd/rendo",
      owner: "edenysd",
      repo: "rendo",
    },
  },
  {
    title: "Edenys' Portfolio",
    description: `I truly loved working on this project.
        gsap3 is great, but the process of building your
        visuals by hand is simply pure joy.
      `,
    media: portfolioMedia,
    github: {
      src: "https://github.com/edenysd/edenysd.github.io",
      owner: "edenysd",
      repo: "edenysd.github.io",
    },
  },
  {
    title: "Histlog",
    description: `Web chat game using ISO Prolog as logic engine.

    Pedagogical tool to familiarize the <b>student</b> with the ISO prolog syntax 
    `,
    media: histlogMedia,
    github: {
      src: "https://github.com/edenysd/histlog",
      owner: "edenysd",
      repo: "histlog",
    },
  },
  {
    title: "El Gato y el Raton",
    description: `A beautiful game with some interesting things.

    The entire game is rendered on a single canvas using good programming practices to control game state and transitions.
    
    The only utilities used are the android canvas and the system event provider.`,
    media: gatoRatonMedia,
    github: {
      src: "https://github.com/edenysd/El-Gato-y-el-Raton",
      owner: "edenysd",
      repo: "El-Gato-y-el-Raton",
    },
  },
];
