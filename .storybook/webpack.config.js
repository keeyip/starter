const path = require('path');

module.exports = async ({ config }) => {
  config.module.rules.push({
      test: /\.less$/,
      loaders: ["style-loader", "css-loader", "less-loader"] 
  });

  config.resolve.alias['../../theme.config$'] = path.join(__dirname, '../src/semantic-ui/theme.config');
  config.resolve.alias['lib/queries'] = path.join(__dirname, '../src/lib/__mocks__/queries');

  return config;
};
