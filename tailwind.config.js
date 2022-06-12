const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      semizinc: "rgba(150,150,150,0.1)"
    },
  },
  plugins: [
  ],
}
