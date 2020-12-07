const path = require("path");

module.exports = {
  chainWebpack(config) {
    config.resolve.alias
      .set("view", path.resolve(__dirname, "src/views"))
      .set("component", path.resolve(__dirname, "src/components"))
      .set("api", path.resolve(__dirname, "src/apis"))
      .set("store", path.resolve(__dirname, "src/store"))
      .set("assets", path.resolve(__dirname, "src/assets"))
      .set("layout", path.resolve(__dirname, "src/layout"))
      .set("tools", path.resolve(__dirname, "src/tools"))
      .set("router", path.resolve(__dirname, "src/router"));
  },
  devServer: {
    proxy: {
      "/judger": {
        target: "http://localhost:3000",
      },
    },
  },
};
