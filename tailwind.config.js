import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      ...colors,
      semizinc: "rgba(150,150,150,0.1)",
      transparentBlack: "rgba(0,0,0,0.3)",
    },
  },
  plugins: [],
};
