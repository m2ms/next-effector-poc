const config = require('./config.json');

const { withEffectoReactAliases } = require('effector-next/tools');

const enhance = withEffectoReactAliases();

const isProd = process.env.NODE_ENV === 'production';

module.exports = enhance({
  basePath: config.basePath,
  assetPrefix: isProd ? config.assetsPrefix : '',
  serverRuntimeConfig: {
    testConfig: 'testConfigValue',
  },
  publicRuntimeConfig: {
    staticFolder: '/staticFolder',
    basePath: config.basePath,
  },
});
