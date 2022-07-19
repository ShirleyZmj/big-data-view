const { resolve } = require("path");
const CracoLessPlugin = require("craco-less");

/** @type {import('@craco/craco').CracoConfig} */
const config = {
  plugins: [{ plugin: CracoLessPlugin }],
  webpack: {
    alias: {
      "@": resolve("src"),
      "@components": resolve("src/components"),
    },
    devServer: {
      proxy: {
        "/v1/": {
          target: "http://localhost:3001",

          changeOrigin: true,
          pathRewrite: { "^": "" },
        },
      },
    },
    // extensions: ["", ".js", ".jsx", ".ts", ".tsx"],
  },
};

module.exports = config;
