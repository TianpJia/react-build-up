const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

module.exports = function override(config, env) {
  const oneOfLoc = config.module.rules.findIndex((rule) => rule.oneOf);
  if (oneOfLoc === -1) {
    throw new Error("Can't find 'oneOf' array in webpack config");
  }

  // 添加 Less 支持
  config.module.rules[oneOfLoc].oneOf.unshift(
    {
      test: lessRegex,
      exclude: lessModuleRegex,
      use: ["style-loader", "css-loader", "less-loader"],
    },
    {
      test: lessModuleRegex,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: "[name]__[local]--[hash:base64:5]",
            },
          },
        },
        "less-loader",
      ],
    }
  );

  return config;
};
