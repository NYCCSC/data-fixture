var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'eval',
  entry: {
    main: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/dev_loader'
    ],
    common: ['react','immutable','d3','superagent','react-d3-components']
  },
  output: {
    path: __dirname + '/public/',
    filename: 'loader.js',
    chunkFilename: '[name].js',
    publicPath: '/dataproduct/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin('common', 'common.bundle.js')
  ],
  resolve: {
    extensions: ['', '.js'],
    alias: {context$: '../dev_context'},
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader')},
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=32768'},
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,   loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }
    ]
  }
};
