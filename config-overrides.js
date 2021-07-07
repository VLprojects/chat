const { override } = require('customize-cra');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function override(config, env) {
  config.output = {
    ...config.output, // copy all settings
    filename: 'static/js/[name].js',
  };
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  };

  config.optimization.runtimeChunk = false;

  config.plugins = config.plugins.map((plugin) => {
    return plugin instanceof MiniCssExtractPlugin
      ? new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: 'static/css/[name].css',
          chunkFilename: 'static/css/[name].chunk.css',
        })
      : plugin;
  });

  return config;
};
