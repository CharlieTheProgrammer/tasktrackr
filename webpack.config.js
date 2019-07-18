var path = require('path')
var webpack = require('webpack')

function buildConfig(env) {
  return require("./WebPackConfigs/webpack."  + Object.keys(env)[0] + ".config.js")
}

module.exports = buildConfig;
