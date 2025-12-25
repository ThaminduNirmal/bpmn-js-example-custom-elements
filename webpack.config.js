const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    bundle: ['./app/app.js']
  },
  output: {
    path: __dirname + '/public',
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.bpmn$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets/**', to: 'vendor/bpmn-js', context: 'node_modules/bpmn-js/dist/' },
        { from: '**/*.{html,css}', context: 'app/' }
      ]
    })
  ],
  mode: 'development',
  devtool: 'source-map',
  performance: {
    hints: false,             // Set to false to hide all size warnings
    maxEntrypointSize: 512000, // or increase limit (512 KB)
    maxAssetSize: 512000       // or increase limit (512 KB)
  }
};