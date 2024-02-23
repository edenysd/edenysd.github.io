// @ts-check
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
module.exports = (phase, { defaultConfig }) => {
  const base = {
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });

      return config;
    },
  };
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return base;
  }

  return {
    ...base,
    output: "export",
    distDir: "/dist",
  };
};
